import { useCallback, useEffect, useRef, useState } from 'react';
import useFieldChange from '../../hooks/useFieldChange';
import TextField from './TextField';
import useFieldUpdates from '@/hooks/useFieldUpdates';
import SubtleButton from '../Buttons/SubtleButton';
import { Input } from '../ui/input';
import useWidgetFileUpload from '@/hooks/useWidgetFileUpload';
interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value?: string;
	timestampClassName?: string;
}

const SoundInputField = ({ overlay, widget, name, label, value, timestampClassName }: Props) => {
	const audioRef = useRef<HTMLAudioElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState(value);
    useFieldUpdates({ overlay, widget, name, setInputValue: setSelectedFile });

	const handleFileChange = (newValue: string) => {
        setSelectedFile(newValue);
		useFieldChange(overlay, widget, name, newValue);
	};

	// Helper function to format time
	const formatTime = useCallback((seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}, []);

	// Toggle play/pause
	const togglePlayPause = useCallback(() => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	}, [isPlaying]);

	// Event listener for time updates
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleTimeUpdate = () => {
			setCurrentTime(audio.currentTime);
		};

		const handleLoadedMetadata = () => {
			setDuration(audio.duration);
			setIsLoaded(true);
		};

		const handleEnded = () => {
			setIsPlaying(false);
			setCurrentTime(0);
		};

		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);

		audio.addEventListener('timeupdate', handleTimeUpdate);
		audio.addEventListener('loadedmetadata', handleLoadedMetadata);
		audio.addEventListener('ended', handleEnded);
		audio.addEventListener('play', handlePlay);
		audio.addEventListener('pause', handlePause);

		return () => {
			audio.removeEventListener('timeupdate', handleTimeUpdate);
			audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
			audio.removeEventListener('ended', handleEnded);
			audio.removeEventListener('play', handlePlay);
			audio.removeEventListener('pause', handlePause);
		};
	}, []);

	return (
		<div className="audio-input-field">
            <label htmlFor={name}>{label}</label>
            <div className="grid place-items-center group py-5">
				<SubtleButton
					width="fit-content"
					padding="0 .5rem"
                    onClick={() => fileInputRef.current?.click()}
					cssClass={ '!absolute whitespace-nowrap text-[.75rem] z-1 backdrop-blur-[.125rem] backdrop-brightness-50 opacity-0 transition-opacity group-hover:opacity-100' }>
					Upload a file
				</SubtleButton>
				<form className="hidden">
					<Input
						ref={fileInputRef}
						type="file"
						accept=".mp3, .wav, .ogg"
						id="soundinput"
						onChange={async (e) => await useWidgetFileUpload(e, fileInputRef, overlay, widget, name, handleFileChange)}
					/>
				</form>
				<div className="audio-controls w-full">
                    <audio ref={audioRef} src={selectedFile} preload="metadata" />
                    <button onClick={togglePlayPause} disabled={!isLoaded} className="play-pause-button">
                        {isPlaying ? '❚❚' : '▶'}
                    </button>
                    <div className="timestamp-wrapper">
                        <span className={timestampClassName || ''}>{formatTime(currentTime)}</span> /{' '}
                        <span className={timestampClassName || ''}>{isLoaded ? formatTime(duration) : '0:00'}</span>
                    </div>
                </div>
			</div>
			<TextField
				name={name}
				label={`"${label}" link`}
				value={value}
				onChange={handleFileChange}
				overlay={overlay}
				widget={widget}
			/>
		</div>
	);
};

export default SoundInputField;
