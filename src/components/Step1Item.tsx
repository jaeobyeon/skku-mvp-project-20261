import { useRef, useState } from 'react';
import { Upload, Check, Camera, X, ArrowRight } from 'lucide-react';
import { PRESETS, type PresetId } from '@/lib/recommend';

type Props = {
  selected: PresetId | null;
  uploadedImage: string | null;
  onSelectPreset: (id: PresetId) => void;
  onUploadImage: (dataUrl: string) => void;
  onClearImage: () => void;
  onNext: () => void;
};

export function Step1Item({
  selected,
  uploadedImage,
  onSelectPreset,
  onUploadImage,
  onClearImage,
  onNext,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onUploadImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-5">
      <div className="mb-5 animate-fade-in">
        <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">
          메인 아이템 등록
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          오늘 입을 옷 사진을 올리거나, 비슷한 기본템을 골라주세요.
        </p>
      </div>

      {/* Upload box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={[
          'group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200',
          dragOver
            ? 'border-navy-500 bg-navy-50'
            : 'border-ink-200 bg-white hover:border-navy-300 hover:bg-ink-50',
        ].join(' ')}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
        {uploadedImage ? (
          <div className="flex w-full flex-col items-center gap-3">
            <div className="relative">
              <img
                src={uploadedImage}
                alt="업로드한 옷 사진"
                className="max-h-56 w-auto rounded-2xl object-contain shadow-card"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearImage();
                }}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-white shadow-lift transition hover:bg-ink-700"
                aria-label="사진 삭제"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm font-medium text-ink-600">
              사진이 등록되었어요. 아래에서 비슷한 기본템도 골라주세요.
            </p>
          </div>
        ) : (
          <>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-100 text-ink-500 transition group-hover:bg-navy-100 group-hover:text-navy-600">
              <Upload className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-base font-semibold text-ink-800">
                사진을 끌어다 놓거나 탭해서 올려주세요
              </p>
              <p className="mt-1 flex items-center justify-center gap-1 text-xs text-ink-400">
                <Camera className="h-3.5 w-3.5" /> 스마트폰 카메라 사진 지원
              </p>
            </div>
          </>
        )}
      </div>

      {/* Preset chips */}
      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-bold text-ink-700">빠른 선택</span>
          <span className="text-xs text-ink-400">사진 없이 기본템만 고르기</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {PRESETS.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPreset(p.id)}
                className={[
                  'chip',
                  active
                    ? 'border-navy-800 bg-navy-800 text-white shadow-card'
                    : 'border-ink-200 bg-white text-ink-700 hover:border-navy-300 hover:bg-navy-50',
                ].join(' ')}
              >
                <span className="text-base leading-none">{p.emoji}</span>
                <span className="font-semibold">{p.label}</span>
                {active && <Check className="h-4 w-4" strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="btn-primary"
          disabled={!selected}
          onClick={onNext}
        >
          날씨 선택하기
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
