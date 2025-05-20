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
    imageUrl: '/stories/wolf_scene1.jpg',
    imageHint: 'shepherd boy crying wolf',
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
    imageUrl: '/stories/lion_scene1.jpg',
    imageHint: 'lion and mouse friends',
    moral: "No act of kindness, no matter how small, is ever wasted. Even the strongest can sometimes need help from the weakest.",
    moralTamil: "எவ்வளவு சிறியதாக இருந்தாலும், கருணையின் செயல் எப்போதும் வீணாகாது. மிகவும் வலிமையானவர்களுக்கும் கூட சில நேரங்களில் பலவீனமானவர்களிடமிருந்து உதவி தேவைப்படலாம்."
  },
  
  // Wisdom Category
  { 
    id: '3', 
    title: 'The Wise Old Turtle', 
    titleTamil: 'ஞானமுள்ள முதிய ஆமை',
    category: 'Wisdom',
    excerpt: 'A village learns an important lesson about patience and wisdom from an old turtle.',
    excerptTamil: 'ஒரு கிராமம் ஒரு வயதான ஆமையிடமிருந்து பொறுமை மற்றும் ஞானம் பற்றிய முக்கியமான பாடத்தைக் கற்றுக்கொள்கிறது.',
    content: "There was once a village suffering from a long drought. The crops were failing, and the villagers were worried. They decided to seek advice from the Wise Old Turtle who lived on a distant hill. Three young villagers volunteered for the journey. The first one was impatient and ran all the way, but got exhausted and returned without reaching the turtle. The second was distracted by berries and flowers along the path and also failed to reach the destination. The third walked steadily, observing the path, resting when needed, and eventually reached the turtle's home. The Wise Old Turtle told him, 'The solution to your drought is beneath your village. Dig deep wells, and you will find water.' When the young man returned with this advice, the villagers worked together to dig wells and indeed found water. They learned that wisdom comes to those who approach challenges with patience and steady determination.",
    contentTamil: "ஒரு முறை, நீண்ட வறட்சியால் ஒரு கிராமம் அவதிப்பட்டது. பயிர்கள் தோல்வியடைந்தன, கிராமத்தினர் கவலைப்பட்டனர். தொலைதூர மலையில் வசித்த ஞானமுள்ள முதிய ஆமையிடம் ஆலோசனை தேட அவர்கள் முடிவு செய்தனர். மூன்று இளம் கிராமவாசிகள் பயணத்திற்கு தன்னார்வலர்களாக முன்வந்தனர். முதலாமவர் பொறுமையற்றவராக இருந்தார், முழு வழியும் ஓடினார், ஆனால் களைப்படைந்து ஆமையை அடையாமலேயே திரும்பினார். இரண்டாவது நபர் பாதையில் உள்ள பழங்கள் மற்றும் பூக்களால் கவனம் சிதறி, இலக்கை அடைய தவறினார். மூன்றாமவர் நிதானமாக நடந்து, பாதையை கவனித்து, தேவைப்படும்போது ஓய்வெடுத்து, இறுதியில் ஆமையின் வீட்டை அடைந்தார். ஞானமுள்ள முதிய ஆமை அவரிடம், 'உங்கள் வறட்சிக்கான தீர்வு உங்கள் கிராமத்தின் கீழே உள்ளது. ஆழமான கிணறுகளை தோண்டுங்கள், நீங்கள் தண்ணீரைக் காண்பீர்கள்' என்றது. இந்த ஆலோசனையுடன் இளைஞர் திரும்பி வந்தபோது, கிராமத்தினர் ஒன்றிணைந்து கிணறுகளைத் தோண்டி உண்மையிலேயே தண்ணீரைக் கண்டனர். அவர்கள் ஞானம் என்பது சவால்களை பொறுமையுடனும் நிலையான உறுதியுடனும் அணுகுபவர்களுக்கு வரும் என்பதைக் கற்றுக்கொண்டனர்.",
    imageUrl: 'https://picsum.photos/seed/wiseturtle/300/200',
    imageHint: 'wise old turtle',
    moral: "Patience and perseverance lead to wisdom and success. Rushing or getting distracted can prevent us from finding solutions.",
    moralTamil: "பொறுமையும் விடாமுயற்சியும் ஞானத்திற்கும் வெற்றிக்கும் வழிவகுக்கும். அவசரப்படுவது அல்லது கவனம் சிதறுவது தீர்வுகளைக் கண்டுபிடிப்பதைத் தடுக்கலாம்."
  },
  
  // Friendship Category
  { 
    id: '4', 
    title: 'The Two Friends and the Bear', 
    titleTamil: 'இரண்டு நண்பர்களும் கரடியும்',
    category: 'Friendship',
    excerpt: 'A story about true friendship and loyalty during times of danger.',
    excerptTamil: 'ஆபத்து நேரத்தில் உண்மையான நட்பு மற்றும் விசுவாசம் பற்றிய கதை.',
    content: "Two friends, Ravi and Kumar, were walking through a forest when they suddenly saw a huge bear approaching them. Terrified, Kumar quickly climbed a nearby tree, completely forgetting about his friend. Ravi knew he couldn't outrun the bear, so he lay down on the ground, held his breath, and played dead. The bear came near him, sniffed around his face, and whispered something in his ear before walking away. When the bear was gone, Kumar climbed down and asked, 'What did the bear whisper in your ear?' Ravi replied, 'The bear told me to be careful of friends who abandon you in times of danger.' From that day, Ravi was more careful about who he considered a true friend. He understood that real friendship is tested in times of adversity.",
    contentTamil: "ரவி மற்றும் குமார் என்ற இரண்டு நண்பர்கள் ஒரு காட்டில் நடந்து கொண்டிருந்தபோது, திடீரென்று ஒரு பெரிய கரடி தங்களை நோக்கி வருவதைப் பார்த்தனர். பயந்துபோன குமார், தனது நண்பரை முற்றிலும் மறந்து, விரைவாக அருகிலுள்ள மரத்தில் ஏறினார். ரவிக்கு தான் கரடியை விட வேகமாக ஓட முடியாது என்பது தெரியும், எனவே அவர் தரையில் படுத்து, மூச்சை நிறுத்தி, இறந்தவர் போல் நடித்தார். கரடி அவருக்கு அருகில் வந்து, அவரது முகத்தைச் சுற்றி மோந்து பார்த்து, விலகிச் செல்வதற்கு முன்பு அவரது காதில் ஏதோ கிசுகிசுத்தது. கரடி சென்றபிறகு, குமார் கீழே இறங்கி, 'கரடி உன் காதில் என்ன கிசுகிசுத்தது?' என்று கேட்டார். ரவி பதிலளித்தார், 'ஆபத்து நேரத்தில் உன்னைக் கைவிடும் நண்பர்களைப் பற்றி எச்சரிக்கையாக இருக்குமாறு கரடி என்னிடம் கூறியது.' அன்று முதல், ரவி தன்னை உண்மையான நண்பராகக் கருதியவர்களைப் பற்றி மிகவும் எச்சரிக்கையாக இருந்தார். அவர் புரிந்துகொண்டார், உண்மையான நட்பு என்பது கடினமான நேரங்களில் சோதிக்கப்படுகிறது.",
    imageUrl: 'https://picsum.photos/seed/bearfriends/300/200',
    imageHint: 'bear and man in forest',
    moral: "True friends stand by each other in times of need. Fair-weather friends disappear when difficulties arise.",
    moralTamil: "உண்மையான நண்பர்கள் தேவைப்படும் நேரத்தில் ஒருவருக்கொருவர் ஆதரவாக இருப்பார்கள். வெயில் நேர நண்பர்கள் கஷ்டம் வரும்போது மறைந்து விடுவார்கள்."
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
    imageUrl: 'https://picsum.photos/seed/persistentspider/300/200',
    imageHint: 'spider weaving web',
    moral: "Success comes to those who keep trying. Failure is not falling down but refusing to get up.",
    moralTamil: "தொடர்ந்து முயற்சிப்பவர்களுக்கே வெற்றி வரும். தோல்வி என்பது விழுவது அல்ல, எழ மறுப்பது."
  },
  
  // Sharing Category
  { 
    id: '6', 
    title: 'The Rainbow Fish', 
    titleTamil: 'வானவில் மீன்',
    category: 'Sharing',
    excerpt: 'A beautiful fish learns that sharing brings more happiness than possessions.',
    excerptTamil: 'அழகான மீன் ஒன்று பகிர்தல் உடைமைகளை விட அதிக மகிழ்ச்சியைக் கொண்டுவரும் என்பதைக் கற்றுக்கொள்கிறது.',
    content: "In the deep blue ocean lived a fish whose scales were every shade of blue, green, and purple with sparkling silver scales scattered among them. The other fish called him Rainbow Fish and admired his beautiful scales. But Rainbow Fish was proud and would not play with the other fish. One day, a small blue fish asked if he could have one of his sparkling scales. 'Give you one of my special scales? Never!' said Rainbow Fish and swam away. Soon, all the other fish avoided him. Feeling lonely, Rainbow Fish sought advice from the wise octopus. 'The only way to be happy is to share your beauty with others,' the octopus advised. At first, Rainbow Fish hesitated, but then he gave away one shining scale to the small blue fish, who was delighted. Soon, other fish came asking for scales, and Rainbow Fish shared them until he had only one sparkling scale left. As he shared, he found that the joy of friendship and seeing others happy made him feel much better than having all his scales to himself.",
    contentTamil: "ஆழமான நீல கடலில் ஒரு மீன் வாழ்ந்தது, அதன் செதில்கள் நீலம், பச்சை மற்றும் ஊதா நிறத்தின் ஒவ்வொரு நிழலாகவும், அவற்றுக்கிடையே பளபளக்கும் வெள்ளி செதில்கள் சிதறியிருந்தன. மற்ற மீன்கள் அதை வானவில் மீன் என்று அழைத்து, அதன் அழகிய செதில்களை வியந்தன. ஆனால் வானவில் மீன் கர்வமாக இருந்தது மற்றும் மற்ற மீன்களுடன் விளையாட மாட்டேன் என்றது. ஒரு நாள், ஒரு சிறிய நீல மீன் அதன் பளபளக்கும் செதில்களில் ஒன்றை தனக்குத் தர முடியுமா என்று கேட்டது. 'எனது சிறப்பு செதில்களில் ஒன்றை உனக்குத் தர வேண்டுமா? ஒருபோதும் இல்லை!' என்று வானவில் மீன் கூறி நீந்திச் சென்றது. விரைவில், மற்ற மீன்கள் அனைத்தும் அதைத் தவிர்த்தன. தனிமையாக உணர்ந்த வானவில் மீன் ஞானமான ஆக்டோபஸிடம் ஆலோசனை தேடியது. 'மகிழ்ச்சியாக இருப்பதற்கான ஒரே வழி உங்கள் அழகை மற்றவர்களுடன் பகிர்ந்து கொள்வதுதான்,' என்று ஆக்டோபஸ் அறிவுறுத்தியது. முதலில், வானவில் மீன் தயங்கியது, ஆனால் பின்னர் அது தனது ஒளிரும் செதில்களில் ஒன்றை சிறிய நீல மீனுக்கு கொடுத்தது, அது மகிழ்ச்சியாக இருந்தது. விரைவில், மற்ற மீன்கள் செதில்களைக் கேட்டு வந்தன, மற்றும் வானவில் மீன் அவற்றை பகிர்ந்து கொண்டது, இறுதியில் அதனிடம் ஒரு பளபளக்கும் செதில் மட்டுமே இருந்தது. அது பகிர்ந்து கொண்டபோது, நட்பின் மகிழ்ச்சி மற்றும் மற்றவர்கள் மகிழ்ச்சியாக இருப்பதைக் காண்பது அதன் அனைத்து செதில்களையும் தனக்காக வைத்திருப்பதை விட அதிக மகிழ்ச்சியைத் தருவதை அது கண்டது.",
    imageUrl: 'https://picsum.photos/seed/rainbowfish/300/200',
    imageHint: 'colorful fish sharing scales',
    moral: "Sharing brings more happiness than possessing things for yourself. True joy comes from making others happy.",
    moralTamil: "உங்களுக்காக பொருட்களை வைத்திருப்பதை விட பகிர்வது அதிக மகிழ்ச்சியைத் தருகிறது. உண்மையான மகிழ்ச்சி மற்றவர்களை மகிழ்ச்சியாக்குவதில் இருந்து வருகிறது."
  },
  
  // Gratitude Category
  { 
    id: '7', 
    title: 'The Magic Thank You', 
    titleTamil: 'மாய நன்றி',
    category: 'Gratitude',
    excerpt: 'A young girl discovers the transformative power of expressing gratitude to everyone around her.',
    excerptTamil: 'ஒரு சிறுமி தன்னைச் சுற்றியுள்ள அனைவருக்கும் நன்றி தெரிவிப்பதன் மாற்றும் சக்தியைக் கண்டுபிடிக்கிறாள்.',
    content: "Meera was always grumpy and complained about everything. Her grandmother noticed this and gave her a special gift - a small notebook with a sparkling cover. 'This is a magic gratitude journal,' she explained. 'Every day, write down three things you're thankful for.' Meera was skeptical but decided to try. On the first day, she struggled to find even one thing, but wrote: 'I'm thankful for my favorite blue dress.' The next day, she wrote: 'I'm thankful for the delicious lunch and the rain that cooled the day.' As days passed, Meera began noticing more and more things to be grateful for - the smile of the bus driver, the help from her classmate, the beautiful flowers on her way to school. She also started saying 'thank you' to people more often. Gradually, something magical happened. People smiled at her more, offered help willingly, and seemed happier around her. Meera realized that gratitude wasn't just about writing in a journal - it was changing how she saw the world and how the world responded to her. Her life felt more joyful, and her grandmother smiled knowingly, for the real magic wasn't in the notebook but in Meera's changed heart.",
    contentTamil: "மீரா எப்போதும் சிடுசிடுப்பாக இருப்பாள் மற்றும் எல்லாவற்றையும் குறித்து புகார் செய்வாள். அவளது பாட்டி இதைக் கவனித்து அவளுக்கு ஒரு சிறப்பு பரிசு - பளபளக்கும் அட்டை கொண்ட ஒரு சிறிய நோட்புக்கை கொடுத்தார். 'இது ஒரு மந்திர நன்றி நாட்குறிப்பு,' என்று அவர் விளக்கினார். 'ஒவ்வொரு நாளும், நீ நன்றி சொல்லும் மூன்று விஷயங்களை எழுது.' மீரா சந்தேகமாக இருந்தாள் ஆனால் முயற்சிக்க முடிவு செய்தாள். முதல் நாளில், அவள் ஒரு விஷயத்தைக் கூட கண்டுபிடிக்க போராடினாள், ஆனால் எழுதினாள்: 'எனது விருப்பமான நீல ஆடைக்காக நான் நன்றியுள்ளவனாக இருக்கிறேன்.' அடுத்த நாள், அவள் எழுதினாள்: 'சுவையான மதிய உணவுக்கும், நாளைக் குளிர்வித்த மழைக்கும் நான் நன்றியுள்ளவனாக இருக்கிறேன்.' நாட்கள் சென்றதும், மீரா நன்றி தெரிவிக்க இன்னும் பல விஷயங்களைக் கவனிக்கத் தொடங்கினாள் - பேருந்து ஓட்டுநரின் புன்னகை, அவளது வகுப்பு தோழியின் உதவி, பள்ளிக்குச் செல்லும் வழியில் உள்ள அழகான பூக்கள். அவள் மக்களுக்கு அடிக்கடி 'நன்றி' சொல்லத் தொடங்கினாள். படிப்படியாக, ஏதோ மாயம் நடந்தது. மக்கள் அவளுக்கு அதிகமாக புன்னகைத்தனர், விருப்பத்துடன் உதவியை வழங்கினர், மற்றும் அவளைச் சுற்றி மகிழ்ச்சியாக இருப்பதாகத் தோன்றினர். மீரா உணர்ந்தாள், நன்றி என்பது வெறும் நாட்குறிப்பில் எழுதுவது மட்டுமல்ல - அது அவள் உலகைப் பார்க்கும் விதத்தையும், உலகம் அவளுக்கு பதிலளிக்கும் விதத்தையும் மாற்றிக்கொண்டிருந்தது. அவளது வாழ்க்கை மகிழ்ச்சியாக இருந்தது, மற்றும் அவளது பாட்டி அறிந்து புன்னகைத்தார், ஏனெனில் உண்மையான மாயம் நோட்புக்கில் இல்லை, மாறாக மீராவின் மாறிய இதயத்தில் இருந்தது.",
    imageUrl: 'https://picsum.photos/seed/gratitude/300/200',
    imageHint: 'girl writing in gratitude journal',
    moral: "Expressing gratitude can transform your perspective and relationships. Being thankful for what you have brings more joy into your life.",
    moralTamil: "நன்றி தெரிவிப்பது உங்கள் கண்ணோட்டத்தையும் உறவுகளையும் மாற்றக்கூடும். உங்களிடம் இருப்பதற்கு நன்றியுள்ளவராக இருப்பது உங்கள் வாழ்க்கையில் அதிக மகிழ்ச்சியைக் கொண்டு வரும்."
  },
  
  // Respect Category
  { 
    id: '8', 
    title: 'The Elephant and the Ant Colony', 
    titleTamil: 'யானையும் எறும்பு குடியும்',
    category: 'Respect',
    excerpt: 'An elephant learns to respect all creatures, regardless of their size.',
    excerptTamil: 'ஒரு யானை அனைத்து உயிரினங்களையும், அவற்றின் அளவைப் பொருட்படுத்தாமல் மதிக்கக் கற்றுக்கொள்கிறது.',
    content: "Gaja was a young elephant who was proud of his size and strength. One day, while strolling through the forest, he noticed a busy ant colony. 'Look at these tiny insects, so insignificant and small!' he laughed, deliberately stomping near their anthill. The ants scattered in fear, but their wise queen remained calm. That night, as Gaja slept, the ant queen led her colony to gather around the elephant. When Gaja woke the next morning, he found himself surrounded by thousands of ants, each carrying a tiny leaf. The queen spoke: 'Mighty elephant, you may crush one of us easily, but together we are strong. Just as you care for your herd, we care for ours. Size doesn't determine worth.' Impressed by their unity and courage, Gaja apologized. In the following days, when hunters came to the forest, it was the ant colony that warned Gaja, allowing him to escape. From that day forward, Gaja treated all creatures with respect, understanding that every being, no matter how small, plays an important role in the world.",
    contentTamil: "கஜா என்னும் இளம் யானை தனது அளவு மற்றும் வலிமையைப் பற்றி பெருமைப்பட்டது. ஒரு நாள், காட்டில் உலாவும்போது, அவன் ஒரு பரபரப்பான எறும்பு குடியைக் கவனித்தான். 'இந்த சிறிய பூச்சிகளைப் பாருங்கள், அற்பமானவை, சிறியவை!' என்று அவன் சிரித்தான், வேண்டுமென்றே அவர்களின் புற்றுக்கு அருகில் காலடியெடுத்து வைத்தான். எறும்புகள் பயத்தில் சிதறின, ஆனால் அவற்றின் ஞானமுள்ள ராணி அமைதியாக இருந்தாள். அன்று இரவு, கஜா தூங்கும்போது, எறும்பு ராணி தனது குடியை யானையைச் சுற்றி கூட வழிநடத்தினாள். கஜா மறுநாள் காலை எழுந்தபோது, தன்னைச் சுற்றி ஆயிரக்கணக்கான எறும்புகள், ஒவ்வொன்றும் ஒரு சிறிய இலையைச் சுமந்து கொண்டிருப்பதைக் கண்டான். ராணி பேசினாள்: 'சக்திவாய்ந்த யானையே, நீ எங்களில் ஒருவரை எளிதாக நசுக்கலாம், ஆனால் ஒன்றாக நாங்கள் வலிமையானவர்கள். நீ உன் மந்தையைப் பற்றி கவலைப்படுவது போல, நாங்கள் எங்கள் மந்தையைப் பற்றி கவலைப்படுகிறோம். அளவு மதிப்பை தீர்மானிக்காது.' அவர்களின் ஒற்றுமை மற்றும் தைரியத்தால் மனம் வெற்றிகொண்ட கஜா, மன்னிப்பு கேட்டான். அடுத்த நாட்களில், வேட்டைக்காரர்கள் காட்டிற்கு வந்தபோது, கஜாவை எச்சரித்தது எறும்பு குடிதான், அவன் தப்பிக்க அனுமதித்தது. அந்த நாள் முதல், கஜா அனைத்து உயிரினங்களையும் மரியாதையுடன் நடத்தினான், ஒவ்வொரு உயிரினமும், எவ்வளவு சிறியதாக இருந்தாலும், உலகில் ஒரு முக்கிய பங்கு வகிக்கிறது என்பதை புரிந்துகொண்டான்.",
    imageUrl: 'https://picsum.photos/seed/elephantants/300/200',
    imageHint: 'elephant near ant hill',
    moral: "Respect all beings, regardless of their size or appearance. Every creature has value and plays an important role in the world.",
    moralTamil: "அனைத்து உயிரினங்களையும், அவற்றின் அளவு அல்லது தோற்றத்தைப் பொருட்படுத்தாமல் மதிக்கவும். ஒவ்வொரு உயிரினமும் மதிப்புடையது மற்றும் உலகில் ஒரு முக்கிய பங்கு வகிக்கிறது."
  },
  
  // Humility Category
  {
    id: '9',
    title: 'The Proud Apple Tree',
    titleTamil: 'கர்வமுள்ள ஆப்பிள் மரம்',
    category: 'Humility',
    excerpt: 'A proud apple tree learns that beauty and strength are meaningless without kindness.',
    excerptTamil: 'கர்வமுள்ள ஆப்பிள் மரம் அழகும் வலிமையும் கருணை இல்லாமல் அர்த்தமற்றது என்பதைக் கற்றுக்கொள்கிறது.',
    content: "In a beautiful orchard stood a magnificent apple tree. Its branches were strong, its leaves were a vibrant green, and its apples were the most delicious in the land. However, the apple tree grew proud and boastful. It would look down on the smaller trees and flowers, saying, 'Look at me! I am the tallest, strongest, and most beautiful tree in this orchard. My apples are eaten by the king himself!' A small, crooked tree nearby would just smile and remain silent. One summer, a terrible storm hit the orchard. The proud apple tree stood tall and refused to bend with the wind, saying, 'I am too strong to bow down to any storm.' The small tree, however, bent with the wind, allowing it to pass over. When the storm finally ended, the apple tree had lost many branches and all its fruit, while the humble tree remained intact. A wise old gardener came by and said, 'The storm has taught you what I could not. True strength lies not in standing rigid with pride, but in having the humility to bend when necessary.' From that day on, the apple tree grew new branches, but its pride did not grow back. It learned that humility could save what pride would destroy.",
    contentTamil: "ஒரு அழகான தோட்டத்தில் ஒரு அற்புதமான ஆப்பிள் மரம் நின்றது. அதன் கிளைகள் வலுவாக இருந்தன, அதன் இலைகள் உயிர்ப்புள்ள பச்சை நிறத்தில் இருந்தன, மற்றும் அதன் ஆப்பிள்கள் நாட்டிலேயே மிகவும் சுவையானவை. இருப்பினும், ஆப்பிள் மரம் கர்வம் கொண்டு பெருமை பேசத் தொடங்கியது. அது சிறிய மரங்களையும் பூக்களையும் பார்த்து, 'என்னைப் பாருங்கள்! நான் இந்த தோட்டத்தில் உள்ள உயரமான, வலிமையான, மற்றும் மிக அழகான மரம். எனது ஆப்பிள்களை ராஜா தானே சாப்பிடுகிறார்!' என்று கூறியது. அருகில் இருந்த ஒரு சிறிய, வளைந்த மரம் வெறுமனே புன்னகைத்து அமைதியாக இருந்தது. ஒரு கோடை காலத்தில், தோட்டத்தை ஒரு பயங்கர புயல் தாக்கியது. கர்வமுள்ள ஆப்பிள் மரம் உயர்ந்து நின்று காற்றுடன் வளைய மறுத்து, 'நான் எந்த புயலுக்கும் அடிபணியும் அளவுக்கு பலவீனமானவன் அல்ல' என்று கூறியது. சிறிய மரம், இருப்பினும், காற்றுடன் வளைந்து, அதை கடந்து செல்ல அனுமதித்தது. புயல் இறுதியாக முடிந்தபோது, ஆப்பிள் மரம் பல கிளைகளையும் அதன் அனைத்து பழங்களையும் இழந்தது, அதே சமயம் பணிவான மரம் சேதமடையாமல் இருந்தது. ஒரு ஞானமுள்ள வயதான தோட்டக்காரர் வந்து, 'புயல் உனக்கு நான் கற்பிக்க முடியாததைக் கற்பித்துள்ளது. உண்மையான வலிமை கர்வத்துடன் உறுதியாக நிற்பதில் அல்ல, மாறாக தேவைப்படும்போது வளைவதற்கான பணிவு கொண்டிருப்பதில் உள்ளது.' என்றார். அன்று முதல், ஆப்பிள் மரம் புதிய கிளைகளை வளர்த்தது, ஆனால் அதன் கர்வம் திரும்ப வளரவில்லை. கர்வம் அழிப்பதை பணிவு காப்பாற்றக்கூடும் என்பதை அது கற்றுக்கொண்டது.",
    imageUrl: 'https://picsum.photos/seed/appletree/300/200',
    imageHint: 'proud apple tree in storm',
    moral: "Pride often leads to downfall. Humility and flexibility help us weather life's storms.",
    moralTamil: "கர்வம் பெரும்பாலும் வீழ்ச்சிக்கு வழிவகுக்கும். பணிவும் நெகிழ்வும் வாழ்க்கையின் புயல்களை எதிர்கொள்ள உதவுகின்றன."
  },
  
  {
    id: '10',
    title: 'The King and the Gardener',
    titleTamil: 'அரசனும் தோட்டக்காரரும்',
    category: 'Humility',
    excerpt: 'A king learns humility from a simple gardener who finds joy in serving others.',
    excerptTamil: 'ஒரு அரசன் மற்றவர்களுக்கு சேவை செய்வதில் மகிழ்ச்சியைக் காணும் எளிய தோட்டக்காரரிடமிருந்து பணிவைக் கற்றுக்கொள்கிறான்.',
    content: "King Vikram was known throughout his kingdom for his wisdom and power. He had conquered many lands and built grand palaces, but lately, he felt unsatisfied despite his wealth and position. One day, while walking disguised in the palace gardens, he noticed an old gardener tending to flowers with extraordinary care and singing happily. The king was puzzled by the man's joy despite his humble position. 'Why are you so happy when you have so little?' the king asked him. The gardener, not recognizing the king, smiled and replied, 'I have everything I need, Your Majesty. The sun warms me, the earth feeds me, and I have the honor of creating beauty for others to enjoy. Each flower I nurture will bring someone happiness. What greater wealth could I desire?' The king pondered this and returned several times to speak with the wise gardener. He learned that true fulfillment comes not from possessions or power but from serving others with a humble heart. Inspired by the gardener's wisdom, King Vikram began to spend more time understanding his subjects' needs and serving his kingdom with genuine care. He found that the more he focused on others rather than his own glory, the more content he became. The king eventually revealed his identity to the gardener and made him a royal advisor, but the old man continued to tend his garden, saying, 'Even kings must remember they are but gardeners of their kingdom, nurturing it so it may flourish for all.'",
    contentTamil: "விக்ரம் அரசன் தனது ஞானம் மற்றும் சக்திக்காக தனது அரசாட்சி முழுவதும் அறியப்பட்டவன். அவன் பல நாடுகளை வென்று பெரிய அரண்மனைகளை கட்டியிருந்தான், ஆனால் சமீபத்தில், தனது செல்வம் மற்றும் நிலை இருந்தபோதிலும் அவன் திருப்தியற்று இருந்தான். ஒரு நாள், அரண்மனைத் தோட்டங்களில் மாறுவேடத்தில் நடந்து செல்லும்போது, ஒரு வயதான தோட்டக்காரர் அசாதாரண கவனத்துடன் பூக்களைப் பராமரித்து மகிழ்ச்சியுடன் பாடுவதைக் கவனித்தான். அரசன் அந்த மனிதனின் எளிய நிலை இருந்தும் அவன் மகிழ்ச்சியாக இருப்பது குறித்து குழப்பமடைந்தான். 'உங்களிடம் மிகவும் குறைவாக இருக்கும்போது நீங்கள் ஏன் இவ்வளவு மகிழ்ச்சியாக இருக்கிறீர்கள்?' என்று அரசன் அவரிடம் கேட்டான். அரசனை அடையாளம் காணாத தோட்டக்காரர், புன்னகைத்து, 'எனக்குத் தேவையான அனைத்தும் உள்ளது, மன்னரே. சூரியன் என்னை சூடாக்குகிறான், பூமி என்னை உணவளிக்கிறது, மற்றும் மற்றவர்கள் அனுபவிக்க அழகை உருவாக்கும் மரியாதை எனக்கு உள்ளது. நான் வளர்க்கும் ஒவ்வொரு பூவும் யாருக்காவது மகிழ்ச்சியைக் கொண்டுவரும். நான் எந்த பெரிய செல்வத்தை விரும்பக்கூடும்?' என்றார். அரசன் இதைப் பற்றி சிந்தித்து, ஞானமுள்ள தோட்டக்காரருடன் பேச பல முறை திரும்பி வந்தான். உண்மையான நிறைவு உடைமைகள் அல்லது அதிகாரத்திலிருந்து அல்ல, மாறாக பணிவான இதயத்துடன் மற்றவர்களுக்கு சேவை செய்வதிலிருந்து வருகிறது என்பதை அவன் கற்றுக்கொண்டான். தோட்டக்காரரின் ஞானத்தால் ஊக்கமளிக்கப்பட்ட விக்ரம் அரசன், தனது குடிமக்களின் தேவைகளைப் புரிந்துகொள்வதிலும், உண்மையான அக்கறையுடன் தனது அரசாட்சிக்கு சேவை செய்வதிலும் அதிக நேரம் செலவிடத் தொடங்கினான். தனது சொந்த புகழை விட மற்றவர்களைப் பற்றி அதிகம் கவனம் செலுத்தும்போது, அவன் அதிக மகிழ்ச்சியடைவதைக் கண்டான். அரசன் இறுதியில் தோட்டக்காரருக்கு தனது அடையாளத்தை வெளிப்படுத்தி அவரை அரச ஆலோசகராக்கினான், ஆனால் வயதான மனிதர் தொடர்ந்து தனது தோட்டத்தை கவனித்துக்கொண்டார், 'அரசர்களும் கூட தங்கள் அரசாட்சியின் தோட்டக்காரர்கள் என்பதை நினைவில் கொள்ள வேண்டும், அது அனைவருக்காகவும் செழிக்க அதை வளர்ப்பதுதான் அவர்களின் பணி' என்றார்.",
    imageUrl: 'https://picsum.photos/seed/kinggardener/300/200',
    imageHint: 'king talking with gardener',
    moral: "True contentment comes from humility and serving others, not from wealth or status.",
    moralTamil: "உண்மையான திருப்தி செல்வம் அல்லது அந்தஸ்திலிருந்து அல்ல, மாறாக பணிவிலிருந்தும் மற்றவர்களுக்கு சேவை செய்வதிலிருந்தும் வருகிறது."
  },
  
  // Courage Category
  {
    id: '11',
    title: 'The Little Flame',
    titleTamil: 'சிறிய சுடர்',
    category: 'Courage',
    excerpt: 'A small candle flame finds courage to light up a dark forest and save lost children.',
    excerptTamil: 'சிறிய மெழுகுவர்த்தி சுடர் இருண்ட காட்டை வெளிச்சமாக்கி தவறிப்போன குழந்தைகளைக் காப்பாற்ற தைரியம் கண்டுபிடிக்க வேண்டும்.',
    content: "In a village at the edge of a dense forest lived a humble candlemaker who crafted beautiful candles. One special candle had a tiny, shy flame named Diya who always flickered nervously. The other flames in the workshop would tease, 'You're too small to be useful. You can barely light a corner!' One stormy night, news spread that two children from the village had gotten lost in the forest. Search parties with large torches ventured in but returned unsuccessful as the heavy rain extinguished their lights. The candlemaker had an idea. He placed Diya in a special glass lantern that would protect her from the rain and wind. 'I'm too small and scared,' whispered Diya. 'But you have something special,' said the candlemaker. 'Your light may not be the brightest, but it burns steady and true.' With great fear but determined to help, Diya allowed herself to be carried into the dark forest. The rain lashed and the wind howled, but protected in her glass lantern, Diya concentrated on keeping her flame bright and steady. Deep in the forest, the lost children huddled under a tree, cold and afraid. Suddenly, they spotted a small, unwavering light moving between the trees. They called out, and the candlemaker followed Diya's loyal light straight to them. Back in the village, Diya burned proudly as everyone celebrated the rescue. 'I was so scared,' she admitted to the candlemaker. 'That's what courage is,' he replied. 'Not the absence of fear, but acting despite it.' From that day on, Diya's flame burned with confidence, knowing that even the smallest light can guide the way when it burns with courage.",
    contentTamil: "அடர்ந்த காட்டின் விளிம்பில் உள்ள ஒரு கிராமத்தில் அழகான மெழுகுவர்த்திகளை உருவாக்கும் ஒரு எளிய மெழுகுவர்த்தி தயாரிப்பாளர் வாழ்ந்து வந்தார். ஒரு சிறப்பு மெழுகுவர்த்தியில் தீயா என்ற பெயர் கொண்ட ஒரு சிறிய, வெட்கப்படும் சுடர் இருந்தது, அது எப்போதும் பதட்டத்துடன் மின்னும். பணிமனையில் உள்ள மற்ற சுடர்கள் கேலி செய்யும், 'நீ பயனுள்ளதாக இருக்க மிகவும் சிறியது. நீ ஒரு மூலையை கூட சரியாக வெளிச்சமாக்க முடியாது!' ஒரு புயல் இரவில், கிராமத்தைச் சேர்ந்த இரண்டு குழந்தைகள் காட்டில் தவறிப்போனதாக செய்தி பரவியது. பெரிய தீப்பந்தங்களுடன் தேடும் குழுக்கள் உள்ளே சென்றன, ஆனால் கனமழை அவர்களின் விளக்குகளை அணைத்ததால் வெற்றிபெறாமல் திரும்பினர். மெழுகுவர்த்தி தயாரிப்பாளருக்கு ஒரு யோசனை வந்தது. அவர் தீயாவை மழை மற்றும் காற்றிலிருந்து அவளைப் பாதுகாக்கும் ஒரு சிறப்பு கண்ணாடி விளக்கில் வைத்தார். 'நான் மிகவும் சிறியவள் மற்றும் பயந்தவள்,' என்று தீயா கிசுகிசுத்தாள். 'ஆனால் உன்னிடம் ஏதோ சிறப்பு உள்ளது,' என்றார் மெழுகுவர்த்தி தயாரிப்பாளர். 'உன் ஒளி மிக பிரகாசமானதாக இல்லாமல் இருக்கலாம், ஆனால் அது நிலையாகவும் உண்மையாகவும் எரிகிறது.' பெரும் பயத்துடன் ஆனால் உதவ உறுதியுடன், தீயா தன்னை இருண்ட காட்டிற்குள் எடுத்துச் செல்ல அனுமதித்தாள். மழை கொட்டியது, காற்று உறுமியது, ஆனால் தனது கண்ணாடி விளக்கில் பாதுகாக்கப்பட்ட தீயா தனது சுடரை பிரகாசமாகவும் நிலையாகவும் வைத்திருக்க கவனம் செலுத்தினாள். காட்டின் ஆழத்தில், தவறிப்போன குழந்தைகள் ஒரு மரத்தின் கீழ் குளிர் மற்றும் பயத்துடன் கூடிக்குறுகி இருந்தனர். திடீரென்று, அவர்கள் மரங்களுக்கு இடையே நகரும் ஒரு சிறிய, உறுதியான ஒளியைக் கண்டனர். அவர்கள் அழைத்தனர், மெழுகுவர்த்தி தயாரிப்பாளர் தீயாவின் விசுவாசமான ஒளியைப் பின்தொடர்ந்து நேராக அவர்களிடம் சென்றார். கிராமத்தில் திரும்பிய பிறகு, எல்லோரும் மீட்புக்காக கொண்டாடும்போது தீயா பெருமையுடன் எரிந்தாள். 'நான் மிகவும் பயந்திருந்தேன்,' என்று அவள் மெழுகுவர்த்தி தயாரிப்பாளரிடம் ஒப்புக்கொண்டாள். 'அதுதான் தைரியம்,' என்று அவர் பதிலளித்தார். 'பயமின்மை அல்ல, அதை மீறி செயல்படுவது.' அந்த நாளிலிருந்து, தைரியத்துடன் எரியும்போது சிறிய ஒளிகூட வழியைக் காட்டும் என்பதை அறிந்து, தீயாவின் சுடர் நம்பிக்கையுடன் எரிந்தது.",
    imageUrl: 'https://picsum.photos/seed/littleflame/300/200',
    imageHint: 'small candle flame in lantern',
    moral: "True courage is not the absence of fear, but acting in spite of it. Even the smallest among us can make a difference with courage.",
    moralTamil: "உண்மையான தைரியம் என்பது பயமின்மை அல்ல, மாறாக அதை மீறி செயல்படுவதைப் பற்றியது. நம்மிடையே மிகச் சிறியவர்கள் கூட தைரியத்துடன் வித்தியாசத்தை ஏற்படுத்த முடியும்."
  },
  
  {
    id: '12',
    title: 'The Cliff Jumper',
    titleTamil: 'மலைப் பாறை தாவுபவன்',
    category: 'Courage',
    excerpt: 'A young bird must find the courage to take his first flight from a towering cliff.',
    excerptTamil: 'ஒரு இளம் பறவை உயரமான மலைப் பாறையிலிருந்து தனது முதல் பறக்கும் முயற்சிக்கு தைரியம் கண்டுபிடிக்க வேண்டும்.',
    content: "High on a rocky cliff, a family of eagles had made their nest. Three eaglets had hatched in the spring, and by summer, two had already taken their first flight. Only Kiran, the smallest eaglet, remained in the nest, too afraid to try his wings. His father had demonstrated flying techniques, and his mother had encouraged him with stories of the magnificent views and the joy of soaring through the clouds. But Kiran would always find excuses: 'My wings aren't strong enough yet' or 'The wind isn't right today.' One morning, a terrible storm was brewing. The eagle parents knew they needed to move to a safer cliff before it hit. 'Kiran,' his mother said urgently, 'you must fly today. We cannot stay, and I cannot carry you – you're too big now.' Kiran trembled at the edge of the nest, looking down at the dizzying drop below. His heart pounded so loudly he was sure it could be heard across the valley. 'I can't do it,' he whispered. His father landed beside him. 'Listen to me, Kiran. Fear is natural, but letting it control you is a choice. Your wings know what to do – trust them, trust yourself.' The first raindrops began to fall. With no more time to hesitate, Kiran closed his eyes, spread his wings, and jumped. For a terrifying moment, he fell. Then instinct took over, and his wings caught the air. Opening his eyes, he realized he was flying! Banking and turning, he followed his parents to safety, amazed at how natural it felt once he had conquered his fear. That night, sheltered from the storm, Kiran's father told him, 'The courage you showed today wasn't in not being afraid. It was in being afraid but acting anyway. That is true courage.'",
    contentTamil: "பாறையான மலைச்சிகரத்தில் உயரே, ஒரு கழுகுக் குடும்பம் தங்கள் கூட்டை அமைத்திருந்தது. வசந்த காலத்தில் மூன்று கழுகுக் குஞ்சுகள் பொரித்திருந்தன, கோடை வரும்போது, இரண்டு பேர் ஏற்கனவே தங்கள் முதல் பறக்கும் முயற்சியை மேற்கொண்டிருந்தனர். கிரண் மட்டுமே, மிகச் சிறிய கழுகுக் குஞ்சு, தனது இறக்கைகளை முயற்சிக்க பயந்து கூட்டில் இருந்தது. அவனது தந்தை பறக்கும் நுட்பங்களை விளக்கியிருந்தார், மற்றும் அவனது தாய் அற்புதமான காட்சிகள் மற்றும் மேகங்களின் வழியாக பறப்பதன் மகிழ்ச்சி பற்றிய கதைகளுடன் அவனை ஊக்குவித்திருந்தார். ஆனால் கிரண் எப்போதும் சாக்குப்போக்குகளைக் கண்டுபிடிப்பான்: 'என் இறக்கைகள் இன்னும் போதுமான அளவு வலுவாக இல்லை' அல்லது 'இன்று காற்று சரியாக இல்லை.' ஒரு காலை நேரத்தில், ஒரு பயங்கர புயல் உருவாகி வந்தது. அது தாக்கும் முன் பாதுகாப்பான மலைப்பாறைக்கு செல்ல வேண்டும் என்பதை கழுகுப் பெற்றோர்கள் அறிந்திருந்தனர். 'கிரண்,' அவனது தாய் அவசரமாகக் கூறினாள், 'நீ இன்று பறக்க வேண்டும். நாங்கள் இங்கே தங்க முடியாது, மேலும் நான் உன்னைச் சுமக்க முடியாது - நீ இப்போது மிகப் பெரியவன்.' கிரண் கூட்டின் விளிம்பில் நடுங்கினான், கீழே உள்ள தலைச்சுற்றும் உயரத்தைப் பார்த்தான். அவனது இதயம் மிக உரக்கத் துடித்தது, அது பள்ளத்தாக்கு முழுவதும் கேட்கப்படலாம் என்று அவன் உறுதியாக இருந்தான். 'என்னால் முடியாது,' என்று அவன் கிசுகிசுத்தான். அவனது தந்தை அவன் அருகில் வந்திறங்கினார். 'என்னைக் கேள், கிரண். பயம் இயற்கையானது, ஆனால் அது உன்னைக் கட்டுப்படுத்த அனுமதிப்பது ஒரு தேர்வு. உன் இறக்கைகள் என்ன செய்ய வேண்டும் என்பதை அறியும் - அவற்றை நம்பு, உன்னை நம்பு.' முதல் மழைத்துளிகள் விழத் தொடங்கின. தயக்கம் காட்ட இனி நேரமில்லை, கிரண் தனது கண்களை மூடி, இறக்கைகளை விரித்து, குதித்தான். ஒரு பயங்கர நொடியில், அவன் விழுந்தான். பின்னர் உள்ளுணர்வு கையேற்று, அவனது இறக்கைகள் காற்றைப் பிடித்தன. கண்களைத் திறந்து, அவன் பறந்துகொண்டிருப்பதை உணர்ந்தான்! திரும்பி வளைந்து, அவன் தனது பெற்றோரைப் பின்தொடர்ந்து பாதுகாப்பான இடத்திற்குச் சென்றான், தனது பயத்தை வென்றவுடன் அது எவ்வளவு இயல்பாக உணர்ந்தது என்பதில் வியப்படைந்தான். அன்று இரவு, புயலிலிருந்து பாதுகாக்கப்பட்ட நிலையில், கிரணின் தந்தை அவனிடம் கூறினார், 'இன்று நீ காட்டிய தைரியம் பயப்படாமல் இருப்பதில் இல்லை. பயந்திருந்தும் செயல்படுவதுதான். அதுதான் உண்மையான தைரியம்.'",
    imageUrl: 'https://picsum.photos/seed/eaglecliff/300/200',
    imageHint: 'eagle preparing to fly from cliff',
    moral: "Courage isn't about not feeling fear, but about facing it and acting despite it. We grow when we step outside our comfort zone.",
    moralTamil: "தைரியம் என்பது பயத்தை உணராமல் இருப்பதைப் பற்றியது அல்ல, மாறாக அதை எதிர்கொண்டு அதை மீறி செயல்படுவதைப் பற்றியது. நாம் நமது வசதி மண்டலத்திற்கு வெளியே அடியெடுத்து வைக்கும்போது வளர்கிறோம்."
  },
  
  // Responsibility Category
  {
    id: '13',
    title: 'The Garden Guardian',
    titleTamil: 'தோட்டக் காவலன்',
    category: 'Responsibility',
    excerpt: 'A young boy learns about responsibility when he is put in charge of the community garden.',
    excerptTamil: 'சமூகத் தோட்டத்தின் பொறுப்பில் வைக்கப்படும்போது ஒரு சிறுவன் பொறுப்புணர்வைப் பற்றிக் கற்றுக்கொள்கிறான்.',
    content: "Twelve-year-old Arjun was known in his village for being forgetful and careless. He would often leave his books at school, forget to feed his pet rabbit, or neglect his chores. His grandmother would sigh, 'Arjun, when will you learn responsibility?' One summer, the village decided to create a community garden where each family would grow vegetables to share. To everyone's surprise, the village elder assigned Arjun to be the garden guardian. 'Me?' Arjun asked in disbelief. 'But I can't even remember to tie my shoelaces sometimes!' The elder smiled. 'That's exactly why I'm choosing you. Responsibility isn't something you're born with – it's something you learn.' Reluctantly, Arjun accepted the task. He was given a small notebook to record planting dates, watering schedules, and growth progress. At first, Arjun struggled. He forgot to water some plants, and they wilted in the hot sun. He felt terrible seeing the consequences of his neglect. Determined to do better, he created a routine. Every morning before school, he would check the garden. Every evening, he would update his notebook and plan the next day's tasks. Slowly, the plants began to flourish under his care. When harvest time came, the garden yielded more vegetables than anyone had expected. During the village feast, the elder stood up and announced, 'Our bounty this year is thanks to our young garden guardian, who learned that responsibility means caring enough to be consistent, even when no one is watching.' Arjun beamed with pride. He had not only grown vegetables but had also grown as a person. From then on, he approached all his tasks with the same care he had given to the garden, understanding that responsibility wasn't a burden but a way to make a positive difference.",
    contentTamil: "பன்னிரண்டு வயதான அர்ஜுன் மறதியும் அசட்டையுமாக இருப்பதற்காக தனது கிராமத்தில் அறியப்பட்டவன். அவன் அடிக்கடி தனது புத்தகங்களை பள்ளியில் விட்டுவிடுவான், தனது செல்ல முயலுக்கு உணவளிப்பதை மறந்துவிடுவான், அல்லது தனது வீட்டு வேலைகளை புறக்கணிப்பான். அவனது பாட்டி பெருமூச்சு விட்டு, 'அர்ஜுன், எப்போது நீ பொறுப்புணர்வைக் கற்றுக்கொள்வாய்?' என்பார். ஒரு கோடையில், கிராமம் ஒரு சமூகத் தோட்டத்தை உருவாக்க முடிவு செய்தது, அங்கு ஒவ்வொரு குடும்பமும் பகிர்ந்துகொள்ள காய்கறிகளை வளர்க்கும். எல்லோருக்கும் ஆச்சரியமாக, கிராமத்தின் மூத்தவர் அர்ஜுனை தோட்டத்தின் காவலனாக நியமித்தார். 'நானா?' என்று அர்ஜுன் நம்பமுடியாமல் கேட்டான். 'ஆனால் எனக்கு சில நேரங்களில் எனது காலணி சரடுகளைக் கட்டுவதைக்கூட நினைவில் வைக்க முடியாது!' மூத்தவர் புன்னகைத்தார். 'அதனால்தான் நான் உன்னைத் தேர்ந்தெடுக்கிறேன். பொறுப்புணர்வு என்பது நீ பிறக்கும்போதே உன்னிடம் இருப்பது அல்ல - அது நீ கற்றுக்கொள்வது.' தயக்கத்துடன், அர்ஜுன் பணியை ஏற்றுக்கொண்டான். அவனுக்கு நடவு தேதிகள், நீர் பாய்ச்சும் அட்டவணைகள், மற்றும் வளர்ச்சி முன்னேற்றத்தைப் பதிவு செய்ய ஒரு சிறிய குறிப்பேடு கொடுக்கப்பட்டது. முதலில், அர்ஜுன் போராடினான். அவன் சில செடிகளுக்கு நீர் ஊற்றுவதை மறந்துவிட்டான், அவை வெப்பமான சூரிய ஒளியில் வாடின. அவனது புறக்கணிப்பின் விளைவுகளைக் காண்பது அவனுக்கு மோசமாக இருந்தது. சிறப்பாக செய்ய உறுதிபூண்டு, அவன் ஒரு வழக்கத்தை உருவாக்கினான். ஒவ்வொரு காலையிலும் பள்ளிக்கு முன், அவன் தோட்டத்தைச் சரிபார்ப்பான். ஒவ்வொரு மாலையிலும், அவன் தனது குறிப்பேட்டை புதுப்பித்து, அடுத்த நாளின் பணிகளைத் திட்டமிடுவான். மெதுவாக, செடிகள் அவனது பராமரிப்பில் செழிக்கத் தொடங்கின. அறுவடைக் காலம் வந்தபோது, தோட்டம் யாரும் எதிர்பார்த்ததை விட அதிக காய்கறிகளை விளைவித்தது. கிராம விருந்தின் போது, மூத்தவர் எழுந்து அறிவித்தார், 'இந்த ஆண்டின் செழுமைக்கு நன்றி நமது இளம் தோட்டக் காவலனுக்கு, யார் யாரும் பார்க்காதபோதும் கவனிக்க போதுமான அளவு அக்கறை கொள்வதே பொறுப்புணர்வு என்று கற்றுக்கொண்டார்.' அர்ஜுன் பெருமையுடன் ஒளிர்ந்தான். அவன் காய்கறிகளை மட்டுமல்ல, ஒரு நபராகவும் வளர்ந்திருந்தான். அதன் பிறகு, பொறுப்புணர்வு என்பது ஒரு சுமை அல்ல, மாறாக நேர்மறையான மாற்றத்தை ஏற்படுத்தும் ஒரு வழி என்று புரிந்துகொண்டு, அவன் தோட்டத்திற்கு அளித்த அதே கவனிப்புடன் தனது அனைத்து பணிகளையும் அணுகினான்.",
    imageUrl: 'https://picsum.photos/seed/gardengirl/300/200',
    imageHint: 'boy caring for plants in garden',
    moral: "Responsibility isn't about perfection, but about commitment and consistent effort. Through responsibility, we grow and help others grow too.",
    moralTamil: "பொறுப்புணர்வு என்பது முழுமை பற்றியது அல்ல, அர்ப்பணிப்பு மற்றும் தொடர்ச்சியான முயற்சி பற்றியது. பொறுப்புணர்வின் மூலம், நாம் வளர்கிறோம், மற்றவர்களும் வளர உதவுகிறோம்."
  },
  
  {
    id: '14',
    title: 'The Missing Library Book',
    titleTamil: 'காணாமல் போன நூலக புத்தகம்',
    category: 'Responsibility',
    excerpt: 'A child learns about responsibility when a borrowed library book goes missing.',
    excerptTamil: 'கடன் வாங்கிய நூலக புத்தகம் காணாமல் போகும்போது ஒரு குழந்தை பொறுப்புணர்வைப் பற்றிக் கற்றுக்கொள்கிறது.',
    content: "Maya loved books more than anything in the world. Every Saturday, she would visit the neighborhood library and borrow a new book. The librarian, Mrs. Sharma, always reminded her, 'Remember, these books are your responsibility while they're in your care.' One weekend, Maya borrowed a special book about space exploration – it was colorful, with pop-up planets and star charts. She was so excited that she took it everywhere: to school, to the park, and even to her cousin's birthday party. A week later, when it was time to return the book, Maya couldn't find it anywhere. She searched her room, checked her backpack, looked under the sofa – but the book had disappeared. Maya felt sick to her stomach. How could she face Mrs. Sharma? Her mother noticed her distress and asked what was wrong. Through tears, Maya explained about the missing book. Instead of scolding her, her mother sat down beside her. 'What do you think is the responsible thing to do now?' she asked gently. Maya thought for a moment. 'I should tell Mrs. Sharma the truth and offer to replace the book, even though it might cost all my saved pocket money.' The next day, Maya nervously approached the library desk. She explained what had happened and offered her savings to replace the book. Mrs. Sharma listened carefully, then smiled. 'I appreciate your honesty, Maya. That's what responsibility looks like – not never making mistakes, but owning up to them when you do.' Together, they checked the library catalog to find the cost of a replacement. Just then, Maya's phone buzzed with a message from her aunt: 'Found a space book under the couch after the party. Is it yours?' Even though the book was found, Maya realized an important lesson about being accountable for things entrusted to her care. From that day, she kept borrowed books in a special place and always checked to make sure she had them before leaving anywhere. The experience taught her that responsibility means taking care of things as if they were precious treasures – because to someone, they are.",
    contentTamil: "மாயா உலகில் எதையும் விட புத்தகங்களை அதிகம் நேசித்தாள். ஒவ்வொரு சனிக்கிழமையும், அவள் அக்கம்பக்க நூலகத்திற்குச் சென்று ஒரு புதிய புத்தகத்தைக் கடன் வாங்குவாள். நூலகர், திருமதி சர்மா, எப்போதும் அவளுக்கு நினைவூட்டுவார், 'நினைவில் கொள், இந்த புத்தகங்கள் உன் பராமரிப்பில் இருக்கும்போது அவை உன் பொறுப்பில் உள்ளன.' ஒரு வார இறுதியில், மாயா விண்வெளி ஆய்வு பற்றிய ஒரு சிறப்பு புத்தகத்தைக் கடன் வாங்கினாள் - அது வண்ணமயமானது, பாப்-அப் கிரகங்கள் மற்றும் நட்சத்திர விளக்கப்படங்களுடன் கூடியது. அவள் மிகவும் உற்சாகமாக இருந்ததால் அதை எல்லா இடங்களுக்கும் எடுத்துச் சென்றாள்: பள்ளிக்கு, பூங்காவிற்கு, மற்றும் தனது ஒன்றுவிட்ட சகோதரியின் பிறந்தநாள் விழாவிற்கும் கூட. ஒரு வாரம் கழித்து, புத்தகத்தைத் திருப்பி அளிக்க வேண்டிய நேரம் வந்தபோது, மாயாவால் அதை எங்கும் கண்டுபிடிக்க முடியவில்லை. அவள் தனது அறையைத் தேடினாள், பின்புறப் பையைச் சரிபார்த்தாள், சோபாவின் கீழ் பார்த்தாள் - ஆனால் புத்தகம் காணாமல் போயிருந்தது. மாயாவின் வயிற்றில் உடல்நிலை சரியில்லாமல் உணர்ந்தாள். திருமதி சர்மாவை எப்படி சந்திப்பது? அவளது தாயார் அவளது மன அழுத்தத்தைக் கவனித்து என்ன தவறு என்று கேட்டார். கண்ணீருடன், மாயா காணாமல் போன புத்தகத்தைப் பற்றி விளக்கினாள். அவளைக் கடிந்துகொள்வதற்குப் பதிலாக, அவளது தாயார் அவள் அருகில் அமர்ந்தார். 'இப்போது பொறுப்பான விஷயம் என்ன என்று நீ நினைக்கிறாய்?' என்று அவர் மென்மையாகக் கேட்டார். மாயா ஒரு கணம் யோசித்தாள். 'நான் திருமதி சர்மாவிடம் உண்மையைச் சொல்லி, என் சேமித்த கைச்செலவு பணம் முழுவதும் செலவாகக்கூடும் என்றாலும், புத்தகத்தை மாற்றிக்கொள்ள வேண்டும்.' அடுத்த நாள், மாயா பதட்டத்துடன் நூலக மேஜையை அணுகினாள். அவள் என்ன நடந்தது என்பதை விளக்கி, புத்தகத்தை மாற்றிக்கொள்ள தனது சேமிப்புகளை வழங்கினாள். திருமதி சர்மா கவனமாகக் கேட்டார், பின்னர் புன்னகைத்தார். 'உங்கள் நேர்மையை நான் பாராட்டுகிறேன், மாயா. அதுதான் பொறுப்புணர்வு - தவறுகள் செய்யாமல் இருப்பது அல்ல, அவற்றை செய்யும்போது அவற்றை ஏற்றுக்கொள்வது.' இணைந்து, அவர்கள் மாற்று புத்தகத்தின் விலையைக் கண்டறிய நூலக பட்டியலைச் சரிபார்த்தனர். அப்போதுதான், மாயாவின் தொலைபேசி அவளது அத்தையிடமிருந்து ஒரு செய்தியுடன் ஒலித்தது: 'விருந்துக்குப் பிறகு சோபாவின் கீழ் ஒரு விண்வெளி புத்தகத்தைக் கண்டேன். அது உங்களுடையதா?' புத்தகம் கண்டுபிடிக்கப்பட்டாலும், தனது கவனிப்பில் ஒப்படைக்கப்பட்ட விஷயங்களுக்கு பொறுப்பேற்பது பற்றிய முக்கியமான பாடத்தை மாயா உணர்ந்தாள். அன்று முதல், அவள் கடன் வாங்கிய புத்தகங்களை ஒரு சிறப்பான இடத்தில் வைத்து, எங்கிருந்தும் வெளியேறுவதற்கு முன் அவை தன்னிடம் இருப்பதை உறுதிப்படுத்த எப்போதும் சரிபார்த்தாள். இந்த அனுபவம் அவளுக்கு கற்பித்தது, பொறுப்புணர்வு என்பது விலையுயர்ந்த புதையல்களைப் போல விஷயங்களைக் கவனித்துக் கொள்வது - ஏனெனில் யாருக்காவது, அவை அப்படித்தான் இருக்கின்றன.",
    imageUrl: 'https://picsum.photos/seed/librarybook/300/200',
    imageHint: 'girl with lost library book',
    moral: "Being responsible means taking care of what belongs to others as carefully as your own possessions, and being honest when mistakes happen.",
    moralTamil: "பொறுப்புணர்வு என்பது மற்றவர்களுக்குச் சொந்தமான பொருட்களை உங்கள் சொந்த உடைமைகளைப் போலவே கவனமாகக் கையாளுவதையும், தவறுகள் நடக்கும்போது நேர்மையாக இருப்பதையும் குறிக்கிறது."
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
