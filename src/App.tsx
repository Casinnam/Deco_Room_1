import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, Download, ImagePlus, Loader2, RefreshCw, Sparkles, Wand2 } from 'lucide-react';
import { AppShell } from './components/AppShell';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { Header } from './components/Header';
import { PrimaryButton } from './components/PrimaryButton';
import { generateInteriorDesigns } from './services/geminiImageService';
import type { GeneratedDesign } from './types/design';

type Screen = 'home' | 'upload' | 'generating' | 'results' | 'compare';

const screenVariants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [designs, setDesigns] = useState<GeneratedDesign[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<GeneratedDesign | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      if (originalImageUrl.startsWith('blob:')) URL.revokeObjectURL(originalImageUrl);
    };
  }, [originalImageUrl]);

  const canGenerate = Boolean(imageFile && originalImageUrl);

  const selectImage = (file?: File) => {
    if (!file) return;
    if (originalImageUrl.startsWith('blob:')) URL.revokeObjectURL(originalImageUrl);
    setImageFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
  };

  const startGeneration = async () => {
    if (!imageFile) return;

    setProgress(0);
    setScreen('generating');

    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + Math.random() * 18, 94));
    }, 360);

    try {
      const generated = await generateInteriorDesigns(imageFile);
      setDesigns(generated);
      setProgress(100);
      window.setTimeout(() => setScreen('results'), 450);
    } finally {
      window.clearInterval(progressTimer);
    }
  };

  const resetFlow = () => {
    setSelectedDesign(null);
    setScreen('upload');
  };

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        {screen === 'home' && <HomeScreen key="home" onStart={() => setScreen('upload')} />}
        {screen === 'upload' && (
          <UploadScreen
            key="upload"
            imageUrl={originalImageUrl}
            canGenerate={canGenerate}
            onBack={() => setScreen('home')}
            onImageSelected={selectImage}
            onGenerate={startGeneration}
          />
        )}
        {screen === 'generating' && <GeneratingScreen key="generating" progress={progress} />}
        {screen === 'results' && (
          <ResultsScreen
            key="results"
            designs={designs}
            onBack={() => setScreen('upload')}
            onSelect={(design) => {
              setSelectedDesign(design);
              setScreen('compare');
            }}
          />
        )}
        {screen === 'compare' && selectedDesign && (
          <CompareScreen
            key="compare"
            design={selectedDesign}
            originalImageUrl={originalImageUrl}
            onBack={() => setScreen('results')}
            onReset={resetFlow}
          />
        )}
      </AnimatePresence>
    </AppShell>
  );
}

interface HomeScreenProps {
  onStart: () => void;
}

function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <motion.section
      variants={screenVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.28 }}
      className="flex flex-1 flex-col px-5 pb-6 pt-7"
    >
      <div className="mb-7 flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-espresso text-white shadow-lg shadow-espresso/20">
          <Sparkles size={24} />
        </div>
        <span className="rounded-full border border-espresso/10 bg-white/60 px-3 py-1 text-xs font-semibold text-espresso/70">
          AI Interior
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="relative mb-8 overflow-hidden rounded-[28px] bg-white shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"
            alt="Premium redesigned room"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-white/82 p-4 shadow-lg backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">4 Styles</p>
            <p className="mt-1 text-lg font-bold text-espresso">One photo, four new moods.</p>
          </div>
        </div>

        <h1 className="text-[42px] font-black leading-[0.98] text-espresso">Design your Room With AI</h1>
        <p className="mt-4 max-w-[330px] text-base leading-7 text-espresso/68">
          Upload your room photo and explore 4 beautiful interior styles instantly.
        </p>
      </div>

      <PrimaryButton onClick={onStart} className="mt-8 w-full">
        <Wand2 size={19} />
        지금 만들기
      </PrimaryButton>
    </motion.section>
  );
}

interface UploadScreenProps {
  imageUrl: string;
  canGenerate: boolean;
  onBack: () => void;
  onImageSelected: (file?: File) => void;
  onGenerate: () => void;
}

