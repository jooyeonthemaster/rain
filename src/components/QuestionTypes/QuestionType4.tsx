'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Option {
  text: string;
  value: string;
}

interface QuestionType4Props {
  question: string;
  options: Option[];
  selectedAnswer: string | null;
  onAnswer: (value: string) => void;
}

const colorPalettes = {
  deep_tones: {
    primary: '#2C3E50',
    secondary: '#34495E',
    accent: '#95A5A6',
    gradient: 'from-slate-600 via-slate-700 to-slate-800'
  },
  earthy_tones: {
    primary: '#8B7355',
    secondary: '#A0522D',
    accent: '#DEB887',
    gradient: 'from-amber-600 via-yellow-700 to-orange-800'
  },
  bright_accents: {
    primary: '#F39C12',
    secondary: '#E67E22',
    accent: '#F1C40F',
    gradient: 'from-yellow-400 via-orange-400 to-red-400'
  },
  clear_tones: {
    primary: '#3498DB',
    secondary: '#85C1E9',
    accent: '#FFFFFF',
    gradient: 'from-blue-300 via-cyan-200 to-white'
  }
};

export default function QuestionType4({ question, options, selectedAnswer, onAnswer }: QuestionType4Props) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, rotateX: -30 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-effect rounded-3xl p-10 rain-shadow relative overflow-hidden">
          <h2 className="rain-title text-2xl font-light text-rain-midnight leading-relaxed text-shadow-soft mb-6">
            {question}
          </h2>
          
          {/* 색상 스펙트럼 배경 */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-500 via-amber-500 via-yellow-400 to-blue-400 opacity-30 rounded-b-3xl" />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {options.map((option, index) => {
          const paletteKey = option.value as keyof typeof colorPalettes;
          const palette = colorPalettes[paletteKey];
          
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, rotateY: 45, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
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
              <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
                selectedAnswer === option.value
                  ? 'ring-4 ring-white ring-opacity-50 rain-shadow'
                  : 'hover:ring-2 hover:ring-white hover:ring-opacity-30 rain-border'
              }`}>
                
                {/* 색상 팔레트 영역 */}
                <div className={`h-32 bg-gradient-to-br ${palette.gradient} relative overflow-hidden`}>
                  
                  {/* 색상 원들 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 rounded-full shadow-lg"
                      style={{ backgroundColor: palette.primary }}
                      animate={selectedAnswer === option.value ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      } : hoveredOption === option.value ? {
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-8 h-8 rounded-full shadow-lg ml-4"
                      style={{ backgroundColor: palette.secondary }}
                      animate={selectedAnswer === option.value ? {
                        scale: [1, 1.15, 1],
                        rotate: [0, -180, -360]
                      } : hoveredOption === option.value ? {
                        scale: [1, 1.05, 1]
                      } : {}}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div
                      className="w-6 h-6 rounded-full shadow-lg ml-3"
                      style={{ backgroundColor: palette.accent }}
                      animate={selectedAnswer === option.value ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 90, 180]
                      } : hoveredOption === option.value ? {
                        scale: [1, 1.03, 1]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                  </div>

                  {/* 색상 파티클 */}
                  {(selectedAnswer === option.value || hoveredOption === option.value) && (
                    <div className="absolute inset-0">
                      {Array.from({ length: 8 }, (_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full opacity-60"
                          style={{ 
                            backgroundColor: i % 3 === 0 ? palette.primary : i % 3 === 1 ? palette.secondary : palette.accent,
                            left: `${20 + (i * 10)}%`,
                            top: `${20 + Math.sin(i) * 30}%`
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* 선택 체크 */}
                  {selectedAnswer === option.value && (
                    <motion.div
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <span className="text-rain-storm text-lg font-bold">✓</span>
                    </motion.div>
                  )}
                </div>

                {/* 텍스트 영역 */}
                <div className="glass-effect p-6 relative">
                  <span className="rain-text text-sm leading-relaxed block text-center">
                    {option.text}
                  </span>
                  
                  {/* 하단 색상 바 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
                    style={{
                      background: `linear-gradient(to right, ${palette.primary}, ${palette.secondary}, ${palette.accent})`
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 선택된 색상에 대한 추가 설명 */}
      {selectedAnswer && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="glass-effect rounded-2xl p-6 max-w-lg mx-auto relative overflow-hidden">
            <p className="rain-text text-rain-storm text-sm opacity-80 italic relative z-10">
              "색깔이 말해주는 당신의 내면... 아름답습니다. 🎨"
            </p>
            
            {/* 배경 색상 효과 */}
            <div 
              className="absolute inset-0 opacity-10 rounded-2xl"
              style={{
                background: `linear-gradient(45deg, ${colorPalettes[selectedAnswer as keyof typeof colorPalettes].primary}, ${colorPalettes[selectedAnswer as keyof typeof colorPalettes].accent})`
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
