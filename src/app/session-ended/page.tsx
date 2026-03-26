'use client';

import React from 'react';
import { X, MapPin, Clock, DollarSign, Wifi, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SessionEnded() {
  return (
    <div className="flex flex-col h-full bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-12 pb-6 border-b border-slate-50">
        <Link href="/map" className="p-2 -ml-2 text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold text-slate-800">Session Ended</h1>
        <div className="text-blue-600 font-black text-xl italic">
          ParkEasy
        </div>
      </header>

      <main className="flex-1 px-6 pt-6 pb-12 overflow-y-auto flex flex-col gap-8">
        
        {/* Illustration Card */}
        <div className="relative w-full aspect-[4/3] rounded-[40px] overflow-hidden bg-[#EBF5FF] shadow-inner">
          {/* We'll use the generated image or a simulated version with Tailwind/SVG for maximum fidelity if path isn't stable */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            {/* Animated Cityscape Background */}
            <div className="absolute bottom-0 w-full h-1/2 flex items-end justify-around opacity-40">
              <div className="w-12 h-32 bg-blue-200 rounded-t-lg"></div>
              <div className="w-16 h-40 bg-blue-300 rounded-t-lg"></div>
              <div className="w-14 h-24 bg-blue-200 rounded-t-lg"></div>
              <div className="w-20 h-44 bg-blue-400 rounded-t-lg"></div>
              <div className="w-12 h-36 bg-blue-200 rounded-t-lg"></div>
            </div>
            
            {/* "THANK YOU" bubble */}
            <div className="absolute top-10 transform -rotate-3 bg-white px-6 py-2 rounded-2xl shadow-lg border border-blue-50 z-20">
              <span className="text-blue-700 font-black tracking-widest text-sm">THANK YOU</span>
              <div className="absolute -bottom-2 left-1/2 -ml-2 w-4 h-4 bg-white rotate-45 border-r border-b border-blue-50"></div>
            </div>

            {/* Car Illustration Placeholder (Icon-based for robustness) */}
            <div className="relative z-10 mt-12 scale-150">
              <div className="w-32 h-16 bg-blue-500 rounded-2xl relative shadow-xl">
                <div className="absolute -top-6 left-4 w-20 h-10 bg-blue-400 rounded-t-2xl border-x-4 border-t-4 border-blue-600/20"></div>
                <div className="absolute -bottom-2 left-4 w-6 h-6 bg-slate-800 rounded-full border-4 border-slate-600"></div>
                <div className="absolute -bottom-2 right-4 w-6 h-6 bg-slate-800 rounded-full border-4 border-slate-600"></div>
              </div>
            </div>

            {/* LIBERATED Badge */}
            <div className="absolute bottom-10 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-emerald-100 flex items-center gap-2 z-20">
              <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">SPACE LIBERATED</span>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <h2 className="text-4xl font-black text-[#0047AB] tracking-tight">Session Ended</h2>
          <p className="text-slate-500 font-bold leading-relaxed">
            Thank you for using ParkEasy. Would you like to mark this spot as available for other drivers?
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-slate-50 rounded-[40px] p-6 flex flex-col gap-4 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1 block">LOCATION</span>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Grand Central Terminal</h3>
            </div>
            <div className="w-12 h-12 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100/50 flex flex-col gap-1">
              <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">DURATION</span>
              <span className="text-2xl font-black text-slate-800">1h 55m</span>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100/50 flex flex-col gap-1">
              <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">TOTAL COST</span>
              <span className="text-2xl font-black text-blue-600">$12.95</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6 mt-4">
          <button className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-black text-lg py-5 rounded-[40px] shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
            <Wifi className="w-6 h-6 rotate-180" />
            Mark Spot as Free
          </button>
          
          <Link href="/map" className="text-center text-slate-500 font-bold text-lg hover:text-slate-800 transition-colors">
            Back to Map
          </Link>
        </div>

      </main>
    </div>
  );
}
