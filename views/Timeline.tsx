
import React, { useState } from 'react';
import { WATER_CYCLE_STAGES } from '../constants';
import { getWaterFact } from '../services/gemini';
import { WaterCycleStage } from '../types';

const Timeline: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<WaterCycleStage | null>(null);
  const [fact, setFact] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleShowFact = async (stage: WaterCycleStage) => {
    setSelectedStage(stage);
    setLoading(true);
    setFact('');
    try {
      const result = await getWaterFact(stage.name);
      setFact(result);
    } catch (error) {
      setFact("عذراً، حدث خطأ في تحميل المعلومة. حاول مرة أخرى!");
    } finally {
      setLoading(false);
    }
  };

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
          اكتشف أسرار كل مرحلة واضغط على "المزيد" لتعلم حقائق مذهلة!
        </p>
      </div>

      {/* Timeline Line */}
      <div className="absolute right-[3.25rem] top-[18rem] bottom-16 w-0.5 border-r-2 border-dashed border-primary/30 z-0"></div>

      {/* Stages */}
      {WATER_CYCLE_STAGES.map((stage, index) => (
        <div key={stage.id} className="relative z-10 flex items-start gap-4">
          <div className="shrink-0 flex flex-col items-center">
            <div 
              className={`size-14 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg ring-4 ring-white/20 transition-transform active:scale-90 cursor-pointer`} 
              style={{ backgroundColor: stage.color === 'orange' ? '#ffedd5' : stage.color === 'blue' ? '#dbeafe' : stage.color === 'indigo' ? '#e0e7ff' : stage.color === 'teal' ? '#ccfbf1' : '#fef3c7' }}
              onClick={() => handleShowFact(stage)}
            >
              <span className="material-symbols-outlined text-3xl" style={{ color: stage.color === 'orange' ? '#f97316' : stage.color === 'blue' ? '#3b82f6' : stage.color === 'indigo' ? '#6366f1' : stage.color === 'teal' ? '#0d9488' : '#d97706' }}>{stage.icon}</span>
            </div>
          </div>
          
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all active:scale-[0.98]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{index + 1}. {stage.name}</h3>
              <button 
                onClick={() => handleShowFact(stage)}
                className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <span className="text-[10px] font-black">المزيد</span>
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
              </button>
            </div>
            
            <div 
              className="w-full h-36 rounded-xl mb-4 bg-center bg-cover border border-slate-100 dark:border-slate-700 cursor-pointer" 
              style={{ backgroundImage: `url("${stage.imageUrl}")` }}
              onClick={() => handleShowFact(stage)}
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

      {/* Modal for Detailed Fact */}
      {selectedStage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-8 duration-500">
            <div className="relative h-40 overflow-hidden">
               <div 
                className="absolute inset-0 bg-center bg-cover scale-110 blur-[2px]" 
                style={{ backgroundImage: `url("${selectedStage.imageUrl}")` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button 
                onClick={() => setSelectedStage(null)}
                className="absolute top-4 left-4 size-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="absolute bottom-4 right-6 flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-2xl text-primary">{selectedStage.icon}</span>
                </div>
                <h4 className="text-white text-xl font-black">{selectedStage.name}</h4>
              </div>
            </div>
            
            <div className="p-8 text-center">
              <h5 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">هل تعلم؟</h5>
              
              <div className="min-h-[100px] flex items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-400 text-sm font-medium">جاري التفكير...</span>
                  </div>
                ) : (
                  <p className="text-slate-700 dark:text-slate-200 text-lg font-bold leading-relaxed italic">
                    "{fact}"
                  </p>
                )}
              </div>
              
              <button 
                onClick={() => setSelectedStage(null)}
                className="mt-8 w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 rounded-2xl font-black text-lg active:scale-95 transition-all shadow-xl"
              >
                فهمت!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
