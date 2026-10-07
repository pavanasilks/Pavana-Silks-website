const fs = require('fs');

const replacements = [
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790155396/20260919_161407_jmokfk.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_12.32.24_PM_zu5khu.jpg' },
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790579718/WhatsApp_Image_2026-09-28_at_12.39.41_PM_1_kbvjdq.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_5.15.49_PM_wvd36d.jpg' },
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790580269/WhatsApp_Image_2026-09-28_at_12.39.43_PM_dxpkww.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_5.15.48_PM_1_nob5wu.jpg' },
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790580758/WhatsApp_Image_2026-09-28_at_12.39.42_PM_1_lnzsc1.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_5.17.59_PM_ejsurc.jpg' },
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790581175/WhatsApp_Image_2026-09-28_at_12.39.42_PM_2_o8jmwr.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_5.15.48_PM_oucxyr.jpg' },
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790581465/WhatsApp_Image_2026-09-28_at_12.09.40_PM_hohpx4.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790685634/ChatGPT_Image_Sep_29_2026_06_10_16_PM_ljory1.png' },
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790599083/WhatsApp_Image_2026-09-28_at_5.39.30_PM_kjod8a.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684931/WhatsApp_Image_2026-09-29_at_5.15.50_PM_ezap1r.jpg' },
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790602080/WhatsApp_Image_2026-09-28_at_5.44.02_PM_h7cgv0.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684930/WhatsApp_Image_2026-09-29_at_5.15.49_PM_1_zghvep.jpg' },
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790602493/WhatsApp_Image_2026-09-28_at_5.44.11_PM_imc0i3.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684931/WhatsApp_Image_2026-09-29_at_5.15.50_PM_2_uwazck.jpg' },
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790602754/WhatsApp_Image_2026-09-28_at_5.46.00_PM_rpmtdm.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684931/WhatsApp_Image_2026-09-29_at_5.15.51_PM_gr1dm5.jpg' },
  { old: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790602992/WhatsApp_Image_2026-09-28_at_5.46.23_PM_ya0c4g.jpg', new: 'https://res.cloudinary.com/rixydqqx/image/upload/v1790684931/WhatsApp_Image_2026-09-29_at_5.15.50_PM_1_gpj7vc.jpg' }
];

let content = fs.readFileSync('public/index.html', 'utf8');
let replacementsMade = 0;

replacements.forEach(({ old, new: newUrl }) => {
  if (content.includes(old)) {
    content = content.split(old).join(newUrl);
    replacementsMade++;
    console.log(`Replaced: ${old}`);
  } else {
    console.log(`Not found: ${old}`);
  }
});

fs.writeFileSync('public/index.html', content);
console.log(`Total replacements: ${replacementsMade}`);
