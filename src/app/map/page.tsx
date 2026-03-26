'use client';

import React, { useState, useEffect } from 'react';
import { Search, Map as MapIcon, Sliders, Navigation, Info, Car, Navigation2, Navigation2Off, MapPin, StopCircle, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Link from 'next/link';
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
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(current => {
        return current.map(spot => {
          if (Math.random() > 0.9) {
            return { ...spot, status: Math.random() > 0.2 ? 'FREE' : 'BUSY' };
          }
          return spot;
        });
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStartSession = () => {
    setIsSessionActive(true);
    setShowInsight(false);
    setSessionStartTime(Date.now());
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden font-sans">
      {!isSessionActive && <Header />}

      {/* Active Session Top Bar */}
      {isSessionActive && (
        <div className="fixed top-0 left-0 w-full z-50 animate-in slide-in-from-top duration-500">
          <div className="bg-blue-600 text-white px-6 pt-12 pb-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black opacity-60 tracking-widest uppercase">PARKING SESSION</span>
                <h2 className="text-xl font-black">Mission District</h2>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black opacity-60 tracking-widest uppercase">DURATION</span>
              <h2 className="text-xl font-black tabular-nums">00:04:12</h2>
            </div>
          </div>
        </div>
      )}

      {/* Map Content */}
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

        {/* Floating Search Bar on Map (Hidden when session active) */}
        {!isSessionActive && (
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
        )}

        {/* Current Location / Parked Location */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000">
          <div className="relative">
            <div className={cn(
              "absolute -inset-6 bg-blue-500/20 rounded-full animate-ping",
              isSessionActive ? "bg-emerald-500/20" : "bg-blue-500/20"
            )}></div>
            <div className={cn(
              "w-6 h-6 rounded-full border-4 border-white shadow-xl flex items-center justify-center transition-colors duration-500",
              isSessionActive ? "bg-emerald-600" : "bg-blue-600"
            )}>
              {isSessionActive ? <CheckCircle className="w-3 h-3 text-white" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            {isSessionActive && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 whitespace-nowrap">
                <span className="text-[10px] font-black text-emerald-600">YOU ARE PARKED</span>
                <div className="absolute -bottom-1 left-1/2 -ml-1 w-2 h-2 bg-white rotate-45 border-r border-b border-slate-100"></div>
              </div>
            )}
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
                <div className={cn(
                  "px-1.5 py-1 rounded-lg shadow-lg flex items-center justify-center -mb-1 relative z-20",
                  isSessionActive ? "bg-slate-500/40" : "bg-emerald-600"
                )}>
                  <span className="text-[10px] font-black text-white italic">P</span>
                </div>
                <div className="bg-white px-2 py-0.5 rounded-md shadow-md border border-slate-100 relative z-10">
                  <span className={cn(
                    "text-[10px] font-bold tracking-tighter",
                    isSessionActive ? "text-slate-400" : "text-emerald-600"
                  )}>FREE</span>
                </div>
              </div>
            </div>
          )
        ))}

        {/* Floating Action Buttons */}
        <div className="absolute right-6 bottom-48 flex flex-col gap-3 z-30">
          <button className="w-14 h-14 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 active:scale-95 transition-transform">
            <Sliders className="w-6 h-6" />
          </button>
          <button className="w-14 h-14 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center text-white active:scale-95 transition-transform animate-pulse">
            <Navigation className="w-6 h-6" />
          </button>
        </div>

        {/* Predictive Insight Card (Only when no session) */}
        {!isSessionActive && showInsight && (
          <div className="absolute bottom-28 left-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-900/10 border border-slate-100 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase block mb-1">PREDICTIVE INSIGHT</span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Mission District</h2>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl flex items-center gap-2 font-black">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 10V3L4 14H11V21L20 10H13Z" />
                  </svg>
                  <span>80%</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6 flex gap-4 border border-slate-100/50">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M3 11l6 6L21 5" />
                  </svg>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-bold">
                  High chance of finding a spot here. <span className="text-blue-600">4 spots</span> just opened up within 200m of your arrival.
                </p>
              </div>

              <button 
                onClick={handleStartSession}
                className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-black text-xl py-5 rounded-[40px] flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/10 transition-all active:scale-[0.98]"
              >
                Navigate Here
                <Car className="w-7 h-7" />
              </button>
            </div>
          </div>
        )}

        {/* End Session Button (Only when active) */}
        {isSessionActive && (
          <div className="absolute bottom-28 left-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <Link 
              href="/session-ended"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-xl py-6 rounded-[40px] flex items-center justify-center gap-4 shadow-2xl shadow-red-500/20 flex-col"
            >
              <div className="flex items-center gap-4">
                <StopCircle className="w-8 h-8" />
                End Parking Session
              </div>
              <span className="text-[10px] opacity-80 font-black tracking-widest uppercase mt-1">TAP TO FINALIZE AND MARK AS FREE</span>
            </Link>
          </div>
        )}

      </main>

      <BottomNav />
    </div>
  );
}
