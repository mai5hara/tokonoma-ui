import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      insertTypesEntry: true,
      include: [
        'src/index.ts',
        'src/components/**/*',
        'src/lib/**/*',
        'src/theme/**/*',
      ],
      exclude: ['**/*.stories.*', '**/*.test.*'],
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    copyPublicDir: false,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        styles: path.resolve(__dirname, 'src/styles.css'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.includes('styles.css')) return 'styles.css';
          return '[name][extname]';
        },
        entryFileNames: '[name].js',
      },
    },
  },
});
