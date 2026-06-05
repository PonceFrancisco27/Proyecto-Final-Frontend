import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
	const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
	const [volume, setVolume] = useState(75);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = document.querySelector("audio");
		const audio = audioRef.current;
		if (!audio) return;
		const updateTime = () => setCurrentTime(audio.currentTime);
		const updateDuration = () => setDuration(audio.duration);
		const handleEnded = () => usePlayerStore.setState({ isPlaying: false });
		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", updateDuration);
		audio.addEventListener("ended", handleEnded);
		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [currentSong]);

	const handleSeek = (value: number[]) => {
		if (audioRef.current) audioRef.current.currentTime = value[0];
	};

	return (
		<footer
			className="h-20 sm:h-24 px-4"
			style={{
				background: "#0a0a1a",
				borderTop: "1px solid rgba(0,255,76,0.15)",
			}}
		>
			<div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
				{/* Current song info */}
				<div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
					{currentSong && (
						<>
							<img
								src={currentSong.imageUrl}
								alt={currentSong.title}
								className="w-14 h-14 object-cover rounded-lg"
								style={{ border: "1px solid rgba(0,255,76,0.3)" }}
							/>
							<div className="flex-1 min-w-0">
								<div
									className="font-semibold truncate cursor-pointer hover:text-[#00ff4c] transition-colors"
									style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}
								>
									{currentSong.title}
								</div>
								<div className="text-sm truncate cursor-pointer hover:text-[#00ff4c] transition-colors"
									style={{ color: "rgba(255,255,255,0.45)" }}
								>
									{currentSong.artist}
								</div>
							</div>
						</>
					)}
				</div>

				{/* Player controls */}
				<div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
					<div className="flex items-center gap-4 sm:gap-6">
						<Button size="icon" variant="ghost"
							className="hidden sm:inline-flex text-zinc-500 hover:text-[#00ff4c] transition-colors"
						>
							<Shuffle className="h-4 w-4" />
						</Button>
						<Button size="icon" variant="ghost"
							className="text-zinc-400 hover:text-[#00ff4c] transition-colors"
							onClick={playPrevious}
							disabled={!currentSong}
						>
							<SkipBack className="h-4 w-4" />
						</Button>

						{/* Play/pause */}
						<Button
							size="icon"
							className="h-9 w-9 rounded-full text-black font-bold transition-all"
							style={{
								background: "linear-gradient(135deg, #00ff4c, #00cc3d)",
								boxShadow: isPlaying ? "0 0 20px rgba(0,255,76,0.5)" : "none",
							}}
							onClick={togglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
						</Button>

						<Button size="icon" variant="ghost"
							className="text-zinc-400 hover:text-[#00ff4c] transition-colors"
							onClick={playNext}
							disabled={!currentSong}
						>
							<SkipForward className="h-4 w-4" />
						</Button>
						<Button size="icon" variant="ghost"
							className="hidden sm:inline-flex text-zinc-500 hover:text-[#00ff4c] transition-colors"
						>
							<Repeat className="h-4 w-4" />
						</Button>
					</div>

					{/* Progress bar */}
					<div className="hidden sm:flex items-center gap-2 w-full">
						<div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
							{formatTime(currentTime)}
						</div>
						<Slider
							value={[currentTime]}
							max={duration || 100}
							step={1}
							className="w-full hover:cursor-grab active:cursor-grabbing"
							onValueChange={handleSeek}
						/>
						<div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
							{formatTime(duration)}
						</div>
					</div>
				</div>

				{/* Volume controls */}
				<div className="hidden sm:flex items-center gap-3 min-w-[180px] w-[30%] justify-end">
					<Button size="icon" variant="ghost" className="text-zinc-500 hover:text-[#00ff4c] transition-colors">
						<Mic2 className="h-4 w-4" />
					</Button>
					<Button size="icon" variant="ghost" className="text-zinc-500 hover:text-[#00ff4c] transition-colors">
						<ListMusic className="h-4 w-4" />
					</Button>
					<Button size="icon" variant="ghost" className="text-zinc-500 hover:text-[#00ff4c] transition-colors">
						<Laptop2 className="h-4 w-4" />
					</Button>
					<div className="flex items-center gap-2">
						<Button size="icon" variant="ghost" className="text-zinc-500 hover:text-[#00ff4c] transition-colors">
							<Volume1 className="h-4 w-4" />
						</Button>
						<Slider
							value={[volume]}
							max={100}
							step={1}
							className="w-24 hover:cursor-grab active:cursor-grabbing"
							onValueChange={(value) => {
								setVolume(value[0]);
								if (audioRef.current) audioRef.current.volume = value[0] / 100;
							}}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};
