import { Perfume, UserAnswer, RecommendationResult, RainType, Mood, Personality } from '@/types/perfume';
import { questions } from '@/data/questions';
import { perfumes } from '@/data/perfumes';

export function calculateRecommendation(answers: UserAnswer[]): RecommendationResult[] {
  // 사용자의 선택에서 선호도 추출
  const userPreferences = extractUserPreferences(answers);
  
  // 각 향수와의 매칭 점수 계산
  const results = perfumes.map(perfume => {
    const matchScore = calculateMatchScore(perfume, userPreferences);
    const matchReasons = generateMatchReasons(perfume, userPreferences);
    const poeticDescription = generatePoeticDescription(perfume, userPreferences);
    const rainMetaphor = generateRainMetaphor(perfume);
    
    return {
      perfume,
      matchScore,
      matchReasons,
      poeticDescription,
      rainMetaphor
    };
  });
  
  // 점수 기준으로 정렬하여 상위 3개 반환
  return results
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}

interface UserPreferences {
  rainTypes: RainType[];
  moods: Mood[];
  personalities: Personality[];
  preferredIntensity: number[];
  preferredTimeOfDay: string[];
}

function extractUserPreferences(answers: UserAnswer[]): UserPreferences {
  const preferences: UserPreferences = {
    rainTypes: [],
    moods: [],
    personalities: [],
    preferredIntensity: [],
    preferredTimeOfDay: []
  };
  
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;
    
    answer.selectedOptions.forEach(optionId => {
      const option = question.options.find(o => o.id === optionId);
      if (!option) return;
      
      if (option.rainType) {
        preferences.rainTypes.push(option.rainType);
      }
      if (option.mood) {
        preferences.moods.push(...option.mood);
      }
      if (option.personality) {
        preferences.personalities.push(...option.personality);
      }
    });
  });
  
  // 선호 강도 추론
  if (preferences.moods.includes('dramatic') || preferences.moods.includes('mysterious')) {
    preferences.preferredIntensity.push(4, 5);
  } else if (preferences.moods.includes('peaceful') || preferences.moods.includes('cozy')) {
    preferences.preferredIntensity.push(2, 3);
  } else {
    preferences.preferredIntensity.push(3);
  }
  
  // 선호 시간대 추론
  if (preferences.rainTypes.includes('misty-morning') || preferences.moods.includes('peaceful')) {
    preferences.preferredTimeOfDay.push('dawn', 'morning');
  }
  if (preferences.rainTypes.includes('stormy-night') || preferences.moods.includes('mysterious')) {
    preferences.preferredTimeOfDay.push('night', 'evening');
  }
  
  return preferences;
}

function calculateMatchScore(perfume: Perfume, preferences: UserPreferences): number {
  let score = 0;
  
  // 비 유형 매칭 (40%)
  if (preferences.rainTypes.includes(perfume.rainType)) {
    score += 40;
  } else {
    // 부분 매칭 점수
    const similarRainTypes = getSimilarRainTypes(perfume.rainType);
    const matchCount = preferences.rainTypes.filter(rt => similarRainTypes.includes(rt)).length;
    score += matchCount * 10;
  }
  
  // 무드 매칭 (30%)
  const moodMatches = perfume.mood.filter(m => preferences.moods.includes(m)).length;
  score += (moodMatches / Math.max(perfume.mood.length, preferences.moods.length)) * 30;
  
  // 성격 매칭 (20%)
  const personalityMatches = perfume.personality.filter(p => preferences.personalities.includes(p)).length;
  score += (personalityMatches / Math.max(perfume.personality.length, preferences.personalities.length)) * 20;
  
  // 강도 매칭 (5%)
  if (preferences.preferredIntensity.includes(perfume.intensity)) {
    score += 5;
  }
  
  // 시간대 매칭 (5%)
  if (preferences.preferredTimeOfDay.includes(perfume.timeOfDay) || perfume.timeOfDay === 'anytime') {
    score += 5;
  }
  
  return Math.min(score, 100);
}

function getSimilarRainTypes(rainType: RainType): RainType[] {
  const similarityMap: Record<RainType, RainType[]> = {
    'misty-morning': ['gentle-drizzle', 'after-rain'],
    'gentle-drizzle': ['misty-morning', 'rain-on-leaves'],
    'summer-shower': ['after-rain', 'urban-rain'],
    'melancholy-rain': ['window-tapping', 'autumn-rain'],
    'stormy-night': ['dramatic-rain', 'monsoon'],
    'after-rain': ['summer-shower', 'misty-morning'],
    'window-tapping': ['melancholy-rain', 'gentle-drizzle'],
    'rain-on-leaves': ['forest-rain', 'gentle-drizzle'],
    'urban-rain': ['summer-shower', 'autumn-rain'],
    'forest-rain': ['rain-on-leaves', 'misty-morning']
  };
  
  return similarityMap[rainType] || [];
}

function generateMatchReasons(perfume: Perfume, preferences: UserPreferences): string[] {
  const reasons: string[] = [];
  
  if (preferences.rainTypes.includes(perfume.rainType)) {
    reasons.push(`당신이 사랑하는 ${getRainTypeKorean(perfume.rainType)}의 정서를 담고 있습니다`);
  }
  
  const moodMatches = perfume.mood.filter(m => preferences.moods.includes(m));
  if (moodMatches.length > 0) {
    reasons.push(`${moodMatches.map(m => getMoodKorean(m)).join(', ')} 분위기를 완벽하게 표현합니다`);
  }
  
  const personalityMatches = perfume.personality.filter(p => preferences.personalities.includes(p));
  if (personalityMatches.length > 0) {
    reasons.push(`${personalityMatches.map(p => getPersonalityKorean(p)).join(', ')} 성향과 잘 어울립니다`);
  }
  
  return reasons;
}

