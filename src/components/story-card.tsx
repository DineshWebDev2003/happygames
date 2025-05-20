import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PlayCircle, Globe, MessageCircle } from 'lucide-react';
import type { Story } from '@/data/mock-data';
import { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface StoryCardProps {
  story: Story;
  onReadMore?: (storyContent: string, storyTitle: string) => void; // For quiz generator
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onReadMore }) => {
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  const [showMoral, setShowMoral] = useState(false);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleListen = () => {
    alert(`Playing story: ${story.title} (Audio feature coming soon!)`);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'tamil' : 'english');
  };
  
  const handleReadStory = () => {
    // Play page flip sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    router.push(`/stories/${story.id}`);
  };

  // Bulletproof image source logic with updated path
  let imageSrc = '/images/placeholder-story.jpg';
  if (typeof story.imageUrl === 'string' && story.imageUrl.trim()) {
    imageSrc = story.imageUrl.startsWith('/images/')
      ? story.imageUrl
      : `/images${story.imageUrl}`;
  }
  if (typeof window !== 'undefined') {
    console.log('StoryCard imageSrc:', imageSrc);
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Hidden audio element for page flip sound */}
      <audio ref={audioRef} src="/sounde/page-flip.mp3" preload="auto" />
      <CardHeader className="p-4">
        <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden bg-secondary/10">
          <Image
            src={imageSrc}
            alt={story.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-t-lg"
          />
          <Badge className="absolute top-2 right-2 bg-primary/90" variant="secondary">
            {story.category}
          </Badge>
        </div>
        <CardTitle className="text-xl font-semibold text-primary">
          {language === 'english' ? story.title : story.titleTamil || story.title}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground italic">
          {story.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-foreground line-clamp-3">
          {language === 'english' ? story.excerpt : story.excerptTamil || story.excerpt}
        </p>
        
        {showMoral && (story.moral || story.moralTamil) && (
          <div className="mt-3 p-2 bg-amber-50 rounded-md border border-amber-200">
            <p className="text-sm text-amber-800 font-medium">
              {language === 'english' ? 'Moral:' : 'நீதி:'}
            </p>
            <p className="text-sm text-amber-700 italic">
              {language === 'english' ? story.moral : story.moralTamil || story.moral}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleListen} className="flex-1 min-w-[80px]" size="sm">
          <PlayCircle className="mr-2 h-4 w-4" /> Listen
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={handleReadStory} 
          className="flex-1 min-w-[80px]"
          size="sm"
        >
          <BookOpen className="mr-2 h-4 w-4" /> Read
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={toggleLanguage} 
          className="flex-1 min-w-[80px]"
          size="sm"
        >
          <Globe className="mr-2 h-4 w-4" /> 
          {language === 'english' ? 'தமிழ்' : 'English'}
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={() => setShowMoral(!showMoral)} 
          className="flex-1 min-w-[80px]"
          size="sm"
        >
          <MessageCircle className="mr-2 h-4 w-4" /> 
          {showMoral ? 'Hide Moral' : 'Show Moral'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
