import { Check, ChevronsUpDown, CodeXml } from 'lucide-react';
import axios from 'axios';
import IconButton from './Buttons/IconButton';
import type { OverlayInstance, WidgetInstance } from '../types/';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import useWidgetExport from '@/hooks/useWidgetExport';
import { Checkbox } from './ui/checkbox';

interface Props {
	overlay: OverlayInstance;
	widgets: WidgetInstance[];
	onWidgetImport: () => void;
}
const Widgetio = ({ overlay, widgets, onWidgetImport }: Props) => {
	const [open, setOpen] = useState(false);
	const [listOpen, setListOpen] = useState(false);
	const [exportWidget, setExportWidget] = useState('');
	const fileInputRef = React.useRef<HTMLInputElement | null>(null);
	const localStorageMinify = (localStorage.getItem("minify") ?? "true") === "true" 
	const localStorageObfuscate = (localStorage.getItem("obfuscate") ?? "true") === "true" 
	const [minify, setMinify] = useState(localStorageMinify)
	const [obfuscate, setObfuscate] = useState(localStorageObfuscate)

	const handleWidgetExport = async (widget: WidgetInstance) => {
		await useWidgetExport(overlay, widget.id, widget.name, minify, obfuscate);
	};

	async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files?.length) {
			const file = event.target.files[0];
			const formData = new FormData();
			formData.append('file', file);
			formData.append('fileName', file.name);

			const res = await axios.post(`/api/widget-io-import/${encodeURIComponent(overlay.id)}`, formData);
			if (res.status === 200 && fileInputRef.current) {
				onWidgetImport();
				fileInputRef.current.value = '';
				toast.success(`${file.name} imported successfully`);
			}
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<IconButton>
					<CodeXml size={18} strokeWidth={1.25} />
				</IconButton>
			</PopoverTrigger>
			<PopoverContent align="start" className='z-105'>
				<h1 className="font-[800] text-xl">Widget.io</h1>
				<Accordion type="single" collapsible defaultValue="export">
					<AccordionItem value="import">
						<AccordionTrigger>Import</AccordionTrigger>
						<AccordionContent>
							<div className="grid w-full max-w-sm items-center gap-1">
								<Label htmlFor="widgetzip">Widget .zip file</Label>
								<form>
									<Input
										ref={fileInputRef}
										className="text-zinc-50/50 file:text-[12px]! file:bg-tr-100 file:transition-colors hover:file:bg-tr-200 file:h-[20px] file:px-2 file:rounded-[4px] file:mt-1 pl-1.5"
										accept=".zip,.rar,.7zip"
										id="widgetzip"
										type="file"
										onChange={handleFileUpload}
									/>
								</form>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="export">
						<AccordionTrigger>Export</AccordionTrigger>
						<AccordionContent>
							<Popover open={listOpen} onOpenChange={setListOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={open}
										className="w-full justify-between">
										{exportWidget
											? widgets.find((widget) => widget.id === exportWidget)?.name
											: 'Select widget...'}
										<ChevronsUpDown className="opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent align="start" className="w-[15.875rem] p-0 z-101">
									<Command>
										<CommandInput placeholder="Search widgets..." className="h-9" />
										<CommandList>
											<CommandEmpty>No widget found.</CommandEmpty>
											<CommandGroup>
												{widgets.map((widget) => (
													<CommandItem
														key={widget.id}
														value={widget.id}
														onSelect={(currentValue) => {
															setExportWidget(
																currentValue === exportWidget ? '' : currentValue
															);
															setOpen(false);
															handleWidgetExport(widget);
														}}>
														{widget.name}
														<Check
															className={cn(
																'ml-auto',
																exportWidget === widget.id ? 'opacity-100' : 'opacity-0'
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<hr className='mt-2'/>
							<div className="flex gap-2 mt-2 w-full items-center">
								<p className="text-[10px] opacity-50 mr-auto">Export settings:</p>
								<span className="flex items-center gap-1">
									<Checkbox name="minify" checked={minify} onClick={() => {
										localStorage.setItem("minify", String(!minify))
										setMinify(!minify)
									}} />
									<Label htmlFor='minify' className='mb-0!'>Minify</Label>
								</span>
								<span className="flex items-center gap-1">
									<Checkbox name="obfuscate" checked={obfuscate} onClick={() => {
										localStorage.setItem("obfuscate", String(!obfuscate))
										setObfuscate(!obfuscate)
									}}/>
									<Label htmlFor='obfuscate' className='mb-0!'>Obfuscate</Label>
								</span>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</PopoverContent>
		</Popover>
	);
};

export default Widgetio;
