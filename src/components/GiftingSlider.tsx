import { useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from "react";
import { Arrow } from "./Icons";

const slides = [
  {
    title: "The Art of Thoughtful Gifting.",
    description: "Discover beautifully curated gifts designed to make every moment special.",
    image: "/images/collection-signature.webp",
    alt: "An elegant forest-green gift box arranged with a candle, keepsake and champagne ribbon.",
  },
  {
    title: "Make It Personal.",
    description: "Thoughtful details make every gift unforgettable.",
    image: "/images/atelier.webp",
    alt: "A gift box being carefully finished by hand with a soft ivory satin bow.",
  },
  {
    title: "Celebrate Every Moment.",
    description: "Find something special for birthdays, anniversaries and celebrations.",
    image: "/images/collection-celebration.webp",
    alt: "An ivory gift box with a soft pink ribbon, surrounded by delicate roses.",
  },
  {
    title: "Gifting Beyond Expectations.",
    description: "Elegant gifting solutions for businesses and meaningful connections.",
    image: "/images/collection-corporate.webp",
    alt: "A refined forest-green gift box, notebook and pen arranged for a business gift.",
  },
];

export default function GiftingSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion, activeIndex]);

  const showPrevious = () => setActiveIndex(index => (index - 1 + slides.length) % slides.length);
  const showNext = () => setActiveIndex(index => (index + 1) % slides.length);

  function handleTouchEnd(event: ReactTouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 48) return;
    if (distance > 0) showPrevious();
    else showNext();
  }

  return (
    <section
      className="gifting-slider"
      aria-label="Velvet Ribbon gifting inspiration"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={event => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onTouchStart={event => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => { touchStartX.current = null; }}
    >
      <div className="gifting-slides" aria-live="off">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              key={slide.title}
              className={`gifting-slide ${isActive ? "is-active" : ""}`}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={!isActive}
            >
              <img src={slide.image} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} draggable="false" />
              <div className="gifting-slide-caption">
                <p className="eyebrow"><span className="fine-rule" />The Gifting Atelier</p>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </article>
          );
        })}
      </div>
      <button type="button" className="gifting-slider-arrow gifting-slider-previous" aria-label="Previous slide" onClick={showPrevious}>
        <Arrow />
      </button>
      <button type="button" className="gifting-slider-arrow gifting-slider-next" aria-label="Next slide" onClick={showNext}>
        <Arrow />
      </button>
      <div className="gifting-slider-dots" role="group" aria-label="Choose a slide">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={`gifting-slider-dot ${index === activeIndex ? "is-active" : ""}`}
            aria-label={`Show slide ${index + 1}: ${slide.title}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
