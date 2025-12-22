
import React, { useState, useEffect, useRef } from 'react';
import { getWaterFact } from '../services/gemini';
import { WATER_CYCLE_STAGES } from '../constants';

const Simulation: React.FC = () => {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [fact, setFact] = useState<string>("اضغط على أحد الأزرار لتبدأ رحلة الماء السحرية!");
  const [loadingFact, setLoadingFact] = useState(false);
  const [cloudDensity, setCloudDensity] = useState(0); 
  const [vaporParticles, setVaporParticles] = useState<{ id: number, x: number }[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  
  const vaporIdRef = useRef(0);
  const precipIntervalRef = useRef<number | null>(null);
  const autoPlayTimeoutRef = useRef<number | null>(null);

  const currentStageData = WATER_CYCLE_STAGES.find(s => 
    s.id === activeStage?.toLowerCase()
  );

  useEffect(() => {
    return () => {
      if (precipIntervalRef.current) clearInterval(precipIntervalRef.current);
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    };
  }, []);

  const fetchFact = async (stage: string, keepAutoPlay = false) => {
    if (!keepAutoPlay) setIsAutoPlaying(false);
    
    if (precipIntervalRef.current) {
      clearInterval(precipIntervalRef.current);
      precipIntervalRef.current = null;
    }

    setActiveStage(stage);
    setLoadingFact(true);

    if (stage === 'Evaporation') {
      const newVapors = Array.from({ length: 12 }).map(() => ({
        id: vaporIdRef.current++,
        x: 10 + Math.random() * 80
      }));
      setVaporParticles(prev => [...prev, ...newVapors]);
      setCloudDensity(prev => Math.min(prev + 35, 100));
      setTimeout(() => {
        setVaporParticles(prev => prev.filter(v => !newVapors.find(nv => nv.id === v.id)));
      }, 3000);
    }

    if (stage === 'Precipitation') {
      precipIntervalRef.current = window.setInterval(() => {
        setCloudDensity(prev => {
          if (prev <= 0) {
            if (precipIntervalRef.current) clearInterval(precipIntervalRef.current);
            precipIntervalRef.current = null;
            return 0;
          }
          return prev - 2;
        });
      }, 200);
    }

    const newFact = await getWaterFact(stage);
    setFact(newFact);
    setLoadingFact(false);
  };

  const startFullCycle = async () => {
    setIsAutoPlaying(true);
    setCloudDensity(0);
    
    // المرحلة 1: التبخر
    await fetchFact('Evaporation', true);
    
    autoPlayTimeoutRef.current = window.setTimeout(async () => {
      // المرحلة 2: التكاثف
      await fetchFact('Condensation', true);
      
      autoPlayTimeoutRef.current = window.setTimeout(async () => {
        // المرحلة 3: الهطول
        await fetchFact('Precipitation', true);
        
        autoPlayTimeoutRef.current = window.setTimeout(() => {
          setIsAutoPlaying(false);
        }, 8000);
      }, 5000);
    }, 5000);
  };

  const renderRain = () => {
    const count = Math.floor((cloudDensity / 100) * 50) + 10;
    return Array.from({ length: count }).map((_, i) => (
      <div 
        key={`rain-${i}`} 
        className="rain-drop" 
        style={{ 
          left: `${Math.random() * 100}%`, 
          top: `-${Math.random() * 20}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${0.3 + Math.random() * 0.5}s`,
          opacity: 0.3 + (cloudDensity / 200)
        }} 
      />
    ));
  };

  return (
    <div className="flex flex-col w-full h-full pb-10 bg-slate-50 dark:bg-slate-950">
      {/* نافذة المحاكاة الرئيسية */}
      <div className="relative w-full aspect-[4/3] p-4 shrink-0">
        <div 
          className="absolute inset-4 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white dark:border-slate-800 transition-all duration-1000 bg-sky-100"
        >
          {/* خلفية طبيعية ثابتة */}
          <div 
            className="absolute inset-0 transition-all duration-1000 bg-center bg-cover"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80')",
              opacity: activeStage ? 0.3 : 1,
              filter: 'contrast(1.1) saturate(1.2)'
            }}
          ></div>

          {/* طبقات المراحل */}
          {WATER_CYCLE_STAGES.map((stage) => (
            <div 
              key={stage.id}
              className="absolute inset-0 transition-all duration-1000 bg-center bg-cover"
              style={{ 
                backgroundImage: `url("${stage.imageUrl}")`,
                opacity: activeStage?.toLowerCase() === stage.id ? 1 : 0,
                transform: activeStage?.toLowerCase() === stage.id ? 'scale(1)' : 'scale(1.1)',
                mixBlendMode: 'multiply'
              }}
            ></div>
          ))}

          {/* الأسهم الحركية للدورة الكاملة */}
          {isAutoPlaying && (
            <svg className="absolute inset-0 w-full h-full z-40 pointer-events-none overflow-visible">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.8)" />
                </marker>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="white" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              
              {/* سهم التبخر (من البحر للغيوم) */}
              <path 
                d="M 280,240 Q 300,180 250,80" 
                fill="none" 
                stroke="white" 
                strokeWidth="4" 
                strokeDasharray="10,10"
                className={`transition-opacity duration-1000 ${activeStage === 'Evaporation' ? 'opacity-80' : 'opacity-0'}`}
                markerEnd="url(#arrowhead)"
              />
              
              {/* سهم التكاثف (عبر السماء) */}
              <path 
                d="M 230,60 Q 150,40 80,70" 
                fill="none" 
                stroke="white" 
                strokeWidth="4" 
                strokeDasharray="10,10"
                className={`transition-opacity duration-1000 ${activeStage === 'Condensation' ? 'opacity-80' : 'opacity-0'}`}
                markerEnd="url(#arrowhead)"
              />
              
              {/* سهم الهطول (من السماء للأرض) */}
              <path 
                d="M 70,100 Q 50,200 100,260" 
                fill="none" 
                stroke="white" 
                strokeWidth="4" 
                strokeDasharray="10,10"
                className={`transition-opacity duration-1000 ${activeStage === 'Precipitation' ? 'opacity-80' : 'opacity-0'}`}
                markerEnd="url(#arrowhead)"
              />
            </svg>
          )}

          {/* الغيوم */}
          <div className="absolute top-0 left-0 right-0 h-32 flex justify-around items-start p-4 pointer-events-none z-30">
            {Array.from({ length: 6 }).map((_, i) => (
              <span 
                key={i}
                className="material-symbols-outlined cloud-unit transition-all duration-1000"
                style={{ 
                  fontSize: `${80 + (i % 3) * 20}px`,
                  opacity: cloudDensity > (i * 15) ? 0.95 : 0.05,
                  transform: `translateY(${cloudDensity > (i * 15) ? '0px' : '-40px'}) scale(${cloudDensity > (i * 15) ? 1 : 0.6})`,
                  color: cloudDensity > 75 ? '#475569' : cloudDensity > 40 ? '#cbd5e1' : '#f8fafc',
                  fontVariationSettings: "'FILL' 1"
                }}
              >
                cloud
              </span>
            ))}
          </div>

          {/* البخار */}
          {vaporParticles.map(v => (
            <span key={v.id} className="material-symbols-outlined vapor-particle z-10" style={{ left: `${v.x}%`, bottom: '25%' }}>air</span>
          ))}

          {/* الأمطار */}
          {activeStage === 'Precipitation' && cloudDensity > 5 && (
            <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">{renderRain()}</div>
          )}

          {/* أزرار التحكم في أسفل الصورة */}
          <div className="absolute bottom-6 left-0 right-0 z-50 pointer-events-none flex justify-center items-center gap-2 px-4">
            <button 
              onClick={(e) => { e.stopPropagation(); fetchFact('Evaporation'); }}
              className={`pointer-events-auto flex-1 max-w-[85px] backdrop-blur-md py-2.5 rounded-xl shadow-xl flex flex-col items-center gap-1 hover:scale-105 active:scale-95 transition-all border-2 ${activeStage === 'Evaporation' ? 'bg-orange-500 text-white border-orange-200' : 'bg-white/90 dark:bg-black/70 text-slate-800 dark:text-white border-transparent'}`}
            >
              <span className="material-symbols-outlined text-xl">hot_tub</span>
              <span className="text-[9px] font-black">التبخر</span>
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); fetchFact('Condensation'); }}
              className={`pointer-events-auto flex-1 max-w-[85px] backdrop-blur-md py-2.5 rounded-xl shadow-xl flex flex-col items-center gap-1 hover:scale-105 active:scale-95 transition-all border-2 ${activeStage === 'Condensation' ? 'bg-blue-500 text-white border-blue-200' : 'bg-white/90 dark:bg-black/70 text-slate-800 dark:text-white border-transparent'}`}
            >
              <span className="material-symbols-outlined text-xl">cloud_queue</span>
              <span className="text-[9px] font-black">التكاثف</span>
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); fetchFact('Precipitation'); }}
              className={`pointer-events-auto flex-1 max-w-[85px] backdrop-blur-md py-2.5 rounded-xl shadow-xl flex flex-col items-center gap-1 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 border-2 ${activeStage === 'Precipitation' ? 'bg-indigo-600 text-white border-indigo-200' : 'bg-white/90 dark:bg-black/70 text-slate-800 dark:text-white border-transparent'}`}
              disabled={cloudDensity < 20 && activeStage !== 'Precipitation'}
            >
              <span className="material-symbols-outlined text-xl">umbrella</span>
              <span className="text-[9px] font-black">الهطول</span>
            </button>

            {/* زر الدورة الكاملة المضاف */}
            <button 
              onClick={(e) => { e.stopPropagation(); startFullCycle(); }}
              className={`pointer-events-auto flex-1 max-w-[100px] backdrop-blur-md py-2.5 rounded-xl shadow-2xl flex flex-col items-center gap-1 hover:scale-110 active:scale-95 transition-all border-2 ${isAutoPlaying ? 'bg-emerald-500 text-white border-emerald-200 animate-pulse' : 'bg-white/95 dark:bg-slate-800/95 text-emerald-600 dark:text-emerald-400 border-emerald-100 shadow-emerald-500/20'}`}
              disabled={isAutoPlaying}
            >
              <span className="material-symbols-outlined text-xl">{isAutoPlaying ? 'sync' : 'cycle'}</span>
              <span className="text-[9px] font-black">دورة كاملة</span>
            </button>
          </div>

          {/* الشمس */}
          <div className={`absolute top-6 right-6 transition-all duration-1000 ${cloudDensity > 50 ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
            <span className="material-symbols-outlined text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.8)]" style={{ fontSize: '60px', fontVariationSettings: "'FILL' 1" }}>wb_sunny</span>
          </div>
        </div>
      </div>

      {/* بطاقة المعلومات (Fact Card) */}
      <div className="px-6 -mt-6 relative z-50">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 dark:border-slate-800/50">
          <div className="flex items-center gap-6 mb-6">
            <div className={`size-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${currentStageData ? 'bg-primary shadow-lg rotate-3' : 'bg-amber-400 shadow-lg -rotate-3'}`}>
              <span className="material-symbols-outlined text-white text-3xl leading-none">
                {currentStageData ? currentStageData.icon : 'auto_awesome'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-black mb-1 transition-colors ${currentStageData ? 'text-primary' : 'text-amber-50'}`}>
                {isAutoPlaying && !currentStageData ? 'جارِ عرض الرحلة الكاملة...' : (currentStageData ? currentStageData.name : 'رحلة قطرة الماء')}
              </h3>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${currentStageData ? 'bg-primary w-6' : 'bg-slate-200 dark:bg-slate-800 w-3'}`}></div>
                ))}
              </div>
            </div>
          </div>
          
          <p className={`text-slate-700 dark:text-slate-200 text-lg leading-relaxed font-medium transition-all duration-300 min-h-[80px] ${loadingFact ? 'opacity-30' : 'opacity-100'}`}>
            {fact}
          </p>
          
          {/* مؤشر تقدم كثافة السحب */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-3 px-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">مستوى كثافة السحب</span>
              <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full">{Math.round(cloudDensity)}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-1 border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-500 shadow-sm ${cloudDensity > 80 ? 'bg-indigo-600' : cloudDensity > 40 ? 'bg-primary' : 'bg-blue-300'}`}
                style={{ width: `${cloudDensity}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
