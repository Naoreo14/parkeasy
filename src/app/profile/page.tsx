'use client';

import React, { useState } from 'react';
import { User, Phone, Mail, FileText, CreditCard, Bell, Moon, Languages, LogOut, ChevronRight, CheckCircle2, ShieldCheck, Globe, X } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Profile() {
  const { language, setLanguage, notificationsEnabled, setNotificationsEnabled, isDarkMode, setIsDarkMode, t } = useApp();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const languages = [
    'English', 'French', 'German', 'Spanish', 
    'Chinese', 'Arabic', 'Japanese', 'Russian', 'Portuguese'
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8fcfb] relative overflow-hidden font-sans">
      <Header />

      <main className="flex-1 px-6 pb-32 overflow-y-auto relative z-10 flex flex-col gap-6">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-[40px] overflow-hidden border-4 border-white shadow-xl bg-blue-100 p-1">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
                alt="Alex Thompson" 
                className="w-full h-full object-cover rounded-[34px]"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-2xl shadow-lg border-2 border-white">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Alex Thompson</h1>
            <div className="flex items-center justify-center gap-1.5 mt-1 bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest leading-none">VERIFIED URBAN SENTINEL</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="bg-white rounded-[40px] p-6 shadow-xl shadow-slate-900/5 border border-slate-50 flex flex-col gap-5">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">FULL NAME</p>
                <p className="font-black text-slate-800">Alex Thompson</p>
              </div>
           </div>

           <div className="w-full h-px bg-slate-50"></div>

           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">PHONE NUMBER</p>
                <p className="font-black text-slate-800">+1 (555) 123-4567</p>
              </div>
           </div>

           <div className="w-full h-px bg-slate-50"></div>

           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">EMAIL ADDRESS</p>
                <p className="font-black text-slate-800">alex.sentinel@parkeasy.com</p>
              </div>
           </div>
        </div>

        {/* App Settings */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-slate-800 ml-2 tracking-tight">{t('settings')}</h2>
          <div className="bg-white rounded-[40px] p-6 shadow-xl shadow-slate-900/5 border border-slate-50 flex flex-col gap-6">
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-4">
                <Bell className="w-6 h-6 text-blue-600" />
                <span className="font-black text-slate-700 uppercase tracking-widest text-xs">{t('notifications')}</span>
              </div>
              <div className={cn(
                "relative inline-flex items-center h-6 rounded-full w-11 transition-colors",
                notificationsEnabled ? "bg-blue-600" : "bg-slate-200"
              )}>
                <span className={cn(
                  "inline-block w-4 h-4 transform bg-white rounded-full transition-transform",
                  notificationsEnabled ? "translate-x-6" : "translate-x-1"
                )}></span>
              </div>
            </button>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-4">
                <Moon className="w-6 h-6 text-blue-600" />
                <span className="font-black text-slate-700 uppercase tracking-widest text-xs">{t('dark_mode')}</span>
              </div>
              <div className={cn(
                "relative inline-flex items-center h-6 rounded-full w-11 transition-colors",
                isDarkMode ? "bg-blue-600" : "bg-slate-200"
              )}>
                <span className={cn(
                  "inline-block w-4 h-4 transform bg-white rounded-full transition-transform",
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                )}></span>
              </div>
            </button>

            <button 
              onClick={() => setShowLanguageModal(true)}
              className="flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4">
                <Globe className="w-6 h-6 text-blue-600" />
                <span className="font-black text-slate-700 uppercase tracking-widest text-xs">{t('language')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-blue-600 text-sm tracking-tight">{language}</span>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </button>

            <div className="w-full h-px bg-slate-50"></div>

            <button className="flex items-center justify-between text-red-500">
              <div className="flex items-center gap-4">
                <LogOut className="w-6 h-6" />
                <span className="font-black uppercase tracking-widest text-xs">{t('sign_out')}</span>
              </div>
            </button>
          </div>
        </div>

      </main>

      <BottomNav />

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in" onClick={() => setShowLanguageModal(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Choose Language</h2>
              <button 
                onClick={() => setShowLanguageModal(false)}
                className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
              {languages.map((lang) => (
                <button 
                  key={lang}
                  onClick={() => {
                    setLanguage(lang as any);
                    setTimeout(() => setShowLanguageModal(false), 200);
                  }}
                  className={cn(
                    "w-full p-6 rounded-3xl flex items-center justify-between transition-all",
                    language === lang ? "bg-blue-600 text-white shadow-xl scale-95" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <span className="font-black tracking-tight text-lg">{lang}</span>
                  {language === lang && <CheckCircle2 className="w-6 h-6 text-white" />}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setShowLanguageModal(false)}
              className="w-full mt-6 bg-slate-900 text-white py-5 rounded-[28px] font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
