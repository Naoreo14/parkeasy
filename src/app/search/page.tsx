'use client';

import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, MapPin, Navigation, Sliders, ArrowRight, Accessibility, Truck, LocateFixed, Clock, CheckCircle, SlidersHorizontal, ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

export default function UnifiedSearch() {
  const { t } = useApp();
  const [radius, setRadius] = useState(800);
  const [priceFilter, setPriceFilter] = useState<'any' | 'free' | 'paid'>('any');
  const [typeFilter, setTypeFilter] = useState<'regular' | 'disabled' | 'delivery'>('regular');
  const [spots, setSpots] = useState(initialSpots);
  const [userLocation, setUserLocation] = useState({ x: 50, y: 50 });
  const [showFilters, setShowFilters] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const router = useRouter();

  // Handle URL Search Params for Navigation Mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('nav') === 'true') {
      setIsNavigating(true);
      setShowFilters(false);
    }
  }, []);

  // Geolocation & Simulation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(current => current.map(spot => 
        Math.random() > 0.95 ? { ...spot, status: Math.random() > 0.4 ? 'FREE' : 'BUSY' } : spot
      ));
    }, 4000);

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => setUserLocation({ x: 40 + Math.random() * 20, y: 40 + Math.random() * 20 }),
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-950 relative overflow-hidden font-sans">
      
      {/* 1. Map Layer (Background) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756eaa539?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-[1.2] opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-slate-900/60 transition-opacity duration-700"></div>
        
        {/* Building Blocks */}
        <div className={cn("absolute inset-0 opacity-30 transition-opacity duration-1000", isNavigating && "opacity-10")}>
          <div className="absolute top-[20%] left-[10%] w-[15%] h-[30%] bg-slate-800 border border-slate-700 rounded-lg shadow-2xl"></div>
          <div className="absolute top-[40%] left-[30%] w-[25%] h-[15%] bg-slate-800 border border-slate-700 rounded-lg shadow-2xl"></div>
          <div className="absolute top-[60%] left-[15%] w-[45%] h-[20%] bg-slate-800 border border-slate-700 rounded-lg shadow-2xl"></div>
        </div>

        {/* Route Visualization */}
        {isNavigating && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-in fade-in duration-1000">
            <path 
              d="M 500 800 L 500 500 L 350 500 L 350 250" 
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

        {/* User Marker */}
        <div 
          className="absolute z-20 transition-all duration-1000 ease-out"
          style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <div className="absolute -inset-10 rounded-full animate-ping opacity-10 bg-blue-400"></div>
            <div className="w-8 h-8 rounded-full border-4 border-white bg-blue-600 shadow-2xl shadow-blue-500/50 flex items-center justify-center">
               <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
            </div>
          </div>
        </div>

        {/* Parking Spots */}
        {spots.map(spot => spot.status === 'FREE' && (
          <div key={spot.id} className={cn("absolute z-10 transition-opacity duration-1000", isNavigating && "opacity-20")} style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
            <Link href="/spot-detail" className="flex flex-col items-center animate-in fade-in zoom-in duration-500 cursor-pointer">
              <div className="bg-emerald-500 px-2.5 py-2.5 rounded-xl shadow-lg border border-white/20 mb-1 active:scale-90 transition-all">
                <span className="text-xs font-black text-white italic">P</span>
              </div>
              <span className="text-[10px] font-black tracking-widest text-emerald-400 bg-slate-900/80 px-2 rounded uppercase border border-white/5 shadow-2xl">{t('free')}</span>
            </Link>
          </div>
        ))}
      </div>

      {/* 2. UI Overlay Layer */}
      {!isNavigating && <Header />}

      {/* Navigation Top Banner */}
      {isNavigating && (
        <div className="fixed top-0 left-0 w-full z-50 animate-in slide-in-from-top duration-500">
          <div className="bg-[#0047AB] text-white px-8 pt-16 pb-8 flex items-center gap-6 shadow-2xl border-b border-white/10">
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center shadow-inner backdrop-blur-md">
              <span className="text-3xl font-black">↗</span>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black leading-tight tracking-tight">Turn Right</h2>
              <p className="text-blue-200 font-bold text-sm tracking-wide uppercase mt-1">In 150m onto 4th Street</p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 px-6 pb-32 relative z-30 flex flex-col justify-between">
        
        {/* Top Search Overlay */}
        {!isNavigating && (
          <div className="flex flex-col gap-4 mt-4 animate-in slide-in-from-top duration-700">
             <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder={t('search_placeholder')}
                  className="w-full bg-slate-900/90 backdrop-blur-xl border border-white/10 py-5 pl-14 pr-16 rounded-3xl shadow-2xl text-white font-bold placeholder:text-slate-500 outline-none focus:border-blue-500/50 transition-all"
                />
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl flex items-center justify-center transition-all",
                    showFilters ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                  )}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
             </div>
          </div>
        )}

        {/* Spacing for Nav */}
        {isNavigating && <div></div>}

        {/* Bottom Filter/Action Panel */}
        {!isNavigating && (
          <div className={cn(
            "bg-white/95 backdrop-blur-2xl rounded-[40px] p-6 shadow-2xl border border-white/40 transition-all duration-700 flex flex-col gap-6",
            showFilters ? "h-[440px] mb-4" : "h-[160px] mb-4"
          )}>
            {/* Handle/Toggle */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex flex-col items-center gap-2 -mt-2 mb-2"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
              {!showFilters && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('preferences')}</p>}
            </button>

            {showFilters && (
              <div className="flex flex-col gap-8 animate-in fade-in duration-500">
                {/* Radius */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-slate-800 font-black text-sm uppercase tracking-widest">
                    <span>{t('radius')}</span>
                    <span className="text-blue-600 tabular-nums">{radius}m</span>
                  </div>
                  <input 
                    type="range" min="100" max="2000" step="100" value={radius} 
                    onChange={(e) => setRadius(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Price & Type Filters */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-50 p-1.5 rounded-3xl flex gap-1 border border-slate-100">
                      <button onClick={() => setPriceFilter('free')} className={cn("flex-1 py-2 rounded-2xl font-black text-[9px] uppercase transition-all", priceFilter === 'free' ? "bg-emerald-500 text-white" : "text-slate-400")}>{t('free')}</button>
                      <button onClick={() => setPriceFilter('paid')} className={cn("flex-1 py-2 rounded-2xl font-black text-[9px] uppercase transition-all", priceFilter === 'paid' ? "bg-blue-600 text-white" : "text-slate-400")}>{t('paid')}</button>
                   </div>
                   <div className="bg-slate-50 p-1.5 rounded-3xl flex gap-2 border border-slate-100">
                      <button onClick={() => setTypeFilter('regular')} className={cn("flex-1 flex items-center justify-center rounded-2xl py-2", typeFilter === 'regular' ? "bg-blue-100 text-blue-600" : "text-slate-300")}><MapPin className="w-4 h-4" /></button>
                      <button onClick={() => setTypeFilter('disabled')} className={cn("flex-1 flex items-center justify-center rounded-2xl py-2", typeFilter === 'disabled' ? "bg-blue-100 text-blue-600" : "text-slate-300")}><Accessibility className="w-4 h-4" /></button>
                      <button onClick={() => setTypeFilter('delivery')} className={cn("flex-1 flex items-center justify-center rounded-2xl py-2", typeFilter === 'delivery' ? "bg-blue-100 text-blue-600" : "text-slate-300")}><Truck className="w-4 h-4" /></button>
                   </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <Link 
              href="/results"
              className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-black text-xl py-6 rounded-3xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-4 transition-all active:scale-[0.98]"
            >
              Start Exploring
              <ArrowRight className="w-6 h-6 border-2 border-white/20 rounded-full p-0.5" />
            </Link>
          </div>
        )}

        {/* Navigation Arrival Panel */}
        {isNavigating && (
          <div className="bg-white rounded-[48px] p-8 shadow-2xl border border-slate-100 mb-4 animate-in slide-in-from-bottom-10 duration-700 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
                 <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                 <h3 className="text-3xl font-black text-slate-900 leading-none tracking-tight">0.8 km</h3>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">5 MIN REMAINING</p>
              </div>
            </div>
            <button 
              onClick={() => { router.push('/activity'); }}
              className="bg-[#0047AB] text-white px-10 py-5 rounded-3xl font-black text-lg shadow-xl shadow-blue-500/30 active:scale-95 transition-all"
            >
              ARRIVE
            </button>
          </div>
        )}

      </main>

      {!isNavigating && (
        <div className="absolute right-6 bottom-52 flex flex-col gap-4 z-40">
          <button className="w-14 h-14 bg-white/90 backdrop-blur rounded-2xl shadow-xl flex items-center justify-center text-slate-800 active:scale-95 transition-all">
            <LocateFixed className="w-6 h-6" />
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
