import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import MgFooter from "@/components/MgFooter";

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const check = () =>
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80)
          el.classList.add("active");
      });
    check();
    window.addEventListener("scroll", check);
    return () => window.removeEventListener("scroll", check);
  }, []);
}

/* ─── Auth Modal ─── */
function AuthModal({
  open,
  onClose,
  initialTab,
}: {
  open: boolean;
  onClose: () => void;
  initialTab: "login" | "register";
}) {
  const [active, setActive] = useState<"login" | "register">(initialTab);
  const { signIn } = useSignIn();

  useEffect(() => {
    if (open) setActive(initialTab);
  }, [open, initialTab]);

  const signWithGoogle = () =>
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });

  const signWithX = () =>
    signIn?.authenticateWithRedirect({
      strategy: "oauth_x",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", animation: "mgFadeIn .25s ease" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-[90%] max-w-[440px] rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#1a1a2e,#0a0a1a)",
          border: "1px solid rgba(0,255,76,0.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          animation: "mgSlideIn .3s ease",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl font-bold transition-colors z-10"
          style={{ color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00ff4c")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
        >
          ×
        </button>

        <div className="p-8">
          {/* Tab toggle */}
          <div
            className="flex gap-1 mb-7 p-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {(["login", "register"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={
                  active === tab
                    ? { background: "linear-gradient(135deg,#00ff4c,#00cc3d)", color: "#060610" }
                    : { color: "rgba(255,255,255,0.5)" }
                }
              >
                {tab === "login" ? "Iniciar sesión" : "Registrarse"}
              </button>
            ))}
          </div>

          {/* LOGIN FORM */}
          <div style={{ display: active === "login" ? "block" : "none", animation: "mgFadeIn .3s ease" }}>
            <h2 className="text-2xl font-bold text-center mb-1" style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}>
              Bienvenido de vuelta
            </h2>
            <p className="text-center text-sm mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
              Inicia sesión con tu cuenta asociada
            </p>

            {/* Social */}
            <div className="flex gap-3 mb-5">
              <button onClick={signWithGoogle}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e8f0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,76,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,76,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                <img src="/google.png" className="w-4 h-4" alt="Google" /> Google
              </button>
              <button onClick={signWithX}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e8f0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,76,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,76,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                <i className="bx bxl-twitter" /> X / Twitter
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e8f0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,76,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,76,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                <i className="bx bxl-tiktok" /> TikTok
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>o con email</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            </div>

            <InputField icon="bx-envelope" placeholder="Email" type="email" />
            <InputField icon="bx-lock-alt" placeholder="Contraseña" type="password" />

            <a href="#" className="block text-right text-xs mb-4 transition-colors"
              style={{ color: "rgba(255,255,255,0.35)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00ff4c")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
            >
              ¿Olvidaste tu contraseña?
            </a>

            <SubmitBtn label="Ingresar" />

            <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              ¿No tienes cuenta?{" "}
              <span className="cursor-pointer font-bold transition-colors" style={{ color: "#00ff4c" }}
                onClick={() => setActive("register")}>
                Regístrate
              </span>
            </p>
          </div>

          {/* REGISTER FORM */}
          <div style={{ display: active === "register" ? "block" : "none", animation: "mgFadeIn .3s ease" }}>
            <h2 className="text-2xl font-bold text-center mb-1" style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}>
              Crea tu cuenta
            </h2>
            <p className="text-center text-sm mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
              Únete a la escena musical
            </p>

            <div className="flex gap-3 mb-5">
              <button onClick={signWithGoogle}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e8f0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,76,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,76,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                <img src="/google.png" className="w-4 h-4" alt="Google" /> Google
              </button>
              <button onClick={signWithX}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e8f0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,76,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,76,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                <i className="bx bxl-twitter" /> X
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e8f0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,76,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,76,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                <i className="bx bxl-tiktok" /> TikTok
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>o con email</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            </div>

            <InputField icon="bx-user" placeholder="Nombre" type="text" />
            <InputField icon="bx-envelope" placeholder="Email" type="email" />
            <InputField icon="bx-lock-alt" placeholder="Contraseña" type="password" />

            <SubmitBtn label="Registrarse" />

            <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              ¿Ya tienes cuenta?{" "}
              <span className="cursor-pointer font-bold" style={{ color: "#00ff4c" }}
                onClick={() => setActive("login")}>
                Inicia sesión
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Artist Modal ─── */
function ArtistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signIn } = useSignIn();
  if (!open) return null;

  const signWithGoogle = () =>
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", animation: "mgFadeIn .25s ease" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-[90%] max-w-[440px] rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#1a0231,#0a0a1a)",
          border: "1px solid rgba(255,0,204,0.3)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          animation: "mgSlideIn .3s ease",
        }}
      >
        <button onClick={onClose}
          className="absolute top-4 right-5 text-2xl font-bold z-10 transition-colors"
          style={{ color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ff00cc")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
        >×</button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ background: "linear-gradient(135deg,#ff00cc,#333399)" }}>
              <i className="bx bx-microphone text-3xl text-white" />
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#e8e8f0" }}>
              Regístrate como artista
            </h2>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              Comparte tu música con el mundo
            </p>
          </div>

          <div className="flex gap-3 mb-5">
            <button onClick={signWithGoogle}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e8f0" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,0,204,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,0,204,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
            >
              <img src="/google.png" className="w-4 h-4" alt="" /> Google
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e8f0" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,0,204,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,0,204,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
            >
              <i className="bx bxl-twitter" /> X
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e8f0" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,0,204,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,0,204,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
            >
              <i className="bx bxl-tiktok" /> TikTok
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>o con email</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
          </div>

          <InputField icon="bx-user" placeholder="Nombre artístico" type="text" accent="#ff00cc" />
          <InputField icon="bx-envelope" placeholder="Email profesional" type="email" accent="#ff00cc" />
          <InputField icon="bx-lock-alt" placeholder="Contraseña" type="password" accent="#ff00cc" />
          <InputField icon="bx-music" placeholder="Género musical" type="text" accent="#ff00cc" />

          <button
            className="w-full py-3 rounded-full text-sm font-bold mt-2 transition-all"
            style={{ background: "linear-gradient(135deg,#ff00cc,#333399)", color: "white" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(255,0,204,0.5)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            Registrarse como artista
          </button>

          <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
            Al registrarte aceptas nuestros{" "}
            <Link to="/mg/terminos" onClick={onClose} style={{ color: "#ff00cc" }}>Términos</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */
function InputField({ icon, placeholder, type, accent = "#00ff4c" }: { icon: string; placeholder: string; type: string; accent?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex items-center gap-3 mb-3 px-4 py-3 rounded-xl transition-all"
      style={{
        background: focused ? `rgba(${accent === "#ff00cc" ? "255,0,204" : "0,255,76"},0.06)` : "rgba(255,255,255,0.05)",
        border: `1px solid ${focused ? accent : "rgba(255,255,255,0.08)"}`,
      }}
    >
      <i className={`bx ${icon} text-lg`} style={{ color: focused ? accent : "rgba(255,255,255,0.35)" }} />
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent outline-none text-sm"
        style={{ color: "#e8e8f0", fontFamily: "var(--font-body)" }}
      />
    </div>
  );
}

function SubmitBtn({ label }: { label: string }) {
  return (
    <button
      className="w-full py-3 rounded-full text-sm font-bold mt-1 transition-all"
      style={{ background: "linear-gradient(135deg,#00ff4c,#00cc3d)", color: "#060610" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(0,255,76,0.4)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
    >
      {label}
    </button>
  );
}

/* ─── MAIN LANDING ─── */
export default function LandingPage() {
  useReveal();
  const [modal, setModal] = useState<{ type: "auth"; tab: "login" | "register" } | { type: "artist" } | null>(null);

  return (
    <>
      <style>{`
        @keyframes mgFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes mgSlideIn { from{transform:translateY(-40px);opacity:0} to{transform:translateY(0);opacity:1} }
        .reveal { opacity:0; transform:translateY(30px); transition:all .8s ease; }
        .reveal.active { opacity:1; transform:translateY(0); }
        .mg-track:hover { background:rgba(255,255,255,0.08); transform:translateX(5px); }
        .mg-feature:hover { transform:translateY(-10px); background:rgba(255,255,255,0.08); }
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[1000] px-8 py-4 reveal"
        style={{ background: "rgba(6,6,16,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-2xl" style={{ color: "#00ff4c" }}>graphic_eq</span>
            <span className="font-extrabold text-xl mg-text-gradient" style={{ fontFamily: "var(--font-display)" }}>MusicGround</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex gap-8">
            {[
              { label: "Inicio", to: "/" },
              { label: "Explorar", to: "/mg/explorar" },
              { label: "Para artistas", to: "/mg/artistpro" },
              { label: "Go+", to: "/mg/goplus" },
            ].map(({ label, to }) => (
              <Link key={label} to={to}
                className="text-sm font-medium transition-colors"
                style={{ color: "rgba(255,255,255,0.55)" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00ff4c")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
              >{label}</Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button onClick={() => setModal({ type: "auth", tab: "login" })}
              className="px-5 py-2 rounded-full text-sm transition-all"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#e8e8f0" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#00ff4c"; (e.currentTarget as HTMLButtonElement).style.color = "#00ff4c"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "#e8e8f0"; }}
            >Iniciar sesión</button>

            <button onClick={() => setModal({ type: "auth", tab: "register" })}
              className="px-5 py-2 rounded-full text-sm font-bold transition-all"
              style={{ background: "linear-gradient(135deg,#00ff4c,#00cc3d)", color: "#060610" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 18px rgba(0,255,76,0.45)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
            >Unirse</button>

            <button onClick={() => setModal({ type: "artist" })}
              className="px-5 py-2 rounded-full text-sm font-bold transition-all"
              style={{ background: "linear-gradient(135deg,#ff00cc,#333399)", color: "white" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 15px rgba(255,0,204,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
            >Artista</button>
          </div>
        </div>
      </nav>

      <div style={{ background: "#060610", minHeight: "100vh" }}>

        {/* HERO */}
        <section className="reveal flex items-center justify-center text-center min-h-screen px-5"
          style={{ paddingTop: "100px", paddingBottom: "80px", background: "linear-gradient(135deg,rgba(10,10,26,0.8),rgba(26,26,46,0.9))" }}>
          <div className="max-w-[800px]">
            <h1 className="font-bold mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,6vw,4.2rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#e8e8f0" }}>
              Donde vive toda{" "}
              <span style={{ background: "linear-gradient(135deg,#00ff4c,#00cc3d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                escena musical
              </span>
            </h1>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 2rem" }}>
              Descubre 400 millones de canciones, remezclas y sesiones de DJ: todas las pistas más populares que puedas encontrar en otro sitio, y millones más que no podrás encontrar en ningún otro lugar.
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-6">
              <button onClick={() => setModal({ type: "auth", tab: "register" })}
                className="px-8 py-3.5 rounded-full text-base font-bold transition-all"
                style={{ background: "linear-gradient(135deg,#00ff4c,#00cc3d)", color: "#060610" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"}
              >Unirse gratis</button>
              <Link to="/mg/goplus"
                className="px-8 py-3.5 rounded-full text-base font-bold transition-all"
                style={{ background: "transparent", border: "2px solid #00ff4c", color: "#e8e8f0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,76,0.12)"; (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; }}
              >Explorar Go+</Link>
            </div>
            <p className="text-sm flex items-center justify-center gap-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              <i className="bx bx-volume-full text-lg" style={{ color: "#00ff4c" }} />
              Hazte oír por más de 100 oyentes en tu próxima subida como suscriptor a Artist o Artist Pro.
            </p>
          </div>
        </section>

        {/* FEATURED ARTIST */}
        <section className="reveal max-w-[1200px] mx-auto px-5 py-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Artista destacado</h2>
            <Link to="/mg/artistas" style={{ color: "#00ff4c", fontSize: 14 }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
            >Ver todos</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-10 p-8 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex gap-5 items-center">
              <img src="/pages/assets/maverick.jpg" alt="Ed Maverick"
                className="w-28 h-28 rounded-full object-cover flex-shrink-0"
                style={{ border: "3px solid #00ff4c" }} />
              <div>
                <h3 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Ed Maverick</h3>
                <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>Artista ascendente</p>
                <div className="flex gap-5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span className="flex items-center gap-1"><i className="bx bx-headphone" style={{ color: "#00ff4c" }} /> 2.5M oyentes</span>
                  <span className="flex items-center gap-1"><i className="bx bx-heart" style={{ color: "#00ff4c" }} /> 124K likes</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[["Magia", "2.1M"], ["Acurrucar", "856K"], ["Fuentes de Ortiz", "432K"]].map(([name, plays]) => (
                <div key={name} className="mg-track flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <i className="bx bx-play-circle text-3xl" style={{ color: "#00ff4c" }} />
                  <div>
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{plays} reproducciones</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="reveal py-20 px-5" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>
              Lo que te ofrece MusicGround
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "bx-music", title: "400M+ canciones", desc: "La biblioteca musical más completa del mundo" },
                { icon: "bx-headphone", title: "Escucha sin límites", desc: "Reproduce toda la música que quieras, cuando quieras" },
                { icon: "bx-cloud-upload", title: "Sube tu música", desc: "Comparte tus creaciones con el mundo" },
                { icon: "bx-group", title: "Conecta con artistas", desc: "Descubre nueva música y sigue a tus artistas favoritos" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="mg-feature text-center p-8 rounded-2xl cursor-default transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <i className={`bx ${icon} text-5xl mb-5`} style={{ color: "#00ff4c", display: "block" }} />
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="reveal py-20 px-5 text-center" style={{ background: "linear-gradient(135deg,#00ff4c,#00cc3d)" }}>
          <div className="max-w-[600px] mx-auto" style={{ color: "#060610" }}>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              ¿Listo para empezar tu viaje musical?
            </h2>
            <p className="text-lg mb-8 opacity-80">
              Únete a millones de artistas y oyentes en la plataforma donde vive la música
            </p>
            <button onClick={() => setModal({ type: "auth", tab: "register" })}
              className="px-10 py-4 rounded-full font-bold text-base transition-all"
              style={{ background: "#060610", color: "white" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"}
            >Unirse gratis</button>
          </div>
        </section>

        <MgFooter />
      </div>

      {/* MODALS */}
      {modal?.type === "auth" && (
        <AuthModal open initialTab={modal.tab} onClose={() => setModal(null)} />
      )}
      {modal?.type === "artist" && (
        <ArtistModal open onClose={() => setModal(null)} />
      )}
    </>
  );
}
