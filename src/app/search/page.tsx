'use client';

import React, { useState } from 'react';
import { Search, Map, Activity, User, Banknote, Navigation, Clock, ChevronRight, Accessibility } from 'lucide-react';
import Image from 'next/image';

export default function DestinationSearch() {
  const [radius, setRadius] = useState(800);

  return (
    <div className="flex flex-col h-full bg-[#f8fcfb] relative overflow-hidden font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-0 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      {/* Top Header */}
      <header className="flex items-center justify-between px-6 pt-12 pb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="text-blue-700 font-bold text-2xl flex items-center">
            <span className="text-blue-600 mr-2">P</span>
            ParkEasy
          </div>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-200">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-24 overflow-y-auto relative z-10 flex flex-col gap-6 mt-4">
        
        {/* Title Section */}
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Where to?</h1>
          <p className="text-slate-600 mt-2 text-sm font-medium">Set your destination to find available spots.</p>
        </div>

        {/* Search Input */}
        <div className="relative group mt-2">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-600 transition-colors group-focus-within:text-blue-700" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-md border border-white/40 text-slate-900 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium"
            placeholder="Enter street, city, or landmark"
          />
        </div>

        {/* Radius Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-50/80 to-green-100/80 backdrop-blur-md shadow-sm border border-white/50">
          <div className="flex justify-between items-end mb-4">
            <span className="text-xs font-bold text-slate-500 tracking-wider">RADIUS</span>
            <span className="text-lg font-bold text-blue-700">{radius >= 1000 ? `${(radius/1000).toFixed(1)}KM` : `${radius}m`}</span>
          </div>
          
          <div className="relative w-full h-2 rounded-full bg-slate-200/60 mb-2">
            <div 
              className="absolute top-0 left-0 h-full rounded-full bg-blue-500/30" 
              style={{ width: `${((radius - 100) / 1900) * 100}%` }}
            ></div>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* Custom slider handle look-alike - managed by native slider invisibly over it */}
            <div 
              className="absolute top-1/2 -mt-2 w-4 h-4 bg-white rounded-full shadow border border-slate-200 pointer-events-none"
              style={{ left: `calc(${((radius - 100) / 1900) * 100}% - 8px)` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 tracking-wider mt-2">
            <span>100M</span>
            <span>2KM</span>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-start p-5 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm hover:bg-white/80 transition-all text-left">
            <Banknote className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">PRICE</span>
            <span className="text-lg font-bold text-slate-800">Paid</span>
          </button>
          
          <button className="flex flex-col items-start p-5 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm hover:bg-white/80 transition-all text-left">
            <Accessibility className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">TYPE</span>
            <span className="text-lg font-bold text-slate-800">Disabled</span>
          </button>
        </div>

        <div className="flex-1"></div>

        {/* Recent Searches */}
        <div className="bg-white rounded-3xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center mb-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="font-bold text-slate-900 text-sm">Grand Central Terminal</h3>
            <p className="text-xs text-slate-500 mt-0.5">89 E 42nd St, New York</p>
          </div>
          <div className="w-10 flex items-center justify-center text-slate-400">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>

        {/* Show Results Button */}
        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg py-4 rounded-full shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]">
          Show Results
        </button>

      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex justify-around items-center pt-3 pb-6 px-2 z-50 shadow-[0_-10px_40px_rgb(0,0,0,0.03)]">
        <button className="flex flex-col items-center gap-1.5 p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Map className="w-6 h-6" />
          <span className="text-[10px] font-extrabold tracking-wider">MAP</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2 text-blue-600">
          <Search className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] font-extrabold tracking-wider">SEARCH</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Activity className="w-6 h-6" />
          <span className="text-[10px] font-extrabold tracking-wider">ACTIVITY</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-extrabold tracking-wider">PROFILE</span>
        </button>
      </nav>

    </div>
  );
}
