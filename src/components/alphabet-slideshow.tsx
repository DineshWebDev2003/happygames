"use client";
import { useState, useRef, useEffect } from 'react';
import { alphabets } from '@/data/mock-data';
import { Volume2, Mic, CheckCircle, XCircle, ArrowRight, ArrowLeft, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AlphabetSlideshowProps {
  onExit: () => void;
}

export default function AlphabetSlideshow({ onExit }: AlphabetSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [animate, setAnimate] = useState<'in' | 'out'>('in');
  const recognitionRef = useRef<any>(null);
  const current = alphabets[index];

  // Confetti on last slide
  useEffect(() => {
    if (index === alphabets.length - 1) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        zIndex: 9999,
      });
    }
  }, [index]);

  // Initialize speech synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Load voices
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.rate = 0.8;
      utter.pitch = 1.1;
      utter.voice = window.speechSynthesis.getVoices().find(v => v.name.toLowerCase().includes("female")) || undefined;
      window.speechSynthesis.speak(utter);
    }
  };

  const startListening = () => {
    if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        const expected = current.word.split(' ')[2].toLowerCase(); // Get the word after "is for"
        
        if (transcript.includes(expected)) {
          setFeedback('correct');
          speak('Excellent! You said it correctly!');
          // Play success sound
          const audio = new Audio('/sounds/success.mp3');
          audio.play().catch(() => {}); // Ignore if sound fails to play
          
          setTimeout(() => {
            setFeedback(null);
            if (index < alphabets.length - 1) {
              setAnimate('out');
              setTimeout(() => {
                setIndex(i => Math.min(i + 1, alphabets.length - 1));
                setAnimate('in');
                speak(alphabets[Math.min(index + 1, alphabets.length - 1)].word);
              }, 350);
            }
          }, 2000);
        } else {
          setFeedback('wrong');
          speak(`Let's try again. Say: ${expected}`);
          // Play error sound
          const audio = new Audio('/sounds/error.mp3');
          audio.play().catch(() => {}); // Ignore if sound fails to play
          
          setWaiting(true);
          setTimeout(() => {
            setFeedback(null);
            setWaiting(false);
          }, 2500);
        }
        setListening(false);
      };

      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      setListening(true);
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  // Speak the current letter when it changes
  useEffect(() => {
    speak(current.word);
  }, [current]);

  // Slide animation helpers
  const handlePrev = () => {
    setAnimate('out');
    setTimeout(() => {
      setIndex(i => Math.max(i - 1, 0));
      setAnimate('in');
    }, 350);
  };
  const handleNext = () => {
    setAnimate('out');
    setTimeout(() => {
      setIndex(i => Math.min(i + 1, alphabets.length - 1));
      setAnimate('in');
    }, 350);
  };

  // Progress bar
  const progress = ((index + 1) / alphabets.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <button onClick={onExit} className="self-end mb-2 p-2 rounded-full bg-red-100 hover:bg-red-200">
        <X className="w-5 h-5 text-red-600" />
      </button>
      <div className="w-full max-w-xs mb-2">
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-center mt-2 gap-1">
          {alphabets.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-blue-400 scale-125' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <div className={`bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center w-full max-w-xs transition-all duration-500 ${animate === 'in' ? 'opacity-100 translate-x-0 scale-105' : 'opacity-0 -translate-x-10 scale-95'} animate-bounce-in`}>
        <div className="text-6xl font-bold text-primary mb-2 drop-shadow-lg animate-bounce">{current.letter}</div>
        <div className="relative w-40 h-40 mb-2 rounded-lg overflow-hidden shadow-inner bg-secondary/20">
          <img
            src={current.imageUrl}
            alt={current.word}
            className="object-cover w-full h-full"
            style={{ borderRadius: '1rem' }}
          />
        </div>
        <div className="text-xl font-semibold text-foreground mb-4 drop-shadow">{current.word}</div>
        <div className="flex gap-4 mb-4">
          <button 
            onClick={() => speak(current.word)} 
            className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors" 
            title="Hear the word"
          >
            <Volume2 className="h-6 w-6 text-blue-600" />
          </button>
          <button 
            onClick={startListening} 
            disabled={listening || waiting} 
            className={`p-3 rounded-full transition-colors ${
              listening ? 'bg-green-200' : 'bg-green-100 hover:bg-green-200'
            }`} 
            title="Say the answer"
          >
            <Mic className={`h-6 w-6 ${listening ? 'animate-pulse text-green-600' : 'text-green-500'}`} />
          </button>
        </div>
        {feedback === 'correct' && (
          <div className="flex items-center gap-2 text-green-600 font-bold animate-bounce">
            <CheckCircle /> Correct!
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="flex items-center gap-2 text-red-600 font-bold animate-shake">
            <XCircle /> Try again!
          </div>
        )}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            title="Previous"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={index === alphabets.length - 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            title="Next"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <style jsx>{`
        .animate-bounce-in {
          animation: bounce-in 0.5s;
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.9) translateY(40px); }
          60% { opacity: 1; transform: scale(1.05) translateY(-10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
} 