import { Question } from "@/types/question";

export const questions: Question[] = [
  {
    id: "q1",
    text: "어느 비 내리는 날, 당신의 마음을 가장 흔들었던 풍경은 무엇인가요?",
    options: [
      { text: "창밖을 두드리는 빗소리에 잠 못 이루던 도시의 밤", value: "night_city" },
      { text: "안개 낀 숲길을 걷다 마주한 촉촉한 나무 내음", value: "misty_forest" },
      { text: "따뜻한 차 한 잔과 함께, 창가에 앉아 비를 바라보던 순간", value: "cozy_window" },
      { text: "거친 바람과 함께 몰아치는 소나기 속, 역동적인 자연의 힘", value: "dynamic_nature" },
    ],
  },
  {
    id: "q2",
    text: "비가 내리기 시작할 때, 당신의 마음속에 피어나는 감정은 무엇인가요?",
    options: [
      { text: "고요함 속에서 찾아오는 평온함과 사색", value: "peaceful_reflection" },
      { text: "어딘가 아련하고 그리운, 아련한 향수", value: "nostalgic_longing" },
      { text: "새로운 시작을 알리는 듯한, 생기 넘치는 활력", value: "vibrant_energy" },
      { text: "알 수 없는 신비로움과 미지의 세계에 대한 호기심", value: "mysterious_curiosity" },
    ],
  },
  {
    id: "q3",
    text: "비 오는 날, 당신이 가장 듣고 싶은 소리는 무엇인가요?",
    options: [
      { text: "창문을 타고 흐르는 빗방울의 속삭임", value: "whispering_rain" },
      { text: "흙냄새와 함께 퍼지는 풀벌레 소리", value: "earthy_insects" },
      { text: "잔잔한 재즈 음악과 커피 향이 어우러진 카페의 소음", value: "cafe_jazz" },
      { text: "천둥 번개가 치는 밤, 자연의 웅장한 교향곡", value: "thunder_symphony" },
    ],
  },
  {
    id: "q4",
    text: "비 오는 날, 당신이 가장 즐겨 입는 옷의 색깔은 무엇인가요?",
    options: [
      { text: "차분하고 깊이 있는 짙은 회색 또는 남색", value: "deep_tones" },
      { text: "자연의 색을 닮은 부드러운 녹색 또는 갈색", value: "earthy_tones" },
      { text: "어두운 비 속에서도 빛나는 밝은 노란색 또는 주황색", value: "bright_accents" },
      { text: "투명하고 깨끗한 느낌의 흰색 또는 하늘색", value: "clear_tones" },
    ],
  },
  {
    id: "q5",
    text: "비가 그친 뒤, 당신이 가장 먼저 하고 싶은 일은 무엇인가요?",
    options: [
      { text: "젖은 거리를 홀로 걷는 산책", value: "solo_walk" },
      { text: "맑아진 하늘 아래, 사랑하는 사람과 함께하는 시간", value: "shared_moments" },
      { text: "새롭게 피어난 꽃들의 향기를 맡으며 정원 가꾸기", value: "garden_bloom" },
      { text: "빗물로 씻겨 내려간 세상의 새로운 시작을 관찰하기", value: "new_beginning" },
    ],
  },
  {
    id: "q6",
    text: "당신에게 '장마'는 어떤 의미로 다가오나요?",
    options: [
      { text: "잠시 멈춰 서서 자신을 돌아보는 성찰의 시간", value: "time_for_reflection" },
      { text: "지친 일상에 촉촉한 위로를 건네는 휴식", value: "comforting_rest" },
      { text: "새로운 영감과 창조적인 에너지를 불어넣는 계절", value: "creative_inspiration" },
      { text: "자연의 순환을 느끼며 겸허해지는 순간", value: "humbling_nature" },
    ],
  },
  {
    id: "q7",
    text: "만약 당신의 장마가 하나의 향으로 표현된다면, 어떤 느낌일까요?",
    options: [
      { text: "차분하고 깊이 있는 우디 계열의 흙내음", value: "deep_woody" },
      { text: "싱그럽고 청량한 시트러스 또는 그린 계열의 풀내음", value: "fresh_green" },
      { text: "달콤하고 포근한 플로럴 또는 머스크 계열의 꽃내음", value: "sweet_floral" },
      { text: "신비롭고 독특한 스파이시 또는 레더 계열의 이국적인 향", value: "mysterious_spicy" },
    ],
  },
];