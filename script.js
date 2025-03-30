const smoothies = [
    {name:"Tropical Sunrise 🍍🥭", img:"tropical.png"},
    {name:"Berry Bomb 🍓🫐", img:"berrybomb.png"},
    {name:"Mango Tango 🥭🍎", img:"mangotango.png"},
    {name:"Dragon Delight 🐉🍍", img:"dragondelight.png"},
    {name:"Green Power 🥬🍏", img:"greenpower.png"},
    {name:"Golden Glow 🍑🍊", img:"goldenglow.png"},
    {name:"Silky Avocado 🥑🥛", img:"silkyavocado.png"}
  ];
  
  const sizePrices = {"klein":4,"medium":5,"groß":5.50};
  let cart = [], discountApplied = false;
  
  function showPage(page) {
    const content = document.getElementById('content');
    if (page === 'home') {
      content.innerHTML = `
        <h2>Willkommen bei <span class="color-change">BERRYBOOST</span>🍓🫐⚡!</h2>
        <p>Gesunde und frische Smoothies für mehr Energie und Wohlbefinden!</p>
        <div class="slideshow" onclick="showPage('smoothies')">
          ${smoothies.map(s => `<img src="${s.img}" class="slideshow-image">`).join('')}
        </div>`;
    } else if (page === 'smoothies') {
      content.innerHTML = smoothies.map((smoothie, i) => `
        <div class="smoothie">
          <div class="smoothie-image" onclick="toggleSizes(${i})">
            <img src="${smoothie.img}">
          </div>
          <h4>${smoothie.name}</h4>
          <div class="size-options" id="sizes-${i}"></div>
        </div>`).join('');
    } else if (page === 'about') {
      content.innerHTML = `<h2>Über uns</h2><p>Leckere Smoothies mit Leidenschaft hergestellt! Alles lokal und regional! 🫐</p>`;
    } else if (page === 'contact') {
      content.innerHTML = `<h2>Kontakt</h2><p>📧 info@berryboost.de<br>📞 0123-4567890</p>`;
    }
  }
  
  function toggleSizes(i) {
    const sizes = document.getElementById(`sizes-${i}`);
    if (sizes.classList.contains('visible')) {
      sizes.classList.remove('visible');
      setTimeout(() => sizes.innerHTML = '', 300);
    } else {
      sizes.innerHTML = `
        <button onclick="addToCart(${i},'klein')">Klein (4€)</button>
        <button onclick="addToCart(${i},'medium')">Medium (5€)</button>
        <button onclick="addToCart(${i},'groß')">Groß (5,50€)</button>`;
      setTimeout(() => sizes.classList.add('visible'), 10);
    }
  }
  
  function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
  }
  
  function addToCart(i, size) {
    const price = sizePrices[size];
    const name = `${smoothies[i].name} (${size})`;
    cart.push({name, price});
    updateCart();
  }
  
  function removeFromCart(i) {
    cart.splice(i, 1);
    updateCart();
  }
  
  function applyDiscount() {
    if (discountApplied) {
      alert("Der Rabatt wurde bereits eingelöst!");
      return;
    }
  
    const code = prompt("Rabattcode eingeben:");
    if (code === 'Boost!') {
      cart = cart.map(item => {
        item.price *= 0.9;
        return item;
      });
      discountApplied = true;
  
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
  
      setTimeout(() => {
        alert("10% Rabatt aktiviert! 🎉");
        updateCart();
      }, 100);
    } else {
      alert("Ungültiger Rabattcode!");
    }
  }
  
  function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    let items = document.getElementById('cart-items');
    items.innerHTML = cart.length ? '' : 'Dein Warenkorb ist leer.';
    let total = 0;
    items.innerHTML = '';
    cart.forEach((item, i) => {
      total += item.price;
      items.innerHTML += `
        <div><strong>${item.name}</strong><br>Preis: ${item.price.toFixed(2)}€
        <button onclick="removeFromCart(${i})">Entfernen</button></div><hr>`;
    });
    document.getElementById('cart-total').textContent = `Gesamt: ${total.toFixed(2)}€`;
  }
  
  // 🎞️ Slideshow
  let currentSlide = 0;
  setInterval(() => {
    const slides = document.querySelectorAll('.slideshow-image');
    if (!slides.length) return;
    slides.forEach((img, i) => img.classList.toggle('active', i === currentSlide));
    currentSlide = (currentSlide + 1) % slides.length;
  }, 3000);
  
  window.onload = () => {
    showPage('home');
    updateCart();
  };
  
