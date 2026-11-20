import { useState } from "react";
import { Arrow, BotanicalSprig, BrandIcon, RibbonMark, Wordmark } from "./components/Icons";
import { FooterContactDetails, SocialLink, SocialProvider } from "./components/SocialLink";
import Header from "./components/Header";
import Dialog from "./components/Dialog";
import { platformNames, type Platform } from "./lib/social";
import { collections, type Collection } from "./lib/collections";
import MaintenancePage from "./components/MaintenancePage";
import ContactSection from "./components/ContactSection";
import GiftingSlider from "./components/GiftingSlider";

const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === "true";

const channels: { platform: Platform; description: string; action: string }[] = [
  { platform: "instagram", description: "A gallery of gifting inspiration.", action: "Follow on Instagram" },
  { platform: "facebook", description: "Updates, moments and gifting news.", action: "Follow on Facebook" },
  { platform: "tiktok", description: "A peek behind the ribbon.", action: "Explore our TikTok" },
  { platform: "whatsapp", description: "A personal touch, one chat away.", action: "Start a conversation" },
];

type Overlay =
  | { kind: "collection"; collection: Collection }
  | { kind: "social"; platform: Platform; returnTo?: Collection }
  | null;

function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <picture className="hero-media">
        <source media="(max-width: 640px)" srcSet="/images/gifting-mobile.webp" />
        <img src="/images/gifting-hero.webp" alt="Forest-green and ivory gifts with champagne satin bows, arranged on deep green velvet." fetchPriority="high" width="2400" height="800" />
      </picture>
      <div className="hero-shade" />
      <div className="page-width hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="fine-rule" />The Gifting Atelier</p>
          <h1 id="hero-title">Thoughtful Gifts in Kenya</h1>
          <p className="hero-tagline">Beautifully chosen. Lovingly wrapped.</p>
          <p className="hero-description">Thoughtfully curated gifts and exquisite details, for the people and moments that matter.</p>
          <a className="button button-ivory hero-cta" href="#collections">Explore Collections<Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section id="connect" className="social-section" aria-labelledby="social-title">
      <BotanicalSprig className="social-leaves" />
      <div className="page-width relative">
        <div className="section-intro">
          <p className="eyebrow centered-eyebrow"><span className="fine-rule" />Stay Connected<span className="fine-rule" /></p>
          <h2 id="social-title">Follow the Art of <em>Gifting.</em></h2>
          <p className="section-description">Discover beautiful gift inspirations, explore our latest collections and stay connected with Velvet Ribbon on social media.</p>
        </div>
        <div className="social-channels">
          {channels.map(({ platform, description, action }) => (
            <SocialLink key={platform} platform={platform} className={`channel-link channel-${platform}`} label={action}>
              <span className="channel-image" aria-hidden="true" />
              <span className="channel-content">
                <span className="channel-title"><BrandIcon platform={platform} /><span>{platformNames[platform]}</span></span>
                <span className="channel-description">{description}</span>
                <span className="channel-action"><span>{action}</span><Arrow diagonal /></span>
              </span>
            </SocialLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function Collections({ onSelect }: { onSelect: (collection: Collection) => void }) {
  return (
    <section id="collections" className="collections-section" aria-labelledby="collections-title">
      <div className="page-width">
        <div className="collection-heading">
          <div><p className="eyebrow"><span className="fine-rule" />Our Collections</p><h2 id="collections-title">A gift for <em>every occasion.</em></h2></div>
          <p className="collection-intro">From quiet thank-yous to life's celebrations,<br className="desktop-break" /> find a gesture that feels just right.</p>
        </div>
        <div className="collection-grid">
          {collections.map(collection => (
            <button key={collection.id} className="collection-link" type="button" onClick={() => onSelect(collection)} aria-label={`Explore ${collection.title}`} aria-haspopup="dialog">
              <span className="collection-image"><img src={collection.image} alt={collection.alt} width="850" height="850" loading="lazy" /></span>
              <span className="collection-meta">
                <span>
                  <span className="collection-name">{collection.title}</span>
                  <span className="collection-caption">{collection.caption}</span>
                  <span className="collection-action">Explore Gifts<Arrow diagonal /></span>
                </span>
                <span className="collection-arrow" aria-hidden="true"><Arrow /></span>
              </span>
            </button>
          ))}
        </div>
        <details className="collection-credits">
          <summary>Image credits and licenses</summary>
          <ul>
            {collections.filter(collection => collection.imageSource).map(collection => (
              <li key={collection.id}>
                <span>{collection.title}: {collection.imageCredit}</span>
                {" — "}
                <a href={collection.imageSource} target="_blank" rel="noopener noreferrer">Source</a>
                {collection.imageLicenseUrl && <> · <a href={collection.imageLicenseUrl} target="_blank" rel="noopener noreferrer">{collection.imageLicense}</a></>}
                {!collection.imageLicenseUrl && <> · {collection.imageLicense}</>}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section id="our-story" className="story-section" aria-labelledby="story-title">
      <div className="story-image"><img src="/images/atelier.webp" alt="An artisan carefully tying a champagne satin bow around a Velvet Ribbon gift box." width="1300" height="867" loading="lazy" /></div>
      <div className="story-content">
        <p className="eyebrow"><span className="fine-rule" />Our Story</p>
        <h2 id="story-title">The thought behind<br /><em>the ribbon.</em></h2>
        <p>We believe a beautiful gift begins long before the ribbon is tied. It starts with a person, a moment, and the wish to make someone feel truly seen.</p>
        <p>From the first thoughtful detail to the final fold, that is the spirit of Velvet Ribbon.</p>
        <SocialLink platform="tiktok" className="text-link story-link" label="Discover our atelier on TikTok">Behind the scenes<Arrow diagonal /></SocialLink>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-main">
          <div className="footer-brand"><Wordmark footer /><p>The art of thoughtful gifting.</p></div>
          <nav className="footer-nav" aria-label="Footer navigation"><h2 className="footer-label">Explore</h2><a href="#collections">Collections</a><a href="#our-story">Our Story</a><a href="#connect">Stay Connected</a><a href="#contact">Contact</a></nav>
          <div className="footer-contact"><h2 className="footer-label">Gifting Enquiries</h2><FooterContactDetails /><SocialLink platform="whatsapp" className="text-link">Chat with our team<Arrow diagonal /></SocialLink></div>
          <div className="footer-social"><h2 className="footer-label">Follow Along</h2><div className="footer-icons">{channels.map(({ platform }) => <SocialLink key={platform} platform={platform} className="footer-icon"><BrandIcon platform={platform} /></SocialLink>)}</div></div>
        </div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Velvet Ribbon. All rights reserved.</p><a href="#home">Back to top<Arrow /></a></div>
      </div>
    </footer>
  );
}

export default function App() {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const close = () => setOverlay(null);
  const onUnavailable = (platform: Platform) => setOverlay(previous => ({
    kind: "social", platform, returnTo: previous?.kind === "collection" ? previous.collection : undefined,
  }));

  if (MAINTENANCE_MODE) return <MaintenancePage />;

  return (
    <SocialProvider onUnavailable={onUnavailable}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <main id="main-content"><Hero /><GiftingSlider /><SocialSection /><Collections onSelect={collection => setOverlay({ kind: "collection", collection })} /><OurStory /><ContactSection /></main>
      <Footer />
      {overlay?.kind === "collection" && (
        <Dialog key="collection" className="collection-dialog" labelledBy="collection-dialog-title" onClose={close}>
          <div className="collection-dialog-image"><img src={overlay.collection.image} alt={overlay.collection.alt} /></div>
          <div className="collection-dialog-copy">
            <p className="eyebrow"><span className="fine-rule" />The Collection</p>
            <h2 id="collection-dialog-title">{overlay.collection.title}</h2>
            <p className="dialog-intro">{overlay.collection.description}</p>
            <SocialLink platform="whatsapp" className="button button-green" message={`Hello Velvet Ribbon, I would love to enquire about ${overlay.collection.title.toLowerCase()}.`} label={`Enquire about ${overlay.collection.title} on WhatsApp`}><BrandIcon platform="whatsapp" />Enquire on WhatsApp<Arrow diagonal /></SocialLink>
          </div>
        </Dialog>
      )}
      {overlay?.kind === "social" && (
        <Dialog key="social" className="social-dialog" labelledBy="social-dialog-title" onClose={close}>
          <div className={`dialog-banner channel-${overlay.platform}`}><span className="channel-image" /><BrandIcon platform={overlay.platform} /></div>
          <div className="social-dialog-copy">
            <p className="eyebrow"><span className="fine-rule" />Stay Connected</p>
            <h2 id="social-dialog-title">{overlay.platform === "whatsapp" ? "Let's talk gifting." : `Our ${platformNames[overlay.platform]} profile.`}</h2>
            <p>{overlay.platform === "whatsapp" ? "Our official WhatsApp number hasn't been added yet. You'll be able to start a direct conversation here once it's connected." : `Our official ${platformNames[overlay.platform]} profile link hasn't been added yet. In the meantime, explore a little of our world through our gift collections.`}</p>
            {overlay.returnTo
              ? <button type="button" className="button button-green" onClick={() => { if (overlay.returnTo) setOverlay({ kind: "collection", collection: overlay.returnTo }); }}>Back to the collection<Arrow /></button>
              : <a href="#collections" className="button button-green" onClick={close}>Explore Collections<Arrow /></a>}
            <button type="button" className="dialog-back" onClick={close}>Back to the page</button>
          </div>
          <RibbonMark className="dialog-ribbon" />
        </Dialog>
      )}
    </SocialProvider>
  );
}
