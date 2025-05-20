import FeatureCard from '@/components/shared/feature-card';
import { GraduationCap, LibraryBig, ShieldCheck, Puzzle, Palette, Brain, Bot, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const features = [
    {
      title: 'Dora & Buji',
      description: 'Learn with Dora the Robo Teacher and her friend Buji!',
      href: '/learn/dora-game',
      Icon: Bot, // Updated icon for Dora's game
    },
    {
      title: 'Alphabet Fun',
      description: 'Learn your ABCs with exciting visuals and sounds!',
      href: '/learn/alphabets',
      Icon: Palette, // Represents creativity / colors in alphabet visuals
    },
    {
      title: 'Edu-Games',
      description: 'Play fun games to learn numbers, shapes, and more!',
      href: '/learn/games',
      Icon: Brain, // Represents thinking/memory games
    },
    {
      title: 'Conversation Bubbles',
      description: 'Practice talking with doctors, teachers, and more!',
      href: '/conversation/illustration-demo',
      Icon: MessageCircle, // Represents conversations
    },
    {
      title: 'Story Time',
      description: 'Listen to enchanting audio stories with beautiful visuals.',
      href: '/stories',
      Icon: LibraryBig,
    },
    {
      title: 'Safety First',
      description: 'Understand personal safety with interactive scenarios.',
      href: '/safety',
      Icon: ShieldCheck,
    },
    {
      title: 'Quiz Whiz',
      description: 'Test your knowledge with AI-powered quizzes!',
      href: '/quiz',
      Icon: Puzzle,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-12">
      <section className="text-center py-6 sm:py-8 bg-gradient-to-r from-primary via-yellow-300 to-secondary rounded-xl shadow-lg">
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 mx-auto mb-3 sm:mb-4">
           <Image 
            src="/images/kido-avatar.jpg"
            alt="Kido Bot" 
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            data-ai-hint="kido bot"
          />
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-primary-foreground mb-1 sm:mb-2 px-4">Welcome to TN HappyKids Learn!</h2>
        <p className="text-base sm:text-lg text-primary-foreground/90 px-4">
          Your adventure in learning starts here. Explore, play, and grow!
        </p>
      </section>

      <section>
        <h3 className="text-xl sm:text-3xl font-semibold text-center mb-4 sm:mb-8 text-foreground px-2">Discover Our Fun Activities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              Icon={feature.Icon}
            />
          ))}
        </div>
      </section>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
