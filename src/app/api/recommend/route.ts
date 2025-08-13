import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { perfumes } from '@/data/perfumes';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json();
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
당신은 전문적인 향수 조향사이자 심리학자입니다. 사용자의 장마철 감성과 선호도를 바탕으로 가장 완벽한 향수를 추천해주세요.

## 사용자 응답 분석:
${Object.entries(answers).map(([key, value]) => `${key}: ${value}`).join('\n')}

## 향수 데이터베이스:
${JSON.stringify(perfumes, null, 2)}

다음 JSON 형식으로 정확히 응답해주세요:

{
  "userProfile": {
    "rainType": "사용자의 장마 유형 (예: 도시의 밤비, 숲속의 이슬비 등)",
    "emotionalState": "감정 상태 설명",
    "personalityTrait": "성격적 특성",
    "recommendationReason": "이 사용자에게 이 향을 추천하는 이유"
  },
  "topRecommendations": [
    {
      "perfume": "추천 향수 객체 (perfumes 배열에서 정확히 선택)",
      "matchScore": 95,
      "whyPerfect": "이 향수가 완벽한 이유 (감성적이고 시적으로)",
      "whenToWear": "언제 착용하면 좋은지",
      "emotionalConnection": "이 향수와 사용자의 감정적 연결점"
    }
  ],
  "rainMoodAnalysis": {
    "dominantMood": "주된 감정",
    "hiddenDesires": "숨겨진 욕망이나 바람",
    "seasonalConnection": "장마철과의 연결점",
    "aromaTherapyEffect": "이 향수가 주는 아로마테라피 효과"
  },
  "poeticMessage": "사용자를 위한 시적이고 감성적인 메시지 (3-4줄)"
}

반드시 한국어로 응답하고, 매우 감성적이고 시적으로 작성해주세요. 장마철의 낭만과 감성을 최대한 살려서 답변해주세요.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // JSON 추출 (마크다운 코드 블록 제거)
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('AI 응답에서 JSON을 찾을 수 없습니다.');
    }
    
    const jsonText = jsonMatch[1] || jsonMatch[0];
    const aiRecommendation = JSON.parse(jsonText);

    return NextResponse.json({
      success: true,
      data: aiRecommendation
    });

  } catch (error) {
    console.error('Gemini AI 추천 오류:', error);
    
    // 백업 추천 시스템
    const fallbackRecommendation = {
      userProfile: {
        rainType: "감성적인 도시 장마",
        emotionalState: "차분하고 사색적인 상태",
        personalityTrait: "내향적이면서도 깊이 있는 성격",
        recommendationReason: "당신의 깊은 감성과 잘 어울리는 향을 선택했습니다."
      },
      topRecommendations: [
        {
          perfume: perfumes[0], // 기본값으로 첫 번째 향수
          matchScore: 88,
          whyPerfect: "도시의 비 내리는 밤처럼 깊이 있고 세련된 향입니다.",
          whenToWear: "비 오는 저녁, 혼자만의 시간을 가질 때",
          emotionalConnection: "고독한 아름다움 속에서 찾는 내면의 평화"
        }
      ],
      rainMoodAnalysis: {
        dominantMood: "평온한 사색",
        hiddenDesires: "내면의 깊은 안정감",
        seasonalConnection: "장마철의 차분한 리듬",
        aromaTherapyEffect: "마음의 평온과 집중력 향상"
      },
      poeticMessage: "비가 내리는 창가에서\n당신만의 향기로 채워가는\n조용하고 아름다운 시간들이\n삶의 가장 소중한 순간이 됩니다."
    };

    return NextResponse.json({
      success: true,
      data: fallbackRecommendation,
      fallback: true
    });
  }
}
