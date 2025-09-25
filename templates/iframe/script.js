// Script version: 1.3

function detectType(arg) {
    if (arg === null) return "null";
    if (Array.isArray(arg)) return "array";
    return typeof arg; // gives "string", "number", "boolean", "object", "function", "undefined", "symbol", "bigint"
  }
  
  function serializeArg(arg) {
    if (arg === null || arg === undefined) return String(arg);
  
    // Arrays
    if (Array.isArray(arg)) {
      try {
        return JSON.stringify(arg);
      } catch {
        return "[Unserializable Array]";
      }
    }
  
    // Plain objects
    if (typeof arg === "object") {
      try {
        return JSON.stringify(arg, null, 2);
      } catch {
        return "[Unserializable Object]";
      }
    }
  
    // Functions
    if (typeof arg === "function") return `[Function: ${arg.name || "anonymous"}]`;
  
    // Everything else
    return String(arg);
  }
  
  const originalConsole = window.console;
  
  window.console = new Proxy(originalConsole, {
    get(target, prop) {
      if (prop === "log" || prop === "error") {
        return (...args) => {
          target[prop](...args);
  
          // Each argument gets serialized + type
          const processed = args.map((arg) => ({
            message: serializeArg(arg),
            messageType: detectType(arg),
          }));
  
          if (window.parent !== window) {
            window.parent.postMessage(
              {
                type: "iframeConsole",
                iframeId: IFRAME_ID,
                level: prop, // log or error
                args: processed, // [{message, messageType}, ...]
              },
              "*"
            );
          }
        };
      }
  
      return typeof target[prop] === "function"
        ? target[prop].bind(target)
        : target[prop];
    },
});

let IFRAME_ID = null;
let IFRAME_NAME = null;
let isContentLoaded = false;

function replaceVariables(text, variables) {
    text = text.replace(/\{\{([^{}]+)\}\}/g, (_, match) => variables[match] !== undefined ? variables[match] : `{{${match}}}`);
    return text.replace(/\{([^{}]+)\}/g, (_, match) => variables[match] !== undefined ? variables[match] : `{${match}}`);
}

async function loadWidgetContentAll(htmlPath, cssPath, jsPath, variables, onCompleteEvent) {
    if (isContentLoaded) return;

    try {
        isContentLoaded = true;

        // Clear existing dynamic content to prevent conflicts
        const existingDynamicElements = document.querySelectorAll('[data-dynamic-content]');
        existingDynamicElements.forEach(el => el.remove());

        if (htmlPath) {
            let htmlText = await (await fetch(htmlPath)).text();
            htmlText = replaceVariables(htmlText, variables);
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");

            Array.from(doc.head.querySelectorAll("link, style")).forEach((node) => {
                const newNode = node.cloneNode(true);
                newNode.setAttribute('data-dynamic-content', 'true');
                document.head.appendChild(newNode);
            });

            Array.from(doc.body.childNodes).forEach((node) => {
                if (node.tagName !== "SCRIPT") {
                    const newNode = node.cloneNode(true);
                    if (newNode.setAttribute) newNode.setAttribute('data-dynamic-content', 'true');
                    document.body.appendChild(newNode);
                }
            });

            for (const script of doc.querySelectorAll("script")) {
                await new Promise((resolve) => {
                    const newScript = document.createElement("script");
                    newScript.setAttribute('data-dynamic-content', 'true');
                    
                    if (script.src) {
                        newScript.src = script.src;
                        newScript.onload = resolve;
                        newScript.onerror = (err) => { originalConsole.error(`Failed to load script: ${script.src}`, err); resolve(); };
                    } else {
                        newScript.textContent = script.textContent;
                        resolve();
                    }
                    for (const attr of script.attributes) { newScript.setAttribute(attr.name, attr.value); }
                    document.body.appendChild(newScript);
                });
            }
        }

        if (cssPath) {
            let css = await (await fetch(cssPath)).text();
            css = replaceVariables(css, variables);
            const styleEl = document.createElement("style");
            styleEl.setAttribute('data-dynamic-content', 'true');
            styleEl.textContent = css;
            document.head.prepend(styleEl);
        }

        if (jsPath) {
            let js = await (await fetch(jsPath)).text();
            js = replaceVariables(js, variables);
            const scriptEl = document.createElement("script");
            scriptEl.setAttribute('data-dynamic-content', 'true');
            scriptEl.textContent = js;
            document.body.appendChild(scriptEl);
        }

        if (onCompleteEvent) { dispatchEvent(onCompleteEvent); }
        if (window.parent !== window) { window.parent.postMessage({ type: "widgetLoadComplete", iframeId: IFRAME_ID }, "*"); }

    } catch (err) {
        originalConsole.error(`[${IFRAME_ID}] Error loading widget content:`, err);
        isContentLoaded = false;
        if (window.parent !== window) { window.parent.postMessage({ type: "widgetLoadError", iframeId: IFRAME_ID, error: err.message }, "*"); }
    }
}

