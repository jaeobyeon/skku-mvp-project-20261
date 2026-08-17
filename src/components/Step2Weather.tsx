import { Sun, CloudSun, CloudRain, Wind, ArrowRight, ArrowLeft } from 'lucide-react';
import { WEATHERS, type WeatherId } from '@/lib/recommend';

const ICONS = { Sun, CloudSun, CloudRain, Wind } as const;

type Props = {
  selected: WeatherId | null;
  onSelect: (id: WeatherId) => void;
  onBack: () => void;
  onNext: () => void;
};

export function Step2Weather({ selected, onSelect, onBack, onNext }: Props) {
  return (
    <section className="mx-auto w-full max-w-3xl px-5">
      <div className="mb-5 animate-fade-in">
        <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">
          오늘 날씨 선택
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          오늘 날씨에 가장 가까운 카드를 골라주세요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {WEATHERS.map((w) => {
          const Icon = ICONS[w.icon as keyof typeof ICONS];
          const active = selected === w.id;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => onSelect(w.id)}
              className={[
                'group relative flex flex-col items-start gap-3 rounded-3xl border p-5 text-left transition-all duration-200 animate-scale-in',
                active
                  ? 'border-navy-800 bg-navy-50 shadow-lift'
                  : 'border-ink-100 bg-white shadow-card hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-200',
                  active
                    ? 'bg-navy-800 text-white'
                    : 'bg-ink-100 text-ink-600 group-hover:bg-navy-100 group-hover:text-navy-600',
                ].join(' ')}
              >
                <Icon className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <div>
                <p className="flex items-center gap-1.5 text-base font-bold text-ink-900">
                  <span>{w.emoji}</span>
                  {w.label}
                </p>
                <p className="mt-0.5 text-xs font-medium text-ink-400">
                  {w.tempGuide}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" className="btn-ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          이전
        </button>
        <button
          type="button"
          className="btn-primary"
          disabled={!selected}
          onClick={onNext}
        >
          3초 만에 AI 코디 추천받기 ✨
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
