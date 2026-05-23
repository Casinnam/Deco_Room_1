import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fffaf2_0%,#f7f1e8_38%,#eadfce_100%)] px-4 py-5 text-espresso">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-[430px] flex-col overflow-hidden rounded-[30px] border border-white/70 bg-cream/80 shadow-soft backdrop-blur">
        {children}
      </div>
    </main>
  );
}
