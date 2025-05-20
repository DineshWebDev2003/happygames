'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Home, ArrowBigRightDash } from 'lucide-react';

// Define number types
interface NumberType {
  value: number;
  name: string;
  imageUrl: string;
  fallback: string;
}

interface TamilNumberType extends NumberType {
  tamilName: string;
  pronunciation: string;
}

// Generate larger set of numbers for hard mode 1-50
const generateExtendedNumbers = (): TamilNumberType[] => {
  const baseNumbers: TamilNumberType[] = [
    { value: 0, name: 'Zero', tamilName: 'சுழியம்', pronunciation: 'Suliyam', imageUrl: '/images/numbers/number0.png', fallback: '0️⃣' },
    { value: 1, name: 'One', tamilName: 'ஒன்று', pronunciation: 'Ondru', imageUrl: '/images/numbers/number1.png', fallback: '1️⃣' },
    { value: 2, name: 'Two', tamilName: 'இரண்டு', pronunciation: 'Irandu', imageUrl: '/images/numbers/number2.png', fallback: '2️⃣' },
    { value: 3, name: 'Three', tamilName: 'மூன்று', pronunciation: 'Moondru', imageUrl: '/images/numbers/number3.png', fallback: '3️⃣' },
    { value: 4, name: 'Four', tamilName: 'நான்கு', pronunciation: 'Naangu', imageUrl: '/images/numbers/number4.png', fallback: '4️⃣' },
    { value: 5, name: 'Five', tamilName: 'ஐந்து', pronunciation: 'Ainthu', imageUrl: '/images/numbers/number5.png', fallback: '5️⃣' },
    { value: 6, name: 'Six', tamilName: 'ஆறு', pronunciation: 'Aaru', imageUrl: '/images/numbers/number6.png', fallback: '6️⃣' },
    { value: 7, name: 'Seven', tamilName: 'ஏழு', pronunciation: 'Aezhu', imageUrl: '/images/numbers/number7.png', fallback: '7️⃣' },
    { value: 8, name: 'Eight', tamilName: 'எட்டு', pronunciation: 'Ettu', imageUrl: '/images/numbers/number8.png', fallback: '8️⃣' },
    { value: 9, name: 'Nine', tamilName: 'ஒன்பது', pronunciation: 'Onbathu', imageUrl: '/images/numbers/number9.png', fallback: '9️⃣' },
  ];
  
  // Generate numbers 10-50
  const extendedNumbers: TamilNumberType[] = [...baseNumbers];
  
  for (let i = 10; i <= 50; i++) {
    extendedNumbers.push({
      value: i,
      name: i.toString(),
      tamilName: i.toString(), // Tamil names for higher numbers would need proper translation
      pronunciation: i.toString(),
      imageUrl: `/images/numbers/number${i}.png`, // These might not exist, fallback will be used
      fallback: i.toString()
    });
  }
  
  return extendedNumbers;
};

const allNumbers = generateExtendedNumbers();

// Object images for counting exercises
const countObjects = [
  { id: 'apple', imageUrl: '/images/numbers/apple.png', fallback: '🍎' },
  { id: 'star', imageUrl: '/images/numbers/star.png', fallback: '⭐' },
  { id: 'car', imageUrl: '/images/numbers/car.png', fallback: '🚗' },
  { id: 'fish', imageUrl: '/images/numbers/fish.png', fallback: '🐠' },
  { id: 'backBag', imageUrl: '/images/numbers/back bag.jpg', fallback: '🎒' },
  { id: 'camera', imageUrl: '/images/numbers/camera.jpg', fallback: '📷' },
  { id: 'eraser', imageUrl: '/images/numbers/eraser.jpg', fallback: '🧹' }
];

// Arrow guidance component for wrong answers
interface ArrowGuidanceProps {
  wrongRef: HTMLButtonElement | null;
  correctRef: HTMLButtonElement | null;
  language: 'english' | 'tamil';
}

// HeartbeatObject component for animated objects
interface HeartbeatObjectProps {
  objectIndex: number;
  countObject: number;
  imageError: Record<string, boolean>;
  handleImageError: (key: string) => void;
  isClicked: boolean;
  onObjectClick: (index: number) => void;
  animationsEnabled: boolean;
}

