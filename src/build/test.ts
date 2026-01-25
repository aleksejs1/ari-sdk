import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

export function createTestConfig(importerUrl: string) {
    const root = path.dirname(fileURLToPath(importerUrl));

    return defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(root, './src').replace(/\\/g, '/'),
                'react': path.resolve(root, '../../../node_modules/react').replace(/\\/g, '/'),
                'react-dom': path.resolve(root, '../../../node_modules/react-dom').replace(/\\/g, '/'),
                'react-hook-form': path.resolve(root, '../../../node_modules/react-hook-form').replace(/\\/g, '/'),
            },
        },
        test: {
            root,
            globals: true,
            environment: 'jsdom',
            include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
            setupFiles: ['@ari/plugin-sdk/test/setup'],
            css: false,
            server: {
                deps: {
                    external: ['react', 'react-dom'],
                },
            },
        },
        server: {
            fs: {
                allow: [
                    root,
                    path.resolve(root, '../../../../../')
                ]
            }
        }
    });
}
