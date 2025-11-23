// Main JS for Ark Modular - full builder page
// Pure JS, no libraries; focuses on module selection, assembly
// Same data & logic as modal, but full page

  // Phone sizes data
const phoneSizes = [
  { id: "size-compact", title: "Compact", price_add: 0, explain: "Smaller screen (5.5\") for one-handed use, basic performance." },
  { id: "size-standard", title: "Standard", price_add: 100, explain: "Standard size (6.1\") for most users, balanced features." },
  { id: "size-large", title: "Large", price_add: 200, explain: "Larger screen (6.7\") for media and productivity, enables high-power combos." }
];

  // Module data (local storage) - prices adjusted for 450-1800 total
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

document.addEventListener('DOMContentLoaded', initBuilder);

// Builder logic
function initBuilder() {
  let selectedModules = {}; // group -> moduleId
  let totalPrice = 0;
  let selectedSize = 'size-standard';
  let isRefurbished = false;

  // Set video playback rate
  const video = document.getElementById('video');
  if (video) {
    video.playbackRate = 2;
  }

  // Add size selector section
  const sizeSection = document.createElement('div');
  sizeSection.id = 'size-selector';
  sizeSection.innerHTML = `
    <h2>choose your size</h2>
    <div class="size-selector-grid"></div>
  `;
  const upgradesList = document.getElementById('upgrades-list');
  upgradesList.insertBefore(sizeSection, upgradesList.firstElementChild);

  // Populate size selector
  populateSizeSelector();

  function populateSizeSelector() {
    const grid = document.querySelector('.size-selector-grid');
    grid.innerHTML = phoneSizes.map(createSizeCard).join('');

    // Add selection events
    grid.querySelectorAll('.size-selector-card').forEach(card => {
      card.addEventListener('click', () => {
        const sizeId = card.dataset.id;
        // Deselect previous
        grid.querySelectorAll('.size-selector-card').forEach(c => c.classList.remove('selected'));
        // Select new
        card.classList.add('selected');
        selectedSize = sizeId;
        updateTotalPrice();
      });
    });
  }

  function createSizeCard(size) {
    const isSelected = selectedSize === size.id;
    return `
      <div class="size-selector-card${isSelected ? ' selected' : ''}" data-id="${size.id}">
        <h3>${size.title}</h3>
        <p>+$${size.price_add}</p>
        <p class="explain">${size.explain}</p>
      </div>
    `;
  }

  // Populate all categories
  const categories = document.querySelectorAll('.module-category');
  categories.forEach(category => {
    const family = category.dataset.family;
    const grid = category.querySelector('.module-grid');
    populateCategory(family, grid);
  });

  // Refurbished toggle
  document.getElementById('refurbished-toggle').addEventListener('change', (e) => {
    isRefurbished = e.target.checked;
    // Repopulate cards with new prices
    categories.forEach(category => {
      const family = category.dataset.family;
      const grid = category.querySelector('.module-grid');
      populateCategory(family, grid);
    });
    populateSizeSelector();
    updateTotalPrice();
  });

  function populateCategory(family, grid) {
    const filtered = modulesData.filter(m => m.group === family);
    grid.innerHTML = filtered.map(createModuleCard).join('');

    // Add selection events
    grid.querySelectorAll('.upgrade-card').forEach(card => {
      card.addEventListener('click', () => {
        const modId = card.dataset.id;
        const module = modulesData.find(m => m.id === modId);
        // Deselect previous
        grid.querySelectorAll('.upgrade-card').forEach(c => c.classList.remove('selected'));
        // Select new
        card.classList.add('selected');
        selectedModules[module.group] = module.id;
        updateTotalPrice();
      });
    });
  }

  function createModuleCard(module) {
    const imgSrc = getModuleImage(module.group, module.tier);
    const isSelected = selectedModules[module.group] === module.id;
    const displayPrice = Math.round(module.price * (isRefurbished ? 0.5 : 1));
    return `
      <div class="upgrade-card${isSelected ? ' selected' : ''}" data-id="${module.id}">
        <div class="module-thumbnail">
          <img src="${imgSrc}" alt="${module.title}">
        </div>
        <h3>${module.title}${isRefurbished ? ' (Refurbished)' : ''}</h3>
        <p class="specs">${module.specs.peak_ops || module.specs.capacity || module.specs.sensor || module.specs.cores || module.specs.material}</p>
        <p class="explain">${module.specs.explain}</p>
        <p class="price">$${displayPrice}</p>
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
    totalPrice = (Object.values(selectedModules).reduce((sum, modId) => {
      const mod = modulesData.find(m => m.id === modId);
      return sum + (mod ? mod.price : 0);
    }, 0) + (selectedSize ? phoneSizes.find(s => s.id === selectedSize).price_add : 100)) * (isRefurbished ? 0.5 : 1);
    document.getElementById('total-price').textContent = Math.round(totalPrice);

    updateSizeCompatibility();

    // Show or update deploy section when all selected
    const allSelected = Object.keys(selectedModules).length === 8;
    const deploySection = document.getElementById('deploy-section');
    if (allSelected) {
      if (!deploySection) {
        showDeploySummary();
      } else {
        // Update existing summary
        const sizeTitle = phoneSizes.find(s => s.id === selectedSize).title;
        const summaryList = deploySection.querySelector('ul');
        summaryList.innerHTML = Object.values(selectedModules).map(id => {
          const mod = modulesData.find(m => m.id === id);
          const spec = mod.specs.peak_ops || mod.specs.capacity || mod.specs.material || mod.specs.cores || mod.specs.type || mod.specs.refresh || mod.specs.method || mod.specs.finish || 'selected';
          return `<li>${mod.title}${isRefurbished ? ' (Refurbished)' : ''}: ${spec} - $${Math.round(mod.price * (isRefurbished ? 0.5 : 1))}</li>`;
        }).join('') + `<li>${sizeTitle} size: +$${Math.round(phoneSizes.find(s => s.id === selectedSize).price_add * (isRefurbished ? 0.5 : 1))}</li>`;
        const finalPriceEl = deploySection.querySelector('.final-price');
        finalPriceEl.textContent = `price: $${totalPrice}`;
      }
    } else if (deploySection && !allSelected) {
      deploySection.remove();
    }
  }

  function updateSizeCompatibility() {
    const largeBtn = document.querySelector('[data-id="size-large"]');
    if (largeBtn) {
      largeBtn.style.opacity = 1;
      largeBtn.style.pointerEvents = 'auto';
    }
  }

  function showDeploySummary() {
    const main = document.querySelector('main');
    const summary = document.createElement('section');
    summary.id = 'deploy-section';
    const factor = isRefurbished ? 0.5 : 1;
    const sizeTitle = phoneSizes.find(s => s.id === selectedSize).title;
    const note = '';
    summary.innerHTML = `
      <h2>your ark is ready for deployment</h2>
      <p class="final-price">price: $${totalPrice}</p>
      ${note}
      <div class="build-summary">
        <ul>
          ${Object.values(selectedModules).map(id => {
            const mod = modulesData.find(m => m.id === id);
            const spec = mod.specs.peak_ops || mod.specs.capacity || mod.specs.material || mod.specs.cores || mod.specs.type || mod.specs.refresh || mod.specs.method || mod.specs.finish || 'selected';
            return `<li>${mod.title}${isRefurbished ? ' (Refurbished)' : ''}: ${spec} - $${Math.round(mod.price * factor)}</li>`;
          }).join('')}<li>${sizeTitle} size: +$${Math.round(phoneSizes.find(s => s.id === selectedSize).price_add * factor)}</li>
        </ul>
      </div>
      <div class="deploy-actions">
        <button id="deploy-btn">deploy and purchase</button>
      </div>
    `;
    main.appendChild(summary);

    document.getElementById('deploy-btn').addEventListener('click', () => {
      alert(`Purchased for $${totalPrice}!`);
    });
  }
}