const HeartbeatObject: React.FC<HeartbeatObjectProps> = ({ 
  objectIndex, 
  countObject, 
  imageError, 
  handleImageError,
  isClicked,
  onObjectClick,
  animationsEnabled
}) => {
  const [showHeartbeat, setShowHeartbeat] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
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
    if (!animationsEnabled || prefersReducedMotion) return;
    
    // Random delay before starting heartbeat
    const delay = Math.random() * 2000;
    const timeout = setTimeout(() => {
      setShowHeartbeat(true);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [animationsEnabled, prefersReducedMotion]);
  
  const handleClick = () => {
    if (!isClicked) {
      setShowPopup(true);
      onObjectClick(objectIndex);
      
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
    }
  };
  
  // Determine if animations should be shown based on user preferences
  const shouldShowAnimations = animationsEnabled && !prefersReducedMotion;
  
  return (
    <div className="relative">
      <div 
        onClick={handleClick}
        className={`relative w-16 h-16 transition-transform duration-700 ease-in-out cursor-pointer 
          ${showHeartbeat && !isClicked && shouldShowAnimations ? 'animate-heartbeat' : ''}
          ${isClicked ? 'opacity-70 grayscale' : 'hover:scale-110'}
        `}
      >
        <style jsx>{`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); filter: brightness(1); }
            15% { transform: scale(1.2); filter: brightness(1.1); }
            30% { transform: scale(1); filter: brightness(1); }
            45% { transform: scale(1.15); filter: brightness(1.05); }
          }
          .animate-heartbeat {
            animation: heartbeat 2.5s infinite;
          }
          
          @keyframes popup {
            0% { opacity: 0; transform: scale(0.5) translateY(0); }
            50% { opacity: 1; transform: scale(1.2) translateY(-20px); }
            100% { opacity: 0; transform: scale(0.8) translateY(-40px); }
          }
          .popup-animation {
            animation: popup 1s forwards;
            pointer-events: none;
          }
        `}</style>
        
        {imageError[`object-${countObject}-${objectIndex}`] ? (
          <div className="text-4xl flex items-center justify-center h-full">
            {countObjects[countObject].fallback}
          </div>
        ) : (
          <Image
            src={countObjects[countObject].imageUrl}
            alt="Object to count"
            width={64}
            height={64}
            className="object-contain"
            onError={() => handleImageError(`object-${countObject}-${objectIndex}`)}
          />
        )}
        
        {/* Checkmark for clicked objects */}
        {isClicked && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40 rounded-full">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Popup animation when clicked */}
      {showPopup && shouldShowAnimations && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center popup-animation">
          <div className="text-pink-600 font-bold text-lg">
            +1
          </div>
        </div>
      )}
    </div>
  );
};

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
      <ArrowBigRightDash size={40} className="text-red-500" strokeWidth={3} />
      <div 
        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-100 text-red-700 px-2 py-1 rounded-lg text-sm"
        style={{ transform: `rotate(-${position.angle}deg)` }}
      >
        {language === 'english' ? 'Try this one!' : 'இதை முயற்சிக்கவும்!'}
      </div>
    </div>
  );
};

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
            ? 'You counted all the objects!' 
            : 'நீங்கள் எல்லா பொருட்களையும் எண்ணினீர்கள்!'}
        </div>
      </div>
    </div>
  );
};

