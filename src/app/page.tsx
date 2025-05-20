import FeatureGrid from '@/components/feature-grid';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-12">
      <section className="text-center py-6 sm:py-8 bg-gradient-to-r from-primary via-yellow-300 to-secondary rounded-xl shadow-lg">
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 mx-auto mb-3 sm:mb-4">
           <Image 
            src="/images/kido-avatar.jpg"
            alt="Kido Bot" 
            fill
            style={{ objectFit: 'cover' }}
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
        <FeatureGrid />
      </section>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
