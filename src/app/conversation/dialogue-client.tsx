'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

  // Get detailed explanations for learning points based on character role
  const getPointDetail = (role: string | undefined, index: number): string => {
    if (!role) return '';
    
    switch(role) {
      case 'Pediatrician':
        const doctorDetails = [
          "When you tell a doctor exactly where it hurts and how you feel, they can help you better. Be specific about your symptoms.",
          "Regular checkups help doctors make sure you're growing well and catch any problems early. Don't be afraid to ask questions.",
          "Vaccines are like training for your immune system, helping your body learn to fight diseases before you get sick.",
          "It's normal to feel scared at the doctor, but remember they're there to help you stay healthy. Tell them if you're scared."
        ];
        return doctorDetails[index] || '';
        
      case 'Elementary School Teacher':
        const teacherDetails = [
          "If you're finding something difficult at school, it's important to speak up. Teachers can't help if they don't know you're struggling.",
          "Everyone needs help sometimes. Asking questions shows you're engaged in learning, not that you're not smart enough.",
          "Talking about friends and social situations helps teachers understand your school experience and provide support.",
          "Having a good relationship with your teacher makes learning easier and school more enjoyable. They want to see you succeed!"
        ];
        return teacherDetails[index] || '';
        
      case 'Community Police Officer':
        const policeDetails = [
          "If you get lost, stay calm and find a safe person to ask for help—like a police officer, store employee, or parent with children.",
          "Trust your feelings. If something doesn't feel right, find a trusted adult and tell them what's happening.",
          "Police officers are there to help in emergencies. Know when to call 911 and understand what information to share.",
          "Police officers do more than catch criminals—they help keep communities safe, educate about safety, and assist people in need."
        ];
        return policeDetails[index] || '';
        
      case 'Friendly Neighbor':
        const neighborDetails = [
          "Being polite to neighbors helps create a friendly community. Simple greetings and 'please' and 'thank you' go a long way.",
          "Offering to help others builds community spirit. Even small acts of kindness make a big difference.",
          "Always ask before interacting with someone's property or pets. Respecting boundaries shows good manners.",
          "When problems happen, talking calmly and respectfully helps find solutions that work for everyone."
        ];
        return neighborDetails[index] || '';
        
      case 'Store Employee':
        const employeeDetails = [
          "Store employees are there to help. Practice being clear and polite when asking for what you need.",
          "If you can't find your parents, stay calm and find a store employee who can help you page or locate them.",
          "Understanding prices and basic money concepts helps you make good choices when shopping.",
          "Everyone makes mistakes. Taking responsibility means acknowledging what happened and helping fix it if possible."
        ];
        return employeeDetails[index] || '';
        
      default:
        return '';
    }
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <DialogueConversation 
                  scenario={selectedScenario} 
                  onComplete={handleConversationComplete} 
                />
              </div>
              
              <div className="hidden md:block">
                <Card className="sticky top-4">
                  <CardHeader className="bg-primary/10 pb-2">
                    <CardTitle className="text-lg">Learning Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        While talking with {selectedScenario.characterName}, think about:
                      </p>
                      <ul className="space-y-2">
                        {selectedScenario.learningPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">{index + 1}</span>
                            </div>
                            <p className="text-sm">{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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
                <h2 className="text-2xl font-bold">Great Job!</h2>
                <p className="text-muted-foreground">
                  You've successfully practiced talking with {selectedScenario?.characterName}.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium mb-3">What you learned:</h3>
                
                <div className="space-y-4">
                  {selectedScenario?.learningPoints.map((point, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-primary/10">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{point}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getPointDetail(selectedScenario?.characterRole, index)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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