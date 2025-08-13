'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Option {
  text: string;
  value: string;
}

interface QuestionType2Props {
  question: string;
  options: Option[];
  selectedAnswer: string | null;
  onAnswer: (value: string) => void;
}

const emotionIcons = {
  peaceful_reflection: '🌙',
  nostalgic_longing: '💭',
  vibrant_energy: '✨',
  mysterious_curiosity: '🔮'
};

const emotionColors = {
  peaceful_reflection: 'from-blue-400 via-purple-300 to-indigo-400',
  nostalgic_longing: 'from-amber-300 via-orange-200 to-pink-300',
  vibrant_energy: 'from-yellow-300 via-green-300 to-cyan-300',
  mysterious_curiosity: 'from-purple-400 via-violet-300 to-fuchsia-400'
};

export default function QuestionType2({ question, options, selectedAnswer, onAnswer }: QuestionType2Props) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-effect rounded-full p-8 rain-shadow mx-auto max-w-md">
          <h2 className="rain-title text-xl font-light text-rain-midnight leading-relaxed text-shadow-soft">
            {question}
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {options.map((option, index) => {
          const iconKey = option.value as keyof typeof emotionIcons;
          const colorKey = option.value as keyof typeof emotionColors;
          
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              onHoverStart={() => setHoveredOption(option.value)}
              onHoverEnd={() => setHoveredOption(null)}
              onClick={() => onAnswer(option.value)}
              className={`relative cursor-pointer transition-all duration-500 transform-gpu ${
                selectedAnswer === option.value
                  ? 'scale-105 z-10'
                  : hoveredOption === option.value
                  ? 'scale-102 z-5'
                  : 'scale-100 z-0'
              }`}
            >
              <div className={`relative overflow-hidden rounded-3xl p-8 text-center transition-all duration-500 ${
                selectedAnswer === option.value
                  ? 'glass-effect-dark text-white rain-shadow'
                  : 'glass-effect hover:glass-effect-dark hover:text-white rain-border'
              }`}>
                
                {/* 배경 그라데이션 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${emotionColors[colorKey]} opacity-10 rounded-3xl transition-opacity duration-500 ${
                  selectedAnswer === option.value || hoveredOption === option.value ? 'opacity-30' : 'opacity-10'
                }`} />

                {/* 이모티콘 */}
                <motion.div
                  className="text-6xl mb-4 relative z-10"
                  animate={selectedAnswer === option.value ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0] 
                  } : {}}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {emotionIcons[iconKey]}
                </motion.div>

                {/* 텍스트 */}
                <div className="relative z-10">
                  <span className="rain-text text-sm leading-relaxed block font-medium">
                    {option.text}
                  </span>
                </div>

                {/* 선택 체크 마크 */}
                {selectedAnswer === option.value && (
                  <motion.div
                    className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <motion.div
                      className="text-rain-storm text-sm font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                )}

                {/* 호버 파티클 효과 */}
                {hoveredOption === option.value && selectedAnswer !== option.value && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 5 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-50"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + Math.sin(i) * 20}%`,
                        }}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 선택된 감정에 대한 추가 설명 */}
      {selectedAnswer && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="glass-effect rounded-2xl p-6 max-w-md mx-auto">
            <p className="rain-text text-rain-storm text-sm opacity-80 italic">
              "비가 내릴 때마다 당신의 마음이 이렇게 느껴지는군요..."
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
