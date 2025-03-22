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
let cart=[], discountApplied=false;

function showPage(page){
    const content=document.getElementById('content');
    if(page==='home'){
        content.innerHTML=`
            <h2>Willkommen bei <span class="color-change">BERRYBOOST</span>🍓🫐⚡!</h2>
</span>
            <p>Gesunde und frische Smoothies für mehr Energie und Wohlbefinden!</p>
        <img src="smoothie.png" class="main-image">`;

    }
    else if(page==='smoothies'){
        content.innerHTML=smoothies.map((smoothie,i)=>`
            <div class="smoothie">
                <div class="smoothie-image" onclick="showSizes(${i})" ondblclick="hideSizes(${i})">
                    <img src="${smoothie.img}">
                </div>
                <h4>${smoothie.name}</h4>
                <div class="size-options" id="sizes-${i}"></div>
            </div>`).join('');
    }
    else if(page==='about'){
        content.innerHTML=`<h2>Über uns</h2><p>Leckere Smoothies mit Leidenschaft hergestellt! Alles Lokal und Regional!</p>`;
    }
    else if(page==='contact'){
        content.innerHTML=`<h2>Kontakt</h2><p>E-Mail: info@berryboost.de<br>Tel: 0123-4567890</p>`;
    }
}

function showSizes(i){
    const sizes=document.getElementById(`sizes-${i}`);
    if(sizes.classList.contains('visible')) return;
    sizes.innerHTML=`
        <button onclick="addToCart(${i},'klein')">Klein (4€)</button>
        <button onclick="addToCart(${i},'medium')">Medium (5€)</button>
        <button onclick="addToCart(${i},'groß')">Groß (5,50€)</button>`;
    setTimeout(()=>sizes.classList.add('visible'),10);
}

function hideSizes(i){
    const sizes=document.getElementById(`sizes-${i}`);
    sizes.classList.remove('visible');
    setTimeout(()=>sizes.innerHTML='',300);
}

function toggleCart(){
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function addToCart(i,size){
    let price=sizePrices[size];
    const name=`${smoothies[i].name} (${size})`;
    cart.push({name,price});
    updateCart();
}

function removeFromCart(i){
    cart.splice(i,1);
    updateCart();
}

function applyDiscount(){
    if(discountApplied){
        alert("Der Rabatt wurde bereits eingelöst!");
        return;
    }
    let code=prompt("Rabattcode eingeben:");
    if(code==='Boost!'){
        cart=cart.map(item=>{
            item.price*=0.9;
            return item;
        });
        discountApplied=true;
        alert("10% Rabatt aktiviert!");
        updateCart();
    } else {
        alert("Ungültiger Rabattcode!");
    }
}

function updateCart(){
    document.getElementById('cart-count').textContent=cart.length;
    let items=document.getElementById('cart-items');
    items.innerHTML=cart.length?'':'Dein Warenkorb ist leer.';
    let total=0;
    items.innerHTML=''; 
    cart.forEach((item,i)=>{
        total+=item.price;
        items.innerHTML+=`
            <div><strong>${item.name}</strong><br>Preis: ${item.price.toFixed(2)}€
            <button onclick="removeFromCart(${i})">Entfernen</button></div><hr>`;
    });
    document.getElementById('cart-total').textContent=`Gesamt: ${total.toFixed(2)}€`;
}

window.onload=()=>{showPage('home');updateCart();};
