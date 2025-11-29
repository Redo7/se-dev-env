import { useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command'
import useAlert from '@/hooks/useAlert'
import { ChevronsUpDownIcon, Dices } from 'lucide-react'
import { Separator } from './ui/separator'

interface Props{
    listener: string;
    icon: React.ReactNode;
    onPopoverToggle: () => void;
}

const AlertPopover = ({ listener, icon, onPopoverToggle }: Props) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [open, setOpen] = useState(false);
    const [gifted, setGifted] = useState(false);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [customInputValue, setCustomInputValue] = useState("");
    const [tierValue, setTierValue] = useState({label: "Tier 1", value: "1000"});

    const buttonSymbol = listener === 'tip-latest' ? '$' : 'x'
    const buttonLabels = listener === 'cheer-latest' ? [1000, 5000, 10000] : listener === 'raid-latest' ? [10, 50, 100] : [1, 5, 10];

    const handleTierChange = (value: string) => {
        const label = value === 'prime' ? "Prime" : `Tier ${value[0]}`;
        setTierValue({ label: label, value: value})
        setOpen(false);
    }

    const handleCustomInput = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            dispatchAlert(parseInt(customInputValue));
          }
    }

    const dispatchAlert = (value: number | 'random') => {
        const tier = listener === 'subscriber-latest' ? tierValue.value : undefined;
        const communityGift = listener === 'subscriber-latest' ? gifted : undefined;
        useAlert(listener, value, username, message, tier, communityGift);
    }

    // Debounce popover closing onMouseLeave so it doesn't flicker
	const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
    }
    setIsPopoverOpen(true);
    };

    const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
        setIsPopoverOpen(false);
    }, 200);
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={onPopoverToggle}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => dispatchAlert('random')} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}> {icon} </Button>
            </PopoverTrigger>
            <PopoverContent onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()} className={`flex flex-col gap-2 z-101 ${listener === 'cheer-latest' ? 'w-90' : listener === 'raid-latest' ? 'w-80' : ''}`}>
                <Input onChange={(event) => setUsername(event.target.value)} onKeyDown={handleCustomInput} type='text' placeholder='Username' value={username} autoComplete='off'/>
                <Textarea onChange={(event) => setMessage(event.target.value)} onKeyDown={handleCustomInput} placeholder='Message' value={message}/>
                {listener === 'subscriber-latest' && 
                <div className='flex justify-between'>
                    <div className="flex items-center gap-2">
                        <Checkbox checked={gifted} onClick={() => setGifted(!gifted)} />
                        <p className='text-xs tracking-wide select-none' onClick={() => setGifted(!gifted)}>{gifted === true ? "Community Gift!" : "Community Gift?"}</p>
                    </div>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[50%] justify-between" > {tierValue.label} <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandList>
                                    <CommandGroup>
                                        <CommandItem value="tier-1" onSelect={() => { handleTierChange('1000') }}>Tier 1</CommandItem>
                                        <CommandItem value="tier-2" onSelect={() => { handleTierChange('2000') }}>Tier 2</CommandItem>
                                        <CommandItem value="tier-3" onSelect={() => { handleTierChange('3000') }}>Tier 3</CommandItem>
                                        <CommandItem value="prime" onSelect={() => { handleTierChange('prime') }}>Prime</CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                }
                <Separator className='my-2' />
                <div className="flex items-center">
                    <Button variant="ghost" size="sm" className='text-xs font-[900]' onClick={() => dispatchAlert('random')}> <Dices /> </Button>
                    <Button variant="ghost" size="sm" className='text-xs font-[900]' onClick={() => dispatchAlert(buttonLabels[0])}> {buttonSymbol}{buttonLabels[0]} </Button>
                    <Button variant="ghost" size="sm" className='text-xs font-[900]' onClick={() => dispatchAlert(buttonLabels[1])}> {buttonSymbol}{buttonLabels[1]} </Button>
                    <Button variant="ghost" size="sm" className='text-xs font-[900]' onClick={() => dispatchAlert(buttonLabels[2])}> {buttonSymbol}{buttonLabels[2]} </Button>
                    {/* Swap the + for appropriate symbols */}
                    <Input className='ml-2' type='number' placeholder='Custom' onChange={(event) => setCustomInputValue(event.target.value)} onKeyDown={handleCustomInput} />
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default AlertPopover