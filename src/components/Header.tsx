import { useEffect, useRef, useState } from "react";
import { Arrow, BrandIcon, CloseIcon, Wordmark } from "./Icons";
import { SocialLink } from "./SocialLink";

const navigation = [
  { id: "home", label: "Home" },
  { id: "collections", label: "Collections" },
  { id: "our-story", label: "Our Story" },
  { id: "connect", label: "Connect" },
];

export default function Header() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
      const current = sections.filter(section => section.getBoundingClientRect().top <= window.innerHeight * 0.34).pop();
      setActive(current?.id ?? "home");
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateActive); };
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); onScroll(); };
    const onHash = () => setMenuOpen(false);
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false); };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="site-header">
      <div className="header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? "is-active" : ""} aria-current={active === item.id ? "location" : undefined}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <div className="header-socials">
            <SocialLink platform="instagram" className="icon-link"><BrandIcon platform="instagram" /></SocialLink>
            <SocialLink platform="facebook" className="icon-link"><BrandIcon platform="facebook" /></SocialLink>
            <SocialLink platform="tiktok" className="icon-link"><BrandIcon platform="tiktok" /></SocialLink>
          </div>
          <span className="header-divider" aria-hidden="true" />
          <SocialLink platform="whatsapp" className="contact-link" label="Get in touch on WhatsApp"><BrandIcon platform="whatsapp" /><span>Get in Touch</span></SocialLink>
          <button ref={menuButtonRef} type="button" className="menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <CloseIcon /> : <svg width="23" height="19" viewBox="0 0 23 19" fill="none" aria-hidden="true"><path d="M1 4h21M1 10h21M8 16h14" stroke="currentColor" strokeWidth="1.4" /></svg>}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation" inert={!menuOpen}>
        <div className="mobile-nav-inner" onClick={() => setMenuOpen(false)}>
          {navigation.map(item => <a href={`#${item.id}`} key={item.id} aria-current={active === item.id ? "location" : undefined}><span>{item.label}</span><Arrow /></a>)}
          <SocialLink platform="whatsapp" className="mobile-contact"><BrandIcon platform="whatsapp" />Get in Touch</SocialLink>
        </div>
      </nav>
    </header>
  );
}