import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd());

  return {
    server: {
      port: 3000,
      host: true,
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
    },
    plugins: [react()],
  };
});
