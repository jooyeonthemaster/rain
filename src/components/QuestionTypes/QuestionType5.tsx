'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Option {
  text: string;
  value: string;
}

interface QuestionType5Props {
  question: string;
  options: Option[];
  selectedAnswer: string | null;
  onAnswer: (value: string) => void;
}

const actionEmojis = {
  solo_walk: '🚶‍♀️',
  shared_moments: '💕',
  garden_bloom: '🌸',
  new_beginning: '🌱'
};

export default function QuestionType5({ question, options, selectedAnswer, onAnswer }: QuestionType5Props) {
  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-effect rounded-3xl p-8 rain-shadow">
          <h2 className="rain-title text-xl font-light text-rain-midnight leading-relaxed">
            {question}
          </h2>
        </div>
      </motion.div>

      <div className="space-y-4">
        {options.map((option, index) => {
          const emojiKey = option.value as keyof typeof actionEmojis;
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onAnswer(option.value)}
              className={`cursor-pointer transition-all duration-300 ${
                selectedAnswer === option.value
                  ? 'glass-effect-dark text-white transform scale-102'
                  : 'glass-effect hover:glass-effect-dark hover:text-white'
              }`}
              style={{ borderRadius: '20px', padding: '20px' }}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">
                  {actionEmojis[emojiKey]}
                </div>
                <span className="rain-text text-base flex-1">
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
