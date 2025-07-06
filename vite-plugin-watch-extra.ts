// vite-plugin-watch-extra.ts
import type { Plugin } from 'vite';

export function watchExtraFilesPlugin(): Plugin {
	return {
		name: 'watch-extra-files',
		configureServer(server) {
			const filesToWatch = [
				'overlays/**/*.html', // Make sure html.html is included here
				'overlays/**/*.css',
				'overlays/**/*.json',
			];
			console.log('[Vite Plugin] Adding files to watcher:', filesToWatch);
			server.watcher.add(filesToWatch);

			server.watcher.on('change', (path) => {
				console.log(`[Vite Plugin] Watcher detected change: ${path}`);

				// Check if the changed file is one of our manually handled ones
				const isHtmlChange = path.includes('/html.html'); // Adjust for exact path if needed
				const isCssChange = path.includes('/css.css'); // Adjust for exact path if needed
				const isJsonChange = path.includes('/data.json') || path.includes('/fields.json'); // Adjust

				if (isHtmlChange || isCssChange || isJsonChange) {
					console.log(`[Vite Plugin] Forcing full reload for: ${path}`);
					// Send a full reload message to all connected HMR clients
					server.ws.send({
						type: 'full-reload',
						path: '*', // Send to all pages/iframes connected
					});
				}
			});
		},
	};
}
