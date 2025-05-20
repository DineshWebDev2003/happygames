import { BookOpen } from 'lucide-react';
import LearnCards from '@/components/learn/learn-cards';

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <BookOpen className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">Let's Learn Together!</h1>
        <p className="text-lg text-muted-foreground">
          Explore exciting lessons and games designed just for you.
        </p>
      </section>

      <LearnCards />
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
