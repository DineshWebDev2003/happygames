'use client';
import Link from 'next/link';
import { SmileIcon, UserCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
import logoImg from '@/logo.png';

const AppHeader = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 sm:gap-2 hover:opacity-90 transition-opacity">
          <Image src={logoImg} alt="Website Icon" width={48} height={48} className="h-10 w-10 sm:h-12 sm:w-12" />
          <h1 className="text-xl sm:text-2xl font-bold truncate">TN HappyKids Learn</h1>
        </Link>
        <div>
          {user ? (
            <Link href="/auth" title="Profile">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-accent object-cover hover:scale-105 transition-transform"
              />
            </Link>
          ) : (
            <Link href="/auth" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/80 transition-colors text-sm sm:text-base">
              <UserCircle2 className="w-4 h-4 sm:w-6 sm:h-6" /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
