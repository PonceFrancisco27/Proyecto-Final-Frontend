import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
	const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading, madeForYouSongs, featuredSongs, trendingSongs } = useMusicStore();
	const { initializeQueue } = usePlayerStore();

	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

	useEffect(() => {
		if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			initializeQueue([...featuredSongs, ...madeForYouSongs, ...trendingSongs]);
		}
	}, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

	return (
		<main className="rounded-xl overflow-hidden h-full"
			style={{ background: "linear-gradient(180deg,#0f0f22 0%,#060610 100%)", border: "1px solid rgba(255,255,255,0.05)" }}>
			<Topbar />
			<ScrollArea className="h-[calc(100vh-180px)]">
				<div className="p-5 sm:p-7">
					<h1 className="text-2xl sm:text-3xl font-bold mb-1"
						style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}>
						Buenas tardes
					</h1>
					<p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.45)" }}>
						Donde vive toda escena musical
					</p>
					<FeaturedSection />
					<div className="space-y-10">
						<SectionGrid title="Hecho para ti" songs={madeForYouSongs} isLoading={isLoading} />
						<SectionGrid title="En tendencia" songs={trendingSongs} isLoading={isLoading} />
					</div>
				</div>
			</ScrollArea>
		</main>
	);
};
export default HomePage;
