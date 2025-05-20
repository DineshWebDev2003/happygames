'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

interface Question {
  text: string;
  options: string[];
  correctIndex: number;
}

interface MiniQuizProps {
  characterRole: string;
  onComplete: (score: number, total: number) => void;
}

export default function MiniQuiz({ characterRole, onComplete }: MiniQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Get questions based on character role
  const questions = getQuestions(characterRole);
  
  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
    
    if (index === questions[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        // Quiz completed
        onComplete(score + (index === questions[currentQuestion].correctIndex ? 1 : 0), questions.length);
      }
    }, 1500);
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-primary/10 pb-3">
        <CardTitle className="text-lg">Quick Knowledge Check!</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
            <p className="text-sm font-medium">Score: {score}</p>
          </div>
          
          <p className="text-base font-medium mb-3">{questions[currentQuestion].text}</p>
          
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-start text-left p-3 h-auto ${
                  showFeedback && index === questions[currentQuestion].correctIndex
                    ? 'bg-green-100 border-green-500 text-green-900'
                    : showFeedback && index === selectedOption
                      ? 'bg-red-100 border-red-500 text-red-900'
                      : ''
                }`}
                disabled={showFeedback}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-shrink-0">
                    {showFeedback && index === questions[currentQuestion].correctIndex && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                    {showFeedback && index === selectedOption && index !== questions[currentQuestion].correctIndex && (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                    {(!showFeedback || (index !== selectedOption && index !== questions[currentQuestion].correctIndex)) && (
                      <div className="h-5 w-5 rounded-full border border-primary/50 flex items-center justify-center">
                        <span className="text-xs">{String.fromCharCode(65 + index)}</span>
                      </div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to get questions based on character role
function getQuestions(role: string): Question[] {
  switch(role) {
    case 'Pediatrician':
      return [
        {
          text: "Why is it important to tell a doctor exactly how you feel?",
          options: [
            "To make the appointment go faster",
            "To help the doctor understand what might be wrong",
            "To show how smart you are",
            "It's not important"
          ],
          correctIndex: 1
        },
        {
          text: "What should you do if you're scared at a doctor's visit?",
          options: [
            "Run away from the doctor",
            "Pretend you're not scared",
            "Tell the doctor how you feel",
            "Close your eyes until it's over"
          ],
          correctIndex: 2
        }
      ];
      
    case 'Elementary School Teacher':
      return [
        {
          text: "What should you do if you're having trouble with a subject in school?",
          options: [
            "Keep it to yourself so no one knows",
            "Tell your teacher so they can help you",
            "Skip that subject",
            "Copy another student's work"
          ],
          correctIndex: 1
        },
        {
          text: "What does asking questions in class show?",
          options: [
            "That you aren't smart enough",
            "That you aren't paying attention",
            "That you are engaged in learning",
            "That you want to delay the lesson"
          ],
          correctIndex: 2
        }
      ];
      
    case 'Community Police Officer':
      return [
        {
          text: "What should you do if you get lost?",
          options: [
            "Wander around looking for your parents",
            "Stay in one place and find a safe person to ask for help",
            "Go home by yourself",
            "Talk to any stranger who offers help"
          ],
          correctIndex: 1
        },
        {
          text: "What is one of the main jobs of police officers?",
          options: [
            "To scare children",
            "To give out candy",
            "To help keep communities safe",
            "To drive fast cars"
          ],
          correctIndex: 2
        }
      ];
      
    case 'Friendly Neighbor':
      return [
        {
          text: "Why is it good to be polite to neighbors?",
          options: [
            "So they'll give you presents",
            "To create a friendly community",
            "To make them do favors for you",
            "It's not important to be polite"
          ],
          correctIndex: 1
        },
        {
          text: "What should you do before playing with someone else's pet?",
          options: [
            "Just go ahead and play with it",
            "Ask permission from the owner",
            "Feed it treats",
            "Run around with it"
          ],
          correctIndex: 1
        }
      ];
      
    case 'Store Employee':
      return [
        {
          text: "What should you do if you can't find your parents in a store?",
          options: [
            "Leave the store to look for them",
            "Hide until they find you",
            "Find a store employee and ask for help",
            "Cry until someone notices you"
          ],
          correctIndex: 2
        },
        {
          text: "What should you do if you accidentally break something in a store?",
          options: [
            "Hide it and walk away",
            "Blame someone else",
            "Tell a store employee what happened",
            "Pretend you didn't see it"
          ],
          correctIndex: 2
        }
      ];
      
    default:
      return [
        {
          text: "What is an important part of good communication?",
          options: [
            "Always talking, never listening",
            "Both speaking and listening",
            "Speaking as loudly as possible",
            "Using the biggest words you know"
          ],
          correctIndex: 1
        },
        {
          text: "Why is it important to ask questions?",
          options: [
            "To annoy adults",
            "It's not important",
            "To delay bedtime",
            "To learn new things"
          ],
          correctIndex: 3
        }
      ];
  }
} 