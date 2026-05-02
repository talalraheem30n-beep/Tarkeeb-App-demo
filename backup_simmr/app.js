/* ═══════════════════════════════════════════
   SIMMR v2.0 — Application Logic
   ═══════════════════════════════════════════ */

(() => {
  'use strict';

  // ─── Elements ───
  const $ = (s) => document.querySelector(s);
  const screens = {
    portal: $('#inputPortal'),
    scan:   $('#activeScan'),
    result: $('#resultDashboard'),
  };

  // Portal
  const urlInput       = $('#urlInput');
  const platformBadges = $('#platformBadges');
  const btnParse       = $('#btnParseLink');
  const dropzone       = $('#dropzone');
  const fileInput      = $('#fileInput');
  const browseBtn      = $('#browseBtn');
  const dropzoneInner  = $('#dropzoneInner');
  const dropzonePreview = $('#dropzonePreview');
  const previewImg     = $('#previewImg');
  const previewRemove  = $('#previewRemove');
  const btnDecode      = $('#btnDecodeScreenshot');

  // Scan
  const scanImage      = $('#scanImage');
  const scanProgressBar = $('#scanProgressBar');
  const terminalBody   = $('#terminalBody');

  // Result
  const tableBody      = $('#tableBody');
  const btnNewScan     = $('#btnNewScan');
  const fabToggle      = $('#fabToggle');
  const fabOptions     = $('#fabOptions');

  let uploadedFile = null;

  // ─── Demo Data ───
  const DEMO_SCREENSHOT = 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="520" viewBox="0 0 320 520">
      <rect width="320" height="520" rx="8" fill="#1e293b"/>
      <rect x="16" y="16" width="288" height="48" rx="4" fill="#334155"/>
      <text x="160" y="46" fill="#f8fafc" font-family="sans-serif" font-size="14" text-anchor="middle" font-weight="600">📱 Recipe Screenshot</text>
      <rect x="16" y="80" width="288" height="200" rx="4" fill="#0f172a"/>
      <text x="160" y="160" fill="#94a3b8" font-family="sans-serif" font-size="11" text-anchor="middle">Chicken Tikka Masala</text>
      <text x="160" y="180" fill="#64748b" font-family="sans-serif" font-size="10" text-anchor="middle">@chef_recipes • 2.4M views</text>
      <rect x="16" y="296" width="288" height="1" fill="#334155"/>
      <text x="28" y="326" fill="#f8fafc" font-family="sans-serif" font-size="11" font-weight="600">Ingredients:</text>
      <text x="28" y="350" fill="#94a3b8" font-family="sans-serif" font-size="10">• 500g Chicken Breast</text>
      <text x="28" y="370" fill="#94a3b8" font-family="sans-serif" font-size="10">• 1 cup Yogurt</text>
      <text x="28" y="390" fill="#94a3b8" font-family="sans-serif" font-size="10">• 2 tbsp Garam Masala</text>
      <text x="28" y="410" fill="#94a3b8" font-family="sans-serif" font-size="10">• 1 can Tomato Paste</text>
      <text x="28" y="430" fill="#94a3b8" font-family="sans-serif" font-size="10">• 1 tbsp Olive Oil</text>
      <text x="28" y="450" fill="#94a3b8" font-family="sans-serif" font-size="10">• 3 cloves Garlic</text>
      <text x="28" y="470" fill="#94a3b8" font-family="sans-serif" font-size="10">• 1 tsp Cumin Powder</text>
      <text x="28" y="490" fill="#94a3b8" font-family="sans-serif" font-size="10">• Salt & Pepper to taste</text>
    </svg>
  `);

  const RECIPE = {
    name: 'Chicken Tikka Masala',
    ingredients: [
      { name: 'Chicken Breast',  qty: '500g',   libId: 'ID_MEAT_014',  status: 'in-stock' },
      { name: 'Plain Yogurt',    qty: '1 cup',   libId: 'ID_DAIRY_027', status: 'in-stock' },
      { name: 'Garam Masala',    qty: '2 tbsp',  libId: 'ID_SPICE_092', status: 'low-stock' },
      { name: 'Tomato Paste',    qty: '1 can',   libId: 'ID_CAN_008',   status: 'in-stock' },
      { name: 'Olive Oil',       qty: '1 tbsp',  libId: 'ID_OIL_003',   status: 'in-stock' },
      { name: 'Garlic Cloves',   qty: '3 pcs',   libId: 'ID_VEG_041',   status: 'in-stock' },
      { name: 'Cumin Powder',    qty: '1 tsp',   libId: 'ID_SPICE_031', status: 'out' },
      { name: 'Salt',            qty: 'to taste', libId: 'ID_BASIC_001', status: 'in-stock' },
      { name: 'Black Pepper',    qty: 'to taste', libId: 'ID_SPICE_002', status: 'low-stock' },
      { name: 'Heavy Cream',     qty: '½ cup',   libId: 'ID_DAIRY_012', status: 'out' },
      { name: 'Onion',           qty: '1 large',  libId: 'ID_VEG_005',   status: 'in-stock' },
      { name: 'Fresh Cilantro',  qty: '2 tbsp',  libId: 'ID_HERB_017',  status: 'low-stock' },
    ],
  };

  const TERMINAL_LINES = [
    { tag: 'SYS', text: 'Initializing Dual Engine v2.0…' },
    { tag: 'SYS', text: 'OCR module loaded — Tesseract WASM ready' },
    { tag: 'SYS', text: 'Ingredient Library connected — 14,892 entries' },
    { tag: 'OCR', text: 'Scanning image region [0,0 → 320,520]…' },
    { tag: 'OCR', text: 'Text detected: "Chicken Tikka Masala"' },
    { tag: 'OCR', text: 'Text detected: "500g Chicken Breast"' },
    { tag: 'LIB', text: 'Matching → Library: ID_MEAT_014 (Chicken Breast)' },
    { tag: 'INV', text: 'Pantry Status: In Stock ✓' },
    { tag: 'OCR', text: 'Text detected: "1 cup Yogurt"' },
    { tag: 'LIB', text: 'Matching → Library: ID_DAIRY_027 (Plain Yogurt)' },
    { tag: 'INV', text: 'Pantry Status: In Stock ✓' },
    { tag: 'OCR', text: 'Text detected: "2 tbsp Garam Masala"' },
    { tag: 'LIB', text: 'Matching → Library: ID_SPICE_092 (Garam Masala)' },
    { tag: 'INV', text: 'Pantry Status: Low Stock ⚠ (Order Recommended)' },
    { tag: 'OCR', text: 'Text detected: "1 can Tomato Paste"' },
    { tag: 'LIB', text: 'Matching → Library: ID_CAN_008 (Tomato Paste)' },
    { tag: 'INV', text: 'Pantry Status: In Stock ✓' },
    { tag: 'OCR', text: 'Text detected: "1 tbsp Olive Oil"' },
    { tag: 'OCR', text: 'Text detected: "3 cloves Garlic"' },
    { tag: 'OCR', text: 'Text detected: "1 tsp Cumin Powder"' },
    { tag: 'LIB', text: 'Matching → Library: ID_SPICE_031 (Cumin Powder)' },
    { tag: 'INV', text: 'Pantry Status: Out of Stock ✗ — Add to Cart' },
    { tag: 'OCR', text: 'Text detected: "Salt & Pepper to taste"' },
    { tag: 'OCR', text: 'Text detected: "½ cup Heavy Cream"' },
    { tag: 'LIB', text: 'Matching → Library: ID_DAIRY_012 (Heavy Cream)' },
    { tag: 'INV', text: 'Pantry Status: Out of Stock ✗ — Add to Cart' },
    { tag: 'OCR', text: 'Text detected: "1 large Onion"' },
    { tag: 'OCR', text: 'Text detected: "2 tbsp Fresh Cilantro"' },
    { tag: 'LIB', text: 'Matching → Library: ID_HERB_017 (Fresh Cilantro)' },
    { tag: 'INV', text: 'Pantry Status: Low Stock ⚠' },
    { tag: 'SYS', text: 'Extraction complete — 12 ingredients mapped' },
    { tag: 'SYS', text: 'Generating Actionable Inventory Interface…' },
  ];

  // ─── Screen Switching ───
  function showScreen(key) {
    Object.values(screens).forEach((s) => s.classList.remove('active'));
    screens[key].classList.add('active');
  }

  // ─── Platform Auto-Detect ───
  urlInput.addEventListener('input', () => {
    const v = urlInput.value.toLowerCase();
    document.querySelectorAll('.badge').forEach((b) => {
      const p = b.dataset.platform;
      const match =
        (p === 'instagram' && v.includes('instagram.com')) ||
        (p === 'tiktok' && (v.includes('tiktok.com') || v.includes('vm.tiktok'))) ||
        (p === 'youtube' && (v.includes('youtube.com') || v.includes('youtu.be')));
      b.classList.toggle('badge-active', match);
      b.classList.toggle('badge-inactive', !match);
    });
  });

  // ─── Parse Link ───
  btnParse.addEventListener('click', () => {
    if (!urlInput.value.trim()) {
      urlInput.focus();
      return;
    }
    startScan(DEMO_SCREENSHOT);
  });

  // ─── File Upload / Drop ───
  browseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInput.click();
  });
  dropzone.addEventListener('click', (e) => {
    if (e.target === browseBtn) return;
    if (!uploadedFile) fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) handleFile(fileInput.files[0]);
  });

  dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });

  function handleFile(file) {
    if (!file.type.startsWith('image/')) return;
    uploadedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      dropzoneInner.style.display = 'none';
      dropzonePreview.style.display = 'flex';
      btnDecode.disabled = false;
    };
    reader.readAsDataURL(file);
  }

  previewRemove.addEventListener('click', (e) => {
    e.stopPropagation();
    uploadedFile = null;
    fileInput.value = '';
    previewImg.src = '';
    dropzoneInner.style.display = 'flex';
    dropzonePreview.style.display = 'none';
    btnDecode.disabled = true;
  });

  btnDecode.addEventListener('click', () => {
    if (!uploadedFile) return;
    startScan(previewImg.src);
  });

  // ─── Scan Flow ───
  function startScan(imageSrc) {
    scanImage.src = imageSrc || DEMO_SCREENSHOT;
    terminalBody.innerHTML = '';
    scanProgressBar.style.width = '0%';
    showScreen('scan');

    let idx = 0;
    const total = TERMINAL_LINES.length;
    const interval = setInterval(() => {
      if (idx >= total) {
        clearInterval(interval);
        scanProgressBar.style.width = '100%';
        setTimeout(() => showResult(), 600);
        return;
      }
      const line = TERMINAL_LINES[idx];
      appendTerminalLine(line.tag, line.text);
      idx++;
      scanProgressBar.style.width = `${Math.round((idx / total) * 100)}%`;
    }, 180);
  }

  function appendTerminalLine(tag, text) {
    const el = document.createElement('div');
    el.className = 't-line';
    el.innerHTML = `<span class="t-tag ${tag.toLowerCase()}">[${tag}]</span>${escHtml(text)}`;
    terminalBody.appendChild(el);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ─── Result Dashboard ───
  function showResult() {
    showScreen('result');
    $('#recipeName').textContent = RECIPE.name;

    const counts = { total: 0, inStock: 0, buy: 0, low: 0 };
    tableBody.innerHTML = '';

    RECIPE.ingredients.forEach((item, i) => {
      counts.total++;
      if (item.status === 'in-stock') counts.inStock++;
      else if (item.status === 'out') counts.buy++;
      else if (item.status === 'low-stock') counts.low++;

      const row = document.createElement('div');
      row.className = 'table-row';
      row.style.animationDelay = `${i * 60}ms`;
      row.style.animation = 'termLineIn 0.3s ease forwards';
      row.style.opacity = '0';

      const statusLabel = {
        'in-stock': 'In Stock',
        'low-stock': 'Low Stock',
        'out': 'Out of Stock',
      }[item.status];

      const actionHtml = item.status === 'out'
        ? `<button class="btn-buy" data-item="${escHtml(item.name)}">BUY NOW</button>`
        : item.status === 'low-stock'
          ? `<button class="btn-buy" data-item="${escHtml(item.name)}">BUY NOW</button>`
          : `<span class="btn-stocked">—</span>`;

      row.innerHTML = `
        <span class="ingredient-name">${escHtml(item.name)}</span>
        <span class="ingredient-qty">${escHtml(item.qty)}</span>
        <span class="lib-match">${escHtml(item.libId)}</span>
        <span><span class="status-badge ${item.status}">${statusLabel}</span></span>
        <span>${actionHtml}</span>
      `;
      tableBody.appendChild(row);
    });

    // Animate counters
    animateCounter($('#statTotal'), counts.total);
    animateCounter($('#statInStock'), counts.inStock);
    animateCounter($('#statBuy'), counts.buy);
    animateCounter($('#statLow'), counts.low);

    // Buy buttons
    tableBody.querySelectorAll('.btn-buy').forEach((btn) => {
      btn.addEventListener('click', () => {
        showToast(`"${btn.dataset.item}" added to cart`);
        btn.textContent = 'ADDED';
        btn.disabled = true;
        btn.style.background = 'var(--accent-green)';
      });
    });
  }

  function animateCounter(el, target) {
    let current = 0;
    const step = Math.max(1, Math.floor(target / 12));
    const iv = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(iv); }
      el.textContent = current;
    }, 50);
  }

  // ─── New Scan ───
  btnNewScan.addEventListener('click', () => {
    urlInput.value = '';
    uploadedFile = null;
    fileInput.value = '';
    previewImg.src = '';
    dropzoneInner.style.display = 'flex';
    dropzonePreview.style.display = 'none';
    btnDecode.disabled = true;
    document.querySelectorAll('.badge').forEach((b) => {
      b.classList.add('badge-inactive');
      b.classList.remove('badge-active');
    });
    fabOptions.classList.remove('show');
    fabToggle.classList.remove('open');
    showScreen('portal');
  });

  // ─── FAB ───
  fabToggle.addEventListener('click', () => {
    fabToggle.classList.toggle('open');
    fabOptions.classList.toggle('show');
  });

  $('#fabPdf').addEventListener('click', () => {
    showToast('PDF export initiated — download will begin shortly');
    fabOptions.classList.remove('show');
    fabToggle.classList.remove('open');
  });

  $('#fabWhatsapp').addEventListener('click', () => {
    showToast('WhatsApp Shop link generated');
    fabOptions.classList.remove('show');
    fabToggle.classList.remove('open');
  });

  // ─── Toast ───
  function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }

})();