function UploadScreen({ imageUrl, canGenerate, onBack, onImageSelected, onGenerate }: UploadScreenProps) {
  return (
    <motion.section
      variants={screenVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="flex flex-1 flex-col"
    >
      <Header title="Upload Room Photo" onBack={onBack} />
      <div className="flex flex-1 flex-col gap-5 px-5 pb-6">
        <div className="overflow-hidden rounded-[28px] border border-white bg-white/65 p-3 shadow-soft">
          {imageUrl ? (
            <img src={imageUrl} alt="Selected room preview" className="aspect-[4/5] w-full rounded-[22px] object-cover" />
          ) : (
            <div className="grid aspect-[4/5] place-items-center rounded-[22px] bg-linen text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white text-clay shadow-sm">
                  <ImagePlus size={30} />
                </div>
                <p className="mt-4 text-lg font-bold text-espresso">방 사진을 추가하세요</p>
                <p className="mt-2 px-7 text-sm leading-6 text-espresso/58">
                  갤러리에서 선택하거나 모바일 카메라로 바로 촬영할 수 있어요.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <UploadInput
            id="gallery-upload"
            icon={<ImagePlus size={19} />}
            label="갤러리"
            onImageSelected={onImageSelected}
          />
          <UploadInput
            id="camera-upload"
            icon={<Camera size={19} />}
            label="사진 촬영"
            capture="environment"
            onImageSelected={onImageSelected}
          />
        </div>

        <PrimaryButton disabled={!canGenerate} onClick={onGenerate} className="mt-auto w-full">
          <Sparkles size={19} />
          AI 디자인 생성하기
        </PrimaryButton>
      </div>
    </motion.section>
  );
}

interface UploadInputProps {
  id: string;
  icon: ReactNode;
  label: string;
  capture?: 'user' | 'environment';
  onImageSelected: (file?: File) => void;
}

function UploadInput({ id, icon, label, capture, onImageSelected }: UploadInputProps) {
  return (
    <label
      htmlFor={id}
      className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-espresso/10 bg-white/70 px-4 text-sm font-bold text-espresso shadow-sm"
    >
      {icon}
      {label}
      <input
        id={id}
        type="file"
        accept="image/*"
        capture={capture}
        className="sr-only"
        onChange={(event) => onImageSelected(event.target.files?.[0])}
      />
    </label>
  );
}

interface GeneratingScreenProps {
  progress: number;
}

function GeneratingScreen({ progress }: GeneratingScreenProps) {
  const roundedProgress = useMemo(() => Math.round(progress), [progress]);

  return (
    <motion.section
      variants={screenVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.24 }}
      className="grid flex-1 place-items-center px-5 py-8 text-center"
    >
      <div className="w-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="mx-auto grid h-24 w-24 place-items-center rounded-[32px] bg-espresso text-white shadow-lg shadow-espresso/20"
        >
          <Loader2 size={40} />
        </motion.div>
        <h2 className="mx-auto mt-8 max-w-[320px] text-2xl font-black leading-tight text-espresso">
          AI가 당신의 공간을 새롭게 디자인하고 있어요...
        </h2>
        <div className="mt-8 rounded-full bg-white/70 p-1 shadow-inner">
          <motion.div
            className="h-3 rounded-full bg-clay"
            animate={{ width: `${roundedProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="mt-3 text-sm font-bold text-espresso/60">{roundedProgress}%</p>
      </div>
    </motion.section>
  );
}

interface ResultsScreenProps {
  designs: GeneratedDesign[];
  onBack: () => void;
  onSelect: (design: GeneratedDesign) => void;
}

function ResultsScreen({ designs, onBack, onSelect }: ResultsScreenProps) {
  return (
    <motion.section
      variants={screenVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="flex flex-1 flex-col"
    >
      <Header title="Generated Designs" onBack={onBack} />
      <div className="px-5 pb-6">
        <h2 className="text-2xl font-black text-espresso">4가지 스타일이 완성됐어요</h2>
        <p className="mt-2 text-sm leading-6 text-espresso/60">마음에 드는 디자인을 선택해 전후 비교를 확인하세요.</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {designs.map((design) => (
            <button
              key={design.id}
              type="button"
              onClick={() => onSelect(design)}
              className="overflow-hidden rounded-[24px] bg-white text-left shadow-soft transition active:scale-[0.98]"
            >
              <img src={design.imageUrl} alt={design.styleName} className="aspect-square w-full object-cover" />
              <div className="min-h-[68px] p-3">
                <p className="text-sm font-black leading-tight text-espresso">{design.styleName}</p>
                <p className="mt-1 text-xs font-medium text-espresso/52">Tap to compare</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

interface CompareScreenProps {
  design: GeneratedDesign;
  originalImageUrl: string;
  onBack: () => void;
  onReset: () => void;
}

function CompareScreen({ design, originalImageUrl, onBack, onReset }: CompareScreenProps) {
  return (
    <motion.section
      variants={screenVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="flex flex-1 flex-col"
    >
      <Header title={design.styleName} onBack={onBack} />
      <div className="flex flex-1 flex-col px-5 pb-6">
        <BeforeAfterSlider beforeImage={originalImageUrl} afterImage={design.imageUrl} />
        <p className="mt-4 text-center text-sm font-semibold text-espresso/58">슬라이더를 좌우로 움직여 변화를 확인하세요.</p>
        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <PrimaryButton variant="secondary" onClick={onReset}>
            <RefreshCw size={18} />
            다시 만들기
          </PrimaryButton>
          <PrimaryButton onClick={() => window.alert('저장 기능은 실제 생성 이미지 연결 후 활성화하세요.')}>
            <Download size={18} />
            저장하기
          </PrimaryButton>
        </div>
      </div>
    </motion.section>
  );
}

export default App;
