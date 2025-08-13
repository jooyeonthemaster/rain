'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Option {
  text: string;
  value: string;
}

interface QuestionType1Props {
  question: string;
  options: Option[];
  selectedAnswer: string | null;
  onAnswer: (value: string) => void;
}

export default function QuestionType1({ question, options, selectedAnswer, onAnswer }: QuestionType1Props) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-effect rounded-3xl p-10 rain-shadow animate-gentle-float">
          <h2 className="rain-title text-2xl font-light text-rain-midnight leading-relaxed text-shadow-soft mb-6">
            {question}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rain-medium to-rain-storm mx-auto rounded-full opacity-60" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onHoverStart={() => setHoveredOption(option.value)}
            onHoverEnd={() => setHoveredOption(null)}
            onClick={() => onAnswer(option.value)}
            className={`relative overflow-hidden cursor-pointer transition-all duration-500 ${
              selectedAnswer === option.value
                ? 'glass-effect-dark text-white transform scale-[1.02] rain-shadow'
                : 'glass-effect hover:glass-effect-dark hover:text-white rain-border'
            }`}
            style={{
              borderRadius: '24px',
              padding: '24px',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-start space-x-4">
                <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 mt-1 ${
                  selectedAnswer === option.value 
                    ? 'bg-white border-white' 
                    : 'border-rain-medium hover:border-white'
                }`}>
                  {selectedAnswer === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-rain-storm rounded-full m-1"
                    />
                  )}
                </div>
                <span className="rain-text text-base leading-relaxed flex-1 block">
                  {option.text}
                </span>
              </div>
            </div>

            {/* 호버 효과 */}
            {hoveredOption === option.value && selectedAnswer !== option.value && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rain-medium to-rain-storm opacity-20 rounded-3xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* 선택 효과 */}
            {selectedAnswer === option.value && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-rain-storm via-rain-medium to-rain-deep rounded-3xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ zIndex: -1 }}
              />
            )}

            {/* 물방울 애니메이션 */}
            {selectedAnswer === option.value && (
              <div className="absolute top-2 right-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: [0, Math.random() * 20 - 10],
                      y: [0, Math.random() * 20 + 10],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
