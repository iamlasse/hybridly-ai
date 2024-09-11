import { defineConfig } from 'vite'
import hybridly from 'hybridly/vite'
import path from 'node:path';

export default defineConfig( {
    resolve: {
        alias: {
            '@/': path.resolve(__dirname, 'resources'),
        },
    },
	plugins: [
        hybridly( {

        }),
	],
})