// Main component
const NumberGameClient = () => {
  type DifficultyType = 'easy' | 'medium' | 'hard';
  type StageType = 'welcome' | 'learn' | 'count' | 'quiz';
  
  const [difficulty, setDifficulty] = useState<DifficultyType>('medium');
  const [stage, setStage] = useState<StageType>('welcome');
  const [currentNumber, setCurrentNumber] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  const [countObject, setCountObject] = useState(0);
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showArrowGuidance, setShowArrowGuidance] = useState(false);
  const [objectsClicked, setObjectsClicked] = useState<boolean[]>([]);
  const [clickedCount, setClickedCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Refs for number buttons to use with arrow guidance
  const wrongButtonRef = useRef<HTMLButtonElement | null>(null);
  const correctButtonRef = useRef<HTMLButtonElement | null>(null);
  const numberButtonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get active numbers based on difficulty level
  const getActiveNumbers = () => {
    switch (difficulty) {
      case 'easy':
        return allNumbers.slice(1, 6); // 1-5
      case 'medium':
        return allNumbers.slice(0, 10); // 0-9
      case 'hard':
        return allNumbers.slice(0, 51); // 0-50
      default:
        return allNumbers.slice(0, 10);
    }
  };

  const activeNumbers = getActiveNumbers();

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const handleNext = () => {
    setCurrentNumber((prev) => (prev + 1) % activeNumbers.length);
    setImageError({});
  };

  const handleImageError = (key: string) => {
    setImageError(prev => ({ ...prev, [key]: true }));
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'tamil' : 'english');
  };

  const startCountingGame = () => {
    setStage('count');
    setCurrentNumber(1); // Start with 1 for counting
    setCountObject(Math.floor(Math.random() * countObjects.length));
    setSelectedCount(null);
    setIsCorrect(null);
    setShowArrowGuidance(false);
    setObjectsClicked(Array(50).fill(false)); // Reset clicked state
    setClickedCount(0);
    setShowCelebration(false);
  };

  const handleCountSelection = (num: number) => {
    const correctAnswer = currentNumber;
    const correct = num === correctAnswer;
    
    setSelectedCount(num);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      setShowArrowGuidance(false);
      
      // Move to next number after a delay
      setTimeout(() => {
        if (currentNumber < activeNumbers.length - 1) {
          setCurrentNumber(prev => prev + 1);
          setCountObject(Math.floor(Math.random() * countObjects.length));
        } else {
          setStage('learn'); // Back to learn when all numbers are done
        }
        setSelectedCount(null);
        setIsCorrect(null);
      }, 1500);
    } else {
      // Store refs for wrong selection and correct answer for arrow guidance
      wrongButtonRef.current = numberButtonRefs.current[num];
      correctButtonRef.current = numberButtonRefs.current[correctAnswer];
      setShowArrowGuidance(true);
    }
  };

  const startGame = (diff: DifficultyType) => {
    setDifficulty(diff);
    setStage('learn');
    setCurrentNumber(diff === 'easy' ? 1 : 0); // Start from 1 for easy, 0 for others
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4">
      {/* Welcome/Difficulty Selection Screen */}
      {stage === 'welcome' && (
        <div className="bg-gradient-to-b from-indigo-100 to-purple-100 p-8 rounded-xl shadow-xl max-w-md w-full border-4 border-indigo-200">
          {/* Game banner/thumbnail */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              <img 
                src="/game-thumbnails/1.jpg" 
                alt="Number Ninjas - Learning Numbers" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {language === 'english' ? 'Number Ninjas' : 'எண் நிஞ்சாக்கள்'}
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
          
          <h2 className="text-lg font-semibold mb-2 text-indigo-700">
            {language === 'english' ? 'Select Difficulty:' : 'கடினத் தன்மையைத் தேர்ந்தெடுக்கவும்:'}
          </h2>
          
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => startGame('easy')}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg transform transition hover:scale-105"
            >
              {language === 'english' ? 'Easy (Numbers 1-5)' : 'எளிதானது (1-5 எண்கள்)'}
            </Button>
            
            <Button
              onClick={() => startGame('medium')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg transform transition hover:scale-105"
            >
              {language === 'english' ? 'Medium (Numbers 0-9)' : 'நடுத்தரம் (0-9 எண்கள்)'}
            </Button>
            
            <Button
              onClick={() => startGame('hard')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-lg transform transition hover:scale-105"
            >
              {language === 'english' ? 'Hard (Numbers 0-50)' : 'கடினம் (0-50 எண்கள்)'}
            </Button>
          </div>
          
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
            {language === 'english' 
              ? `Learn Numbers (${difficulty === 'easy' ? '1-5' : difficulty === 'medium' ? '0-9' : '0-50'})` 
              : `எண்களைக் கற்றுக்கொள்ளுங்கள் (${difficulty === 'easy' ? '1-5' : difficulty === 'medium' ? '0-9' : '0-50'})`}
          </h1>
          
          {/* Progress indicator */}
          <div className="w-full max-w-md mb-4">
            <Progress value={(currentNumber / activeNumbers.length) * 100} className="h-2" />
            <div className="flex justify-between text-xs mt-1">
              <span>{currentNumber}/{activeNumbers.length}</span>
              <span>{difficulty === 'easy' ? 'Easy' : difficulty === 'medium' ? 'Medium' : 'Hard'}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl 
              shadow-lg border-4 border-purple-300 p-8 flex items-center justify-center 
              h-72 w-full max-w-md mb-8 relative">
            <div className="relative w-48 h-48">
              {imageError[`number-${activeNumbers[currentNumber]?.value}`] ? (
                <div className="text-8xl flex items-center justify-center h-full">
                  {activeNumbers[currentNumber]?.fallback}
                </div>
              ) : (
                <Image
                  src={activeNumbers[currentNumber]?.imageUrl}
                  alt={activeNumbers[currentNumber]?.name}
                  fill
                  className="object-contain"
                  onError={() => handleImageError(`number-${activeNumbers[currentNumber]?.value}`)}
                />
              )}
            </div>
          </div>
          
          <div className="text-6xl font-bold mb-4">{activeNumbers[currentNumber]?.value}</div>
          
          <div className="text-2xl font-bold mb-6">
            {language === 'english' 
              ? activeNumbers[currentNumber]?.name
              : activeNumbers[currentNumber]?.tamilName
            }
            {language === 'tamil' && (
              <div className="text-sm text-gray-500 mt-1">
                ({activeNumbers[currentNumber]?.pronunciation})
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Button 
              onClick={handleNext} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {language === 'english' ? 'Next Number' : 'அடுத்த எண்'}
            </Button>
            
            <Button 
              onClick={startCountingGame} 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {language === 'english' ? 'Practice Counting' : 'எண்ணும் பயிற்சி'}
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
      
      {/* Count Stage */}
      {stage === 'count' && (
        <>
          <h1 className="text-4xl font-bold mb-6">
            {language === 'english' ? 'Count Objects' : 'பொருட்களை எண்ணுங்கள்'}
          </h1>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl 
              shadow-lg border-4 border-amber-300 p-6 min-h-[300px] w-full max-w-md mb-8
              relative flex flex-col items-center justify-center">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            <div className="absolute -bottom-1 -right-1 w-16 h-16 rounded-full bg-green-300/20"></div>
            <div className="absolute -top-1 -left-1 w-12 h-12 rounded-full bg-blue-300/20"></div>
            
            <p className="text-xl mb-6">
              {language === 'english' ? 'How many objects do you see?' : 'எத்தனை பொருட்களைக் காண்கிறீர்கள்?'}
            </p>
            
            {/* Clicked count tracker */}
            <div className="text-3xl font-bold mb-4 py-2 px-4 rounded-full bg-white shadow-md">
              {clickedCount} / {currentNumber}
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {Array.from({ length: currentNumber }).map((_, i) => (
                <HeartbeatObject 
                  key={i}
                  objectIndex={i}
                  countObject={countObject}
                  imageError={imageError}
                  handleImageError={handleImageError}
                  isClicked={objectsClicked[i]}
                  onObjectClick={(index) => {
                    const newClickedState = [...objectsClicked];
                    newClickedState[index] = true;
                    setObjectsClicked(newClickedState);
                    setClickedCount(prev => prev + 1);
                    
                    // If all objects clicked, show success feedback
                    if (clickedCount + 1 === currentNumber) {
                      setTimeout(() => {
                        setIsCorrect(true);
                        setShowCelebration(animationsEnabled);
                      }, 500);
                    }
                  }}
                  animationsEnabled={animationsEnabled}
                />
              ))}
            </div>
            
            {isCorrect !== null && (
              <div className={`text-lg font-medium mt-4 py-2 px-4 rounded-md ${
                isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {isCorrect 
                  ? (language === 'english' ? 'Correct! All objects counted!' : 'சரியான பதில்! எல்லா பொருட்களும் எண்ணப்பட்டன!') 
                  : (language === 'english' ? 'Try again!' : 'மீண்டும் முயற்சிக்கவும்!')}
              </div>
            )}
            
            {/* Reset button visible when some objects are clicked */}
            {clickedCount > 0 && clickedCount < currentNumber && (
              <Button
                onClick={() => {
                  setObjectsClicked(Array(50).fill(false));
                  setClickedCount(0);
                }}
                className="mt-4 bg-amber-500 hover:bg-amber-600 text-white"
              >
                {language === 'english' ? 'Reset Count' : 'எண்ணிக்கையை மீட்டமைக்க'}
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-8">
            {activeNumbers.slice(0, difficulty === 'easy' ? 5 : 10).map(num => (
              <Button
                key={num.value}
                onClick={() => handleCountSelection(num.value)}
                className={`text-xl py-4
                  ${num.value === selectedCount && isCorrect 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : num.value === selectedCount 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600'
                  } 
                  text-white rounded-lg shadow-md transform transition-all hover:scale-105`}
                ref={el => {
                  if (el) numberButtonRefs.current[num.value] = el;
                }}
              >
                {num.value}
              </Button>
            ))}
          </div>
          
          {/* Arrow guidance for wrong answers */}
          {showArrowGuidance && wrongButtonRef.current && correctButtonRef.current && (
            <ArrowGuidance 
              wrongRef={wrongButtonRef.current} 
              correctRef={correctButtonRef.current} 
              language={language}
            />
          )}
          
          <div className="flex gap-4">
            <Button 
              onClick={() => setStage('learn')} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {language === 'english' ? 'Back to Learning' : 'கற்றலுக்குத் திரும்பு'}
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
              // Move to next number after celebration
              setTimeout(() => {
                if (currentNumber < activeNumbers.length - 1) {
                  setCurrentNumber(prev => prev + 1);
                  setCountObject(Math.floor(Math.random() * countObjects.length));
                  setObjectsClicked(Array(50).fill(false));
                  setClickedCount(0);
                  setIsCorrect(null);
                  setShowCelebration(false);
                } else {
                  // Return to learn stage after completing all numbers
                  setStage('learn');
                }
              }, 500);
            }}
          />
        </>
      )}
      
      <Link href="/learn" className="mt-8">
        <Button variant="outline">
          {language === 'english' ? 'Exit Game' : 'விளையாட்டை வெளியேறு'}
        </Button>
      </Link>
    </div>
  );
};

export default NumberGameClient; 