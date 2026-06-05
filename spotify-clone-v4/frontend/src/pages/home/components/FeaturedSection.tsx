import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
	const { isLoading, featuredSongs, error } = useMusicStore();

	if (isLoading) return <FeaturedGridSkeleton />;
	if (error) return <p className="text-red-400 mb-4 text-lg">{error}</p>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
			{featuredSongs.map((song) => (
				<div
					key={song._id}
					className="flex items-center overflow-hidden group cursor-pointer relative transition-all duration-300"
					style={{
						background: "rgba(255,255,255,0.04)",
						borderRadius: "12px",
						border: "1px solid rgba(255,255,255,0.07)",
					}}
					onMouseEnter={e => {
						(e.currentTarget as HTMLDivElement).style.background = "rgba(0,255,76,0.08)";
						(e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,76,0.25)";
					}}
					onMouseLeave={e => {
						(e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
						(e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
					}}
				>
					<img
						src={song.imageUrl}
						alt={song.title}
						className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
					/>
					<div className="flex-1 p-4">
						<p className="font-semibold truncate" style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}>
							{song.title}
						</p>
						<p className="text-sm truncate" style={{ color: "rgba(255,255,255,0.45)" }}>
							{song.artist}
						</p>
					</div>
					<PlayButton song={song} />
				</div>
			))}
		</div>
	);
};
export default FeaturedSection;
