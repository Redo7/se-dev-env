// Preserve original console and wrap it minimally for internal use only
const originalConsole = window.console;
window.console = new Proxy(originalConsole, {
    get(target, prop) {
        if (typeof target[prop] === "function") {
            return target[prop].bind(target);
        }
        return target[prop];
    }
});

// Create a separate object for your custom event handling, not on window.console
const myCustomLoggerEvents = {
    __on: {},
    addEventListener: function (name, callback) {
        this.__on[name] = (this.__on[name] || []).concat(callback);
        return this;
    },
    dispatchEvent: function (name, value) {
        this.__on[name] = (this.__on[name] || []);
        for (var i = 0, n = this.__on[name].length; i < n; i++) {
            this.__on[name][i].call(this, value);
        }
        return this;
    },
};

// Get the iframe ID from the iframe element itself
let IFRAME_ID = null;

// --- Utility: Replace {{var}} and {var} placeholders ---
function replaceVariables(text, variables) {
    text = text.replace(/\{\{([^{}]+)\}\}/g, (_, match) =>
        variables[match] !== undefined ? variables[match] : `{{${match}}}`
    );
    return text.replace(/\{([^{}]+)\}/g, (_, match) =>
        variables[match] !== undefined ? variables[match] : `{${match}}`
    );
}

// --- Helper: Inject HTML with scripts in correct order ---
async function injectHTMLWithScripts(container, htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Append non-script elements first
    Array.from(doc.body.childNodes).forEach((node) => {
        if (node.tagName !== "SCRIPT") {
            container.appendChild(node.cloneNode(true));
        }
    });

    // Then load scripts in order
    for (const script of doc.querySelectorAll("script")) {
        await new Promise((resolve, reject) => {
            const newScript = document.createElement("script");

            if (script.src) {
                newScript.src = script.src;
                newScript.onload = resolve;
                newScript.onerror = (err) => {
                    originalConsole.error(
                        `[injectHTMLWithScripts] Failed to load script: ${script.src}`,
                        err
                    );
                    resolve(); // Continue even if one fails
                };
            } else {
                newScript.textContent = script.textContent;
                resolve(); // Inline executes immediately
            }

            for (const attr of script.attributes) {
                newScript.setAttribute(attr.name, attr.value);
            }

            container.appendChild(newScript);
        });
    }
}

// --- Main Loader ---
async function loadWidgetContentAll(htmlPath, cssPath, jsPath, variables, onCompleteEvent) {
    try {
        // originalConsole.log(`[${IFRAME_ID}] Starting widget content load...`);

        if (htmlPath) {
            let htmlText = await (await fetch(htmlPath)).text();
            htmlText = replaceVariables(htmlText, variables);

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");

            // --- Append <link> and <style> from parsed head ---
            Array.from(doc.head.querySelectorAll("link, style")).forEach((node) => {
                document.head.appendChild(node.cloneNode(true));
            });

            // --- Append non-script body elements ---
            Array.from(doc.body.childNodes).forEach((node) => {
                if (node.tagName !== "SCRIPT") {
                    document.body.appendChild(node.cloneNode(true));
                }
            });

            // --- Append scripts in order ---
            for (const script of doc.querySelectorAll("script")) {
                await new Promise((resolve) => {
                    const newScript = document.createElement("script");

                    if (script.src) {
                        newScript.src = script.src;
                        newScript.onload = resolve;
                        newScript.onerror = (err) => {
                            originalConsole.error(
                                `[loadWidgetContentAll] Failed to load script: ${script.src}`,
                                err
                            );
                            resolve();
                        };
                    } else {
                        newScript.textContent = script.textContent;
                        resolve();
                    }

                    for (const attr of script.attributes) {
                        newScript.setAttribute(attr.name, attr.value);
                    }

                    document.body.appendChild(newScript);
                });
            }
        }

        // --- Load CSS file (if provided) ---
        if (cssPath) {
            let css = await (await fetch(cssPath)).text();
            css = replaceVariables(css, variables);
            const styleEl = document.createElement("style");
            styleEl.textContent = css;
            document.head.prepend(styleEl);
        }

        // --- Load JS file (if provided) ---
        if (jsPath) {
            let js = await (await fetch(jsPath)).text();
            js = replaceVariables(js, variables);
            const scriptEl = document.createElement("script");
            scriptEl.textContent = js;
            document.body.appendChild(scriptEl);
        }

        // --- Dispatch event ---
        if (onCompleteEvent) {
            dispatchEvent(onCompleteEvent);
        }

        // Notify parent that loading is complete
        if (window.parent !== window) {
            window.parent.postMessage({
                type: "widgetLoadComplete",
                iframeId: IFRAME_ID
            }, "*");
        }

        // originalConsole.log(`[${IFRAME_ID}] Widget content load completed successfully`);
    } catch (err) {
        originalConsole.error(`[${IFRAME_ID}] Error loading widget content:`, err);

        // Notify parent of error
        if (window.parent !== window) {
            window.parent.postMessage({
                type: "widgetLoadError",
                iframeId: IFRAME_ID,
                error: err.message
            }, "*");
        }
    }
}

