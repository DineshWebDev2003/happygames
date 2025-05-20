'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateQuiz, type GenerateQuizOutput } from '@/ai/flows/generate-quiz';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import QuizDisplay from '@/components/quiz/quiz-display';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import { videoLessons, type VideoLesson } from '@/data/mock-data';

const quizFormSchema = z.object({
  storyContent: z.string().min(50, { message: 'Story content must be at least 50 characters long.' }).max(5000, { message: "Story content cannot exceed 5000 characters."}),
  quizLength: z.coerce.number().min(1, { message: 'Quiz must have at least 1 question.' }).max(10, { message: 'Quiz can have at most 10 questions.' }),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

export default function QuizGeneratorClient() {
  const [quizResult, setQuizResult] = useState<GenerateQuizOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      storyContent: '',
      quizLength: 5,
    },
  });

  useEffect(() => {
    // Set isBrowser to true once the component mounts
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    // Only run client-side code after component has mounted
    if (!isBrowser) return;

    if (typeof window !== 'undefined' && window.localStorage) {
      // Handle story-based quiz
      if (searchParams.get('source') === 'story') {
        const storyContent = localStorage.getItem('quizStoryContent');
        const storyTitle = localStorage.getItem('quizStoryTitle');
        if (storyContent) {
          form.setValue('storyContent', storyContent);
          toast({
            title: "Story Loaded!",
            description: `"${storyTitle || 'Selected story'}" content has been pre-filled for quiz generation.`,
          });
          // Clean up localStorage after use
          localStorage.removeItem('quizStoryContent');
          localStorage.removeItem('quizStoryTitle');
        }
      }
      
      // Handle video-based quiz
      const videoId = searchParams.get('video');
      if (videoId) {
        const videoLesson = videoLessons.find(l => l.id === videoId);
        if (videoLesson) {
          // Generate quiz based on video content
          generateVideoQuiz(videoLesson);
        }
      }
    }
  }, [searchParams, form, toast, isBrowser]);

  const generateVideoQuiz = async (videoLesson: VideoLesson) => {
    if (!isBrowser) return;

    setIsLoading(true);
    setQuizResult(null);
    try {
      // Here you would typically have an API call to generate quiz based on video content
      // For now, we'll use a placeholder quiz
      const result = await generateQuiz({
        storyContent: `Generate a quiz about ${videoLesson.title}. The video covers ${videoLesson.description}`,
        quizLength: 5
      });
      setQuizResult(result);
      toast({
        title: 'Quiz Generated!',
        description: `Test your knowledge about ${videoLesson.title}!`,
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast({
        title: 'Error Generating Quiz',
        description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<QuizFormValues> = async (data) => {
    if (!isBrowser) return;

    setIsLoading(true);
    setQuizResult(null);
    try {
      const result = await generateQuiz(data);
      setQuizResult(result);
      toast({
        title: 'Quiz Generated!',
        description: 'Your personalized quiz is ready below.',
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast({
        title: 'Error Generating Quiz',
        description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">AI Quiz Whiz</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Paste a story or text below, choose the number of questions, and let our AI create a fun quiz for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="storyContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="storyContent" className="text-lg">Story / Text Content</FormLabel>
                    <FormControl>
                      <Textarea
                        id="storyContent"
                        placeholder="Paste your story here... (min 50 characters)"
                        className="min-h-[150px] text-base resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quizLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="quizLength" className="text-lg">Number of Questions</FormLabel>
                    <FormControl>
                      <Input id="quizLength" type="number" placeholder="e.g., 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full text-lg font-medium py-6" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Quiz...
                  </>
                ) : (
                  'Create My Quiz!'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {quizResult && <QuizDisplay quizData={quizResult} />}
    </div>
  );
}
