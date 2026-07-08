# Pavana Silks — Website Deployment Guide

## Project Structure
```
pavana-silks/
├── index.html          ← Main homepage (all-in-one, no build needed)
├── saree-hero.mp4      ← Hero video (place in same folder)
├── Pavana_Bg.png       ← Background logo for About section
└── pavana-logo.png     ← Your Pavana Silks logo (from the uploaded image)
```

## Asset Setup

### Logo File
Export/save your Pavana Silks logo (the black background one) as `pavana-logo.png`
and place it in the same folder as `index.html`.

**Tip:** For navbar and footer, consider a version with a transparent background
(remove the black BG in Canva/Photoshop). The `filter: drop-shadow` in CSS helps
it stand out on both dark and light backgrounds.

### Video File
Place `saree-hero.mp4` in the same folder. The video scrubbing works like this:
- 0–30% scroll → plays the beginning portion of the video (saree floating)
- 30–60% scroll → mid section (draping)
- 60–100% scroll → end section (close-up details, final pose)

The video is NOT autoplay — it's controlled entirely by scroll position via
`requestAnimationFrame` + GSAP ScrollTrigger. No sound plays.

## Local Testing
Simply open `index.html` in Chrome/Firefox. Video scrubbing works on localhost.
No server required for basic testing.

## Deployment Options

### Option A — Netlify Drop (fastest, free)
1. Drag the entire `pavana-silks/` folder to https://app.netlify.com/drop
2. Live in 30 seconds. Done.

### Option B — Vercel
1. Push to a GitHub repo
2. Connect repo to Vercel dashboard
3. Set output directory: `/` (root)
4. Deploy

### Option C — cPanel (Ezerhost / shared hosting)
1. Upload all files to `public_html/pavana-silks/` or root
2. Set `index.html` as the default document

## Converting to Next.js (if needed)
If you want to convert this into a proper Next.js project:

1. Create Next.js app: `npx create-next-app@latest pavana-silks`
2. Install deps: `npm install gsap`
3. Move `index.html` content into `app/page.tsx` as a Client Component (`'use client'`)
4. Move styles to `globals.css` or `app/page.module.css`
5. Place assets in `public/` folder
6. Reference them as `/saree-hero.mp4`, `/pavana-logo.png`, etc.
7. Wrap GSAP init in `useEffect` hook

## Notes
- The hero section is `500vh` tall (5× viewport) — this gives a long scrub zone
- Video scrubbing uses smooth lerp (linear interpolation) for silky transitions
- All text overlays are HTML/CSS — fully editable, never burned into the video
- Responsive for mobile, tablet, desktop
- GSAP and Google Fonts load from CDN — requires internet for first load

## Brand Links Configured
- Facebook: https://www.facebook.com/share/18xNUNxNtY/
- Instagram: https://www.instagram.com/pavanasilks_silkcotton
- LinkedIn: placeholder (update when ready)

## Customisation
- Replace saree-card colour blocks with actual saree product images
- Update the collection product names/descriptions
- Update About section body text
- Add WhatsApp CTA button with phone link: `https://wa.me/91XXXXXXXXXX`
