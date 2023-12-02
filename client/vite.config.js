import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/client/',
  build: {
    publicDir: 'public',
  },
  plugins: [react()],
  rules: {
    'react/prop-types': 0,
  },
});
