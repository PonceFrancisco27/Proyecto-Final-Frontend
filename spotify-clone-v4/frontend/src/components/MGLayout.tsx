import { Link, useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface MGLayoutProps {
  children: ReactNode;
  activeNav?: string;
}

const MGLayout = ({ children, activeNav }: MGLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#060610", minHeight: "100vh", color: "#e8e8f0", fontFamily: "var(--font-body)" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 1000,
        background: "rgba(6,6,16,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "1rem 2rem"
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <span className="material-icons-round" style={{ color: "#00ff4c", fontSize: 26 }}>graphic_eq</span>
            <span className="mg-text-gradient" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>MusicGround</span>
          </Link>
          <div style={{ display: "flex", gap: "2rem" }}>
            {[
              { label: "Inicio", to: "/" },
              { label: "Explorar", to: "/explorar" },
              { label: "Para artistas", to: "/para-artistas" },
              { label: "Go+", to: "/goplus" },
            ].map(item => (
              <Link key={item.to} to={item.to} style={{
                color: activeNav === item.label ? "#00ff4c" : "rgba(255,255,255,0.55)",
                textDecoration: "none", fontSize: 14, fontWeight: 500,
                transition: "color 0.2s"
              }}>{item.label}</Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link to="/" style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
              color: "#e8e8f0", padding: "8px 20px", borderRadius: 25,
              fontSize: 14, textDecoration: "none", transition: "all 0.25s"
            }}>Iniciar sesión</Link>
            <Link to="/" style={{
              background: "linear-gradient(135deg, #00ff4c, #00cc3d)",
              border: "none", color: "#060610", padding: "8px 20px",
              borderRadius: 25, fontSize: 14, fontWeight: 700,
              textDecoration: "none"
            }}>Unirse</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div style={{ paddingTop: 64 }}>
        {children}
      </div>

      {/* Footer */}
      <footer style={{
        background: "#070712", padding: "60px 2rem 20px",
        borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 80
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="material-icons-round" style={{ color: "#00ff4c", fontSize: 26 }}>graphic_eq</span>
              <span className="mg-text-gradient" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>MusicGround</span>
            </div>
            <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
              {[
                { title: "Producto", links: [
                  { label: "Características", to: "/caracteristicas" },
                  { label: "Go+", to: "/goplus" },
                  { label: "Para artistas", to: "/para-artistas" },
                ]},
                { title: "Comunidad", links: [
                  { label: "Artistas destacados", to: "/artistas-destacados" },
                  { label: "Eventos", to: "/eventos" },
                  { label: "Blog", to: "/blog" },
                ]},
                { title: "Soporte", links: [
                  { label: "Ayuda", to: "/ayuda" },
                  { label: "Centro de seguridad", to: "/centro-seguridad" },
                  { label: "Términos", to: "/terminos" },
                  { label: "Privacidad", to: "/privacidad" },
                ]},
                { title: "Síguenos", links: [], social: true },
              ].map(col => (
                <div key={col.title}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "#00ff4c", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {col.title}
                  </h4>
                  {col.social ? (
                    <div style={{ display: "flex", gap: 10 }}>
                      {[
                        { icon: "bxl-instagram", url: "https://www.instagram.com/realmusicground/" },
                        { icon: "bxl-twitter", url: "https://x.com/MusicGroundMx" },
                        { icon: "bxl-youtube", url: "https://youtube.com/@musicground-c2l" },
                      ].map(s => (
                        <a key={s.icon} href={s.url} target="_blank" rel="noreferrer" style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: 36, height: 36, background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%",
                          color: "rgba(255,255,255,0.4)", fontSize: 18, textDecoration: "none", transition: "all 0.2s"
                        }}>
                          <i className={`bx ${s.icon}`} />
                        </a>
                      ))}
                    </div>
                  ) : (
                    col.links.map(link => (
                      <Link key={link.to} to={link.to} style={{
                        display: "block", color: "rgba(255,255,255,0.3)",
                        textDecoration: "none", fontSize: 13, marginBottom: 10, transition: "color 0.2s"
                      }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#00ff4c")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                      >
                        {link.label}
                      </Link>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
            © 2026 MusicGround. Donde vive toda escena musical.
          </div>
        </div>
      </footer>
    </div>
  );
};
export default MGLayout;
