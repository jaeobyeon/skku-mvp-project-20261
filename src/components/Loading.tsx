import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const MESSAGES = [
  'AI가 오늘 날씨와 기본템 조합을 분석 중입니다...',
  '오피스룩 스타일링 포인트를 찾고 있어요...',
  '신발과 소품까지 매칭 중이에요...',
];

export function Loading() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % MESSAGES.length);
    }, 600);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-md flex-col items-center justify-center px-5 py-20 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-ink-100" />
        <div className="absolute inset-0 animate-spin-slow rounded-full border-4 border-transparent border-t-navy-700" />
        <Sparkles className="h-7 w-7 animate-pulse-soft text-navy-600" />
      </div>
      <p
        key={idx}
        className="mt-6 text-base font-semibold text-ink-700 animate-fade-in"
      >
        {MESSAGES[idx]}
      </p>
      <p className="mt-1 text-sm text-ink-400">잠시만 기다려주세요</p>
    </section>
  );
}