function generatePoeticDescription(perfume: Perfume, preferences: UserPreferences): string {
  const descriptions = [
    `${perfume.description} 이 향은 마치 ${getRainTypePoetic(perfume.rainType)}처럼 당신의 마음속 깊은 곳을 적십니다.`,
    `장마철 ${getTimeOfDayKorean(perfume.timeOfDay)}의 정취를 담아, ${perfume.notes.join(', ')}의 향이 빗방울처럼 흩어집니다.`,
    `${getMoodPoetic(perfume.mood[0])} 감성을 지닌 당신에게, 이 향은 ${getSeasonKorean(perfume.season)}의 추억을 선물합니다.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generateRainMetaphor(perfume: Perfume): string {
  const metaphors: Record<RainType, string> = {
    'misty-morning': '새벽안개처럼 신비롭게 다가오는 향',
    'gentle-drizzle': '부슬비처럼 섬세하게 스며드는 향',
    'summer-shower': '여름 소나기처럼 시원하게 쏟아지는 향',
    'melancholy-rain': '창가에 흐르는 빗물처럼 감성적인 향',
    'stormy-night': '폭풍우처럼 강렬하게 몰아치는 향',
    'after-rain': '비 갠 후의 맑은 하늘처럼 상쾌한 향',
    'window-tapping': '창문을 두드리는 빗소리처럼 그리운 향',
    'rain-on-leaves': '나뭇잎 위의 빗방울처럼 생명력 있는 향',
    'urban-rain': '도시의 빗길처럼 세련되고 모던한 향',
    'forest-rain': '숲속의 빗소리처럼 깊고 평화로운 향'
  };
  
  return metaphors[perfume.rainType] || '장마의 정취를 담은 특별한 향';
}

// 한글 변환 헬퍼 함수들
function getRainTypeKorean(rainType: RainType): string {
  const map: Record<RainType, string> = {
    'misty-morning': '안개 낀 새벽',
    'gentle-drizzle': '부슬비',
    'summer-shower': '여름 소나기',
    'melancholy-rain': '우울한 비',
    'stormy-night': '폭풍우',
    'after-rain': '비 갠 후',
    'window-tapping': '창문을 두드리는 비',
    'rain-on-leaves': '나뭇잎 위의 비',
    'urban-rain': '도시의 비',
    'forest-rain': '숲속의 비'
  };
  return map[rainType] || rainType;
}

function getRainTypePoetic(rainType: RainType): string {
  const map: Record<RainType, string> = {
    'misty-morning': '새벽의 안개비가 세상을 부드럽게 감싸는 순간',
    'gentle-drizzle': '속삭이듯 내리는 부슬비',
    'summer-shower': '뜨거운 대지를 식혀주는 시원한 여름비',
    'melancholy-rain': '마음속 그리움을 불러일으키는 센치한 빗줄기',
    'stormy-night': '하늘이 울부짖는 드라마틱한 밤',
    'after-rain': '세상을 깨끗이 씻어낸 후의 청명함',
    'window-tapping': '추억을 노크하는 빗방울',
    'rain-on-leaves': '생명에게 속삭이는 자연의 선물',
    'urban-rain': '도시의 불빛에 반짝이는 빗방울',
    'forest-rain': '나무들이 춤추는 숲속의 교향곡'
  };
  return map[rainType] || '특별한 비';
}

function getMoodKorean(mood: Mood): string {
  const map: Record<Mood, string> = {
    'nostalgic': '그리운',
    'romantic': '로맨틱한',
    'contemplative': '사색적인',
    'peaceful': '평화로운',
    'melancholic': '애잔한',
    'refreshing': '상쾌한',
    'mysterious': '신비로운',
    'cozy': '아늑한',
    'dramatic': '드라마틱한',
    'dreamy': '몽환적인'
  };
  return map[mood] || mood;
}

function getMoodPoetic(mood: Mood): string {
  const map: Record<Mood, string> = {
    'nostalgic': '추억 속을 거니는 듯한',
    'romantic': '사랑이 피어나는',
    'contemplative': '깊은 생각에 잠기는',
    'peaceful': '고요한 평화를 느끼는',
    'melancholic': '쓸쓸한 아름다움을 간직한',
    'refreshing': '새로운 시작을 알리는',
    'mysterious': '비밀을 품은 듯한',
    'cozy': '따뜻한 위로를 주는',
    'dramatic': '강렬한 감동을 선사하는',
    'dreamy': '꿈결 같은'
  };
  return map[mood] || '특별한';
}

function getPersonalityKorean(personality: Personality): string {
  const map: Record<Personality, string> = {
    'introvert': '내향적인',
    'extrovert': '외향적인',
    'creative': '창의적인',
    'analytical': '분석적인',
    'emotional': '감성적인',
    'practical': '실용적인',
    'adventurous': '모험적인',
    'traditional': '전통적인'
  };
  return map[personality] || personality;
}

function getSeasonKorean(season: Season): string {
  const map: Record<Season, string> = {
    'spring-rain': '봄비',
    'summer-rain': '여름비',
    'autumn-rain': '가을비',
    'monsoon': '장마'
  };
  return map[season] || season;
}

function getTimeOfDayKorean(timeOfDay: TimeOfDay): string {
  const map: Record<TimeOfDay, string> = {
    'dawn': '새벽',
    'morning': '아침',
    'afternoon': '오후',
    'evening': '저녁',
    'night': '밤',
    'anytime': '하루 중 언제든'
  };
  return map[timeOfDay] || timeOfDay;
}
