"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Home } from 'lucide-react';

// Define colors with both English and Tamil names
const colors = [
  { name: 'Red', tamilName: 'சிவப்பு', pronunciation: 'Sivappu', hex: '#ef4444' },
  { name: 'Blue', tamilName: 'நீலம்', pronunciation: 'Neelam', hex: '#3b82f6' },
  { name: 'Yellow', tamilName: 'மஞ்சள்', pronunciation: 'Manjal', hex: '#facc15' },
  { name: 'Green', tamilName: 'பச்சை', pronunciation: 'Pachai', hex: '#22c55e' },
  { name: 'Purple', tamilName: 'ஊதா', pronunciation: 'Oodha', hex: '#a855f7' },
  { name: 'Orange', tamilName: 'ஆரஞ்சு', pronunciation: 'Orange', hex: '#f97316' },
];

// Define objects with associated colors in both languages
const objects = [
  { name: 'Apple', tamilName: 'ஆப்பிள்', color: 'Red', emoji: '🍎' },
  { name: 'Banana', tamilName: 'வாழைப்பழம்', color: 'Yellow', emoji: '🍌' },
  { name: 'Leaf', tamilName: 'இலை', color: 'Green', emoji: '🍃' },
  { name: 'Ball', tamilName: 'பந்து', color: 'Blue', emoji: '🔵' },
  { name: 'Grapes', tamilName: 'திராட்சை', color: 'Purple', emoji: '🍇' },
  { name: 'Orange', tamilName: 'ஆரஞ்சு', color: 'Orange', emoji: '🍊' },
];

// Celebration animation component
interface CelebrationProps {
  isVisible: boolean;
  onComplete: () => void;
  language: 'english' | 'tamil';
}

const Celebration: React.FC<CelebrationProps> = ({ isVisible, onComplete, language }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, prefersReducedMotion ? 1500 : 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete, prefersReducedMotion]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <style jsx>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes heart-float {
          0% { transform: scale(0) translateY(0) rotate(0deg); opacity: 0; }
          20% { transform: scale(1.2) translateY(-20px) rotate(-10deg); opacity: 1; }
          80% { transform: scale(1) translateY(-120px) rotate(10deg); opacity: 0.8; }
          100% { transform: scale(0.8) translateY(-200px) rotate(0deg); opacity: 0; }
        }
        
        @keyframes text-pop {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          70% { transform: scale(0.9); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .confetti {
          position: absolute;
          width: 10px;
          height: 20px;
          background-color: var(--color);
          animation: confetti-fall var(--duration) forwards ease-out;
          animation-delay: var(--delay);
        }
        
        .heart {
          position: absolute;
          animation: heart-float var(--duration) forwards ease-out;
          animation-delay: var(--delay);
          opacity: 0;
          color: var(--color);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .confetti, .heart {
            animation-duration: 0.5s !important;
            transition-duration: 0.5s !important;
          }
        }
      `}</style>
      
      {/* Only show confetti and hearts if user doesn't prefer reduced motion */}
      {!prefersReducedMotion && (
        <>
          {/* Confetti particles */}
          {Array.from({ length: 60 }).map((_, i) => {
            const colors = ['#ff5252', '#ffeb3b', '#2196f3', '#4caf50', '#e040fb', '#ff9800'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomX = `${Math.random() * 100}vw`;
            const randomDelay = `${Math.random() * 1}s`;
            const randomDuration = `${1 + Math.random() * 3}s`;
            
            return (
              <div 
                key={`confetti-${i}`}
                className="confetti"
                style={{
                  '--color': randomColor,
                  '--delay': randomDelay,
                  '--duration': randomDuration,
                  left: randomX,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  width: `${5 + Math.random() * 10}px`,
                  height: `${10 + Math.random() * 15}px`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                } as React.CSSProperties}
              />
            );
          })}
          
          {/* Floating hearts */}
          {Array.from({ length: 15 }).map((_, i) => {
            const colors = ['#ff5252', '#ff7675', '#ff9ff3', '#ffeaa7', '#fd79a8'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomX = `${20 + Math.random() * 60}vw`;
            const randomDelay = `${Math.random() * 1.5}s`;
            const randomDuration = `${2 + Math.random() * 3}s`;
            const randomSize = `${30 + Math.random() * 30}px`;
            
            return (
              <div 
                key={`heart-${i}`}
                className="heart"
                style={{
                  '--color': randomColor,
                  '--delay': randomDelay,
                  '--duration': randomDuration,
                  left: randomX,
                  bottom: '20vh',
                  fontSize: randomSize,
                } as React.CSSProperties}
              >
                ❤️
              </div>
            );
          })}
        </>
      )}
      
      {/* Congratulation text */}
      <div 
        className="text-4xl font-bold text-center z-10 bg-white bg-opacity-70 p-6 rounded-xl shadow-lg"
        style={{
          animation: prefersReducedMotion ? 'none' : 'text-pop 1s forwards'
        }}
      >
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          {language === 'english' ? 'Great Job!' : 'பெரிய வேலை!'}
        </div>
        <div className="text-2xl text-pink-600 mt-2">
          {language === 'english' 
            ? 'You matched all colors!' 
            : 'நீங்கள் அனைத்து வண்ணங்களையும் பொருத்தினீர்கள்!'}
        </div>
      </div>
    </div>
  );
};

// Arrow guidance component for wrong answers
interface ArrowGuidanceProps {
  wrongRef: HTMLButtonElement | null;
  correctRef: HTMLButtonElement | null;
  language: 'english' | 'tamil';
}

const ArrowGuidance: React.FC<ArrowGuidanceProps> = ({ wrongRef, correctRef, language }) => {
  const [position, setPosition] = useState({ x: 0, y: 0, angle: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !wrongRef || !correctRef) return;

    const updatePosition = () => {
      const wrongRect = wrongRef.getBoundingClientRect();
      const correctRect = correctRef.getBoundingClientRect();

      const wrongCenter = {
        x: wrongRect.left + wrongRect.width / 2,
        y: wrongRect.top + wrongRect.height / 2
      };

      const correctCenter = {
        x: correctRect.left + correctRect.width / 2,
        y: correctRect.top + correctRect.height / 2
      };

      const angle = Math.atan2(
        correctCenter.y - wrongCenter.y,
        correctCenter.x - wrongCenter.x
      ) * (180 / Math.PI);

      setPosition({
        x: wrongCenter.x + (correctCenter.x - wrongCenter.x) / 2,
        y: wrongCenter.y + (correctCenter.y - wrongCenter.y) / 2,
        angle
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [wrongRef, correctRef, isMounted]);

  if (!isMounted) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${position.angle}deg)`,
        zIndex: 100,
        animation: 'pulse 1.5s infinite'
      }}
      className="pointer-events-none"
    >
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) rotate(${position.angle}deg) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -50%) rotate(${position.angle}deg) scale(1.1); }
        }
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
      <div 
        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-100 text-red-700 px-2 py-1 rounded-lg text-sm"
        style={{ transform: `rotate(-${position.angle}deg)` }}
      >
        {language === 'english' ? 'Try this one!' : 'இதை முயற்சிக்கவும்!'}
      </div>
    </div>
  );
};

