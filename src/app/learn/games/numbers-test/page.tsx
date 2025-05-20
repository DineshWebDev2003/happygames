'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ClientComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Number Game</h1>
        <p className="mb-4">
          This is a client-side only component that avoids hydration issues.
        </p>
        <p>
          Browser information is available: {typeof window !== 'undefined' ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
};

// Export a wrapper component that uses dynamic import with no SSR
export default dynamic(() => Promise.resolve(ClientComponent), { ssr: false }); 