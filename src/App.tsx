import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Camera,
  Download,
  FileText,
  Home,
  ImagePlus,
  Loader2,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { AppShell } from './components/AppShell';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { Header } from './components/Header';
import { PrimaryButton } from './components/PrimaryButton';
import { generateInteriorDesigns } from './services/geminiImageService';
import type { GeneratedDesign, ShoppingItem } from './types/design';

type Screen = 'home' | 'upload' | 'generating' | 'results' | 'compare';
type Goal = 'sell' | 'shop' | 'rent';

const screenVariants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const goals: Array<{ id: Goal; title: string; label: string; icon: ReactNode }> = [
  { id: 'sell', title: 'Sell faster', label: 'Realtor kit', icon: <BriefcaseBusiness size={17} /> },
  { id: 'shop', title: 'Build the look', label: 'Shopping list', icon: <ShoppingBag size={17} /> },
  { id: 'rent', title: 'Raise appeal', label: 'ROI mode', icon: <BadgeDollarSign size={17} /> },
];

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [goal, setGoal] = useState<Goal>('sell');
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
      setProgress((current) => Math.min(current + Math.random() * 16, 94));
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
        {screen === 'home' && <HomeScreen key="home" goal={goal} onGoalChange={setGoal} onStart={() => setScreen('upload')} />}
        {screen === 'upload' && (
          <UploadScreen
            key="upload"
            goal={goal}
            imageUrl={originalImageUrl}
            canGenerate={canGenerate}
            onBack={() => setScreen('home')}
            onImageSelected={selectImage}
            onGenerate={startGeneration}
          />
        )}
        {screen === 'generating' && <GeneratingScreen key="generating" goal={goal} progress={progress} />}
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
  goal: Goal;
  onGoalChange: (goal: Goal) => void;
  onStart: () => void;
}

