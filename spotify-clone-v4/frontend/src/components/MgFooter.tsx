import { Link } from "react-router-dom";

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} className="block text-xs transition-colors mb-1"
    style={{ color: "rgba(255,255,255,0.35)" }}
    onMouseEnter={e => ((e.target as HTMLElement).style.color = "#00ff4c")}
    onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)")}>
    {label}
  </Link>
);

const MgFooter = () => (
  <footer className="w-full px-6 py-10"
    style={{ background: "#070712", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
    <div className="max-w-5xl mx-auto flex flex-wrap justify-between gap-10 mb-8">
      <div className="flex items-center gap-2"
        style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800 }}>
        <span className="material-icons-round" style={{ color: "#00ff4c", fontSize: "24px" }}>graphic_eq</span>
        <span className="mg-text-gradient">MusicGround</span>
      </div>

      <div className="flex gap-10 flex-wrap">
        <div className="flex flex-col">
          <h4 className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#00ff4c", fontFamily: "var(--font-display)" }}>Producto</h4>
          <FooterLink to="/mg/caracteristicas" label="Características" />
          <FooterLink to="/mg/goplus" label="Go+" />
          <FooterLink to="/mg/artistpro" label="Para artistas" />
          <FooterLink to="/mg/explorar" label="Explorar" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#00ff4c", fontFamily: "var(--font-display)" }}>Comunidad</h4>
          <FooterLink to="/mg/artistas" label="Artistas destacados" />
          <FooterLink to="/mg/playlists" label="Playlists" />
          <FooterLink to="/mg/eventos" label="Eventos" />
          <FooterLink to="/mg/blog" label="Blog" />
          <FooterLink to="/mg/directrices" label="Directrices" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#00ff4c", fontFamily: "var(--font-display)" }}>Soporte</h4>
          <FooterLink to="/mg/ayuda" label="Ayuda" />
          <FooterLink to="/mg/seguridad" label="Centro de seguridad" />
          <FooterLink to="/mg/centrocontacto" label="Contacto" />
          <FooterLink to="/mg/reportar" label="Reportar problema" />
          <FooterLink to="/mg/guias" label="Guía para autoridades" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#00ff4c", fontFamily: "var(--font-display)" }}>Legal</h4>
          <FooterLink to="/mg/terminos" label="Términos" />
          <FooterLink to="/mg/privacidad" label="Privacidad" />
          <FooterLink to="/mg/cookies" label="Cookies" />
          <FooterLink to="/mg/copyright" label="Copyright" />
          <FooterLink to="/mg/politicas" label="Políticas de moderación" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#00ff4c", fontFamily: "var(--font-display)" }}>Empresa</h4>
          <FooterLink to="/mg/empleo" label="Empleo" />
          <FooterLink to="/mg/prensa" label="Prensa" />
          <FooterLink to="/mg/infoempresa" label="Sobre nosotros" />
          <div className="flex gap-2 mt-2">
            {[
              { href: "https://www.instagram.com/realmusicground/", icon: "bxl-instagram" },
              { href: "https://x.com/MusicGroundMx", icon: "bxl-twitter" },
              { href: "https://youtube.com/@musicground-c2l", icon: "bxl-youtube" },
            ].map(({ href, icon }) => (
              <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)", fontSize: "16px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,76,0.12)"; (e.currentTarget as HTMLAnchorElement).style.color = "#00ff4c"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"; }}
              >
                <i className={`bx ${icon}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-5xl mx-auto pt-5 text-center text-xs"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.25)" }}>
      © 2026 MusicGround. Donde vive toda escena musical.
    </div>
  </footer>
);

export default MgFooter;
