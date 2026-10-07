const fs = require('fs');

const data = {
  21: "Pink with Burgundy Color Pure Silk Cotton Handloom saree with Triplet Korvai Border and Rich Pallu with Vairavoosi Butta!!!",
  22: "Beige with Maroon Color Pure Silk Cotton Handloom saree with Korvai Border and Rich Pallu with Vairavoosi Butta!!!",
  23: "Black and White Kassa Kassa Kattam with Black Korvai Rettapet Border Pure Silk Cotton Handloom saree with Rich Pallu!!!",
  24: "Black and White Kassa Kassa Kattam with Pink Korvai Rettapet Border Pure Silk Cotton Handloom saree and Rich Pallu!!!",
  25: "Black and White Kassa Kassa Kattam with Red Korvai Rettapet Border Pure Silk Cotton Handloom saree and Rich Pallu!!!"
};

let newArrivals = fs.readFileSync('public/new-arrivals.html', 'utf8');

for (let i = 21; i <= 25; i++) {
  const title = data[i];
  
  // Replace missing whatsappText for 22-24, and fix 21 and 25
  // Actually, let's just rebuild the objects properly by finding the id: "premium-silk-saree-X" and inserting the whatsappText right before specs
  
  const regex = new RegExp(`(id:\\s*"premium-silk-saree-${i}"[\\s\\S]*?images:\\s*\\[[\\s\\S]*?\\],\\s*)(?:whatsappText:[\\s\\S]*?,\\s*)?specs: {`);
  newArrivals = newArrivals.replace(regex, `$1whatsappText: "Hi Pavana Silks, I am interested in inquiring about the ${title}.",\n    specs: {`);
}

fs.writeFileSync('public/new-arrivals.html', newArrivals);
console.log('fixed whatsappText');
