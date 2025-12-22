
import React from 'react';
import { AppScreen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  title: string;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onNavigate, title, showBack }) => {
  return (
    <div className="relative flex h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-xl overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => onNavigate(AppScreen.WELCOME)}
          className="text-slate-600 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full active:bg-slate-100 dark:active:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined">{showBack ? 'arrow_forward' : 'settings'}</span>
        </button>
        <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          {title}
        </h2>
        <div className="size-10"></div> {/* Spacer */}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {children}
      </main>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 p-4">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-slate-700 flex justify-around items-center h-16 px-2">
          <button 
            onClick={() => onNavigate(AppScreen.WELCOME)}
            className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${activeScreen === AppScreen.WELCOME ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeScreen === AppScreen.WELCOME ? 'filled' : ''}`}>home</span>
            <span className="text-[10px] font-medium">الرئيسية</span>
          </button>
          
          <button 
            onClick={() => onNavigate(AppScreen.SIMULATION)}
            className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${activeScreen === AppScreen.SIMULATION ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeScreen === AppScreen.SIMULATION ? 'filled' : ''}`}>science</span>
            <span className="text-[10px] font-medium">المحاكاة</span>
          </button>

          <button 
            onClick={() => onNavigate(AppScreen.TIMELINE)}
            className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${activeScreen === AppScreen.TIMELINE ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeScreen === AppScreen.TIMELINE ? 'filled' : ''}`}>water_drop</span>
            <span className="text-[10px] font-medium">الدورة</span>
          </button>

          <button 
            onClick={() => onNavigate(AppScreen.ACTIVITIES)}
            className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${activeScreen === AppScreen.ACTIVITIES ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeScreen === AppScreen.ACTIVITIES ? 'filled' : ''}`}>quiz</span>
            <span className="text-[10px] font-medium">الأنشطة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
