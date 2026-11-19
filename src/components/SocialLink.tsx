import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { emptyDestinations, platformNames, readDestinations, type Platform, type SocialDestinations } from "../lib/social";

const SocialContext = createContext<{
  destinations: SocialDestinations;
  contactEmail: string | null;
  onUnavailable: (platform: Platform) => void;
}>({ destinations: emptyDestinations, contactEmail: null, onUnavailable: () => {} });

export function SocialProvider({ children, onUnavailable }: { children: ReactNode; onUnavailable: (platform: Platform) => void }) {
  const [destinations, setDestinations] = useState<SocialDestinations>(emptyDestinations);
  const [contactEmail, setContactEmail] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/social-links.json", { signal: controller.signal, cache: "no-store" })
      .then(response => response.ok ? response.json() : null)
      .then(config => {
        if (controller.signal.aborted) return;
        setDestinations(readDestinations(config));
        const email = typeof config?.contactEmail === "string" ? config.contactEmail.trim() : "";
        setContactEmail(/^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,}$/i.test(email) ? email : null);
      })
      .catch(() => { /* Missing configuration must never send visitors to an unverified account. */ });
    return () => controller.abort();
  }, []);

  return <SocialContext.Provider value={{ destinations, contactEmail, onUnavailable }}>{children}</SocialContext.Provider>;
}

export function FooterContactDetails() {
  const { destinations, contactEmail } = useContext(SocialContext);
  const number = destinations.whatsapp ? new URL(destinations.whatsapp).pathname.slice(1) : null;
  if (!number && !contactEmail) return <p>Something special in mind?</p>;
  return <div className="footer-contact-details">
    {number && <p>+{number}</p>}
    {contactEmail && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
  </div>;
}

type SocialLinkProps = {
  platform: Platform;
  children: ReactNode;
  className?: string;
  label?: string;
  message?: string;
};

export function SocialLink({ platform, children, className = "", label, message }: SocialLinkProps) {
  const { destinations, onUnavailable } = useContext(SocialContext);
  const destination = destinations[platform];
  const name = label ?? (platform === "whatsapp" ? "Chat with Velvet Ribbon on WhatsApp" : `Velvet Ribbon on ${platformNames[platform]}`);

  if (!destination) {
    return <button type="button" className={className} aria-label={name} aria-haspopup="dialog" data-platform={platform} onClick={() => onUnavailable(platform)}>{children}</button>;
  }

  const url = new URL(destination);
  if (platform === "whatsapp" && message) url.searchParams.set("text", message);
  return <a className={className} href={url.href} target="_blank" rel="noopener noreferrer" data-platform={platform} aria-label={`${name} (opens in a new tab)`}>{children}</a>;
}