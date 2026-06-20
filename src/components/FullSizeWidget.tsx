import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type { WidgetInstance } from "../types/";
import { getOnWidgetLoadObject, type OnWidgetLoadData } from "@/utils/getOnWidgetLoad";

const FullSizeWidget = () => {
	const { overlayID, widgetID } = useParams();
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const widgetRef = useRef<HTMLDivElement>(null);
	const retryTimeoutRef = useRef<number | null>(null);
	const [widget, setWidget] = useState<WidgetInstance>();

	if(!overlayID || !widgetID) return;
	
	const getOverlayData = async () => {
		const res = await fetch(`/api/get-overlay-data/${encodeURIComponent(overlayID)}`);
		const data = await res.json();
		setWidget(data.widgets.find((widget: WidgetInstance) => widget.id === widgetID))
	}

	const getOnWidgetLoadData = useCallback(async () => {
		const onWidgetLoadObject = await getOnWidgetLoadObject(overlayID, widgetID);
		sendDataToIframe({...onWidgetLoadObject});
		return onWidgetLoadObject;
	}, [overlayID]);
	
	const sendDataToIframe = useCallback((data: OnWidgetLoadData, retryCount = 0) => {
		if (!iframeRef.current?.contentWindow) {
			if (retryCount < 3) {
				console.warn(`[Parent App] Iframe not ready, retrying... (${retryCount + 1}/3)`);
				retryTimeoutRef.current = setTimeout(() => {
					sendDataToIframe(data, retryCount + 1);
				}, 100);
			} else {
				console.error('[Parent App] Failed to send data to iframe after 3 retries');
			}
			return;
		}

		try {
			const messageToSend = {
				listener: 'onWidgetLoad',
				detail: data,
			};
			iframeRef.current.contentWindow.postMessage(messageToSend, '*');
		} catch (error) {
			console.error('[Parent App] Error sending message to iframe:', error);
		}
	}, []);

	useEffect(() => {
		getOverlayData();
		getOnWidgetLoadData();
		document.body.setAttribute('transparent', 'true');
		document.documentElement.setAttribute('transparent', 'true');
		return () => {
			document.body.setAttribute('transparent', 'false');
			document.documentElement.setAttribute('transparent', 'false');
		}
	}, [])

  return ( widget &&
	<div ref={widgetRef} className="w-full h-screen">
		<iframe ref={iframeRef}
			id={widget.id}
			name={widget.name}
			src={widget.src}
			sandbox="allow-scripts allow-same-origin"
		/>
	</div>
  )
}
export default FullSizeWidget