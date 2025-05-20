"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import type { Alphabet } from '@/data/mock-data';

interface AlphabetCardProps {
  alphabet: Alphabet;
}

const AlphabetCard: React.FC<AlphabetCardProps> = ({ alphabet }) => {
  const handleSound = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Speak both the letter and the word, e.g., 'A is for Apple'
      const text = `${alphabet.letter} is for ${alphabet.word.split(' ').slice(3).join(' ')}`;
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.rate = 0.8;
      utter.pitch = 1.1;
      utter.voice = window.speechSynthesis.getVoices().find(v => v.name.toLowerCase().includes("female")) || undefined;
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
      <CardHeader className="p-4">
        <CardTitle className="text-6xl font-bold text-primary">{alphabet.letter}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-2 rounded-lg overflow-hidden shadow-inner bg-secondary/20">
          <Image
            src={alphabet.imageUrl}
            alt={alphabet.word}
            layout="fill"
            objectFit="cover"
            data-ai-hint={alphabet.imageHint}
            unoptimized
          />
        </div>
        <p className="text-lg font-semibold text-foreground">{alphabet.word}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleSound} 
          aria-label={`Hear ${alphabet.letter}`}
          className="hover:bg-primary/10"
        >
          <Volume2 className="h-5 w-5 text-accent" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlphabetCard;
