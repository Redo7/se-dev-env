import { useCallback, useEffect, useRef, useState } from 'react';
import SubtleButton from '../Buttons/SubtleButton';
interface Props {
	fieldKey: string;
	name: string;
	label: string;
	value?: string;
	timestampClassName?: string;
}

const SoundInputField = ({ fieldKey, name, label, value, timestampClassName }: Props) => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
			setCurrentTime(0); // Reset current time when audio ends
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
		<div key={fieldKey} className="audio-input-field">
			<audio ref={audioRef} src={value} preload="metadata" />

			<label htmlFor={name}>{label}</label>
			{value && (
				<div className="audio-controls">
					<button onClick={togglePlayPause} disabled={!isLoaded} className="play-pause-button">
						{isPlaying ? '❚❚' : '▶'}
					</button>
					<div className="timestamp-wrapper">
						<span className={timestampClassName || ''}>{formatTime(currentTime)}</span> /{' '}
						<span className={timestampClassName || ''}>{isLoaded ? formatTime(duration) : '0:00'}</span>
					</div>
				</div>
			)}
			<SubtleButton width="100%" height="1.5rem">
				Select audio
			</SubtleButton>
		</div>
	);
};

export default SoundInputField;
