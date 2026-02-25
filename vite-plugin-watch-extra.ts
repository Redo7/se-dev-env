import type { Plugin } from 'vite';
import { normalizePath } from 'vite';

export function watchExtraFilesPlugin(): Plugin {
	return {
		name: 'watch-extra-files',
		configureServer(server) {

        const recentlyWritten = new Map<string, string>();
        server.middlewares.use('/__setBySetField', async (req, res, next) => {
        if (req.method === 'POST') {
            try {
            let body = '';
            req.on('data', chunk => (body += chunk.toString()));
            req.on('end', () => {
                const { file, origin } = JSON.parse(body);
                if (file) {
                    recentlyWritten.set(normalizePath(file), origin || "unknown");
                }
                res.statusCode = 200;
                res.end('ok');
            });
            } catch (err) {
            res.statusCode = 400;
            res.end('bad request');
            }
        } else next();

        });
			const filesToWatch = [
				'overlays/**/*.html',
				'overlays/**/*.css',
				'overlays/**/src/data.json',
				'overlays/**/src/fields.json',
			];
			console.log('[Vite Plugin] Adding files to watcher:', filesToWatch);
			server.watcher.add(filesToWatch);

			server.watcher.on('change', async (rawPath) => {
				const path = normalizePath(rawPath); 
                const origin = recentlyWritten.get(path);

                const isHtmlChange = path.includes('/html.html');
                const isCssChange = path.includes('/css.css');
                const isJsonChange = path.includes('/src/data.json') || path.includes('/src/fields.json');

                const pathSplit = path.split('/');
                const srcIndex = pathSplit.indexOf('src');
                let widgetId: string | undefined;
                if (srcIndex > 1) {
                    widgetId = pathSplit[srcIndex - 1];
                }

                if (origin === 'useFieldChange') {
                    console.log('[Vite Plugin] Skipping field-data-updated for useFieldChange');
                    recentlyWritten.delete(path);
                    if (isHtmlChange || isCssChange || isJsonChange) {
                        server.ws.send({
                            type: 'custom',
                            event: 'iframe-content-update',
                            data: {
                                file: path,
                                type: isHtmlChange ? 'html' : isCssChange ? 'css' : 'json',
                                widgetId: widgetId,
                            },
                        });
                    }
                    return;
                }
                recentlyWritten.delete(path);

				console.log(`[Vite Plugin] === WATCHER DETECTED ANY CHANGE: ${path} ===`);
				console.log(`  - Detected widget ID: ${widgetId}`);

                if (isJsonChange) {
                    console.log(`[Vite Plugin] Sending custom HMR event: field-data-updated`);
                    const pathSplit = path.split('/');
                    const srcIndex = pathSplit.indexOf('src');
                    
                    server.ws.send({
                        type: 'custom',
                        event: 'field-data-updated',
                        data: {
                            file: path,
                            type: 'json',
                            overlayId: pathSplit[srcIndex - 2],
                            widgetId: widgetId,
                        },
                    });
				} if (isHtmlChange || isCssChange) {
                    server.ws.send({
                        type: 'custom',
                        event: 'iframe-content-update',
                        data: {
                            file: path,
                            type: isHtmlChange ? 'html' : isCssChange ? 'css' : 'json',
                            widgetId: widgetId,
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
							const { file } = JSON.parse(body);
							if (file) {
                                const path = normalizePath(file);
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
                                        widgetId: widgetId
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