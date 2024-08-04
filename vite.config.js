import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
    root: './src',
    publicDir: '../public',
    server: {
        open: '/'
    },
    plugins: [
        tsconfigPaths(),
        viteSingleFile(),
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
        rollupOptions: {
            output: {
                chunkFileNames: (chunk) => {
                    console.log(chunk)
                    return "assets/[name].js"
                },
            },
        },
    },
})