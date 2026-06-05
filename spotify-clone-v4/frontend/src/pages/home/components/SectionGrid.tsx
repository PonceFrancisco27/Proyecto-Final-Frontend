import { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton";
import { usePlayerStore } from "@/stores/usePlayerStore";
import PlayButton from "./PlayButton";

type SectionGridProps = {
	title: string;
	songs: Song[];
	isLoading: boolean;
};

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
	if (isLoading) return <SectionGridSkeleton />;

	return (
		<div className="mb-8">
			<div className="flex items-center justify-between mb-5">
				<h2
					className="text-xl sm:text-2xl font-bold"
					style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}
				>
					{title}
				</h2>
				<button
					className="text-sm font-medium transition-colors"
					style={{ color: "#00ff4c" }}
					onMouseEnter={e => ((e.target as HTMLElement).style.opacity = "0.75")}
					onMouseLeave={e => ((e.target as HTMLElement).style.opacity = "1")}
				>
					Ver todo
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{songs.map((song) => (
					<div
						key={song._id}
						className="p-4 rounded-xl cursor-pointer group transition-all duration-300"
						style={{
							background: "rgba(255,255,255,0.04)",
							border: "1px solid rgba(255,255,255,0.07)",
						}}
						onMouseEnter={e => {
							(e.currentTarget as HTMLDivElement).style.background = "rgba(0,255,76,0.07)";
							(e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,76,0.2)";
							(e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
						}}
						onMouseLeave={e => {
							(e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
							(e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
							(e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
						}}
					>
						<div className="relative mb-4">
							<div className="aspect-square rounded-lg shadow-lg overflow-hidden">
								<img
									src={song.imageUrl}
									alt={song.title}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<PlayButton song={song} />
						</div>
						<h3
							className="font-semibold mb-1 truncate"
							style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}
						>
							{song.title}
						</h3>
						<p className="text-sm truncate" style={{ color: "rgba(255,255,255,0.45)" }}>
							{song.artist}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default SectionGrid;
