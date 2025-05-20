import { stories } from '@/data/mock-data';
import type { Story } from '@/data/mock-data';
import StoryDetailClient from './story-detail-client';

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const story = stories.find(s => s.id === params.id);
  
  return <StoryDetailClient story={story} />;
} 