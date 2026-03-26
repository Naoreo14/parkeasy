'use client';

import React, { useState, useEffect } from 'react';
import { Search, Map as MapIcon, Sliders, Navigation, Info, Car, Navigation2, Navigation2Off, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock parking data
const initialSpots = [
  { id: 1, x: 25, y: 30, status: 'FREE' },
  { id: 2, x: 65, y: 45, status: 'FREE' },
  { id: 3, x: 40, y: 60, status: 'FREE' },
  { id: 4, x: 80, y: 25, status: 'FREE' },
];

export default function MapView() {
  const [spots, setSpots] = useState(initialSpots);
  const [showInsight, setShowInsight] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(current => {
        return current.map(spot => {
          // 10% chance to toggle a spot (for simulation)
          if (Math.random() > 0.9) {
            return { ...spot, status: Math.random() > 0.2 ? 'FREE' : 'BUSY' };
          }
          return spot;
        });
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden font-sans">
      <Header />

      {/* Map Content - Simulated with a Grid and SVGs */}
      <main className="flex-1 relative overflow-hidden bg-[#e5e9ec]">
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Simulated Streets */}
        <div className="absolute inset-0">
          <div className="absolute top-[20%] left-0 w-full h-8 bg-white/40 border-y border-white/20 shadow-inner"></div>
          <div className="absolute top-[50%] left-0 w-full h-12 bg-white/40 border-y border-white/20 shadow-inner"></div>
          <div className="absolute top-[80%] left-0 w-full h-8 bg-white/40 border-y border-white/20 shadow-inner"></div>
          <div className="absolute left-[30%] top-0 h-full w-8 bg-white/40 border-x border-white/20 shadow-inner"></div>
          <div className="absolute left-[60%] top-0 h-full w-12 bg-white/40 border-x border-white/20 shadow-inner"></div>
        </div>

        {/* Floating Search Bar on Map */}
        <div className="absolute top-4 left-6 right-6 z-20">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/40">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for a parking zone" 
              className="flex-1 bg-transparent outline-none text-sm font-medium text-slate-800 placeholder:text-slate-400"
            />
            <div className="w-px h-4 bg-slate-200 mx-2"></div>
            <Sliders className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        {/* Current Location Blue Dot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
          </div>
        </div>

        {/* Parking Markers */}
        {spots.map(spot => (
          spot.status === 'FREE' && (
            <div 
              key={spot.id} 
              className="absolute transition-all duration-1000 z-10"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-emerald-600 px-1.5 py-1 rounded-lg shadow-lg flex items-center justify-center -mb-1 relative z-20">
                  <span className="text-[10px] font-black text-white italic">P</span>
                </div>
                <div className="bg-white px-2 py-0.5 rounded-md shadow-md border border-slate-100 relative z-10">
                  <span className="text-[10px] font-bold text-emerald-600 tracking-tighter">FREE</span>
                </div>
              </div>
            </div>
          )
        ))}

        {/* Floating Action Buttons */}
        <div className="absolute right-6 bottom-48 flex flex-col gap-3 z-30">
          <button className="w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 active:scale-95 transition-transform">
            <Sliders className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center text-white active:scale-95 transition-transform">
            <Navigation className="w-5 h-5" />
          </button>
        </div>

        {/* Predictive Insight Card */}
        {showInsight && (
          <div className="absolute bottom-28 left-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-slate-900/10 border border-slate-100 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase block mb-1">PREDICTIVE INSIGHT</span>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Mission District</h2>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 font-bold">
                  <div className="flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 10V3L4 14H11V21L20 10H13Z" />
                    </svg>
                  </div>
                  <span>80%</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex gap-4 border border-slate-100/50">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 11l6 6L21 5" />
                  </svg>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-bold">
                  High chance of finding a spot here. <span className="text-blue-600">4 spots</span> just opened up within 200m of your arrival.
                </p>
              </div>

              <button className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98]">
                Navigate Here
                <Car className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

      </main>

      <BottomNav />
    </div>
  );
}
