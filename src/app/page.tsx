'use client';

import { useState } from 'react';
import EnhancedRainEffect from '@/components/EnhancedRainEffect';
import WindowRainEffect from '@/components/WindowRainEffect';
import QuestionFlow from '@/components/QuestionFlow';
import ResultPage from '@/components/ResultPage';
import { UserAnswer } from '@/types/perfume';

export default function Home() {
  const [currentStage, setCurrentStage] = useState<'intro' | 'questions' | 'result'>('intro');
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [aiRecommendation, setAiRecommendation] = useState<any>(null);

  const handleStartJourney = () => {
    setCurrentStage('questions');
  };

  const handleQuestionsComplete = (recommendation: any) => {
    setAiRecommendation(recommendation);
    setCurrentStage('result');
  };

  const handleRestart = () => {
    setCurrentStage('intro');
    setAnswers([]);
    setAiRecommendation(null);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <EnhancedRainEffect />
      <WindowRainEffect />
      
      {currentStage === 'intro' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-20">
          <div className="w-full max-w-[390px] mx-auto text-center animate-fade-in-up">
            {/* 타이틀 섹션 */}
            <div className="mb-12 animate-breathe">
              <h1 className="rain-title text-5xl font-light text-rain-shimmer mb-6 tracking-wider">
                雨
              </h1>
              <p className="text-sm text-rain-dream tracking-[0.4em] mb-10 animate-gentle-float">
                RAIN SCENT JOURNEY
              </p>
              <h2 className="rain-text text-2xl font-light text-rain-storm mb-8 leading-relaxed text-shadow-soft">
                당신의 장마를<br />
                향기로 담아드립니다
              </h2>
            </div>

            {/* 시적인 설명 */}
            <div className="glass-effect rounded-3xl p-10 mb-10 rain-shadow animate-gentle-float">
              <p className="rain-text text-rain-midnight leading-loose text-base opacity-90">
                빗방울이 만들어내는 수천 가지 이야기 중<br />
                당신만의 이야기를 찾아<br />
                향기로 전해드립니다
              </p>
            </div>

            {/* 시작 버튼 */}
            <button
              onClick={handleStartJourney}
              className="group relative overflow-hidden bg-rain-medium text-white px-16 py-5 rounded-full rain-interactive rain-shadow hover:bg-rain-storm"
            >
              <span className="relative z-10 text-base tracking-wider font-medium">
                향기 여행 시작하기
              </span>
              <div className="absolute inset-0 bg-rain-storm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              <div className="absolute inset-0 rain-gradient-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>

            {/* 하단 장식 텍스트 */}
            <div className="mt-16 text-sm text-rain-sigh animate-breathe">
              <p className="animate-ripple-wave opacity-70">
                비가 내리는 소리에 귀 기울여보세요
              </p>
            </div>
          </div>
        </div>
      )}

      {currentStage === 'questions' && (
        <QuestionFlow onComplete={handleQuestionsComplete} />
      )}

              {currentStage === 'result' && aiRecommendation && (
          <ResultPage recommendation={aiRecommendation} onRestart={handleRestart} />
        )}
    </main>
  );
}