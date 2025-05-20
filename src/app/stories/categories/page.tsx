'use client';

import { stories } from '@/data/mock-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function StoryCategoriesPage() {
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  
  // Get all categories and count stories in each
  const categories = Array.from(new Set(stories.map(story => story.category)));
  
  const getCategoryTranslation = (category: string): string => {
    const translations: Record<string, string> = {
      'Honesty': 'நேர்மை',
      'Kindness': 'கருணை',
      'Wisdom': 'ஞானம்',
      'Friendship': 'நட்பு',
      'Perseverance': 'விடாமுயற்சி',
      'Sharing': 'பகிர்தல்',
      'Gratitude': 'நன்றி',
      'Respect': 'மரியாதை',
      'Humility': 'பணிவு',
      'Courage': 'தைரியம்',
      'Responsibility': 'பொறுப்புணர்வு'
    };
    
    return translations[category] || category;
  };
  
  const categoryData = categories.map(category => ({
    name: category,
    translatedName: getCategoryTranslation(category),
    count: stories.filter(story => story.category === category).length,
    slug: category.toLowerCase()
  }));
  
  return (
    <div className="space-y-8 pb-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {language === 'english' ? 'Story Categories' : 'கதை வகைகள்'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'english' 
            ? 'Explore stories by moral values and lessons' 
            : 'அறநெறி மதிப்புகள் மற்றும் பாடங்கள் மூலம் கதைகளை ஆராயுங்கள்'}
        </p>
        <Button
          variant="ghost"
          onClick={() => setLanguage(prev => prev === 'english' ? 'tamil' : 'english')}
          className="mt-2"
        >
          {language === 'english' ? 'தமிழில் பார்க்க' : 'View in English'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.map((category) => (
          <Card key={category.name} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle>
                {language === 'english' ? category.name : category.translatedName}
              </CardTitle>
              <CardDescription>
                {category.count} {language === 'english' ? 'stories' : 'கதைகள்'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link 
                href={`/stories/categories/${category.slug}`}
                passHref
              >
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {language === 'english' ? 'View Stories' : 'கதைகளைக் காண'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 