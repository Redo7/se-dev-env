// vite-plugin-watch-extra.ts
import type { Plugin } from 'vite';
import { normalizePath } from 'vite';

export function watchExtraFilesPlugin(): Plugin {
	return {
		name: 'watch-extra-files',
		configureServer(server) {
			const filesToWatch = [
				'overlays/**/*.html',
				'overlays/**/*.css',
				'overlays/**/src/data.json',
				'overlays/**/src/fields.json',
			];
			console.log('[Vite Plugin] Adding files to watcher:', filesToWatch);
			server.watcher.add(filesToWatch);

			server.watcher.on('change', (rawPath) => {
				const path = normalizePath(rawPath);

				console.log(`[Vite Plugin] === WATCHER DETECTED ANY CHANGE: ${path} ===`);

				const isHtmlChange = path.includes('/html.html');
				const isCssChange = path.includes('/css.css');
				const isJsonChange = path.includes('/src/data.json') || path.includes('/src/fields.json');

				// === NEW: Extract Widget ID from path ===
				const pathParts = path.split('/');
				// Assuming your path structure is: overlays/OVERLAY_ID/WIDGET_ID/src/data.json
				// So, WIDGET_ID should be the part before 'src'.
				// Need to be careful here if your ID contains slashes, but generally, IDs are flat strings.
				const srcIndex = pathParts.indexOf('src');
				let widgetId: string | undefined;
				if (srcIndex > 1) { // Ensure 'src' is not the first or second element (e.g., /src/data.json)
					widgetId = pathParts[srcIndex - 1]; // Get the part just before 'src'
				}
				console.log(`  - Detected widget ID: ${widgetId}`);
				// ===================================

				if (isHtmlChange || isCssChange || isJsonChange) {
					console.log(`[Vite Plugin] Sending custom HMR event for iframe update: from ${path}`);
					server.ws.send({
						type: 'custom',
						event: 'iframe-content-update',
						data: {
							file: path,
							type: isHtmlChange ? 'html' : isCssChange ? 'css' : 'json',
							widgetId: widgetId, // === NEW: Include widget ID ===
						},
					});
				} else {
					console.log(`[Vite Plugin] Change at ${path} did not match specific iframe criteria. Skipping custom HMR send.`);
				}
			});

			server.watcher.on('ready', () => {
				console.log('[Vite Plugin] Watcher is ready.');
			});

			server.middlewares.use('/__trigger-hmr', async (req, res, next) => {
				if (req.method === 'POST') {
					let body = '';
					req.on('data', chunk => { body += chunk.toString(); });
					req.on('end', () => {
						try {
							const { file } = JSON.parse(body); // This 'file' should be the relative path
							if (file) {
                                const path = normalizePath(file);
                                // Re-extract widgetId for __trigger-hmr path too
                                const pathParts = path.split('/');
                                const srcIndex = pathParts.indexOf('src');
                                let widgetId: string | undefined;
                                if (srcIndex > 1) {
                                    widgetId = pathParts[srcIndex - 1];
                                }

                                server.ws.send({
                                    type: 'custom',
                                    event: 'iframe-content-update',
                                    data: {
                                        file: path,
                                        type: path.includes('/src/data.json') || path.includes('/src/fields.json') ? 'json' :
                                              path.includes('/html.html') ? 'html' :
                                              path.includes('/css.css') ? 'css' : 'unknown',
                                        widgetId: widgetId // === NEW: Include widget ID ===
                                    },
                                });
								res.statusCode = 200;
								res.end('HMR triggered');
							} else {
								res.statusCode = 400;
								res.end('Missing file in payload');
							}
						} catch (e) {
							console.error('[Vite Plugin HMR Trigger] Error parsing HMR trigger payload:', e);
							res.statusCode = 400;
							res.end('Invalid JSON payload');
						}
					});
				} else {
					next();
				}
			});
		},
	};
}