import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import { watchExtraFilesPlugin } from './vite-plugin-watch-extra';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), watchExtraFilesPlugin(), tailwindcss()],
	resolve: {
		alias: {
		  "@": path.resolve(__dirname, "./src"),
		},
	  },
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
