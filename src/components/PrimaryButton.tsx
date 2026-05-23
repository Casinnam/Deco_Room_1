import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface PrimaryButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function PrimaryButton({ children, variant = 'primary', className = '', ...props }: PrimaryButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'bg-espresso text-white shadow-lg shadow-espresso/20'
      : 'border border-espresso/10 bg-white/70 text-espresso';

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
