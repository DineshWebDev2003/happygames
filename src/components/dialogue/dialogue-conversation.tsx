'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CharacterAvatar from './character-avatar';

export interface DialogueMessage {
  role: 'ai' | 'user';
  content: string;
  characterName?: string;
  characterImage?: string;
}

export interface DialogueScenario {
  title: string;
  description: string;
  characterName: string;
  characterRole: string;
  characterImage: string;
  initialMessage: string;
  suggestedResponses: string[];
  possibleScenarios: string[];
  learningPoints: string[];
}

interface DialogueConversationProps {
  scenario: DialogueScenario;
  onComplete: (messages: DialogueMessage[]) => void;
}

// Define a type for SpeechRecognition
type SpeechRecognitionType = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: any) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  abort: () => void;
};

const DialogueConversation: React.FC<DialogueConversationProps> = ({ scenario, onComplete }) => {
  const [messages, setMessages] = useState<DialogueMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [learnedPoints, setLearnedPoints] = useState<number[]>([]);

  // Initialize conversation with AI's first message
  useEffect(() => {
    setMessages([
      {
        role: 'ai',
        content: scenario.initialMessage,
        characterName: scenario.characterName,
        characterImage: scenario.characterImage
      }
    ]);
  }, [scenario]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      // Use type assertion to handle browser compatibility
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current = recognition;
      } catch (error) {
        console.error("Speech recognition initialization error:", error);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (error) {
          console.error("Error aborting speech recognition:", error);
        }
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (error) {
        console.error('Speech recognition abort error:', error);
      }
      setIsListening(false);
    } else if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition start error:', error);
        setIsListening(false);
      }
    }
  };

  const speakText = (text: string) => {
    if (!audioEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: DialogueMessage = {
      role: 'user',
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      // Use the fallback response generator instead of calling the API
      const fallbackResponse = generateSimpleResponse(inputValue, scenario);
      
      // Track learning points in the response
      const trackedResponse = trackLearningPoints(fallbackResponse);
      
      // Add a small delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsTyping(false);
      
      const aiMessage: DialogueMessage = {
        role: 'ai',
        content: trackedResponse,
        characterName: scenario.characterName,
        characterImage: scenario.characterImage
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the AI's response
      if (audioEnabled) {
        speakText(trackedResponse);
      }
      
      // Check if conversation should end (after 5 exchanges)
      if (messages.length >= 9) { // 5 exchanges (user + ai) = 10 messages
        setTimeout(() => onComplete([...messages, aiMessage]), 1000);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (audioEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Enhanced response generator with educational content
  const generateSimpleResponse = (userInput: string, scenario: DialogueScenario): string => {
    const input = userInput.toLowerCase();
    
    // Common responses across all roles
    if (input.includes('hello') || input.includes('hi')) {
      return `Hello there! I'm ${scenario.characterName}, ${scenario.characterRole}. How can I help you today? ${getEducationalTip(scenario.characterRole, 'greeting')}`;
    }
    
    if (input.includes('name')) {
      return `My name is ${scenario.characterName}. I'm ${scenario.characterRole}. ${getEducationalTip(scenario.characterRole, 'introduction')}`;
    }
    
    if (input.includes('thank')) {
      return `You're welcome! Is there anything else I can help you with? ${getEducationalTip(scenario.characterRole, 'gratitude')}`;
    }
    
    if (input.includes('bye') || input.includes('goodbye')) {
      return `Goodbye! It was nice talking to you. Stay safe! ${getEducationalTip(scenario.characterRole, 'farewell')}`;
    }
    
    // Role-specific responses
    switch (scenario.characterRole) {
      case 'Pediatrician':
        if (input.includes('headache')) {
          return "I'm sorry to hear you have a headache. Can you tell me how long it's been hurting and if you've had any other symptoms? Describing your symptoms helps doctors understand what might be causing them.";
        }
        if (input.includes('stomach') || input.includes('hurt')) {
          return "Let's see what's going on with your stomach. Can you point to where it hurts the most? Have you eaten anything unusual lately? These details help doctors figure out what might be making you feel sick.";
        }
        if (input.includes('checkup')) {
          return "Great! Regular checkups are important. I'll check your height, weight, and make sure you're growing healthy and strong. Checkups help catch any health problems early when they're easier to treat.";
        }
        if (input.includes('scared')) {
          return "It's okay to feel scared. Many kids feel that way about doctor visits. I promise to explain everything I'm doing and be gentle. Telling your doctor when you're scared helps us make you more comfortable.";
        }
        return "As your doctor, I want to help you stay healthy. Can you tell me more about how you're feeling? Being honest with your doctor helps us take better care of you.";
        
      case 'Elementary School Teacher':
        if (input.includes('math')) {
          return "I'm glad you enjoy math! It's wonderful to hear you're interested in numbers and problem-solving. Understanding what subjects you like helps teachers support your learning journey.";
        }
        if (input.includes('reading') || input.includes('hard')) {
          return "Reading takes practice, and everyone learns at their own pace. We can work together to make it more fun for you. It's brave to talk about things you find difficult—that's the first step to improving!";
        }
        if (input.includes('friends')) {
          return "Making friends is an important part of school. Would you like to tell me more about your new friends? Social skills are just as important as academic learning.";
        }
        if (input.includes('homework')) {
          return "I'm happy to help with your homework. What subject are you working on that you need help with? Asking for help is a sign of strength, not weakness.";
        }
        return "Learning is an adventure, and I'm here to guide you. What would you like to learn more about today? Your curiosity is the spark that makes education exciting!";
        
      case 'Community Police Officer':
        if (input.includes('lost')) {
          return "Don't worry, I'll help you find your parents. Can you tell me your name and what your parents look like? If you ever get lost, stay in one place and find a safe person to ask for help—like a police officer.";
        }
        if (input.includes('stranger')) {
          return "You did the right thing by telling me. Stay with me where it's safe, and describe this person to me. Always trust your feelings—if something doesn't feel right, find a trusted adult right away.";
        }
        if (input.includes('dangerous')) {
          return "Thank you for reporting this. It's important to tell adults about dangerous things. Can you show me where you found it? Keeping your community safe means speaking up when you see something concerning.";
        }
        if (input.includes('learn')) {
          return "I'm glad you want to learn about police officers! Our job is to keep everyone safe, help people in emergencies, and make sure everyone follows the rules that keep our community peaceful.";
        }
        return "My job is to keep everyone in the community safe. Is there something specific I can help you with? Police officers are here to protect and serve—we want you to feel safe coming to us for help.";
        
      case 'Friendly Neighbor':
        if (input.includes('how are you')) {
          return "I'm doing well, thank you for asking! It's a lovely day in the neighborhood. How about you? Asking how others are doing shows you care about them.";
        }
        if (input.includes('groceries')) {
          return "That's very thoughtful of you to offer help! I appreciate kind neighbors like you. Helping others builds a stronger community where everyone looks out for each other.";
        }
        if (input.includes('dog')) {
          return "Yes, you can play with my dog! His name is Buddy and he loves playing fetch. Just be gentle with him, okay? Always ask permission before petting or playing with someone's pet.";
        }
        if (input.includes('ball') || input.includes('yard')) {
          return "No problem at all! You're welcome to come get your ball. Would you like me to get it for you? Good neighbors are respectful of each other's property and help solve small problems politely.";
        }
        return "It's always nice to chat with neighbors. How is your family doing? Friendly conversations build connections that make neighborhoods safer and more pleasant places to live.";
        
      case 'Store Employee':
        if (input.includes('toy')) {
          return "The toy section is in aisle 5, near the back of the store. Would you like me to show you where it is? Store employees are here to help you find what you're looking for.";
        }
        if (input.includes('mom') || input.includes('find')) {
          return "Don't worry, we'll find your mom. Let's go to the customer service desk where they can make an announcement. If you ever get separated from your parents in a store, find an employee wearing a uniform for help.";
        }
        if (input.includes('cost') || input.includes('how much')) {
          return "Let me check the price for you. Most items have price tags, or I can scan it at the register. Understanding prices helps you make good decisions about what you can afford to buy.";
        }
        if (input.includes('broke')) {
          return "Accidents happen, don't worry. Let me help clean it up. Next time, remember to be careful with items in the store. Taking responsibility when accidents happen shows maturity and good character.";
        }
        return "I'm here to help you find what you need in our store. What are you shopping for today? Being specific about what you're looking for helps us serve you better.";
        
      default:
        // Default responses if role doesn't match any specific case
        const defaultResponses = [
          `I'm here to help you. What would you like to know? Asking clear questions helps you get the information you need.`,
          `That's an interesting question. Let me think about that... Learning involves being curious and asking questions.`,
          `I appreciate you sharing that with me. Good communication involves both speaking and listening.`,
          `Tell me more about that. The more details you share, the better I can understand.`,
          `How does that make you feel? Understanding your emotions is an important part of growing up.`
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
  };

  // Get educational tips based on character role and context
  const getEducationalTip = (role: string, context: string): string => {
    const tips: Record<string, Record<string, string>> = {
      'Pediatrician': {
        'greeting': 'Doctors are here to help you stay healthy!',
        'introduction': 'Medical professionals have special training to help keep you healthy.',
        'gratitude': 'Being polite to healthcare workers helps create a positive experience.',
        'farewell': 'Remember to follow your doctor\u2019s advice to stay healthy!'
      },
      'Elementary School Teacher': {
        'greeting': 'Teachers are here to help you learn and grow!',
        'introduction': 'Teachers care about both your learning and your well-being.',
        'gratitude': 'Saying thank you shows good manners and respect.',
        'farewell': 'Keep practicing what you\u2019ve learned!'
      },
      'Community Police Officer': {
        'greeting': 'Police officers help keep communities safe!',
        'introduction': 'Police officers are trained to help people in many different situations.',
        'gratitude': 'Police officers appreciate when citizens are cooperative and respectful.',
        'farewell': 'Remember, you can always ask a police officer for help if you need it!'
      },
      'Friendly Neighbor': {
        'greeting': 'Being friendly with neighbors creates a better community!',
        'introduction': 'Getting to know your neighbors helps build a safer neighborhood.',
        'gratitude': 'Being thankful for help strengthens community bonds.',
        'farewell': 'Good neighbors look out for each other!'
      },
      'Store Employee': {
        'greeting': 'Store employees are there to help customers have a good experience!',
        'introduction': 'Store employees know where things are and can answer questions about products.',
        'gratitude': 'Being polite to people who help you shows good character.',
        'farewell': 'Come back soon, and remember to ask for help if you need it!'
      }
    };

    // Return the tip if it exists, otherwise an empty string
    return tips[role]?.[context] || '';
  };

  // Track learning points mentioned in conversation
  const trackLearningPoints = (response: string) => {
    const newLearned = [...learnedPoints];
    let changed = false;
    
    scenario.learningPoints.forEach((point, index) => {
      // Simple check if the response contains keywords from the learning point
      const keywords = point.toLowerCase().split(' ')
        .filter(word => word.length > 4) // Only use significant words
        .map(word => word.replace(/[.,!?;:]/g, '')); // Remove punctuation
        
      const pointMentioned = keywords.some(keyword => 
        response.toLowerCase().includes(keyword)
      );
      
      if (pointMentioned && !newLearned.includes(index)) {
        newLearned.push(index);
        changed = true;
      }
    });
    
    if (changed) {
      setLearnedPoints(newLearned);
    }
    
    return response;
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <Card className="flex-grow flex flex-col shadow-lg">
        <CardHeader className="bg-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CharacterAvatar 
                name={scenario.characterName} 
                role={scenario.characterRole} 
                imageSrc={scenario.characterImage} 
              />
              <div>
                <CardTitle>{scenario.characterName}</CardTitle>
                <CardDescription>{scenario.characterRole}</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/20">
              {scenario.title}
            </Badge>
          </div>
          
          {scenario.learningPoints.length > 0 && (
            <div className="mt-3 pt-2 border-t border-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Learning progress:</p>
              <div className="flex gap-1 flex-wrap">
                {scenario.learningPoints.map((point, index) => (
                  <Badge 
                    key={index} 
                    variant={learnedPoints.includes(index) ? "default" : "outline"} 
                    className={`text-xs ${learnedPoints.includes(index) ? 'bg-green-500/90 hover:bg-green-500' : 'bg-muted/30'}`}
                    title={point}
                  >
                    {index + 1}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                    : 'bg-muted rounded-bl-none'
                } ${index === messages.length - 1 ? 'animate-bounce-short' : ''}`}
              >
                {message.role === 'ai' && message.characterName && (
                  <div className="font-medium text-xs mb-1 text-muted-foreground">
                    {message.characterName}
                  </div>
                )}
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg shadow-sm bg-muted rounded-bl-none">
                <div className="font-medium text-xs mb-1 text-muted-foreground">
                  {scenario.characterName}
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
        
        <CardFooter className="border-t p-3 space-y-3">
          {showSuggestions && scenario.suggestedResponses.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {scenario.suggestedResponses.map((suggestion, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary-foreground rounded-full px-3 py-1 transition-all hover:scale-105"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
          
          <div className="flex items-center space-x-2 w-full">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleAudio}
              className="shrink-0 rounded-full border-primary/30 hover:bg-primary/10"
            >
              {audioEnabled ? <Volume2 size={18} className="text-primary" /> : <VolumeX size={18} className="text-muted-foreground" />}
            </Button>
            
            {typeof window !== 'undefined' && 
             ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) && (
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleListening}
                className={`shrink-0 rounded-full border-primary/30 hover:bg-primary/10 ${isListening ? 'bg-red-100 border-red-300' : ''}`}
              >
                {isListening ? <MicOff size={18} className="text-red-500" /> : <Mic size={18} className="text-primary" />}
              </Button>
            )}
            
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-grow rounded-full border-primary/30 focus-visible:ring-primary/30 px-4"
              disabled={isLoading}
            />
            
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isLoading}
              className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
            >
              <Send size={18} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DialogueConversation; 