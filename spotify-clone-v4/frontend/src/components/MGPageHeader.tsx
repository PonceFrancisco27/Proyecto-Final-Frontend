import { Link } from "react-router-dom";

interface Crumb { label: string; to?: string }
interface MGPageHeaderProps {
  title: string;
  highlight: string;
  icon: string;
  subtitle: string;
  crumbs: Crumb[];
}

const MGPageHeader = ({ title, highlight, icon, subtitle, crumbs }: MGPageHeaderProps) => (
  <div style={{
    position: "relative", padding: "72px 2rem 60px",
    background: "linear-gradient(180deg, #0d0d28 0%, #060610 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden"
  }}>
    {/* Grid background */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: "linear-gradient(rgba(0,255,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,76,0.04) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
      maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"
    }} />
    <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 20, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {c.to ? (
              <Link to={c.to} style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#00ff4c")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >{c.label}</Link>
            ) : (
              <span style={{ color: "#00ff4c" }}>{c.label}</span>
            )}
            {i < crumbs.length - 1 && <span className="material-icons-round" style={{ fontSize: 16 }}>chevron_right</span>}
          </span>
        ))}
      </div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.02em" }}>
        {title} <span className="mg-text-gradient">{highlight}</span>
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
        <span className="material-icons-round" style={{ fontSize: 18, color: "#00ff4c" }}>{icon}</span>
        <span>{subtitle}</span>
      </div>
    </div>
  </div>
);
export default MGPageHeader;
