"use client";

import VideoLessonCard from '@/components/video-lesson-card';
import { videoLessons } from '@/data/mock-data';
import { Video, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export default function VideosPage() {
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(videoLessons.map(lesson => lesson.category)));

  // Filter videos based on search and category
  const filteredLessons = videoLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? lesson.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pb-32">
        <Video className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-3 sm:mb-4" />
        <h1 className="text-xl sm:text-3xl font-bold mb-2 text-center px-4">Sign in to continue</h1>
        <p className="text-sm sm:text-lg text-muted-foreground mb-3 sm:mb-4 text-center px-4">You must be signed in to watch video lessons.</p>
        <Link href="/auth" className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-accent text-accent-foreground font-bold shadow hover:bg-accent/80 transition-colors text-sm sm:text-base">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 sm:p-8 mb-4 sm:mb-8 shadow-md">
        <section className="text-center max-w-3xl mx-auto">
          <Video className="w-10 h-10 sm:w-16 sm:h-16 mx-auto text-indigo-600 mb-2 sm:mb-4" />
          <h1 className="text-xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-1 sm:mb-2">
            Educational Videos
          </h1>
          <p className="text-xs sm:text-lg text-gray-600 px-2">
            Watch fun educational videos and test your knowledge with interactive quizzes!
          </p>
          
          <div className="mt-3 sm:mt-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              type="text" 
              placeholder="Search for videos..." 
              className="pl-9 bg-white border-indigo-200 text-xs sm:text-sm h-8 sm:h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-4 justify-center">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                selectedCategory === null 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-indigo-600 border border-indigo-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                  selectedCategory === category 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-indigo-600 border border-indigo-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      </div>
      
      {filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredLessons.map((lesson) => (
            <VideoLessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="text-center py-6 sm:py-12">
          <p className="text-base sm:text-xl text-gray-500">No videos match your search criteria</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-1 sm:py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 text-xs sm:text-base"
          >
            Clear filters
          </button>
        </div>
      )}
      
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
} 