'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import DialogueSelector from '@/components/dialogue/dialogue-selector';
import DialogueConversation, { DialogueMessage, DialogueScenario } from '@/components/dialogue/dialogue-conversation';
import { ArrowLeft, Award, Save } from 'lucide-react';

// Define the possible states of the dialogue page
type DialogueState = 'selection' | 'conversation' | 'completed';

export default function DialogueClient() {
  const [dialogueState, setDialogueState] = useState<DialogueState>('selection');
  const [selectedScenario, setSelectedScenario] = useState<DialogueScenario | null>(null);
  const [conversationHistory, setConversationHistory] = useState<DialogueMessage[]>([]);
  const { toast } = useToast();

  // Handle scenario selection
  const handleSelectScenario = (scenario: DialogueScenario) => {
    setSelectedScenario(scenario);
    setDialogueState('conversation');
  };

  // Handle conversation completion
  const handleConversationComplete = (messages: DialogueMessage[]) => {
    setConversationHistory(messages);
    setDialogueState('completed');
    
    toast({
      title: "Conversation Completed!",
      description: `Great job talking with ${selectedScenario?.characterName}!`,
    });
  };

  // Handle saving conversation
  const handleSaveConversation = () => {
    // In a real app, this would save to a database
    toast({
      title: "Conversation Saved!",
      description: "Your conversation has been saved for future reference.",
    });
  };

  // Handle starting a new conversation
  const handleStartNew = () => {
    setDialogueState('selection');
    setSelectedScenario(null);
    setConversationHistory([]);
  };

  // Render different content based on the current state
  const renderContent = () => {
    switch (dialogueState) {
      case 'selection':
        return <DialogueSelector onSelectScenario={handleSelectScenario} />;
        
      case 'conversation':
        return selectedScenario ? (
          <div className="space-y-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setDialogueState('selection')}
              className="flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Back to scenarios
            </Button>
            <DialogueConversation 
              scenario={selectedScenario} 
              onComplete={handleConversationComplete} 
            />
          </div>
        ) : null;
        
      case 'completed':
        return (
          <Card className="shadow-lg">
            <CardContent className="pt-6 space-y-6">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-6 rounded-full">
                  <Award className="h-16 w-16 text-primary" />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Conversation Complete!</h2>
                <p className="text-muted-foreground">
                  You've successfully practiced talking with {selectedScenario?.characterName}.
                </p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">What you learned:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>How to introduce yourself to a {selectedScenario?.characterRole}</li>
                  <li>Appropriate questions to ask</li>
                  <li>How to respond to questions</li>
                  <li>Important safety tips for this situation</li>
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row gap-2 pt-0">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto flex items-center gap-2"
                onClick={handleSaveConversation}
              >
                <Save size={16} />
                Save Conversation
              </Button>
              <Button 
                className="w-full sm:w-auto"
                onClick={handleStartNew}
              >
                Try Another Scenario
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {renderContent()}
    </div>
  );
} 