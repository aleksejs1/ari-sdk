import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            include: ['src/**/*.ts', 'src/**/*.tsx'],
            exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx']
        })
    ],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                'build/vite': resolve(__dirname, 'src/build/vite.ts'),
                'build/test': resolve(__dirname, 'src/build/test.ts'),
                'test/index': resolve(__dirname, 'src/test/index.ts'),
                'test/setup': resolve(__dirname, 'src/test/setup.ts'),
            },
            name: 'AriPluginSdk',
            formats: ['es']
        },
        rollupOptions: {
            external: [
                /^react($|\/)/,
                /^react-dom($|\/)/,
                'react-router-dom',
                'axios',
                '@tanstack/react-query',
                'lucide-react',
                'react-hook-form',
                'react-i18next',
                'zod',
                'date-fns',
                'vite',
                '@vitejs/plugin-react',
                'vite-plugin-css-injected-by-js',
                'rollup-plugin-visualizer',
                'path',
                'url',
                'vitest',
                'util',
                'module',
                /^node:.*/
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    }
});
