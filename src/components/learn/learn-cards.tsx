"use client";

import { Palette, Brain, Video } from 'lucide-react';
import FeatureCard from '@/components/shared/feature-card';

const learningSections = [
  {
    title: 'Alphabet Fun',
    description: 'Dive into the world of letters! Learn your ABCs with engaging visuals and examples.',
    href: '/learn/alphabets',
    Icon: Palette,
  },
  {
    title: 'Educational Games',
    description: 'Play and learn! Explore numbers, colors, shapes, and boost your memory with our fun games.',
    href: '/learn/games',
    Icon: Brain,
  },
  {
    title: 'Video Lessons',
    description: 'Watch fun educational videos and test your knowledge with interactive quizzes!',
    href: '/learn/videos',
    Icon: Video,
  },
];

export default function LearnCards() {
  return (
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
  );
} 