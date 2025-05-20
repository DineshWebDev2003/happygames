"use client";

import Image from 'next/image';
import { Volume2 } from 'lucide-react';
import type { Alphabet } from '@/data/mock-data';

interface AlphabetCardProps {
  alphabet: Alphabet;
}

const letterThemes: Record<string, string> = {
  A: 'from-pink-200 to-yellow-100',
  B: 'from-blue-200 to-green-100',
  C: 'from-yellow-200 to-pink-100',
  D: 'from-green-200 to-blue-100',
  E: 'from-purple-200 to-blue-100',
  F: 'from-orange-200 to-yellow-100',
  // ...add more for variety or randomize
};

const AlphabetCard: React.FC<AlphabetCardProps> = ({ alphabet }) => {
  const handleSound = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const text = `${alphabet.letter} is for ${alphabet.word.split(' ').slice(3).join(' ')}`;
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.rate = 0.8;
      utter.pitch = 1.1;
      utter.voice = window.speechSynthesis.getVoices().find(v => v.name.toLowerCase().includes("female")) || undefined;
      window.speechSynthesis.speak(utter);
    }
  };

  const theme = letterThemes[alphabet.letter] || 'from-yellow-100 to-blue-100';

  return (
    <div
      className={`group relative rounded-3xl p-4 bg-gradient-to-br ${theme} border-4 border-white/60 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-200 min-h-[320px] flex flex-col items-center text-center`}
      style={{ minHeight: 320 }}
    >
      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/70 shadow flex items-center justify-center text-lg font-bold text-yellow-500 border-2 border-yellow-300 animate-bounce">
        {alphabet.letter}
      </div>
      <div className="relative w-24 h-24 mb-4 rounded-2xl overflow-hidden shadow-inner bg-white/60 border-2 border-blue-100 group-hover:scale-110 transition-transform">
        <Image
          src={alphabet.imageUrl}
          alt={alphabet.word}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-lg"
          data-ai-hint={alphabet.imageHint}
          unoptimized
        />
      </div>
      <p className="text-xl font-extrabold text-blue-900 drop-shadow mb-2">{alphabet.word}</p>
      <button
        onClick={handleSound}
        aria-label={`Hear ${alphabet.letter}`}
        className="mt-auto p-3 rounded-full bg-gradient-to-br from-blue-200 to-green-200 shadow-lg hover:scale-110 hover:bg-yellow-200 transition-all border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <Volume2 className="h-6 w-6 text-blue-700 group-hover:animate-bounce" />
      </button>
    </div>
  );
};

export default AlphabetCard;
