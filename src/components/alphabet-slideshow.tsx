"use client";
import { useState, useRef, useEffect } from 'react';
import { alphabets } from '@/data/mock-data';
import { Volume2, Mic, CheckCircle, XCircle, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface AlphabetSlideshowProps {
  onExit: () => void;
}

export default function AlphabetSlideshow({ onExit }: AlphabetSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [waiting, setWaiting] = useState(false);
  const recognitionRef = useRef<any>(null);
  const current = alphabets[index];

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
            setIndex(i => Math.min(i + 1, alphabets.length - 1));
            // Speak the next letter
            speak(alphabets[Math.min(index + 1, alphabets.length - 1)].word);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <button onClick={onExit} className="self-end mb-2 p-2 rounded-full bg-red-100 hover:bg-red-200">
        <X className="w-5 h-5 text-red-600" />
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-full max-w-xs">
        <div className="text-6xl font-bold text-primary mb-2">{current.letter}</div>
        <div className="relative w-40 h-40 mb-2 rounded-lg overflow-hidden shadow-inner bg-secondary/20">
          <img
            src={current.imageUrl}
            alt={current.word}
            className="object-cover w-full h-full"
            style={{ borderRadius: '1rem' }}
          />
        </div>
        <div className="text-xl font-semibold text-foreground mb-4">{current.word}</div>
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
            onClick={() => setIndex(i => Math.max(i - 1, 0))}
            disabled={index === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            title="Previous"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIndex(i => Math.min(i + 1, alphabets.length - 1))}
            disabled={index === alphabets.length - 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            title="Next"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 