
import React from 'react';
import { WATER_CYCLE_STAGES } from '../constants';

const Timeline: React.FC = () => {
  return (
    <div className="px-4 pb-32 flex flex-col gap-8 mt-6 relative">
      {/* Hero Header */}
      <div className="bg-primary/10 rounded-3xl p-8 text-center flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10"><span className="material-symbols-outlined text-9xl">cloud</span></div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg mb-4 relative z-10">
          <span className="material-symbols-outlined text-primary text-6xl">water_drop</span>
        </div>
        <h1 className="text-2xl font-black text-primary dark:text-blue-400 mb-2 relative z-10">رحلة قطرة الماء</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed max-w-[240px] relative z-10">
          تعلم كيف تتحرك المياه في كوكبنا وتغير أشكالها باستمرار
        </p>
      </div>

      {/* Timeline Line */}
      <div className="absolute right-[3.25rem] top-[18rem] bottom-16 w-0.5 border-r-2 border-dashed border-primary/30 z-0"></div>

      {/* Stages */}
      {WATER_CYCLE_STAGES.map((stage, index) => (
        <div key={stage.id} className="relative z-10 flex items-start gap-4">
          <div className="shrink-0 flex flex-col items-center">
            <div className={`size-14 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg ring-4 ring-white/20`} style={{ backgroundColor: stage.color === 'orange' ? '#ffedd5' : stage.color === 'blue' ? '#dbeafe' : stage.color === 'indigo' ? '#e0e7ff' : stage.color === 'teal' ? '#ccfbf1' : '#fef3c7' }}>
              <span className="material-symbols-outlined text-3xl" style={{ color: stage.color === 'orange' ? '#f97316' : stage.color === 'blue' ? '#3b82f6' : stage.color === 'indigo' ? '#6366f1' : stage.color === 'teal' ? '#0d9488' : '#d97706' }}>{stage.icon}</span>
            </div>
          </div>
          
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{index + 1}. {stage.name}</h3>
              <button className="size-9 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-primary hover:bg-primary/10">
                <span className="material-symbols-outlined text-xl">volume_up</span>
              </button>
            </div>
            
            <div 
              className="w-full h-36 rounded-xl mb-4 bg-center bg-cover border border-slate-100 dark:border-slate-700" 
              style={{ backgroundImage: `url("${stage.imageUrl}")` }}
            ></div>
            
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {stage.description}
            </p>
          </div>
        </div>
      ))}

      {/* Completion Card */}
      <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-6 text-center border-2 border-green-200 dark:border-green-800/30">
        <span className="material-symbols-outlined text-green-500 text-5xl mb-2">verified</span>
        <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-1">ممتاز!</h3>
        <p className="text-slate-600 dark:text-slate-400">لقد أكملت رحلة قطرة الماء بنجاح</p>
      </div>
    </div>
  );
};

export default Timeline;
