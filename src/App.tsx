import { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { Header } from '@/components/Header';
import { StepIndicator } from '@/components/StepIndicator';
import { Step1Item } from '@/components/Step1Item';
import { Step2Weather } from '@/components/Step2Weather';
import { Loading } from '@/components/Loading';
import { Step3Result } from '@/components/Step3Result';
import { AdminModal } from '@/components/AdminModal';
import {
  getRecommendation,
  PRESET_LABEL,
  WEATHERS,
  type PresetId,
  type WeatherId,
} from '@/lib/recommend';
import { recordGeneration } from '@/lib/storage';

type Step = 'step1' | 'step2' | 'loading' | 'result';

export default function App() {
  const [step, setStep] = useState<Step>('step1');
  const [preset, setPreset] = useState<PresetId | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherId | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  function goResult() {
    if (!preset || !weather) return;
    setStep('loading');
    recordGeneration();
    setTimeout(() => setStep('result'), 1500);
  }

  function reset() {
    setStep('step1');
    setPreset(null);
    setUploadedImage(null);
    setWeather(null);
  }

  const weatherEmoji =
    WEATHERS.find((w) => w.id === weather)?.emoji ?? '';

  return (
    <div className="relative flex min-h-screen flex-col bg-ink-50">
      <Header />

      <main className="flex-1 px-0 py-8 sm:py-10">
        {step !== 'loading' && step !== 'result' && (
          <div className="mb-8">
            <StepIndicator current={step === 'step1' ? 1 : 2} />
          </div>
        )}
        {step === 'result' && (
          <div className="mb-8">
            <StepIndicator current={3} />
          </div>
        )}

        {step === 'step1' && (
          <Step1Item
            selected={preset}
            uploadedImage={uploadedImage}
            onSelectPreset={setPreset}
            onUploadImage={setUploadedImage}
            onClearImage={() => setUploadedImage(null)}
            onNext={() => setStep('step2')}
          />
        )}

        {step === 'step2' && (
          <Step2Weather
            selected={weather}
            onSelect={setWeather}
            onBack={() => setStep('step1')}
            onNext={goResult}
          />
        )}

        {step === 'loading' && <Loading />}

        {step === 'result' && preset && weather && (
          <Step3Result
            preset={preset}
            weatherEmoji={weatherEmoji}
            rec={getRecommendation(preset, weather)}
            onReset={reset}
          />
        )}
      </main>

      <footer className="px-5 pb-10 pt-4 text-center text-xs text-ink-400">
        오늘뭐입지 AI · {PRESET_LABEL['white-shirt']} 외 기본템 기반 추천
      </footer>

      {/* admin floating button */}
      <button
        type="button"
        onClick={() => setAdminOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white/90 px-3.5 py-2.5 text-xs font-semibold text-ink-600 shadow-lift backdrop-blur transition hover:bg-white hover:text-ink-900"
      >
        <BarChart3 className="h-4 w-4" />
        통계 보기 (Admin)
      </button>

      <AdminModal open={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
}
