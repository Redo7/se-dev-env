import type { Plugin } from 'vite';
import { normalizePath } from 'vite';

interface FieldUpdate {
	origin: string;
	field: string;
	newValue: string;
}

export function watchExtraFilesPlugin(): Plugin {
	return {
		name: 'watch-extra-files',
		configureServer(server) {
			const recentlyWritten = new Map<string, FieldUpdate[]>();

			server.middlewares.use('/__setBySetField', async (req, res, next) => {
				if (req.method === 'POST') {
					try {
						let body = '';
						req.on('data', (chunk) => (body += chunk.toString()));
						req.on('end', () => {
							const { file, origin, field, newValue } = JSON.parse(body);
							if (file) {
								const normalizedPath = normalizePath(file);
								const existing = recentlyWritten.get(normalizedPath) || [];
								existing.push({ origin, field, newValue });
								recentlyWritten.set(normalizedPath, existing);

								setTimeout(() => {
									const current = recentlyWritten.get(normalizedPath);
									if (current) {
										const filtered = current.filter(
											(u) => !(u.origin === origin && u.field === field),
										);
										if (filtered.length === 0) {
											recentlyWritten.delete(normalizedPath);
										} else {
											recentlyWritten.set(normalizedPath, filtered);
										}
									}
								}, 1000);
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
				const updates = recentlyWritten.get(path) || [];

				const isHtmlChange = path.includes('/html.html');
				const isCssChange = path.includes('/css.css');
				const isJsonChange = path.includes('/src/data.json') || path.includes('/src/fields.json');

				const pathSplit = path.split('/');
				const srcIndex = pathSplit.indexOf('src');
				let widgetId: string | undefined;
				if (srcIndex > 1) {
					widgetId = pathSplit[srcIndex - 1];
				}

				// Check if all updates are from useFieldChange
				const allFromUseFieldChange = updates.length > 0 && updates.every((u) => u.origin === 'useFieldChange');

				if (allFromUseFieldChange) {
					console.log('[Vite Plugin] Skipping field-data-updated (all useFieldChange)');
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

				console.log(`[Vite Plugin] === WATCHER DETECTED CHANGE: ${widgetId} ===`);

				if (isJsonChange) {
					// Send an event for each field update from setField
					const setFieldUpdates = updates.filter((u) => u.origin === 'setField');

					if (setFieldUpdates.length > 0) {
						setFieldUpdates.forEach((update) => {
							console.log(`[Vite Plugin] Sending field-data-updated for: ${update.field}`);
							server.ws.send({
								type: 'custom',
								event: 'field-data-updated',
								data: {
									file: path,
									type: 'json',
									overlayId: pathSplit[srcIndex - 2],
									widgetId: widgetId,
									origin: update.origin,
									field: update.field,
									newValue: update.newValue,
								},
							});
						});
					}

					recentlyWritten.delete(path);
				}

				if (isHtmlChange || isCssChange) {
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
			});

			server.watcher.on('ready', () => {
				console.log('[Vite Plugin] Watcher is ready.');
			});

			server.middlewares.use('/__trigger-hmr', async (req, res, next) => {
				if (req.method === 'POST') {
					let body = '';
					req.on('data', (chunk) => {
						body += chunk.toString();
					});
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
										type:
											path.includes('/src/data.json') || 
                                            path.includes('/src/fields.json') ? 'json' : 
                                            path.includes('/html.html') ? 'html' : 
                                            path.includes('/css.css') ? 'css' : 'unknown',
										widgetId: widgetId,
									},
								});
								res.statusCode = 200;
								res.end('HMR triggered');
							} else {
								res.statusCode = 400;
								res.end('Missing file in payload');
							}
						} catch (e) {
							console.error('[Vite Plugin HMR Trigger] Error:', e);
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
