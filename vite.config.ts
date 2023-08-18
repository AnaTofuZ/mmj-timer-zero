import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Unfonts from 'unplugin-fonts/vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'docs',
    },
    base: 'mmj-timer-zero',
    plugins: [
        react(),
        Unfonts({
            google: {
                families: [
                    'Zen Kurenaido',
                    'Zen Dots',
                    'Material Symbols Outlined',
                    'Noto Sans Japanese',
                ],
            },
        }),
    ],
});
