import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  const updatePosition = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const nextPosition = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(92, Math.max(8, nextPosition)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[26px] bg-almond shadow-soft"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updatePosition(event.clientX);
      }}
      onPointerMove={(event) => {
        if (event.buttons === 1) updatePosition(event.clientX);
      }}
    >
      <img src={afterImage} alt="After AI redesign" className="h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeImage} alt="Before room" className="h-full w-full object-cover" />
      </div>
      <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-espresso">
        Before
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-espresso/85 px-3 py-1 text-xs font-bold text-white">
        After
      </div>
      <motion.div
        className="absolute top-0 h-full w-1 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(52,42,36,0.16)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-bold text-espresso shadow-lg">
          II
        </div>
      </motion.div>
    </div>
  );
}
