import type { GenerateQuizOutput } from '@/ai/flows/generate-quiz';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, XSquare } from 'lucide-react';

interface QuizDisplayProps {
  quizData: GenerateQuizOutput;
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({ quizData }) => {
  if (!quizData || !quizData.quiz || quizData.quiz.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-muted-foreground">No quiz generated yet, or the generated quiz is empty.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Your Generated Quiz!</CardTitle>
        <CardDescription>Review the questions, options, and answers below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {quizData.quiz.map((q, index) => (
          <div key={index} className="p-4 border rounded-lg bg-background shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {`Question ${index + 1}: ${q.question}`}
            </h3>
            <ul className="space-y-2 mb-3">
              {q.options.map((option, optIndex) => (
                <li
                  key={optIndex}
                  className={`flex items-center p-2 rounded-md text-sm ${
                    option === q.answer
                      ? 'bg-green-100 text-green-700 font-medium'
                      : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {option === q.answer ? (
                    <CheckSquare className="h-5 w-5 mr-2 text-green-600 shrink-0" />
                  ) : (
                    <XSquare className="h-5 w-5 mr-2 text-red-500 shrink-0 opacity-0" /> // Keep alignment but hide for non-answers
                  )}
                  {option}
                </li>
              ))}
            </ul>
            <div className="mt-2">
               <Badge variant="default" className="bg-secondary text-secondary-foreground">
                 Correct Answer: {q.answer}
               </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuizDisplay;
