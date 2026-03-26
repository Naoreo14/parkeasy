'use client';

import React, { useState } from 'react';
import { Search, Banknote, Clock, ChevronRight, Accessibility } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Link from 'next/link';

export default function DestinationSearch() {
  const [radius, setRadius] = useState(800);

  return (
    <div className="flex flex-col h-full bg-[#f8fcfb] relative overflow-hidden font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-0 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <Header />

      {/* Main Content */}
      <main className="flex-1 px-6 pb-28 overflow-y-auto relative z-10 flex flex-col gap-6 mt-4">
        
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
          
          <div className="relative w-full h-2 rounded-full bg-white/60 mb-2">
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
            {/* Custom slider handle */}
            <div 
              className="absolute top-1/2 -mt-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-lg pointer-events-none transition-all"
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
          <button className="flex flex-col items-start p-5 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm hover:bg-white/80 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors">
              <Banknote className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">PRICE</span>
            <span className="text-lg font-bold text-slate-800">Paid</span>
          </button>
          
          <button className="flex flex-col items-start p-5 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm hover:bg-white/80 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors">
              <Accessibility className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">TYPE</span>
            <span className="text-lg font-bold text-slate-800">Disabled</span>
          </button>
        </div>

        <div className="flex-1"></div>

        {/* Recent Searches */}
        <div className="bg-white rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center mb-2 active:scale-[0.98] transition-transform cursor-pointer">
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
        <Link href="/map" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-3xl shadow-xl shadow-blue-500/20 flex items-center justify-center transition-all active:scale-[0.98]">
          Show Results
        </Link>

      </main>

      <BottomNav />

    </div>
  );
}
