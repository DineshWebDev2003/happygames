import DialogueClient from './dialogue-client';
import { MessageSquare, MessageCircle, Users } from 'lucide-react';
import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function ConversationPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <MessageSquare className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">Conversation Practice</h1>
        <p className="text-lg text-muted-foreground">
          Practice conversations with different people and learn important social skills.
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              <CardTitle>Dialogue Practice</CardTitle>
            </div>
            <CardDescription>Practice conversations through interactive dialogue</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Choose from different scenarios and practice what to say in various situations with a virtual conversation partner.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/conversation/dialogue">Start Dialogue Practice</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              <CardTitle>Speech Bubble Practice</CardTitle>
            </div>
            <CardDescription>Learn through illustrated conversations with speech bubbles</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Practice conversations with doctors, police officers, and teachers through illustrated characters with speech bubbles.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/conversation/practice">Try Speech Bubble Practice</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              <CardTitle>Illustrated Demo</CardTitle>
            </div>
            <CardDescription>See examples of illustrated conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              View examples of illustrated conversation scenarios with different characters to help children understand social interactions.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/conversation/illustration-demo">View Demo</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
} 