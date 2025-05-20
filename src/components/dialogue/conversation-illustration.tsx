'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CharacterAvatar from './character-avatar';
import '@/app/conversation/illustration-demo/page.css';

interface ConversationIllustrationProps {
  doctorSpeech?: string;
  childSpeech?: string;
  characterRole?: string;
  onContinue?: () => void;
  interactive?: boolean;
}

export default function ConversationIllustration({
  doctorSpeech = "Hi there! I'm Dr. Smith. How are you feeling today?",
  childSpeech = "",
  characterRole = "Pediatrician",
  onContinue,
  interactive = false
}: ConversationIllustrationProps) {
  const [showDoctorSpeech, setShowDoctorSpeech] = useState(false);
  const [showChildSpeech, setShowChildSpeech] = useState(false);
  const [childResponse, setChildResponse] = useState(childSpeech);
  
  // Predefined responses for the child
  const childResponses = [
    "I have a tummy ache",
    "I feel good today!",
    "Can you help me?",
    "I'm a little scared"
  ];

  useEffect(() => {
    // Animate the speech bubbles appearing
    setTimeout(() => setShowDoctorSpeech(true), 500);
    if (childSpeech) {
      setTimeout(() => setShowChildSpeech(true), 2000);
    }
  }, [childSpeech]);

  // Handle when child response is selected (in interactive mode)
  const handleSelectResponse = (response: string) => {
    setChildResponse(response);
    setShowChildSpeech(true);
    
    // Call onContinue after a delay to allow reading
    if (onContinue) {
      setTimeout(onContinue, 2000);
    }
  };

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] relative">
      {/* Background gradient */}
      <div className="absolute inset-0 animated-bg rounded-xl"></div>
      
      {/* Doctor character */}
      <div className="absolute left-[10%] bottom-8 md:bottom-12 flex flex-col items-center">
        <div className="relative">
          {/* Speech bubble */}
          <div 
            className={`absolute -top-28 md:-top-32 left-0 w-48 md:w-64 p-3 bg-white rounded-xl border-2 border-black transform transition-all duration-500 speech-bubble ${
              showDoctorSpeech ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              borderRadius: '20px 20px 20px 5px',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.1)'
            }}
          >
            <p className="text-sm md:text-base">{doctorSpeech}</p>
          </div>
          
          {/* Doctor image */}
          <div className="w-24 h-24 md:w-32 md:h-32 character-avatar">
            <Image 
              src="/images/doctor-character.jpg" 
              alt="Doctor" 
              width={128} 
              height={128}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Fallback to avatar if image doesn't load */}
            <div className="w-24 h-24 md:w-32 md:h-32 absolute top-0 left-0">
              <CharacterAvatar 
                name="Doctor" 
                role="Pediatrician" 
                className="w-full h-full" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Child character */}
      <div className="absolute right-[10%] bottom-8 md:bottom-12 flex flex-col items-center">
        <div className="relative">
          {/* Speech bubble */}
          {(childResponse || !interactive) && (
            <div 
              className={`absolute -top-28 md:-top-32 right-0 w-48 md:w-64 p-3 bg-white rounded-xl border-2 border-black transform transition-all duration-500 speech-bubble ${
                showChildSpeech ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                borderRadius: '20px 20px 5px 20px',
                boxShadow: '2px 2px 0 rgba(0,0,0,0.1)'
              }}
            >
              <p className="text-sm md:text-base">{childResponse}</p>
            </div>
          )}
          
          {/* Child image */}
          <div className="w-20 h-20 md:w-28 md:h-28 character-avatar">
            <Image 
              src="/images/child-character.jpg" 
              alt="Child" 
              width={112} 
              height={112}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Colorful avatar fallback */}
            <div className="w-20 h-20 md:w-28 md:h-28 absolute top-0 left-0 bg-orange-200 rounded-full flex items-center justify-center border-2 border-orange-400">
              <span className="text-xl md:text-2xl">👧</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive response options */}
      {interactive && !childResponse && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Card className="p-3 bg-white/80 backdrop-blur">
            <p className="text-center mb-2 text-sm">How would you respond?</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {childResponses.map((response, index) => (
                <Button 
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectResponse(response)}
                  className="bg-primary/10 hover:bg-primary/20 border-primary/30 hover:scale-105 transition-transform"
                >
                  {response}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 