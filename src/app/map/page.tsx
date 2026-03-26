'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Map as MapIcon, Sliders, Navigation, Info, Car, Navigation2, Navigation2Off, MapPin, StopCircle, Clock, CheckCircle, X, ChevronRight, CornerUpRight, ArrowUpRight, LocateFixed } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock parking data
const initialSpots = [
  { id: 1, x: 25, y: 35, status: 'FREE' },
  { id: 2, x: 65, y: 45, status: 'FREE' },
  { id: 3, x: 20, y: 70, status: 'FREE' },
  { id: 4, x: 75, y: 25, status: 'FREE' },
];

export default function MapView() {
  const { t } = useApp();
  const [spots, setSpots] = useState(initialSpots);
  const [showInsight, setShowInsight] = useState(true);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ x: number, y: number }>({ x: 50, y: 50 });
  const [isLocating, setIsLocating] = useState(true);

  // Geolocation Simulation/Integration
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      setIsLocating(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        // Map actual GPS to map % (Simulated mapping for preview)
        // In a real app, this would use a map library like Mapbox or Google Maps
        const simulatedX = 40 + (Math.random() * 20); // Keep it centered-ish for the demo
        const simulatedY = 40 + (Math.random() * 20);
        setUserLocation({ x: simulatedX, y: simulatedY });
        setIsLocating(false);
      },
      (error) => {
        console.error("Poisition error", error);
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Simulate real-time parking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(current => {
        return current.map(spot => {
          if (Math.random() > 0.95) {
            return { ...spot, status: Math.random() > 0.4 ? 'FREE' : 'BUSY' };
          }
          return spot;
        });
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStartNavigation = () => {
    setIsNavigating(true);
    setShowInsight(false);
  };

  const handleArrive = () => {
    setIsNavigating(false);
    setIsSessionActive(true);
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-950 relative overflow-hidden font-sans">
      {!isSessionActive && !isNavigating && <Header />}

      {/* Navigation Top Banner */}
      {isNavigating && (
        <div className="fixed top-0 left-0 w-full z-50 animate-in slide-in-from-top duration-500">
          <div className="bg-[#0047AB] text-white px-6 pt-12 pb-6 flex items-center gap-4 shadow-2xl">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              <CornerUpRight className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-black leading-tight tracking-tight">{t('turn_right')}</h2>
              <p className="text-blue-200 font-bold text-sm tracking-wide uppercase">In 150m onto 4th Street</p>
            </div>
          </div>
        </div>
      )}

      {/* Active Session Top Bar */}
      {isSessionActive && (
        <div className="fixed top-0 left-0 w-full z-50 animate-in slide-in-from-top duration-500">
          <div className="bg-[#0047AB] text-white px-6 pt-12 pb-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black opacity-60 tracking-widest uppercase italic">ACTIVE SESSION</span>
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

      {/* Satellite Map Content */}
      <main className="flex-1 relative overflow-hidden bg-slate-900">
        
        {/* Real-looking Satellite Background (Simulated with patterns and shapes) */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756eaa539?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-[1.2]"></div>
        </div>

        {/* Building Blocks Overlay - Mission District Look */}
        <div className={cn("absolute inset-0 transition-opacity duration-1000 overflow-hidden", (isNavigating || isSessionActive) && "opacity-40")}>
           {/* Grid Lines */}
          <div className="absolute inset-0 opacity-10 bg-[length:100px_100px]" 
               style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)' }}></div>
          
          {/* Blocks */}
          <div className="absolute top-[20%] left-[10%] w-[15%] h-[30%] bg-slate-800/80 border border-slate-700 rounded-lg shadow-2xl"></div>
          <div className="absolute top-[20%] left-[30%] w-[25%] h-[15%] bg-slate-800/80 border border-slate-700 rounded-lg shadow-2xl"></div>
          <div className="absolute top-[40%] left-[30%] w-[25%] h-[15%] bg-slate-800/80 border border-slate-700 rounded-lg shadow-2xl"></div>
          <div className="absolute top-[60%] left-[10%] w-[45%] h-[20%] bg-slate-800/80 border border-slate-700 rounded-lg shadow-2xl"></div>
          <div className="absolute top-[20%] left-[60%] w-[30%] h-[60%] bg-slate-800/80 border border-slate-700 rounded-lg shadow-2xl"></div>
          
          {/* Roads */}
          <div className="absolute top-[55%] left-0 w-full h-12 bg-slate-800/40 border-y border-slate-700/50 backdrop-blur-[2px]"></div>
          <div className="absolute left-[55%] top-0 h-full w-12 bg-slate-800/40 border-x border-slate-700/50 backdrop-blur-[2px]"></div>
        </div>

        {/* Route Visualization */}
        {isNavigating && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-in fade-in duration-1000">
            <path 
              d="M 500 650 L 500 500 L 350 500 L 350 250" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="12" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="opacity-40"
              vectorEffect="non-scaling-stroke"
            />
            <path 
              d="M 500 650 L 500 500 L 350 500 L 350 250" 
              fill="none" 
              stroke="#00ffff" 
              strokeWidth="12" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeDasharray="30 25"
              className="animate-dash filter drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}

        {/* Floating Search Bar */}
        {!isSessionActive && !isNavigating && (
          <div className="absolute top-6 left-6 right-6 z-20 animate-in slide-in-from-top duration-700">
            <div className="flex items-center gap-2 px-5 py-4 bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10">
              <Search className="w-6 h-6 text-slate-500" />
              <input 
                type="text" 
                placeholder={t('search_placeholder')}
                className="flex-1 bg-transparent outline-none text-base font-bold text-white placeholder:text-slate-500"
              />
              <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400">
                 <Sliders className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* Current Location Blue Dot */}
        <div 
          className="absolute z-30 transition-all duration-1000 ease-out"
          style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <div className={cn(
              "absolute -inset-10 rounded-full animate-ping opacity-20",
              isSessionActive ? "bg-emerald-400" : "bg-blue-400"
            )}></div>
            <div className={cn(
              "absolute -inset-6 rounded-full bg-blue-500/20 blur-md",
              isSessionActive && "bg-emerald-500/20"
            )}></div>
            <div className={cn(
              "w-8 h-8 rounded-full border-4 border-white shadow-2xl flex items-center justify-center transition-all duration-500",
              isSessionActive ? "bg-emerald-600" : "bg-blue-600"
            )}>
              {isSessionActive ? (
                <CheckCircle className="w-4 h-4 text-white" strokeWidth={3} />
              ) : (
                <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
              )}
            </div>
            
            {/* YOU ARE PARKED Tooltip */}
            {isSessionActive && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-5 py-2.5 rounded-2xl shadow-2xl border border-slate-100 whitespace-nowrap animate-in fade-in slide-in-from-bottom-5">
                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest italic flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  YOU ARE PARKED
                </span>
                <div className="absolute -bottom-2 left-1/2 -ml-2.5 w-5 h-5 bg-white rotate-45 border-r border-b border-slate-100"></div>
              </div>
            )}
          </div>
        </div>

        {/* Parking Markers - Real-time & Green */}
        {spots.map(spot => (
          spot.status === 'FREE' && (
            <div 
              key={spot.id} 
              className={cn(
                "absolute transition-opacity duration-1000 z-20",
                (isSessionActive || isNavigating) && "opacity-20 pointer-events-none"
              )}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-emerald-500 px-2 py-2 rounded-xl shadow-[0_8px_15px_rgba(16,185,129,0.3)] flex items-center justify-center mb-1 relative z-20 border border-white/20">
                  <span className="text-xs font-black text-white italic">P</span>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 relative z-10 shadow-lg">
                  <span className="text-[10px] font-black tracking-widest text-emerald-400">{t('free')}</span>
                </div>
              </div>
            </div>
          )
        ))}

        {/* Map Controls */}
        {!isSessionActive && !isNavigating && (
          <div className="absolute right-6 bottom-48 flex flex-col gap-4 z-40">
            <button className="w-16 h-16 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-slate-800 active:scale-95 transition-all">
              <LocateFixed className="w-7 h-7" />
            </button>
            <button className="w-16 h-16 bg-blue-600 rounded-3xl shadow-2xl shadow-blue-500/40 flex items-center justify-center text-white active:scale-95 transition-all">
              <Navigation className="w-7 h-7" />
            </button>
          </div>
        )}

        {/* Predictive Insight Card */}
        {!isSessionActive && !isNavigating && showInsight && (
          <div className="absolute bottom-28 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-white/95 backdrop-blur-md rounded-[48px] p-8 shadow-2xl border border-white/40 flex flex-col gap-8">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase block mb-1">PREDICTIVE INSIGHT</span>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Mission District</h2>
                </div>
                <div className="bg-emerald-500 text-white px-5 py-2.5 rounded-3xl flex items-center gap-2 font-black shadow-lg shadow-emerald-500/30">
                  <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 10V3L4 14H11V21L20 10H13Z" />
                  </svg>
                  <span className="text-lg">80%</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[32px] p-6 flex gap-5 border border-slate-100">
                <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                    <path d="M3 11l6 6L21 5" />
                  </svg>
                </div>
                <p className="text-slate-600 text-[15px] leading-relaxed font-bold">
                  High chance of finding a spot here. <span className="text-blue-600">4 spots</span> just opened up within 200m of your arrival.
                </p>
              </div>

              <button 
                onClick={handleStartNavigation} 
                className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-black text-2xl py-6 rounded-[40px] flex items-center justify-center gap-4 shadow-2xl shadow-blue-900/30 active:scale-[0.98] transition-all"
              >
                {t('navigate_here')}
                <Car className="w-8 h-8" />
              </button>
            </div>
          </div>
        )}

        {/* Navigation Info Bar */}
        {isNavigating && (
          <div className="absolute bottom-28 left-4 right-4 z-50 animate-in slide-in-from-bottom-10 duration-700">
            <div className="bg-white rounded-[40px] p-7 shadow-2xl border border-slate-200 flex items-center justify-between">
               <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
                    <Navigation2 className="w-9 h-9 text-blue-600 fill-blue-600/10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 leading-none tracking-tight">0.8 km</h3>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1.5 italic">5 MIN REMAINING</p>
                  </div>
               </div>
               <button onClick={handleArrive} className="bg-[#0047AB] text-white px-10 h-16 rounded-[28px] font-black text-lg tracking-widest uppercase shadow-xl shadow-blue-500/30 active:scale-95 transition-all">
                  {t('arrive')}
               </button>
            </div>
          </div>
        )}

        {/* End Session Button */}
        {isSessionActive && (
          <div className="absolute bottom-28 left-4 right-4 z-50 animate-in slide-in-from-bottom-10 duration-700">
            <Link 
              href="/session-ended"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-2xl py-7 rounded-[48px] flex flex-col items-center justify-center gap-1 shadow-2xl shadow-red-500/40 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <StopCircle className="w-9 h-9" />
                <span>{t('end_session')}</span>
              </div>
              <span className="text-[11px] opacity-70 font-black tracking-widest uppercase italic">TAP TO MARK AS FREE & LIBERATE SPOT</span>
            </Link>
          </div>
        )}

      </main>

      {!isNavigating && <BottomNav />}
    </div>
  );
}
