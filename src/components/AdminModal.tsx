import { useEffect, useState } from 'react';
import { BarChart3, X, Trash2, TrendingUp, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { type Stats, loadStats, resetStats } from '@/lib/storage';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AdminModal({ open, onClose }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (open) setStats(loadStats());
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !stats) return null;

  const totalVotes = stats.agreed + stats.disagreed;
  const agreeRate = totalVotes > 0 ? Math.round((stats.agreed / totalVotes) * 100) : 0;

  function handleReset() {
    if (confirm('모든 통계 데이터를 초기화할까요? 이 작업은 되돌릴 수 없어요.')) {
      setStats(resetStats());
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-lift animate-scale-in sm:rounded-3xl sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-800 text-white">
              <BarChart3 className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold text-ink-900">통계 보기 (Admin)</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
            aria-label="닫기"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* stat grid */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <StatCard
            label="총 추천 생성 수"
            value={stats.totalGenerations}
            icon={<TrendingUp className="h-4 w-4" />}
            tone="navy"
          />
          <StatCard
            label="실시간 착용 동의율"
            value={`${agreeRate}%`}
            sub={`${totalVotes}명 투표`}
            icon={<BarChart3 className="h-4 w-4" />}
            tone="accent"
          />
          <StatCard
            label="착용 동의"
            value={stats.agreed}
            icon={<ThumbsUp className="h-4 w-4" />}
            tone="green"
          />
          <StatCard
            label="비동의"
            value={stats.disagreed}
            icon={<ThumbsDown className="h-4 w-4" />}
            tone="rose"
          />
        </div>

        {/* agree bar */}
        {totalVotes > 0 && (
          <div className="mt-4">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-rose-100">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${agreeRate}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-xs font-medium text-ink-400">
              <span className="text-green-600">동의 {agreeRate}%</span>
              <span className="text-rose-500">비동의 {100 - agreeRate}%</span>
            </div>
          </div>
        )}

        {/* feedback list */}
        <div className="mt-6">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 text-ink-500" />
            <h4 className="text-sm font-bold text-ink-700">
              수집된 한 줄 피드백
            </h4>
            <span className="text-xs text-ink-400">({stats.feedbacks.length})</span>
          </div>

          {stats.feedbacks.length === 0 ? (
            <p className="mt-3 rounded-2xl bg-ink-50 px-4 py-6 text-center text-sm text-ink-400">
              아직 수집된 피드백이 없어요.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {stats.feedbacks.map((f) => (
                <li
                  key={f.id}
                  className="rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-3"
                >
                  <p className="text-sm text-ink-800">{f.text}</p>
                  <p className="mt-1 text-[11px] text-ink-400">
                    {new Date(f.createdAt).toLocaleString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* reset */}
        <div className="mt-6 flex justify-end border-t border-ink-100 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
          >
            <Trash2 className="h-4 w-4" />
            데이터 초기화
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon,
  tone,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  tone: 'navy' | 'accent' | 'green' | 'rose';
}) {
  const tones = {
    navy: 'bg-navy-50 text-navy-700',
    accent: 'bg-accent-50 text-accent-600',
    green: 'bg-green-50 text-green-700',
    rose: 'bg-rose-50 text-rose-600',
  } as const;
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4">
      <div className="flex items-center gap-1.5">
        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${tones[tone]}`}>
          {icon}
        </span>
        <span className="text-xs font-medium text-ink-500">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-extrabold text-ink-900">{value}</p>
      {sub && <p className="mt-0.5 text-[11px] text-ink-400">{sub}</p>}
    </div>
  );
}
