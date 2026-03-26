'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, CreditCard, ShieldCheck, ArrowRight, Loader2, MapPin, Clock, DollarSign } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function CheckoutPage() {
  const { t } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const hours = parseInt(searchParams.get('hours') || '2');
  const minutes = parseInt(searchParams.get('minutes') || '0');
  const ratePerBase = 2.50;
  const serviceFee = 0.50;
  
  const parkingCost = (hours + minutes / 60) * ratePerBase;
  const totalCost = parkingCost + serviceFee;

  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handlePayment = () => {
    setStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setStatus('success');
      
      // Redirect to Navigation after short success display
      setTimeout(() => {
        router.push('/search?nav=true');
      }, 2000);
    }, 2500);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fcfb] relative overflow-hidden font-sans">
      <Header />

      <main className="flex-1 px-8 pt-6 pb-32 overflow-y-auto flex flex-col items-center">
        
        {/* Progress Stepper */}
        <div className="w-full mb-8 flex items-center justify-between px-4">
           <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black italic">1</div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{t('search')}</span>
           </div>
           <div className="flex-1 h-px bg-blue-200 mx-4 -mt-6"></div>
           <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black italic">2</div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Detail</span>
           </div>
           <div className="flex-1 h-px bg-slate-200 mx-4 -mt-6"></div>
           <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-2 border-blue-600 shadow-lg shadow-blue-500/10">
                 <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">PAY</span>
           </div>
        </div>

        {/* Transaction Card */}
        <div className="w-full bg-white rounded-[48px] p-8 shadow-2xl border border-slate-50 flex flex-col gap-8 animate-in zoom-in-95 duration-700 relative">
           
           {status === 'success' && (
             <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-md rounded-[48px] flex flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/20">
                   <CheckCircle2 className="w-16 h-16" strokeWidth={3} />
                </div>
                <div className="text-center">
                   <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2">Payment Successful</h2>
                   <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">REDIRECTING TO NAVIGATION...</p>
                </div>
             </div>
           )}

           <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-1">Secure Checkout</h1>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest tracking-tight">TRANSACTION ID: #PK-8829</p>
           </div>

           {/* Summary List */}
           <div className="flex flex-col gap-4">
              <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 flex items-center gap-6">
                 <div className="w-14 h-14 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600">
                    <MapPin className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none">582 Market St.</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">DOWNTOWN ZONE A-4</p>
                 </div>
              </div>

              <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 flex items-center gap-6">
                 <div className="w-14 h-14 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600">
                    <Clock className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none">{hours}h {minutes}m</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">BOOKED DURATION</p>
                 </div>
              </div>
           </div>

           {/* Cost Breakdown */}
           <div className="flex flex-col gap-4 px-2">
              <div className="flex justify-between items-center">
                 <span className="text-slate-400 font-black text-[11px] uppercase tracking-widest">Base Rate (${ratePerBase.toFixed(2)}/hr)</span>
                 <span className="text-slate-800 font-black tracking-tight">${parkingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-slate-400 font-black text-[11px] uppercase tracking-widest">Service Fee</span>
                 <span className="text-slate-800 font-black tracking-tight">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-100 my-2"></div>
              <div className="flex justify-between items-end">
                 <div>
                   <span className="text-slate-900 font-black text-sm uppercase tracking-widest italic block mb-1">Total Due</span>
                   <p className="text-slate-400 text-[10px] font-bold">Encrypted Transaction</p>
                 </div>
                 <span className="text-5xl font-black text-blue-600 tracking-tighter tabular-nums leading-none">
                   ${totalCost.toFixed(2)}
                 </span>
              </div>
           </div>

           {/* Payment Button */}
           <button 
             onClick={handlePayment}
             disabled={status !== 'idle'}
             className={cn(
               "w-full py-7 rounded-[48px] font-black text-2xl flex items-center justify-center gap-4 transition-all shadow-2xl relative overflow-hidden active:scale-[0.98]",
               status === 'idle' ? "bg-slate-900 text-white hover:bg-black shadow-slate-950/20" : "bg-slate-50 text-slate-400 cursor-not-allowed"
             )}
           >
             {status === 'processing' ? (
               <>
                 <Loader2 className="w-8 h-8 animate-spin" />
                 Verifying Payment...
               </>
             ) : (
               <>
                 <ShieldCheck className="w-8 h-8" />
                 Pay & Navigate
               </>
             )}
           </button>

           <div className="flex items-center justify-center gap-2 text-slate-300 font-black text-[9px] uppercase tracking-widest">
              <span>PCI DSS COMPLIANT</span>
              <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
              <span>SECURE BANKING</span>
           </div>

        </div>

      </main>

      <BottomNav />
    </div>
  );
}
