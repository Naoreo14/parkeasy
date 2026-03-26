'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Banknote, Accessibility, Truck, ChevronRight, Filter, ArrowLeft, Star, Map as MapIcon } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock results data
const initialResults = [
  {
    id: 1,
    name: '582 Market St.',
    address: 'DOWNTOWN ZONE A-4',
    distance: '0.2 km',
    price: 'Paid',
    cost: '$2.50/hr',
    type: 'Regular',
    hours: 'Open: 24/7',
    available: true,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Grand Central Terminal',
    address: '89 E 42nd St, New York',
    distance: '0.5 km',
    price: 'Paid',
    cost: '$12.95/hr',
    type: 'Regular',
    hours: 'Open: 08:00 - 22:00',
    available: true,
    rating: 4.5
  },
];

export default function SearchResults() {
  const { t } = useApp();
  const [results, setResults] = useState(initialResults);

  // Simulate dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setResults(prev => prev.map(item => {
        if (Math.random() > 0.8) {
          return { ...item, available: !item.available };
        }
        return item;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#f8fcfb] relative overflow-hidden font-sans">
      <Header />

      <main className="flex-1 px-6 pb-28 overflow-y-auto relative z-10 flex flex-col gap-6">
        {/* Title & Filter Bar */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Search Results</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">2 SPOTS NEARBY</p>
          </div>
          <button className="w-12 h-12 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-blue-600">
            <Filter className="w-6 h-6" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex flex-col gap-5">
          {results.map((spot) => (
            <Link 
              href="/spot-detail" 
              key={spot.id}
              className="bg-white rounded-[32px] p-5 shadow-xl shadow-slate-900/5 border border-slate-50 flex flex-col gap-4 active:scale-[0.98] transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-lg text-slate-800 leading-none">{spot.name}</h3>
                    <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 py-0.5 rounded-lg">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] font-black text-yellow-700">{spot.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-500" />
                    {spot.address}
                  </p>
                </div>
                <div className={cn(
                  "px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider",
                  spot.available ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                )}>
                  {spot.available ? t('available') : t('busy')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="bg-slate-50 rounded-2xl p-3 flex flex-col gap-1 border border-slate-100/50">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Banknote className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{t('price')}</span>
                  </div>
                  <span className={cn(
                    "font-black text-sm",
                    spot.price === 'Free' ? "text-emerald-600" : "text-blue-600"
                  )}>{spot.cost === '$0.00' ? t('free') : spot.cost}</span>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-3 flex flex-col gap-1 border border-slate-100/50">
                  <div className="flex items-center gap-2 text-slate-400">
                    {spot.type === 'Disabled' ? <Accessibility className="w-4 h-4" /> : spot.type === 'Delivery' ? <Truck className="w-4 h-4" /> : <MapIcon className="w-4 h-4" />}
                    <span className="text-[9px] font-black uppercase tracking-widest">{t('type')}</span>
                  </div>
                  <span className="font-black text-sm text-slate-700">{spot.type}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{t('distance')}</span>
                    <span className="font-black text-sm text-slate-800">{spot.distance}</span>
                  </div>
                  <div className="w-px h-6 bg-slate-100"></div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{t('hours')}</span>
                    <span className="font-black text-sm text-slate-800">{spot.hours}</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <ChevronRight className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
