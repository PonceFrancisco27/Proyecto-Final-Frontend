import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet, useLocation } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import { useEffect, useState } from "react";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);
	const location = useLocation();
	const isAdmin = location.pathname === "/admin";

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	// Admin page: full screen, no sidebar, no player
	if (isAdmin) {
		return (
			<div className="h-screen overflow-auto" style={{ background: "#060610" }}>
				<Outlet />
			</div>
		);
	}

	return (
		<div className="h-screen flex flex-col text-white" style={{ background: "#060610" }}>
			<ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2 gap-2">
				<AudioPlayer />
				<ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
					<LeftSidebar />
				</ResizablePanel>
				<ResizableHandle className="w-1 rounded-full" style={{ background: "rgba(0,255,76,0.1)" }} />
				<ResizablePanel defaultSize={80}>
					<Outlet />
				</ResizablePanel>
			</ResizablePanelGroup>
			<PlaybackControls />
		</div>
	);
};
export default MainLayout;
