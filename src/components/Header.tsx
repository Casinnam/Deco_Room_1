import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export function Header({ title, onBack }: HeaderProps) {
  return (
    <header className="flex items-center gap-3 px-5 pb-3 pt-5">
      {onBack ? (
        <button
          type="button"
          aria-label="Go back"
          onClick={onBack}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-espresso shadow-sm"
        >
          <ChevronLeft size={22} />
        </button>
      ) : null}
      <p className="text-sm font-semibold tracking-wide text-espresso/70">{title}</p>
    </header>
  );
}
