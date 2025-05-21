'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, Globe, ChevronRight, Tag, CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Story } from '@/data/mock-data';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

// Define the scene structure for stories with custom scenes
interface StoryScene {
  content: string;
  contentTamil?: string;
  imageUrl?: string;
  caption?: string;
  captionTamil?: string;
}

// Define quiz question type
interface QuizQuestion {
  id: number;
  question: string;
  questionTamil?: string;
  options: string[];
  optionsTamil?: string[];
  correctAnswer: number;
  explanation?: string;
  explanationTamil?: string;
}

interface StoryDetailClientProps {
  story: Story | undefined;
}

export default function StoryDetailClient({ story }: StoryDetailClientProps) {
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  const [currentPage, setCurrentPage] = useState(0);
  const [storyPages, setStoryPages] = useState<StoryScene[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);
  const pageTurnSoundRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  
  // Initialize audio for page turning sound (disabled, no sound path)
  useEffect(() => {
    // No sound loaded to avoid 404 error
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Setup story based on ID
  useEffect(() => {
    if (story) {
      // Special handling for "The Boy Who Cried Wolf" - ID 1
      if (story.id === '1') {
        const wolfStoryScenes: StoryScene[] = [
          {
            content: "Once upon a time, there was a shepherd boy who watched his flock of sheep near a village. He would often get bored while watching the sheep.",
            contentTamil: "ஒரு காலத்தில், ஒரு கிராமத்திற்கு அருகில் தனது ஆடுகளை மேய்த்துக் கொண்டிருந்த ஒரு இடையன் சிறுவன் இருந்தான். ஆடுகளைப் பார்த்துக்கொண்டிருக்கும்போது அவனுக்கு அடிக்கடி சலிப்பு ஏற்படும்.",
            imageUrl: "/stories/wolf_scene1.jpg",
            caption: "A cheerful young shepherd boy watching his flock of sheep on a hillside.",
            captionTamil: "மலைச்சரிவில் ஆடு மந்தையை கவனித்துக் கொண்டிருக்கும் மகிழ்ச்சியான இளம் இடையன் சிறுவன்."
          },
          {
            content: "One day, he thought of a plan to get some excitement. He cried out loudly, 'Wolf! Wolf! A wolf is chasing the sheep!' The villagers heard his cries and rushed to help him. But when they arrived, they found no wolf, only the boy laughing at them. The boy played this trick several times, and each time the villagers came running to help him.",
            contentTamil: "ஒரு நாள், சற்று உற்சாகம் பெற ஒரு திட்டம் நினைத்தான். அவன் உரக்க கத்தினான், 'ஓநாய்! ஓநாய்! ஓநாய் ஆடுகளைத் துரத்துகிறது!' கிராமத்தினர் அவனது அலறலைக் கேட்டு அவனுக்கு உதவ ஓடி வந்தனர். ஆனால் அவர்கள் வந்தபோது, ஓநாய் எதுவும் இல்லை, அவர்களைப் பார்த்து சிரித்துக்கொண்டிருந்த சிறுவனை மட்டுமே கண்டனர். சிறுவன் இந்த விளையாட்டை பல முறை விளையாடினான், ஒவ்வொரு முறையும் கிராமத்தினர் அவனுக்கு உதவ ஓடி வந்தனர்.",
            imageUrl: "/stories/wolf_scene2.jpg",
            caption: "The shepherd boy yelling 'Wolf!' as the villagers run up the hill, while the sheep graze calmly.",
            captionTamil: "கிராமத்தவர்கள் மலைமேல் ஓடிவரும்போது, ஆடுகள் அமைதியாக மேய்ந்துகொண்டிருக்க, இடையன் சிறுவன் 'ஓநாய்!' என்று கத்துகிறான்."
          },
          {
            content: "One day, a real wolf actually came. The boy cried out, 'Wolf! Wolf!' But the villagers thought he was playing the same trick again and didn't come to help. The wolf attacked the flock and ate many sheep.",
            contentTamil: "ஒரு நாள், உண்மையிலேயே ஒரு ஓநாய் வந்தது. சிறுவன், 'ஓநாய்! ஓநாய்!' என்று கத்தினான். ஆனால் கிராமத்தினர் அவன் மீண்டும் அதே விளையாட்டை விளையாடுகிறான் என்று நினைத்து உதவ வரவில்லை. ஓநாய் மந்தையைத் தாக்கி பல ஆடுகளை தின்றது.",
            imageUrl: "/stories/wolf_scene3.jpg",
            caption: "A real wolf appears while the shepherd boy cries for help, but no one comes.",
            captionTamil: "இடையன் சிறுவன் உதவிக்காக கதறுகையில் உண்மையான ஓநாய் தோன்றுகிறது, ஆனால் யாரும் வரவில்லை."
          },
          {
            content: "The boy learned a valuable lesson that day about the importance of telling the truth. Nobody believes a liar, even when they tell the truth.",
            contentTamil: "உண்மையைச் சொல்வதன் முக்கியத்துவத்தைப் பற்றி அன்று சிறுவன் ஒரு மதிப்புமிக்க பாடத்தைக் கற்றுக்கொண்டான். பொய்யர் உண்மையைச் சொன்னாலும் யாரும் நம்ப மாட்டார்கள்.",
            imageUrl: "/stories/wolf_scene4.jpg",
            caption: "The sad shepherd boy sits alone, having learned his lesson about honesty.",
            captionTamil: "நேர்மையைப் பற்றிய பாடத்தைக் கற்றுக்கொண்ட, சோகமான இடையன் சிறுவன் தனியாக அமர்ந்திருக்கிறான்."
          }
        ];
        
        // Add moral as the last page
        const moral = language === 'english' ? story.moral : (story.moralTamil || story.moral);
        if (moral) {
          wolfStoryScenes.push({
            content: `${language === 'english' ? 'Moral:' : 'நீதி:'}\n\n${moral}`,
            contentTamil: `${language === 'english' ? 'Moral:' : 'நீதி:'}\n\n${moral}`,
            imageUrl: wolfStoryScenes[wolfStoryScenes.length - 1].imageUrl
          });
        }
      
        setStoryPages(wolfStoryScenes);
      } 
      // Special handling for "The Lion and the Mouse" - ID 2
      else if (story.id === '2') {
        const lionMouseStoryScenes: StoryScene[] = [
          {
            content: "A mighty lion sleeps peacefully under a tree in a dense jungle. A tiny mouse accidentally scurries over the lion's paw, waking him up. The lion looks angry and roars, catching the mouse with his paw.",
            contentTamil: "அடர்ந்த காட்டில், ஒரு வலிமையான சிங்கம் ஒரு மரத்தின் கீழ் அமைதியாக தூங்கிக்கொண்டிருக்கிறது. ஒரு சிறிய எலி தற்செயலாக சிங்கத்தின் பாதத்தின் மேல் ஓடுகிறது, அதனால் சிங்கம் விழித்துக்கொள்கிறது. சிங்கம் கோபமாகப் பார்த்து கர்ஜிக்கிறது, எலியை தன் பாதத்தால் பிடிக்கிறது.",
            imageUrl: "/stories/lion_scene1.jpg",
            caption: "The Mouse Disturbs the Lion",
            captionTamil: "எலி சிங்கத்தை தொந்தரவு செய்கிறது"
          },
          {
            content: "The lion holds the trembling mouse under his large paw. The mouse pleads for its life with innocent, wide eyes. The lion looks surprised and slightly amused, surrounded by thick jungle vines and greenery.",
            contentTamil: "சிங்கம் நடுங்கும் எலியை தனது பெரிய பாதத்தின் கீழ் பிடித்துக்கொள்கிறது. எலி அப்பாவித்தனமான, அகன்ற கண்களுடன் தனது உயிருக்காக கெஞ்சுகிறது. அடர்ந்த காட்டு கொடிகள் மற்றும் பசுமையால் சூழப்பட்டிருக்கும் சிங்கம் ஆச்சரியமும் சற்று வேடிக்கையும் காணப்படுகிறது.",
            imageUrl: "/stories/lion_scene2.jpg",
            caption: "The Mouse Pleads for Mercy",
            captionTamil: "எலி இரக்கத்திற்காக கெஞ்சுகிறது"
          },
          {
            content: "The lion is tied to a tall tree with thick ropes by hunters in a dense forest. The lion struggles and roars in pain. The hunters are walking away in the background to get their wagon. The scene feels tense and urgent.",
            contentTamil: "அடர்ந்த காட்டில் சிங்கம் வேட்டைக்காரர்களால் உயரமான மரத்தில் தடிமனான கயிறுகளால் கட்டப்பட்டுள்ளது. சிங்கம் போராடி வலியில் கர்ஜிக்கிறது. வேட்டைக்காரர்கள் தங்கள் வண்டியைப் பெற பின்னணியில் நடந்து செல்கின்றனர். காட்சி பதட்டமாகவும் அவசரமாகவும் உணரப்படுகிறது.",
            imageUrl: "/stories/lion_scene3.jpg",
            caption: "The Lion is Captured",
            captionTamil: "சிங்கம் சிக்கிக்கொள்கிறது"
          },
          {
            content: "The small mouse chews through the thick ropes tied around the lion using its sharp teeth. The lion watches with a mix of surprise and gratitude. The setting is a sunny forest clearing with light beams shining through the trees.",
            contentTamil: "சிறிய எலி தனது கூர்மையான பற்களைப் பயன்படுத்தி சிங்கத்தைச் சுற்றி கட்டப்பட்டிருக்கும் தடிமனான கயிறுகளைக் கடித்து அறுக்கிறது. சிங்கம் ஆச்சரியமும் நன்றியும் கலந்த பார்வையுடன் பார்க்கிறது. அமைப்பு ஒரு சூரிய ஒளி படும் காட்டு வெளியாக உள்ளது, மரங்களின் வழியாக ஒளிக்கதிர்கள் பிரகாசிக்கின்றன.",
            imageUrl: "/stories/lion_scene4.jpg",
            caption: "The Mouse Rescues the Lion",
            captionTamil: "எலி சிங்கத்தை காப்பாற்றுகிறது"
          },
          {
            content: "The lion and the mouse stand side by side with warm expressions, symbolizing their friendship. The forest in the background glows with golden light. The lion bows his head slightly in gratitude while the mouse stands proudly.",
            contentTamil: "சிங்கமும் எலியும் அன்பான வெளிப்பாடுகளுடன் பக்கத்திற்குப் பக்கம் நிற்கின்றன, அவர்களின் நட்பைக் குறிக்கின்றன. பின்னணியில் உள்ள காடு பொன் ஒளியில் மின்னுகிறது. சிங்கம் தனது தலையை சற்று நன்றியுடன் குனிந்து, எலி பெருமையாக நிற்கிறது.",
            imageUrl: "/stories/lion_scene5.jpg",
            caption: "Friendship and Gratitude",
            captionTamil: "நட்பு மற்றும் நன்றி"
          }
        ];
        
        setStoryPages(lionMouseStoryScenes);
      }
      else if (story.id === '3') {
        const turtleStoryScenes: StoryScene[] = [
          {
            content: "Once there was a small village suffering from a terrible drought. The land was dry and cracked, crops had wilted, and the villagers were worried as their wells and pots remained empty.",
            contentTamil: "ஒரு காலத்தில், கொடிய வறட்சியால் பாதிக்கப்பட்ட ஒரு சிறிய கிராமம் இருந்தது. நிலம் வறண்டு வெடித்திருந்தது, பயிர்கள் வாடியிருந்தன, கிராமத்தினர் தங்கள் கிணறுகளும் பானைகளும் காலியாக இருப்பதால் கவலைப்பட்டனர்.",
            imageUrl: "/stories/turtle_scene1.jpg",
            caption: "A drought-stricken village with dry, cracked land and worried villagers looking at the sky with empty pots.",
            captionTamil: "வறண்டு வெடித்த நிலம் மற்றும் காலியான பானைகளுடன் வானத்தைப் பார்த்து கவலைப்பட்ட கிராமத்தினர்."
          },
          {
            content: "Three young villagers decided to seek help. One ran quickly ahead, eager to find a solution. Another stopped to pick flowers and berries along the way. The third walked calmly, carrying a walking stick.",
            contentTamil: "மூன்று இளம் கிராமத்தினர் உதவி தேட முடிவு செய்தனர். ஒருவர் விரைவாக முன்னே ஓடினார், தீர்வைக் கண்டுபிடிக்க ஆர்வமாக இருந்தார். மற்றொருவர் வழியில் பூக்களையும் பழங்களையும் எடுக்க நின்றார். மூன்றாமவர் அமைதியாக நடந்து, ஒரு நடைக்கோலை சுமந்து சென்றார்.",
            imageUrl: "/stories/turtle_scene2.jpg",
            caption: "Three young villagers starting their journey - one running fast, one picking flowers, and one walking calmly with a stick.",
            captionTamil: "மூன்று இளம் கிராமத்தினர் தங்கள் பயணத்தைத் தொடங்குகிறார்கள் - ஒருவர் வேகமாக ஓடுகிறார், ஒருவர் பூக்களை எடுக்கிறார், மற்றொருவர் அமைதியாக கோலை ஊன்றி நடக்கிறார்."
          },
          {
            content: "They climbed a hill where they found a wise old turtle sitting peacefully under a tree. The turtle listened to their story and shared his wisdom about patience and perseverance.",
            contentTamil: "அவர்கள் ஒரு மலையில் ஏறி, அங்கே ஒரு மரத்தின் கீழ் அமைதியாக அமர்ந்திருக்கும் ஞானமுள்ள முதிய ஆமையைக் கண்டனர். ஆமை அவர்களின் கதையைக் கேட்டு, பொறுமை மற்றும் விடாமுயற்சி பற்றிய தன் ஞானத்தைப் பகிர்ந்தது.",
            imageUrl: "/stories/turtle_scene3.jpg",
            caption: "The wise old turtle sitting peacefully under a tree on the hilltop, sharing wisdom with the villagers.",
            captionTamil: "மலை உச்சியில் மரத்தின் கீழ் அமைதியாக அமர்ந்திருக்கும் ஞானமுள்ள முதிய ஆமை, கிராமத்தினருடன் ஞானத்தைப் பகிர்ந்து கொள்கிறது."
          },
          {
            content: "Inspired by the turtle's words, the villagers returned home and worked together to dig deep wells. Their patience and teamwork paid off as they dug deeper into the earth.",
            contentTamil: "ஆமையின் வார்த்தைகளால் ஈர்க்கப்பட்ட கிராமத்தினர் வீடு திரும்பி, ஒன்றாக சேர்ந்து ஆழமான கிணறுகளை தோண்டினர். அவர்களின் பொறுமையும் குழு முயற்சியும் பலன் தந்தது, பூமியில் ஆழமாக தோண்டினர்.",
            imageUrl: "/stories/turtle_scene4.jpg",
            caption: "Villagers working together joyfully, digging deep wells with shovels, showing hope and unity.",
            captionTamil: "கிராமத்தினர் மகிழ்ச்சியுடன் ஒன்றாக வேலை செய்து, மண்வெட்டிகளால் ஆழமான கிணறுகளை தோண்டி, நம்பிக்கையையும் ஒற்றுமையையும் காட்டுகிறார்கள்."
          },
          {
            content: "Finally, their efforts were rewarded when they found water! The village celebrated with joy as water sprang from the wells, and children played happily in the fresh water.",
            contentTamil: "இறுதியில், அவர்களின் முயற்சிகள் பலன் தந்தன, தண்ணீரைக் கண்டுபிடித்தனர்! கிணறுகளிலிருந்து தண்ணீர் பீறிட்டெழுந்ததால் கிராமம் மகிழ்ச்சியுடன் கொண்டாடியது, குழந்தைகள் புதிய தண்ணீரில் மகிழ்ச்சியாக விளையாடினர்.",
            imageUrl: "/stories/turtle_scene5.jpg",
            caption: "Water springing from the newly dug well, villagers dancing and celebrating, children playing with water.",
            captionTamil: "புதிதாக தோண்டப்பட்ட கிணற்றிலிருந்து தண்ணீர் பீறிட்டெழுந்து, கிராமத்தினர் நடனமாடி கொண்டாடுகிறார்கள், குழந்தைகள் தண்ணீரில் விளையாடுகிறார்கள்."
          }
        ];
        
        // Add moral as the last page
        const moral = language === 'english' ? story.moral : (story.moralTamil || story.moral);
        if (moral) {
          turtleStoryScenes.push({
            content: `${language === 'english' ? 'Moral:' : 'நீதி:'}\n\n${moral}`,
            contentTamil: `${language === 'english' ? 'Moral:' : 'நீதி:'}\n\n${moral}`,
            imageUrl: turtleStoryScenes[turtleStoryScenes.length - 1].imageUrl
          });
        }
        
        setStoryPages(turtleStoryScenes);
      }
      else if (story.id === '4') {
        const bearStoryScenes: StoryScene[] = [
          {
            content: "Two Indian boys, one wearing a red t-shirt and the other in blue, walking through a peaceful forest trail during the day, smiling and chatting, birds flying above.",
            contentTamil: "ஒரு நாள், இரண்டு இந்திய சிறுவர்கள், ஒருவர் சிவப்பு சட்டையும் மற்றவர் நீல சட்டையும் அணிந்து, ஒரு அமைதியான காட்டுப் பாதையில் நடந்து கொண்டிருந்தனர், பறவைகள் மேலே பறக்க, அவர்கள் மகிழ்ச்சியாக பேசிக்கொண்டிருந்தனர்.",
            imageUrl: "/stories/bearfriends_scene1.jpg",
            caption: "Two boys walking and chatting in a peaceful forest, birds flying above.",
            captionTamil: "அமைதியான காட்டில் நடந்து பேசும் இரண்டு சிறுவர்கள், மேலே பறவைகள் பறக்கின்றன."
          },
          {
            content: "Suddenly, a large brown bear appears on the forest path, growling. One of the boys quickly climbs a tree in fear while the other looks scared and confused on the ground.",
            contentTamil: "திடீரென்று, ஒரு பெரிய பழுப்பு கரடி பாதையில் குரைத்தது. ஒருவன் பயத்தில் விரைவாக ஒரு மரத்தில் ஏறினான், மற்றவன் தரையில் பயந்து குழப்பமாக நின்றான்.",
            imageUrl: "/stories/bearfriends_scene2.jpg",
            caption: "A bear appears, one boy climbs a tree in fear, the other is scared on the ground.",
            captionTamil: "ஒரு கரடி தோன்ற, ஒருவன் மரத்தில் ஏறுகிறான், மற்றவன் தரையில் பயந்து நிற்கிறான்."
          },
          {
            content: "A boy lies very still on the forest floor, pretending to rest calmly with his eyes slightly open, while a big friendly-looking bear sniffs curiously near his face. The other boy watches nervously from the tree above.",
            contentTamil: "தரையில் இருந்த சிறுவன் அமைதியாக படுத்து, கண்களை சற்று திறந்து அமைதியாக இருக்க நடித்தான், கரடி அவனது முகத்தை ஆர்வமாக நுகர்ந்தது. மற்ற சிறுவன் மரத்தில் இருந்து பதற்றமாக பார்த்தான்.",
            imageUrl: "/stories/bearfriends_scene3.jpg",
            caption: "A boy lies still as the bear sniffs him, the other boy watches from the tree.",
            captionTamil: "ஒரு சிறுவன் அமைதியாக படுத்திருக்க, கரடி அவனை நுகர்கிறது, மற்றவன் மரத்தில் இருந்து பார்க்கிறான்."
          },
          {
            content: "The bear gently leans near the boy's ear as if whispering, then calmly walks away into the forest. The boy still lies still with closed eyes.",
            contentTamil: "கரடி மெதுவாக சிறுவனின் காதில் ஏதோ சொல்வது போல நெருங்கி, பின்னர் அமைதியாக காட்டில் நடந்து சென்றது. சிறுவன் இன்னும் அமைதியாக படுத்திருந்தான்.",
            imageUrl: "/stories/bearfriends_scene4.jpg",
            caption: "The bear whispers to the boy and walks away into the forest.",
            captionTamil: "கரடி சிறுவனிடம் ஏதோ சொன்னது போல, காட்டில் நடந்து செல்கிறது."
          },
          {
            content: "Both boys are now standing on the path. The boy who lay down is explaining seriously to his friend, who looks guilty. A forest background with warm tones, conveying a lesson about true friendship.",
            contentTamil: "இருவரும் பாதையில் மீண்டும் நின்றனர். தரையில் படுத்திருந்த சிறுவன், உண்மையான நட்பு பற்றிய பாடத்தை தனது நண்பருக்கு தீவிரமாக விளக்கினான், மற்றவன் குற்றவுணர்வுடன் இருந்தான்.",
            imageUrl: "/stories/bearfriends_scene5.jpg",
            caption: "The boys talk about the lesson of true friendship in the forest.",
            captionTamil: "காட்டில் உண்மையான நட்பு பற்றிய பாடம் பேசும் சிறுவர்கள்."
          }
        ];
        // Add moral as the last page
        const moral = language === 'english' ? story.moral : (story.moralTamil || story.moral);
        if (moral) {
          bearStoryScenes.push({
            content: `${language === 'english' ? 'Moral:' : 'நீதி:'}\n\n${moral}`,
            contentTamil: `${language === 'english' ? 'Moral:' : 'நீதி:'}\n\n${moral}`,
            imageUrl: bearStoryScenes[bearStoryScenes.length - 1].imageUrl
          });
        }
        setStoryPages(bearStoryScenes);
      }
      else if (story.id === '5') {
        const spiderStoryScenes: StoryScene[] = [
          {
            content: "A tired and sad king in simple royal clothes sits inside a quiet cave, looking thoughtful and discouraged. Soft rays of light enter the cave, showing a calm, reflective mood.",
            contentTamil: "சோர்வாகவும் சோகமாகவும் இருக்கும் ஒரு ராஜா எளிய அரச ஆடையில் அமைதியான ஒரு குகையில் அமர்ந்திருக்கிறார், சிந்தனையுடன் மற்றும் மனம் உடைந்த நிலையில். மென்மையான ஒளிக்கதிர்கள் குகையில் புகுந்து அமைதியான சூழலை உருவாக்குகின்றன.",
            imageUrl: "/stories/persistentspider_scene1.jpg",
            caption: "The sad king sits in a quiet cave, looking thoughtful.",
            captionTamil: "சோகமாக குகையில் அமர்ந்திருக்கும் ராஜா."
          },
          {
            content: "A small cartoon spider tries to climb the cave wall using its silk but slips and falls. The king watches curiously.",
            contentTamil: "ஒரு சிறிய சிலந்தி அதன் இழையைப் பயன்படுத்தி குகை சுவரில் ஏற முயற்சிக்கிறது, ஆனால் வழுக்கி கீழே விழுகிறது. ராஜா ஆர்வமாக அதை கவனிக்கிறார்.",
            imageUrl: "/stories/persistentspider_scene2.jpg",
            caption: "The spider tries to climb the wall but slips and falls. The king watches.",
            captionTamil: "சிலந்தி சுவரில் ஏற முயற்சி செய்து விழுகிறது, ராஜா கவனிக்கிறார்."
          },
          {
            content: "The tiny spider finally reaches the top of the wall on its eighth try and starts spinning a beautiful web. The king watches with admiration and a smile.",
            contentTamil: "சிறிய சிலந்தி எட்டாவது முறையில் சுவரின் உச்சியை அடைந்து அழகான வலை நெய்யத் தொடங்குகிறது. ராஜா மகிழ்ச்சியுடன் பாராட்டுகிறார்.",
            imageUrl: "/stories/persistentspider_scene3.jpg",
            caption: "The spider succeeds and spins a web. The king smiles with admiration.",
            captionTamil: "சிலந்தி வெற்றி பெற்று வலை நெய்கிறது, ராஜா மகிழ்ச்சியுடன் பார்க்கிறார்."
          },
          {
            content: "The king stands proudly at the entrance of the cave, holding a map or sword, filled with renewed energy and determination. The sky is bright, birds fly above, symbolizing hope and a new beginning.",
            contentTamil: "ராஜா குகை வாசலில் நின்று, புதிய உற்சாகத்துடன் மற்றும் உறுதியுடன், ஒரு வரைபடம் அல்லது வாளை பிடித்து நிற்கிறார். வானம் பிரகாசமாக உள்ளது, மேலே பறவைகள் பறக்கின்றன, இது புதிய நம்பிக்கையையும் தொடக்கத்தையும் குறிக்கிறது.",
            imageUrl: "/stories/persistentspider_scene4.jpg",
            caption: "The inspired king stands at the cave entrance, ready for a new beginning.",
            captionTamil: "புதிய உற்சாகத்துடன் குகை வாசலில் நிற்கும் ராஜா."
          },
          {
            content: "The king returns to his kingdom, welcomed by his people. He shares the lesson he learned from the persistent spider: never give up, no matter how many times you fail. The kingdom celebrates his return and new wisdom.",
            contentTamil: "ராஜா தனது ராஜ்யத்திற்கு திரும்பி, மக்களால் வரவேற்கப்படுகிறார். சிலந்தியின் விடாமுயற்சியிலிருந்து கற்ற பாடத்தை அவர் அனைவருடனும் பகிர்கிறார்: எத்தனை முறை தோல்வியடைந்தாலும் ஒருபோதும் விடாமுயற்சி கைவிடக்கூடாது. அவரது திரும்பும் மற்றும் புதிய ஞானத்தை ராஜ்யம் கொண்டாடுகிறது.",
            imageUrl: "/stories/persistentspider_scene5.jpg",
            caption: "The king is welcomed back to his kingdom, sharing the lesson of perseverance.",
            captionTamil: "ராஜா தனது ராஜ்யத்திற்கு திரும்பி, விடாமுயற்சி பாடத்தை பகிர்கிறார்."
          }
        ];
        // Add moral as the last page
        const moral = language === 'english' ? story.moral : (story.moralTamil || story.moral);
        if (moral) {
          spiderStoryScenes.push({
            content: `${language === 'english' ? 'Moral:' : 'நீதி:'}\n\n${moral}`,
            contentTamil: `${language === 'english' ? 'Moral:' : 'நீதி:'}\n\n${moral}`,
            imageUrl: spiderStoryScenes[spiderStoryScenes.length - 1].imageUrl
          });
        }
        setStoryPages(spiderStoryScenes);
      }
      else {
        // For other stories, create scenes from the single content
        const contentLines = story.content.split('. ');
        const contentTamilLines = story.contentTamil?.split('. ');
        
        const generatedScenes: StoryScene[] = contentLines.map((line, index) => {
          const scene: StoryScene = {
            content: line + (line.endsWith('.') ? '' : '.'),
          };
          
          if (contentTamilLines && contentTamilLines[index]) {
            scene.contentTamil = contentTamilLines[index] + (contentTamilLines[index].endsWith('.') ? '' : '.');
          }
          
          return scene;
        });
        
        setStoryPages(generatedScenes.filter(scene => scene.content.trim() !== '.'));
      }
    }
  }, [story, language]);

  // Generate quiz questions based on story ID
  useEffect(() => {
    if (story) {
      // The Boy Who Cried Wolf quiz
      if (story.id === '1') {
        setQuizQuestions([
          {
            id: 1,
            question: "What job did the boy have in the story?",
            questionTamil: "கதையில் சிறுவனுக்கு என்ன வேலை இருந்தது?",
            options: ["He was a farmer", "He was a shepherd", "He was a hunter", "He was a fisherman"],
            optionsTamil: ["அவன் ஒரு விவசாயி", "அவன் ஒரு இடையன்", "அவன் ஒரு வேட்டைக்காரன்", "அவன் ஒரு மீனவன்"],
            correctAnswer: 1,
            explanation: "The boy was a shepherd who watched over sheep near a village.",
            explanationTamil: "சிறுவன் ஒரு கிராமத்திற்கு அருகில் ஆடுகளைக் கவனித்துக் கொண்ட ஒரு இடையன்."
          },
          {
            id: 2,
            question: "Why did the boy cry 'Wolf!' when there was no wolf?",
            questionTamil: "ஓநாய் இல்லாதபோது சிறுவன் ஏன் 'ஓநாய்!' என்று கத்தினான்?",
            options: ["He was scared", "He wanted attention", "He was bored and wanted excitement", "He saw another animal"],
            optionsTamil: ["அவன் பயந்துபோனான்", "அவன் கவனத்தை விரும்பினான்", "அவன் சலித்துப்போய் உற்சாகத்தை விரும்பினான்", "அவன் வேறு விலங்கைப் பார்த்தான்"],
            correctAnswer: 2,
            explanation: "The boy was bored watching the sheep and wanted some excitement, so he tricked the villagers.",
            explanationTamil: "சிறுவன் ஆடுகளைப் பார்த்து சலித்துப்போய் சிறிது உற்சாகத்தை விரும்பினான், எனவே கிராமத்தினரை ஏமாற்றினான்."
          },
          {
            id: 3,
            question: "What happened when a real wolf appeared?",
            questionTamil: "உண்மையான ஓநாய் வந்தபோது என்ன நடந்தது?",
            options: ["The villagers came to help", "The boy scared the wolf away", "No one came to help the boy", "The wolf ran away on its own"],
            optionsTamil: ["கிராமத்தினர் உதவ வந்தனர்", "சிறுவன் ஓநாயை விரட்டினான்", "சிறுவனுக்கு உதவ யாரும் வரவில்லை", "ஓநாய் தானாகவே ஓடிவிட்டது"],
            correctAnswer: 2,
            explanation: "When the real wolf came, no one believed the boy's cries for help because he had lied before.",
            explanationTamil: "உண்மையான ஓநாய் வந்தபோது, சிறுவன் முன்பு பொய் சொல்லியிருந்ததால் அவனது உதவி அழைப்புகளை யாரும் நம்பவில்லை."
          },
          {
            id: 4,
            question: "What is the moral of the story?",
            questionTamil: "கதையின் நீதி என்ன?",
            options: ["Always be brave", "Never work alone", "Always tell the truth", "Follow your parents' advice"],
            optionsTamil: ["எப்போதும் தைரியமாக இருங்கள்", "ஒருபோதும் தனியாக வேலை செய்யாதீர்கள்", "எப்போதும் உண்மையைச் சொல்லுங்கள்", "உங்கள் பெற்றோரின் அறிவுரையைப் பின்பற்றுங்கள்"],
            correctAnswer: 2,
            explanation: "The moral is that nobody believes a liar, even when they're telling the truth.",
            explanationTamil: "நீதி என்னவென்றால், பொய்யர் உண்மையைச் சொன்னாலும் யாரும் நம்ப மாட்டார்கள்."
          }
        ]);
      } 
      // The Lion and the Mouse quiz
      else if (story.id === '2') {
        setQuizQuestions([
          {
            id: 1,
            question: "How did the mouse disturb the lion?",
            questionTamil: "எலி எவ்வாறு சிங்கத்தை தொந்தரவு செய்தது?",
            options: ["It stole the lion's food", "It roared loudly", "It ran across the lion's paw", "It bit the lion's tail"],
            optionsTamil: ["அது சிங்கத்தின் உணவை திருடியது", "அது உரக்க கர்ஜித்தது", "அது சிங்கத்தின் பாதத்தின் மேல் ஓடியது", "அது சிங்கத்தின் வாலைக் கடித்தது"],
            correctAnswer: 2,
            explanation: "The mouse accidentally ran over the lion's paw while he was sleeping, which woke him up.",
            explanationTamil: "எலி தற்செயலாக சிங்கம் தூங்கிக்கொண்டிருந்தபோது அதன் பாதத்தின் மேல் ஓடியது, இது சிங்கத்தை எழுப்பியது."
          },
          {
            id: 2,
            question: "Why did the lion let the mouse go?",
            questionTamil: "சிங்கம் ஏன் எலியை விட்டுவிட்டது?",
            options: ["The mouse was too small to eat", "The mouse promised to help the lion someday", "The lion was not hungry", "The mouse was too fast to catch"],
            optionsTamil: ["எலி சாப்பிட மிகவும் சிறியதாக இருந்தது", "எலி ஒரு நாள் சிங்கத்திற்கு உதவ உறுதியளித்தது", "சிங்கத்திற்கு பசி இல்லை", "எலி பிடிக்க முடியாத அளவுக்கு வேகமாக இருந்தது"],
            correctAnswer: 1,
            explanation: "The mouse promised to help the lion someday if he let it go, and the lion was amused by this idea.",
            explanationTamil: "எலி தன்னை விட்டுவிட்டால் ஒரு நாள் சிங்கத்திற்கு உதவ உறுதியளித்தது, இந்த யோசனை சிங்கத்திற்கு வேடிக்கையாக இருந்தது."
          },
          {
            id: 3,
            question: "How was the lion trapped?",
            questionTamil: "சிங்கம் எவ்வாறு சிக்கிக்கொண்டது?",
            options: ["It fell into a pit", "It was caught in a hunter's net", "It was trapped in a cave", "It was tied to a tree with ropes"],
            optionsTamil: ["அது ஒரு குழியில் விழுந்தது", "அது வேட்டைக்காரனின் வலையில் சிக்கியது", "அது ஒரு குகையில் சிக்கிக்கொண்டது", "அது கயிறுகளால் ஒரு மரத்தில் கட்டப்பட்டிருந்தது"],
            correctAnswer: 3,
            explanation: "The lion was tied to a tree with thick ropes by hunters.",
            explanationTamil: "சிங்கம் வேட்டைக்காரர்களால் தடிமனான கயிறுகளால் ஒரு மரத்தில் கட்டப்பட்டிருந்தது."
          },
          {
            id: 4,
            question: "How did the mouse help the lion?",
            questionTamil: "எலி எவ்வாறு சிங்கத்திற்கு உதவியது?",
            options: ["It scared the hunters away", "It brought other animals to help", "It gnawed through the ropes", "It distracted the hunters"],
            optionsTamil: ["அது வேட்டைக்காரர்களை பயமுறுத்தி விரட்டியது", "அது உதவ மற்ற விலங்குகளை அழைத்து வந்தது", "அது கயிறுகளை கடித்து அறுத்தது", "அது வேட்டைக்காரர்களின் கவனத்தை திசைதிருப்பியது"],
            correctAnswer: 2,
            explanation: "The mouse used its sharp teeth to gnaw through the ropes that bound the lion.",
            explanationTamil: "எலி தனது கூர்மையான பற்களைப் பயன்படுத்தி சிங்கத்தைக் கட்டியிருந்த கயிறுகளைக் கடித்து அறுத்தது."
          }
        ]);
      } 
      // Default quiz for other stories
      else {
        setQuizQuestions([
          {
            id: 1,
            question: "What is the main message of this story?",
            questionTamil: "இந்த கதையின் முக்கிய செய்தி என்ன?",
            options: ["Be kind to others", "Work hard", "Tell the truth", "Help those in need"],
            optionsTamil: ["மற்றவர்களிடம் அன்பாக இருங்கள்", "கடினமாக உழையுங்கள்", "உண்மையைச் சொல்லுங்கள்", "தேவைப்படுவோருக்கு உதவுங்கள்"],
            correctAnswer: 0,
            explanation: "The main message is about being kind to others and helping those in need.",
            explanationTamil: "முக்கிய செய்தி மற்றவர்களிடம் அன்பாக இருப்பதும் தேவைப்படுவோருக்கு உதவுவதுமாகும்."
          },
          {
            id: 2,
            question: "Who is the main character in the story?",
            questionTamil: "கதையில் முக்கிய கதாபாத்திரம் யார்?",
            options: ["A child", "An animal", "An adult", "A magical being"],
            optionsTamil: ["ஒரு குழந்தை", "ஒரு விலங்கு", "ஒரு பெரியவர்", "ஒரு மாய ஜீவன்"],
            correctAnswer: 1,
            explanation: "The main character in the story is an animal who learns an important lesson.",
            explanationTamil: "கதையின் முக்கிய கதாபாத்திரம் ஒரு முக்கியமான பாடத்தைக் கற்றுக்கொள்ளும் ஒரு விலங்கு."
          },
          {
            id: 3,
            question: "What challenge did the characters face in the story?",
            questionTamil: "கதையில் கதாபாத்திரங்கள் எந்த சவாலை எதிர்கொண்டனர்?",
            options: ["Overcoming fear", "Finding food", "Making friends", "Solving a problem"],
            optionsTamil: ["பயத்தை வெல்வது", "உணவு கண்டுபிடிப்பது", "நண்பர்களை உருவாக்குவது", "ஒரு பிரச்சினையைத் தீர்ப்பது"],
            correctAnswer: 3,
            explanation: "The characters had to solve a problem by working together.",
            explanationTamil: "கதாபாத்திரங்கள் ஒன்றாக இணைந்து செயல்பட்டு ஒரு பிரச்சினையைத் தீர்க்க வேண்டியிருந்தது."
          }
        ]);
      }
    }
  }, [story]);

  // Function to play page turn sound (disabled)
  const playPageTurnSound = () => {
    // Sound is disabled, do nothing
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'tamil' : 'english');
  };

  const nextPage = () => {
    if (currentPage < storyPages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      playPageTurnSound();
      if (bookRef.current) {
        const bookPage = bookRef.current.querySelector('.book-page');
        if (bookPage) {
          (bookPage as HTMLElement).classList.add('turning-right-animation');
        }
      }
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        if (bookRef.current) {
          const bookPage = bookRef.current.querySelector('.book-page');
          if (bookPage) {
            (bookPage as HTMLElement).classList.remove('turning-right-animation');
          }
        }
        setIsFlipping(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      playPageTurnSound();
      if (bookRef.current) {
        const bookPage = bookRef.current.querySelector('.book-page');
        if (bookPage) {
          (bookPage as HTMLElement).classList.add('turning-left-animation');
        }
      }
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        if (bookRef.current) {
          const bookPage = bookRef.current.querySelector('.book-page');
          if (bookPage) {
            (bookPage as HTMLElement).classList.remove('turning-left-animation');
          }
        }
        setIsFlipping(false);
      }, 600);
    }
  };

  const goToPage = (index: number) => {
    if (index !== currentPage && !isFlipping) {
      setIsFlipping(true);
      playPageTurnSound();
      const direction = index > currentPage ? 'turning-right-animation' : 'turning-left-animation';
      
      if (bookRef.current) {
        const bookPage = bookRef.current.querySelector('.book-page');
        if (bookPage) {
          (bookPage as HTMLElement).classList.add(direction);
        }
      }
      setTimeout(() => {
        setCurrentPage(index);
        if (bookRef.current) {
          const bookPage = bookRef.current.querySelector('.book-page');
          if (bookPage) {
            (bookPage as HTMLElement).classList.remove(direction);
          }
        }
        setIsFlipping(false);
      }, 600);
    }
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && !isFlipping) {
      nextPage();
    }
    
    if (isRightSwipe && !isFlipping) {
      prevPage();
    }
  };

  // Return to stories list
  const handleBackToStories = () => {
    router.push('/stories');
  };

  // Generate quiz (now functional)
  const handleGenerateQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    setQuizOpen(true);
  };

  // Handle selecting an option
  const handleSelectOption = (optionIndex: number) => {
    if (!isAnswered) {
      setSelectedOption(optionIndex);
    }
  };

  // Check answer
  const handleCheckAnswer = () => {
    if (selectedOption !== null) {
      setIsAnswered(true);
      if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
        setCorrectAnswers(prev => prev + 1);
      }
    }
  };

  // Go to next question
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  // Restart quiz
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  // If story not found
  if (!story) {
    return <div className="text-center py-12">{language === 'english' ? 'Loading...' : 'ஏற்றுகிறது...'}</div>;
  }

  const displayTitle = language === 'english' ? story.title : (story.titleTamil || story.title);
  const displayExcerpt = language === 'english' ? story.excerpt : (story.excerptTamil || story.excerpt);
  const currentScene = storyPages[currentPage];
  
  // Determine content based on language
  const getSceneContent = (scene: StoryScene | undefined) => {
    if (!scene) return '';
    if (language === 'tamil' && scene.contentTamil) {
      return scene.contentTamil;
    }
    return scene.content;
  };

  // Get scene caption based on language
  const getSceneCaption = (scene: StoryScene | undefined) => {
    if (!scene || !scene.caption) return '';
    if (language === 'tamil' && scene.captionTamil) {
      return scene.captionTamil;
    }
    return scene.caption;
  };

  // Categories translation for Tamil
  const getCategoryTranslation = (category: string): string => {
    const translations: Record<string, string> = {
      'Honesty': 'நேர்மை',
      'Kindness': 'கருணை',
      'Wisdom': 'ஞானம்',
      'Friendship': 'நட்பு',
      'Perseverance': 'விடாமுயற்சி',
      'Sharing': 'பகிர்தல்',
      'Gratitude': 'நன்றி',
      'Respect': 'மரியாதை',
      'Humility': 'பணிவு',
      'Courage': 'தைரியம்',
      'Responsibility': 'பொறுப்புணர்வு'
    };
    
    return translations[category] || category;
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-3">
        <Button 
          variant="ghost" 
          onClick={handleBackToStories}
          className="w-full sm:w-auto justify-start"
          size="sm"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> {language === 'english' ? 'Back to Stories' : 'கதைகளுக்குத் திரும்பு'}
        </Button>
        
        <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <Button 
            variant="outline" 
            onClick={toggleLanguage}
            className="flex-1 sm:flex-auto items-center"
            size="sm"
          >
            <Globe className="mr-1 sm:mr-2 h-4 w-4" /> 
            <span className="text-xs sm:text-sm">
              {language === 'english' ? 'தமிழில் படிக்க' : 'Read in English'}
            </span>
          </Button>
          <Button 
            variant="default" 
            onClick={handleGenerateQuiz}
            className="flex-1 sm:flex-auto"
            size="sm"
          >
            <BookOpen className="mr-1 sm:mr-2 h-4 w-4" /> 
            <span className="text-xs sm:text-sm">
              {language === 'english' ? 'Take Quiz' : 'வினாடி வினா'}
            </span>
          </Button>
        </div>
      </div>
      
      {/* Story Header */}
      <div className="mb-4 sm:mb-6 text-center">
        <Link 
          href={`/stories/categories/${story.category.toLowerCase()}`}
          className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary mb-1 sm:mb-2"
        >
          <Tag size={14} />
          {language === 'english' ? story.category : getCategoryTranslation(story.category)}
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold mb-2">{displayTitle}</h1>
        <p className="text-sm text-muted-foreground">{displayExcerpt}</p>
      </div>

      {/* Story Book */}
      <div 
        ref={bookRef}
        className="relative bg-white rounded-lg shadow-lg overflow-hidden book-container my-4 sm:my-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Book binding effect */}
        <div className="book-spine"></div>
        
        <div className="absolute top-2 right-2 z-10 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {currentPage + 1} / {storyPages.length}
        </div>
        
        {/* Book page with content */}
        <div className="book-page">
          {currentScene?.imageUrl && (
            <div className="relative h-[180px] sm:h-[250px] md:h-[300px] w-full">
              <Image
                src={currentScene.imageUrl}
                alt={getSceneCaption(currentScene) || displayTitle}
                fill
                className="object-cover"
                onError={(e) => {
                  console.log("Image failed to load:", currentScene.imageUrl);
                  const imgElement = e.currentTarget as HTMLImageElement;
                  imgElement.src = "/stories/placeholder.jpg";
                }}
              />
              {/* Image Caption */}
              {getSceneCaption(currentScene) && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 sm:p-2 text-xs text-center">
                  {getSceneCaption(currentScene)}
                </div>
              )}
            </div>
          )}
          
          <div className="p-3 sm:p-6">
            <div className="prose prose-sm sm:prose max-w-none">
              {currentScene && getSceneContent(currentScene)?.split('\n\n').map((paragraph, i) => (
                <p key={i} className={`text-sm sm:text-base ${language === 'tamil' ? 'text-base font-normal leading-7 text-tamil' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-3 sm:mt-4 mb-4">
        <Button 
          variant="outline" 
          onClick={prevPage} 
          disabled={currentPage === 0 || isFlipping}
          className="w-[80px] sm:w-[100px]"
          size="sm"
        >
          <ChevronLeft className="mr-1 sm:mr-2 h-4 w-4" /> {language === 'english' ? 'Previous' : 'முந்தைய'}
        </Button>
        
        <div className="flex-1 flex justify-center">
          {storyPages.length > 0 && (
            <div className="flex gap-1">
              {storyPages.length <= 10 ? (
                // Show all pages if 10 or fewer
                storyPages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-2 h-2 rounded-full ${index === currentPage ? 'bg-primary' : 'bg-gray-300'}`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))
              ) : (
                // Only show a subset for many pages
                <>
                  {/* First page */}
                  <button
                    onClick={() => goToPage(0)}
                    className={`w-2 h-2 rounded-full ${currentPage === 0 ? 'bg-primary' : 'bg-gray-300'}`}
                    aria-label="Go to first page"
                  />
                  
                  {/* Pages around current page */}
                  {[...Array(Math.min(5, storyPages.length))].map((_, i) => {
                    const pageIndex = Math.max(1, Math.min(
                      currentPage - Math.floor(5/2) + i, 
                      storyPages.length - 2
                    ));
                    return pageIndex > 0 && pageIndex < storyPages.length - 1 ? (
                      <button
                        key={pageIndex}
                        onClick={() => goToPage(pageIndex)}
                        className={`w-2 h-2 rounded-full ${pageIndex === currentPage ? 'bg-primary' : 'bg-gray-300'}`}
                        aria-label={`Go to page ${pageIndex + 1}`}
                      />
                    ) : null;
                  })}
                  
                  {/* Last page */}
                  <button
                    onClick={() => goToPage(storyPages.length - 1)}
                    className={`w-2 h-2 rounded-full ${currentPage === storyPages.length - 1 ? 'bg-primary' : 'bg-gray-300'}`}
                    aria-label="Go to last page"
                  />
                </>
              )}
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          onClick={nextPage} 
          disabled={currentPage === storyPages.length - 1 || isFlipping}
          className="w-[80px] sm:w-[100px]"
          size="sm"
        >
          {language === 'english' ? 'Next' : 'அடுத்து'} <ChevronRight className="ml-1 sm:ml-2 h-4 w-4" />
        </Button>
      </div>
      
      {/* Mobile Swipe Hint */}
      <div className="text-center text-xs text-muted-foreground mb-4 sm:mb-6 md:hidden">
        {language === 'english' ? 'Swipe left or right to navigate' : 'செல்ல இடது அல்லது வலது புறமாக ஸ்வைப் செய்யவும்'}
      </div>
      
      {/* Quiz Dialog */}
      <Dialog open={quizOpen} onOpenChange={setQuizOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto w-[95vw] sm:w-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              {language === 'english' ? 'Story Quiz' : 'கதை வினாடி வினா'}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              {language === 'english' 
                ? 'Test your understanding of the story with these questions.' 
                : 'இந்த கேள்விகளுடன் கதையின் புரிதலை சோதிக்கவும்.'}
            </DialogDescription>
          </DialogHeader>
          
          {!quizCompleted ? (
            <div className="py-2 sm:py-4">
              {/* Progress indicator */}
              <div className="mb-3 sm:mb-4">
                <Progress value={(currentQuestion + 1) / quizQuestions.length * 100} className="h-2" />
                <p className={`text-xs text-right mt-1 text-muted-foreground ${language === 'tamil' ? 'font-tamil' : ''}`}>
                  {language === 'english' 
                    ? `Question ${currentQuestion + 1} of ${quizQuestions.length}` 
                    : `கேள்வி ${currentQuestion + 1} / ${quizQuestions.length}`}
                </p>
              </div>
              
              {quizQuestions.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className={`font-medium text-base sm:text-lg ${language === 'tamil' ? 'font-tamil' : ''}`}>
                    {language === 'english' 
                      ? quizQuestions[currentQuestion].question 
                      : quizQuestions[currentQuestion].questionTamil || quizQuestions[currentQuestion].question}
                  </h3>
                  
                  <RadioGroup value={selectedOption?.toString() || ""} className="space-y-2 sm:space-y-3">
                    {(language === 'english' 
                      ? quizQuestions[currentQuestion].options 
                      : quizQuestions[currentQuestion].optionsTamil || quizQuestions[currentQuestion].options
                    ).map((option, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center space-x-2 border p-2 sm:p-3 rounded-md cursor-pointer transition-colors text-sm sm:text-base ${
                          isAnswered 
                            ? index === quizQuestions[currentQuestion].correctAnswer 
                              ? 'border-green-500 bg-green-50' 
                              : selectedOption === index 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-200' 
                            : selectedOption === index 
                              ? 'border-primary bg-primary/5' 
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleSelectOption(index)}
                      >
                        <RadioGroupItem 
                          value={index.toString()} 
                          id={`option-${index}`} 
                          disabled={isAnswered} 
                          className="text-primary" 
                        />
                        <Label 
                          htmlFor={`option-${index}`} 
                          className={`flex-1 cursor-pointer text-sm sm:text-base ${
                            language === 'tamil' ? 'font-tamil' : ''
                          }`}
                        >
                          {option}
                        </Label>
                        
                        {isAnswered && (
                          index === quizQuestions[currentQuestion].correctAnswer 
                            ? <CheckCircle2 className="h-5 w-5 text-green-500" /> 
                            : selectedOption === index 
                              ? <XCircle className="h-5 w-5 text-red-500" /> 
                              : null
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                  
                  {/* Answer explanation */}
                  {isAnswered && quizQuestions[currentQuestion].explanation && (
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-muted rounded-md text-xs sm:text-sm">
                      <p className={`font-medium mb-1 ${language === 'tamil' ? 'font-tamil' : ''}`}>
                        {language === 'english' ? 'Explanation:' : 'விளக்கம்:'}
                      </p>
                      <p className={language === 'tamil' ? 'font-tamil' : ''}>
                        {language === 'english' 
                          ? quizQuestions[currentQuestion].explanation 
                          : quizQuestions[currentQuestion].explanationTamil || quizQuestions[currentQuestion].explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-between mt-4 sm:mt-6">
                {!isAnswered ? (
                  <Button 
                    onClick={handleCheckAnswer} 
                    disabled={selectedOption === null}
                    className="w-full"
                    size="sm"
                  >
                    <span className={`text-sm ${language === 'tamil' ? 'font-tamil' : ''}`}>
                      {language === 'english' ? 'Check Answer' : 'பதிலைச் சரிபார்க்கவும்'}
                    </span>
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNextQuestion} 
                    className="w-full"
                    size="sm"
                  >
                    <span className={`text-sm ${language === 'tamil' ? 'font-tamil' : ''}`}>
                      {currentQuestion < quizQuestions.length - 1 
                        ? (language === 'english' ? 'Next Question' : 'அடுத்த கேள்வி') 
                        : (language === 'english' ? 'See Results' : 'முடிவுகளைக் காண')}
                    </span>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-3 sm:py-4 text-center">
              <div className="mb-3 sm:mb-4">
                <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-primary/10 rounded-full mb-2 sm:mb-3">
                  <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${language === 'tamil' ? 'font-tamil' : ''}`}>
                  {language === 'english' ? 'Quiz Complete!' : 'வினாடி வினா முடிந்தது!'}
                </h3>
                <p className={`text-sm text-muted-foreground ${language === 'tamil' ? 'font-tamil' : ''}`}>
                  {language === 'english' 
                    ? `You scored ${correctAnswers} out of ${quizQuestions.length}` 
                    : `நீங்கள் ${quizQuestions.length}ல் ${correctAnswers} மதிப்பெண்கள் பெற்றுள்ளீர்கள்`}
                </p>
              </div>
              
              <div className="my-3 sm:my-6 p-3 sm:p-4 border rounded-lg">
                <div className="space-y-1 sm:space-y-2">
                  <div className="h-3 sm:h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${(correctAnswers / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {Math.round((correctAnswers / quizQuestions.length) * 100)}%
                  </p>
                </div>
                
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm grid grid-cols-2 gap-2">
                  <div>
                    <p className={`text-muted-foreground ${language === 'tamil' ? 'font-tamil' : ''}`}>
                      {language === 'english' ? 'Correct' : 'சரியானவை'}
                    </p>
                    <p className="font-bold text-base sm:text-lg">{correctAnswers}</p>
                  </div>
                  <div>
                    <p className={`text-muted-foreground ${language === 'tamil' ? 'font-tamil' : ''}`}>
                      {language === 'english' ? 'Incorrect' : 'தவறானவை'}
                    </p>
                    <p className="font-bold text-base sm:text-lg">{quizQuestions.length - correctAnswers}</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0 flex flex-row sm:flex-row">
                <Button variant="outline" onClick={() => setQuizOpen(false)} className="flex-1" size="sm">
                  <span className={`text-sm ${language === 'tamil' ? 'font-tamil' : ''}`}>
                    {language === 'english' ? 'Close' : 'மூடு'}
                  </span>
                </Button>
                <Button onClick={handleRestartQuiz} className="flex-1" size="sm">
                  <span className={`text-sm ${language === 'tamil' ? 'font-tamil' : ''}`}>
                    {language === 'english' ? 'Try Again' : 'மீண்டும் முயற்சி செய்'}
                  </span>
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add custom styles for the storybook */}
      <style jsx global>{`
        .book-container {
          perspective: 1200px;
          transform-style: preserve-3d;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          border-radius: 5px;
          background-image: linear-gradient(to right, #f3f4f6, #ffffff);
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .book-container {
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          }
        }

        .book-page {
          background: white;
          transform-origin: left center;
          transition: all 0.1s ease;
          position: relative;
          overflow: hidden;
          border-left: 1px solid rgba(0,0,0,0.1);
          backface-visibility: hidden;
          min-height: 300px;
        }
        
        @media (min-width: 640px) {
          .book-page {
            min-height: 400px;
          }
        }
        
        .book-spine {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 20px;
          background: linear-gradient(to right, rgba(0,0,0,0.15), transparent);
          z-index: 2;
          border-right: 1px solid rgba(0,0,0,0.05);
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          pointer-events: none;
        }
        
        @media (min-width: 640px) {
          .book-spine {
            width: 30px;
          }
        }
        
        .turning-right-animation {
          animation: turnPageRight 0.6s ease-in-out forwards;
        }
        
        .turning-left-animation {
          animation: turnPageLeft 0.6s ease-in-out forwards;
        }
        
        @keyframes turnPageRight {
          0% {
            transform: rotateY(0deg);
            box-shadow: 0 0 0 rgba(0,0,0,0);
          }
          25% {
            transform: rotateY(-40deg);
            box-shadow: -10px 10px 30px rgba(0,0,0,0.2);
          }
          50% {
            transform: rotateY(-80deg);
            box-shadow: -20px 20px 30px rgba(0,0,0,0.3);
          }
          75% {
            transform: rotateY(-130deg);
            box-shadow: -30px 30px 30px rgba(0,0,0,0.2);
            opacity: 0.7;
          }
          100% {
            transform: rotateY(-180deg);
            box-shadow: 0 0 0 rgba(0,0,0,0);
            opacity: 0;
          }
        }
        
        @keyframes turnPageLeft {
          0% {
            transform: rotateY(-180deg);
            box-shadow: 0 0 0 rgba(0,0,0,0);
            opacity: 0;
          }
          25% {
            transform: rotateY(-130deg);
            box-shadow: -30px 30px 30px rgba(0,0,0,0.2);
            opacity: 0.7;
          }
          50% {
            transform: rotateY(-80deg);
            box-shadow: -20px 20px 30px rgba(0,0,0,0.3);
          }
          75% {
            transform: rotateY(-40deg);
            box-shadow: -10px 10px 30px rgba(0,0,0,0.2);
          }
          100% {
            transform: rotateY(0deg);
            box-shadow: 0 0 0 rgba(0,0,0,0);
          }
        }
        
        /* Tamil font optimizations */
        .text-tamil, .font-tamil {
          font-family: 'Arial', 'Noto Sans Tamil', sans-serif;
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
}