'use client';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  ctaText?: string;
  className?: string;
}

// Unique color themes for each card
const cardThemes: Record<string, { border: string; iconBg: string; badge: string; gradient: string }> = {
  'Alphabet Fun': {
    border: 'from-pink-400 to-yellow-300',
    iconBg: 'from-pink-200 to-yellow-200',
    badge: 'bg-pink-400',
    gradient: 'bg-gradient-to-br from-pink-100 via-yellow-50 to-yellow-200',
  },
  'Edu-Games': {
    border: 'from-green-400 to-blue-400',
    iconBg: 'from-green-200 to-blue-200',
    badge: 'bg-green-400',
    gradient: 'bg-gradient-to-br from-green-100 via-blue-50 to-blue-200',
  },
  'Video Lessons': {
    border: 'from-purple-400 to-blue-300',
    iconBg: 'from-purple-200 to-blue-200',
    badge: 'bg-purple-400',
    gradient: 'bg-gradient-to-br from-purple-100 via-blue-50 to-blue-200',
  },
  'Conversation Bubbles': {
    border: 'from-orange-400 to-pink-400',
    iconBg: 'from-orange-200 to-pink-200',
    badge: 'bg-orange-400',
    gradient: 'bg-gradient-to-br from-orange-100 via-pink-50 to-pink-200',
  },
  'Story Time': {
    border: 'from-yellow-400 to-red-400',
    iconBg: 'from-yellow-200 to-red-200',
    badge: 'bg-yellow-400',
    gradient: 'bg-gradient-to-br from-yellow-100 via-red-50 to-red-200',
  },
  'Safety First': {
    border: 'from-blue-400 to-green-400',
    iconBg: 'from-blue-200 to-green-200',
    badge: 'bg-blue-400',
    gradient: 'bg-gradient-to-br from-blue-100 via-green-50 to-green-200',
  },
};

const CONFETTI_COUNT = 12;

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, href, Icon, ctaText = "Let's Go!", className }) => {
  const theme = cardThemes[title] || cardThemes['Alphabet Fun'];
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Confetti burst on click
  const handleConfetti = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        zIndex: 9999,
      });
      // Optionally, navigate after confetti
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    }
  };

  return (
    <a
      ref={cardRef}
      href={href}
      className={cn(
        `group relative block rounded-3xl p-6 ${theme.gradient}
        border-4 bg-clip-padding
        shadow-2xl
        transition-all duration-300
        hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        focus:outline-none focus:ring-4 focus:ring-blue-200
        min-h-[240px] overflow-hidden
        [perspective:800px]`,
        className
      )}
      style={{
        minHeight: 240,
        borderImage: `linear-gradient(135deg, var(--tw-gradient-stops)) 1`,
      }}
      // 3D tilt effect
      onMouseMove={e => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * 12;
        const rotateY = ((x / rect.width) - 0.5) * -12;
        card.style.transform = `scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }}
      onMouseLeave={e => {
        const card = cardRef.current;
        if (card) card.style.transform = '';
      }}
      onClick={handleConfetti}
    >
      {/* Animated gradient border */}
      <div className={`absolute inset-0 rounded-3xl pointer-events-none z-0 animate-gradient-x bg-gradient-to-r ${theme.border} blur-[2px] opacity-60`} />
      {/* Playful badge */}
      <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow ${theme.badge} animate-bounce`}>{title === 'Video Lessons' ? 'NEW' : title === 'Edu-Games' ? 'HOT' : title === 'Safety First' ? 'SAFE' : ''}</span>
      <div className="flex items-center gap-4 mb-4 relative z-20">
        <div className={`rounded-full p-4 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl ${theme.iconBg}`}>
          <Icon className="w-14 h-14 text-blue-700 drop-shadow-lg animate-bounce group-hover:animate-pulse" />
        </div>
        <h3 className="text-2xl font-extrabold text-blue-900 drop-shadow">{title}</h3>
      </div>
      <p className="text-lg text-blue-800 mb-6 drop-shadow-sm relative z-20">{description}</p>
      <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold shadow group-hover:bg-yellow-400 transition relative z-20">
        {ctaText} <ArrowRight className="inline ml-2 w-4 h-4" />
      </span>
      <style jsx>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s linear infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </a>
  );
};

export default FeatureCard;
