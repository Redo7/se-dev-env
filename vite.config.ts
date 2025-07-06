import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { watchExtraFilesPlugin } from './vite-plugin-watch-extra';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), watchExtraFilesPlugin()],
	server: {
		port: 5173,

		proxy: {
			'/widgets': {
				target: 'http://localhost:3001', // Your Node.js server
				changeOrigin: true,
			},
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
