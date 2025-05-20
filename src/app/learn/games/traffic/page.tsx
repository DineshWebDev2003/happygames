"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Enhanced rules with more educational content
const rules = [
  {
    title: 'Red Light Means Stop',
    image: '🚦',
    text: 'When the light is red, all vehicles must stop completely behind the line and wait.',
    tip: 'Count to 3 before deciding the light is safe to cross even after it turns green!'
  },
  {
    title: 'Green Light Means Go',
    image: '🚦',
    text: 'When the light is green, vehicles can go if the way is clear.',
    tip: 'Always look both ways even when the light is green for you!'
  },
  {
    title: 'Yellow Light Means Prepare to Stop',
    image: '🚦',
    text: 'When the light turns yellow, slow down and prepare to stop safely.',
    tip: 'Never speed up to beat a yellow light - that\'s dangerous!'
  },
  {
    title: 'Cross at the Zebra Crossing',
    image: '🚸',
    text: 'Always cross the road at the zebra crossing where drivers expect pedestrians.',
    tip: 'Make eye contact with drivers to make sure they\'ve seen you before crossing.'
  },
  {
    title: 'Drive on the Left Side',
    image: '⬅️🚗',
    text: 'In countries like India and the UK, cars drive on the left side of the road.',
    tip: 'Remember: in some countries like the US, they drive on the right side!'
  },
  {
    title: 'Look Both Ways',
    image: '👀',
    text: 'Always look left, right, and then left again before crossing any road.',
    tip: 'Stop, Look, Listen is the golden rule before crossing!'
  },
  {
    title: 'Wear Safety Gear',
    image: '⛑️',
    text: 'Always wear a helmet when on a bicycle or motorcycle, and always use seatbelts in cars.',
    tip: 'Helmets reduce the risk of head injury by up to 85%!'
  },
  {
    title: 'No Texting While Walking',
    image: '📱🚫',
    text: 'Never use your phone while crossing the road - it distracts you from spotting danger.',
    tip: 'Put your phone away completely when near roads!'
  }
];

// Enhanced questions with more scenarios
const questions = [
  {
    scenario: 'The light is red. What should the car do?',
    image: '🚦🚗',
    options: ['Go', 'Stop'],
    answer: 'Stop',
    explanation: 'Red means stop! All vehicles must stop at a red light to prevent accidents.'
  },
  {
    scenario: 'Where should you cross the road?',
    image: '🚸',
    options: ['Anywhere', 'At the zebra crossing'],
    answer: 'At the zebra crossing',
    explanation: 'Zebra crossings are designed for safe pedestrian crossing. Drivers expect people to cross there.'
  },
  {
    scenario: 'Which side should the car drive on (in India/UK)?',
    image: '⬅️🚗',
    options: ['Left', 'Right'],
    answer: 'Left',
    explanation: 'In India, UK, Japan, and many other countries, vehicles drive on the left side of the road.'
  },
  {
    scenario: 'The light is green. What should the car do?',
    image: '🚦🚗',
    options: ['Go', 'Stop'],
    answer: 'Go',
    explanation: 'Green means go, but always look first to make sure the intersection is clear!'
  },
  {
    scenario: 'Before crossing, what should you do?',
    image: '👀',
    options: ['Look both ways', 'Just run'],
    answer: 'Look both ways',
    explanation: 'Always look left, right and left again before crossing to ensure no vehicles are coming.'
  },
  {
    scenario: 'The traffic light turns yellow. What should you do if you\'re driving?',
    image: '🚦🚗',
    options: ['Speed up to cross quickly', 'Slow down and prepare to stop'],
    answer: 'Slow down and prepare to stop',
    explanation: 'Yellow means the light will soon turn red. Slow down and stop if you can do so safely.'
  },
  {
    scenario: 'When riding a bicycle, what should you wear for safety?',
    image: '🚲',
    options: ['Just regular clothes', 'A helmet'],
    answer: 'A helmet',
    explanation: 'Always wear a helmet when riding a bicycle to protect your head in case of a fall.'
  },
  {
    scenario: 'You need to cross the road and you\'re using your phone. What should you do?',
    image: '📱🚶',
    options: ['Keep using the phone while crossing', 'Put the phone away and look for traffic'],
    answer: 'Put the phone away and look for traffic',
    explanation: 'Never use your phone while crossing - you need full attention to spot potential dangers.'
  },
  {
    scenario: 'You\'re waiting at a crosswalk and the pedestrian light turns green. What should you do?',
    image: '🚸🚶',
    options: ['Walk immediately', 'Look both ways, then walk'],
    answer: 'Look both ways, then walk',
    explanation: 'Even when you have right of way, always look both ways to ensure all vehicles have stopped.'
  },
  {
    scenario: 'You\'re in a car. What safety equipment should you use?',
    image: '🚗',
    options: ['Nothing special', 'Seatbelt'],
    answer: 'Seatbelt',
    explanation: 'Always wear your seatbelt in a car, even for short trips - it saves lives!'
  }
];

