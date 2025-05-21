export type Alphabet = {
  letter: string;
  word: string;
  imageUrl: string;
  imageHint: string;
  gifUrl: string;
  // soundUrl: string; // Placeholder for future sound feature
};

export const alphabets: Alphabet[] = [
  { letter: 'A', word: 'A is for Apple', imageUrl: '/alphabets/apple.gif', imageHint: 'red apple', gifUrl: '/alphabets/apple.gif' },
  { letter: 'B', word: 'B is for Ball', imageUrl: '/alphabets/ball.gif', imageHint: 'colorful ball', gifUrl: '/alphabets/ball.gif' },
  { letter: 'C', word: 'C is for Cat', imageUrl: '/alphabets/cat.gif', imageHint: 'cute cat', gifUrl: '/alphabets/cat.gif' },
  { letter: 'D', word: 'D is for Dog', imageUrl: '/alphabets/dog.gif', imageHint: 'happy dog', gifUrl: '/alphabets/dog.gif' },
  { letter: 'E', word: 'E is for Elephant', imageUrl: '/alphabets/elephant.gif', imageHint: 'grey elephant', gifUrl: '/alphabets/elephant.gif' },
  { letter: 'F', word: 'F is for Fish', imageUrl: '/alphabets/fish.gif', imageHint: 'blue fish', gifUrl: '/alphabets/fish.gif' },
  { letter: 'G', word: 'G is for Goat', imageUrl: '/alphabets/goat.gif', imageHint: 'white goat', gifUrl: '/alphabets/goat.gif' },
  { letter: 'H', word: 'H is for Hat', imageUrl: '/alphabets/hat.gif', imageHint: 'straw hat', gifUrl: '/alphabets/hat.gif' },
  { letter: 'I', word: 'I is for Ice Cream', imageUrl: '/alphabets/ice.gif', imageHint: 'vanilla icecream', gifUrl: '/alphabets/ice.gif' },
  { letter: 'J', word: 'J is for Jam', imageUrl: '/alphabets/jug.gif', imageHint: 'strawberry jam', gifUrl: '/alphabets/jug.gif' },
  { letter: 'K', word: 'K is for Kite', imageUrl: '/alphabets/kite.gif', imageHint: 'flying kite', gifUrl: '/alphabets/kite.gif' },
  { letter: 'L', word: 'L is for Lion', imageUrl: '/alphabets/lion.gif', imageHint: 'mane lion', gifUrl: '/alphabets/lion.gif' },
  { letter: 'M', word: 'M is for Monkey', imageUrl: '/alphabets/monkey.gif', imageHint: 'brown monkey', gifUrl: '/alphabets/monkey.gif' },
  { letter: 'N', word: 'N is for Nest', imageUrl: '/alphabets/nest.gif', imageHint: 'bird nest', gifUrl: '/alphabets/nest.gif' },
  { letter: 'O', word: 'O is for Orange', imageUrl: '/alphabets/orange.gif', imageHint: 'juicy orange', gifUrl: '/alphabets/orange.gif' },
  { letter: 'P', word: 'P is for Penguin', imageUrl: '/alphabets/penguin.gif', imageHint: 'yellow pencil', gifUrl: '/alphabets/penguin.gif' },
  { letter: 'Q', word: 'Q is for Queen', imageUrl: '/alphabets/queen.gif', imageHint: 'royal queen', gifUrl: '/alphabets/queen.gif' },
  { letter: 'R', word: 'R is for Rabbit', imageUrl: '/alphabets/rabbit.gif', imageHint: 'vibrant rainbow', gifUrl: '/alphabets/rabbit.gif' },
  { letter: 'S', word: 'S is for Sun', imageUrl: '/alphabets/sun.gif', imageHint: 'shining sun', gifUrl: '/alphabets/sun.gif' },
  { letter: 'T', word: 'T is for Tiger', imageUrl: '/alphabets/tiger.gif', imageHint: 'green tree', gifUrl: '/alphabets/tiger.gif' },
  { letter: 'U', word: 'U is for Umbrella', imageUrl: '/alphabets/umbrella.gif', imageHint: 'open umbrella', gifUrl: '/alphabets/umbrella.gif' },
  { letter: 'V', word: 'V is for Violin', imageUrl: '/alphabets/violin.gif', imageHint: 'wooden violin', gifUrl: '/alphabets/violin.gif' },
  { letter: 'W', word: 'W is for Whale', imageUrl: '/alphabets/whale.gif', imageHint: 'wrist watch', gifUrl: '/alphabets/whale.gif' },
  { letter: 'X', word: 'X is for Xylophone', imageUrl: '/alphabets/xylophone.gif', imageHint: 'musical xylophone', gifUrl: '/alphabets/xylophone.gif' },
  { letter: 'Y', word: 'Y is for Yarn', imageUrl: '/alphabets/yarn.gif', imageHint: 'furry yak', gifUrl: '/alphabets/yarn.gif' },
  { letter: 'Z', word: 'Z is for Zebra', imageUrl: '/alphabets/zebra.gif', imageHint: 'striped zebra', gifUrl: '/alphabets/zebra.gif' },
];

