'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DialogueConversation, { DialogueScenario } from '@/components/dialogue/dialogue-conversation';

export default function TestClient() {
  const [messages, setMessages] = useState<any[]>([]);
  
  const testScenario: DialogueScenario = {
    title: 'Doctor Visit',
    description: 'Practice talking to a doctor about how you feel',
    characterName: 'Dr. Smith',
    characterRole: 'Pediatrician',
    characterImage: '/conversation/Doctor.jpg',
    initialMessage: "Hello there! I'm Dr. Smith. How are you feeling today?",
    suggestedResponses: [
      'I have a headache',
      'My stomach hurts',
      'I feel fine, just here for a checkup',
      "I'm scared of doctors"
    ],
    possibleScenarios: [
      'Regular checkup',
      'Feeling sick',
      'Getting a vaccination'
    ],
    learningPoints: [
      'How to communicate your symptoms to a doctor',
      'Understanding medical checkups',
      'Why vaccinations are important',
      'Overcoming fear of doctor visits'
    ]
  };
  
  const handleConversationComplete = (messages: any[]) => {
    setMessages(messages);
    console.log('Conversation completed:', messages);
  };
  
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h2 className="text-lg font-bold">Test Conversation</h2>
        <p className="text-muted-foreground">This is a test of the dialogue conversation component.</p>
        <Button 
          onClick={() => console.log('Current messages:', messages)}
          className="mt-2"
        >
          Log Messages
        </Button>
      </Card>
      
      <DialogueConversation 
        scenario={testScenario} 
        onComplete={handleConversationComplete} 
      />
    </div>
  );
} 