"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Home } from 'lucide-react';

// Define shapes with both English and Tamil names
const shapes = [
  { 
    name: 'Circle', 
    tamilName: 'வட்டம்', 
    pronunciation: 'Vattam',
    color: '#60a5fa', 
    svg: <circle cx="40" cy="40" r="35" fill="#60a5fa" /> 
  },
  { 
    name: 'Square', 
    tamilName: 'சதுரம்', 
    pronunciation: 'Sathuram',
    color: '#fbbf24', 
    svg: <rect x="10" y="10" width="60" height="60" fill="#fbbf24" /> 
  },
  { 
    name: 'Triangle', 
    tamilName: 'முக்கோணம்', 
    pronunciation: 'Mukkonam',
    color: '#34d399', 
    svg: <polygon points="40,10 70,70 10,70" fill="#34d399" /> 
  },
  { 
    name: 'Rectangle', 
    tamilName: 'செவ்வகம்', 
    pronunciation: 'Sevvagam',
    color: '#f87171', 
    svg: <rect x="10" y="20" width="70" height="40" fill="#f87171" /> 
  },
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
            ? 'You matched all shapes!' 
            : 'நீங்கள் அனைத்து வடிவங்களையும் பொருத்தினீர்கள்!'}
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

export default function ShapeGameStages() {
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
  
  // Refs for shape buttons to use with arrow guidance
  const wrongButtonRef = useRef<HTMLButtonElement | null>(null);
  const correctButtonRef = useRef<HTMLButtonElement | null>(null);
  const optionButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Stage 1: Learn shape names
  const handleNextLearn = () => {
    if (learnIndex < shapes.length - 1) {
      setLearnIndex(learnIndex + 1);
    } else {
      setStage('identify');
      setIdentifyIndex(0);
    }
  };

  // Stage 2: Identify shape by name (multiple choice)
  const currentShape = shapes[identifyIndex];
  const options = currentShape ? [
    currentShape.name,
    ...shapes.filter(s => s.name !== currentShape.name).map(s => s.name)
  ].sort(() => Math.random() - 0.5) : [];

  const handleIdentify = (name: string) => {
    if (!currentShape) return;
    
    const correct = name === currentShape.name;
    setIdentifyResult(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      setShowArrowGuidance(false);
    } else {
      // Store refs for wrong selection and correct answer for arrow guidance
      wrongButtonRef.current = optionButtonRefs.current[name];
      correctButtonRef.current = optionButtonRefs.current[currentShape.name];
      setShowArrowGuidance(true);
    }
    
    setTimeout(() => {
      setIdentifyResult(null);
      setShowArrowGuidance(false);
      if (identifyIndex < shapes.length - 1) {
        setIdentifyIndex(identifyIndex + 1);
      } else {
        setStage('match');
        setMatches({});
      }
    }, 1500);
  };

  // Stage 3: Match shapes (drag-and-drop)
  const handleDragStart = (name: string) => setDragged(name);
  const handleDrop = (name: string) => {
    if (dragged === name) {
      setMatches((prev) => ({ ...prev, [name]: true }));
      
      // Check if all shapes are matched
      if (Object.keys(matches).length + 1 === shapes.length) {
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

  // UI for each stage
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      {/* Welcome screen with language selection */}
      {stage === 'welcome' && (
        <div className="bg-gradient-to-b from-indigo-100 to-purple-100 p-8 rounded-xl shadow-xl max-w-md w-full border-4 border-indigo-200">
          {/* Game banner/thumbnail */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              <img 
                src="/game-thumbnails/3.jpg" 
                alt="Shape Shifters - Learning Shapes" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {language === 'english' ? 'Shape Explorer' : 'வடிவ ஆராய்ச்சியாளர்'}
          </h1>
          
          {/* Shape thumbnails preview */}
          <div className="flex justify-center flex-wrap gap-3 mb-6">
            {shapes.map(shape => (
              <div key={shape.name} className="bg-white p-2 rounded-lg shadow-sm flex flex-col items-center">
                <svg width="40" height="40" viewBox="0 0 80 80">
                  {shape.svg}
                </svg>
                <span className="text-xs mt-1 font-medium">
                  {language === 'english' ? shape.name : shape.tamilName}
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
            {language === 'english' ? 'Start Learning Shapes' : 'வடிவங்களைக் கற்க தொடங்கு'}
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
            {language === 'english' ? 'Learn Shapes' : 'வடிவங்களைக் கற்றுக்கொள்ளுங்கள்'}
          </h1>
          
          {/* Progress indicator */}
          <div className="w-full max-w-md mb-4">
            <Progress value={((learnIndex + 1) / shapes.length) * 100} className="h-2" />
            <div className="flex justify-between text-xs mt-1">
              <span>{learnIndex + 1}/{shapes.length}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl 
              shadow-lg border-4 border-purple-300 p-8 flex items-center justify-center 
              h-72 w-full max-w-md mb-8 relative">
            <div className={`relative w-48 h-48 ${animationsEnabled ? 'animate-pulse' : ''}`}>
              <svg width="120" height="120" viewBox="0 0 80 80">
                {shapes[learnIndex]?.svg}
              </svg>
            </div>
          </div>
          
          <div className="text-2xl font-bold mb-6">
            {language === 'english' 
              ? shapes[learnIndex]?.name
              : shapes[learnIndex]?.tamilName
            }
            {language === 'tamil' && (
              <div className="text-sm text-gray-500 mt-1">
                ({shapes[learnIndex]?.pronunciation})
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Button 
              onClick={handleNextLearn} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {language === 'english' 
                ? (learnIndex < shapes.length - 1 ? 'Next Shape' : 'Start Quiz') 
                : (learnIndex < shapes.length - 1 ? 'அடுத்த வடிவம்' : 'தேர்வைத் தொடங்கு')}
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
      {stage === 'identify' && currentShape && (
        <>
          <h1 className="text-4xl font-bold mb-6">
            {language === 'english' ? 'Which Shape Is This?' : 'இது எந்த வடிவம்?'}
          </h1>
          
          {/* Progress indicator */}
          <div className="w-full max-w-md mb-4">
            <Progress value={((identifyIndex + 1) / shapes.length) * 100} className="h-2" />
            <div className="flex justify-between text-xs mt-1">
              <span>{identifyIndex + 1}/{shapes.length}</span>
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
            
            <svg width="150" height="150" viewBox="0 0 80 80" className={animationsEnabled ? 'animate-pulse' : ''}>
              {currentShape.svg}
            </svg>
          </div>
          
          <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8">
            {options.map(option => (
              <Button
                key={option}
                onClick={() => handleIdentify(option)}
                className={`text-xl py-4
                  ${identifyResult !== null && option === currentShape.name 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : identifyResult === false && option !== currentShape.name 
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
                  : shapes.find(s => s.name === option)?.tamilName || option}
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
            {language === 'english' ? 'Shape Matching Game' : 'வடிவ பொருத்துதல் விளையாட்டு'}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {language === 'english' 
              ? 'Drag each shape to its matching outline!' 
              : 'ஒவ்வொரு வடிவத்தையும் அதன் பொருந்தும் வடிவக்கோட்டிற்கு இழுக்கவும்!'}
          </p>
          
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl 
              shadow-lg border-4 border-sky-300 p-6 w-full max-w-md mb-8
              relative flex flex-col items-center">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 to-indigo-500"></div>
            
            <div className="flex flex-row flex-wrap gap-6 mb-8 justify-center">
              {shapes.map((shape) => (
                <div
                  key={shape.name}
                  draggable={!matches[shape.name]}
                  onDragStart={() => handleDragStart(shape.name)}
                  className={`cursor-grab transition-transform ${matches[shape.name] ? 'opacity-30' : 'hover:scale-110'} ${animationsEnabled && !matches[shape.name] ? 'animate-bounce' : ''}`}
                  style={{ width: 80, height: 80 }}
                  aria-label={shape.name}
                >
                  <svg width="80" height="80" viewBox="0 0 80 80">{shape.svg}</svg>
                  <div className="text-xs mt-1">
                    {language === 'english' ? shape.name : shape.tamilName}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-row flex-wrap gap-6 mb-6 justify-center">
              {shapes.map((shape) => (
                <div
                  key={shape.name + '-target'}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(shape.name)}
                  className={`w-20 h-20 border-4 rounded-lg flex items-center justify-center transition-colors ${matches[shape.name] ? 'border-green-400 bg-green-100' : 'border-dashed border-gray-400 bg-white'}`}
                  aria-label={shape.name + ' target'}
                >
                  <svg width="60" height="60" viewBox="0 0 80 80" style={{ opacity: 0.3 }}>{shape.svg}</svg>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-2 mb-2">
              {language === 'english'
                ? `Matched: ${Object.keys(matches).length}/${shapes.length}`
                : `பொருத்தப்பட்டது: ${Object.keys(matches).length}/${shapes.length}`}
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