export type Game = {
  id: string;
  title: string;
  description: string;
  IconName: string; // Corresponds to Lucide icon names
  href: string;
  imageHint: string;
};

export const games: Game[] = [
  { id: '1', title: 'Number Ninjas', description: 'Master numbers with fun counting games.', IconName: 'Hash', href: '/learn/games/numbers', imageHint: 'colorful numbers' },
  { id: '2', title: 'Color Champions', description: 'Explore the vibrant world of colors.', IconName: 'Palette', href: '/learn/games/colors', imageHint: 'paint palette' },
  { id: '3', title: 'Shape Shifters', description: 'Identify and match different shapes.', IconName: 'Shapes', href: '/learn/games/shapes', imageHint: 'geometric shapes' },
  { id: '4', title: 'Memory Masters', description: 'Boost your memory with exciting challenges.', IconName: 'Brain', href: '/learn/games/memory', imageHint: 'brain puzzle' },
  { id: '5', title: 'Pattern Pals', description: 'Complete the sequence by finding the missing pattern!', IconName: 'ListChecks', href: '/learn/games/patterns', imageHint: 'pattern sequence' },
  { id: '6', title: 'Traffic Safety Heroes', description: 'Navigate roads safely! Learn traffic signs, road rules, and become a safety champion!', IconName: 'Car', href: '/learn/games/traffic', imageHint: 'traffic light and car' },
  { id: '7', title: 'Word Explorer', description: 'Learn new words and build vocabulary through fun word games!', IconName: 'BookOpen', href: '/learn/games/words', imageHint: 'book and letters' }
];

export type Story = {
  id: string;
  title: string;
  titleTamil?: string; // Tamil title
  category: string;
  content: string; // Full story text for quiz generation
  contentTamil?: string; // Tamil version of the story
  excerpt: string;
  excerptTamil?: string; // Tamil excerpt
  imageUrl: string;
  imageHint: string;
  moral?: string; // The moral of the story
  moralTamil?: string; // Tamil version of the moral
  // audioUrl: string; // Placeholder
  scenes?: {
    content: string;
    contentTamil?: string;
    imageUrl: string;
    caption: string;
    captionTamil?: string;
  }[];
};

