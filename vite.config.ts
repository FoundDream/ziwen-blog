import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.md'],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 react 相关库打包到一个文件
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // 将 markdown 相关库打包到另一个文件
          'vendor-markdown': ['react-markdown', 'react-syntax-highlighter'],
        },
      },
    },
  },
});
