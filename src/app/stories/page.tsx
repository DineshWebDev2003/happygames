'use client'; // Needed if StoryCard has client-side interactions like onReadMore prop passed to quiz page

import StoryCard from '@/components/story-card';
import { stories } from '@/data/mock-data';
import { ChevronsRight, FolderOpen, LibraryBig, Search } from 'lucide-react';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');

  // Get unique categories
  const categories = [...new Set(stories.map(story => story.category))];

  // Filter stories based on selected category and search query
  const filteredStories = stories.filter(story => {
    const matchesCategory = selectedCategory ? story.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? (story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         (story.titleTamil && story.titleTamil.includes(searchQuery.toLowerCase())) ||
         story.content.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <section className="text-center">
        <LibraryBig className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">Story Time Adventures</h1>
        <p className="text-lg text-muted-foreground mb-6">
          {language === 'english' 
            ? 'Listen to wonderful stories and let your imagination soar!' 
            : 'அற்புதமான கதைகளைக் கேட்டு உங்கள் கற்பனையை உயரச் செய்யுங்கள்!'}
        </p>
        
        {/* Categories Button */}
        <div className="mb-6">
          <Link href="/stories/categories" passHref>
            <Button variant="outline" className="mx-auto">
              <FolderOpen className="mr-2 h-4 w-4" />
              {language === 'english' ? 'Browse by Category' : 'வகையின்படி உலாவுங்கள்'}
              <ChevronsRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto mb-6">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={language === 'english' ? "Search stories..." : "கதைகளைத் தேடுங்கள்..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge 
              onClick={() => setSelectedCategory(null)} 
              className={`cursor-pointer hover:bg-primary/90 ${!selectedCategory ? 'bg-primary' : 'bg-secondary'}`}
            >
              {language === 'english' ? 'All' : 'அனைத்தும்'}
            </Badge>
            
            {categories.map(category => (
              <Badge 
                key={category} 
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)} 
                className={`cursor-pointer hover:bg-primary/90 ${category === selectedCategory ? 'bg-primary' : 'bg-secondary'}`}
              >
                {category}
              </Badge>
            ))}
            
            <Badge 
              onClick={() => setLanguage(prev => prev === 'english' ? 'tamil' : 'english')} 
              variant="outline" 
              className="cursor-pointer border-primary text-primary hover:bg-primary/10"
            >
              {language === 'english' ? 'தமிழ்' : 'English'}
            </Badge>
          </div>
        </div>
      </section>

      {filteredStories.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            {language === 'english'
              ? 'No stories found. Try a different search or category.'
              : 'கதைகள் எதுவும் கிடைக்கவில்லை. வேறு தேடலை அல்லது வகையைப் முயற்சிக்கவும்.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
      
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
