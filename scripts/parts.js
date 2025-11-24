// Upgrades page JS - similar to builder but for purchasing spare parts
// No compatibly checks, just add to cart

  // Module data - reuse from builder
const modulesData = [
  // Neural Compute
  { id: "npu-muse", group: "npu", title: "Muse NPU", tier: "muse", price: 100, weight_g: 8, power_w: 2.5, compatibility: { requires: [], conflicts: [] }, specs: { peak_ops: "4 TOPS", local_ai: "basic local inference", explain: "Great for basic AI tasks like voice assistant." }, appearance: { material: "matte-carbon", accent: "--accent-violet" } },
  { id: "npu-arc", group: "npu", title: "Arc NPU", tier: "arc", price: 150, weight_g: 10, power_w: 3.2, compatibility: { requires: [], conflicts: [] }, specs: { peak_ops: "8 TOPS", local_ai: "balanced local inference", explain: "Ideal for AI-driven apps and photo enhancement." }, appearance: { material: "matte-carbon", accent: "--accent-violet" } },
  { id: "npu-apollo", group: "npu", title: "Apollo NPU", tier: "apollo", price: 220, weight_g: 12, power_w: 3.6, compatibility: { requires: [], conflicts: ["thermal-passive"] }, specs: { peak_ops: "12 TOPS", local_ai: "advanced local inference", explain: "Designed for real-time AI processing and gaming." }, appearance: { material: "matte-carbon", accent: "--accent-violet" } },
  // CPU/GPU
  { id: "cpu-petite", group: "cpu", title: "Petite CPU", tier: "petite", price: 80, weight_g: 15, power_w: 4, compatibility: { requires: [], conflicts: [] }, specs: { cores: "6-core", clock: "2.6GHz", explain: "Suitable for light browsing and social media." }, appearance: { material: "matte-carbon", accent: "--accent-warm" } },
  { id: "cpu-stride", group: "cpu", title: "Stride CPU", tier: "stride", price: 150, weight_g: 18, power_w: 5.5, compatibility: { requires: [], conflicts: [] }, specs: { cores: "8-core", clock: "3.1GHz", explain: "Perfect for multitasking and creative work." }, appearance: { material: "matte-carbon", accent: "--accent-warm" } },
  { id: "cpu-atlas", group: "cpu", title: "Atlas CPU", tier: "atlas", price: 300, weight_g: 22, power_w: 7, compatibility: { requires: [], conflicts: [] }, specs: { cores: "10-core", clock: "3.5GHz", explain: "Built for demanding tasks like video editing and gaming." }, appearance: { material: "matte-carbon", accent: "--accent-warm" } },
  // RAM
  { id: "ram-8gb", group: "ram", title: "8GB RAM", tier: "8gb", price: 80, weight_g: 2, power_w: 0.5, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "8GB", type: "LPDDR4", explain: "Enough for smooth everyday app usage." }, appearance: { material: "standard-chip", accent: "--accent-warm" } },
  { id: "ram-16gb", group: "ram", title: "16GB RAM", tier: "16gb", price: 150, weight_g: 3, power_w: 0.7, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "16GB", type: "LPDDR5", explain: "Handles heavy multitasking and background apps." }, appearance: { material: "standard-chip", accent: "--accent-warm" } },
  { id: "ram-32gb", group: "ram", title: "32GB RAM", tier: "32gb", price: 220, weight_g: 4, power_w: 1, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "32GB", type: "LPDDR5X", explain: "Premium RAM for professional productivity." }, appearance: { material: "standard-chip", accent: "--accent-warm" } },
  // Thermal
  { id: "thermal-passive", group: "thermal", title: "Passive Thermal", tier: "passive", price: 50, weight_g: 20, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { method: "graphite pads", cooling: "passive", explain: "Sufficient for basic heat management." }, appearance: { material: "graphite-sheet", accent: "--metal-cold" } },
  { id: "thermal-vapor", group: "thermal", title: "Vapor Chamber", tier: "vapor", price: 100, weight_g: 25, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { method: "chamber", cooling: "advanced", explain: "Optimized for sustained high performance." }, appearance: { material: "metallic-vapor", accent: "--metal-cold" } },
  { id: "thermal-active", group: "thermal", title: "Active Microfan", tier: "active", price: 150, weight_g: 30, power_w: 1, compatibility: { requires: ["battery-ever"], conflicts: [] }, specs: { method: "vapor + fan", cooling: "active", explain: "Max cooling for intense gaming or heavy workloads." }, appearance: { material: "fan-unit", accent: "--metal-cold" } },
  // Battery Stack
  { id: "battery-dawn", group: "battery", title: "Dawn Battery", tier: "dawn", price: 50, weight_g: 80, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "3000 mAh", runtime: "12h", explain: "Designed for quick charges and light use." }, appearance: { material: "standard-pack", accent: "--accent-warm" } },
  { id: "battery-ever", group: "battery", title: "Ever Battery", tier: "ever", price: 100, weight_g: 120, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "4000 mAh", runtime: "18h", explain: "Balanced battery life for daily needs." }, appearance: { material: "standard-pack", accent: "--accent-warm" } },
  { id: "battery-cobalt", group: "battery", title: "Cobalt Battery", tier: "cobalt", price: 200, weight_g: 160, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { capacity: "5000 mAh", runtime: "24h", explain: "Extended battery for power users and travelers." }, appearance: { material: "standard-pack", accent: "--accent-warm" } },
  // Camera Stack
  { id: "camera-focus", group: "camera", title: "Focus Camera", tier: "focus", price: 80, weight_g: 15, power_w: 0.5, compatibility: { requires: [], conflicts: [] }, specs: { sensor: "12MP", lens: "wide 24mm", explain: "Great for social media and family photos." }, appearance: { material: "standard-lens", accent: "--accent-warm" } },
  { id: "camera-voyage", group: "camera", title: "Voyage Camera", tier: "voyage", price: 150, weight_g: 20, power_w: 0.8, compatibility: { requires: [], conflicts: [] }, specs: { sensor: "32MP dual", lens: "wide + ultrawide", explain: "Versatile for travel and landscape photography." }, appearance: { material: "standard-lens", accent: "--accent-warm" } },
  { id: "camera-nocturne", group: "camera", title: "Nocturne Camera", tier: "nocturne", price: 200, weight_g: 25, power_w: 1.2, compatibility: { requires: ["npu-arc"], conflicts: [] }, specs: { sensor: "64MP", lens: "low-light optimized", explain: "Excellent for night shots and professional photography." }, appearance: { material: "standard-lens", accent: "--accent-warm" } },
  // Display
  { id: "display-oled90", group: "display", title: "OLED 90Hz", tier: "oled90", price: 100, weight_g: 10, power_w: 2, compatibility: { requires: [], conflicts: [] }, specs: { type: "OLED", refresh: "90Hz", resolution: "1200x2688", explain: "Vibrant colors for media consumption." }, appearance: { material: "oled-panel", accent: "--accent-warm" } },
  { id: "display-oled120", group: "display", title: "OLED 120Hz", tier: "oled120", price: 150, weight_g: 12, power_w: 2.5, compatibility: { requires: [], conflicts: [] }, specs: { type: "OLED", refresh: "120Hz", resolution: "1216x2688", explain: "Smooth gaming and scrolling experience." }, appearance: { material: "oled-panel", accent: "--accent-warm" } },
  { id: "display-microled", group: "display", title: "Micro-LED", tier: "microled", price: 240, weight_g: 15, power_w: 3, compatibility: { requires: ["cpu-stride"], conflicts: [] }, specs: { type: "Micro-LED", refresh: "120Hz", resolution: "1280x2824", explain: "Top-tier brightness and contrast for creators." }, appearance: { material: "microled-panel", accent: "--accent-warm" } },
  // Frame
  { id: "frame-anodized", group: "frame", title: "Anodized Aluminum", tier: "anodized", price: 50, weight_g: 50, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { material: "aluminum", finish: "anodized", explain: "Durable and lightweight for everyday carry." }, appearance: { material: "aluminum-shell", accent: "--metal-cold" } },
  { id: "frame-titanium", group: "frame", title: "Polished Titanium", tier: "titanium", price: 150, weight_g: 70, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { material: "titanium", finish: "polished", explain: "Premium feel and corrosion resistance." }, appearance: { material: "titanium-shell", accent: "--metal-cold" } },
  { id: "frame-walnut", group: "frame", title: "Walnut Veneer", tier: "walnut", price: 250, weight_g: 80, power_w: 0, compatibility: { requires: [], conflicts: [] }, specs: { material: "wood", finish: "veneer", explain: "Elegant natural wood for a unique look." }, appearance: { material: "velvet-backed", accent: "--accent-warm" } }
];

