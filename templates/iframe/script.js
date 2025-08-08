// At the very top of script.js, *after* any 'use strict' or imports
if (import.meta.hot) {
    import.meta.hot.on('vite:connected', () => {
        originalConsole.log('[Iframe HMR] Vite HMR client connected.');
    });

    // Listen for full-reload events triggered by our custom Vite plugin
    import.meta.hot.on('full-reload', (payload) => {
        // The plugin sends 'full-reload' with path: '*'
        // We'll log it and force a window reload.
        originalConsole.log('[Iframe HMR] Received full-reload command from Vite. Forcing iframe reload...', payload);
        window.location.reload();
    });

    // Keep this listener for debugging if needed, but the 'full-reload' type is now explicit
    import.meta.hot.on('vite:beforeUpdate', (payload) => {
        // This will now mostly catch updates that Vite's core system handles
        // or provides more granular updates for (e.g., JS modules).
        // Our plugin explicitly sends 'full-reload' for HTML/CSS/JSON.
        originalConsole.log('[Iframe HMR] Received vite:beforeUpdate payload:', payload);
        // If you had any specific hot-updates for JS modules that don't need full reload,
        // you'd handle them here. For general content, 'full-reload' is simpler.
    });
}


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
// and *not* trigger your custom dispatchEvent or interfere with HMR
window.console = {
    // Proxy standard console methods directly to originalConsole
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


// --- Your Core Widget Logic Functions ---
function replaceVariables(text, variables) {
    text = text.replace(/\{\{([^{}]+)\}\}/g, (_, match) =>
        variables[match] !== undefined ? variables[match] : `{{${match}}}`);
    return text.replace(/\{([^{}]+)\}/g, (_, match) =>
        variables[match] !== undefined ? variables[match] : `{${match}}`);
}

async function appendHTML(text) {
    $('#widget').append(text);
    originalConsole.log('HTML appended');
}

async function formatStyles(data) {
    originalConsole.log('CSS formatting');
    const _generateCSS = (text) => replaceVariables(text, data);
    let css;
    await fetch('./src/css.css?raw') // Uses ?raw to get unprocessed CSS
        .then((res) => res.text())
        .then((text) => css = _generateCSS(text))
        .then(() => {
            $('body').prepend($.parseHTML(`<style>${css}</style>`))
        });
}

async function appendJavascript(evt) {
    originalConsole.log('JS appending');
    let js;
    await fetch('./src/js.js') // Fetches raw JS content
        .then((res) => res.text())
        .then((text) => js = text)
        .then(() => {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.innerHTML = js; // Injects as inline script
            $("body").append(s);
        })
        .then(() => {
            // Appends external script for testButtons2.js
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = 'https://redo.graphics/testButtons2.js';
            $("body").append(s);
        })
        .then(() => { dispatchEvent(evt) }); // Dispatches custom event (e.g., onWidgetLoad)
}


// --- SE_API Emulation Global Stores ---
const __mockStore = {};
const __mockCounters = {};
const __mockFieldData = {}; // Initialized from onWidgetLoad, updated by SE_API.setField


// --- Iframe Initialization and Message Handling ---

// Send 'iframeInitialized' message to parent when iframe's DOM is ready
$(document).ready(function () {
    if (window.parent !== window && window.parent) {
        window.parent.postMessage({ type: 'iframeInitialized' }, '*');
        // originalConsole.log('[Iframe Script] Sent iframeInitialized message to parent.');
    }
});

// Message listener for communication from parent (e.g., 'onWidgetLoad')
window.addEventListener('message', (obj) => {
    // originalConsole.log('[Iframe Script] Received message:', obj.data);
    try {
        switch (obj.data.listener) {
            case 'onEventReceived':
                const onEventReceived = new CustomEvent('onEventReceived', obj.data);
                dispatchEvent(onEventReceived);
                break;
            case 'onSessionUpdate':
                const onSessionUpdate = new CustomEvent('onSessionUpdate', obj.data);
                dispatchEvent(onSessionUpdate);
                break;
            case 'onWidgetLoad':
                originalConsole.log('[Iframe Script] Detected onWidgetLoad message. Initializing SE_API and variables.', obj.data);

                // Initialize __mockFieldData with data received from onWidgetLoad
                Object.assign(__mockFieldData, obj.data.detail.fieldData || {});

                // --- StreamElements Global Variables & SE_API Emulation ---
                // Expose StreamElements static variables from obj.data.detail
                window.SE_WIDTH = obj.data.detail.width || 0;
                window.SE_HEIGHT = obj.data.detail.height || 0;
                window.currency = obj.data.detail.currency || {};
                window.widgetId = obj.data.detail.widgetId || '';
                window.channel = obj.data.detail.channel || {};
                window.fieldData = __mockFieldData; // Use the mockFieldData for consistent access

                // SE_API Mock Object
                window.SE_API = {
                    store: {
                        set: (keyName, obj) => {
                            originalConsole.log(`[SE_API.store] Setting '${keyName}':`, obj);
                            if (!/^[a-zA-Z0-9]+$/.test(keyName)) {
                                originalConsole.warn(`[SE_API.store] Invalid keyName: ${keyName}. Must be alphanumeric.`);
                                return;
                            }
                            __mockStore[keyName] = JSON.parse(JSON.stringify(obj));
                            // Could postMessage to parent for persistence if needed
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
                        const sanitizedMessage = message.replace(/Vulgar/gi, 'Kreygasm');
                        return Promise.resolve({ result: { message: sanitizedMessage }, skip: false });
                    },
                    cheerFilter: (message) => {
                        originalConsole.log(`[SE_API.cheerFilter] Filtering cheers from message: "${message}"`);
                        const filteredMessage = message.replace(/\b\d+\s*(cheer|bits)\b/gi, '').trim();
                        return Promise.resolve(filteredMessage);
                    },
                    setField: (key, value) => {
                        originalConsole.log(`[SE_API.setField] Setting fieldData['${key}'] =`, value);
                        __mockFieldData[key] = value; // Update the mock field data
                        // Could postMessage to parent for UI update if needed
                    },
                    getOverlayStatus: () => {
                        originalConsole.log('[SE_API.getOverlayStatus] Called');
                        return { isEditorMode: true, muted: false };
                    }
                };
                // --- End SE_API Emulation ---

                // Proceed with content injection after setup
                const onWidgetLoadEvent = new CustomEvent('onWidgetLoad', obj.data);
                fetch('./src/html.html')
                    .then((res) => res.text())
                    .then((text) => {
                        text = replaceVariables(text, __mockFieldData); // Use updated mock field data
                        const html = $.parseHTML(text);
                        appendHTML(html);
                    })
                    .then(() => formatStyles(__mockFieldData)) // Use updated mock field data for CSS
                    .then(() => appendJavascript(onWidgetLoadEvent));
                break;
        }
    } catch (e) {
        originalConsole.error('[Iframe Script] Error processing message:', e, obj.data);
    }
});