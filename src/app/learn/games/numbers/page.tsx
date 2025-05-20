"use client";
import dynamic from 'next/dynamic';

// Create a simple loading component
const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-medium">Loading...</p>
      </div>
    </div>
  );
};

// Dynamically import the actual game component with no SSR
const NumberGame = dynamic(
  () => import('./number-game-client'),
  { 
    ssr: false,
    loading: () => <LoadingComponent /> 
  }
);

export default NumberGame;