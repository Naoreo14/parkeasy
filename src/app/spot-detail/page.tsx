'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { Navigation, Clock, User, DollarSign, ArrowRight, Info, AlertTriangle, ChevronLeft, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SpotDetailPage() {
  const { t } = useApp();
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(0);
  const ratePerBase = 2.50;
  
  const totalCost = (hours + minutes / 60) * ratePerBase;

  const adjustHours = (delta: number) => {
    setHours(prev => Math.max(0, Math.min(4, prev + delta)));
  };

  const adjustMinutes = (delta: number) => {
    setMinutes(prev => {
      const next = prev + delta;
      if (next >= 60) {
        if (hours < 4) {
          adjustHours(1);
          return 0;
        }
        return prev;
      }
      if (next < 0) {
        if (hours > 0) {
          adjustHours(-1);
          return 55;
        }
        return 0;
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fcfb] relative overflow-hidden font-sans">
      <Header />

      <main className="flex-1 px-8 pt-4 pb-32 overflow-y-auto flex flex-col items-center">
        
        {/* Back Button */}
        <div className="w-full mb-4">
           <Link href="/results" className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
             <ChevronLeft className="w-4 h-4" />
             Back to Results
           </Link>
        </div>

        {/* Main Card UI (Replicating Figma) */}
        <div className="w-full bg-white/95 backdrop-blur-md rounded-[48px] p-8 shadow-2xl border border-slate-50 flex flex-col gap-8 animate-in slide-in-from-bottom-10 duration-700">
           
           <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase italic">DOWNTOWN ZONE A-4</span>
                 <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-1">582 Market St.</h1>
                 <p className="text-slate-500 font-bold text-sm tracking-tight leading-none">Street Parking • Permit Not Required</p>
              </div>
              <div className="bg-emerald-400 text-[#0c4a3e] px-4 py-3 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-emerald-500/20">
                 <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">PROBABILITY</span>
                 <span className="text-xl font-black">High</span>
              </div>
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-[32px] p-6 flex flex-col gap-4 border border-slate-100">
                 <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                    <DollarSign className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">HOURLY RATE</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tight leading-none">${ratePerBase.toFixed(2)}</p>
                 </div>
              </div>

              <div className="bg-slate-50 rounded-[32px] p-6 flex flex-col gap-4 border border-slate-100">
                 <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <div className="flex items-end gap-[1px]">
                       <div className="w-1.5 h-3 bg-emerald-600 rounded-full"></div>
                       <div className="w-1.5 h-5 bg-emerald-600 rounded-full"></div>
                       <div className="w-1.5 h-2 bg-emerald-600 rounded-full"></div>
                    </div>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">WALK TO DESTINATION</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tight leading-none">2 min</p>
                 </div>
              </div>
           </div>

           {/* Duration Selector (User Request Addition) */}
           <div className="bg-slate-50 rounded-[40px] p-8 flex flex-col gap-6 border border-slate-100 relative overflow-hidden group">
              <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <span>SELECT DURATION</span>
                 <span className="text-blue-600">MAX 4 HRS</span>
              </div>
              
              <div className="flex items-center justify-center gap-8 py-2">
                 <button onClick={() => adjustMinutes(-5)} className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-blue-600 active:scale-90 transition-all border border-slate-50">
                    <Minus className="w-6 h-6" strokeWidth={3} />
                 </button>
                 
                 <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-slate-900 tabular-nums leading-none tracking-tighter">
                      {hours}h {minutes > 0 ? `${minutes}m` : ''}
                    </span>
                 </div>

                 <button onClick={() => adjustMinutes(5)} className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-blue-600 active:scale-90 transition-all border border-slate-50">
                    <Plus className="w-6 h-6" strokeWidth={3} />
                 </button>
              </div>

              <div className="flex justify-between items-end pt-4 border-t border-slate-200/50 mt-2">
                 <span className="text-lg font-black text-slate-900">{t('total_cost')}</span>
                 <span className="text-4xl font-black text-blue-600 tabular-nums leading-none">${totalCost.toFixed(2)}</span>
              </div>
           </div>

           {/* Action Buttons */}
           <div className="flex flex-col gap-4">
              <Link 
                href={`/checkout?hours=${hours}&minutes=${minutes}`}
                className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-black text-2xl py-7 rounded-[48px] flex items-center justify-center gap-4 shadow-2xl shadow-blue-900/40 active:scale-[0.98] transition-all"
              >
                Proceed to Payment
                <ArrowRight className="w-8 h-8 rounded-full border-2 border-white/20 p-1" />
              </Link>
              
              <button className="flex items-center justify-center gap-2 text-slate-400 font-bold text-xs hover:text-red-400 transition-colors uppercase tracking-widest mt-2">
                 <AlertTriangle className="w-4 h-4" />
                 Report Issue or Blocked Spot
              </button>
           </div>

        </div>

      </main>

      <BottomNav />
    </div>
  );
}
