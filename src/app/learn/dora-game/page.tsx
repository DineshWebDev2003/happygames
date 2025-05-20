"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

// Game states
enum GameState {
  INTRO,
  LESSON,
  QUIZ,
  REWARD
}

// Lesson topics
const TOPICS = [
  { id: 'alphabet', name: 'Alphabet Fun', icon: '🔤' },
  { id: 'numbers', name: 'Numbers Game', icon: '🔢' },
  { id: 'colors', name: 'Colors Adventure', icon: '🌈' },
  { id: 'shapes', name: 'Shapes Explorer', icon: '⭐' }
];

export default function DoraGame() {
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [bujiMood, setBujiMood] = useState('happy');

  // Lesson content based on selected topic
  const getLessonContent = () => {
    switch(selectedTopic) {
      case 'alphabet':
        return {
          title: 'Learning the ABCs',
          content: 'Let\'s learn the first 3 letters of the alphabet!',
          items: [
            { letter: 'A', example: 'Apple', image: '🍎' },
            { letter: 'B', example: 'Ball', image: '⚽' },
            { letter: 'C', example: 'Cat', image: '🐱' }
          ],
          questions: [
            { question: 'What letter does Apple start with?', options: ['A', 'B', 'C'], answer: 'A' },
            { question: 'Which of these starts with the letter B?', options: ['Ball', 'Cat', 'Apple'], answer: 'Ball' },
            { question: 'What letter comes after B?', options: ['A', 'C', 'D'], answer: 'C' }
          ]
        };
      case 'numbers':
        return {
          title: 'Counting 1-2-3',
          content: 'Let\'s learn to count together!',
          items: [
            { number: '1', example: 'One apple', image: '🍎' },
            { number: '2', example: 'Two bananas', image: '🍌🍌' },
            { number: '3', example: 'Three oranges', image: '🍊🍊🍊' }
          ],
          questions: [
            { question: 'How many apples? 🍎', options: ['1', '2', '3'], answer: '1' },
            { question: 'How many bananas? 🍌🍌', options: ['1', '2', '3'], answer: '2' },
            { question: 'What comes after 2?', options: ['1', '3', '4'], answer: '3' }
          ]
        };
      case 'colors':
        return {
          title: 'Rainbow Colors',
          content: 'Let\'s explore beautiful colors!',
          items: [
            { color: 'Red', example: 'Apple', image: '🍎' },
            { color: 'Yellow', example: 'Banana', image: '🍌' },
            { color: 'Blue', example: 'Sky', image: '🌥️' }
          ],
          questions: [
            { question: 'What color is an apple?', options: ['Red', 'Yellow', 'Blue'], answer: 'Red' },
            { question: 'What color is a banana?', options: ['Red', 'Yellow', 'Blue'], answer: 'Yellow' },
            { question: 'What color is the sky?', options: ['Red', 'Yellow', 'Blue'], answer: 'Blue' }
          ]
        };
      case 'shapes':
        return {
          title: 'Shapes All Around',
          content: 'Let\'s discover shapes together!',
          items: [
            { shape: 'Circle', example: 'Ball', image: '⚽' },
            { shape: 'Square', example: 'Box', image: '📦' },
            { shape: 'Triangle', example: 'Pizza slice', image: '🍕' }
          ],
          questions: [
            { question: 'What shape is a ball?', options: ['Circle', 'Square', 'Triangle'], answer: 'Circle' },
            { question: 'What shape is a box?', options: ['Circle', 'Square', 'Triangle'], answer: 'Square' },
            { question: 'What shape is a pizza slice?', options: ['Circle', 'Square', 'Triangle'], answer: 'Triangle' }
          ]
        };
      default:
        return null;
    }
  };

  const lesson = getLessonContent();

  // Handle topic selection
  const selectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    setGameState(GameState.LESSON);
  };

  // Start quiz after lesson
  const startQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameState(GameState.QUIZ);
  };

  // Handle answer selection
  const handleAnswer = (answer: string) => {
    const isCorrect = answer === lesson?.questions[currentQuestion].answer;
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('Correct! Very good!');
      setBujiMood('happy');
    } else {
      setFeedback('Oops! Try again next time!');
      setBujiMood('sad');
    }

    // Move to next question or end quiz
    setTimeout(() => {
      setFeedback('');
      if (currentQuestion < (lesson?.questions.length || 0) - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameState(GameState.REWARD);
      }
    }, 1500);
  };

  // Restart the game
  const restartGame = () => {
    setGameState(GameState.INTRO);
    setSelectedTopic('');
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {gameState === GameState.INTRO && (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-40 h-40">
              <div className="absolute w-40 h-40 rounded-full bg-purple-100 border-4 border-purple-300 overflow-hidden">
                <div className="h-full flex items-center justify-center">
                  <span className="text-6xl">🤖</span>
                </div>
              </div>
            </div>
            <div className="relative w-24 h-24 mt-16 -ml-4">
              <div className="absolute w-24 h-24 rounded-full bg-green-100 border-4 border-green-300 overflow-hidden">
                <div className="h-full flex items-center justify-center">
                  <span className="text-4xl">👦</span>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 text-purple-600">Dora's Learning Adventure</h1>
          <p className="text-lg mb-8">Join Dora the Robo Teacher and her friend Buji on a fun learning journey!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {TOPICS.map((topic) => (
              <Card 
                key={topic.id}
                className="p-4 cursor-pointer hover:bg-purple-50 transition-colors border-2 border-purple-200"
                onClick={() => selectTopic(topic.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{topic.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{topic.name}</h3>
                    <p className="text-sm text-gray-500">Learn with Dora & Buji</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {gameState === GameState.LESSON && lesson && (
        <div className="text-center">
          <div className="flex justify-center gap-16 mb-8">
            <div className="text-center">
              <div className="relative w-32 h-32">
                <div className="absolute w-32 h-32 rounded-full bg-purple-100 border-4 border-purple-300 overflow-hidden">
                  <div className="h-full flex items-center justify-center">
                    <span className="text-5xl">🤖</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-purple-600 font-bold">Dora</p>
            </div>
            <div className="text-center">
              <div className="relative w-24 h-24">
                <div className="absolute w-24 h-24 rounded-full bg-green-100 border-4 border-green-300 overflow-hidden">
                  <div className="h-full flex items-center justify-center">
                    <span className="text-4xl">👦</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-green-600 font-bold">Buji</p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-600">{lesson.title}</h2>
            <p className="text-lg mb-6">{lesson.content}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {lesson.items.map((item: any, index: number) => (
                <Card key={index} className="p-4 border-2 border-purple-200">
                  <div className="text-5xl mb-2">{item.image}</div>
                  <div className="text-2xl font-bold mb-1">
                    {item.letter || item.number || item.color || item.shape}
                  </div>
                  <div>{item.example}</div>
                </Card>
              ))}
            </div>
            
            <Button 
              onClick={startQuiz}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full text-lg"
            >
              Let's Practice with Buji!
            </Button>
          </motion.div>
        </div>
      )}

      {gameState === GameState.QUIZ && lesson && (
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <div className="relative w-24 h-24">
                <div className="absolute w-24 h-24 rounded-full bg-green-100 border-4 border-green-300 overflow-hidden">
                  <div className="h-full flex items-center justify-center">
                    <span className="text-4xl">
                      {bujiMood === 'happy' ? '👦' : '😢'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-green-600 font-bold">Buji</p>
            </div>
          </div>
          
          <div className="mb-2 h-6 text-lg font-bold text-purple-600">
            {feedback}
          </div>
          
          <Card className="p-6 max-w-2xl mx-auto border-2 border-purple-200">
            <h3 className="text-xl font-bold mb-6">Question {currentQuestion + 1} of {lesson.questions.length}</h3>
            <p className="text-2xl mb-8">{lesson.questions[currentQuestion].question}</p>
            
            <div className="grid grid-cols-1 gap-3">
              {lesson.questions[currentQuestion].options.map((option: string, index: number) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-white hover:bg-purple-50 text-purple-800 border-2 border-purple-300 py-3 text-lg"
                >
                  {option}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {gameState === GameState.REWARD && (
        <div className="text-center">
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="relative w-32 h-32">
                <div className="absolute w-32 h-32 rounded-full bg-purple-100 border-4 border-purple-300 overflow-hidden">
                  <div className="h-full flex items-center justify-center">
                    <span className="text-5xl">🤖</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-purple-600 font-bold">Dora</p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32">
                <div className="absolute w-32 h-32 rounded-full bg-green-100 border-4 border-green-300 overflow-hidden">
                  <div className="h-full flex items-center justify-center">
                    <span className="text-5xl">👦</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-green-600 font-bold">Buji</p>
            </div>
          </div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Great Job!</h2>
            <div className="text-5xl mb-6">
              {score === (lesson?.questions.length || 0) ? '🎉🏆🎉' : '🌟'}
            </div>
            <p className="text-xl mb-2">You scored {score} out of {lesson?.questions.length || 0}</p>
            {score === (lesson?.questions.length || 0) ? (
              <p className="text-lg text-green-600 mb-6">Perfect score! You're amazing!</p>
            ) : (
              <p className="text-lg text-purple-600 mb-6">Good effort! Keep practicing!</p>
            )}
          </motion.div>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={restartGame}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
            >
              Play Again
            </Button>
            <Button 
              onClick={() => {
                setSelectedTopic('');
                setGameState(GameState.INTRO);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
            >
              Choose New Topic
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 