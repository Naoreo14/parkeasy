'use client';

import React from 'react';
import { X, CheckCircle2, MapPin, Clock, DollarSign, Navigation, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';

export default function SessionEndedPage() {
  const { t } = useApp();

  return (
    <div className="flex flex-col h-full bg-[#fcfdfe] relative overflow-hidden font-sans">
      
      {/* Header */}
      <header className="px-6 py-8 flex items-center justify-between relative z-10 bg-white/50 backdrop-blur-md">
        <Link href="/activity" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 active:scale-90 transition-all">
          <X className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Session Ended</h1>
        <div className="flex items-center gap-1">
          <span className="text-blue-600 font-black text-lg tracking-tighter italic">ParkEasy</span>
        </div>
      </header>

      <main className="flex-1 px-8 pt-4 pb-20 overflow-y-auto flex flex-col items-center gap-8">
        
        {/* Illustration Container */}
        <div className="w-full relative animate-in zoom-in-95 duration-700">
           <div className="bg-[#eef6f8] rounded-[48px] overflow-hidden relative shadow-2xl shadow-blue-900/5 aspect-[4/3] flex items-center justify-center border border-white">
              <img 
                src="/session_ended_illustration.png" 
                alt="Thank You Illustration" 
                className="w-full h-full object-cover"
              />
              
              {/* Floating Badge (THANK YOU) */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg animate-in slide-in-from-top-4 duration-1000 delay-300">
                 <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">THANK YOU</span>
              </div>

              {/* Status Badge (SPACE LIBERATED) */}
              <div className="absolute bottom-6 left-6 bg-white shadow-xl px-4 py-3 rounded-2xl flex items-center gap-3 border border-slate-50 animate-in slide-in-from-left-4 duration-1000 delay-500">
                 <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                 </div>
                 <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">SPACE LIBERATED</span>
              </div>
           </div>
        </div>

        {/* Text Center */}
        <div className="text-center flex flex-col gap-3">
           <h2 className="text-5xl font-black text-[#0047AB] tracking-tighter leading-none animate-in slide-in-from-bottom-2 duration-700 delay-200">Session Ended</h2>
           <p className="text-slate-500 font-bold text-sm leading-relaxed animate-in slide-in-from-bottom-2 duration-700 delay-300 max-w-[280px] mx-auto">
             Thank you for using ParkEasy. Would you like to mark this spot as available for other drivers?
           </p>
        </div>

        {/* Receipt Details Card (Figma Layout) */}
        <div className="w-full bg-slate-50/50 rounded-[40px] p-8 border border-slate-100 flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-1000 delay-400">
           
           <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LOCATION</span>
                 <h3 className="text-xl font-black text-slate-900 leading-none">Grand Central Terminal</h3>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl shadow-md border border-slate-50 flex items-center justify-center text-blue-600">
                 <MapPin className="w-6 h-6" />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-sm grow">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">DURATION</span>
                 <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-300" />
                    <span className="text-lg font-black text-slate-900">1h 55m</span>
                 </div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-slate-50 shadow-sm grow">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">TOTAL COST</span>
                 <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    <span className="text-lg font-black text-slate-900">$12.95</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col items-center gap-6 mt-4">
           <Link 
             href="/search"
             className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-black text-lg py-6 rounded-3xl flex items-center justify-center gap-3 shadow-xl shadow-blue-900/30 active:scale-[0.98] transition-all group"
           >
              <Navigation className="w-5 h-5 group-hover:animate-pulse" />
              Mark Spot as Free
           </Link>
           
           <Link 
             href="/search"
             className="text-slate-500 font-black text-sm uppercase tracking-widest hover:text-blue-600 transition-colors flex items-center gap-2"
           >
              <ArrowLeft className="w-4 h-4" />
              Back to Map
           </Link>
        </div>

      </main>

    </div>
  );
}
