import { useState } from 'react';
import {
  Shirt,
  Footprints,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Send,
  RotateCcw,
  Check,
  Sparkles,
} from 'lucide-react';
import { type Recommendation, type PresetId, PRESET_LABEL } from '@/lib/recommend';
import { recordVote, recordFeedback } from '@/lib/storage';

type Props = {
  preset: PresetId;
  weatherEmoji: string;
  rec: Recommendation;
  onReset: () => void;
};

type Vote = 'agree' | 'disagree' | null;

export function Step3Result({ preset, weatherEmoji, rec, onReset }: Props) {
  const [vote, setVote] = useState<Vote>(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleVote(v: 'agree' | 'disagree') {
    if (vote !== null) return;
    setVote(v);
    recordVote(v);
  }

  function handleSubmitFeedback() {
    if (!feedback.trim()) return;
    recordFeedback(feedback);
    setFeedback('');
    setFeedbackSent(true);
  }

  const items = [
    { emoji: '👕', label: '상의', value: rec.top, Icon: Shirt },
    { emoji: '👖', label: '하의', value: rec.bottom, Icon: Shirt },
    { emoji: '👞', label: '신발/소품', value: rec.shoesAcc, Icon: Footprints },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl px-5">
      <div className="card overflow-hidden p-6 animate-scale-in sm:p-8">
        {/* header */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-600">
          <Sparkles className="h-4 w-4" />
          AI 추천 결과
        </div>
        <h2 className="mt-2 text-xl font-bold text-ink-900 sm:text-2xl">
          {PRESET_LABEL[preset]} 기반 오늘의 원포인트 출근룩
        </h2>

        {/* recommended items */}
        <div className="mt-5 space-y-3">
          {items.map((it) => (
            <div
              key={it.label}
              className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-3.5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-card">
                {it.emoji}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">
                  {it.label}
                </p>
                <p className="truncate text-sm font-semibold text-ink-800 sm:text-base">
                  {it.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* styling tip */}
        <div className="mt-4 flex gap-3 rounded-2xl bg-navy-50 px-4 py-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-100 text-navy-700">
            <Lightbulb className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-xs font-bold text-navy-700">AI 스타일링 팁</p>
            <p className="mt-0.5 text-sm leading-relaxed text-navy-800">
              {rec.tip}
            </p>
          </div>
        </div>
      </div>

      {/* KPI voting widget */}
      <div className="card mt-4 p-6 animate-fade-in sm:p-8">
        <p className="text-base font-bold text-ink-900">
          내일 이 코디대로 입으시겠습니까?
        </p>

        {vote === null ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleVote('agree')}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-ink-200 bg-white py-4 text-base font-bold text-ink-700 transition-all duration-200 hover:border-green-400 hover:bg-green-50 hover:text-green-700 active:scale-[0.97]"
            >
              <ThumbsUp className="h-5 w-5" strokeWidth={2.2} />
              네, 입을게요
            </button>
            <button
              type="button"
              onClick={() => handleVote('disagree')}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-ink-200 bg-white py-4 text-base font-bold text-ink-700 transition-all duration-200 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 active:scale-[0.97]"
            >
              <ThumbsDown className="h-5 w-5" strokeWidth={2.2} />
              아니오, 다른 조합
            </button>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-ink-50 px-4 py-3.5 animate-scale-in">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 text-white">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <p className="text-sm font-semibold text-ink-700">
              투표해주셔서 감사합니다! 피드백도 남겨주시면 더 좋아져요.
            </p>
          </div>
        )}

        {/* feedback */}
        {feedbackSent ? (
          <p className="mt-3 text-sm font-medium text-navy-600">
            의견이 제출되었어요. 소중하게 활용할게요.
          </p>
        ) : (
          <div className="mt-4">
            <label className="text-xs font-medium text-ink-500">
              개선 의견이나 아쉬운 점을 남겨주세요 (선택)
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={feedback}
                maxLength={200}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="예) 신발이 너무 포멀해서 캐주얼한 걸로 추천해주세요"
                className="flex-1 rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-800 outline-none transition focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
              />
              <button
                type="button"
                onClick={handleSubmitFeedback}
                disabled={!feedback.trim()}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-navy-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
                의견 제출
              </button>
            </div>
          </div>
        )}
      </div>

      {/* reset */}
      <div className="mt-6 flex justify-center">
        <button type="button" className="btn-ghost" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          다른 옷/날씨로 다시 추천받기
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-ink-400">
        {weatherEmoji} 오늘의 추천이 마음에 드셨다면 내일도 다시 찾아주세요.
      </p>
    </section>
  );
}
