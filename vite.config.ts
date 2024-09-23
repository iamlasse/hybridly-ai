import { defineConfig } from 'vite';
import hybridly from 'hybridly/vite';
import path from 'node:path';

export default defineConfig( {
    build: {
        outDir: './dist'
    },
    resolve: {
        alias: {
            '@/': path.resolve( __dirname, 'resources' ),
        },
    },
    plugins: [
        hybridly( {

        } ),
    ],
} );
