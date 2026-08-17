const STORAGE_KEY = 'todaylook_ai_stats_v1';

export type FeedbackEntry = {
  id: string;
  text: string;
  createdAt: number;
};

export type Stats = {
  totalGenerations: number;
  agreed: number;
  disagreed: number;
  feedbacks: FeedbackEntry[];
};

const EMPTY: Stats = {
  totalGenerations: 0,
  agreed: 0,
  disagreed: 0,
  feedbacks: [],
};

function isStats(value: unknown): value is Stats {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.totalGenerations === 'number' &&
    typeof v.agreed === 'number' &&
    typeof v.disagreed === 'number' &&
    Array.isArray(v.feedbacks)
  );
}

export function loadStats(): Stats {
  if (typeof window === 'undefined') return { ...EMPTY };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw);
    if (!isStats(parsed)) return { ...EMPTY };
    return parsed;
  } catch {
    return { ...EMPTY };
  }
}

function save(stats: Stats): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore quota / privacy errors
  }
}

export function recordGeneration(): Stats {
  const stats = loadStats();
  stats.totalGenerations += 1;
  save(stats);
  return stats;
}

export function recordVote(vote: 'agree' | 'disagree'): Stats {
  const stats = loadStats();
  if (vote === 'agree') stats.agreed += 1;
  else stats.disagreed += 1;
  save(stats);
  return stats;
}

export function recordFeedback(text: string): Stats {
  const stats = loadStats();
  const trimmed = text.trim();
  if (!trimmed) return stats;
  stats.feedbacks.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text: trimmed.slice(0, 200),
    createdAt: Date.now(),
  });
  save(stats);
  return stats;
}

export function resetStats(): Stats {
  const fresh = { ...EMPTY };
  save(fresh);
  return fresh;
}
