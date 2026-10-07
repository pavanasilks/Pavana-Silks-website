const fs = require('fs');

const updates = {
  "majestic-silk-saree-05": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_12.32.24_PM_zu5khu.jpg',
  "enchanting-silk-saree-16": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_5.15.49_PM_wvd36d.jpg',
  "glorious-silk-saree-17": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_5.15.48_PM_1_nob5wu.jpg',
  "stunning-silk-saree-18": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_5.17.59_PM_ejsurc.jpg',
  "captivating-silk-saree-19": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_5.15.48_PM_oucxyr.jpg',
  "magnificent-silk-saree-20": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790685634/ChatGPT_Image_Sep_29_2026_06_10_16_PM_ljory1.png',
  "premium-silk-saree-21": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684931/WhatsApp_Image_2026-09-29_at_5.15.50_PM_ezap1r.jpg',
  "premium-silk-saree-22": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_5.15.49_PM_1_zghvep.jpg',
  "premium-silk-saree-23": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684931/WhatsApp_Image_2026-09-29_at_5.15.50_PM_2_uwazck.jpg',
  "premium-silk-saree-24": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684931/WhatsApp_Image_2026-09-29_at_5.15.51_PM_gr1dm5.jpg',
  "premium-silk-saree-25": 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684931/WhatsApp_Image_2026-09-29_at_5.15.50_PM_1_gpj7vc.jpg'
};

function updateFile(filename) {
  console.log(`Updating ${filename}`);
  let content = fs.readFileSync(filename, 'utf8');

  for (const [id, newUrl] of Object.entries(updates)) {
    // regex matches: id: "ID", then any characters until images: [ "OLD_URL"
    const regex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?images:\\s*\\[\\s*\\n*\\s*['"])([^'"]+)(['"])`, 'g');
    
    let replaced = false;
    content = content.replace(regex, (match, p1, p2, p3) => {
      replaced = true;
      console.log(`- Replaced ${id} image: ${p2} -> ${newUrl}`);
      return p1 + newUrl + p3;
    });
    if (!replaced) console.log(`- Failed to replace ${id} in ${filename}`);
  }

  fs.writeFileSync(filename, content);
}

updateFile('public/index.html');
updateFile('public/new-arrivals.html');
console.log("Update complete.");