export const stories: Story[] = [
  // Honesty Category
  { 
    id: '1', 
    title: 'The Boy Who Cried Wolf', 
    titleTamil: 'ஓநாய் வருகிறது என்று பொய் சொன்ன சிறுவன்',
    category: 'Honesty',
    excerpt: 'A shepherd boy learns why telling lies is harmful.',
    excerptTamil: 'பொய் சொல்வது ஏன் தீங்கு என்பதை ஒரு இடையன் சிறுவன் கற்றுக்கொள்கிறான்.',
    content: "Once upon a time, there was a shepherd boy who watched his flock of sheep near a village. He would often get bored while watching the sheep. One day, he thought of a plan to get some excitement. He cried out loudly, 'Wolf! Wolf! A wolf is chasing the sheep!' The villagers heard his cries and rushed to help him. But when they arrived, they found no wolf, only the boy laughing at them. The boy played this trick several times, and each time the villagers came running to help him. One day, a real wolf actually came. The boy cried out, 'Wolf! Wolf!' But the villagers thought he was playing the same trick again and didn't come to help. The wolf attacked the flock and ate many sheep. The boy learned a valuable lesson that day about the importance of telling the truth.",
    contentTamil: "ஒரு காலத்தில், ஒரு கிராமத்திற்கு அருகில் தனது ஆடுகளை மேய்த்துக் கொண்டிருந்த ஒரு இடையன் சிறுவன் இருந்தான். ஆடுகளைப் பார்த்துக்கொண்டிருக்கும்போது அவனுக்கு அடிக்கடி சலிப்பு ஏற்படும். ஒரு நாள், சற்று உற்சாகம் பெற ஒரு திட்டம் நினைத்தான். அவன் உரக்க கத்தினான், 'ஓநாய்! ஓநாய்! ஓநாய் ஆடுகளைத் துரத்துகிறது!' கிராமத்தினர் அவனது அலறலைக் கேட்டு அவனுக்கு உதவ ஓடி வந்தனர். ஆனால் அவர்கள் வந்தபோது, ஓநாய் எதுவும் இல்லை, அவர்களைப் பார்த்து சிரித்துக்கொண்டிருந்த சிறுவனை மட்டுமே கண்டனர். சிறுவன் இந்த விளையாட்டை பல முறை விளையாடினான், ஒவ்வொரு முறையும் கிராமத்தினர் அவனுக்கு உதவ ஓடி வந்தனர். ஒரு நாள், உண்மையிலேயே ஒரு ஓநாய் வந்தது. சிறுவன், 'ஓநாய்! ஓநாய்!' என்று கத்தினான். ஆனால் கிராமத்தினர் அவன் மீண்டும் அதே விளையாட்டை விளையாடுகிறான் என்று நினைத்து உதவ வரவில்லை. ஓநாய் மந்தையைத் தாக்கி பல ஆடுகளை தின்றது. உண்மையைச் சொல்வதன் முக்கியத்துவத்தைப் பற்றி அன்று சிறுவன் ஒரு மதிப்புமிக்க பாடத்தைக் கற்றுக்கொண்டான்.",
    imageUrl: '/stories/wolf_scene4.jpg',
    imageHint: 'sad shepherd boy learned lesson',
    moral: "Honesty is the best policy. Nobody believes a liar, even when they tell the truth.",
    moralTamil: "நேர்மையே சிறந்த கொள்கை. பொய்யர் உண்மையைச் சொன்னாலும் யாரும் நம்ப மாட்டார்கள்."
  },
  
  // Kindness Category
  { 
    id: '2', 
    title: 'The Lion and the Mouse', 
    titleTamil: 'சிங்கமும் எலியும்',
    category: 'Kindness',
    excerpt: 'A tiny mouse helps a mighty lion, proving that kindness comes back in unexpected ways.',
    excerptTamil: 'ஒரு சிறிய எலி வலிமையான சிங்கத்திற்கு உதவி, கருணை எதிர்பாராத வழிகளில் திரும்பி வரும் என்பதை நிரூபிக்கிறது.',
    content: "A mighty lion sleeps peacefully under a tree in a dense jungle. A tiny mouse accidentally scurries over the lion's paw, waking him up. The lion looks angry and roars, catching the mouse with his paw. The lion holds the trembling mouse under his large paw. The mouse pleads for its life with innocent, wide eyes. The lion looks surprised and slightly amused, surrounded by thick jungle vines and greenery. After consideration, the lion decides to spare the mouse, who promises to help the lion someday. Later, the lion is tied to a tall tree with thick ropes by hunters in a dense forest. The lion struggles and roars in pain while the hunters walk away in the background to get their wagon. Hearing the lion's distress, the small mouse comes and chews through the thick ropes tied around the lion using its sharp teeth. The lion watches with a mix of surprise and gratitude as the mouse frees him. Finally free, the lion and the mouse stand side by side with warm expressions, symbolizing their friendship. The forest in the background glows with golden light as the lion bows his head slightly in gratitude while the mouse stands proudly.",
    contentTamil: "அடர்ந்த காட்டில், ஒரு வலிமையான சிங்கம் ஒரு மரத்தின் கீழ் அமைதியாக தூங்கிக்கொண்டிருக்கிறது. ஒரு சிறிய எலி தற்செயலாக சிங்கத்தின் பாதத்தின் மேல் ஓடுகிறது, அதனால் சிங்கம் விழித்துக்கொள்கிறது. சிங்கம் கோபமாகப் பார்த்து கர்ஜிக்கிறது, எலியை தன் பாதத்தால் பிடிக்கிறது. சிங்கம் நடுங்கும் எலியை தனது பெரிய பாதத்தின் கீழ் பிடித்துக்கொள்கிறது. எலி அப்பாவித்தனமான, அகன்ற கண்களுடன் தனது உயிருக்காக கெஞ்சுகிறது. அடர்ந்த காட்டு கொடிகள் மற்றும் பசுமையால் சூழப்பட்டிருக்கும் சிங்கம் ஆச்சரியமும் சற்று வேடிக்கையும் காணப்படுகிறது. சிந்தித்த பின், சிங்கம் எலியை விட்டுவிட முடிவு செய்கிறது, எலி ஒரு நாள் சிங்கத்திற்கு உதவுவதாக வாக்குறுதி அளிக்கிறது. பின்னர், அடர்ந்த காட்டில் சிங்கம் வேட்டைக்காரர்களால் உயரமான மரத்தில் தடிமனான கயிறுகளால் கட்டப்பட்டுள்ளது. வேட்டைக்காரர்கள் தங்கள் வண்டியைப் பெற பின்னணியில் நடந்து செல்லும்போது சிங்கம் போராடி வலியில் கர்ஜிக்கிறது. சிங்கத்தின் துயரத்தைக் கேட்டு, சிறிய எலி வந்து தனது கூர்மையான பற்களைப் பயன்படுத்தி சிங்கத்தைச் சுற்றி கட்டப்பட்டிருக்கும் தடிமனான கயிறுகளைக் கடித்து அறுக்கிறது. சிங்கம் ஆச்சரியமும் நன்றியும் கலந்த பார்வையுடன் பார்க்கிறது. இறுதியில் விடுதலையடைந்த சிங்கமும் எலியும் அன்பான வெளிப்பாடுகளுடன் பக்கத்திற்குப் பக்கம் நிற்கின்றன, அவர்களின் நட்பை குறிக்கின்றன. பின்னணியில் உள்ள காடு பொன் ஒளியில் மின்னும்போது சிங்கம் தனது தலையை சற்று நன்றியுடன் குனிந்து, எலி பெருமையாக நிற்கிறது.",
    imageUrl: '/stories/lion_scene5.jpg',
    imageHint: 'lion and mouse friendship',
    moral: "No act of kindness, no matter how small, is ever wasted. Even the strongest can sometimes need help from the weakest.",
    moralTamil: "எவ்வளவு சிறியதாக இருந்தாலும், கருணையின் செயல் எப்போதும் வீணாகாது. மிகவும் வலிமையானவர்களுக்கும் கூட சில நேரங்களில் பலவீனமானவர்களிடமிருந்து உதவி தேவைப்படலாம்."
  },
  
  // Wisdom Category
  { 
    id: '3', 
    title: 'The Wise Old Turtle', 
    titleTamil: 'ஞானமுள்ள முதிய ஆமை',
    category: 'Wisdom',
    excerpt: 'A drought-stricken village learns about patience and wisdom from an old turtle, leading them to find water through perseverance.',
    excerptTamil: 'வறட்சியால் பாதிக்கப்பட்ட ஒரு கிராமம் ஒரு வயதான ஆமையிடமிருந்து பொறுமை மற்றும் ஞானம் பற்றிய பாடத்தைக் கற்று, விடாமுயற்சியின் மூலம் தண்ணீரைக் கண்டுபிடிக்கிறது.',
    content: "Once there was a small village suffering from a terrible drought. The land was dry and cracked, crops had wilted, and the villagers were worried as their wells and pots remained empty. Three young villagers decided to seek help. One ran quickly ahead, eager to find a solution. Another stopped to pick flowers and berries along the way. The third walked calmly, carrying a walking stick. They climbed a hill where they found a wise old turtle sitting peacefully under a tree. The turtle listened to their story and shared his wisdom about patience and perseverance. Inspired by the turtle's words, the villagers returned home and worked together to dig deep wells. Their patience and teamwork paid off when they finally found water. The village celebrated with joy as water sprang from the wells, and children played happily in the fresh water.",
    contentTamil: "ஒரு காலத்தில், கொடிய வறட்சியால் பாதிக்கப்பட்ட ஒரு சிறிய கிராமம் இருந்தது. நிலம் வறண்டு வெடித்திருந்தது, பயிர்கள் வாடியிருந்தன, கிராமத்தினர் தங்கள் கிணறுகளும் பானைகளும் காலியாக இருப்பதால் கவலைப்பட்டனர். மூன்று இளம் கிராமத்தினர் உதவி தேட முடிவு செய்தனர். ஒருவர் விரைவாக முன்னே ஓடினார், தீர்வைக் கண்டுபிடிக்க ஆர்வமாக இருந்தார். மற்றொருவர் வழியில் பூக்களையும் பழங்களையும் எடுக்க நின்றார். மூன்றாமவர் அமைதியாக நடந்து, ஒரு நடைக்கோலை சுமந்து சென்றார். அவர்கள் ஒரு மலையில் ஏறி, அங்கே ஒரு மரத்தின் கீழ் அமைதியாக அமர்ந்திருக்கும் ஞானமுள்ள முதிய ஆமையைக் கண்டனர். ஆமை அவர்களின் கதையைக் கேட்டு, பொறுமை மற்றும் விடாமுயற்சி பற்றிய தன் ஞானத்தைப் பகிர்ந்தது. ஆமையின் வார்த்தைகளால் ஈர்க்கப்பட்ட கிராமத்தினர் வீடு திரும்பி, ஒன்றாக சேர்ந்து ஆழமான கிணறுகளை தோண்டினர். அவர்களின் பொறுமையும் குழு முயற்சியும் பலன் தந்தது, இறுதியில் தண்ணீரைக் கண்டுபிடித்தனர். கிணறுகளிலிருந்து தண்ணீர் பீறிட்டெழுந்ததால் கிராமம் மகிழ்ச்சியுடன் கொண்டாடியது, குழந்தைகள் புதிய தண்ணீரில் மகிழ்ச்சியாக விளையாடினர்.",
    imageUrl: '/stories/turtle_scene5.jpg',
    imageHint: 'village celebrating with water',
    moral: "Patience and perseverance lead to wisdom and success. Working together and staying calm in difficult times helps us find solutions.",
    moralTamil: "பொறுமையும் விடாமுயற்சியும் ஞானத்திற்கும் வெற்றிக்கும் வழிவகுக்கும். கடினமான நேரங்களில் ஒன்றாக வேலை செய்து அமைதியாக இருப்பது தீர்வுகளைக் கண்டுபிடிக்க உதவுகிறது."
  },
  
  // Friendship Category
  { 
    id: '4', 
    title: 'The Two Friends and the Bear', 
    titleTamil: 'இரண்டு நண்பர்களும் கரடியும்',
    category: 'Friendship',
    excerpt: 'A story about true friendship and loyalty during times of danger.',
    excerptTamil: 'ஆபத்து நேரத்தில் உண்மையான நட்பு மற்றும் விசுவாசம் பற்றிய கதை.',
    content: "Two Indian boys, one in a red t-shirt and one in blue, were walking together through a peaceful forest, chatting and smiling. Suddenly, a big brown bear appeared on the path! One boy quickly climbed a tree in fear, leaving his friend behind. The other boy, thinking fast, lay very still on the ground as the bear came close and sniffed him. The bear gently whispered something in his ear and then walked away into the forest. When it was safe, the boy in the tree came down. The friend who had lain still explained that the bear told him: 'True friends never leave each other in times of trouble.' From that day, both boys understood the real meaning of friendship.",
    contentTamil: "ஒரு நாள், இரண்டு இந்திய சிறுவர்கள், ஒருவர் சிவப்பு சட்டையும் மற்றவர் நீல சட்டையும் அணிந்து, ஒரு அமைதியான காட்டில் மகிழ்ச்சியாக நடந்து பேசிக்கொண்டிருந்தனர். திடீரென்று, ஒரு பெரிய பழுப்பு கரடி பாதையில் தோன்றியது! ஒருவன் பயத்தில் விரைவாக ஒரு மரத்தில் ஏறினான், மற்றவன் தனியாக விட்டுவிட்டான். மற்ற சிறுவன் உடனே தரையில் அமைதியாக படுத்துக்கொண்டான், கரடி அவனை நுகர்ந்து பார்த்தது. கரடி மெதுவாக அவனது காதில் ஏதோ சொன்னது போல நெருங்கி, பின்னர் காட்டில் நடந்து சென்றது. பாதுகாப்பாக இருந்தபின், மரத்தில் இருந்த சிறுவன் கீழே இறங்கினான். தரையில் படுத்திருந்த சிறுவன் சொன்னான்: 'உண்மையான நண்பர்கள் ஆபத்து நேரத்தில் ஒருவரை ஒருவர் விட்டுவிட மாட்டார்கள்' என்று கரடி கூறியது. அந்த நாளிலிருந்து, இருவரும் நட்பின் உண்மையான அர்த்தத்தை புரிந்துகொண்டனர்.",
    imageUrl: '/stories/bearfriends_scene5.jpg',
    imageHint: 'boys learning about friendship in forest',
    moral: "True friends stand by each other in times of need. Fair-weather friends disappear when difficulties arise.",
    moralTamil: "உண்மையான நண்பர்கள் தேவைப்படும் நேரத்தில் ஒருவருக்கொருவர் ஆதரவாக இருப்பார்கள். வெயில் நேர நண்பர்கள் கஷ்டம் வரும்போது மறைந்து விடுவார்கள்.",
    scenes: [
      {
        content: "Two Indian boys, one in a red t-shirt and one in blue, walking together through a peaceful forest, chatting and smiling, birds flying above.",
        contentTamil: "ஒரு நாள், இரண்டு இந்திய சிறுவர்கள், ஒருவர் சிவப்பு சட்டையும் மற்றவர் நீல சட்டையும் அணிந்து, ஒரு அமைதியான காட்டில் மகிழ்ச்சியாக நடந்து பேசிக்கொண்டிருந்தனர்.",
        imageUrl: "/stories/bearfriends_scene1.jpg",
        caption: "Two boys walking and chatting in a peaceful forest, birds flying above.",
        captionTamil: "அமைதியான காட்டில் நடந்து பேசும் இரண்டு சிறுவர்கள், மேலே பறவைகள் பறக்கின்றன."
      },
      {
        content: "Suddenly, a big brown bear appeared on the forest path! One of the boys quickly climbed a tree in fear, leaving his friend behind.",
        contentTamil: "திடீரென்று, ஒரு பெரிய பழுப்பு கரடி பாதையில் தோன்றியது. ஒருவன் பயத்தில் விரைவாக ஒரு மரத்தில் ஏறினான், மற்றவன் தனியாக விட்டுவிட்டான்.",
        imageUrl: "/stories/bearfriends_scene2.jpg",
        caption: "A bear appears, one boy climbs a tree in fear, the other is scared on the ground.",
        captionTamil: "ஒரு கரடி தோன்ற, ஒருவன் மரத்தில் ஏறுகிறான், மற்றவன் தரையில் பயந்து நிற்கிறான்."
      },
      {
        content: "The other boy, thinking fast, lay very still on the ground as the bear came close and sniffed him. The bear gently whispered something in his ear and then walked away into the forest.",
        contentTamil: "மற்ற சிறுவன் உடனே தரையில் அமைதியாக படுத்துக்கொண்டான், கரடி அவனை நுகர்ந்து பார்த்தது. கரடி மெதுவாக அவனது காதில் ஏதோ சொன்னது போல நெருங்கி, பின்னர் காட்டில் நடந்து சென்றது.",
        imageUrl: "/stories/bearfriends_scene3.jpg",
        caption: "A boy lies still as the bear sniffs him, the other boy watches from the tree.",
        captionTamil: "ஒரு சிறுவன் அமைதியாக படுத்திருக்க, கரடி அவனை நுகர்கிறது, மற்றவன் மரத்தில் இருந்து பார்க்கிறான்."
      },
      {
        content: "When it was safe, the boy in the tree came down. The friend who had lain still explained that the bear told him: 'True friends never leave each other in times of trouble.'",
        contentTamil: "பாதுகாப்பாக இருந்தபின், மரத்தில் இருந்த சிறுவன் கீழே இறங்கினான். தரையில் படுத்திருந்த சிறுவன் சொன்னான்: 'உண்மையான நண்பர்கள் ஆபத்து நேரத்தில் ஒருவரை ஒருவர் விட்டுவிட மாட்டார்கள்' என்று கரடி கூறியது. அந்த நாளிலிருந்து, இருவரும் நட்பின் உண்மையான அர்த்தத்தை புரிந்துகொண்டனர்.",
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
    ]
  },
  
  // Perseverance Category
  { 
    id: '5', 
    title: 'The Persistent Spider', 
    titleTamil: 'விடாமுயற்சியுடைய சிலந்தி',
    category: 'Perseverance',
    excerpt: 'A spider teaches a king about never giving up, despite repeated failures.',
    excerptTamil: 'தொடர்ந்து தோல்விகள் இருந்தபோதிலும், ஒருபோதும் விட்டுக்கொடுக்காதது பற்றி ஒரு சிலந்தி ஒரு அரசருக்குக் கற்பிக்கிறது.',
    content: "King Anand was feeling discouraged after losing an important battle. While resting in a cave, he noticed a tiny spider trying to build its web. Each time the spider would climb up, it would fall, but it kept trying again and again. The king counted - the spider fell seven times but on the eighth attempt, it successfully reached its destination and began weaving its web. Watching this persistent little creature, the king felt inspired. He thought, 'If this tiny spider doesn't give up despite failing seven times, why should I?' He returned to his kingdom with renewed determination, gathered his forces, and strategized more carefully. In the next battle, he emerged victorious, always remembering the lesson of the persistent spider that taught him to never give up.",
    contentTamil: "அனந்த் ராஜா ஒரு முக்கியமான போரில் தோற்றபின் மனச்சோர்வடைந்தார். ஒரு குகையில் ஓய்வெடுக்கும்போது, தனது வலையை உருவாக்க முயற்சிக்கும் ஒரு சிறிய சிலந்தியைக் கவனித்தார். சிலந்தி ஒவ்வொரு முறை மேலே ஏறும்போதும், அது கீழே விழும், ஆனால் அது மீண்டும் மீண்டும் முயற்சித்துக் கொண்டே இருந்தது. ராஜா எண்ணினார் - சிலந்தி ஏழு முறை விழுந்தது, ஆனால் எட்டாவது முயற்சியில், அது வெற்றிகரமாக தனது இலக்கை அடைந்து, வலையை நெய்யத் தொடங்கியது. இந்த விடாமுயற்சியுடைய சிறிய உயிரினத்தைப் பார்த்து, ராஜா ஊக்கமடைந்தார். அவர் நினைத்தார், 'இந்த சிறிய சிலந்தி ஏழு முறை தோல்வியடைந்தும் கூட விட்டுக்கொடுக்கவில்லை என்றால், நான் ஏன் விட்டுக்கொடுக்க வேண்டும்?' அவர் புதுப்பித்த உறுதியுடன் தனது அரசாட்சிக்குத் திரும்பி, தனது படைகளைத் திரட்டி, மிகக் கவனமாக திட்டமிட்டார். அடுத்த போரில், அவர் வெற்றி பெற்றார், ஒருபோதும் விட்டுக்கொடுக்கக்கூடாது என்று கற்பித்த விடாமுயற்சியுடைய சிலந்தியின் பாடத்தை எப்போதும் நினைவில் கொண்டார்.",
    imageUrl: "/stories/persistentspider_scene5.jpg",
    imageHint: 'spider weaving web',
    moral: "Success comes to those who keep trying. Failure is not falling down but refusing to get up.",
    moralTamil: "தொடர்ந்து முயற்சிப்பவர்களுக்கே வெற்றி வரும். தோல்வி என்பது விழுவது அல்ல, எழ மறுப்பது."
  },
  
  // Sharing Category
 
  // Placeholder for new story
  {
    id: '6',
    title: 'New Story Coming Soon!',
    titleTamil: 'புதிய கதை விரைவில் வருகிறது!',
    category: 'Coming Soon',
    excerpt: 'We are working on a new exciting story for you. Stay tuned!',
    excerptTamil: 'உங்களுக்காக ஒரு புதிய உற்சாகமான கதையை உருவாக்கி வருகிறோம். காத்திருங்கள்!',
    content: 'Coming soon...',
    contentTamil: 'விரைவில் வருகிறது...',
    imageUrl: '/stories/comingsoon.png',
    imageHint: 'coming soon',
    moral: '',
    moralTamil: ''
  }
];

export type SafetyScenario = {
  id: string;
  title: string;
  scenario: string;
  isGoodTouch: boolean; // Simplified for now
  explanation: string;
  imageHint: string;
  imageUrl: string; // Local image path
};

export const safetyScenarios: SafetyScenario[] = [
  { 
    id: '1', 
    title: 'A Hug from Mom', 
    scenario: 'Mommy gives you a warm hug when you wake up.', 
    isGoodTouch: true, 
    explanation: 'Hugs from family members who love you are usually good touches. They make you feel safe and loved.',
    imageHint: 'mother child hug',
    imageUrl: '/images/safety/safe_hug.jpg'
  },
  { 
    id: '2', 
    title: 'Stranger Offers Candy', 
    scenario: 'Someone you don\'t know offers you candy at the park and asks you to go with them.', 
    isGoodTouch: false, 
    explanation: 'It\'s not safe to take things from strangers or go anywhere with them. Always tell a trusted adult if this happens. This is a tricky situation and a "No, Go, Tell" moment.',
    imageHint: 'stranger child park',
    imageUrl: '/images/safety/unsafe_stranger.jpg'
  },
  { 
    id: '3', 
    title: 'Doctor\'s Check-up', 
    scenario: 'A doctor needs to check your tummy when you are sick, and your parent is with you.', 
    isGoodTouch: true, // Context dependent, but generally okay for medical reasons with parent present
    explanation: 'Sometimes doctors or nurses need to touch you to help you stay healthy. It\'s okay if your parent or a trusted adult is there and explains it to you.',
    imageHint: 'doctor child patient',
    imageUrl: '/images/safety/safe_doctor.jpg'
  },
  {
    id: '4',
    title: 'High Five with Friend',
    scenario: 'Your friend gives you a high five after you score a goal in a game.',
    isGoodTouch: true,
    explanation: 'High fives, handshakes, and gentle pats on the back from friends are good touches that show friendship and celebration.',
    imageHint: 'children high five',
    imageUrl: '/images/safety/safe_highfive.jpg'
  }
];

export type VideoLesson = {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  description: string;
};

export const videoLessons: VideoLesson[] = [
  {
    id: 'professions',
    title: 'Profession Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1BzvvYvw9JbH6uGtsGZgCqKYIj4cpArQu/preview',
    thumbnailUrl: '/video-lessons/Profession Names for kids.png',
    category: 'Careers',
    description: 'Discover different professions and what they do!'
  },
  {
    id: 'numbers',
    title: 'Numbers for Kids',
    videoUrl: 'https://drive.google.com/file/d/1k_c7KtAx0D1570SLfuBHhJ2oq9mNNP82/preview',
    thumbnailUrl: '/video-lessons/Numbers for kids.png',
    category: 'Math',
    description: 'Count and learn numbers in a fun way!'
  },
  {
    id: 'fruits',
    title: 'Fruits Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1WId_Oq5-XfiRcs-7hbl4XPv3TYP44bRR/preview',
    thumbnailUrl: '/video-lessons/fruits names for kids.png',
    category: 'Food',
    description: 'Learn about different fruits and their names!'
  },
  {
    id: 'colors',
    title: 'Colours For Kids',
    videoUrl: 'https://drive.google.com/file/d/1jLJIYul5CTvZK8aT8wBNuUOFCz-subT9/preview',
    thumbnailUrl: '/video-lessons/colours for kids.png',
    category: 'Colors',
    description: 'Explore the wonderful world of colors!'
  },
  {
    id: 'animals',
    title: 'Animal Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1GKfhSnT_vWMapzefZx46sHQgwtpcyloS/preview',
    thumbnailUrl: '/video-lessons/animal names for kids.png',
    category: 'Animals',
    description: 'Discover different animals and their names!'
  },
  {
    id: 'alphabets',
    title: 'Alphabets for Kids',
    videoUrl: 'https://drive.google.com/file/d/1PbSh_h1fJB-PUYRad0RBJNgXVZrsc3oH/preview',
    thumbnailUrl: '/video-lessons/alphabets for kids.png',
    category: 'Language',
    description: 'Learn the alphabet with fun animations and sounds!'
  },
  {
    id: 'body-parts',
    title: 'Body Parts Names For Kids',
    videoUrl: 'https://drive.google.com/file/d/1TNGONqC5Tbv0S7iXQtINWIwLHt8hV4BT/view?usp=sharing',
    thumbnailUrl: '/video-lessons/body parts names for kids.png',
    category: 'Body',
    description: 'Learn about different parts of the body!'
  },
  {
    id: 'relationships',
    title: 'Relationships Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1Nj2x6APd_DFKQSmua-ptE4o-z0EOLSvV/preview',
    thumbnailUrl: '/video-lessons/relationships.png',
    category: 'Family',
    description: 'Learn about family relationships and names!'
  },
  {
    id: 'shapes',
    title: 'Shapes for Kids',
    videoUrl: 'https://drive.google.com/file/d/1QMYVE0-oQBZgVC8cvRrU1yg3atj3WobW/preview',
    thumbnailUrl: '/video-lessons/shapes for kids.png',
    category: 'Math',
    description: 'Explore different shapes and their properties!'
  },
  {
    id: 'sports',
    title: 'Sports Names For Kids',
    videoUrl: 'https://drive.google.com/file/d/1rcafYWFhELOZXyTVP5OJU07Cn5RKW_G4/preview',
    thumbnailUrl: '/video-lessons/sports names for kids.png',
    category: 'Sports',
    description: 'Learn about different sports and activities!'
  },
  {
    id: 'stationary',
    title: 'Stationary Items for Kids',
    videoUrl: 'https://drive.google.com/file/d/1bd3IrFj0-2UarfFHZD90gIKoWg-z2AFi/preview',
    thumbnailUrl: '/video-lessons/stationary itemes for kids.png',
    category: 'School',
    description: 'Discover different school supplies and their uses!'
  },
  {
    id: 'things',
    title: 'Things Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1GQPXaqBOhx3cF6FxQlPXVJ6mR6e4b8eu/preview',
    thumbnailUrl: '/video-lessons/objects names.png',
    category: 'Objects',
    description: 'Learn about everyday objects and their names!'
  },
  {
    id: 'vegetables',
    title: 'Vegetables Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1giTyahbq7leWFbQF5vxPS92lqwIGKObN/preview',
    thumbnailUrl: '/video-lessons/vegitable names.png',
    category: 'Food',
    description: 'Explore different vegetables and their names!'
  },
  {
    id: 'vehicles',
    title: 'Vehicles Names',
    videoUrl: 'https://drive.google.com/file/d/10GnaOS3iYoviEoYncCyog1C1ExDhTbsn/preview',
    thumbnailUrl: '/video-lessons/vehicles names.png',
    category: 'Transportation',
    description: 'Learn about different vehicles and their uses!'
  }
];
