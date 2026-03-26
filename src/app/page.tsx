'use client';

import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, CreditCard, Sparkles } from 'lucide-react';

export default function Home() {
  const { t } = useApp();

  return (
    <div className="flex flex-col h-full bg-[#f8fcfb] relative overflow-hidden font-sans">
      <Header />

      <main className="flex-1 px-8 pt-4 pb-32 overflow-y-auto flex flex-col items-center">
        
        {/* Professional Hero Section - More Compact */}
        <div className="w-full max-w-[320px] relative mt-2 mb-6 group">
          <div className="absolute inset-0 bg-blue-600/5 rounded-[48px] blur-2xl opacity-40"></div>
          <div className="relative bg-white/80 backdrop-blur-md rounded-[48px] shadow-xl border border-white/50 p-6 flex flex-col items-center animate-in zoom-in-95 duration-700">
            <div className="w-full aspect-video relative mb-4">
               <img 
                src="/professional_hero.png" 
                alt="ParkEasy Smart City" 
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
            </div>
            <h1 className="text-4xl font-black text-slate-900 text-center tracking-tight leading-none mb-4">
              {t('parking_made_effortless')}
            </h1>
            <p className="text-slate-500 font-bold text-center leading-relaxed text-sm max-w-[280px]">
              {t('presentation_desc')}
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4 w-full">
           <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-slate-900/5 border border-slate-50 flex flex-col gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <Zap className="w-5 h-5 fill-emerald-600/10" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-sm">Real-time GPS</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Satellite Precision</p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-slate-900/5 border border-slate-50 flex flex-col gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-sm">Secure Pay</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">One-tap checkout</p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-slate-900/5 border border-slate-50 flex flex-col gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <Sparkles className="w-5 h-5 fill-indigo-600/10" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-sm">Predictive</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">AI Spot Finder</p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-slate-900/5 border border-slate-50 flex flex-col gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900">
                <ShieldCheck className="w-5 h-5 fill-slate-900/10" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-sm">Verified</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">100% Reliable</p>
              </div>
           </div>
        </div>

        {/* Start Button */}
        <div className="w-full mt-10">
          <Link 
            href="/search"
            className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-black text-2xl py-7 rounded-[48px] shadow-2xl shadow-blue-900/20 text-center flex items-center justify-center gap-4 transition-all active:scale-[0.98]"
          >
            {t('start_exploring')}
            <ArrowRight className="w-8 h-8" />
          </Link>
        </div>

      </main>

      <BottomNav />
    </div>
  );
}
