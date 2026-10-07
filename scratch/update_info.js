const fs = require('fs');

const data = {
  21: {
    title: "Pink with Burgundy Color Pure Silk Cotton Handloom saree with Triplet Korvai Border and Rich Pallu with Vairavoosi Butta!!!",
    price: "₹6,400"
  },
  22: {
    title: "Beige with Maroon Color Pure Silk Cotton Handloom saree with Korvai Border and Rich Pallu with Vairavoosi Butta!!!",
    price: "₹6,400"
  },
  23: {
    title: "Black and White Kassa Kassa Kattam with Black Korvai Rettapet Border Pure Silk Cotton Handloom saree with Rich Pallu!!!",
    price: "₹5,900"
  },
  24: {
    title: "Black and White Kassa Kassa Kattam with Pink Korvai Rettapet Border Pure Silk Cotton Handloom saree and Rich Pallu!!!",
    price: "₹5,900"
  },
  25: {
    title: "Black and White Kassa Kassa Kattam with Red Korvai Rettapet Border Pure Silk Cotton Handloom saree and Rich Pallu!!!",
    price: "₹5,900"
  }
};

let newArrivals = fs.readFileSync('public/new-arrivals.html', 'utf8');
let indexHtml = fs.readFileSync('public/index.html', 'utf8');

for (let i = 21; i <= 25; i++) {
  const d = data[i];
  
  const regexNewArrivals = new RegExp(`(id:\\s*"premium-silk-saree-${i}",\\s*badge:\\s*"New Arrival",\\s*title:\\s*)"Premium Handwoven Silk Cotton Saree"(,\\s*desc:\\s*)"TBD"(,\\s*price:\\s*)"TBD"`);
  newArrivals = newArrivals.replace(regexNewArrivals, `$1"${d.title}"$2"${d.title}"$3"${d.price}"`);
  
  const regexWhatsapp = new RegExp(`(id:\\s*"premium-silk-saree-${i}"[\\s\\S]*?whatsappText:\\s*"Hi Pavana Silks, I am interested in inquiring about the )Premium Handwoven Silk Cotton Saree(.")`);
  newArrivals = newArrivals.replace(regexWhatsapp, `$1${d.title}$2`);

  const regexCard = new RegExp(`(<div class="saree-card reveal-up" onclick="window.location.href='/new-arrivals#premium-silk-saree-${i}'">\\s*<img src="[^"]+" alt=)"Premium Handwoven Silk Cotton Saree"(" class="saree-img" />\\s*<div class="saree-card-overlay"></div>\\s*<div class="saree-card-info">\\s*<h4>)Premium Handwoven Silk Cotton Saree(</h4>\\s*<p>)TBD(</p>)`);
  indexHtml = indexHtml.replace(regexCard, `$1"${d.title}"$2${d.title}$3${d.price}$4`);
  
  const regexSlide = new RegExp(`(<img src="[^"]+" alt=)"Premium Handwoven Silk Cotton Saree"(" />\\s*</div>\\s*<div class="saree-slide-content">\\s*<h3 class="saree-slide-title">)Premium Handwoven Silk Cotton Saree(</h3>\\s*<button class="btn-add-cart" onclick="window.location.href='/new-arrivals#premium-silk-saree-${i}'">View Details</button>)`);
  indexHtml = indexHtml.replace(regexSlide, `$1"${d.title}"$2${d.title}$3`);
}

fs.writeFileSync('public/new-arrivals.html', newArrivals);
fs.writeFileSync('public/index.html', indexHtml);
console.log('done');
