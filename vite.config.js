import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    root: './src',
    publicDir: '../public',
    server: {
        open: '/'
    },
    plugins: [
        tsconfigPaths(),
    ],
    assetsInclude: [
        '**/*.png',
        '**/*.fnt',
        '**/*.atlas',
        '**/*.svg',
        '**/*.woff',
    ],
    preview: {
        assetsInlineLimit: Infinity,
    },
    build: {
        assetsInlineLimit: Infinity,
        assetsDir: './assets',
        outDir: '../dist',
        emptyOutDir: true,
    },
})