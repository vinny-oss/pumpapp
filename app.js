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
