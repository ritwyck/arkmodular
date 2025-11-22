// Main JS for Ark Modular - module builder UI
// Pure JS, no libraries; focuses on module selection, assembly, accessibility
// Ritual pace: longer timings for composed feel
// Mechanical interactions: bezier curves for tactile feedback
// Reduced motion support: only opacity/crossfade on prefers-reduced-motion

// Module data (local storage)
const modulesData = [
  // Neural Compute
  { id: "npu-muse", group: "npu", title: "Muse NPU", tier: "muse", price: 100, weight_g: 8, power_w: 2.5, compatibility: { requires: [], conflicts: [] }, specs: { peak_ops: "4 TOPS", local_ai: "basic local inference", explain: "Runs simple AI locally for privacy & energy savings." }, appearance: { material: "matte-carbon", accent: "--accent-violet" } },
  { id: "npu-arc", group: "npu", title: "Arc NPU", tier: "arc", price: 150, weight_g: 10, power_w: 3.2, compatibility: { requires: [], conflicts: [] }, specs: { peak_ops: "8 TOPS", local_ai: "balanced local inference", explain: "Balanced performance for AI and computer vision tasks." }, appearance: { material: "matte-carbon", accent: "--accent-violet" } },
  { id: "npu-apollo", group: "npu", title: "Apollo NPU", tier: "apollo", price: 200, weight_g: 12, power_w: 3.6, compatibility: { requires: [], conflicts: ["thermal-passive"] }, specs: { peak_ops: "12 TOPS", local_ai: "advanced local inference", explain: "High-performance AI for complex models and real-time processing." }, appearance: { material: "matte-carbon", accent: "--accent-violet" } },
  // CPU/GPU
  { id: "cpu-petite", group: "cpu", title: "Petite CPU", tier: "petite", price: 150, weight_g: 15, power_w: 4, compatibility: { requires: [], conflicts: [] }, specs: { cores: "6-core", clock: "2.6GHz", explain: "Efficient processor for basic tasks." }, appearance: { material: "matte-carbon", accent: "--accent-warm" } },
  { id: "cpu-stride", group: "cpu", title: "Stride CPU", tier: "stride", price: 250, weight_g: 18, power_w: 5.5, compatibility: { requires: [], conflicts: [] }, specs: { cores: "8-core", clock: "3.1GHz", explain: "Balanced performance for multitasking." }, appearance: { material: "matte-carbon", accent: "--accent-warm" } },
  { id: "cpu-atlas", group: "cpu", title: "Atlas CPU", tier: "atlas", price: 400, weight_g: 22, power_w: 7, compatibility: { requires: [], conflicts: [] }, specs: { cores: "10-core", clock: "3.5GHz", explain: "Desktop-class computing power." }, appearance: { material: "matte-carbon", accent: "--accent-warm" } },
  // RAM
  { id: "ram-8gb", group: "ram", title: "8GB RAM", tier: "8gb", price: 100, weight_g: 2, power_w: 0.5, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "8GB", type: "LPDDR4", explain: "Basic RAM for smooth app performance." }, appearance: { material: "standard-chip", accent: "--accent-warm" } },
  { id: "ram-16gb", group: "ram", title: "16GB RAM", tier: "16gb", price: 200, weight_g: 3, power_w: 0.7, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "16GB", type: "LPDDR5", explain: "Enhanced RAM for heavy multitasking." }, appearance: { material: "standard-chip", accent: "--accent-warm" } },
  { id: "ram-32gb", group: "ram", title: "32GB RAM", tier: "32gb", price: 350, weight_g: 4, power_w: 1, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "32GB", type: "LPDDR5X", explain: "Premium RAM for pro workflows." }, appearance: { material: "standard-chip", accent: "--accent-warm" } },
  // Thermal
  { id: "thermal-passive", group: "thermal", title: "Passive Thermal", tier: "passive", price: 50, weight_g: 20, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { method: "graphite pads", cooling: "passive", explain: "Basic heat dissipation for light use." }, appearance: { material: "graphite-sheet", accent: "--metal-cold" } },
  { id: "thermal-vapor", group: "thermal", title: "Vapor Chamber", tier: "vapor", price: 150, weight_g: 25, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { method: "chamber", cooling: "advanced", explain: "Efficient cooling for high-performance modules." }, appearance: { material: "metallic-vapor", accent: "--metal-cold" } },
  { id: "thermal-active", group: "thermal", title: "Active Microfan", tier: "active", price: 250, weight_g: 30, power_w: 1, compatibility: { requires: ["battery-ever"], conflicts: [] }, specs: { method: "vapor + fan", cooling: "active", explain: "Best cooling for extreme demands." }, appearance: { material: "fan-unit", accent: "--metal-cold" } },
  // Battery Stack
  { id: "battery-dawn", group: "battery", title: "Dawn Battery", tier: "dawn", price: 100, weight_g: 80, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "3000 mAh", runtime: "12h", explain: "Lightweight basic battery for casual use." }, appearance: { material: "standard-pack", accent: "--accent-warm" } },
  { id: "battery-ever", group: "battery", title: "Ever Battery", tier: "ever", price: 200, weight_g: 120, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "4000 mAh", runtime: "18h", explain: "Standard capacity for balanced endurance." }, appearance: { material: "standard-pack", accent: "--accent-warm" } },
  { id: "battery-cobalt", group: "battery", title: "Cobalt Battery", tier: "cobalt", price: 300, weight_g: 160, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "5000 mAh", runtime: "24h", explain: "High-capacity battery for extended use." }, appearance: { material: "standard-pack", accent: "--accent-warm" } },
  // Camera Stack
  { id: "camera-focus", group: "camera", title: "Focus Camera", tier: "focus", price: 150, weight_g: 15, power_w: 0.5, compatibility: { requires: [], conflicts: [] }, specs: { sensor: "12MP", lens: "wide 24mm", explain: "Basic camera for everyday photography." }, appearance: { material: "standard-lens", accent: "--accent-warm" } },
  { id: "camera-voyage", group: "camera", title: "Voyage Camera", tier: "voyage", price: 250, weight_g: 20, power_w: 0.8, compatibility: { requires: [], conflicts: [] }, specs: { sensor: "32MP dual", lens: "wide + ultrawide", explain: "Advanced dual-lens setup for versatile capture." }, appearance: { material: "standard-lens", accent: "--accent-warm" } },
  { id: "camera-nocturne", group: "camera", title: "Nocturne Camera", tier: "nocturne", price: 350, weight_g: 25, power_w: 1.2, compatibility: { requires: ["npu-arc"], conflicts: [] }, specs: { sensor: "64MP", lens: "low-light optimized", explain: "High-resolution low-light sensor for night photography." }, appearance: { material: "standard-lens", accent: "--accent-warm" } },
  // Display
  { id: "display-oled90", group: "display", title: "OLED 90Hz", tier: "oled90", price: 300, weight_g: 10, power_w: 2, compatibility: { requires: [], conflicts: [] }, specs: { type: "OLED", refresh: "90Hz", resolution: "1200x2688", explain: "Smooth OLED display for vibrant visuals." }, appearance: { material: "oled-panel", accent: "--accent-warm" } },
  { id: "display-oled120", group: "display", title: "OLED 120Hz", tier: "oled120", price: 400, weight_g: 12, power_w: 2.5, compatibility: { requires: [], conflicts: [] }, specs: { type: "OLED", refresh: "120Hz", resolution: "1216x2688", explain: "Premium high-refresh OLED display." }, appearance: { material: "oled-panel", accent: "--accent-warm" } },
  { id: "display-microled", group: "display", title: "Micro-LED", tier: "microled", price: 600, weight_g: 15, power_w: 3, compatibility: { requires: ["cpu-stride"], conflicts: [] }, specs: { type: "Micro-LED", refresh: "120Hz", resolution: "1280x2824", explain: "Ultimate display with perfect blacks and brightness." }, appearance: { material: "microled-panel", accent: "--accent-warm" } },
  // Frame
  { id: "frame-anodized", group: "frame", title: "Anodized Aluminum", tier: "anodized", price: 100, weight_g: 50, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { material: "aluminum", finish: "anodized", explain: "Lightweight durable frame." }, appearance: { material: "aluminum-shell", accent: "--metal-cold" } },
  { id: "frame-titanium", group: "frame", title: "Polished Titanium", tier: "titanium", price: 300, weight_g: 70, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { material: "titanium", finish: "polished", explain: "Premium lightweight titanium frame." }, appearance: { material: "titanium-shell", accent: "--metal-cold" } },
  { id: "frame-walnut", group: "frame", title: "Walnut Veneer", tier: "walnut", price: 250, weight_g: 80, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { material: "wood", finish: "veneer", explain: "Warm natural walnut wood aesthetic." }, appearance: { material: "velvet-backed", accent: "--accent-warm" } }
];

