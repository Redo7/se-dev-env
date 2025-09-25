import { Check, ChevronsUpDown, CodeXml } from 'lucide-react';
import IconButton from './Buttons/IconButton';
import type { OverlayInstance, WidgetInstance } from '../types/';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Props {
    overlay: OverlayInstance
	widgets: WidgetInstance[];
}
const Widgetio = ({ overlay, widgets }: Props) => {
    const [open, setOpen] = useState(false)
    const [listOpen, setListOpen] = useState(false)
    const [exportWidget, setExportWidget] = useState("")

	const handleWidgetExport = async (widgetId: string, widgetName: string) => {
		const res = await fetch(
			`/api/widget-io-export/${encodeURIComponent(overlay.id)}/${encodeURIComponent(
				widgetId
			)}/${encodeURIComponent(widgetName)}/`
		);
		if (!res.ok) {
			console.error('Failed to fetch export:', res.statusText);
			return;
		}

		const blob = await res.blob();

		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${widgetName}.zip`;
		document.body.appendChild(a);
		a.click();

		a.remove();
		window.URL.revokeObjectURL(url);
	};

	return (
		<Popover>
            <PopoverTrigger asChild>
                <IconButton>
                        <CodeXml size={18} strokeWidth={1.25} />
                </IconButton>
            </PopoverTrigger>
			<PopoverContent align="start">
				<h1 className="font-[800] text-xl">Widget.io</h1>
				<Accordion type="single" collapsible defaultValue="export">
					<AccordionItem value="import">
						<AccordionTrigger>Import</AccordionTrigger>
						<AccordionContent>Not done yet</AccordionContent>
					</AccordionItem>
					<AccordionItem value="export">
						<AccordionTrigger>Export</AccordionTrigger>
						<AccordionContent>
							<Popover open={listOpen} onOpenChange={setListOpen}>
								<PopoverTrigger asChild>
									<Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
										{exportWidget ?
                                            widgets.find((widget) => widget.id === exportWidget)?.name
											: 'Select widget...'}
										<ChevronsUpDown className="opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent align="start" className="w-[15.875rem] p-0 z-100">
									<Command>
										<CommandInput placeholder="Search widgets..." className="h-9" />
										<CommandList>
											<CommandEmpty>No widget found.</CommandEmpty>
											<CommandGroup>
												{widgets.map((widget) => (
													<CommandItem key={widget.id} value={widget.id} onSelect={(currentValue) => { 
                                                            setExportWidget(currentValue === exportWidget ? '' : currentValue); 
                                                            setOpen(false); 
                                                            handleWidgetExport(widget.id, widget.name)
                                                        }}>
														{widget.name}
														<Check className={cn( 'ml-auto', exportWidget === widget.id ? 'opacity-100' : 'opacity-0' )} />
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</PopoverContent>
		</Popover>
	);
};

export default Widgetio;
