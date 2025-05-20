import FeatureCard from '@/components/shared/feature-card';
import { BookOpen, Gamepad2, Palette, Brain, Video } from 'lucide-react'; // Palette and Brain for specific sub-features
import Link from 'next/link';

export default function LearnPage() {
  const learningSections = [
    {
      title: 'Alphabet Fun',
      description: 'Dive into the world of letters! Learn your ABCs with engaging visuals and examples.',
      href: '/learn/alphabets',
      Icon: Palette, // Icon for alphabets
    },
    {
      title: 'Educational Games',
      description: 'Play and learn! Explore numbers, colors, shapes, and boost your memory with our fun games.',
      href: '/learn/games',
      Icon: Brain, // Icon for games
    },
    {
      title: 'Video Lessons',
      description: 'Watch fun educational videos and test your knowledge with interactive quizzes!',
      href: '/learn/videos',
      Icon: Video,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="text-center">
        <BookOpen className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">Let's Learn Together!</h1>
        <p className="text-lg text-muted-foreground">
          Explore exciting lessons and games designed just for you.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {learningSections.map((section) => (
          <FeatureCard
            key={section.title}
            title={section.title}
            description={section.description}
            href={section.href}
            Icon={section.Icon}
            ctaText="Explore Now"
            className="bg-card hover:bg-card/95"
          />
        ))}
      </div>
       <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
