import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Deco_Room_1/',
  plugins: [react()],
  build: {
    emptyOutDir: false,
  },
});
