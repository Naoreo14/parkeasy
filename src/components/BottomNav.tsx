'use client';

import React from 'react';
import { Map, Search, Activity, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'MAP', icon: Map, path: '/map' },
    { label: 'SEARCH', icon: Search, path: '/search' },
    { label: 'ACTIVITY', icon: Activity, path: '/activity' },
    { label: 'PROFILE', icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex justify-around items-center pt-3 pb-8 px-2 z-50 shadow-[0_-10px_40px_rgb(0,0,0,0.03)]">
      {navItems.map((item) => {
        const isActive = pathname === item.path || (item.path === '/search' && pathname === '/');
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.label}
            href={item.path}
            className={cn(
              "flex flex-col items-center gap-1.5 p-2 transition-all duration-300 relative",
              isActive ? "text-blue-600 scale-110" : "text-slate-400 hover:text-slate-600"
            )}
          >
            {isActive && (
              <span className="absolute -top-1 w-12 h-12 bg-blue-50 rounded-full -z-10 animate-pulse-slow opacity-60"></span>
            )}
            <Icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
            <span className={cn("text-[10px] font-extrabold tracking-widest mt-0.5", isActive ? "opacity-100" : "opacity-60")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
