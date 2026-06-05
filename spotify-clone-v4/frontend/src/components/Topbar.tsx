import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
	const { isAdmin } = useAuthStore();
	return (
		<div className="flex items-center justify-between px-5 py-3 sticky top-0 z-10"
			style={{ background: "rgba(6,6,16,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
			<Link to="/" className="flex gap-2 items-center">
				<span className="material-icons-round text-[#00ff4c] text-2xl">graphic_eq</span>
				<span className="font-bold text-xl mg-text-gradient" style={{ fontFamily: "var(--font-display)" }}>MusicGround</span>
			</Link>
			<div className="flex items-center gap-3">
				{isAdmin && (
					<Link to="/admin" className={cn(buttonVariants({ variant: "outline" }))}
						style={{ borderColor: "rgba(0,255,76,0.3)", color: "#00ff4c", background: "rgba(0,255,76,0.08)" }}>
						<LayoutDashboardIcon className="size-4 mr-2" />
						Admin
					</Link>
				)}
				<SignedOut><SignInOAuthButtons /></SignedOut>
				<UserButton />
			</div>
		</div>
	);
};
export default Topbar;
