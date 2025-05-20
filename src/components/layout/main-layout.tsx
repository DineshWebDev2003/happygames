import type React from 'react';
import AppHeader from './app-header';
import BottomNav from './bottom-nav';
import KidoChatbot from '../kido-chatbot';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-3 py-4 sm:px-6 sm:py-8 lg:px-8 overflow-x-hidden max-w-full">
        {children}
      </main>
      <BottomNav />
      <KidoChatbot />
    </div>
  );
};

export default MainLayout;
