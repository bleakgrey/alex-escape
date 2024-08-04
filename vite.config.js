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
    esbuild: {
        // jsxInject: `import { jsx } from '@/engine/Helpers'`,
    },
    preview: {
        assetsInlineLimit: Infinity,
    },
    build: {
        // sourcemap: true,
        assetsInlineLimit: Infinity,
        assetsDir: './assets',
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                // manualChunks: () => "everything.js",
                // assetFileNames: (asset) => {
                //     console.log(asset)
                //     return "assets/[name][extname]"
                // },
                chunkFileNames: (chunk) => {
                    console.log(chunk)
                    return "assets/[name].js"
                },
            },
        },
    },
})