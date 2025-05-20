'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DialogueScenario } from './dialogue-conversation';
import CharacterAvatar from './character-avatar';

// Sample dialogue scenarios
const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  {
    title: 'Doctor Visit',
    description: 'Learn about health and medical care by talking to a doctor',
    characterName: 'Dr. Smith',
    characterRole: 'Pediatrician',
    characterImage: '/images/kido-avatar.jpg',
    initialMessage: "Hello there! I'm Dr. Smith. How are you feeling today? Remember, it's important to tell doctors how you're feeling so we can help you stay healthy.",
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
  },
  {
    title: 'Teacher Conference',
    description: 'Learn how to communicate about school and learning challenges',
    characterName: 'Ms. Johnson',
    characterRole: 'Elementary School Teacher',
    characterImage: '/images/kido-avatar.jpg',
    initialMessage: "Hi there! I'm Ms. Johnson. How are you doing in school? Remember, it's always good to share both what you enjoy and what you find difficult.",
    suggestedResponses: [
      'I like math class',
      'Reading is hard for me',
      'I made new friends',
      'Can you help me with homework?'
    ],
    possibleScenarios: [
      'Discussing a difficult subject',
      'Talking about friends',
      'Getting help with homework'
    ],
    learningPoints: [
      'How to talk about academic challenges',
      'Asking for help with learning',
      'Discussing social experiences at school',
      'Building a positive relationship with teachers'
    ]
  },
  {
    title: 'Police Officer',
    description: 'Learn about safety and how police officers help the community',
    characterName: 'Officer Parker',
    characterRole: 'Community Police Officer',
    characterImage: '/images/kido-avatar.jpg',
    initialMessage: "Hello there! I'm Officer Parker. Do you need any help today? Police officers are here to keep you safe, and you can always come to us if you need help.",
    suggestedResponses: [
      "I'm lost and can't find my parents",
      "There's a stranger following me",
      'I found something dangerous',
      'Just wanted to learn about police officers'
    ],
    possibleScenarios: [
      'Getting lost',
      'Reporting something suspicious',
      'Emergency situations'
    ],
    learningPoints: [
      'What to do if you get lost',
      'How to recognize unsafe situations',
      'When and how to get help from police',
      'Understanding the role of police in the community'
    ]
  },
  {
    title: 'Neighbor Chat',
    description: 'Learn about community relationships and being a good neighbor',
    characterName: 'Mrs. Wilson',
    characterRole: 'Friendly Neighbor',
    characterImage: '/images/kido-avatar.jpg',
    initialMessage: "Hi there! I'm Mrs. Wilson from next door. How are you doing today? Being friendly with neighbors helps create a safe, pleasant community.",
    suggestedResponses: [
      "I'm good, how are you?",
      'Do you need help carrying your groceries?',
      'Can I play with your dog?',
      'My ball went into your yard'
    ],
    possibleScenarios: [
      'Asking for help',
      'Offering assistance',
      'Resolving a small problem'
    ],
    learningPoints: [
      'Being polite and respectful to neighbors',
      'Offering help to community members',
      'Asking permission appropriately',
      'Resolving minor conflicts respectfully'
    ]
  },
  {
    title: 'Store Clerk',
    description: 'Learn about shopping, asking for help, and handling public situations',
    characterName: 'Alex',
    characterRole: 'Store Employee',
    characterImage: '/images/kido-avatar.jpg',
    initialMessage: "Welcome to the store! I'm Alex. How can I help you today? Store employees are here to help you find what you need and answer questions.",
    suggestedResponses: [
      "I'm looking for the toy section",
      'Can you help me find my mom?',
      'How much does this cost?',
      'I dropped something and it broke'
    ],
    possibleScenarios: [
      'Finding items in a store',
      'Asking for prices',
      'Getting lost in a store'
    ],
    learningPoints: [
      'How to ask for help in public places',
      'What to do if you get separated from parents',
      'Understanding basic shopping concepts',
      'Taking responsibility for accidents'
    ]
  }
];

interface DialogueSelectorProps {
  onSelectScenario: (scenario: DialogueScenario) => void;
}

const DialogueSelector: React.FC<DialogueSelectorProps> = ({ onSelectScenario }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [...new Set(DIALOGUE_SCENARIOS.map(s => s.characterRole))];
  
  const filteredScenarios = selectedCategory 
    ? DIALOGUE_SCENARIOS.filter(s => s.characterRole === selectedCategory)
    : DIALOGUE_SCENARIOS;
    
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <Button 
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="rounded-full"
        >
          All
        </Button>
        
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredScenarios.map((scenario, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="bg-primary/10 pb-2">
              <CardTitle className="text-lg">{scenario.title}</CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="flex items-center space-x-3 mb-3">
                <CharacterAvatar
                  name={scenario.characterName}
                  role={scenario.characterRole}
                  imageSrc={scenario.characterImage}
                />
                <div>
                  <h4 className="font-medium">{scenario.characterName}</h4>
                  <p className="text-sm text-muted-foreground">{scenario.characterRole}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-primary/5 p-3 rounded-lg">
                  <p className="text-xs font-medium text-primary mb-2">Learning objectives:</p>
                  <ul className="space-y-1">
                    {scenario.learningPoints.slice(0, 2).map((point, i) => (
                      <li key={i} className="text-xs flex items-start gap-1.5">
                        <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                        </div>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                    {scenario.learningPoints.length > 2 && (
                      <li className="text-xs text-muted-foreground italic">
                        ...and {scenario.learningPoints.length - 2} more
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Practice scenarios:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scenario.possibleScenarios.map((s, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-background">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button 
                onClick={() => onSelectScenario(scenario)} 
                className="w-full"
              >
                Start Conversation
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DialogueSelector; 