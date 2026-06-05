import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

const PAGE_MAP: Record<string, string> = {
  ayuda: "ayuda.html",
  blog: "blog.html",
  centrocontacto: "centrocontacto.html",
  seguridad: "centrodeseguridad.html",
  copyright: "copyright.html",
  eventos: "eventos.html",
  explorar: "explorar.html",
  goplus: "goplus.html",
  artistpro: "artistpro.html",
  artistas: "artistasdestacados.html",
  caracteristicas: "artistasplayercaracteristicas.html",
  terminos: "terminos.html",
  privacidad: "privacidad.html",
  prensa: "prensa.html",
  politicas: "politicasmoderacion.html",
  info: "informacionMusciGround.html",
  infoempresa: "informacionEmpresa.html",
  infodaily: "informacionMusicDaily.html",
  playlists: "playlistcomunidad.html",
  artistdash: "artistadashboard.html",
  artistunirse: "artistuniser.html",
  // New pages from RAR
  empleo: "empleo.html",
  directrices: "directricescomunidad.html",
  guias: "guiasautoridades.html",
  cookies: "politicacookies.html",
  reportar: "reportarproblema.html",
};

const MgPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const htmlFile = slug ? PAGE_MAP[slug] : null;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        doc.querySelectorAll("a[href]").forEach((el) => {
          const a = el as HTMLAnchorElement;
          const href = a.getAttribute("href") || "";
          if (href.startsWith("/mg/") || href === "/" || href === "/player") {
            a.addEventListener("click", (e) => {
              e.preventDefault();
              window.location.href = href;
            });
          }
        });
      } catch { /* cross-origin */ }
    };
    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [htmlFile]);

  if (!htmlFile) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4"
        style={{ background: "#060610", color: "#e8e8f0" }}>
        <span className="material-icons-round text-6xl" style={{ color: "#00ff4c" }}>search_off</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>Página no encontrada</h1>
        <Link to="/" className="px-6 py-2 rounded-full font-semibold"
          style={{ background: "linear-gradient(135deg,#00ff4c,#00cc3d)", color: "#060610" }}>
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      src={`/pages/${htmlFile}`}
      className="w-full border-0"
      title={slug}
      style={{ display: "block", height: "100vh" }}
    />
  );
};

export default MgPage;
