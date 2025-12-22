
import React from 'react';
import { AppScreen } from '../types';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark max-w-md mx-auto">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24 z-10">
        {/* Hero Illustration */}
        <div className="relative w-full aspect-square mb-12 max-h-[360px] animate-float">
          <div className="absolute top-4 right-8 text-blue-300">
            <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>cloud</span>
          </div>
          <div className="absolute bottom-12 left-4 text-blue-200">
            <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>water_drop</span>
          </div>
          <div 
            className="w-full h-full bg-center bg-contain bg-no-repeat rounded-[2rem] border-8 border-white dark:border-slate-800 shadow-xl"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCF607QDFHZp9GaTfLBh6Fdbd2q0TvNDIgJOjMctYObK3dqickRXTwqyjv4FPmO3pbFRPjh83I9rFR9JH4Ks2xbHkLLs2QTOLOzTfdRupVlaGiDkMjU0cz_7fMx_4vRs1gy9j5sOk1ZYHyi8N7qz5zLoYHB9KOoX0-E77GbpaC13e8ooF4qgRIm-fl3RiaxzKk9BWW76xPEP2rkr7rCJRIwobJfWAQBsPTl1W24GGFbuWS38wJ71JMdOyV2xDr6OnWaKJ8KwBcgXrk")' }}
          ></div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            رحلة <span className="text-primary">قطرة الماء</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-[320px]">
            تعلم كيف تتحول المياه وتنتقل في الطبيعة في مغامرة ممتعة!
          </p>
        </div>
      </div>

      {/* Button Container */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 z-20 flex justify-center pb-12">
        <button 
          onClick={onStart}
          className="group animate-breathe flex w-full cursor-pointer items-center justify-center rounded-full h-16 px-8 bg-primary hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-500/30 text-white gap-4"
        >
          <span className="material-symbols-outlined transform rotate-180 group-hover:-translate-x-1 transition-transform" style={{ fontSize: '32px' }}>play_arrow</span>
          <span className="text-xl font-bold tracking-wide">ابدأ التعلم</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
