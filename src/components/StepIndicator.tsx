import { Check } from 'lucide-react';

type Props = {
  current: 1 | 2 | 3;
};

const STEPS = [
  { n: 1, label: '메인 아이템' },
  { n: 2, label: '오늘 날씨' },
  { n: 3, label: 'AI 추천' },
] as const;

export function StepIndicator({ current }: Props) {
  return (
    <div className="mx-auto flex max-w-md items-center justify-center gap-2 px-5">
      {STEPS.map((step, i) => {
        const isActive = current === step.n;
        const isDone = current > step.n;
        return (
          <div key={step.n} className="flex flex-1 items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300',
                  isActive
                    ? 'border-navy-800 bg-navy-800 text-white shadow-card'
                    : isDone
                      ? 'border-navy-200 bg-navy-50 text-navy-700'
                      : 'border-ink-200 bg-white text-ink-400',
                ].join(' ')}
              >
                {isDone ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  step.n
                )}
              </div>
              <span
                className={[
                  'text-[11px] font-semibold transition-colors duration-300 sm:text-xs',
                  isActive ? 'text-ink-900' : 'text-ink-400',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={[
                  'mx-1 h-px flex-1 rounded-full transition-colors duration-500',
                  current > step.n ? 'bg-navy-300' : 'bg-ink-200',
                ].join(' ')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