function HomeScreen({ goal, onGoalChange, onStart }: HomeScreenProps) {
  return (
    <motion.section
      variants={screenVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.28 }}
      className="flex flex-1 flex-col px-5 pb-6 pt-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-espresso text-white shadow-lg shadow-espresso/20">
          <Sparkles size={24} />
        </div>
        <span className="rounded-full border border-espresso/10 bg-white/70 px-3 py-1 text-xs font-semibold text-espresso/70">
          Vision-to-value AI
        </span>
      </div>

      <div className="relative overflow-hidden rounded-[28px] bg-white shadow-soft">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"
          alt="Premium AI staged room"
          className="aspect-[4/5] w-full object-cover"
        />
        <div className="absolute left-4 top-4 rounded-2xl bg-white/88 px-3 py-2 shadow-lg backdrop-blur">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#2f6f73]">Listing-ready</p>
          <p className="text-sm font-black text-espresso">Before to buyer dream</p>
        </div>
        <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 rounded-3xl bg-white/86 p-2 shadow-lg backdrop-blur">
          <Metric label="ROI" value="+14%" />
          <Metric label="Styles" value="4" />
          <Metric label="Kit" value="PDF" />
        </div>
      </div>

      <h1 className="mt-7 text-[40px] font-black leading-[0.98] text-espresso">Design your Room With AI</h1>
      <p className="mt-4 text-base leading-7 text-espresso/68">
        Turn one room photo into AI staging, realtor copy, ROI notes, and a shoppable makeover plan.
      </p>

      <div className="mt-5 grid gap-2">
        {goals.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onGoalChange(item.id)}
            className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
              goal === item.id ? 'border-espresso bg-white shadow-sm' : 'border-white/70 bg-white/45'
            }`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e8f1ef] text-[#2f6f73]">{item.icon}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-black text-espresso">{item.title}</span>
              <span className="block text-xs font-semibold text-espresso/55">{item.label}</span>
            </span>
            <ArrowUpRight size={17} className="text-espresso/45" />
          </button>
        ))}
      </div>

      <PrimaryButton onClick={onStart} className="mt-6 w-full">
        <Wand2 size={19} />
        지금 만들기
      </PrimaryButton>
    </motion.section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-linen px-2 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-espresso/45">{label}</p>
      <p className="text-sm font-black text-espresso">{value}</p>
    </div>
  );
}

interface UploadScreenProps {
  goal: Goal;
  imageUrl: string;
  canGenerate: boolean;
  onBack: () => void;
  onImageSelected: (file?: File) => void;
  onGenerate: () => void;
}

function UploadScreen({ goal, imageUrl, canGenerate, onBack, onImageSelected, onGenerate }: UploadScreenProps) {
  const selectedGoal = goals.find((item) => item.id === goal);

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
        <div className="rounded-3xl border border-white/80 bg-white/55 p-4">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#2f6f73]">
            {selectedGoal?.icon}
            {selectedGoal?.label}
          </p>
          <p className="mt-2 text-sm leading-6 text-espresso/62">
            사진 한 장으로 AI staging, 리스팅 문구, 예상 개선 예산, 구매 리스트를 함께 만듭니다.
          </p>
        </div>

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
          <UploadInput id="gallery-upload" icon={<ImagePlus size={19} />} label="갤러리" onImageSelected={onImageSelected} />
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
          AI 패키지 생성하기
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
  goal: Goal;
  progress: number;
}

function GeneratingScreen({ goal, progress }: GeneratingScreenProps) {
  const roundedProgress = useMemo(() => Math.round(progress), [progress]);
  const selectedGoal = goals.find((item) => item.id === goal);

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
          AI가 공간의 가능성을 계산하고 있어요...
        </h2>
        <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-espresso/58">
          {selectedGoal?.label}에 맞춰 이미지, 카피, ROI 포인트, 쇼핑 리스트를 함께 준비합니다.
        </p>
        <div className="mt-8 rounded-full bg-white/70 p-1 shadow-inner">
          <motion.div
            className="h-3 rounded-full bg-[#2f6f73]"
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
      <Header title="AI Design Packages" onBack={onBack} />
      <div className="px-5 pb-6">
        <h2 className="text-2xl font-black text-espresso">4가지 판매 가능한 비전</h2>
        <p className="mt-2 text-sm leading-6 text-espresso/60">
          각 스타일은 이미지뿐 아니라 리스팅 문구, 예산, ROI 포인트, 구매 리스트까지 포함합니다.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {designs.map((design) => (
            <button
              key={design.id}
              type="button"
              onClick={() => onSelect(design)}
              className="overflow-hidden rounded-[24px] bg-white text-left shadow-soft transition active:scale-[0.98]"
            >
              <img src={design.imageUrl} alt={design.styleName} className="aspect-square w-full object-cover" />
              <div className="min-h-[118px] p-3">
                <p className="text-sm font-black leading-tight text-espresso">{design.styleName}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2f6f73]">{design.valueLift}</p>
                <p className="mt-2 text-xs font-medium leading-5 text-espresso/55">{design.audience}</p>
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
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 pb-6">
        <BeforeAfterSlider beforeImage={originalImageUrl} afterImage={design.imageUrl} />
        <p className="text-center text-sm font-semibold text-espresso/58">슬라이더를 좌우로 움직여 Before / After를 비교하세요.</p>

        <InsightStrip design={design} />
        <ListingCard design={design} />
        <RoiCard notes={design.roiNotes} />
        <ShoppingCard items={design.shoppingItems} />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <PrimaryButton variant="secondary" onClick={onReset}>
            <RefreshCw size={18} />
            다시 만들기
          </PrimaryButton>
          <PrimaryButton onClick={() => window.alert('PDF 저장과 실제 구매 링크는 API/백엔드 연결 후 활성화됩니다.')}>
            <Download size={18} />
            리포트 저장
          </PrimaryButton>
        </div>
      </div>
    </motion.section>
  );
}

function InsightStrip({ design }: { design: GeneratedDesign }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <MiniInsight icon={<Home size={16} />} label="Audience" value={design.audience} />
      <MiniInsight icon={<BadgeDollarSign size={16} />} label="Budget" value={design.budgetRange} />
      <MiniInsight icon={<ArrowUpRight size={16} />} label="Signal" value={design.valueLift} />
    </div>
  );
}

function MiniInsight({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/70 p-3 shadow-sm">
      <div className="mb-2 text-[#2f6f73]">{icon}</div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-espresso/42">{label}</p>
      <p className="mt-1 text-xs font-black leading-4 text-espresso">{value}</p>
    </div>
  );
}

function ListingCard({ design }: { design: GeneratedDesign }) {
  return (
    <section className="rounded-[24px] bg-white/76 p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <FileText size={18} className="text-[#2f6f73]" />
        <h3 className="text-sm font-black text-espresso">Realtor Listing Kit</h3>
      </div>
      <p className="text-base font-black leading-6 text-espresso">{design.listingHeadline}</p>
      <p className="mt-3 text-sm leading-6 text-espresso/62">{design.listingCopy}</p>
    </section>
  );
}

function RoiCard({ notes }: { notes: string[] }) {
  return (
    <section className="rounded-[24px] bg-[#eef6f2] p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <BadgeDollarSign size={18} className="text-[#2f6f73]" />
        <h3 className="text-sm font-black text-espresso">Renovation ROI Notes</h3>
      </div>
      <div className="grid gap-2">
        {notes.map((note) => (
          <p key={note} className="rounded-2xl bg-white/70 px-3 py-2 text-sm font-semibold leading-5 text-espresso/68">
            {note}
          </p>
        ))}
      </div>
    </section>
  );
}

function ShoppingCard({ items }: { items: ShoppingItem[] }) {
  return (
    <section className="rounded-[24px] bg-white/76 p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <ShoppingBag size={18} className="text-[#2f6f73]" />
        <h3 className="text-sm font-black text-espresso">Shop Similar Look</h3>
      </div>
      <div className="grid gap-2">
        {items.map((item) => (
          <div key={item.name} className="rounded-2xl border border-espresso/8 bg-linen/70 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-espresso">{item.name}</p>
                <p className="mt-1 text-xs font-semibold text-espresso/50">{item.category} - {item.matchReason}</p>
              </div>
              <p className="shrink-0 text-sm font-black text-[#2f6f73]">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
