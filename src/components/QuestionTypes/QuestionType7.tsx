'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Option {
  text: string;
  value: string;
}

interface QuestionType7Props {
  question: string;
  options: Option[];
  selectedAnswer: string | null;
  onAnswer: (value: string) => void;
}

const scentBottles = {
  deep_woody: { shape: 'rounded-lg', color: 'from-amber-600 to-yellow-700', icon: '🌰' },
  fresh_green: { shape: 'rounded-full', color: 'from-green-400 to-emerald-500', icon: '🍃' },
  sweet_floral: { shape: 'rounded-3xl', color: 'from-pink-300 to-rose-400', icon: '🌸' },
  mysterious_spicy: { shape: 'rounded-xl', color: 'from-purple-500 to-violet-600', icon: '✨' }
};

export default function QuestionType7({ question, options, selectedAnswer, onAnswer }: QuestionType7Props) {
  return (
    <div className="space-y-10">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-effect rounded-3xl p-10 rain-shadow">
          <h2 className="rain-title text-2xl font-light text-rain-midnight leading-relaxed">
            {question}
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {options.map((option, index) => {
          const bottleKey = option.value as keyof typeof scentBottles;
          const bottle = scentBottles[bottleKey];
          
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => onAnswer(option.value)}
              className={`cursor-pointer transition-all duration-500 ${
                selectedAnswer === option.value
                  ? 'transform scale-105'
                  : 'hover:transform hover:scale-102'
              }`}
            >
              <div className={`relative overflow-hidden rounded-3xl p-8 text-center ${
                selectedAnswer === option.value
                  ? 'glass-effect-dark text-white rain-shadow'
                  : 'glass-effect hover:glass-effect-dark hover:text-white rain-border'
              }`}>
                
                {/* 향수병 모양 */}
                <div className="mb-6 flex justify-center">
                  <motion.div
                    className={`w-16 h-20 bg-gradient-to-b ${bottle.color} ${bottle.shape} shadow-lg relative`}
                    animate={selectedAnswer === option.value ? {
                      scale: [1, 1.1, 1],
                      rotateY: [0, 180, 360]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-sm opacity-80" />
                    <div className="absolute inset-0 bg-white opacity-20 rounded-l-lg" style={{ width: '30%' }} />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-2xl">
                      {bottle.icon}
                    </div>
                  </motion.div>
                </div>

                <span className="rain-text text-sm leading-relaxed block">
                  {option.text}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
