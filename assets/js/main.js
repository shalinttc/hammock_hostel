(() => {
  const BOOKING_URL = "https://live.ipms247.com/booking/book-rooms-hammockhostels";

  // Ensure any element marked as data-book-now routes correctly.
  document.querySelectorAll("[data-book-now]").forEach((el) => {
    el.setAttribute("href", BOOKING_URL);
  });

  // Mark active nav link based on current path.
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  // Reveal-on-scroll animations for key layout blocks.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) {
    const revealTargets = document.querySelectorAll(
      ".section-heading, .hero-card, .hero-media, .card-soft, .icon-tile, .gcell, .cta-band"
    );

    revealTargets.forEach((el, idx) => {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-delay", `${(idx % 6) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }
})();

