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

  // Ratings slider (index page): show 3 cards and slide one-by-one.
  const ratingSlider = document.querySelector("[data-rating-slider]");
  if (ratingSlider) {
    const track = ratingSlider.querySelector(".rating-track");
    if (track) {
      const baseItems = Array.from(track.children).map((node) => node.cloneNode(true));
      let currentIndex = 0;
      let timer = null;
      let pause = false;

      const visibleCount = () => {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 992) return 2;
        return 4;
      };

      const getStepWidth = () => {
        const first = track.querySelector(".rating-item");
        if (!first) return 0;
        const gap = parseFloat(getComputedStyle(track).gap || "0");
        return first.getBoundingClientRect().width + gap;
      };

      const render = () => {
        const visible = visibleCount();
        track.innerHTML = "";
        baseItems.forEach((item) => track.appendChild(item.cloneNode(true)));
        baseItems.slice(0, visible).forEach((item) => track.appendChild(item.cloneNode(true)));
        currentIndex = 0;
        track.style.transition = "none";
        track.style.transform = "translateX(0px)";
      };

      const moveNext = () => {
        if (pause) return;
        const step = getStepWidth();
        if (!step) return;
        currentIndex += 1;
        track.style.transition = "transform .55s ease";
        track.style.transform = `translateX(${-currentIndex * step}px)`;

        if (currentIndex >= baseItems.length) {
          window.setTimeout(() => {
            currentIndex = 0;
            track.style.transition = "none";
            track.style.transform = "translateX(0px)";
          }, 570);
        }
      };

      const start = () => {
        if (timer) window.clearInterval(timer);
        timer = window.setInterval(moveNext, 2400);
      };

      render();
      start();
      window.addEventListener("resize", () => {
        render();
        start();
      });
      ratingSlider.addEventListener("mouseenter", () => {
        pause = true;
      });
      ratingSlider.addEventListener("mouseleave", () => {
        pause = false;
      });
    }
  }
})();

