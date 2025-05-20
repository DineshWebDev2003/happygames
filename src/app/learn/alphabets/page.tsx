"use client";

import AlphabetCard from '@/components/alphabet-card';
import { alphabets } from '@/data/mock-data';
import { Palette } from 'lucide-react';
import { useState } from 'react';
import AlphabetSlideshow from '@/components/alphabet-slideshow';

export default function AlphabetsPage() {
  const [slideshow, setSlideshow] = useState(false);

  return (
    <div className="space-y-8">
      <section className="text-center">
        <Palette className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">Alphabet Adventure!</h1>
        <p className="text-lg text-muted-foreground">
          Learn each letter from A to Z. Click the speaker to hear them!
        </p>
        <button
          className="mt-4 px-6 py-2 rounded-lg bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold shadow"
          onClick={() => setSlideshow((s) => !s)}
        >
          {slideshow ? 'Exit Slideshow' : 'Start Slideshow'}
        </button>
      </section>

      {slideshow ? (
        <AlphabetSlideshow onExit={() => setSlideshow(false)} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {alphabets.map((alpha) => (
            <AlphabetCard key={alpha.letter} alphabet={alpha} />
          ))}
        </div>
      )}
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
