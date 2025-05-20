import DialogueClient from '../dialogue-client';
import { Suspense } from 'react';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Helper component for Suspense fallback
function DialoguePageLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <MessageSquare className="w-16 h-16 text-primary animate-spin mb-4" />
      <p className="text-xl text-muted-foreground">Loading Conversation Practice...</p>
    </div>
  );
}

export default function DialoguePage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href="/conversation">
            ← Back to Conversations
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Dialogue Practice</h1>
      </div>
      
      <Suspense fallback={<DialoguePageLoading />}>
        <DialogueClient />
      </Suspense>
    </div>
  );
} 