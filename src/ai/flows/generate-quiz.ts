'use server';

/**
 * @fileOverview Generates quizzes based on stories.
 *
 * - generateQuiz - A function that generates a quiz based on a given story.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  storyContent: z
    .string()
    .describe('The content of the story to generate a quiz from.'),
  quizLength: z
    .number()
    .default(5)
    .describe('The desired number of questions in the quiz.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  quiz: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The possible answers.'),
      answer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('The generated quiz questions and answers.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  // Check if we're in a build environment or if the environment variables are not set
  if (
    process.env.NODE_ENV === 'production' && 
    (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.NEXT_PUBLIC_GEMINI_API_KEY)
  ) {
    console.log('Using placeholder quiz during build or missing API key');
    return {
      quiz: [
        {
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          answer: "Paris"
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          answer: "Mars"
        },
        {
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          answer: "4"
        }
      ]
    };
  }
  
  return generateQuizFlow(input);
}

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert quiz generator for children's stories. Based on the story provided, generate a quiz with {{quizLength}} questions.  Each question should have 4 possible answers, and clearly indicate which answer is correct.

Story Content: {{{storyContent}}}

Output the quiz as a JSON array of question objects. Each question object should have a "question" field, an "options" field containing an array of 4 strings, and an "answer" field containing the correct answer as a string. The answer must be one of the strings in the "options" array.
`, 
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input: GenerateQuizInput) => {
    // Skip AI processing during build or if API key is missing
    if (
      process.env.NODE_ENV === 'production' && 
      (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.NEXT_PUBLIC_GEMINI_API_KEY)
    ) {
      return {
        quiz: [
          {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            answer: "Paris"
          },
          {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
          },
          {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
          }
        ]
      };
    }
    
    try {
      const result = await generateQuizPrompt(input);
      return result.output!;
    } catch (error) {
      console.error('Error generating quiz:', error);
      return {
        quiz: [
          {
            question: "Unable to generate quiz at this time",
            options: ["Try again later", "Check your connection", "Refresh the page", "Contact support"],
            answer: "Try again later"
          }
        ]
      };
    }
  }
);