function getModuleImage(group, tier) {
  const groupToPrefix = {
    'npu': 'npu',
    'cpu': 'cpu',
    'ram': 'ram',
    'thermal': 'c',
    'battery': 'b',
    'camera': 'c',
    'display': 'd',
    'frame': 'd'
  };
  const groupToFolder = {
    'npu': 'npu',
    'cpu': 'CPU',
    'ram': 'ram',
    'thermal': 'cooling',
    'battery': 'battery',
    'camera': 'camera',
    'display': 'display',
    'frame': 'frame'
  };
  const tierMap = {
    'muse':1, 'arc':2, 'apollo':3,
    'petite':1, 'stride':2, 'atlas':3,
    '8gb':1, '16gb':2, '32gb':3,
    'passive':1, 'vapor':2, 'active':3,
    'dawn':1, 'ever':2, 'cobalt':3,
    'focus':1, 'voyage':2, 'nocturne':3,
    'oled90':1, 'oled120':2, 'microled':3,
    'anodized':1, 'titanium':2, 'walnut':3
  };
  const prefix = groupToPrefix[group];
  const folder = groupToFolder[group];
  const num = tierMap[tier];
  return `assets/${folder}/${prefix}${num}.png`;
}

document.addEventListener('DOMContentLoaded', initUpgrades);

