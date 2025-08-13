'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIRecommendation {
  userProfile: {
    rainType: string;
    emotionalState: string;
    personalityTrait: string;
    recommendationReason: string;
  };
  topRecommendations: Array<{
    perfume: any;
    matchScore: number;
    whyPerfect: string;
    whenToWear: string;
    emotionalConnection: string;
  }>;
  rainMoodAnalysis: {
    dominantMood: string;
    hiddenDesires: string;
    seasonalConnection: string;
    aromaTherapyEffect: string;
  };
  poeticMessage: string;
}

interface ResultPageProps {
  recommendation: AIRecommendation;
  onRestart: () => void;
}

export default function ResultPage({ recommendation, onRestart }: ResultPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const steps = [
    'profile', // 사용자 프로필
    'analysis', // 장마 분석
    'perfume', // 향수 추천
    'complete' // 완료
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          setIsAnimating(false);
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const topPerfume = recommendation.topRecommendations[0];

  return (
    <div className="min-h-screen relative z-20 overflow-hidden">
      {/* 고급 배경 효과 */}
      <div className="fixed inset-0 rain-gradient-2 opacity-80" />
      <div className="fixed inset-0 animate-breathe">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-rain-medium to-rain-storm opacity-10 animate-gentle-float"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-30 min-h-screen flex flex-col">
        {/* 헤더 */}
        <motion.div 
          className="pt-12 pb-6 px-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="rain-title text-rain-shimmer text-2xl tracking-[0.3em] font-light">
            당신만의 장마향 분석 완료
          </h1>
        </motion.div>

        <div className="flex-1 px-6 pb-8">
          <div className="w-full max-w-[500px] mx-auto">
            <AnimatePresence mode="wait">
              
              {/* Step 1: 사용자 프로필 */}
              {currentStep >= 0 && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 1.2 }}
                  className="space-y-8 mb-12"
                >
                  <div className="glass-effect rounded-3xl p-10 rain-shadow text-center">
                    <motion.div
                      initial={{ rotateY: -90 }}
                      animate={{ rotateY: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <h2 className="rain-title text-3xl font-light text-rain-midnight mb-6">
                        당신의 장마는
                      </h2>
                      <div className="relative">
                        <motion.div
                          className="text-6xl mb-4"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0] 
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🌧️
                        </motion.div>
                        <h3 className="rain-title text-2xl text-emotion-nostalgia font-medium mb-4">
                          {recommendation.userProfile.rainType}
                        </h3>
                        <p className="rain-text text-rain-storm text-base leading-relaxed opacity-90">
                          {recommendation.userProfile.emotionalState}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: 장마 분석 */}
              {currentStep >= 1 && (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 1 }}
                  className="space-y-6 mb-12"
                >
                  <div className="glass-effect rounded-3xl p-8 rain-shadow">
                    <h3 className="rain-text text-rain-storm text-xl font-medium mb-6 text-center">
                      깊이 있는 감성 분석
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { label: "주된 감정", value: recommendation.rainMoodAnalysis.dominantMood, icon: "💭" },
                        { label: "숨겨진 바람", value: recommendation.rainMoodAnalysis.hiddenDesires, icon: "✨" },
                        { label: "계절적 연결", value: recommendation.rainMoodAnalysis.seasonalConnection, icon: "🌿" },
                        { label: "아로마 효과", value: recommendation.rainMoodAnalysis.aromaTherapyEffect, icon: "🌸" }
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                          className="flex items-start space-x-4 p-4 glass-effect rounded-2xl"
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1">
                            <div className="rain-text text-rain-storm font-medium text-sm mb-1">
                              {item.label}
                            </div>
                            <div className="rain-text text-rain-midnight text-sm leading-relaxed">
                              {item.value}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: 향수 추천 */}
              {currentStep >= 2 && topPerfume && (
                <motion.div
                  key="perfume"
                  initial={{ opacity: 0, rotateX: -30 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 30 }}
                  transition={{ duration: 1.2 }}
                  className="space-y-8 mb-12"
                >
                  {/* 메인 추천 향수 */}
                  <div className="glass-effect rounded-3xl p-10 rain-shadow text-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-rain-medium to-rain-storm opacity-20 rounded-3xl"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 1, -1, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div
                        className="text-7xl mb-6"
                        animate={{ 
                          y: [0, -10, 0],
                          rotateY: [0, 180, 360]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        💎
                      </motion.div>
                      
                      <h3 className="rain-title text-3xl font-light text-rain-midnight mb-2">
                        {topPerfume.perfume.name}
                      </h3>
                      <p className="rain-text text-rain-storm text-lg mb-6 opacity-90">
                        {topPerfume.perfume.koreanName}
                      </p>
                      
                      <div className="flex justify-center items-center space-x-4 mb-6">
                        <span className="rain-text text-rain-sigh text-lg font-medium">매치율</span>
                        <div className="relative">
                          <motion.span 
                            className="rain-title text-4xl font-light text-rain-shimmer"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                          >
                            {topPerfume.matchScore}%
                          </motion.span>
                          <motion.div
                            className="absolute -inset-2 border-2 border-rain-medium rounded-full"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1, delay: 0.8 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 향수 상세 분석 */}
                  <div className="space-y-4">
                    {[
                      { title: "완벽한 이유", content: topPerfume.whyPerfect, icon: "💫" },
                      { title: "추천 착용 시기", content: topPerfume.whenToWear, icon: "⏰" },
                      { title: "감정적 연결", content: topPerfume.emotionalConnection, icon: "💝" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.3 }}
                        className="glass-effect rounded-2xl p-6 rain-shadow"
                      >
                        <div className="flex items-start space-x-4">
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1">
                            <h4 className="rain-text text-rain-storm font-medium text-base mb-2">
                              {item.title}
                            </h4>
                            <p className="rain-text text-rain-midnight text-sm leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* 향의 구성 */}
                  <div className="glass-effect rounded-2xl p-6 rain-shadow">
                    <h4 className="rain-text text-rain-storm text-base mb-4 font-medium text-center">
                      향의 구성
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {topPerfume.perfume.keywords.map((keyword: string, index: number) => (
                        <motion.span
                          key={keyword}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="px-4 py-2 bg-rain-breath text-rain-midnight text-sm rounded-full rain-border rain-interactive font-medium"
                        >
                          {keyword}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: 시적 메시지 */}
              {currentStep >= 3 && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                  className="space-y-8"
                >
                  <div className="glass-effect rounded-3xl p-10 rain-shadow text-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-emotion-peaceful to-emotion-nostalgia opacity-10 rounded-3xl"
                      animate={{ 
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div
                        className="text-5xl mb-6"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        🌈
                      </motion.div>
                      
                      <div className="rain-text text-rain-midnight text-base leading-relaxed whitespace-pre-line italic">
                        {recommendation.poeticMessage}
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex flex-col gap-4">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      onClick={onRestart}
                      className="w-full px-12 py-4 rounded-full border-2 border-rain-sigh text-rain-storm hover:glass-effect-dark hover:text-white hover:border-rain-storm transition-all duration-500 rain-interactive font-medium tracking-wide"
                    >
                      다시 분석하기
                    </motion.button>
                    
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="w-full rain-gradient text-white px-12 py-4 rounded-full rain-shadow rain-interactive font-medium tracking-wide"
                      onClick={() => {
                        // 결과 공유 기능
                        if (navigator.share) {
                          navigator.share({
                            title: '나의 장마향 분석 결과',
                            text: `나의 장마는 "${recommendation.userProfile.rainType}"이고, 추천 향수는 "${topPerfume.perfume.name}"입니다!`,
                            url: window.location.href
                          });
                        }
                      }}
                    >
                      결과 공유하기 ✨
                    </motion.button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* 로딩 중일 때 */}
            {isAnimating && currentStep < 3 && (
              <div className="text-center mt-8">
                <motion.div
                  className="inline-flex items-center space-x-2 text-rain-storm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-rain-medium rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-rain-medium rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-rain-medium rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="rain-text text-sm ml-2">AI가 당신의 감성을 분석하고 있습니다...</span>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}