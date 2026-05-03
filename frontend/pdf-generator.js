// ─── Tarkeeb PDF Recipe Generator ───
(function() {
  'use strict';

  const getEmoji = (name) => {
    const l = name.toLowerCase();
    if (l.match(/beef|meat|mutton|lamb|gosht|qeema/)) return '🥩';
    if (l.match(/chicken|poultry/)) return '🍗';
    if (l.match(/fish|seafood/)) return '🐟';
    if (l.match(/cheese|paneer|mozzarella/)) return '🧀';
    if (l.includes('tomato')) return '🍅';
    if (l.includes('onion')) return '🧅';
    if (l.match(/garlic|ginger/)) return '🧄';
    if (l.match(/potato|fries|aloo/)) return '🥔';
    if (l.match(/spinach|lettuce|palak|leaves|mint|cilantro/)) return '🥬';
    if (l.match(/bread|bun|pita|dough|naan|roti|tortilla/)) return '🍞';
    if (l.match(/milk|cream|yogurt|buttermilk/)) return '🥛';
    if (l.match(/butter|ghee/)) return '🧈';
    if (l.includes('oil')) return '🫒';
    if (l.match(/flour|cornstarch|rice|wheat|chawal|lentil|daal|chickpea/)) return '🌾';
    if (l.match(/sauce|ketchup|mustard|mayo|paste/)) return '🥫';
    if (l.match(/salt|pepper|spice|cumin|coriander|chili|paprika|masala|turmeric/)) return '🌶️';
    if (l.includes('egg')) return '🥚';
    if (l.includes('water')) return '💧';
    if (l.match(/lemon|lime/)) return '🍋';
    return '🥘';
  };

  const mealCosts = {
    "Chicken Biryani": "Rs 450", "Nihari": "Rs 800", "Haleem": "Rs 500",
    "Chicken Karahi": "Rs 750", "Seekh Kebab": "Rs 600", "Chapli Kebab": "Rs 550",
    "Daal Chawal": "Rs 300", "Aloo Gosht": "Rs 650", "Butter Chicken": "Rs 900",
    "Palak Paneer": "Rs 750", "Zinger Burger": "Rs 850", "Beef Burger": "Rs 950",
    "Shawarma": "Rs 350", "Pepperoni Pizza": "Rs 1200", "French Fries": "Rs 250",
    "Chicken Wings": "Rs 700", "Chicken Nuggets": "Rs 550", "Hot Dog": "Rs 400",
    "Fish and Chips": "Rs 1100", "Loaded Nachos": "Rs 800"
  };

  window.downloadRecipePDF = function(dish) {
    if (!dish) return;

    const logoUrl = window.location.origin + '/logo.png';
    const prepTime = (dish.ingredients.length * 3 + 5) + ' mins';
    const estCost = mealCosts[dish.name] || 'Rs 500';
    const servings = dish.nutrition?.serving?.split(' ')[0] || '1';
    const today = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });

    const ingredientsHtml = dish.ingredients.map(i =>
      '<div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:#f8f8f8;border-radius:8px;font-size:13px;">' +
        '<span style="font-size:18px;">' + getEmoji(i) + '</span>' +
        '<span>' + i + '</span>' +
      '</div>'
    ).join('');

    const stepsHtml = dish.steps.map((s, i) =>
      '<div style="display:flex;gap:12px;margin-bottom:14px;">' +
        '<div style="min-width:28px;height:28px;background:linear-gradient(135deg,#E91E63,#FF5722);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;">' + (i+1) + '</div>' +
        '<div style="font-size:13px;line-height:1.6;padding-top:4px;">' + s + '</div>' +
      '</div>'
    ).join('');

    const heroHtml = dish.image
      ? '<div style="padding:24px 32px 0;"><img src="' + dish.image + '" style="width:100%;height:220px;object-fit:cover;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.1);" crossorigin="anonymous"></div>'
      : '<div style="padding:24px 32px 0;"><div style="width:100%;height:180px;background:linear-gradient(135deg,#E91E63,#FF5722);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:80px;">' + dish.emoji + '</div></div>';

    const html = [
      '<div style="width:210mm;min-height:297mm;font-family:Segoe UI,Arial,sans-serif;color:#1a1a2e;background:#fff;position:relative;overflow:hidden;">',

      // Watermark
      '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.04;z-index:0;pointer-events:none;">',
        '<img src="' + logoUrl + '" style="width:300px;" crossorigin="anonymous">',
      '</div>',

      '<div style="position:relative;z-index:1;">',

      // Header
      '<div style="background:linear-gradient(135deg,#E91E63,#FF5722);padding:24px 32px;display:flex;align-items:center;justify-content:space-between;">',
        '<div style="display:flex;align-items:center;gap:12px;">',
          '<img src="' + logoUrl + '" style="width:40px;height:40px;border-radius:8px;" crossorigin="anonymous">',
          '<div><div style="color:#fff;font-size:22px;font-weight:800;">Tarkeeb</div>',
          '<div style="color:rgba(255,255,255,0.85);font-size:11px;">Recipe Card</div></div>',
        '</div>',
        '<div style="color:rgba(255,255,255,0.8);font-size:11px;text-align:right;">' + today + '</div>',
      '</div>',

      // Hero image
      heroHtml,

      // Title
      '<div style="padding:20px 32px 0;">',
        '<span style="background:#E91E63;color:#fff;padding:3px 10px;border-radius:12px;font-size:10px;font-weight:700;text-transform:uppercase;">' + dish.category + '</span>',
        '<h1 style="font-size:28px;font-weight:800;margin:8px 0 6px;color:#1a1a2e;">' + dish.name + '</h1>',
        '<p style="font-size:13px;color:#666;margin:0;line-height:1.5;">' + dish.description + '</p>',
      '</div>',

      // Stats
      '<div style="padding:16px 32px;display:flex;gap:12px;">',
        '<div style="flex:1;background:#f0f4ff;border-radius:12px;padding:14px;text-align:center;">',
          '<div style="font-size:11px;color:#888;margin-bottom:4px;">⏱️ Total Time</div>',
          '<div style="font-size:16px;font-weight:700;">' + prepTime + '</div></div>',
        '<div style="flex:1;background:#fff0f0;border-radius:12px;padding:14px;text-align:center;">',
          '<div style="font-size:11px;color:#888;margin-bottom:4px;">💰 Est. Cost</div>',
          '<div style="font-size:16px;font-weight:700;">' + estCost + '</div></div>',
        '<div style="flex:1;background:#f0fff4;border-radius:12px;padding:14px;text-align:center;">',
          '<div style="font-size:11px;color:#888;margin-bottom:4px;">🍽️ Servings</div>',
          '<div style="font-size:16px;font-weight:700;">' + servings + '</div></div>',
      '</div>',

      // Ingredients
      '<div style="padding:8px 32px 0;">',
        '<h3 style="font-size:16px;font-weight:800;margin:0 0 12px;">🧂 Ingredients <span style="font-size:12px;color:#888;font-weight:400;">(' + dish.ingredients.length + ' items)</span></h3>',
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' + ingredientsHtml + '</div>',
      '</div>',

      // Steps
      '<div style="padding:20px 32px 0;">',
        '<h3 style="font-size:16px;font-weight:800;margin:0 0 14px;">👨‍🍳 Cooking Instructions</h3>',
        stepsHtml,
      '</div>',

      // Nutrition
      '<div style="padding:16px 32px 0;">',
        '<h3 style="font-size:16px;font-weight:800;margin:0 0 12px;">📊 Nutrition Per Serving</h3>',
        '<div style="display:flex;gap:8px;">',
          '<div style="flex:1;background:#fff8e1;border-radius:10px;padding:12px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#E91E63;">' + dish.nutrition.calories + '</div><div style="font-size:10px;color:#888;">Calories</div></div>',
          '<div style="flex:1;background:#e8f5e9;border-radius:10px;padding:12px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#2e7d32;">' + dish.nutrition.protein + 'g</div><div style="font-size:10px;color:#888;">Protein</div></div>',
          '<div style="flex:1;background:#e3f2fd;border-radius:10px;padding:12px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#1565c0;">' + dish.nutrition.carbs + 'g</div><div style="font-size:10px;color:#888;">Carbs</div></div>',
          '<div style="flex:1;background:#fce4ec;border-radius:10px;padding:12px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#c62828;">' + dish.nutrition.fat + 'g</div><div style="font-size:10px;color:#888;">Fat</div></div>',
          '<div style="flex:1;background:#f3e5f5;border-radius:10px;padding:12px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#7b1fa2;">' + dish.nutrition.fiber + 'g</div><div style="font-size:10px;color:#888;">Fiber</div></div>',
        '</div>',
      '</div>',

      // Footer
      '<div style="padding:24px 32px;margin-top:16px;border-top:2px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;">',
        '<div style="display:flex;align-items:center;gap:8px;">',
          '<img src="' + logoUrl + '" style="width:20px;height:20px;border-radius:4px;" crossorigin="anonymous">',
          '<span style="font-size:11px;color:#aaa;">Generated by <strong style="color:#E91E63;">Tarkeeb</strong></span>',
        '</div>',
        '<span style="font-size:10px;color:#ccc;">Scan · Discover · Cook</span>',
      '</div>',

      '</div></div>'
    ].join('');

    const el = document.createElement('div');
    el.style.cssText = 'position:fixed;left:-9999px;top:0;';
    el.innerHTML = html;
    document.body.appendChild(el);

    // Show generating toast
    const toast = document.querySelector('.toast');
    if (toast) { toast.textContent = 'Generating PDF…'; toast.classList.add('show'); }

    html2pdf().set({
      margin: 0,
      filename: dish.name.replace(/\s+/g, '_') + '_Recipe_Tarkeeb.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }).from(el.firstElementChild).save().then(function() {
      document.body.removeChild(el);
      if (toast) { toast.textContent = 'Recipe PDF downloaded! 🎉'; setTimeout(function() { toast.classList.remove('show'); }, 2500); }
    }).catch(function() {
      document.body.removeChild(el);
      if (toast) { toast.textContent = 'PDF failed. Try again.'; setTimeout(function() { toast.classList.remove('show'); }, 2500); }
    });
  };
})();