document.addEventListener('DOMContentLoaded', initApp);

// Overlay logic
function initOverlay() {
  const overlay = document.getElementById('module-overlay');
  const closeBtn = document.querySelector('.overlay-close');
  const buildBtn = document.querySelector('.build-btn');
  const familyTabs = document.querySelectorAll('.family-tab');
  const moduleGrid = document.querySelector('.module-grid');
  const confirmBtn = document.getElementById('confirm-install');
  let selectedModule = null;
  let selectedModules = {}; // group -> moduleId
  let totalPrice = 0;

  buildBtn.addEventListener('click', () => showOverlay('npu'));

  closeBtn.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
  });

  familyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const family = tab.dataset.family;
      setActiveTab(family);
      populateModules(family);
    });
  });

  function showOverlay(family) {
    selectedModule = null;
    document.getElementById('selected-module').textContent = 'none';
    confirmBtn.disabled = true;
    setActiveTab(family);
    populateModules(family);
    updateTotalPrice();
    overlay.style.display = 'flex';
  }

  function closeOverlay() {
    overlay.style.display = 'none';
    selectedModule = null;
  }

  function setActiveTab(family) {
    familyTabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-family="${family}"]`).classList.add('active');
  }

  function populateModules(family) {
    const filtered = modulesData.filter(m => m.group === family);
    moduleGrid.innerHTML = filtered.map(createModuleCard).join('');

    // Add selection events
    moduleGrid.querySelectorAll('.module-selector-card').forEach(card => {
      card.addEventListener('click', () => {
        const modId = card.dataset.id;
        const module = modulesData.find(m => m.id === modId);
        selectedModule = module;
        document.getElementById('selected-module').textContent = module.title;
        confirmBtn.disabled = false;

        // Visual selection
        moduleGrid.querySelectorAll('.module-selector-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });
  }

  function createModuleCard(module) {
    const svg = familySvgs(module.group);
    const isSelected = selectedModules[module.group] === module.id;
    return `
      <div class="module-selector-card${isSelected ? ' selected' : ''}" data-id="${module.id}">
        <div class="module-thumbnail">
          ${svg}
        </div>
        <h3>${module.title}</h3>
        <p>${module.specs.peak_ops || module.specs.capacity || module.specs.sensor || module.specs.cores || module.specs.material} - $${module.price}</p>
      </div>
    `;
  }

  function familySvgs(group) {
    switch(group) {
      case 'npu': return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><circle cx="40" cy="40" r="25" fill="#C77A4A"/><path d="M25 30 Q40 25 55 30" stroke="#333" stroke-width="3"/><circle cx="30" cy="35" r="3"/><circle cx="50" cy="35" r="3"/></svg>`;
      case 'cpu': return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect x="20" y="20" width="40" height="40" fill="#C77A4A"/><rect x="30" y="30" width="20" height="20" fill="#333"/><path d="M10 40 H70 M40 10 V70" stroke="#333" stroke-width="2"/></svg>`;
      case 'ram': return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect x="20" y="25" width="40" height="30" fill="#C77A4A"/><rect x="25" y="20" width="30" height="3" fill="#333"/><rect x="22" y="32" width="36" height="2" fill="#333"/><rect x="22" y="36" width="36" height="2" fill="#333"/><rect x="22" y="40" width="36" height="2" fill="#333"/><rect x="22" y="44" width="36" height="2" fill="#333"/><rect x="22" y="48" width="36" height="2" fill="#333"/></svg>`;
      case 'thermal': return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect x="15" y="20" width="50" height="40" fill="#C77A4A"/><circle cx="22" cy="35" r="5" fill="#333"/><circle cx="40" cy="35" r="5" fill="#333"/><circle cx="58" cy="35" r="5" fill="#333"/></svg>`;
      case 'battery': return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect x="20" y="25" width="40" height="30" fill="#C77A4A"/><rect x="25" y="20" width="30" height="3" fill="#333"/><rect x="15" y="30" width="3" height="15" fill="#333"/><rect x="62" y="30" width="3" height="15" fill="#333"/></svg>`;
      case 'camera': return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="#C77A4A"/><circle cx="40" cy="40" r="15" fill="#333"/><circle cx="40" cy="40" r="10" fill="#C77A4A"/><path d="M35 25 Q40 20 45 25" stroke="#333" stroke-width="2"/></svg>`;
      case 'display': return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect x="20" y="25" width="40" height="30" fill="#C77A4A"/><circle cx="22" cy="30" r="2" fill="#333"/><circle cx="30" cy="30" r="2" fill="#333"/><circle cx="50" cy="30" r="2" fill="#333"/><circle cx="58" cy="30" r="2" fill="#333"/></svg>`;
      case 'frame': return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect x="20" y="20" width="40" height="40" fill="#C77A4A"/><rect x="25" y="25" width="30" height="30" fill="none" stroke="#333" stroke-width="3"/><path d="M0 40 Q20 20 40 20 Q60 20 80 40 Q80 60 40 60 Q20 60 0 40"/></svg>`;
      default: return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="#FF0000"/></svg>`;
    }
  }

  function updateTotalPrice() {
    totalPrice = Object.values(selectedModules).reduce((sum, modId) => {
      const mod = modulesData.find(m => m.id === modId);
      return sum + (mod ? mod.price : 0);
    }, 0);
    document.getElementById('total-price').textContent = totalPrice;
  }

  confirmBtn.addEventListener('click', () => {
    if (selectedModule) {
      if (totalPrice + selectedModule.price > 1600) {
        alert('Total price would exceed $1600 budget. Please deselect some components first.');
        return;
      }
      selectedModules[selectedModule.group] = selectedModule.id;
      alert(`Installed: ${selectedModule.title}`);
      updateTotalPrice();
      closeOverlay();
    }
  });
}

function initApp() {
  initOverlay();
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

  // Set video playback rate to 1.75x - since autoplay needs mute
  const video = document.getElementById('video');
  if (video) {
    video.playbackRate = 2;
  }



  // Footer visibility on scroll to bottom
  const footer = document.querySelector('.page-footer');
  if (footer) {
    footer.style.opacity = '0';
    footer.style.transition = 'opacity 0.3s ease';
    function updateFooterVisibility() {
      if (window.scrollY > 10) {
        footer.style.opacity = '1';
      } else {
        footer.style.opacity = '0';
      }
    }
    window.addEventListener('scroll', updateFooterVisibility);
    updateFooterVisibility(); // Check on load
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
