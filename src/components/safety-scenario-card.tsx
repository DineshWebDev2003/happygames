"use client";

import Image from 'next/image';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import type { SafetyScenario } from '@/data/mock-data';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SafetyScenarioCardProps {
  scenarioItem: SafetyScenario;
}

const SafetyScenarioCard: React.FC<SafetyScenarioCardProps> = ({ scenarioItem }) => {
  // Convert png urls to jpg if needed
  const [imgSrc, setImgSrc] = useState<string>(scenarioItem.imageUrl);
  
  // Handle image error (if PNG doesn't exist, try JPG)
  const handleImageError = () => {
    if (imgSrc.endsWith('.png')) {
      const jpgUrl = imgSrc.replace('.png', '.jpg');
      setImgSrc(jpgUrl);
    } else {
      // If JPG also fails, use placeholder
      setImgSrc(`https://picsum.photos/seed/${scenarioItem.id}/300/150`);
    }
  };

  return (
    <div className={cn("group relative block rounded-3xl p-6 bg-clip-padding shadow-2xl transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] [perspective:800px] bg-gradient-to-br from-pink-100 via-yellow-50 to-yellow-200 border-4 border-transparent", "border-image: linear-gradient(135deg, var(--tw-gradient-stops)) 1;")} style={{ minHeight: 240, borderImage: "linear-gradient(135deg, var(--tw-gradient-stops)) 1" }} onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; const rotateX = ((y / rect.height) - 0.5) * 12; const rotateY = ((x / rect.width) - 0.5) * -12; e.currentTarget.style.transform = `scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}>
      <div className="absolute inset-0 rounded-3xl pointer-events-none z-0 animate-gradient-x bg-gradient-to-r from-pink-400 to-yellow-300 blur-[2px] opacity-60" />
      <CardHeader className="p-4 relative z-20">
        <div className="flex items-start gap-3">
          {scenarioItem.isGoodTouch ? (
            <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0 mt-1" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
          )}
          <div>
            <CardTitle className="text-lg font-semibold text-foreground drop-shadow">{scenarioItem.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1 drop-shadow-sm">{scenarioItem.scenario}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 relative z-20">
        <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden bg-secondary/20">
          <Image
            src={imgSrc}
            alt={scenarioItem.title}
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint={scenarioItem.imageHint}
            onError={handleImageError}
          />
        </div>
        <p className={cn("text-sm p-3 rounded-md drop-shadow-sm", scenarioItem.isGoodTouch ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
          <strong>Explanation:</strong> {scenarioItem.explanation}
        </p>
      </CardContent>
      <style jsx>{`
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s linear infinite; }
        @keyframes gradient-x { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
      `}</style>
    </div>
  );
};

export default SafetyScenarioCard;
