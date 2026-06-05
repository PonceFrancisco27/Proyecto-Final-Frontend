import MGLayout from "@/components/MGLayout";
import MGPageHeader from "@/components/MGPageHeader";
import { useState } from "react";

const categories = [
  { id: "cuenta", icon: "person", label: "Cuenta y perfil", faqs: [
    { q: "¿Cómo cambio mi contraseña?", a: "Ve a Configuración > Seguridad > Cambiar contraseña. Recibirás un correo de confirmación." },
    { q: "¿Cómo actualizo mi foto de perfil?", a: "Desde tu perfil, haz clic en tu foto y selecciona 'Cambiar imagen'. Admitimos JPG, PNG y GIF." },
    { q: "¿Cómo elimino mi cuenta?", a: "Ve a Configuración > Cuenta > Eliminar cuenta. Esta acción es irreversible." },
  ]},
  { id: "pago", icon: "payments", label: "Pagos y suscripciones", faqs: [
    { q: "¿Qué métodos de pago aceptan?", a: "Tarjetas de crédito/débito (Visa, Mastercard, Amex), PayPal, transferencia bancaria y pago en OXXO." },
    { q: "¿Cómo cancelo mi suscripción Go+?", a: "Ve a Configuración > Suscripción > Cancelar. Tu acceso premium continuará hasta el fin del período pagado." },
    { q: "¿Puedo obtener reembolso?", a: "Los reembolsos se procesan dentro de los 7 días después de la compra. Contáctanos en soporte@musicground.com." },
  ]},
  { id: "musica", icon: "music_note", label: "Música y playlists", faqs: [
    { q: "¿Cómo creo una playlist?", a: "Haz clic en 'Nueva Playlist' en la barra lateral izquierda, ponle nombre y empieza a añadir canciones." },
    { q: "¿Puedo escuchar sin conexión?", a: "Sí, con Go+ puedes descargar hasta 10,000 canciones para escuchar offline." },
    { q: "¿Por qué no puedo reproducir una canción?", a: "Verifica tu conexión a internet o si la canción está disponible en tu región." },
  ]},
  { id: "artista", icon: "mic", label: "Para artistas", faqs: [
    { q: "¿Cómo subo mi música?", a: "Desde tu panel de artista, ve a 'Subir pista' y sigue las instrucciones. Admitimos MP3, WAV y FLAC." },
    { q: "¿Cuándo recibo mis regalías?", a: "Los pagos se procesan el día 15 de cada mes para el período anterior." },
    { q: "¿Qué datos estadísticos puedo ver?", a: "Reproducciones, oyentes únicos, países, seguidores y tendencias semanales." },
  ]},
  { id: "tecnico", icon: "settings", label: "Problemas técnicos", faqs: [
    { q: "La app no carga, ¿qué hago?", a: "Limpia la caché del navegador, verifica tu conexión y recarga la página. Si persiste, contáctanos." },
    { q: "El sonido se corta mientras escucho", a: "Esto suele ocurrir por conexión lenta. Reduce la calidad de audio en Configuración > Calidad." },
    { q: "¿Cómo reporto un bug?", a: "Usa el botón de feedback en la esquina inferior derecha o escríbenos a bugs@musicground.com." },
  ]},
];

const card = { background: "rgba(0,255,76,0.06)", border: "1px solid rgba(0,255,76,0.2)", borderRadius: 14, padding: "20px 24px", marginBottom: 32, display: "flex", gap: 14, alignItems: "flex-start" as const };

const AyudaPage = () => {
  const [active, setActive] = useState("cuenta");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const currentCat = categories.find(c => c.id === active)!;

  return (
    <MGLayout activeNav="Para artistas">
      <MGPageHeader title="Centro de" highlight="Ayuda" icon="help" subtitle="¿Cómo podemos ayudarte?" crumbs={[{ label: "Inicio", to: "/" }, { label: "Centro de Ayuda" }]} />
      <div style={{ background: "rgba(0,255,76,0.05)", borderBottom: "1px solid rgba(0,255,76,0.1)", padding: "24px 2rem" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <i className="bx bx-search-alt" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 20, color: "#00ff4c" }} />
          <input type="text" placeholder="Buscar en el centro de ayuda..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "12px 16px 12px 48px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,76,0.3)", borderRadius: 12, color: "#e8e8f0", fontSize: 15, fontFamily: "var(--font-body)", outline: "none" }} />
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 2rem", display: "flex", gap: 40 }}>
        <aside style={{ width: 240, flexShrink: 0 }}>
          <div style={{ position: "sticky", top: 100 }}>
            <h4 style={{ color: "#00ff4c", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Categorías</h4>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => { setActive(cat.id); setOpenFaq(null); }}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: active === cat.id ? "rgba(0,255,76,0.12)" : "transparent", color: active === cat.id ? "#00ff4c" : "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", fontSize: 14, textAlign: "left", marginBottom: 4, transition: "all 0.2s" }}>
                <span className="material-icons-round" style={{ fontSize: 18 }}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </aside>
        <main style={{ flex: 1 }}>
          <div style={card}>
            <span className="material-icons-round" style={{ color: "#00ff4c", fontSize: 24, marginTop: 2 }}>support_agent</span>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>Bienvenido al Centro de Ayuda de MusicGround. Encuentra respuestas a tus preguntas, tutoriales y formas de contactarnos. Si no encuentras lo que buscas, nuestro equipo está disponible 24/7.</p>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: 24 }}>
            <span className="material-icons-round" style={{ color: "#00ff4c", verticalAlign: "middle", marginRight: 8 }}>{currentCat.icon}</span>
            {currentCat.label}
          </h2>
          {currentCat.faqs.filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase())).map((faq, i) => (
            <div key={i} style={{ marginBottom: 12, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: openFaq === i ? "rgba(0,255,76,0.08)" : "rgba(255,255,255,0.03)", border: "none", cursor: "pointer", color: "#e8e8f0", fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, textAlign: "left" }}>
                {faq.q}
                <span className="material-icons-round" style={{ color: "#00ff4c", fontSize: 20 }}>{openFaq === i ? "expand_less" : "expand_more"}</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "16px 20px", background: "rgba(0,255,76,0.04)", color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </main>
      </div>
    </MGLayout>
  );
};
export default AyudaPage;
