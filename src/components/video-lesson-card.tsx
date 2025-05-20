'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Puzzle } from 'lucide-react';
import type { VideoLesson } from '@/data/mock-data';
import { useRouter } from 'next/navigation';

interface VideoLessonCardProps {
  lesson: VideoLesson;
}

const VideoLessonCard: React.FC<VideoLessonCardProps> = ({ lesson }) => {
  const router = useRouter();

  const handlePlayVideo = () => {
    // Store the video URL in localStorage for the video player page
    localStorage.setItem('currentVideoUrl', lesson.videoUrl);
    localStorage.setItem('currentVideoTitle', lesson.title);
    router.push(`/learn/video/${lesson.id}`);
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden border-2 border-indigo-100">
      <CardHeader className="p-2 pb-1 sm:p-3 sm:pb-1 md:p-4 md:pb-2">
        <div className="relative w-full h-28 sm:h-36 md:h-48 mb-1 sm:mb-2 md:mb-3 rounded-md overflow-hidden bg-gradient-to-b from-indigo-50 to-purple-50">
          <Image
            src={lesson.thumbnailUrl}
            alt={lesson.title}
            width={400}
            height={250}
            className="w-full h-full object-contain transition-transform hover:scale-105 duration-300"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-start p-4">
            <PlayCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white" />
          </div>
        </div>
        <CardTitle className="text-sm sm:text-base md:text-xl font-semibold text-primary line-clamp-1">{lesson.title}</CardTitle>
        <CardDescription className="text-[10px] sm:text-xs text-muted-foreground italic">{lesson.category}</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 sm:p-3 sm:pt-0 md:p-4 md:pt-0 flex-grow">
        <p className="text-[10px] sm:text-xs md:text-sm text-foreground line-clamp-2 sm:line-clamp-2 md:line-clamp-3">{lesson.description}</p>
      </CardContent>
      <CardFooter className="p-2 sm:p-3 md:p-4 flex flex-col gap-1 sm:gap-2">
        <Button variant="outline" onClick={handlePlayVideo} className="w-full hover:bg-blue-600 hover:text-white group text-[10px] sm:text-xs md:text-sm h-7 sm:h-8 md:h-10">
          <PlayCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 group-hover:text-white" /> Watch Video
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => router.push(`/quiz?video=${lesson.id}`)} 
          className="w-full bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white text-[10px] sm:text-xs md:text-sm h-7 sm:h-8 md:h-10"
        >
          <Puzzle className="mr-1 sm:mr-2 h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4" /> Take Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoLessonCard; 