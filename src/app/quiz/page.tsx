'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const QuizGeneratorClient = dynamic(() => import('./quiz-generator-client'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Loading Quiz Generator...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your quiz experience.</p>
      </div>
    </div>
  ),
});

export default function QuizPage() {
  return <QuizGeneratorClient />;
}
