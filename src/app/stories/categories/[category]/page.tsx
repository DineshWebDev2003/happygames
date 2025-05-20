'use client';

import { stories } from '@/data/mock-data';
import { useState } from 'react';
import StoryCard from '@/components/story-card';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Helper function to get translated category name
const getCategoryTranslation = (category: string): string => {
  const translations: Record<string, string> = {
    'honesty': 'நேர்மை',
    'kindness': 'கருணை',
    'wisdom': 'ஞானம்',
    'friendship': 'நட்பு',
    'perseverance': 'விடாமுயற்சி',
    'sharing': 'பகிர்தல்',
    'gratitude': 'நன்றி',
    'respect': 'மரியாதை',
    'humility': 'பணிவு',
    'courage': 'தைரியம்',
    'responsibility': 'பொறுப்புணர்வு'
  };
  
  return translations[category.toLowerCase()] || category;
};

// Helper function to get the display category name with proper capitalization
const getDisplayCategoryName = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  const router = useRouter();
  
  // Convert URL slug to proper category name format for filtering (capitalize first letter)
  const displayCategory = getDisplayCategoryName(params.category);
  
  // Filter stories by category
  const categoryStories = stories.filter(story => 
    story.category.toLowerCase() === params.category.toLowerCase()
  );
  
  // If no stories found or invalid category, display a message
  if (categoryStories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold">
          {language === 'english' ? 'Category Not Found' : 'வகை கிடைக்கவில்லை'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'english' 
            ? 'Sorry, we couldn\'t find any stories in this category.' 
            : 'மன்னிக்கவும், இந்த வகையில் எந்தக் கதைகளையும் கண்டுபிடிக்க முடியவில்லை.'}
        </p>
        <Button onClick={() => router.push('/stories/categories')}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          {language === 'english' ? 'Back to Categories' : 'வகைகளுக்குத் திரும்புங்கள்'}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/stories/categories')}
          className="sm:self-start"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {language === 'english' ? 'All Categories' : 'அனைத்து வகைகளும்'}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setLanguage(prev => prev === 'english' ? 'tamil' : 'english')}
          className="sm:self-end"
        >
          <Globe className="mr-2 h-4 w-4" />
          {language === 'english' ? 'தமிழில் பார்க்க' : 'View in English'}
        </Button>
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center justify-center bg-primary/10 rounded-full px-4 py-1 mb-2">
          <BookOpen className="mr-2 h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {categoryStories.length} {language === 'english' ? 'stories' : 'கதைகள்'}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight">
          {language === 'english' 
            ? `${displayCategory} Stories` 
            : `${getCategoryTranslation(params.category)} கதைகள்`}
        </h1>
        
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          {language === 'english' 
            ? `Explore our collection of moral stories that teach the value of ${displayCategory.toLowerCase()}.` 
            : `${getCategoryTranslation(params.category)} மதிப்பைக் கற்பிக்கும் எங்களின் அறநெறிக் கதைகளின் தொகுப்பை ஆராயுங்கள்.`}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
} 