'use client';
import FeatureCard from './shared/feature-card';
import { GraduationCap, LibraryBig, ShieldCheck, Palette, Brain, MessageCircle } from 'lucide-react';

const features = [
  {
    title: 'Alphabet Fun',
    description: 'Learn your ABCs with exciting visuals and sounds!',
    href: '/learn/alphabets',
    Icon: Palette,
  },
  {
    title: 'Edu-Games',
    description: 'Play fun games to learn numbers, shapes, and more!',
    href: '/learn/games',
    Icon: Brain,
  },
  {
    title: 'Video Lessons',
    description: 'Watch fun educational videos and test your knowledge with interactive quizzes!',
    href: '/learn/videos',
    Icon: GraduationCap,
  },
  {
    title: 'Conversation Bubbles',
    description: 'Practice talking with doctors, teachers, and more!',
    href: '/conversation',
    Icon: MessageCircle,
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
];

export default function FeatureGrid() {
  return (
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
  );
} 