'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Option {
  text: string;
  value: string;
}

interface QuestionType3Props {
  question: string;
  options: Option[];
  selectedAnswer: string | null;
  onAnswer: (value: string) => void;
}

const soundWaves = {
  whispering_rain: [2, 4, 3, 5, 2, 6, 4, 3],
  earthy_insects: [3, 2, 4, 2, 5, 3, 6, 4],
  cafe_jazz: [4, 6, 5, 7, 4, 8, 6, 5],
  thunder_symphony: [6, 8, 7, 9, 6, 10, 8, 7]
};

const soundColors = {
  whispering_rain: 'bg-gradient-to-r from-blue-200 to-cyan-300',
  earthy_insects: 'bg-gradient-to-r from-green-200 to-emerald-300',
  cafe_jazz: 'bg-gradient-to-r from-amber-200 to-yellow-300',
  thunder_symphony: 'bg-gradient-to-r from-purple-200 to-violet-300'
};

export default function QuestionType3({ question, options, selectedAnswer, onAnswer }: QuestionType3Props) {
  const [activeWaves, setActiveWaves] = useState<Record<string, boolean>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOptionHover = (value: string) => {
    setActiveWaves(prev => ({ ...prev, [value]: true }));
  };

  const handleOptionLeave = (value: string) => {
    setActiveWaves(prev => ({ ...prev, [value]: false }));
  };

  if (!isClient) return null;

  return (
    <div className="space-y-10">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-effect rounded-3xl p-10 rain-shadow relative overflow-hidden">
          <h2 className="rain-title text-2xl font-light text-rain-midnight leading-relaxed text-shadow-soft relative z-10">
            {question}
          </h2>
          
          {/* 배경 파형 애니메이션 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-rain-medium mx-1 rounded-full"
                animate={{
                  height: [10, Math.random() * 40 + 20, 10],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {options.map((option, index) => {
          const waveKey = option.value as keyof typeof soundWaves;
          const colorKey = option.value as keyof typeof soundColors;
          const waves = soundWaves[waveKey] || [3, 4, 3, 5, 3, 6, 4, 3];
          
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              onHoverStart={() => handleOptionHover(option.value)}
              onHoverEnd={() => handleOptionLeave(option.value)}
              onClick={() => onAnswer(option.value)}
              className={`relative cursor-pointer transition-all duration-500 ${
                selectedAnswer === option.value
                  ? 'transform scale-102'
                  : 'transform scale-100 hover:scale-101'
              }`}
            >
              <div className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-500 ${
                selectedAnswer === option.value
                  ? 'glass-effect-dark text-white rain-shadow'
                  : 'glass-effect hover:glass-effect-dark hover:text-white rain-border'
              }`}>
                
                <div className="flex items-center space-x-6">
                  {/* 사운드 비주얼라이저 */}
                  <div className="flex items-end space-x-1 h-16 w-20">
                    {waves.map((height, i) => (
                      <motion.div
                        key={i}
                        className={`w-2 rounded-full transition-all duration-300 ${
                          selectedAnswer === option.value 
                            ? 'bg-white' 
                            : soundColors[colorKey]
                        }`}
                        animate={activeWaves[option.value] || selectedAnswer === option.value ? {
                          height: [height * 4, height * 8, height * 4],
                        } : {
                          height: height * 4
                        }}
                        transition={{
                          duration: 1,
                          repeat: activeWaves[option.value] || selectedAnswer === option.value ? Infinity : 0,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* 텍스트 */}
                  <div className="flex-1">
                    <span className="rain-text text-base leading-relaxed block">
                      {option.text}
                    </span>
                  </div>

                  {/* 재생 버튼 스타일 아이콘 */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedAnswer === option.value 
                      ? 'bg-white text-rain-storm' 
                      : 'bg-rain-light text-rain-storm hover:bg-white'
                  }`}>
                    {selectedAnswer === option.value ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        ⏸️
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={activeWaves[option.value] ? { 
                          scale: [1, 1.1, 1] 
                        } : {}}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        ▶️
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* 선택 시 파동 효과 */}
                {selectedAnswer === option.value && (
                  <motion.div
                    className="absolute inset-0 border-2 border-white rounded-3xl"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 선택된 소리에 대한 추가 설명 */}
      {selectedAnswer && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="glass-effect rounded-full px-8 py-4 inline-block">
            <p className="rain-text text-rain-storm text-sm opacity-80 italic">
              "이 소리가 당신의 마음을 울리는군요... 🎵"
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
