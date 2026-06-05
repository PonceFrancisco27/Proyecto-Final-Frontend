import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { HomeIcon, Library } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const sidebarStyle = { background: "#0a0a1a", border: "1px solid rgba(255,255,255,0.07)" };

const LeftSidebar = () => {
	const { albums, fetchAlbums, isLoading } = useMusicStore();

	useEffect(() => { fetchAlbums(); }, [fetchAlbums]);

	return (
		<div className="h-full flex flex-col gap-2">
			<div className="rounded-xl p-4" style={sidebarStyle}>
				<div className="space-y-1">
					<Link to="/player" className={cn(buttonVariants({ variant: "ghost" }),
						"w-full justify-start text-white hover:text-[#00ff4c] hover:bg-[rgba(0,255,76,0.08)] transition-all")}>
						<HomeIcon className="mr-2 size-5" />
						<span className="hidden md:inline">Inicio</span>
					</Link>
				</div>
			</div>

			<div className="flex-1 rounded-xl p-4" style={sidebarStyle}>
				<div className="flex items-center gap-2 mb-4 px-2">
					<Library className="size-5 text-[#00ff4c]" />
					<span className="hidden md:inline font-semibold" style={{ fontFamily: "var(--font-display)" }}>Playlists</span>
				</div>
				<ScrollArea className="h-[calc(100vh-300px)]">
					<div className="space-y-1">
						{isLoading ? <PlaylistSkeleton /> : albums.map((album) => (
							<Link to={`/albums/${album._id}`} key={album._id}
								className="p-2 rounded-lg flex items-center gap-3 cursor-pointer transition-all"
								style={{ color: "rgba(255,255,255,0.7)" }}
								onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,255,76,0.08)")}
								onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
							>
								<img src={album.imageUrl} alt="Album"
									className="size-12 rounded-md flex-shrink-0 object-cover"
									style={{ border: "1px solid rgba(0,255,76,0.2)" }} />
								<div className="flex-1 min-w-0 hidden md:block">
									<p className="font-medium truncate text-white">{album.title}</p>
									<p className="text-sm truncate" style={{ color: "rgba(255,255,255,0.45)" }}>
										Álbum • {album.artist}
									</p>
								</div>
							</Link>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};
export default LeftSidebar;
