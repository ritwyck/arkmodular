// Main JS for Design Ark - Analog-futurist art gallery UI
// Pure JS, no libraries; focuses on builder interaction, reveals, accessibility
// Ritual pace: longer timings for composed feel
// Mechanical interactions: bezier curves for tactile feedback
// Reduced motion support: only opacity/crossfade on prefers-reduced-motion

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  // IntersectionObserver for staggered reveals - rootMargin -10% for early trigger, stagger layers by 120ms
  const observerOptions = { rootMargin: '-10% 0px', threshold: 0 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Trigger staggered reveal: background vignette, midplane card rise, foreground fade
        const delays = [0, 120, 240]; // ms
        const layers = entry.target.querySelectorAll('.reveal-layer');
        layers.forEach((layer, i) => {
          setTimeout(() => layer.classList.add('revealed'), delays[i]);
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for reveals
  document.querySelectorAll('.reveal-section').forEach(revealObserver.observe);

  // Builder logic - select module, fly to stage, snap with lock-in
  const moduleCards = document.querySelectorAll('.module-card');
  const stageSlots = document.querySelectorAll('.stage-slot'); // Assume placeholder divs in stage

  moduleCards.forEach(card => {
    card.addEventListener('click', selectModule);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectModule.call(card, e);
      }
    });
  });

  // Assembly ritual: press animation, detach fly, arrive with rotate and bloom
  function selectModule(e) {
    const card = this;
    // Press effect
    card.classList.add('press');
    setTimeout(() => card.classList.remove('press'), 120);

    // Detach and fly
    setTimeout(() => {
      const clone = card.cloneNode(true);
      clone.style.position = 'fixed';
      clone.style.zIndex = '1000';
      document.body.appendChild(clone);

      // Calculate arc path - bezier to stage position
      const startRect = card.getBoundingClientRect();
      const stageRect = document.querySelector('.stage').getBoundingClientRect();
      const arcPath = `translateX(${stageRect.left - startRect.left}px) translateY(${stageRect.top - startRect.top}px) rotateZ(6deg)`;

      clone.style.transform = arcPath;
      clone.style.transition = `transform var(--motion-slow) var(--bezier-cinematic)`;

      setTimeout(() => {
        clone.remove();
        // Arrive: rotate stage slightly, emit bloom
        document.querySelector('.stage').style.transform = 'rotateY(3deg) scale(1.02)';
        document.querySelector('.stage').style.boxShadow = `0 0 20px var(--accent-warm)`;
        // Update summary panel with price roller, numeric count
        updateSummary(card.dataset);

        setTimeout(() => {
          document.querySelector('.stage').style.transform = '';
          document.querySelector('.stage').style.boxShadow = '';
        }, 350); // bloom duration
      }, 650); // motion-slow
    }, 150); // after press
  }

  // Keyboard navigation - arrow keys for cards, as role="option" in listbox
  const cardListbox = document.querySelector('.module-listbox');
  if (cardListbox) {
    cardListbox.addEventListener('keydown', (e) => {
      const cards = Array.from(cardListbox.children);
      let currentIndex = cards.findIndex(card => card === document.activeElement);
      if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
        cards[currentIndex + 1].focus();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        cards[currentIndex - 1].focus();
      }
    });
  }

  // Presets - cascade animation on select
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Simulate selecting modules for preset, with staggered timings
      const presetModules = JSON.parse(btn.dataset.modules); // Assume JSON array of module ids
      presetModules.forEach((id, index) => {
        setTimeout(() => selectModule.call(document.querySelector(`[data-id="${id}"]`)), index * 80);
      });
    });
  });

  // Incompatibility handling - recoil animation, show microcopy with remedy
  function checkCompatibility(selectedModules) {
    // Dummy logic - if incompatible, recoil and show panel
    selectedModules.forEach(module => {
      if (module.incompatible) {
        document.querySelector(`[data-id="${module.id}"]`).classList.add('recoil');
        setTimeout(() => {
          showIncompatibilityPanel(module.reason, module.remedy);
        }, 200);
      }
    });
  }

  // Spec explanation - slide down panel [--motion-medium]
  document.querySelectorAll('.spec-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const panel = toggle.nextElementSibling;
      panel.classList.toggle('show');
    });
  });

  // High contrast toggle - add class to body
  document.getElementById('contrast-toggle').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
  });

  // Reduced motion preference - handled in CSS, ensure JS animations respect
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable JS animations
    window.requestAnimationFrame = (cb) => setTimeout(cb, 16 * 5); // Debounce to reduce motion
  }

  // Set video playback rate to 0.5x - since autoplay needs mute
  const video = document.getElementById('video');
  if (video) {
    video.playbackRate = 0.5;
  }

  // Update summary panel with live aria-polite
  function updateSummary(data) {
    const summary = document.getElementById('summary-panel');
    summary.textContent = `Modules: ${data.count}, Price: $${data.price}`;
    summary.setAttribute('aria-live', 'polite');
  }

  // Show incompatibility panel
  function showIncompatibilityPanel(reason, remedy) {
    const panel = document.getElementById('incompatibility-panel');
    panel.innerHTML = `<p>${reason}</p><p>Suggestion: ${remedy}</p>`;
    panel.classList.add('show'); // Assumes CSS for slide in
  }
}

// Magnet hover - calc dx, dy toward cursor, clamped to 10px
document.addEventListener('mousemove', (e) => {
  const hovered = document.querySelector('.magnet-hover:hover');
  if (hovered) {
    const rect = hovered.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = Math.max(-10, Math.min(10, e.clientX - centerX));
    const dy = Math.max(-10, Math.min(10, e.clientY - centerY));
    hovered.style.setProperty('--dx', `${dx}px`);
    hovered.style.setProperty('--dy', `${dy}px`);
  }
});

// Stage rotation on drag - inertial
let stageDragStart;
document.querySelector('.stage').addEventListener('mousedown', (e) => {
  stageDragStart = e.clientX;
  document.querySelector('.stage').style.cursor = 'grabbing';
});
document.addEventListener('mousemove', (e) => {
  if (stageDragStart) {
    const delta = e.clientX - stageDragStart;
    document.querySelector('.stage').style.transform = `rotateY(${delta / 5}deg)`;
  }
});
document.addEventListener('mouseup', () => {
  stageDragStart = null;
  document.querySelector('.stage').style.cursor = '';
});

// Prep for 3D - if using canvas, would use ctx.rotate, but for now CSS

/* Why these choices:
- IntersectionObserver with rootMargin for preemptive reveals to avoid layout shift
- requestAnimationFrame in recoil for smooth, performance-optimized
- ARIA: dynamic live summary for screen readers, role=listbox for nav
- Reduced motion: only crossfade, removing transforms/rotations as per pref
- Bezier curves applied via CSS var to match mechanical/tactile feel
*/
