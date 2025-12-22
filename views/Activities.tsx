
import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, WATER_CYCLE_STAGES } from '../constants';

type ActivityMode = 'quiz' | 'puzzle';

const Activities: React.FC = () => {
  const [mode, setMode] = useState<ActivityMode>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // Puzzle State
  const [shuffledStages, setShuffledStages] = useState([...WATER_CYCLE_STAGES]);
  const [orderedStages, setOrderedStages] = useState<any[]>([]);
  const [puzzleError, setPuzzleError] = useState(false);
  const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);

  useEffect(() => {
    if (mode === 'puzzle') {
      resetPuzzle();
    }
  }, [mode]);

  const resetPuzzle = () => {
    setShuffledStages([...WATER_CYCLE_STAGES].sort(() => Math.random() - 0.5));
    setOrderedStages([]);
    setPuzzleError(false);
    setIsPuzzleComplete(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === QUIZ_QUESTIONS[currentIndex].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 20);
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleStageSelection = (stage: any) => {
    if (isPuzzleComplete) return;

    const nextCorrectStage = WATER_CYCLE_STAGES[orderedStages.length];
    
    if (stage.id === nextCorrectStage.id) {
      setOrderedStages([...orderedStages, stage]);
      setShuffledStages(shuffledStages.filter(s => s.id !== stage.id));
      setPuzzleError(false);
      setScore(prev => prev + 10);

      if (orderedStages.length + 1 === WATER_CYCLE_STAGES.length) {
        setIsPuzzleComplete(true);
        setScore(prev => prev + 50); // Bonus for completion
      }
    } else {
      setPuzzleError(true);
      setTimeout(() => setPuzzleError(false), 500);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setCorrectCount(0);
    setIsFinished(false);
    resetPuzzle();
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center px-6 py-12 gap-8">
        <div className="size-48 bg-primary/10 rounded-full flex items-center justify-center relative animate-breathe">
          <span className="material-symbols-outlined text-primary text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
          <div className="absolute inset-0 border-4 border-dashed border-primary rounded-full animate-[spin_10s_linear_infinite]"></div>
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white">أحسنت يا بطل!</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">لقد أنهيت الاختبار والأنشطة بنجاح</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
            <span className="block text-3xl font-black text-primary mb-1">{score}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">إجمالي النقاط</span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
            <span className="block text-3xl font-black text-emerald-500 mb-1">{correctCount}/{QUIZ_QUESTIONS.length}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">إجابات صحيحة</span>
          </div>
        </div>

        <button 
          onClick={resetQuiz}
          className="w-full bg-primary py-5 rounded-2xl text-white font-black text-xl shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined">refresh</span>
          إعادة الاختبار واللعب
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 pb-32 gap-6">
      {/* Activity Mode Switcher */}
      <div className="mt-4 flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <button 
          onClick={() => setMode('quiz')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${mode === 'quiz' ? 'bg-primary text-white shadow-md' : 'text-slate-500'}`}
        >
          الاختبار الذكي
        </button>
        <button 
          onClick={() => setMode('puzzle')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${mode === 'puzzle' ? 'bg-primary text-white shadow-md' : 'text-slate-500'}`}
        >
          لغز الترتيب
        </button>
      </div>

      {mode === 'quiz' ? (
        <>
          {/* Progress Header */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">السؤال {currentIndex + 1} من {QUIZ_QUESTIONS.length}</span>
              <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full">{score} نقطة</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Quiz Card */}
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
            <span className="absolute -top-4 -right-4 material-symbols-outlined text-slate-50 dark:text-slate-700/30 text-8xl pointer-events-none">quiz</span>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 leading-snug relative z-10">{QUIZ_QUESTIONS[currentIndex].question}</h3>
            <div className="space-y-4 relative z-10">
              {QUIZ_QUESTIONS[currentIndex].options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isWrong = isSelected && isCorrect === false;
                const isRight = (isSelected && isCorrect === true) || (selectedOption !== null && idx === QUIZ_QUESTIONS[currentIndex].correctAnswer);
                return (
                  <button 
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-right p-5 rounded-2xl border-2 transition-all flex items-center justify-between group 
                      ${isRight ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 ring-4 ring-emerald-500/10' : 
                        isWrong ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 
                        selectedOption !== null ? 'border-slate-100 dark:border-slate-700 opacity-50' : 
                        'border-slate-100 dark:border-slate-700 hover:border-primary bg-white dark:bg-slate-800'}`}
                  >
                    <span className={`text-lg font-bold ${isRight ? 'text-emerald-700 dark:text-emerald-300' : isWrong ? 'text-red-700 dark:text-red-300' : 'text-slate-700 dark:text-slate-200'}`}>{option}</span>
                    <div className={`size-8 rounded-full flex items-center justify-center border-2 transition-all ${isRight ? 'bg-emerald-500 border-emerald-500 text-white' : isWrong ? 'bg-red-500 border-red-500 text-white' : 'border-slate-200 dark:border-slate-600 group-hover:border-primary'}`}>
                      {isRight && <span className="material-symbols-outlined text-sm font-black">check</span>}
                      {isWrong && <span className="material-symbols-outlined text-sm font-black">close</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedOption !== null && (
            <button 
              onClick={handleNext}
              className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'السؤال التالي' : 'عرض النتيجة النهائية'}
              <span className="material-symbols-outlined rotate-180">arrow_back</span>
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Puzzle Area */}
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="text-center mb-6">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">رتب مراحل دورة الماء</h3>
              <p className="text-sm text-slate-500 font-medium">اضغط على المرحلة الصحيحة بالترتيب الصحيح</p>
            </div>

            {/* Target Area (Already ordered) */}
            <div className="min-h-[120px] bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 flex flex-wrap justify-center gap-3 mb-8 border-2 border-dashed border-primary/20">
              {orderedStages.length === 0 && (
                <div className="flex flex-col items-center justify-center opacity-30 py-4">
                  <span className="material-symbols-outlined text-4xl mb-1">view_list</span>
                  <p className="text-xs font-bold">ابدأ بالترتيب هنا</p>
                </div>
              )}
              {orderedStages.map((stage, idx) => (
                <div key={idx} className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm animate-in zoom-in duration-300">
                  <span className="text-xs font-black">{idx + 1}</span>
                  <span className="material-symbols-outlined text-sm">{stage.icon}</span>
                  <span className="font-bold text-sm">{stage.name}</span>
                </div>
              ))}
            </div>

            {/* Shuffled Options */}
            {!isPuzzleComplete ? (
              <div className={`grid grid-cols-2 gap-3 transition-transform ${puzzleError ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
                {shuffledStages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => handleStageSelection(stage)}
                    className="bg-white dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 p-4 rounded-2xl shadow-sm hover:border-primary active:scale-95 transition-all flex flex-col items-center gap-2 group"
                  >
                    <span className="material-symbols-outlined text-3xl text-primary group-hover:scale-110 transition-transform">{stage.icon}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{stage.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 animate-in zoom-in">
                <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-4xl">celebration</span>
                </div>
                <h4 className="text-2xl font-black text-emerald-600 mb-2">رائع جداً!</h4>
                <p className="text-slate-500 mb-6">لقد رتبت جميع المراحل بشكل مثالي وحصلت على 50 نقطة مكافأة!</p>
                <div className="flex gap-4">
                  <button onClick={resetPuzzle} className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold">إعادة اللعب</button>
                  <button onClick={() => setIsFinished(true)} className="flex-1 bg-primary text-white py-3 rounded-xl font-bold">إنهاء النشاط</button>
                </div>
              </div>
            )}
          </div>

          {/* Educational Note */}
          <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-3xl border border-amber-100 dark:border-amber-800/30 flex items-start gap-4">
            <span className="material-symbols-outlined text-amber-500">info</span>
            <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
              تذكر دائماً: تبدأ الرحلة من الشمس التي تبخر الماء، ثم يتكاثف في السحب، ثم يسقط كالأمطار، ثم يجري على الأرض ليعود من جديد!
            </p>
          </div>
        </div>
      )}

      {/* Style for shaking animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default Activities;
