import { useCallback, useEffect, useRef, useState } from 'react';
import useFieldChange from '../../hooks/useFieldChange';
import TextField from './TextField';
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
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	
	const [selectedFile, setSelectedFile] = useState(value);

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
			{selectedFile && (
				<>
					<label htmlFor={name}>{label}</label>
					<div className="audio-controls">
						<audio ref={audioRef} src={selectedFile} preload="metadata" />
						<button onClick={togglePlayPause} disabled={!isLoaded} className="play-pause-button">
							{isPlaying ? '❚❚' : '▶'}
						</button>
						<div className="timestamp-wrapper">
							<span className={timestampClassName || ''}>{formatTime(currentTime)}</span> /{' '}
							<span className={timestampClassName || ''}>{isLoaded ? formatTime(duration) : '0:00'}</span>
						</div>
					</div>
				</>
			)}
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
