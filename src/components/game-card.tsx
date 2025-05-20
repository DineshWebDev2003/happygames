"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';
import type { Game } from '@/data/mock-data';
import { useState } from 'react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const IconComponent = (LucideIcons as any)[game.IconName] || LucideIcons.Gamepad2;
  const [imgError, setImgError] = useState(false);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-accent shrink-0" />
          <CardTitle className="text-base sm:text-xl font-semibold text-primary">{game.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 flex-grow">
         <div className="relative w-full h-24 sm:h-32 mb-2 sm:mb-3 rounded-md overflow-hidden bg-secondary/20">
          <Image
            src={imgError ? `https://picsum.photos/seed/${game.id}/200/120` : `/game-thumbnails/${game.id}.jpg`}
            alt={game.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={game.imageHint}
            onError={() => setImgError(true)}
          />
        </div>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground">{game.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-3 sm:p-4">
        <Link href={game.href} passHref className="w-full">
          <Button variant="secondary" className="w-full text-xs sm:text-sm h-8 sm:h-10">
            Play Now <LucideIcons.Play className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