export default function ColorGameStages() {
  const [stage, setStage] = useState<'welcome' | 'learn' | 'identify' | 'match'>('welcome');
  const [learnIndex, setLearnIndex] = useState(0);
  const [identifyIndex, setIdentifyIndex] = useState(0);
  const [identifyResult, setIdentifyResult] = useState<null | boolean>(null);
  const [dragged, setDragged] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: boolean }>({});
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showArrowGuidance, setShowArrowGuidance] = useState(false);
  
  // Refs for color buttons to use with arrow guidance
  const wrongButtonRef = useRef<HTMLButtonElement | null>(null);
  const correctButtonRef = useRef<HTMLButtonElement | null>(null);
  const optionButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Stage 1: Learn color names
  const handleNextLearn = () => {
    if (learnIndex < colors.length - 1) {
      setLearnIndex(learnIndex + 1);
    } else {
      setStage('identify');
      setIdentifyIndex(0);
    }
  };

  // Stage 2: Identify color by name (multiple choice)
  const currentColor = colors[identifyIndex];
  const options = currentColor ? [
    currentColor.name,
    ...colors.filter(c => c.name !== currentColor.name).map(c => c.name)
  ].sort(() => Math.random() - 0.5) : [];

  const handleIdentify = (name: string) => {
    if (!currentColor) return;
    
    const correct = name === currentColor.name;
    setIdentifyResult(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      setShowArrowGuidance(false);
    } else {
      // Store refs for wrong selection and correct answer for arrow guidance
      wrongButtonRef.current = optionButtonRefs.current[name];
      correctButtonRef.current = optionButtonRefs.current[currentColor.name];
      setShowArrowGuidance(true);
    }
    
    setTimeout(() => {
      setIdentifyResult(null);
      setShowArrowGuidance(false);
      if (identifyIndex < colors.length - 1) {
        setIdentifyIndex(identifyIndex + 1);
      } else {
        setStage('match');
        setMatches({});
      }
    }, 1500);
  };

  // Stage 3: Match objects to colors (drag-and-drop)
  const handleDragStart = (name: string) => setDragged(name);
  const handleDrop = (color: string) => {
    if (dragged && objects.find(obj => obj.name === dragged)?.color === color) {
      setMatches((prev) => ({ ...prev, [dragged]: true }));
      
      // Check if all objects are matched
      if (Object.keys(matches).length + 1 === objects.length) {
        if (animationsEnabled) {
          setTimeout(() => {
            setShowCelebration(true);
          }, 500);
        }
      }
    }
    setDragged(null);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'tamil' : 'english');
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      {/* Welcome screen with language selection */}
      {stage === 'welcome' && (
        <div className="bg-gradient-to-b from-indigo-100 to-purple-100 p-8 rounded-xl shadow-xl max-w-md w-full border-4 border-indigo-200">
          {/* Game banner/thumbnail */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              <img 
                src="/game-thumbnails/2.jpg" 
                alt="Color Champions - Learning Colors" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {language === 'english' ? 'Color Explorer' : 'வண்ண ஆராய்ச்சியாளர்'}
          </h1>
          
          {/* Color thumbnails preview */}
          <div className="flex justify-center flex-wrap gap-3 mb-6">
            {colors.map(color => (
              <div key={color.name} className="bg-white p-2 rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-8 h-8 rounded-full" style={{ background: color.hex }}></div>
                <span className="text-xs mt-1 font-medium">
                  {language === 'english' ? color.name : color.tamilName}
                </span>
              </div>
            ))}
          </div>
          
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
          
          <Button
            onClick={() => setStage('learn')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg transform transition hover:scale-105"
          >
            {language === 'english' ? 'Start Learning Colors' : 'வண்ணங்களைக் கற்க தொடங்கு'}
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
      )}
      
      {/* Learn Stage */}
      {stage === 'learn' && (
        <>
          <h1 className="text-4xl font-bold mb-6">
            {language === 'english' ? 'Learn Colors' : 'வண்ணங்களைக் கற்றுக்கொள்ளுங்கள்'}
          </h1>
          
          {/* Progress indicator */}
          <div className="w-full max-w-md mb-4">
            <Progress value={((learnIndex + 1) / colors.length) * 100} className="h-2" />
            <div className="flex justify-between text-xs mt-1">
              <span>{learnIndex + 1}/{colors.length}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl 
              shadow-lg border-4 border-purple-300 p-8 flex items-center justify-center 
              h-72 w-full max-w-md mb-8 relative">
            <div className={`relative w-48 h-48 flex items-center justify-center ${animationsEnabled ? 'animate-pulse' : ''}`}>
              <div className="w-24 h-24 rounded-full" style={{ background: colors[learnIndex]?.hex }}></div>
            </div>
          </div>
          
          <div className="text-2xl font-bold mb-6" style={{ color: colors[learnIndex]?.hex }}>
            {language === 'english' 
              ? colors[learnIndex]?.name
              : colors[learnIndex]?.tamilName
            }
            {language === 'tamil' && (
              <div className="text-sm text-gray-500 mt-1">
                ({colors[learnIndex]?.pronunciation})
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Button 
              onClick={handleNextLearn} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {language === 'english' 
                ? (learnIndex < colors.length - 1 ? 'Next Color' : 'Start Quiz') 
                : (learnIndex < colors.length - 1 ? 'அடுத்த வண்ணம்' : 'தேர்வைத் தொடங்கு')}
            </Button>
            
            <Button 
              onClick={toggleLanguage} 
              variant="outline" 
              className="border-2 border-purple-300 hover:bg-purple-50"
            >
              {language === 'english' ? 'Switch to Tamil' : 'Switch to English'}
            </Button>
            
            <Button 
              onClick={() => setStage('welcome')} 
              variant="outline" 
              className="border-2 border-red-300 hover:bg-red-50 flex items-center gap-2"
            >
              <Home size={16} />
              {language === 'english' ? 'Main Menu' : 'முதன்மை பட்டி'}
            </Button>
          </div>
        </>
      )}
      
      {/* Identify Stage */}
      {stage === 'identify' && currentColor && (
        <>
          <h1 className="text-4xl font-bold mb-6">
            {language === 'english' ? 'Which Color Is This?' : 'இது எந்த வண்ணம்?'}
          </h1>
          
          {/* Progress indicator */}
          <div className="w-full max-w-md mb-4">
            <Progress value={((identifyIndex + 1) / colors.length) * 100} className="h-2" />
            <div className="flex justify-between text-xs mt-1">
              <span>{identifyIndex + 1}/{colors.length}</span>
              <span>Score: {score}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl 
              shadow-lg border-4 border-amber-300 p-6 min-h-[300px] w-full max-w-md mb-8
              relative flex flex-col items-center justify-center">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            <div className="absolute -bottom-1 -right-1 w-16 h-16 rounded-full bg-green-300/20"></div>
            <div className="absolute -top-1 -left-1 w-12 h-12 rounded-full bg-blue-300/20"></div>
            
            <div className={`w-32 h-32 rounded-full mb-4 ${animationsEnabled ? 'animate-pulse' : ''}`} style={{ background: currentColor.hex }}></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8">
            {options.map(option => (
              <Button
                key={option}
                onClick={() => handleIdentify(option)}
                className={`text-xl py-4
                  ${identifyResult !== null && option === currentColor.name 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : identifyResult === false && option !== currentColor.name 
                      ? 'opacity-50' 
                      : 'bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600'
                  } 
                  text-white rounded-lg shadow-md transform transition-all hover:scale-105`}
                disabled={identifyResult !== null}
                ref={el => {
                  if (el) optionButtonRefs.current[option] = el;
                }}
              >
                {language === 'english' 
                  ? option 
                  : colors.find(c => c.name === option)?.tamilName || option}
              </Button>
            ))}
          </div>
          
          {/* Add the arrow guidance component */}
          {showArrowGuidance && wrongButtonRef.current && correctButtonRef.current && (
            <ArrowGuidance 
              wrongRef={wrongButtonRef.current} 
              correctRef={correctButtonRef.current}
              language={language}
            />
          )}
          
          {identifyResult !== null && (
            <div className={`text-lg font-medium mt-4 py-2 px-4 rounded-md ${
              identifyResult ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {identifyResult 
                ? (language === 'english' ? 'Correct!' : 'சரியான பதில்!') 
                : (language === 'english' ? 'Try again!' : 'மீண்டும் முயற்சிக்கவும்!')}
            </div>
          )}
          
          <div className="flex gap-4">
            <Button 
              onClick={toggleLanguage} 
              variant="outline" 
              className="border-2 border-purple-300 hover:bg-purple-50"
            >
              {language === 'english' ? 'Switch to Tamil' : 'Switch to English'}
            </Button>
          </div>
        </>
      )}
      
      {/* Match Stage */}
      {stage === 'match' && (
        <>
          <h1 className="text-4xl font-bold mb-6">
            {language === 'english' ? 'Color Match Game' : 'வண்ண பொருத்துதல் விளையாட்டு'}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {language === 'english' 
              ? 'Drag each object to its matching color!' 
              : 'ஒவ்வொரு பொருளையும் அதன் பொருந்தும் வண்ணத்திற்கு இழுக்கவும்!'}
          </p>
          
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl 
              shadow-lg border-4 border-sky-300 p-6 w-full max-w-md mb-8
              relative flex flex-col items-center">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 to-indigo-500"></div>
            
            <div className="flex flex-row flex-wrap gap-6 mb-8 justify-center">
              {objects.map((obj) => (
                <div
                  key={obj.name}
                  draggable={!matches[obj.name]}
                  onDragStart={() => handleDragStart(obj.name)}
                  className={`cursor-grab transition-transform text-5xl ${matches[obj.name] ? 'opacity-30' : 'hover:scale-110'} ${animationsEnabled && !matches[obj.name] ? 'animate-bounce' : ''}`}
                  style={{ width: 64, height: 64 }}
                  aria-label={obj.name}
                >
                  {obj.emoji}
                  <div className="text-xs mt-1">
                    {language === 'english' ? obj.name : obj.tamilName}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-row flex-wrap gap-6 mb-6 justify-center">
              {colors.map((color) => (
                <div
                  key={color.name + '-target'}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(color.name)}
                  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-colors ${matches[Object.keys(matches).find(key => objects.find(o => o.name === key)?.color === color.name) || ''] ? 'border-green-400' : 'border-dashed border-gray-400'}`}
                  style={{ background: color.hex, opacity: 0.7 }}
                  aria-label={color.name + ' target'}
                >
                  <span className="text-xs font-bold text-white drop-shadow">
                    {language === 'english' ? color.name : color.tamilName}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-2 mb-2">
              {language === 'english'
                ? `Matched: ${Object.keys(matches).length}/${objects.length}`
                : `பொருத்தப்பட்டது: ${Object.keys(matches).length}/${objects.length}`}
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={() => setStage('welcome')} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {language === 'english' ? 'Back to Menu' : 'பட்டிக்குத் திரும்பு'}
            </Button>
            
            <Button 
              onClick={toggleLanguage} 
              variant="outline" 
              className="border-2 border-purple-300 hover:bg-purple-50"
            >
              {language === 'english' ? 'Switch to Tamil' : 'Switch to English'}
            </Button>
          </div>
          
          {/* Celebration animation */}
          <Celebration 
            isVisible={showCelebration}
            language={language}
            onComplete={() => {
              // Hide celebration after it completes
              setTimeout(() => {
                setShowCelebration(false);
              }, 500);
            }}
          />
        </>
      )}
      
      <Link href="/learn/games" className="mt-8">
        <Button variant="outline">
          {language === 'english' ? 'Exit Game' : 'விளையாட்டை வெளியேறு'}
        </Button>
      </Link>
      
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
} 