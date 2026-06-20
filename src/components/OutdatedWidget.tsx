import type { OverlayInstance, WidgetInstance } from '../types/';
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner';

interface Props{
	overlay: OverlayInstance;
	widget: WidgetInstance;
	onSettingsChange: (overlay: string, widgetID: string, updates: Partial<WidgetInstance>) => void;
	setWidgetScriptVersion: (version: number) => void;
}

const OutdatedWidget = ({overlay, widget, onSettingsChange, setWidgetScriptVersion}: Props) => {
const updateIframeScript = async () => {
	const res = await fetch(`/api/update-iframe-files`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ overlayID: overlay.id, widgetID: widget.id }),
	});
	const data = await res.json();
	if (!res.ok) {
		toast.error(`Something went wrong while updating iframe files for ${widget.id}`);
		throw new Error(`Something went wrong while updating iframe files for ${widget.id}`);
	}
	onSettingsChange(overlay.id, widget.id, {
		scriptVersion: data.scriptVersion,
	});
	toast.success(`Successfully updated iframe files for ${name}`);
	setWidgetScriptVersion(data.scriptVersion);
};
  return (
	<div className="script-notice flex gap-4 p-4 py-3 bg-zinc-50 dark:bg-zinc-900">
		<i className="bi bi-exclamation-diamond-fill text-md text-rose-500 opacity-50"></i>
		<div className="flex flex-col gap-1 justify-center">
			<span className="text-[0.75rem] flex items-center gap-1">
				<p className="opacity-50">Script is outdated</p>
				<Tooltip>
					<TooltipTrigger>
						<i className="bi bi-question-circle-fill opacity-50 hover:opacity-75"></i>
					</TooltipTrigger>
					<TooltipContent className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200 depth-shadow">
						{' '}
						<p className="text-center">
							This widget was created on an older version of the app,
							<br />
							and requires the iframe files to be updated in order to work properly.
						</p>{' '}
					</TooltipContent>
				</Tooltip>
			</span>
			<p className="text-[0.875rem] text-zinc-900 dark:text-zinc-300">Click the button to update</p>
		</div>
		<Button
			variant="secondary"
			className="bg-zinc-900 hover:bg-zinc-700 text-zinc-300 dark:bg-zinc-50 dark:hover:bg-zinc-300 dark:text-zinc-900 h-8"
			onClick={() => updateIframeScript()}>
			{' '}
			Update{' '}
		</Button>
	</div>
  )
}
export default OutdatedWidget