const __mockStore = {}, __mockCounters = {}, __mockFieldData = {};

$(document).ready(function () {
    if (window.frameElement && window.frameElement.id) { IFRAME_ID = window.frameElement.id; IFRAME_NAME = window.frameElement.name}    
    if (window.parent !== window && window.parent) { window.parent.postMessage({ type: "iframeInitialized", iframeId: IFRAME_ID }, "*"); }
});

window.addEventListener("message", async (obj) => {
    try {
        const { listener, detail } = obj.data;
        switch (listener) {
            case "onEventReceived": dispatchEvent(new CustomEvent("onEventReceived", obj.data)); break;
            case "onSessionUpdate": dispatchEvent(new CustomEvent("onSessionUpdate", obj.data)); break;
            case "onWidgetLoad":
                if (!detail) { originalConsole.error(`[${IFRAME_ID}] No detail data`); return; }
                Object.assign(__mockFieldData, detail.fieldData || {});
                Object.assign(window, { SE_WIDTH: detail.width || 0, SE_HEIGHT: detail.height || 0, currency: detail.currency || {}, widgetId: detail.widgetId || IFRAME_ID, channel: detail.channel || {}, fieldData: __mockFieldData });
                window.SE_API = {
                    store: { 
                        set: async (k, o) => {
                            await fetch('http://localhost:3001/api/SE_API/set', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ key: k, value: o }),
                            })
                            return;
                        }, 
                        get: async (k) => {
                            const res = await fetch(`http://localhost:3001/api/SE_API/get/${k}`, {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' }
                            })
                            return res.json();
                        }
                    },
                    counters: { get: (c) => { if (!__mockCounters[c]) __mockCounters[c] = { counter: c, value: 0 }; return Promise.resolve(JSON.parse(JSON.stringify(__mockCounters[c]))); } },
                    sanitize: ({ message }) => Promise.resolve({ result: { message: message.replace(/Vulgar/gi, "Kreygasm") }, skip: false }),
                    cheerFilter: (m) => Promise.resolve(m.replace(/\b\d+\s*(cheer|bits)\b/gi, "").trim()),
                    setField: (k, v) => { __mockFieldData[k] = v; },
                    getOverlayStatus: () => ({ isEditorMode: true, muted: false })
                };
                await loadWidgetContentAll("./src/html.html", "./src/css.css?raw", "./src/js.js", __mockFieldData, new CustomEvent("onWidgetLoad", obj.data));
                break;
        }
    } catch (e) {
        originalConsole.error(`[${IFRAME_ID}] Error:`, e);
        if (window.parent !== window) { window.parent.postMessage({ type: "widgetLoadError", iframeId: IFRAME_ID, error: e.message }, "*"); }
    }
});

// Catch synchronous JS errors
window.onerror = function (message, source, lineno, colno, error) {
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: "iframeError",
        iframeName: IFRAME_NAME,
        error: {
          message: String(message),
          source,
          lineno,
          colno,
          stack: error && error.stack ? error.stack : null,
        },
      },
      "*"
    );
  }
  // return false lets console still show it in devtools
  return false;
};

// Catch unhandled promise rejections
window.onunhandledrejection = function (event) {
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: "iframeError",
        iframeName: IFRAME_NAME,
        error: {
          message: event.reason ? String(event.reason) : "Unhandled promise rejection",
          stack: event.reason && event.reason.stack ? event.reason.stack : null,
        },
      },
      "*"
    );
  }
};