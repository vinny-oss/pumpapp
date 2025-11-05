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

// ========== PUMP CARD DATA & LOGIC ==========

// State object
const pumpCardState = {
  h2o:  { current: 8,   goal: 8 },     // glasses or units
  pump: { current: 1,   goal: 1 },     // sessions
  fuel: { kcal: 1800,   goal: 2000 },  // calories
  rest: { hours: 7.5,   goal: 8 }      // sleep
};

// Weights (tweakable)
const weights = { h2o: 0.2, pump: 0.4, fuel: 0.2, rest: 0.2 };

// Helper: clamp value between 0 and 1
function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

// Compute score from state
function computeScoreFromState(state) {
  // Normalize each metric to 0-1
  const pH2O = clamp(state.h2o.current / state.h2o.goal);
  const pPump = clamp(state.pump.current / state.pump.goal);
  const pFuel = clamp(state.fuel.kcal / state.fuel.goal);
  const pRest = clamp(state.rest.hours / state.rest.goal);

  // Weighted score
  const score = weights.h2o * pH2O + weights.pump * pPump + weights.fuel * pFuel + weights.rest * pRest;

  return {
    score: clamp(score),
    progresses: {
      h2o: pH2O,
      pump: pPump,
      fuel: pFuel,
      rest: pRest
    }
  };
}

// Animate gauge to a value
function animateGauge(gaugeEl, targetValue, targetPercent) {
  const numberEl = gaugeEl.querySelector('.gauge-number');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // No animation, set final values immediately
    gaugeEl.style.background = `conic-gradient(
      from 0deg,
      var(--accent) 0%,
      var(--accent) ${targetPercent}%,
      var(--surface-2) ${targetPercent}%
    )`;
    if (numberEl) numberEl.textContent = targetPercent;
    gaugeEl.setAttribute('aria-valuenow', targetPercent);
  } else {
    // Animate the gauge
    const duration = 1200;
    const startTime = performance.now();
    const startPercent = parseInt(gaugeEl.getAttribute('aria-valuenow') || '0');

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentPercent = Math.round(startPercent + eased * (targetPercent - startPercent));

      // Update gauge background
      gaugeEl.style.background = `conic-gradient(
        from 0deg,
        var(--accent) 0%,
        var(--accent) ${currentPercent}%,
        var(--surface-2) ${currentPercent}%
      )`;

      // Update number
      if (numberEl) numberEl.textContent = currentPercent;

      // Update aria
      gaugeEl.setAttribute('aria-valuenow', currentPercent);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

// Render pump card from state
function renderPumpCard(state) {
  const result = computeScoreFromState(state);
  const scorePercent = Math.round(result.score * 100);

  // Update chips
  const chips = {
    h2o: document.querySelector('.corner-chip[data-metric="h2o"]'),
    pump: document.querySelector('.corner-chip[data-metric="pump"]'),
    fuel: document.querySelector('.corner-chip[data-metric="fuel"]'),
    rest: document.querySelector('.corner-chip[data-metric="rest"]')
  };

  // H2O chip
  if (chips.h2o) {
    const valueEl = chips.h2o.querySelector('.chip-value');
    if (valueEl) valueEl.textContent = `${state.h2o.current}/${state.h2o.goal}`;
    chips.h2o.classList.toggle('ok', result.progresses.h2o >= 1);
    chips.h2o.classList.toggle('warn', result.progresses.h2o < 1);
  }

  // Pump chip
  if (chips.pump) {
    const valueEl = chips.pump.querySelector('.chip-value');
    if (valueEl) valueEl.textContent = `${state.pump.current}/${state.pump.goal}`;
    chips.pump.classList.toggle('ok', result.progresses.pump >= 1);
    chips.pump.classList.toggle('warn', result.progresses.pump < 1);
  }

  // Fuel chip
  if (chips.fuel) {
    const valueEl = chips.fuel.querySelector('.chip-value');
    if (valueEl) valueEl.textContent = `${state.fuel.kcal}`;
    chips.fuel.classList.toggle('ok', result.progresses.fuel >= 1);
    chips.fuel.classList.toggle('warn', result.progresses.fuel < 1);
  }

  // Rest chip
  if (chips.rest) {
    const valueEl = chips.rest.querySelector('.chip-value');
    if (valueEl) valueEl.textContent = `${state.rest.hours}h`;
    chips.rest.classList.toggle('ok', result.progresses.rest >= 1);
    chips.rest.classList.toggle('warn', result.progresses.rest < 1);
  }

  // Update gauge
  const gauge = document.querySelector('.gauge');
  if (gauge) {
    gauge.setAttribute('data-value', result.score);
    animateGauge(gauge, result.score, scorePercent);
  }
}

// Set pump card state (shallow merge + render)
function setPumpCardState(patch) {
  Object.assign(pumpCardState, patch);
  renderPumpCard(pumpCardState);
}

// Initialize on page load
renderPumpCard(pumpCardState);
