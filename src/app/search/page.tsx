'use client';

import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, MapPin, Navigation, Sliders, ArrowRight, Accessibility, Truck, LocateFixed, Clock, CheckCircle, SlidersHorizontal, ChevronUp, CornerUpRight, Car, Navigation2, StopCircle, X, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock parking data with properties
const initialSpots = [
  { id: 1, x: 25, y: 35, status: 'FREE', price: 'free', type: 'regular' },
  { id: 2, x: 65, y: 45, status: 'FREE', price: 'paid', type: 'disabled' },
  { id: 3, x: 20, y: 70, status: 'FREE', price: 'free', type: 'delivery' },
  { id: 4, x: 75, y: 25, status: 'FREE', price: 'paid', type: 'regular' },
  { id: 5, x: 45, y: 20, status: 'FREE', price: 'free', type: 'regular' },
  { id: 6, x: 30, y: 80, status: 'FREE', price: 'paid', type: 'disabled' },
];

export default function UnifiedSearch() {
  const { t } = useApp();
  const [radius, setRadius] = useState(800);
  const [priceFilter, setPriceFilter] = useState<'free' | 'paid' | 'any'>('free');
  const [typeFilter, setTypeFilter] = useState<'regular' | 'disabled' | 'delivery'>('regular');
  const [spots, setSpots] = useState(initialSpots);
  const [userLocation, setUserLocation] = useState({ x: 50, y: 50 });
  const [showFilters, setShowFilters] = useState(false);
  
  // Navigation States
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);

  // Filter Logic
  const filteredSpots = spots.filter(spot => {
    const matchesPrice = priceFilter === 'any' || spot.price === priceFilter;
    const matchesType = spot.type === typeFilter;
    return matchesPrice && matchesType && spot.status === 'FREE';
  });

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

  const handleStartNavigation = () => {
    setIsNavigating(true);
    setShowFilters(false);
  };

  const handleArrive = () => {
    setIsNavigating(false);
    setIsSessionActive(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 relative overflow-hidden font-sans">
      
      {/* 1. Map Layer (Background) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756eaa539?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-[1.2] opacity-40 mix-blend-overlay"></div>
        <div className={cn("absolute inset-0 bg-slate-900/60 transition-opacity duration-1000", (isNavigating || isSessionActive) && "opacity-80")}></div>
        
        {/* Building Blocks */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[20%] left-[60%] w-[30%] h-[60%] bg-slate-800 border border-slate-700 rounded-lg"></div>
          <div className="absolute top-[20%] left-[10%] w-[15%] h-[30%] bg-slate-800 border border-slate-700 rounded-lg"></div>
        </div>

        {/* Navigation Route */}
        {isNavigating && (
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-in fade-in duration-1000">
             <path 
               d="M 500 650 L 500 500 L 350 500 L 350 250" 
               fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"
               className="opacity-40" vectorEffect="non-scaling-stroke"
             />
             <path 
               d="M 500 650 L 500 500 L 350 500 L 350 250" 
               fill="none" stroke="#00ffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" 
               strokeDasharray="30 25"
               className="animate-dash filter drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
               vectorEffect="non-scaling-stroke"
             />
           </svg>
        )}

        {/* User Marker */}
        <div 
          className="absolute z-30 transition-all duration-1000 ease-out"
          style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <div className={cn("absolute -inset-10 rounded-full animate-ping opacity-10", isSessionActive ? "bg-emerald-400" : "bg-blue-400")}></div>
            <div className={cn("w-7 h-7 rounded-full border-4 border-white shadow-2xl transition-colors duration-500", isSessionActive ? "bg-emerald-600" : "bg-blue-600 shadow-blue-500/50")}></div>
            
            {isSessionActive && (
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-2xl shadow-2xl border border-slate-100 whitespace-nowrap animate-in fade-in slide-in-from-bottom-5">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic flex items-center gap-2 leading-none">
                  <CheckCircle className="w-3 h-3" />
                  PARKED
                </span>
                <div className="absolute -bottom-1.5 left-1/2 -ml-1.5 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100"></div>
              </div>
            )}
          </div>
        </div>

        {/* Filtered Parking Spots */}
        {filteredSpots.map(spot => (
          <div 
            key={spot.id} 
            className={cn(
              "absolute z-10 transition-opacity duration-700",
              (isNavigating || isSessionActive) && "opacity-20 pointer-events-none"
            )} 
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <div className="flex flex-col items-center animate-in fade-in zoom-in-50 duration-500">
              <div className="bg-emerald-500 px-2 py-2 rounded-xl shadow-lg border border-white/20 mb-1">
                <span className="text-xs font-black text-white italic leading-none">P</span>
              </div>
              <span className="text-[9px] font-black tracking-widest text-emerald-400 bg-slate-900/60 px-2 py-0.5 rounded-lg uppercase border border-white/5">{t('free')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. UI Overlay Layer */}
      
      {/* Top Navigation Banner */}
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
          <div className="bg-[#1a4bbd] text-white px-6 pt-12 pb-6 flex justify-between items-center shadow-lg">
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

      {!isNavigating && !isSessionActive && <Header />}

      <main className="flex-1 px-6 pb-32 relative z-30 flex flex-col justify-between">
        
        {/* Top Search Overlay */}
        {!isNavigating && !isSessionActive && (
          <div className="flex flex-col gap-4 mt-4 animate-in slide-in-from-top duration-1000 delay-300">
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

        {/* Bottom Filter/Action Panel */}
        {!isSessionActive && (
          <div className={cn(
            "bg-white/95 backdrop-blur-2xl rounded-[44px] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40 transition-all duration-700 flex flex-col gap-6 scale-100",
            isNavigating ? "h-[160px] mb-4" : (showFilters ? "h-[440px] mb-4" : "h-[170px] mb-4")
          )}>
            
            {/* Handle/Toggle */}
            {!isNavigating && (
              <button onClick={() => setShowFilters(!showFilters)} className="w-full flex flex-col items-center gap-2 -mt-3 mb-1">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                {!showFilters && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('preferences')}</p>}
              </button>
            )}

            {showFilters && !isNavigating && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-slate-800 font-black text-xs uppercase tracking-widest">
                    <span>{t('radius')}</span>
                    <span className="text-blue-600 tabular-nums text-base">{radius}m</span>
                  </div>
                  <input 
                    type="range" min="100" max="2000" step="100" value={radius} 
                    onChange={(e) => setRadius(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-50 p-2 rounded-[28px] flex gap-1 border border-slate-100 shadow-inner">
                      <button onClick={() => setPriceFilter('free')} className={cn("flex-1 py-3 rounded-2xl font-black text-[10px] uppercase transition-all", priceFilter === 'free' ? "bg-emerald-500 text-white shadow-lg" : "text-slate-400")}>{t('free')}</button>
                      <button onClick={() => setPriceFilter('paid')} className={cn("flex-1 py-3 rounded-2xl font-black text-[10px] uppercase transition-all", priceFilter === 'paid' ? "bg-blue-600 text-white shadow-lg" : "text-slate-400")}>{t('paid')}</button>
                   </div>
                   <div className="bg-slate-50 p-2 rounded-[28px] flex gap-2 border border-slate-100 shadow-inner overflow-hidden">
                      <button onClick={() => setTypeFilter('regular')} className={cn("flex-1 flex items-center justify-center rounded-2xl py-3 transition-all", typeFilter === 'regular' ? "bg-blue-100 text-blue-600" : "text-slate-300")}><MapPin className="w-5 h-5" /></button>
                      <button onClick={() => setTypeFilter('disabled')} className={cn("flex-1 flex items-center justify-center rounded-2xl py-3 transition-all", typeFilter === 'disabled' ? "bg-blue-100 text-blue-600" : "text-slate-300")}><Accessibility className="w-5 h-5" /></button>
                      <button onClick={() => setTypeFilter('delivery')} className={cn("flex-1 flex items-center justify-center rounded-2xl py-3 transition-all", typeFilter === 'delivery' ? "bg-blue-100 text-blue-600" : "text-slate-300")}><Truck className="w-5 h-5" /></button>
                   </div>
                </div>
              </div>
            )}

            {/* Navigation Active Bottom Info */}
            {isNavigating && (
              <div className="flex items-center justify-between gap-6 animate-in fade-in duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <Navigation2 className="w-8 h-8 fill-blue-600/10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-none">0.8 km</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5 italic">5 MIN REMAINING</p>
                  </div>
                </div>
                <button onClick={handleArrive} className="bg-[#0047AB] text-white px-8 h-14 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-blue-500/30 active:scale-95 transition-all">
                  {t('arrive')}
                </button>
              </div>
            )}

            {/* Primary Search Action */}
            {!isNavigating && (
              <button 
                onClick={handleStartNavigation}
                className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-black text-2xl py-6 rounded-3xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-4 transition-all active:scale-[0.98]"
              >
                {t('start_navigation')}
                <ArrowRight className="w-6 h-6 border-2 border-white/20 rounded-full p-0.5" />
              </button>
            )}
          </div>
        )}

        {/* End Session Button Overlay */}
        {isSessionActive && (
          <div className="absolute bottom-28 left-4 right-4 z-50 animate-in slide-in-from-bottom-10 duration-700">
            <Link 
              href="/activity"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-2xl py-7 rounded-[48px] flex flex-col items-center justify-center gap-1 shadow-2xl shadow-red-500/40 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <StopCircle className="w-9 h-9" />
                <span>{t('end_session')}</span>
              </div>
              <span className="text-[11px] opacity-70 font-black tracking-widest uppercase italic">TAP TO MARK AS FREE & MANAGE PAYMENT</span>
            </Link>
          </div>
        )}

      </main>

      {/* Map Controls */}
      {!isNavigating && !isSessionActive && (
        <div className="absolute right-6 bottom-56 flex flex-col gap-4 z-40">
          <button className="w-14 h-14 bg-white/90 backdrop-blur-md border border-slate-100 rounded-2xl shadow-2xl flex items-center justify-center text-slate-800 active:scale-95 transition-all">
            <LocateFixed className="w-6 h-6" />
          </button>
        </div>
      )}

      {!isNavigating && <BottomNav />}
    </div>
  );
}
