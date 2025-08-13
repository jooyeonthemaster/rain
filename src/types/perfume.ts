// 향수 정보 타입 정의
export interface Perfume {
  id: string;
  name: string;
  description: string;
  rainType: RainType;
  mood: Mood[];
  notes: string[];
  intensity: number; // 1-5
  season: Season;
  timeOfDay: TimeOfDay;
  personality: Personality[];
}

// 장마 유형
export type RainType = 
  | 'misty-morning' // 안개 낀 새벽
  | 'gentle-drizzle' // 부슬비
  | 'summer-shower' // 소나기
  | 'melancholy-rain' // 우울한 비
  | 'stormy-night' // 폭풍우
  | 'after-rain' // 비 갠 후
  | 'window-tapping' // 창문 두드리는 비
  | 'rain-on-leaves' // 나뭇잎 위의 비
  | 'urban-rain' // 도시의 비
  | 'forest-rain'; // 숲속의 비

// 분위기
export type Mood = 
  | 'nostalgic' // 그리운
  | 'romantic' // 로맨틱한
  | 'contemplative' // 사색적인
  | 'peaceful' // 평화로운
  | 'melancholic' // 우울한
  | 'refreshing' // 상쾌한
  | 'mysterious' // 신비로운
  | 'cozy' // 아늑한
  | 'dramatic' // 드라마틱한
  | 'dreamy'; // 몽환적인

// 계절감
export type Season = 'spring-rain' | 'summer-rain' | 'autumn-rain' | 'monsoon';

// 시간대
export type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night' | 'anytime';

// 성격 유형
export type Personality = 
  | 'introvert' // 내향적
  | 'extrovert' // 외향적
  | 'creative' // 창의적
  | 'analytical' // 분석적
  | 'emotional' // 감성적
  | 'practical' // 실용적
  | 'adventurous' // 모험적
  | 'traditional'; // 전통적

// 질문 타입
export interface Question {
  id: string;
  question: string;
  options: Option[];
  type: 'single' | 'multiple';
  category: QuestionCategory;
}

export interface Option {
  id: string;
  text: string;
  value: string;
  rainType?: RainType;
  mood?: Mood[];
  personality?: Personality[];
}

export type QuestionCategory = 'rain-preference' | 'mood' | 'activity' | 'memory' | 'personality';

// 사용자 답변
export interface UserAnswer {
  questionId: string;
  selectedOptions: string[];
}

// 추천 결과
export interface RecommendationResult {
  perfume: Perfume;
  matchScore: number;
  matchReasons: string[];
  poeticDescription: string;
  rainMetaphor: string;
}