// Upgrades logic - shopping cart
function initUpgrades() {
  console.log('initUpgrades called');
  let cartTotal = 0;
  let cartItems = {}; // moduleId -> qty
  let isRefurbished = false;

  // Set video playback rate
  const video = document.getElementById('video');
  if (video) {
    video.playbackRate = 2;
  }

  // Populate all categories
  const categories = document.querySelectorAll('.module-category');
  categories.forEach(category => {
    const family = category.dataset.family;
    const grid = category.querySelector('.module-grid');
    populateCategory(family, grid);
  });

  function populateCategory(family, grid) {
    const filtered = modulesData.filter(m => m.group === family);
    grid.innerHTML = filtered.map(createUpgradeCard).join('');

    // Repopulate to update prices
  }

  // Refurbished toggle
  document.getElementById('refurbished-toggle').addEventListener('change', (e) => {
    isRefurbished = e.target.checked;
    // Repopulate cards with new prices
    categories.forEach(category => {
      const family = category.dataset.family;
      const grid = category.querySelector('.module-grid');
      grid.innerHTML = ''; // clear
      populateCategory(family, grid);
    });
    updateCart();
  });

  function createUpgradeCard(module) {
    const qty = cartItems[module.id] || 0;
    const displayPrice = Math.round(module.price * (isRefurbished ? 0.5 : 1));
    return `
      <div class="upgrade-card" data-module-id="${module.id}">
        <div class="module-thumbnail">
          <img src="${getModuleImage(module.group, module.tier)}" alt="${module.title}">
        </div>
        <h3>${module.title}${isRefurbished ? ' (Refurbished)' : ''}</h3>
        <p class="specs">${module.specs.peak_ops || module.specs.capacity || module.specs.sensor || module.specs.cores || module.specs.material}</p>
        <p class="explain">${module.specs.explain}</p>
        <p class="price">$${displayPrice}</p>
        <div class="qty-controls">
          <button class="qty-btn minus">-</button>
          <span class="qty">${qty}</span>
          <button class="qty-btn plus">+</button>
        </div>
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

  // Global event for all + and - buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('plus') || e.target.classList.contains('minus')) {
      console.log('Button clicked:', e.target.classList.contains('plus') ? 'plus' : 'minus');
      const card = e.target.closest('.upgrade-card');
      const moduleId = card.dataset.moduleId;
      const isPlus = e.target.classList.contains('plus');
      cartItems[moduleId] = (cartItems[moduleId] || 0) + (isPlus ? 1 : -1);
      if (cartItems[moduleId] < 0) cartItems[moduleId] = 0;
      updateCart();
      card.querySelector('.qty').textContent = cartItems[moduleId];
      card.classList.toggle('selected', cartItems[moduleId] > 0);
    }
  });

  function updateCart() {
    cartTotal = Object.entries(cartItems).reduce((sum, [id, qty]) => {
      const mod = modulesData.find(m => m.id === id);
      return sum + (mod.price * qty);
    }, 0) * (isRefurbished ? 0.5 : 1);
    console.log('updateCart called, cartItems:', cartItems, 'cartTotal:', cartTotal);
    const cartEl = document.getElementById('cart-total');
    cartEl.textContent = cartTotal > 0 ? `$${Math.round(cartTotal)}` : '$0';
    cartEl.style.display = 'inline';

    // Show or update purchase section if any items selected
    const anySelected = cartTotal > 0;
    const purchaseSection = document.getElementById('purchase-section');
    if (anySelected) {
      if (!purchaseSection) {
        showPurchaseSummary();
    } else {
      // Update existing summary
      purchaseSection.querySelector('.final-price').textContent = `price: $${Math.round(cartTotal)}`;
      const summaryList = purchaseSection.querySelector('ul');
      summaryList.innerHTML = Object.entries(cartItems).map(([id, qty]) => {
        const mod = modulesData.find(m => m.id === id);
        return qty > 0 ? `<li>${mod.title}${isRefurbished ? ' (Refurbished)' : ''} x${qty} - $${Math.round(mod.price * (isRefurbished ? 0.5 : 1) * qty)}</li>` : '';
      }).filter(l => l).join('');
      }
    } else if (purchaseSection) {
      purchaseSection.remove();
    }
  }

  function showPurchaseSummary() {
    const main = document.querySelector('main');
    const summary = document.createElement('section');
    summary.id = 'purchase-section';
    const factor = isRefurbished ? 0.5 : 1;
    const note = ''
    // note = isRefurbished ? '<p class="refurb-note">...</p>' : '';
    summary.innerHTML = `
      <h2>your upgrades are ready for deployment</h2>
      <p class="final-price">price: $${cartTotal}</p>
      ${note}
      <div class="build-summary">
        <ul>
          ${Object.entries(cartItems).map(([id, qty]) => {
            const mod = modulesData.find(m => m.id === id);
            return qty > 0 ? `<li>${mod.title}${isRefurbished ? ' (Refurbished)' : ''} x${qty} - $${Math.round(mod.price * factor * qty)}</li>` : '';
          }).filter(l => l).join('')}
        </ul>
      </div>
      <div class="deploy-actions" style="margin-left: -50px;">
        <button id="deploy-btn">purchase</button>
      </div>
    `;
    main.appendChild(summary);
    summary.style.marginLeft = '50px';

    document.getElementById('deploy-btn').addEventListener('click', () => {
      alert(`Purchased for $${cartTotal}!`);
    });
  }
}
