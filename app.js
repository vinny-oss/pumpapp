// Sticky header shadow on scroll
(function () {
  const header = document.querySelector('.app-header');
  const onScroll = () => {
    if (window.scrollY > 4) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Basic interactions (stubs for future)
document.querySelector('.pill-btn')?.addEventListener('click', () => {
  // TODO: route to premium screen
  alert('Premium coming soon 💪');
});

document.querySelector('.row-card')?.addEventListener('click', (e) => {
  e.preventDefault();
  // TODO: open date picker / today details
  alert('Today details coming soon');
});

// Pump Gauge animation
(function () {
  const gauge = document.querySelector('.gauge');
  if (!gauge) return;

  const value = parseFloat(gauge.getAttribute('data-value') || '0');
  const percent = Math.round(value * 100);
  const numberEl = gauge.querySelector('.gauge-number');

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // No animation, set final values immediately
    gauge.style.background = `conic-gradient(
      from 0deg,
      var(--accent) 0%,
      var(--accent) ${percent}%,
      var(--surface-2) ${percent}%
    )`;
    if (numberEl) numberEl.textContent = percent;
    gauge.setAttribute('aria-valuenow', percent);
  } else {
    // Animate the gauge
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentPercent = Math.round(eased * percent);
      const currentValue = eased * value;

      // Update gauge background
      gauge.style.background = `conic-gradient(
        from 0deg,
        var(--accent) 0%,
        var(--accent) ${currentPercent}%,
        var(--surface-2) ${currentPercent}%
      )`;

      // Update number
      if (numberEl) numberEl.textContent = currentPercent;

      // Update aria
      gauge.setAttribute('aria-valuenow', currentPercent);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
})();
