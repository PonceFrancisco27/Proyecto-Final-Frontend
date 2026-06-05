import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";

const FriendsActivity = () => {
	const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
	const { user } = useUser();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	return (
		<div
			className="h-full rounded-xl flex flex-col"
			style={{
				background: "#0a0a1a",
				border: "1px solid rgba(255,255,255,0.07)",
			}}
		>
			<div className="p-4 flex justify-between items-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
				<div className="flex items-center gap-2">
					<Users className="size-5 text-[#00ff4c]" />
					<h2 className="font-semibold" style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}>
						Qué escuchan
					</h2>
				</div>
			</div>

			{!user && <LoginPrompt />}

			<ScrollArea className="flex-1">
				<div className="p-4 space-y-3">
					{users.map((u) => {
						const activity = userActivities.get(u.clerkId);
						const isPlaying = activity && activity !== "Idle";

						return (
							<div
								key={u._id}
								className="p-3 rounded-lg cursor-pointer transition-all group"
								onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,255,76,0.07)")}
								onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
							>
								<div className="flex items-start gap-3">
									<div className="relative">
										<Avatar className="size-10" style={{ border: "1px solid rgba(0,255,76,0.25)" }}>
											<AvatarImage src={u.imageUrl} alt={u.fullName} />
											<AvatarFallback style={{ background: "#0f0f22", color: "#00ff4c" }}>
												{u.fullName[0]}
											</AvatarFallback>
										</Avatar>
										<div
											className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2`}
											style={{
												borderColor: "#0a0a1a",
												background: onlineUsers.has(u.clerkId) ? "#00ff4c" : "rgba(255,255,255,0.2)",
											}}
											aria-hidden="true"
										/>
									</div>

									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2">
											<span className="font-medium text-sm" style={{ color: "#e8e8f0" }}>
												{u.fullName}
											</span>
											{isPlaying && <Music className="size-3.5 text-[#00ff4c] shrink-0" />}
										</div>

										{isPlaying ? (
											<div className="mt-1">
												<div className="text-sm font-medium truncate" style={{ color: "#e8e8f0" }}>
													{activity.replace("Playing ", "").split(" by ")[0]}
												</div>
												<div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
													{activity.split(" by ")[1]}
												</div>
											</div>
										) : (
											<div className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
												Inactivo
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
};
export default FriendsActivity;

const LoginPrompt = () => (
	<div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
		<div className="relative">
			<div
				className="absolute -inset-1 rounded-full blur-lg opacity-60 animate-pulse"
				style={{ background: "linear-gradient(135deg, #00ff4c, #00cc3d)" }}
				aria-hidden="true"
			/>
			<div className="relative rounded-full p-4" style={{ background: "#0f0f22" }}>
				<HeadphonesIcon className="size-8 text-[#00ff4c]" />
			</div>
		</div>
		<div className="space-y-2 max-w-[250px]">
			<h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}>
				Mira qué escuchan tus amigos
			</h3>
			<p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
				Inicia sesión para ver la música que tus amigos disfrutan en este momento
			</p>
		</div>
	</div>
);
