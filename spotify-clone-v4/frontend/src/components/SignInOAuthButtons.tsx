import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn();

	if (!isLoaded) return null;

	const signInWithGoogle = () => {
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback",
		});
	};

	return (
		<Button
			onClick={signInWithGoogle}
			className="h-10 px-5 font-semibold text-sm rounded-full transition-all"
			style={{
				background: "transparent",
				border: "1px solid rgba(0,255,76,0.35)",
				color: "#00ff4c",
				fontFamily: "var(--font-body)",
			}}
			onMouseEnter={e => {
				(e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,76,0.1)";
				(e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 12px rgba(0,255,76,0.3)";
			}}
			onMouseLeave={e => {
				(e.currentTarget as HTMLButtonElement).style.background = "transparent";
				(e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
			}}
		>
			<img src="/google.png" alt="Google" className="size-4 mr-2" />
			Continuar con Google
		</Button>
	);
};
export default SignInOAuthButtons;