export default function TrafficRulesGame() {
  const [stage, setStage] = useState('welcome'); // 'welcome', 'learn', 'quiz'
  const [learnIndex, setLearnIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  // Progress tracking
  const learnProgress = ((learnIndex + 1) / rules.length) * 100;
  const quizProgress = ((quizIndex + 1) / questions.length) * 100;

  // Stage 1: Learn rules
  const handleNextLearn = () => {
    if (learnIndex < rules.length - 1) {
      setLearnIndex(learnIndex + 1);
    } else {
      setStage('quiz');
    }
  };

  const handlePrevLearn = () => {
    if (learnIndex > 0) {
      setLearnIndex(learnIndex - 1);
    }
  };

  // Stage 2: Quiz
  const currentQ = questions[quizIndex];
  const handleSelect = (option: string) => {
    setSelected(option);
    setShowExplanation(true);
    
    if (option === currentQ.answer) {
      setCorrectAnswers(prev => prev + 1);
      setScore(prev => prev + 10);
    }
    
    setTimeout(() => {
      if (quizIndex < questions.length - 1) {
        setQuizIndex(quizIndex + 1);
        setSelected(null);
        setShowExplanation(false);
      } else {
        setCompleted(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setLearnIndex(0);
    setQuizIndex(0);
    setSelected(null);
    setShowExplanation(false);
    setCompleted(false);
    setScore(0);
    setCorrectAnswers(0);
    setShowCertificate(false);
    setStage('learn');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'tamil' : 'english');
  };

  // Tamil translations for rules (only showing a few for brevity)
  const getTamilTitle = (index: number): string => {
    const tamilTitles = [
      'சிவப்பு விளக்கு நிற்கவும் என்று அர்த்தம்',
      'பச்சை விளக்கு செல்லலாம் என்று அர்த்தம்',
      'மஞ்சள் விளக்கு நிறுத்த தயாராகு என்று அர்த்தம்',
      'சீப்ரா கடவை வழியாக சாலையைக் கடக்கவும்',
      'இடது புறமாக வாகனம் ஓட்டுங்கள்',
      'இரு புறமும் பார்க்கவும்',
      'பாதுகாப்பு உபகரணங்களை அணியவும்',
      'நடக்கும்போது குறுஞ்செய்தி அனுப்ப வேண்டாம்'
    ];
    return tamilTitles[index] || '';
  };

  // Return to original Tamil translations for brevity in this example

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      {stage === 'welcome' && (
        <div className="bg-gradient-to-b from-indigo-100 to-purple-100 p-8 rounded-xl shadow-xl max-w-md w-full border-4 border-indigo-200">
          {/* Game banner/thumbnail */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              <img 
                src="/game-thumbnails/6.jpg" 
                alt="Traffic Safety Heroes - Road Safety Game" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {language === 'english' ? 'Traffic Safety Heroes' : 'போக்குவரத்து பாதுகாப்பு ஹீரோக்கள்'}
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
              ? 'Learn important traffic rules and road safety guidelines. Practice your knowledge with fun quizzes and become a Safety Hero!'
              : 'முக்கியமான போக்குவரத்து விதிகளையும் சாலை பாதுகாப்பு வழிகாட்டுதல்களையும் கற்றுக்கொள்ளுங்கள். வேடிக்கையான வினாடி வினாக்களுடன் உங்கள் அறிவைப் பயிற்சி செய்யுங்கள்!'}
          </p>
          
          <Button
            onClick={() => setStage('learn')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg transform transition hover:scale-105"
          >
            {language === 'english' ? 'Start Learning' : 'கற்க தொடங்கு'}
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
      
      {stage === 'learn' && (
        <>
          <h1 className="text-3xl font-bold mb-4">
            {language === 'english' ? 'Traffic Safety Heroes' : 'போக்குவரத்து விதிகள் விளையாட்டு'}
          </h1>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl 
              shadow-lg border-4 border-purple-300 p-8 flex flex-col items-center 
              min-h-[300px] w-full max-w-md mb-4 relative">
            
            {/* Progress indicator */}
            <div className="w-full mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Rule {learnIndex + 1} of {rules.length}</span>
                <span>{Math.round(learnProgress)}%</span>
              </div>
              <Progress value={learnProgress} className="h-2" />
            </div>
            
            <div className={`text-6xl mb-4 ${animationsEnabled ? 'animate-bounce' : ''}`}>
              {rules[learnIndex].image}
            </div>
            
            <div className="text-2xl font-bold mt-2 mb-3">
              {language === 'english' ? rules[learnIndex].title : getTamilTitle(learnIndex)}
            </div>
            
            <div className="text-lg mb-4 text-muted-foreground">
              {language === 'english' ? rules[learnIndex].text : 'Tamil text'}
            </div>
            
            {/* Tip section */}
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg w-full">
              <p className="text-amber-700">
                <span className="font-bold">Tip:</span> {rules[learnIndex].tip}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 mb-6">
            {learnIndex > 0 && (
              <Button 
                onClick={handlePrevLearn} 
                variant="outline"
                className="border-2 border-blue-300 hover:bg-blue-50"
              >
                {language === 'english' ? '← Previous' : '← முந்தைய'}
              </Button>
            )}
            
            <Button 
              onClick={handleNextLearn} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {learnIndex < rules.length - 1 
                ? (language === 'english' ? 'Next →' : 'அடுத்து →') 
                : (language === 'english' ? 'Start Quiz' : 'வினாடி வினா தொடங்கு')}
            </Button>
          </div>
            
          <div className="flex gap-3">
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
              className="border-2 border-red-300 hover:bg-red-50"
            >
              {language === 'english' ? 'Main Menu' : 'முதன்மை பட்டி'}
            </Button>
          </div>
        </>
      )}
      
      {stage === 'quiz' && !completed && (
        <>
          <h1 className="text-3xl font-bold mb-4">
            {language === 'english' ? 'Traffic Safety Quiz' : 'போக்குவரத்து விதிகள் வினாடி வினா'}
          </h1>
          
          <div className="mb-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
              {language === 'english' ? `Score: ${score}` : `மதிப்பெண்: ${score}`}
            </Badge>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl 
              shadow-lg border-4 border-amber-300 p-6 min-h-[320px] w-full max-w-md mb-4
              relative flex flex-col items-center justify-center">
            
            {/* Progress indicator */}
            <div className="w-full mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Question {quizIndex + 1} of {questions.length}</span>
                <span>{Math.round(quizProgress)}%</span>
              </div>
              <Progress value={quizProgress} className="h-2" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            
            <div className="flex flex-col items-center mb-4">
              <div className={`text-5xl mb-4 ${animationsEnabled ? 'animate-pulse' : ''}`}>
                {currentQ.image}
              </div>
              <div className="text-xl font-bold mt-2 mb-4">
                {language === 'english' ? currentQ.scenario : 'Tamil scenario'}
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full">
              {currentQ.options.map(option => (
                <Button
                  key={option}
                  onClick={() => !selected && handleSelect(option)}
                  className={`
                    ${selected === option && option === currentQ.answer
                      ? 'bg-green-500 hover:bg-green-600' 
                      : selected === option && option !== currentQ.answer
                      ? 'bg-red-500 hover:bg-red-600'
                      : selected !== null
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600'
                    }
                    text-white px-4 py-2 rounded-lg transform transition-all
                    ${animationsEnabled && !selected ? 'hover:scale-105' : ''}
                  `}
                  disabled={selected !== null}
                >
                  {language === 'english' ? option : 'Tamil option'}
                </Button>
              ))}
            </div>
            
            {/* Explanation */}
            {showExplanation && (
              <div className={`mt-4 p-3 rounded-lg w-full ${
                selected === currentQ.answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <p className="font-medium">
                  {selected === currentQ.answer 
                    ? (language === 'english' ? '✓ Correct!' : '✓ சரியான பதில்!') 
                    : (language === 'english' ? '✗ Incorrect!' : '✗ தவறான பதில்!')}
                </p>
                <p className="text-sm mt-1">
                  {language === 'english' ? currentQ.explanation : 'Tamil explanation'}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
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
              className="border-2 border-red-300 hover:bg-red-50"
            >
              {language === 'english' ? 'Main Menu' : 'முதன்மை பட்டி'}
            </Button>
          </div>
        </>
      )}
      
      {stage === 'quiz' && completed && !showCertificate && (
        <>
          <h1 className="text-3xl font-bold mb-6">
            {language === 'english' ? 'Quiz Completed!' : 'வினாடி வினா முடிந்தது!'}
          </h1>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl 
              shadow-lg border-4 border-green-300 p-6 min-h-[300px] w-full max-w-md mb-6
              relative flex flex-col items-center justify-center">
            
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            
            <div className={`text-6xl mb-4 ${animationsEnabled ? 'animate-bounce' : ''}`}>
              🏆
            </div>
            
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              {language === 'english' ? 'Congratulations!' : 'வாழ்த்துக்கள்!'}
            </h2>
            
            <p className="text-lg mb-4">
              {language === 'english' 
                ? `Your score: ${score} / ${questions.length * 10}` 
                : `உங்கள் மதிப்பெண்: ${score} / ${questions.length * 10}`}
            </p>
            
            <p className="text-lg mb-6">
              {language === 'english' 
                ? `You answered ${correctAnswers} out of ${questions.length} questions correctly!` 
                : `நீங்கள் ${questions.length} கேள்விகளில் ${correctAnswers} சரியாக பதிலளித்துள்ளீர்கள்!`}
            </p>
            
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCertificate(true)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {language === 'english' ? 'View Certificate' : 'சான்றிதழைக் காண்க'}
              </Button>
              
              <Button
                onClick={handleRestart}
                variant="outline"
                className="border-2 border-blue-300 hover:bg-blue-50"
              >
                {language === 'english' ? 'Play Again' : 'மீண்டும் விளையாடு'}
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={() => setStage('welcome')} 
            variant="outline" 
            className="border-2 border-red-300 hover:bg-red-50"
          >
            {language === 'english' ? 'Main Menu' : 'முதன்மை பட்டி'}
          </Button>
        </>
      )}
      
      {showCertificate && (
        <>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl 
              shadow-lg border-8 border-amber-300 p-8 min-h-[400px] w-full max-w-2xl mb-6
              relative flex flex-col items-center justify-center">
            
            <div className="absolute top-4 left-4 text-6xl">🏅</div>
            <div className="absolute top-4 right-4 text-6xl">🏅</div>
            
            <h2 className="text-3xl font-bold text-amber-800 mb-2 mt-8">CERTIFICATE</h2>
            <h3 className="text-xl font-semibold text-amber-700 mb-6">OF ACHIEVEMENT</h3>
            
            <div className="border-t-2 border-b-2 border-amber-300 py-4 px-8 mb-4 w-full text-center">
              <p className="text-lg">This certifies that</p>
              <p className="text-2xl font-bold my-2">TRAFFIC SAFETY HERO</p>
              <p className="text-lg">has successfully completed the</p>
              <p className="text-xl font-bold my-2">TRAFFIC SAFETY TRAINING</p>
              <p className="text-lg">with a score of</p>
              <p className="text-3xl font-bold my-2">{score}/{questions.length * 10}</p>
            </div>
            
            <p className="text-sm text-amber-700 mb-8">Keep safe on the roads!</p>
            
            <div className="flex gap-4">
              <Button
                onClick={() => setShowCertificate(false)}
                variant="outline"
                className="border-2 border-amber-300 hover:bg-amber-50"
              >
                Back to Results
              </Button>
              
              <Button
                onClick={() => setStage('welcome')}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                Main Menu
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 