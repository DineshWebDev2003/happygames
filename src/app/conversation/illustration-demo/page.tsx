'use client';

import { useState } from 'react';
import ConversationIllustration from '@/components/dialogue/conversation-illustration';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function IllustrationDemoPage() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  
  // Define a few different conversation scenarios
  const scenarios = [
    {
      doctorSpeech: "Hi there! I'm Dr. Smith. How are you feeling today?",
      childSpeech: "I have a tummy ache",
      characterRole: "Pediatrician"
    },
    {
      doctorSpeech: "Can you tell me about your favorite subject in school?",
      childSpeech: "I really like science class!",
      characterRole: "Elementary School Teacher"
    },
    {
      doctorSpeech: "Remember to always look both ways before crossing the street!",
      childSpeech: "I always do that!",
      characterRole: "Community Police Officer"
    }
  ];
  
  const handleNext = () => {
    setCurrentScenario((prev) => (prev + 1) % scenarios.length);
  };
  
  const handlePrevious = () => {
    setCurrentScenario((prev) => (prev - 1 + scenarios.length) % scenarios.length);
  };
  
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">TN HappyKids Learn - Conversations</h1>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader className="bg-primary/10 pb-3">
          <CardTitle className="flex justify-between items-center">
            <span>Learning through Conversations</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsInteractive(!isInteractive)}
            >
              {isInteractive ? "View Static Example" : "Try Interactive Mode"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-6">
          <ConversationIllustration
            doctorSpeech={scenarios[currentScenario].doctorSpeech}
            childSpeech={!isInteractive ? scenarios[currentScenario].childSpeech : ""}
            characterRole={scenarios[currentScenario].characterRole}
            interactive={isInteractive}
            onContinue={handleNext}
          />
          
          {!isInteractive && (
            <div className="flex justify-between mt-6">
              <Button onClick={handlePrevious} variant="outline">Previous</Button>
              <Button onClick={handleNext}>Next Scenario</Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-primary/10">
          <CardTitle>About This Feature</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p>
            The conversation illustration component helps kids practice important social 
            interactions by visualizing conversations with different characters like doctors, 
            teachers, and police officers. This visual approach makes learning social skills 
            more engaging and memorable.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-muted/30 p-3 rounded-lg">
              <h3 className="font-medium mb-2">Learning Benefits:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Builds social communication skills</li>
                <li>Teaches appropriate responses</li>
                <li>Reduces anxiety about new situations</li>
                <li>Improves emotional intelligence</li>
              </ul>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <h3 className="font-medium mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Interactive conversation practice</li>
                <li>Visual speech bubbles</li>
                <li>Different scenarios with various characters</li>
                <li>Educational tips embedded in responses</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 