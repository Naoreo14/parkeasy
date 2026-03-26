'use client';

import React from 'react';
import Header from '@/components/Header';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { X, CheckCircle2, ChevronRight, CornerRightUp, MapPin } from 'lucide-react';

export default function SessionEnded() {
  const { t } = useApp();

  return (
    <div className="flex flex-col h-full bg-[#f8fcfb] relative overflow-hidden font-sans">
      {/* Custom Header */}
      <header className="flex items-center justify-between px-6 pt-12 pb-4 relative z-50">
        <Link href="/map" className="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-7 h-7" />
        </Link>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">{t('session_ended')}</h1>
        <div className="text-blue-600 font-black italic text-2xl">P</div>
      </header>

      <main className="flex-1 px-8 pt-2 pb-12 overflow-y-auto flex flex-col items-center">
        
        {/* Friendly Illustration Section - More Compact */}
        <div className="w-full max-w-[280px] aspect-square relative mt-2 mb-2">
           {/* Background Circles */}
           <div className="absolute inset-0 bg-blue-50/50 rounded-[48px] transform rotate-3 scale-105"></div>
           <div className="absolute inset-0 bg-white rounded-[48px] shadow-2xl border border-slate-50 flex items-center justify-center overflow-hidden">
              <img 
                src="/friendly_thanks.png" 
                alt="Friendly car assistant" 
                className="w-full h-full object-contain p-4"
              />
              
              {/* Floating Thank You Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-slate-50 flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest leading-none">THANK YOU!</span>
              </div>

              {/* Liberated Badge */}
              <div className="absolute bottom-4 left-4 bg-emerald-500 text-white px-3 py-2 rounded-xl shadow-lg flex items-center gap-2">
                 <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center font-black text-[10px]">P</div>
                 <span className="text-[10px] font-black uppercase tracking-widest leading-none">Space Liberated</span>
              </div>
           </div>
        </div>

        {/* Content Section - More Compact */}
        <div className="flex flex-col items-center text-center gap-2 mt-4">
           <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{t('session_ended')}</h2>
           <p className="text-slate-500 font-bold leading-snug max-w-[260px] text-sm opacity-80">
             We hope you had a pleasant stay! Your session data has been securely saved.
           </p>
        </div>

        {/* Session Summary Card */}
        <div className="w-full bg-white rounded-[40px] p-6 shadow-2xl shadow-slate-900/5 border border-slate-50 mt-8 flex flex-col gap-5">
           <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LOCATION</p>
                <p className="font-black text-slate-800 text-base">Grand Central Terminal</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
           </div>

           <div className="w-full h-px bg-slate-50"></div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('hours')}</p>
                <p className="font-black text-slate-800 text-base">1h 55m</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TOTAL COST</p>
                <p className="font-black text-blue-600 text-base">$12.95</p>
              </div>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-4 mt-8">
           <Link 
            href="/map"
            className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-black text-lg py-5 rounded-[32px] shadow-2xl shadow-blue-900/20 text-center flex items-center justify-center gap-4 transition-all active:scale-[0.98]"
           >
              {t('mark_free')}
              <CornerRightUp className="w-6 h-6" />
           </Link>
           <button 
            className="w-full text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] py-2 text-center hover:text-slate-600 transition-colors"
           >
              Back to Map
           </button>
        </div>

      </main>
    </div>
  );
}
