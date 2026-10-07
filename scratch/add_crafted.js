const fs = require('fs');

let indexHtml = fs.readFileSync('public/index.html', 'utf8');

// 1. Update carousel track width
indexHtml = indexHtml.replace(
  'id="features-carousel-track" style="display: flex; width: 500%;',
  'id="features-carousel-track" style="display: flex; width: 700%;'
);

// 2. Update width: 20%; to width: 14.2857%;
indexHtml = indexHtml.replace(/<div style="width: 20%;">/g, '<div style="width: 14.2857%;">');

// 3. Update totalFeaturePages
indexHtml = indexHtml.replace(
  'const totalFeaturePages = 5;',
  'const totalFeaturePages = 7;'
);

// 4. Update the last feature grid to add image 15 (saree 21)
// We will replace the <div style="visibility: hidden;"></div> in the 5th page with the 15th image
const image15HTML = `            <div class="feature-card reveal-up" style="transition-delay:0.30000000000000004s; padding: 0; overflow: hidden; height: 400px;">
              <img src="https://res.cloudinary.com/rixydqqx/image/upload/v1790599088/ChatGPT_Image_Sep_28_2026_06_05_53_PM_nrc7zp.png" alt="Featured Saree 15" style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s ease, transform 0.5s ease; opacity: 1;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
            </div>`;
indexHtml = indexHtml.replace(
  '<div style="visibility: hidden;"></div>',
  image15HTML
);

// 5. Add two new pages (Page 6 and 7) with images 16-19
const newPagesHTML = `
        <div style="width: 14.2857%;">
          <div class="features-grid">
            <div class="feature-card reveal-up" style="transition-delay:0.1s; padding: 0; overflow: hidden; height: 400px;">
              <img src="https://res.cloudinary.com/rixydqqx/image/upload/v1790602077/ChatGPT_Image_Sep_28_2026_06_57_30_PM_wy97qu.png" alt="Featured Saree 16" style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s ease, transform 0.5s ease; opacity: 1;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
            </div>
            <div class="feature-card reveal-up" style="transition-delay:0.2s; padding: 0; overflow: hidden; height: 400px;">
              <img src="https://res.cloudinary.com/rixydqqx/image/upload/v1790602495/ChatGPT_Image_Sep_28_2026_07_03_36_PM_hu8hwq.png" alt="Featured Saree 17" style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s ease, transform 0.5s ease; opacity: 1;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
            </div>
            <div class="feature-card reveal-up" style="transition-delay:0.30000000000000004s; padding: 0; overflow: hidden; height: 400px;">
              <img src="https://res.cloudinary.com/rixydqqx/image/upload/v1790602765/ChatGPT_Image_Sep_28_2026_07_08_56_PM_kgli7z.png" alt="Featured Saree 18" style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s ease, transform 0.5s ease; opacity: 1;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
            </div>
          </div>
        </div>
        <div style="width: 14.2857%;">
          <div class="features-grid">
            <div class="feature-card reveal-up" style="transition-delay:0.1s; padding: 0; overflow: hidden; height: 400px;">
              <img src="https://res.cloudinary.com/rixydqqx/image/upload/v1790602997/ChatGPT_Image_Sep_28_2026_07_12_56_PM_ixo6og.png" alt="Featured Saree 19" style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s ease, transform 0.5s ease; opacity: 1;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
            </div>
            <div style="visibility: hidden;"></div>
            <div style="visibility: hidden;"></div>
          </div>
        </div>`;

indexHtml = indexHtml.replace(
  '</div>\n      </div>\n    </div>\n    \n    <!-- Right Arrow -->',
  '</div>\n' + newPagesHTML + '\n      </div>\n    </div>\n    \n    <!-- Right Arrow -->'
);

fs.writeFileSync('public/index.html', indexHtml);
console.log('done');
