export type PresetId =
  | 'white-shirt'
  | 'black-slacks'
  | 'denim-pants'
  | 'navy-blazer'
  | 'crewneck-knit';

export type WeatherId = 'hot' | 'mild' | 'rain' | 'cold';

export type Recommendation = {
  top: string;
  bottom: string;
  shoesAcc: string;
  tip: string;
};

export type PresetItem = {
  id: PresetId;
  label: string;
  subLabel: string;
  emoji: string;
};

export type WeatherItem = {
  id: WeatherId;
  label: string;
  tempGuide: string;
  emoji: string;
  icon: string; // lucide icon name
};

export const PRESETS: PresetItem[] = [
  { id: 'white-shirt', label: '화이트 셔츠', subLabel: 'White Shirt', emoji: '👔' },
  { id: 'black-slacks', label: '블랙 슬랙스', subLabel: 'Black Slacks', emoji: '👖' },
  { id: 'denim-pants', label: '데님 팬츠', subLabel: 'Denim Pants', emoji: '🧵' },
  { id: 'navy-blazer', label: '네이비 블레이저', subLabel: 'Navy Blazer', emoji: '🧥' },
  { id: 'crewneck-knit', label: '베이직 크루넥 니트', subLabel: 'Crewneck Knit', emoji: '🧶' },
];

export const WEATHERS: WeatherItem[] = [
  { id: 'hot', label: '맑고 더움', tempGuide: '28°C 이상', emoji: '☀️', icon: 'Sun' },
  { id: 'mild', label: '쾌적 / 선선함', tempGuide: '20~27°C', emoji: '⛅', icon: 'CloudSun' },
  { id: 'rain', label: '비 / 흐림', tempGuide: '습함', emoji: '🌧️', icon: 'CloudRain' },
  { id: 'cold', label: '쌀쌀함 / 에어컨 강함', tempGuide: '20°C 이하', emoji: '💨', icon: 'Wind' },
];

export const PRESET_LABEL: Record<PresetId, string> = {
  'white-shirt': '화이트 셔츠',
  'black-slacks': '블랙 슬랙스',
  'denim-pants': '데님 팬츠',
  'navy-blazer': '네이비 블레이저',
  'crewneck-knit': '베이직 크루넥 니트',
};

