'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Option {
  text: string;
  value: string;
}

interface QuestionType6Props {
  question: string;
  options: Option[];
  selectedAnswer: string | null;
  onAnswer: (value: string) => void;
}

const meanings = {
  time_for_reflection: "성찰",
  comforting_rest: "위로", 
  creative_inspiration: "영감",
  humbling_nature: "겸손"
};

export default function QuestionType6({ question, options, selectedAnswer, onAnswer }: QuestionType6Props) {
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

      <div className="grid grid-cols-1 gap-6">
        {options.map((option, index) => {
          const meaningKey = option.value as keyof typeof meanings;
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => onAnswer(option.value)}
              className={`cursor-pointer transition-all duration-500 ${
                selectedAnswer === option.value
                  ? 'transform scale-102'
                  : 'hover:transform hover:scale-101'
              }`}
            >
              <div className={`relative overflow-hidden rounded-3xl p-8 text-center ${
                selectedAnswer === option.value
                  ? 'glass-effect-dark text-white rain-shadow'
                  : 'glass-effect hover:glass-effect-dark hover:text-white rain-border'
              }`}>
                <div className="mb-4">
                  <span className="rain-title text-3xl font-light text-rain-shimmer">
                    {meanings[meaningKey]}
                  </span>
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
