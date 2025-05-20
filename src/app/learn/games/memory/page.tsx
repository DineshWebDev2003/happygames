"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const cardEmojis = ['🍎', '🚗', '🐶', '🌟', '🍌', '🐱'];
const shuffledCards = () => {
  const cards = [...cardEmojis, ...cardEmojis].map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

export default function MemoryCardGame() {
  const [cards, setCards] = useState(shuffledCards());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const handleFlip = (idx: number) => {
    if (lock || cards[idx].flipped || cards[idx].matched) return;
    const newFlipped = [...flippedIndices, idx];
    const newCards = cards.map((card, i) => i === idx ? { ...card, flipped: true } : card);
    setCards(newCards);
    setFlippedIndices(newFlipped);
    if (newFlipped.length === 2) {
      setLock(true);
      setTimeout(() => {
        const [i1, i2] = newFlipped;
        if (newCards[i1].emoji === newCards[i2].emoji) {
          const matched = newCards.map((card, i) => (i === i1 || i === i2) ? { ...card, matched: true } : card);
          setCards(matched);
          setMatchedCount(matchedCount + 1);
        } else {
          setCards(newCards.map((card, i) => (i === i1 || i === i2) ? { ...card, flipped: false } : card));
        }
        setFlippedIndices([]);
        setLock(false);
      }, 900);
    }
  };

  const handleRestart = () => {
    setCards(shuffledCards());
    setFlippedIndices([]);
    setMatchedCount(0);
    setLock(false);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'tamil' : 'english');
  };

  const allMatched = cards.every(card => card.matched);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      {showWelcome ? (
        <div className="bg-gradient-to-b from-indigo-100 to-purple-100 p-8 rounded-xl shadow-xl max-w-md w-full border-4 border-indigo-200">
          {/* Game banner/thumbnail */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              <img 
                src="/game-thumbnails/4.jpg" 
                alt="Memory Masters - Memory Card Game" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {language === 'english' ? 'Memory Masters' : 'நினைவக மாஸ்டர்ஸ்'}
          </h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-indigo-700">
              {language === 'english' ? 'Select Language:' : 'மொழியைத் தேர்ந்தெடுக்கவும்:'}
            </h2>
            <div className="flex justify-center gap-4 mb-6">
              <Button
                onClick={() => setLanguage('english')}
                className={`px-4 py-2 rounded-lg ${language === 'english' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-indigo-600 border border-indigo-200'}`}
              >
                English
              </Button>
              <Button
                onClick={() => setLanguage('tamil')}
                className={`px-4 py-2 rounded-lg ${language === 'tamil' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-indigo-600 border border-indigo-200'}`}
              >
                தமிழ் (Tamil)
              </Button>
            </div>
          </div>
          
          <p className="text-lg text-center mb-6">
            {language === 'english' 
              ? 'Exercise your memory by finding matching pairs of cards. Flip cards to reveal emojis and remember their positions!'
              : 'பொருந்தும் அட்டை ஜோடிகளைக் கண்டறிவதன் மூலம் உங்கள் நினைவாற்றலைப் பயிற்சி செய்யுங்கள். எமோஜிகளை வெளிப்படுத்த அட்டைகளைப் புரட்டி, அவற்றின் நிலைகளை நினைவில் கொள்ளுங்கள்!'}
          </p>
          
          <Button
            onClick={() => setShowWelcome(false)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg transform transition hover:scale-105"
          >
            {language === 'english' ? 'Start Game' : 'விளையாட்டைத் தொடங்கு'}
          </Button>
          
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setAnimationsEnabled(prev => !prev)}
              variant="outline"
              className="text-sm border border-indigo-200"
            >
              {language === 'english' 
                ? `Animations: ${animationsEnabled ? 'ON' : 'OFF'}`
                : `அசைவூட்டங்கள்: ${animationsEnabled ? 'ON' : 'OFF'}`}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {language === 'english' ? 'Memory Card Game' : 'நினைவக அட்டை விளையாட்டு'}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {language === 'english' 
              ? 'Flip cards to find all the matching pairs!' 
              : 'அனைத்து பொருந்தும் ஜோடிகளையும் கண்டுபிடிக்க அட்டைகளைப் புரட்டவும்!'}
          </p>
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl 
              shadow-lg border-4 border-sky-300 p-6 w-full max-w-md mb-8
              relative flex flex-col items-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 to-indigo-500"></div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {cards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => handleFlip(idx)}
                  className={`w-16 h-20 rounded-lg shadow-lg flex items-center justify-center text-3xl text-white font-bold transition-all duration-200 ${card.flipped || card.matched ? 'bg-primary' : 'bg-gray-300'} ${card.matched ? 'opacity-50' : ''} ${animationsEnabled && !card.matched && !card.flipped ? 'hover:scale-105' : ''}`}
                  disabled={card.flipped || card.matched || lock}
                  aria-label={card.flipped || card.matched ? card.emoji : 'Hidden card'}
                >
                  {card.flipped || card.matched ? card.emoji : '❓'}
                </button>
              ))}
            </div>
          </div>
          {allMatched && (
            <div className="text-2xl font-bold text-green-500 mb-4 animate-bounce">
              {language === 'english' ? 'You did it! 🎉' : 'நீங்கள் செய்து முடித்தீர்கள்! 🎉'}
            </div>
          )}
          <div className="flex gap-4">
            <Button onClick={handleRestart} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white">
              {language === 'english' ? 'Restart' : 'மீண்டும் தொடங்கு'}
            </Button>
            <Button onClick={() => setShowWelcome(true)} className="mt-2 bg-green-500 hover:bg-green-600 text-white">
              {language === 'english' ? 'Main Menu' : 'முதன்மை பட்டி'}
            </Button>
            <Button 
              onClick={toggleLanguage} 
              variant="outline" 
              className="mt-2 border-2 border-purple-300 hover:bg-purple-50"
            >
              {language === 'english' ? 'Switch to Tamil' : 'Switch to English'}
            </Button>
            <Button asChild className="mt-2">
              <Link href="/learn/games">
                {language === 'english' ? 'Exit Game' : 'விளையாட்டை வெளியேறு'}
              </Link>
            </Button>
          </div>
        </>
      )}
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
