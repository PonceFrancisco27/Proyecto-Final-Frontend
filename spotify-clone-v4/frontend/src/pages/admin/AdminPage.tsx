import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { axiosInstance } from "@/lib/axios";

const statCard = (icon: string, label: string, value: string | number, color: string) => (
	<div key={label} className="p-5 rounded-2xl flex items-center gap-4"
		style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
		<div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
			style={{ background: `rgba(${color},0.15)` }}>
			<i className={`bx ${icon} text-2xl`} style={{ color: `rgb(${color})` }} />
		</div>
		<div>
			<p className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}>{value}</p>
			<p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
		</div>
	</div>
);

const AdminPage = () => {
	const { isAdmin, isLoading } = useAuthStore();
	const { fetchAlbums, fetchSongs, fetchStats, stats } = useMusicStore();
	const [users, setUsers] = useState<any[]>([]);
	const [loadingUsers, setLoadingUsers] = useState(false);

	useEffect(() => {
		fetchAlbums();
		fetchSongs();
		fetchStats();
	}, [fetchAlbums, fetchSongs, fetchStats]);

	const loadUsers = async () => {
		setLoadingUsers(true);
		try {
			const { data } = await axiosInstance.get("/admin/users");
			setUsers(data);
		} catch (e) { console.error(e); }
		finally { setLoadingUsers(false); }
	};

	if (!isAdmin && !isLoading) return (
		<div className="min-h-screen flex items-center justify-center" style={{ background: "#060610" }}>
			<div className="text-center">
				<span className="material-icons-round text-6xl mb-4 block" style={{ color: "#00ff4c" }}>lock</span>
				<h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Acceso restringido</h2>
				<p className="mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>No tienes permisos de administrador</p>
				<Link to="/player" className="px-6 py-3 rounded-full font-bold"
					style={{ background: "linear-gradient(135deg,#00ff4c,#00cc3d)", color: "#060610" }}>
					Volver al player
				</Link>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen" style={{ background: "#060610", color: "#e8e8f0" }}>
			{/* Header */}
			<div className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between"
				style={{ background: "rgba(6,6,16,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
				<div className="flex items-center gap-3">
					<span className="material-icons-round text-2xl" style={{ color: "#00ff4c" }}>graphic_eq</span>
					<div>
						<h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
							<span className="mg-text-gradient">MusicGround</span> Admin
						</h1>
						<p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Panel de administración</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<Link to="/player" className="text-sm flex items-center gap-2 transition-colors"
						style={{ color: "rgba(255,255,255,0.45)" }}
						onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#00ff4c")}
						onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)")}>
						<i className="bx bx-arrow-back" /> Ir al player
					</Link>
					<UserButton />
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-8 py-8">
				{/* Stats */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
					{statCard("bx-music", "Canciones", stats.totalSongs, "0,255,76")}
					{statCard("bx-album", "Álbumes", stats.totalAlbums, "167,139,250")}
					{statCard("bx-microphone", "Artistas", stats.totalArtists, "251,146,60")}
					{statCard("bx-group", "Usuarios", stats.totalUsers, "56,189,248")}
				</div>

				{/* Tabs */}
				<Tabs defaultValue="songs" onValueChange={(v) => v === "users" && loadUsers()}>
					<TabsList className="mb-6 p-1 rounded-xl gap-1"
						style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
						{[
							{ value: "songs", icon: "bx-music", label: "Canciones" },
							{ value: "albums", icon: "bx-album", label: "Álbumes" },
							{ value: "users", icon: "bx-group", label: "Usuarios" },
							{ value: "artists", icon: "bx-microphone", label: "Artistas" },
						].map(({ value, icon, label }) => (
							<TabsTrigger key={value} value={value}
								className="px-5 py-2 rounded-lg text-sm font-medium transition-all data-[state=active]:text-black"
								style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)" }}
							>
								<i className={`bx ${icon} mr-2`} />{label}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value="songs"><SongsTabContent /></TabsContent>
					<TabsContent value="albums"><AlbumsTabContent /></TabsContent>

					{/* USERS TAB */}
					<TabsContent value="users">
						<div className="rounded-2xl overflow-hidden"
							style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
							<div className="p-6 flex items-center justify-between"
								style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
								<div>
									<h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
										Usuarios registrados
									</h2>
									<p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
										{users.length} usuarios en total
									</p>
								</div>
							</div>
							<div className="p-6">
								{loadingUsers ? (
									<div className="flex items-center justify-center py-20">
										<div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
											style={{ borderColor: "#00ff4c", borderTopColor: "transparent" }} />
									</div>
								) : users.length === 0 ? (
									<div className="text-center py-20" style={{ color: "rgba(255,255,255,0.3)" }}>
										<i className="bx bx-group text-5xl block mb-3" />
										<p>No hay usuarios registrados aún</p>
									</div>
								) : (
									<div className="space-y-3">
										{users.map((user) => (
											<div key={user._id} className="flex items-center gap-4 p-4 rounded-xl transition-all"
												style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
												onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,255,76,0.2)")}
												onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}>
												<img src={user.imageUrl} alt={user.fullName}
													className="w-12 h-12 rounded-full object-cover flex-shrink-0"
													style={{ border: "2px solid rgba(0,255,76,0.3)" }} />
												<div className="flex-1 min-w-0">
													<p className="font-semibold truncate" style={{ color: "#e8e8f0" }}>{user.fullName}</p>
													<p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
														ID: {user.clerkId}
													</p>
												</div>
												<div className="text-xs px-3 py-1 rounded-full"
													style={{ background: "rgba(0,255,76,0.1)", color: "#00ff4c", border: "1px solid rgba(0,255,76,0.2)" }}>
													Usuario
												</div>
												<p className="text-xs hidden sm:block" style={{ color: "rgba(255,255,255,0.3)" }}>
													{new Date(user.createdAt).toLocaleDateString("es-MX")}
												</p>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</TabsContent>

					{/* ARTISTS TAB */}
					<TabsContent value="artists">
						<div className="rounded-2xl overflow-hidden"
							style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
							<div className="p-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
								<h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
									Artistas en el catálogo
								</h2>
								<p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
									Artistas únicos en canciones y álbumes
								</p>
							</div>
							<ArtistsList />
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

// Artists list pulled from songs/albums
const ArtistsList = () => {
	const { songs, albums } = useMusicStore();
	const artists = [...new Set([...songs.map(s => s.artist), ...albums.map(a => a.artist)])].sort();

	return (
		<div className="p-6">
			{artists.length === 0 ? (
				<div className="text-center py-20" style={{ color: "rgba(255,255,255,0.3)" }}>
					<i className="bx bx-microphone text-5xl block mb-3" />
					<p>No hay artistas en el catálogo aún</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
					{artists.map((artist) => {
						const songCount = songs.filter(s => s.artist === artist).length;
						const albumCount = albums.filter(a => a.artist === artist).length;
						return (
							<div key={artist} className="flex items-center gap-4 p-4 rounded-xl transition-all"
								style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
								onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(167,139,250,0.3)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(167,139,250,0.05)"; }}
								onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}>
								<div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold"
									style={{ background: "rgba(167,139,250,0.15)", color: "rgb(167,139,250)", fontFamily: "var(--font-display)" }}>
									{artist[0].toUpperCase()}
								</div>
								<div className="flex-1 min-w-0">
									<p className="font-semibold truncate" style={{ color: "#e8e8f0" }}>{artist}</p>
									<p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
										{songCount} canción{songCount !== 1 ? "es" : ""} · {albumCount} álbum{albumCount !== 1 ? "es" : ""}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default AdminPage;
