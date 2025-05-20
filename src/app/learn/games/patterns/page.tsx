"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const patterns = [
  {
    sequence: ['🍎', '🍌', '🍎', '🍌', '❓'],
    answer: '🍎',
    options: ['🍎', '🍌', '🍉'],
  },
  {
    sequence: ['🔵', '🔴', '🔵', '🔴', '❓'],
    answer: '🔵',
    options: ['🔵', '🟢', '🟡'],
  },
  {
    sequence: ['🐶', '🐱', '🐶', '🐱', '❓'],
    answer: '🐶',
    options: ['🐶', '🐭', '🐰'],
  },
];

export default function PatternRecognitionGame() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const current = patterns[index];

  const handleSelect = (option: string) => {
    setSelected(option);
    setTimeout(() => {
      if (option === current.answer) {
        if (index < patterns.length - 1) {
          setIndex(index + 1);
          setSelected(null);
        } else {
          setCompleted(true);
        }
      } else {
        setSelected(null);
      }
    }, 700);
  };

  const handleRestart = () => {
    setIndex(0);
    setSelected(null);
    setCompleted(false);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'tamil' : 'english');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      {showWelcome ? (
        <div className="bg-gradient-to-b from-indigo-100 to-purple-100 p-8 rounded-xl shadow-xl max-w-md w-full border-4 border-indigo-200">
          {/* Game banner/thumbnail */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              <img 
                src="/game-thumbnails/5.jpg" 
                alt="Pattern Pals - Pattern Recognition" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {language === 'english' ? 'Pattern Pals' : 'முறை நண்பர்கள்'}
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
              ? 'Train your brain to recognize and complete patterns. Can you predict what comes next in each sequence?'
              : 'முறைகளை அங்கீகரிக்கவும் பூர்த்தி செய்யவும் உங்கள் மூளையைப் பயிற்சி செய்யுங்கள். ஒவ்வொரு வரிசையிலும் அடுத்து என்ன வரும் என்பதை நீங்கள் கணிக்க முடியுமா?'}
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
            {language === 'english' ? 'Pattern Recognition' : 'முறை அங்கீகாரம்'}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {language === 'english' 
              ? 'What comes next in the pattern?' 
              : 'முறையில் அடுத்து என்ன வருகிறது?'}
          </p>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl 
              shadow-lg border-4 border-amber-300 p-6 min-h-[300px] w-full max-w-md mb-8
              relative flex flex-col items-center justify-center">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            <div className="absolute -bottom-1 -right-1 w-16 h-16 rounded-full bg-green-300/20"></div>
            <div className="absolute -top-1 -left-1 w-12 h-12 rounded-full bg-blue-300/20"></div>
            
            {!completed ? (
              <>
                <div className="flex flex-row gap-2 justify-center mb-8 text-4xl">
                  {current.sequence.map((item, i) => (
                    <span key={i} className={animationsEnabled ? 'hover:scale-110 transform transition' : ''}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-row gap-4 justify-center mb-4">
                  {current.options.map(option => (
                    <Button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`
                        ${selected === option && option === current.answer
                          ? 'bg-green-500 hover:bg-green-600'
                          : selected === option && option !== current.answer
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600'
                        }
                        text-white text-xl py-3 px-4 rounded-lg shadow-md
                        ${animationsEnabled ? 'transform transition hover:scale-105' : ''}
                      `}
                      disabled={selected !== null}
                    >
                      <span className="text-2xl">{option}</span>
                    </Button>
                  ))}
                </div>
                {selected && selected === current.answer && 
                  <div className="text-green-500 font-bold mb-2 animate-bounce">
                    {language === 'english' ? 'Correct!' : 'சரியான பதில்!'}
                  </div>
                }
                {selected && selected !== current.answer && 
                  <div className="text-red-500 font-bold mb-2 animate-shake">
                    {language === 'english' ? 'Try again!' : 'மீண்டும் முயற்சிக்கவும்!'}
                  </div>
                }
              </>
            ) : (
              <div className="text-2xl font-bold text-green-500 mb-4 animate-bounce">
                {language === 'english' ? 'You did it! 🎉' : 'நீங்கள் செய்து முடித்தீர்கள்! 🎉'}
              </div>
            )}
          </div>
          
          <div className="flex gap-4 mt-4">
            {completed && (
              <Button 
                onClick={handleRestart}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                {language === 'english' ? 'Play Again' : 'மீண்டும் விளையாடு'}
              </Button>
            )}
            <Button 
              onClick={() => setShowWelcome(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {language === 'english' ? 'Main Menu' : 'முதன்மை பட்டி'}
            </Button>
            <Button 
              onClick={toggleLanguage} 
              variant="outline" 
              className="border-2 border-purple-300 hover:bg-purple-50"
            >
              {language === 'english' ? 'Switch to Tamil' : 'Switch to English'}
            </Button>
            <Button asChild>
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