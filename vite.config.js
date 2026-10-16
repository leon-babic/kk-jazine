import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relativne putanje: stranica radi i na github.io/ime-repozitorija/
  base: './',
});
