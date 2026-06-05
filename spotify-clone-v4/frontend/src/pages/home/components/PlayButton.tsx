import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
	const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
	const isCurrentSong = currentSong?._id === song._id;

	const handlePlay = () => {
		if (isCurrentSong) togglePlay();
		else setCurrentSong(song);
	};

	return (
		<Button
			size="icon"
			onClick={handlePlay}
			className={`absolute bottom-3 right-2 rounded-full hover:scale-105 transition-all text-black font-bold
				${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
				translate-y-2 group-hover:translate-y-0`}
			style={{
				background: "linear-gradient(135deg, #00ff4c, #00cc3d)",
				boxShadow: "0 0 16px rgba(0,255,76,0.5)",
			}}
		>
			{isCurrentSong && isPlaying ? (
				<Pause className="size-5 text-black" />
			) : (
				<Play className="size-5 text-black" />
			)}
		</Button>
	);
};
export default PlayButton;
