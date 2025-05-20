"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Puzzle } from 'lucide-react';
import { videoLessons } from '@/data/mock-data';

export default function VideoPlayerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [isVideoComplete, setIsVideoComplete] = useState(false);

  useEffect(() => {
    // Get video URL and title from localStorage
    const storedUrl = localStorage.getItem('currentVideoUrl');
    const storedTitle = localStorage.getItem('currentVideoTitle');
    
    if (storedUrl && storedTitle) {
      setVideoUrl(storedUrl);
      setVideoTitle(storedTitle);
    } else {
      // If not in localStorage, find from videoLessons
      const lesson = videoLessons.find(l => l.id === params.id);
      if (lesson) {
        setVideoUrl(lesson.videoUrl);
        setVideoTitle(lesson.title);
      } else {
        router.push('/learn/videos');
      }
    }
  }, [params.id, router]);

  const handleVideoComplete = () => {
    setIsVideoComplete(true);
  };

  const handleStartQuiz = () => {
    router.push(`/quiz?video=${params.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">{videoTitle}</h1>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Watch and Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
            <iframe
              src={videoUrl.replace('/view?usp=sharing', '/preview')}
              className="w-full h-full"
              allowFullScreen
              onEnded={handleVideoComplete}
            />
          </div>
        </CardContent>
      </Card>

      {isVideoComplete && (
        <Card className="shadow-lg bg-primary/5">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Great job watching the video!</h2>
            <p className="text-muted-foreground mb-6">
              Now it's time to test what you've learned. Take the quiz to reinforce your knowledge!
            </p>
            <Button size="lg" onClick={handleStartQuiz}>
              <Puzzle className="mr-2 h-5 w-5" /> Start Quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
