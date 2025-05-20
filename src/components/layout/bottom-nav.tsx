'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, GraduationCap, LibraryBig, ShieldCheck, MessageSquare, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

// Define the base nav items
const baseNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/learn', label: 'Learn', icon: GraduationCap },
  { href: '/stories', label: 'Stories', icon: LibraryBig },
  { href: '/safety', label: 'Safety', icon: ShieldCheck },
  { href: '/conversation', label: 'Conversation', icon: MessageSquare },
];

const BottomNav = () => {
  const pathname = usePathname();
  
  // Dynamically adjust navigation items based on current path
  const navItems = useMemo(() => {
    // If we're in the stories section, replace the Stories nav item with Categories
    if (pathname.startsWith('/stories') && pathname !== '/stories') {
      return baseNavItems.map(item => {
        if (item.href === '/stories') {
          return { href: '/stories/categories', label: 'Categories', icon: FolderOpen };
        }
        return item;
      });
    }
    return baseNavItems;
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-top md:hidden z-50">
      <div className="container mx-auto px-1">
        <ul className="flex justify-around items-center h-14">
          {navItems.map((item) => {
            const isActive = 
              item.href === pathname || 
              (item.href !== '/' && pathname.startsWith(item.href) && 
               // Special case for Categories to avoid marking it active when on normal stories page
               !(item.href === '/stories/categories' && pathname === '/stories'));
              
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center justify-center p-1 rounded-lg transition-colors w-14 h-14',
                    isActive ? 'text-primary scale-105' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <item.icon className={cn('w-5 h-5 mb-0.5 transition-transform', isActive ? 'animate-bounce-short' : '')} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx global>{`
        @keyframes bounce-short {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-short {
          animation: bounce-short 0.3s ease-in-out;
        }
      `}</style>
    </nav>
  );
};

export default BottomNav;
