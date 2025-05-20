'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import './page.css'; // Import the CSS file

// Define the characters with their respective roles and images
const CHARACTERS = [
  {
    role: 'Doctor',
    image: '/conversation/Doctor.jpg', // Updated correct path to Doctor.jpg
    color: 'from-green-200 to-blue-200',
    speechColor: 'bg-white',
  },
  {
    role: 'Police',
    image: '/conversation/Doctor.jpg', // Updated correct path to Doctor.jpg
    color: 'from-blue-200 to-indigo-300',
    speechColor: 'bg-white',
  },
  {
    role: 'Teacher',
    image: '/conversation/Doctor.jpg', // Updated correct path to Doctor.jpg
    color: 'from-yellow-100 to-orange-200',
    speechColor: 'bg-white',
  }
];

// Define conversation scenarios for each character
const SCENARIOS = [
  // Doctor scenarios
  [
    {
      character: "Hello! I'm Dr. Anna. How are you feeling today?",
      child: "I have a tummy ache."
    },
    {
      character: "I'm sorry to hear that. Can you point to where it hurts?",
      child: "Around my belly button."
    },
    {
      character: "I'll check that for you. Have you eaten anything unusual today?",
      child: "I had ice cream for breakfast."
    }
  ],
  // Police scenarios
  [
    {
      character: "Hi there! I'm Officer Parker. Do you know what to do if you get lost?",
      child: "I should find a police officer or store employee."
    },
    {
      character: "That's right! And do you know your parents' phone number?",
      child: "Yes, I memorized it."
    },
    {
      character: "Excellent! It's important to know important numbers by heart.",
      child: "I also know my home address."
    }
  ],
  // Teacher scenarios
  [
    {
      character: "Hello! I'm Ms. Johnson. What's your favorite subject in school?",
      child: "I really like science class!"
    },
    {
      character: "Science is fascinating! What do you enjoy most about it?",
      child: "I love doing experiments and learning about animals."
    },
    {
      character: "That's wonderful! Would you like to share what you learned recently?",
      child: "We learned about the water cycle and did an experiment with a plant."
    }
  ]
];

export default function ConversationPracticePage() {
  const [characterIndex, setCharacterIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showCharacterSpeech, setShowCharacterSpeech] = useState(false);
  const [showChildSpeech, setShowChildSpeech] = useState(false);
  
  const currentCharacter = CHARACTERS[characterIndex];
  const currentScenario = SCENARIOS[characterIndex][scenarioIndex];
  
  useEffect(() => {
    // Reset animations when scenario changes
    setShowCharacterSpeech(false);
    setShowChildSpeech(false);
    
    // Animate the speech bubbles appearing
    setTimeout(() => setShowCharacterSpeech(true), 500);
    setTimeout(() => setShowChildSpeech(true), 2000);
  }, [characterIndex, scenarioIndex]);

  const handleNextScenario = () => {
    if (scenarioIndex < SCENARIOS[characterIndex].length - 1) {
      setScenarioIndex(scenarioIndex + 1);
    } else {
      // Move to next character
      setCharacterIndex((characterIndex + 1) % CHARACTERS.length);
      setScenarioIndex(0);
    }
  };

  const handlePrevScenario = () => {
    if (scenarioIndex > 0) {
      setScenarioIndex(scenarioIndex - 1);
    } else {
      // Move to previous character
      const prevCharIndex = (characterIndex - 1 + CHARACTERS.length) % CHARACTERS.length;
      setCharacterIndex(prevCharIndex);
      setScenarioIndex(SCENARIOS[prevCharIndex].length - 1);
    }
  };

  const handleCharacterChange = (index: number) => {
    setCharacterIndex(index);
    setScenarioIndex(0);
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
        <h1 className="text-2xl font-bold">Conversation Practice</h1>
      </div>
      
      {/* Character selector */}
      <div className="flex justify-center gap-3 mb-4">
        {CHARACTERS.map((character, index) => (
          <Button
            key={character.role}
            variant={characterIndex === index ? "default" : "outline"}
            onClick={() => handleCharacterChange(index)}
            className="gap-2 p-1 pl-1 pr-3 h-10"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden mr-1">
              <Image 
                src={character.image}
                alt={character.role}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span>{character.role}</span>
          </Button>
        ))}
      </div>
      
      {/* Conversation display */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/10">
          <CardTitle className="flex justify-between items-center">
            <span>Practice with {currentCharacter.role}</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrevScenario}
                disabled={characterIndex === 0 && scenarioIndex === 0}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNextScenario}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Conversation scene */}
          <div className={`w-full min-h-[400px] relative bg-gradient-to-r ${currentCharacter.color} p-6 flex items-center justify-center`}>
            {/* Character */}
            <div className="absolute left-[15%] md:left-[20%] bottom-16 flex flex-col items-center">
              <div className="relative">
                {/* Speech bubble */}
                <div 
                  className={`absolute -top-28 md:-top-32 left-0 w-56 md:w-72 p-4 bg-white rounded-xl border-2 border-gray-800 transform transition-all duration-500 ${
                    showCharacterSpeech ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } speech-bubble character-speech`}
                  style={{
                    borderRadius: '20px 20px 20px 5px',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                  }}
                >
                  <p className="text-sm md:text-base font-medium">{currentScenario.character}</p>
                </div>
                
                {/* Character image */}
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-3 border-white shadow-lg relative bg-transparent">
                  <Image 
                    src={currentCharacter.image} 
                    alt={currentCharacter.role}
                    width={150}
                    height={150}
                    className="w-full h-full object-contain"
                    style={{ 
                      objectFit: 'contain',
                      background: 'transparent'
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Child */}
            <div className="absolute right-[15%] md:right-[20%] bottom-16 flex flex-col items-center">
              <div className="relative">
                {/* Speech bubble */}
                <div 
                  className={`absolute -top-28 md:-top-32 right-0 w-56 md:w-72 p-4 bg-white rounded-xl border-2 border-gray-800 transform transition-all duration-500 ${
                    showChildSpeech ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } speech-bubble child-speech`}
                  style={{
                    borderRadius: '20px 20px 5px 20px',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                  }}
                >
                  <p className="text-sm md:text-base font-medium">{currentScenario.child}</p>
                </div>
                
                {/* Child image */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-white shadow-lg relative bg-transparent">
                  <Image 
                    src="/conversation/kid.jpg" // Updated correct path to kid.jpg
                    alt="Child"
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                    style={{ 
                      objectFit: 'contain',
                      background: 'transparent'
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Learning tips */}
      <Card>
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-lg">Learning Tips</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <p>
              {characterIndex === 0 && "Practice using clear language to describe how you feel. This helps doctors understand your symptoms better."}
              {characterIndex === 1 && "Remember important safety information like your home address and a parent's phone number."}
              {characterIndex === 2 && "When talking with teachers, sharing your interests can help them provide better learning experiences."}
            </p>
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevScenario} className="gap-1">
                <ChevronLeft size={16} />
                Previous
              </Button>
              <Button onClick={handleNextScenario} className="gap-1">
                Next
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 