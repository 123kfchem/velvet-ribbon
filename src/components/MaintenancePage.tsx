import { useEffect } from "react";
import { BotanicalSprig, RibbonMark } from "./Icons";

export default function MaintenancePage() {
  useEffect(() => {
    document.title = "A Little Pause | Velvet Ribbon";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Velvet Ribbon is taking a short pause while we make things even more thoughtful. Please check back soon.",
    );
    document.querySelector('meta[name="robots"]')?.setAttribute("content", "noindex, nofollow");
  }, []);

  return (
    <main className="maintenance-page">
      <BotanicalSprig className="maintenance-sprig maintenance-sprig-left" />
      <BotanicalSprig className="maintenance-sprig maintenance-sprig-right" />
      <section className="maintenance-card" aria-labelledby="maintenance-title">
        <div className="maintenance-brand">
          <RibbonMark />
          <span>Velvet Ribbon</span>
        </div>
        <p className="eyebrow centered-eyebrow"><span className="fine-rule" />A little pause<span className="fine-rule" /></p>
        <h1 id="maintenance-title">We’ll be back <em>soon.</em></h1>
        <p className="maintenance-message">
          We’re making a few thoughtful updates behind the scenes. Our website is taking a short pause while we make everything feel just right.
        </p>
        <div className="maintenance-divider"><span /><RibbonMark /><span /></div>
        <p className="maintenance-signoff">Thank you for your patience.<br /><em>With care, Velvet Ribbon</em></p>
      </section>
      <p className="maintenance-footer">&copy; {new Date().getFullYear()} Velvet Ribbon</p>
    </main>
  );
}
