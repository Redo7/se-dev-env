// Preserve original console and wrap it minimally for internal use only
const originalConsole = window.console;

// Create a *separate* object for your custom event handling, not on window.console
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

// Wrap window.console to *only* proxy to the original console
window.console = {
    log: function () { originalConsole.log.apply(originalConsole, arguments); },
    debug: function () { originalConsole.debug.apply(originalConsole, arguments); },
    warn: function () { originalConsole.warn.apply(originalConsole, arguments); },
    error: function () { originalConsole.error.apply(originalConsole, arguments); },
    info: function () { originalConsole.info.apply(originalConsole, arguments); },
    clear: function () { originalConsole.clear.apply(originalConsole, arguments); },
    table: function () { originalConsole.table.apply(originalConsole, arguments); },
    assert: function () { originalConsole.assert.apply(originalConsole, arguments); },
    count: function () { originalConsole.count.apply(originalConsole, arguments); },
    countReset: function () { originalConsole.countReset.apply(originalConsole, arguments); },
    dir: function () { originalConsole.dir.apply(originalConsole, arguments); },
    dirxml: function () { originalConsole.dirxml.apply(originalConsole, arguments); },
    group: function () { originalConsole.group.apply(originalConsole, arguments); },
    groupCollapsed: function () { originalConsole.groupCollapsed.apply(originalConsole, arguments); },
    groupEnd: function () { originalConsole.groupEnd.apply(originalConsole, arguments); },
    profile: function () { originalConsole.profile.apply(originalConsole, arguments); },
    profileEnd: function () { originalConsole.profileEnd.apply(originalConsole, arguments); },
    time: function () { originalConsole.time.apply(originalConsole, arguments); },
    timeEnd: function () { originalConsole.timeEnd.apply(originalConsole, arguments); },
    timeStamp: function () { originalConsole.timeStamp.apply(originalConsole, arguments); },
    trace: function () { originalConsole.trace.apply(originalConsole, arguments); },
};

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
    } catch (err) {
        originalConsole.error("[loadWidgetContentAll] Error loading widget content:", err);
    }
}

// --- SE_API Emulation Global Stores ---
const __mockStore = {};
const __mockCounters = {};
const __mockFieldData = {};

// --- Iframe Initialization ---
$(document).ready(function () {
    if (window.parent !== window && window.parent) {
        window.parent.postMessage({ type: "iframeInitialized" }, "*");
    }
});

// --- Message Handling ---
window.addEventListener("message", (obj) => {
    try {
        switch (obj.data.listener) {
            case "onEventReceived":
                dispatchEvent(new CustomEvent("onEventReceived", obj.data));
                break;

            case "onSessionUpdate":
                dispatchEvent(new CustomEvent("onSessionUpdate", obj.data));
                break;

            case "onWidgetLoad":
                Object.assign(__mockFieldData, obj.data.detail.fieldData || {});

                // --- StreamElements Global Variables ---
                window.SE_WIDTH = obj.data.detail.width || 0;
                window.SE_HEIGHT = obj.data.detail.height || 0;
                window.currency = obj.data.detail.currency || {};
                window.widgetId = obj.data.detail.widgetId || "";
                window.channel = obj.data.detail.channel || {};
                window.fieldData = __mockFieldData;

                // --- SE_API Mock ---
                window.SE_API = {
                    store: {
                        set: (keyName, obj) => {
                            originalConsole.log(`[SE_API.store] Setting '${keyName}':`, obj);
                            if (!/^[a-zA-Z0-9]+$/.test(keyName)) {
                                originalConsole.warn(`[SE_API.store] Invalid keyName: ${keyName}. Must be alphanumeric.`);
                                return;
                            }
                            __mockStore[keyName] = JSON.parse(JSON.stringify(obj));
                        },
                        get: (keyName) => {
                            originalConsole.log(`[SE_API.store] Getting '${keyName}'`);
                            return Promise.resolve(
                                __mockStore[keyName] ? JSON.parse(JSON.stringify(__mockStore[keyName])) : null
                            );
                        }
                    },
                    counters: {
                        get: (counterName) => {
                            originalConsole.log(`[SE_API.counters] Getting '${counterName}'`);
                            if (!__mockCounters[counterName]) {
                                __mockCounters[counterName] = { counter: counterName, value: 0 };
                            }
                            return Promise.resolve(JSON.parse(JSON.stringify(__mockCounters[counterName])));
                        }
                    },
                    sanitize: ({ message }) => {
                        originalConsole.log(`[SE_API.sanitize] Sanitizing message: "${message}"`);
                        const sanitizedMessage = message.replace(/Vulgar/gi, "Kreygasm");
                        return Promise.resolve({ result: { message: sanitizedMessage }, skip: false });
                    },
                    cheerFilter: (message) => {
                        originalConsole.log(`[SE_API.cheerFilter] Filtering cheers from message: "${message}"`);
                        const filteredMessage = message.replace(/\b\d+\s*(cheer|bits)\b/gi, "").trim();
                        return Promise.resolve(filteredMessage);
                    },
                    setField: (key, value) => {
                        originalConsole.log(`[SE_API.setField] Setting fieldData['${key}'] =`, value);
                        __mockFieldData[key] = value;
                        // Todo: This should change the actual data file too
                    },
                    getOverlayStatus: () => {
                        originalConsole.log("[SE_API.getOverlayStatus] Called");
                        return { isEditorMode: true, muted: false };
                    }
                };

                // --- Load widget content in correct order ---
                const onWidgetLoadEvent = new CustomEvent("onWidgetLoad", obj.data);
                loadWidgetContentAll(
                    "./src/html.html",
                    "./src/css.css?raw",
                    "./src/js.js",
                    __mockFieldData,
                    onWidgetLoadEvent
                );
                break;
        }
    } catch (e) {
        originalConsole.error("[Iframe Script] Error processing message:", e, obj.data);
    }
});