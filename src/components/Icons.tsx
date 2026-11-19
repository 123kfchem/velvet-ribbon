import { faFacebook, faInstagram, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import type { Platform } from "../lib/social";

const brandIcons = { instagram: faInstagram, facebook: faFacebook, tiktok: faTiktok, whatsapp: faWhatsapp };

export function BrandIcon({ platform, className = "" }: { platform: Platform; className?: string }) {
  const [width, height, , , data] = brandIcons[platform].icon;
  return (
    <svg aria-hidden="true" focusable="false" className={`brand-icon ${className}`} viewBox={`0 0 ${width} ${height}`} fill="currentColor">
      {(Array.isArray(data) ? data : [data]).map((path, i) => <path key={i} d={path} />)}
    </svg>
  );
}

export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return (
    <svg className={`arrow ${className}`} width="21" height="18" viewBox="0 0 24 20" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        {diagonal ? <path d="M5 16 18 3M7 3h11v11" /> : <path d="M2 10h19m-6-6 6 6-6 6" />}
      </g>
    </svg>
  );
}

export function RibbonMark({ className = "" }: { className?: string }) {
  return (
    <svg className={`ribbon-mark ${className}`} viewBox="0 0 66 53" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth="1.7" d="M31 21C23 12 14 1 7 6c-8 7 3 21 14 21 5 0 8-2 11-4M34 21C41 10 52 1 59 7c7 7-4 18-14 18-5 0-9-2-11-3" />
        <path strokeWidth="1.2" d="M30 21C19 16 10 13 7 7m26 14c10-4 21-8 26-13M29 23C19 23 11 19 8 14m28 9c8 0 16-3 21-8" />
        <path strokeWidth="1.6" d="M30 24c-7 6-8 16-19 20l8 1 3 5c7-8 5-20 12-25M34 24c8 4 10 17 22 18l-7 3-2 5c-10-8-7-18-15-25" />
        <path strokeWidth="1.1" d="M30 26c-5 7-6 14-13 18m18-18c6 6 7 13 14 17" />
        <path strokeWidth="1.5" d="M29 19c2-2 6-1 7 2 1 3-2 6-5 5-3-1-4-5-2-7Z" />
      </g>
    </svg>
  );
}

export function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#home" className={`wordmark ${footer ? "wordmark-footer" : ""}`} aria-label="Velvet Ribbon home">
      <RibbonMark />
      <span>Velvet Ribbon</span>
    </a>
  );
}

export function CloseIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>;
}

export function BotanicalSprig({ className = "" }: { className?: string }) {
  const leaves = [
    [52, 179, -49, 0.85], [67, 157, 34, 0.94], [78, 133, -44, 0.93],
    [93, 111, 30, 0.85], [103, 86, -34, 0.8], [113, 61, 37, 0.73],
    [118, 39, -12, 0.64], [46, 151, -48, 0.65], [42, 129, 7, 0.7],
    [37, 108, -27, 0.66], [101, 149, 67, 0.77], [124, 140, 28, 0.7],
    [141, 129, 47, 0.55], [132, 87, 63, 0.55], [145, 75, 33, 0.55],
  ];
  return (
    <svg className={`botanical-sprig ${className}`} viewBox="0 0 180 245" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 241C52 188 103 117 123 13M42 195c12-31-1-71-8-98m37 56c28 4 55-11 78-29m-45-35c17 5 31-4 47-21" />
        {leaves.map(([x, y, rotation, scale], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
            <path d="M0 0C-9-8-12-21-5-38 4-28 11-11 0 0Z" /><path d="M0 0c-1-12-5-25-5-36m4 19-6-5m7 13 5-10" strokeWidth=".7" />
          </g>
        ))}
      </g>
    </svg>
  );
}