// 5 presets x 4 weathers = 20 combinations
const TABLE: Record<PresetId, Record<WeatherId, Recommendation>> = {
  'white-shirt': {
    hot: {
      top: '화이트 셔츠 (소매 걷어 입기)',
      bottom: '베이지 린넨 쇼츠 팬츠',
      shoesAcc: '메리제인 플랫 + 선글라스',
      tip: '☀️ 시원한 린넨 소재와 넉넉한 핏으로 더운 날에도 산뜻한 오피스룩을 완성했어요.',
    },
    mild: {
      top: '화이트 셔츠',
      bottom: '차콜 그레이 테이퍼드 슬랙스',
      shoesAcc: '화이트 가죽 스니커즈',
      tip: '⛅ 가장 무난한 그레이 슬랙스와 스니커즈로 캐주얼한 오피스룩을 매칭했어요.',
    },
    rain: {
      top: '화이트 셔츠',
      bottom: '다크 네이비 슬랙스',
      shoesAcc: '블랙 레인부츠 + 우산',
      tip: '🌧️ 비 젖어도 튀지 않는 다크 톤 하의와 방수 슈즈로 실용성을 챙겼어요.',
    },
    cold: {
      top: '화이트 셔츠 + 그레이 가디건',
      bottom: '차콜 그레이 슬랙스',
      shoesAcc: '블랙 로퍼',
      tip: '💨 셔츠 위에 가디건을 레이어드해 에어컨 추위에도 단정함을 유지했어요.',
    },
  },
  'black-slacks': {
    hot: {
      top: '민트색 반팔 폴로 셔츠',
      bottom: '블랙 슬랙스 (쿨링 소재)',
      shoesAcc: '스웨이드 로퍼 (노쇼)',
      tip: '☀️ 쿨링 소재 슬랙스와 시원한 톤의 폴로로 더위 속에서도 깔끔하게 매칭했어요.',
    },
    mild: {
      top: '스트라이프 옥스포드 셔츠',
      bottom: '블랙 슬랙스',
      shoesAcc: '블랙 미니멀 스니커즈',
      tip: '⛅ 패턴 셔츠로 포인트를 주고 블랙 슬랙스로 차분하게 마무리했어요.',
    },
    rain: {
      top: '다크 그레이 크루넥 티',
      bottom: '블랙 슬랙스',
      shoesAcc: '블랙 레인부츠 + 우산',
      tip: '🌧️ 다크 톤 상하의로 비 오는 날 오염을 최소화한 심플 코디예요.',
    },
    cold: {
      top: '네이비 크루넥 니트',
      bottom: '블랙 슬랙스',
      shoesAcc: '블랙 가죽 로퍼',
      tip: '💨 니트와 슬랙스의 네이비-블랙 조합으로 포멀하면서 따뜻하게 입었어요.',
    },
  },
  'denim-pants': {
    hot: {
      top: '화이트 반팔 크루넥 티',
      bottom: '인디고 데님 팬츠 (린넨 블렌드)',
      shoesAcc: '캔버스 슬립온',
      tip: '☀️ 린넨 블렌드 데님과 반팔 티로 캐주얼 프라이데이룩을 시원하게 매칭했어요.',
    },
    mild: {
      top: '차콜 그레이 크루넥 티',
      bottom: '인디고 데님 팬츠',
      shoesAcc: '화이트 스니커즈',
      tip: '⛅ 무난한 그레이 티와 화이트 스니커즈로 데님을 오피스에 맞게 다듬었어요.',
    },
    rain: {
      top: '블랙 롱슬리브 티',
      bottom: '블랙 워싱 데님 팬츠',
      shoesAcc: '블랙 레인부츠 + 우산',
      tip: '🌧️ 블랙 톤 데님과 상의로 비 오는 날 물들어 보이지 않게 코디했어요.',
    },
    cold: {
      top: '베이지 크루넥 니트',
      bottom: '인디고 데님 팬츠',
      shoesAcc: '브라운 가죽 부츠',
      tip: '💨 니트와 부츠로 데님을 따뜻하고 세련된 가을 오피스룩으로 풀었어요.',
    },
  },
  'navy-blazer': {
    hot: {
      top: '화이트 반팔 티',
      bottom: '베이지 치노 쇼츠',
      shoesAcc: '블랙 로퍼 + 선글라스',
      tip: '☀️ 블레이저를 가볍게 걸치고 시원한 치노 쇼츠로 세미 포멀하게 매칭했어요.',
    },
    mild: {
      top: '화이트 옥스포드 셔츠',
      bottom: '그레이 울 슬랙스',
      shoesAcc: '브라운 가죽 로퍼',
      tip: '⛅ 네이비-그레이-브라운의 정석적인 조합으로 단정한 오피스룩을 완성했어요.',
    },
    rain: {
      top: '화이트 크루넥 티',
      bottom: '블랙 슬랙스',
      shoesAcc: '블랙 레더 로퍼 + 우산',
      tip: '🌧️ 블레이저 안쪽은 심플하게, 하의는 다크 톤으로 비 날씨에 대비했어요.',
    },
    cold: {
      top: '화이트 셔츠 + 그레이 베스트',
      bottom: '차콜 그레이 슬랙스',
      shoesAcc: '블랙 가죽 로퍼',
      tip: '💨 베스트 레이어드로 보온을 챙기고 블레이저로 포멀함을 더했어요.',
    },
  },
  'crewneck-knit': {
    hot: {
      top: '크루넥 니트 (얇은 면 블렌드)',
      bottom: '베이지 린넨 팬츠',
      shoesAcc: '화이트 슬립온',
      tip: '☀️ 얇은 니트와 린넨 팬츠로 니트를 더운 날에도 산뜻하게 입었어요.',
    },
    mild: {
      top: '크루넥 니트',
      bottom: '차콜 그레이 슬랙스',
      shoesAcc: '화이트 스니커즈',
      tip: '⛅ 니트와 슬랙스로 부드러우면서도 정돈된 오피스룩을 매칭했어요.',
    },
    rain: {
      top: '크루넥 니트',
      bottom: '다크 네이비 슬랙스',
      shoesAcc: '블랙 레인부츠 + 우산',
      tip: '🌧️ 다크 톤 하의와 방수 슈즈로 비 오는 날에도 니트의 무게감을 맞췄어요.',
    },
    cold: {
      top: '크루넥 니트 + 화이트 셔츠 레이어드',
      bottom: '차콜 그레이 울 슬랙스',
      shoesAcc: '브라운 가죽 부츠',
      tip: '💨 셔츠 이너와 울 슬랙스로 보온을 극대화한 겨울 오피스룩이에요.',
    },
  },
};

export function getRecommendation(
  preset: PresetId,
  weather: WeatherId
): Recommendation {
  return TABLE[preset][weather];
}
