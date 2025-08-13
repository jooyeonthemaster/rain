'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { questions } from '@/data/questions';
import { UserAnswer } from '@/types/perfume';

// 다양한 질문 타입 컴포넌트들
import QuestionType1 from './QuestionTypes/QuestionType1';
import QuestionType2 from './QuestionTypes/QuestionType2';
import QuestionType3 from './QuestionTypes/QuestionType3';
import QuestionType4 from './QuestionTypes/QuestionType4';
import QuestionType5 from './QuestionTypes/QuestionType5';
import QuestionType6 from './QuestionTypes/QuestionType6';
import QuestionType7 from './QuestionTypes/QuestionType7';

interface QuestionFlowProps {
  onComplete: (answers: UserAnswer[]) => void;
}

const questionComponents = [
  QuestionType1, // 풍경 선택 - 카드 형태
  QuestionType2, // 감정 선택 - 이모티콘 카드
  QuestionType3, // 소리 선택 - 사운드 비주얼라이저
  QuestionType4, // 색상 선택 - 색상 팔레트
  QuestionType5, // 행동 선택 - 액션 카드
  QuestionType6, // 의미 선택 - 타이포그래피
  QuestionType7, // 향 계열 - 향수병 모양
];

export default function QuestionFlow({ onComplete }: QuestionFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (value: string) => {
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer: value,
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id), newAnswer];
    setAnswers(updatedAnswers);
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      setIsLoading(true);
      
      try {
        // Gemini AI 추천 요청
        const response = await fetch('/api/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers: answers.reduce((acc, answer) => {
              acc[answer.questionId] = answer.answer;
              return acc;
            }, {} as Record<string, string>)
          }),
        });

        const result = await response.json();
        
        if (result.success) {
          onComplete(result.data);
        } else {
          console.error('추천 실패:', result.error);
          // 백업 로직
          onComplete(answers);
        }
      } catch (error) {
        console.error('추천 요청 오류:', error);
        onComplete(answers);
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };

  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id)?.answer || null;
  const canProceed = currentAnswer !== null;

  // 현재 질문에 맞는 컴포넌트 선택
  const QuestionComponent = questionComponents[currentQuestionIndex] || QuestionType1;

  return (
    <div className="min-h-screen flex flex-col relative z-20">
      {/* 진행률 표시 */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-rain-whisper via-rain-breath to-rain-whisper z-30">
        <motion.div
          className="h-full bg-gradient-to-r from-rain-medium via-rain-storm to-rain-medium rain-shadow"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[420px] mx-auto">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-10 question-container"
          >
            {/* 질문 번호 */}
            <div className="text-center animate-fade-in-up">
              <span className="text-rain-sigh text-sm tracking-wider opacity-80">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>

            {/* 동적 질문 컴포넌트 */}
            <QuestionComponent
              question={currentQuestion.text}
              options={currentQuestion.options}
              selectedAnswer={currentAnswer}
              onAnswer={handleAnswer}
            />

            {/* 네비게이션 버튼 */}
            <div className="flex gap-6 pt-8">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex-1 py-4 rounded-full border-2 border-rain-sigh text-rain-storm hover:glass-effect-dark hover:text-white hover:border-rain-storm transition-all duration-300 rain-interactive font-medium"
                >
                  이전
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={!canProceed || isLoading}
                className={`${currentQuestionIndex === 0 ? 'flex-1' : 'flex-1'} py-4 rounded-full transition-all duration-300 font-medium ${
                  !canProceed || isLoading
                    ? 'bg-rain-sigh text-white opacity-60 cursor-not-allowed'
                    : 'rain-gradient text-white hover:bg-rain-storm rain-shadow rain-interactive'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>AI 분석 중...</span>
                  </div>
                ) : isLastQuestion ? (
                  '나만의 장마향 찾기'
                ) : (
                  '다음'
                )}
              </button>
            </div>

            {/* 진행 상황 표시 */}
            <div className="flex justify-center space-x-2 pt-4">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index <= currentQuestionIndex
                      ? 'bg-rain-storm w-6 rain-shadow'
                      : 'bg-rain-sigh hover:bg-rain-medium hover:w-3'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-rain-medium to-rain-storm opacity-5"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}