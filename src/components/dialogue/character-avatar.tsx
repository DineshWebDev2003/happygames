'use client';

import { cn } from "@/lib/utils";

interface CharacterAvatarProps {
  name: string;
  role: string;
  imageSrc?: string;
  className?: string;
}

export default function CharacterAvatar({ name, role, imageSrc, className }: CharacterAvatarProps) {
  // Get role-specific colors
  const getRoleColors = () => {
    switch (role) {
      case 'Pediatrician':
        return {
          bg: 'bg-blue-100',
          border: 'border-blue-400',
          fallbackBg: 'bg-blue-500',
          emoji: '👨‍⚕️'
        };
      case 'Elementary School Teacher':
        return {
          bg: 'bg-green-100',
          border: 'border-green-400',
          fallbackBg: 'bg-green-500',
          emoji: '👩‍🏫'
        };
      case 'Community Police Officer':
        return {
          bg: 'bg-indigo-100',
          border: 'border-indigo-400',
          fallbackBg: 'bg-indigo-500',
          emoji: '👮'
        };
      case 'Friendly Neighbor':
        return {
          bg: 'bg-yellow-100',
          border: 'border-yellow-400',
          fallbackBg: 'bg-yellow-500',
          emoji: '👋'
        };
      case 'Store Employee':
        return {
          bg: 'bg-orange-100',
          border: 'border-orange-400',
          fallbackBg: 'bg-orange-500',
          emoji: '🛒'
        };
      default:
        return {
          bg: 'bg-gray-100',
          border: 'border-gray-400',
          fallbackBg: 'bg-gray-500',
          emoji: '👤'
        };
    }
  };

  const { bg, border, fallbackBg, emoji } = getRoleColors();

  return (
    <div 
      className={cn(
        "h-12 w-12 rounded-full overflow-hidden border-2",
        border,
        bg,
        className
      )}
    >
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className={cn("h-full w-full flex items-center justify-center", fallbackBg)}>
          <span className="text-lg">{emoji}</span>
        </div>
      )}
    </div>
  );
} 