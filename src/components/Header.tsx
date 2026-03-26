'use client';

import React from 'react';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 pt-12 pb-4 relative z-50 bg-[#f8fcfb]/40 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-slate-900 font-bold text-2xl flex items-center tracking-tight">
          <span className="text-blue-600 mr-2 font-black italic">P</span>
          ParkEasy
        </div>
      </div>
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
          alt="User Avatar" 
          className="w-full h-full object-cover" 
        />
      </div>
    </header>
  );
}
