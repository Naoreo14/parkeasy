'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { AlertCircle, Clock, PlusCircle, StopCircle, CreditCard, Receipt, ArrowRight, Edit3, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ActivityPage() {
  const { t } = useApp();
  const [timeLeft, setTimeLeft] = useState({ min: 4, sec: 52 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
        if (prev.min > 0) return { min: prev.min - 1, sec: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const extendSession = () => {
    setTimeLeft(prev => {
      const newMin = prev.min + 15;
      return { ...prev, min: newMin };
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fcfb] relative overflow-hidden font-sans">
      <Header />

      <main className="flex-1 px-6 pt-4 pb-32 overflow-y-auto flex flex-col gap-6">
        
        {/* Title Section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t('active_session')}</h1>
          <p className="text-slate-500 font-bold text-sm">Grand Central Terminal • Zone 4402</p>
        </div>

        {/* Expiring Alert */}
        <div className="bg-[#f3ece4] rounded-[32px] p-6 flex items-start gap-4 border border-[#e8dccb]">
          <div className="w-12 h-12 bg-[#8c4b1d] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
            <span className="font-black text-xl">10</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-black text-[#8c4b1d] text-lg leading-none">Time about to expire</h3>
            <p className="text-[#a0744a] font-bold text-xs leading-relaxed">
              Your session ends in 5 minutes. Consider extending to avoid fines.
            </p>
          </div>
        </div>

        {/* Countdown Timer Card */}
        <div className="bg-white rounded-[48px] p-8 shadow-2xl shadow-slate-900/5 border border-slate-50 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-blue-400 font-black text-xs tracking-[0.3em] uppercase mb-4">{t('time_remaining')}</span>
            <div className="flex items-baseline gap-1">
               <span className="text-6xl font-black text-[#0047AB] tracking-tighter tabular-nums">
                 {Math.floor(timeLeft.min / 60).toString().padStart(2, '0')}:
                 {(timeLeft.min % 60).toString().padStart(2, '0')}:
               </span>
               <span className="text-6xl font-black text-[#0047AB]/40 tracking-tighter tabular-nums">{timeLeft.sec < 10 ? `0${timeLeft.sec}` : timeLeft.sec}</span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
             <button 
               onClick={extendSession}
               className="w-full bg-[#0047AB] text-white py-5 rounded-[28px] font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95 transition-all text-lg"
             >
                <PlusCircle className="w-5 h-5" />
                {t('extend_time')}
             </button>
             <Link 
               href="/session-ended"
               className="w-full bg-slate-100 text-slate-500 py-5 rounded-[28px] font-black flex items-center justify-center gap-3 active:scale-95 transition-all text-lg text-center"
             >
                <StopCircle className="w-5 h-5" />
                {t('end_session')}
             </Link>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">{t('payment_method')}</h2>
            <button className="text-blue-600 font-black text-sm uppercase tracking-widest flex items-center gap-1">
              Edit 
              <Edit3 className="w-3 h-3" />
            </button>
          </div>

          {/* Visa Card Design */}
          <div className="bg-[#1a4bbd] rounded-[32px] p-8 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
             {/* Card Gloss */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
             
             <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                   <CreditCard className="w-7 h-7" />
                </div>
                <span className="text-2xl font-black italic tracking-tighter opacity-90">VISA</span>
             </div>

             <div className="mb-8 relative z-10">
                <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-50 mb-3">Card Number</p>
                <div className="flex gap-4 items-center">
                   <div className="flex gap-1.5 h-1.5 items-center">
                      {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>)}
                   </div>
                   <div className="flex gap-1.5 h-1.5 items-center">
                      {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>)}
                   </div>
                   <div className="flex gap-1.5 h-1.5 items-center">
                      {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>)}
                   </div>
                   <span className="text-xl font-bold tracking-widest">4292</span>
                </div>
             </div>

             <div className="flex items-end justify-between relative z-10">
                <div className="flex flex-col gap-1">
                   <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-50">Cardholder Name</p>
                   <p className="font-black tracking-wide text-lg">ALEXANDER STERLING</p>
                </div>
                <div className="flex gap-6">
                   <div className="flex flex-col gap-1">
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-50">Expiry</p>
                      <p className="font-black">12/26</p>
                   </div>
                   <div className="flex flex-col gap-1">
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-50">CVC</p>
                      <p className="font-black">***</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Session Summary Section */}
        <div className="flex flex-col gap-5 mt-4">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">{t('session_summary')}</h2>
          
          <div className="flex flex-col gap-4 bg-slate-50/50 rounded-[40px] p-8 border border-slate-100">
             <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                <span>Rate ($6.50 / hr)</span>
                <span className="text-slate-800 font-black">1h 55m</span>
             </div>
             <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                <span>Base Parking Fee</span>
                <span className="text-slate-800 font-black">$12.45</span>
             </div>
             <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                <span>{t('service_charge')}</span>
                <span className="text-slate-800 font-black">$0.50</span>
             </div>
             
             <div className="w-full h-px bg-slate-200/50 my-2"></div>
             
             <div className="flex justify-between items-end">
                <span className="text-2xl font-black text-slate-900 leading-none">{t('total_due')}</span>
                <span className="text-3xl font-black text-blue-600 leading-none tabular-nums">$12.95</span>
             </div>

             {/* Digital Receipt Info */}
             <div className="mt-6 bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm shadow-slate-900/5">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                  <Receipt className="w-6 h-6" />
                </div>
                <div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">{t('digital_receipt')}</span>
                   <p className="text-xs text-slate-600 font-bold">Will be sent to alex@sterling.com</p>
                </div>
             </div>

             {/* Complete Payment Button */}
             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xl py-6 rounded-3xl mt-4 flex items-center justify-center gap-4 shadow-xl shadow-blue-500/30 transition-all active:scale-[0.98]">
               {t('complete_payment')}
               <ArrowRight className="w-6 h-6" />
             </button>
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
}
