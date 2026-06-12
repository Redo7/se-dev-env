// Only intender to be used with onEventReceived events

export function sendMessageToWidgets(detail: any) {
	const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.contentWindow?.postMessage(
        { listener: "onEventReceived", detail: detail },
        "*",
      );
    });
}