// --- SE_API Emulation Global Stores ---
const __mockStore = {};
const __mockCounters = {};
const __mockFieldData = {};

// --- Iframe Initialization ---
$(document).ready(function () {
    // Get the iframe ID from the iframe element itself
    if (window.frameElement && window.frameElement.id) {
        IFRAME_ID = window.frameElement.id;
    }

    // originalConsole.log(`[${IFRAME_ID}] Document ready, initializing iframe...`);

    if (window.parent !== window && window.parent) {
        window.parent.postMessage({
            type: "iframeInitialized",
            iframeId: IFRAME_ID
        }, "*");
    }
});

// --- Message Handling ---
window.addEventListener("message", async (obj) => {
    try {
        const { listener, detail } = obj.data;

        switch (listener) {
            case "onEventReceived":
                dispatchEvent(new CustomEvent("onEventReceived", obj.data));
                break;

            case "onSessionUpdate":
                dispatchEvent(new CustomEvent("onSessionUpdate", obj.data));
                break;

            case "onWidgetLoad":
                // originalConsole.log(`[${IFRAME_ID}] Received onWidgetLoad data:`, detail);

                if (!detail) {
                    originalConsole.error(`[${IFRAME_ID}] No detail data in onWidgetLoad message`);
                    return;
                }

                Object.assign(__mockFieldData, detail.fieldData || {});

                // --- StreamElements Global Variables ---
                window.SE_WIDTH = detail.width || 0;
                window.SE_HEIGHT = detail.height || 0;
                window.currency = detail.currency || {};
                window.widgetId = detail.widgetId || IFRAME_ID;
                window.channel = detail.channel || {};
                window.fieldData = __mockFieldData;

                // --- SE_API Mock ---
                window.SE_API = {
                    store: {
                        set: (keyName, obj) => {
                            if (!/^[a-zA-Z0-9]+$/.test(keyName)) {
                                originalConsole.warn(`[SE_API.store] Invalid keyName: ${keyName}. Must be alphanumeric.`);
                                return;
                            }
                            __mockStore[keyName] = JSON.parse(JSON.stringify(obj));
                        },
                        get: (keyName) => {
                            return Promise.resolve(
                                __mockStore[keyName] ? JSON.parse(JSON.stringify(__mockStore[keyName])) : null
                            );
                        }
                    },
                    counters: {
                        get: (counterName) => {
                            if (!__mockCounters[counterName]) {
                                __mockCounters[counterName] = { counter: counterName, value: 0 };
                            }
                            return Promise.resolve(JSON.parse(JSON.stringify(__mockCounters[counterName])));
                        }
                    },
                    sanitize: ({ message }) => {
                        const sanitizedMessage = message.replace(/Vulgar/gi, "Kreygasm");
                        return Promise.resolve({ result: { message: sanitizedMessage }, skip: false });
                    },
                    cheerFilter: (message) => {
                        const filteredMessage = message.replace(/\b\d+\s*(cheer|bits)\b/gi, "").trim();
                        return Promise.resolve(filteredMessage);
                    },
                    setField: (key, value) => {
                        __mockFieldData[key] = value;
                    },
                    getOverlayStatus: () => {
                        return { isEditorMode: true, muted: false };
                    }
                };

                // --- Load widget content in correct order ---
                const onWidgetLoadEvent = new CustomEvent("onWidgetLoad", obj.data);
                await loadWidgetContentAll( "./src/html.html", "./src/css.css?raw", "./src/js.js", __mockFieldData, onWidgetLoadEvent );
                break;
        }
    } catch (e) {
        originalConsole.error(`[${IFRAME_ID}] Error processing message:`, e, obj.data);

        // Notify parent of error
        if (window.parent !== window) {
            window.parent.postMessage({ type: "widgetLoadError", iframeId: IFRAME_ID, error: e.message }, "*");
        }
    }
});