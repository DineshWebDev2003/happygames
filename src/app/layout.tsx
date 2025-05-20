import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter for a slightly more child-friendly sans-serif
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import MainLayout from '@/components/layout/main-layout';
import logoPath from '@/logo.png';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: 'TN HappyKids Learn - Fun Learning Platform for Kids',
  description: 'TN HappyKids Learn offers interactive alphabet learning, safety education, educational games, audio stories, and AI-powered quizzes for children.',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  icons: {
    icon: [
      { url: logoPath.src, sizes: 'any' }
    ],
    apple: [
      { url: logoPath.src, sizes: 'any' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <MainLayout>
          {children}
        </MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
