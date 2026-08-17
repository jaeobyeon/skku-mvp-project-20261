import { Sparkles, Shirt } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-5 pt-10 text-center sm:pt-14">
        <div className="flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-800 text-white shadow-card">
            <Shirt className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <div className="flex items-baseline gap-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              오늘뭐입지 AI
            </h1>
            <Sparkles className="h-5 w-5 text-accent-500" strokeWidth={2.4} />
          </div>
        </div>
        <p className="text-sm font-medium text-ink-500 sm:text-base">
          내 옷장 기본템 + 오늘 날씨로 30초 출근룩 완성
        </p>
      </div>
    </header>
  );
}
