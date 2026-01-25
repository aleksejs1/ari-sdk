import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

export function createTestConfig(importerUrl: string) {
    const root = path.dirname(fileURLToPath(importerUrl));

    return defineConfig({
        plugins: [react()],
        test: {
            root,
            globals: true,
            environment: 'jsdom',
            include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
            setupFiles: ['@ari/plugin-sdk/test/setup'],
            css: false,
            alias: {
                '@': path.resolve(root, './src'),
            },
        },
    });
}
