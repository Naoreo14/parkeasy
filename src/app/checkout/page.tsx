'use client';

import { Suspense } from 'react';
import CheckoutPage from './CheckoutPage';

export default function Page() {
  return (
    <Suspense fallback={
       <div className="flex items-center justify-center h-full bg-[#f8fcfb] font-black text-slate-400 uppercase tracking-widest text-[10px] animate-pulse">
         Loading checkout...
       </div>
    }>
      <CheckoutPage />
    </Suspense>
  );
}
