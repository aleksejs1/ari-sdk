import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

export function createTestConfig(importerUrl: string) {
    const root = path.dirname(fileURLToPath(importerUrl));
    const require = createRequire(importerUrl);

    const resolveFromRoot = (pkg: string) =>
        path.dirname(require.resolve(`${pkg}/package.json`)).replace(/\\/g, '/');

    return defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(root, './src').replace(/\\/g, '/'),
                'react': resolveFromRoot('react'),
                'react-dom': resolveFromRoot('react-dom'),
                'react-hook-form': resolveFromRoot('react-hook-form'),
            },
        },
        test: {
            root,
            globals: true,
            environment: 'jsdom',
            include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
            setupFiles: ['@personal-ari/plugin-sdk/test/setup'],
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
