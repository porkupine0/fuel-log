// Draws Fuel Log's icons (a Nutrition Facts label on beet red) at every size the site needs.
// Run from the repo root: node source/make-icons.js (needs Playwright). The apple-touch and maskable icons are
// full-bleed squares (the phone rounds the corners; maskable keeps everything inside the safe circle); the
// "any" icons and the favicon are rounded. File names carry a version so phones never reuse an old cached icon.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', 'icons'), V = 'v1';
const INK = '#151714', CARD = '#ffffff';
// the label: a heavy title bar, a thick rule, the calories row, then line items of different widths
const label = () => `<g>
  <rect x="-128" y="-170" width="256" height="340" rx="22" fill="${CARD}"/>
  <rect x="-96" y="-138" width="192" height="44" rx="4" fill="${INK}"/>
  <rect x="-96" y="-78" width="192" height="16" fill="${INK}"/>
  <rect x="-96" y="-46" width="104" height="30" rx="3" fill="${INK}"/>
  <rect x="38" y="-52" width="58" height="36" rx="3" fill="${INK}"/>
  <rect x="-96" y="-2" width="192" height="9" fill="${INK}"/>
  <rect x="-96" y="24" width="150" height="14" rx="3" fill="${INK}"/>
  <rect x="-96" y="56" width="192" height="4" fill="${INK}"/>
  <rect x="-96" y="76" width="118" height="14" rx="3" fill="${INK}"/>
  <rect x="-96" y="108" width="192" height="4" fill="${INK}"/>
  <rect x="-96" y="128" width="136" height="14" rx="3" fill="${INK}"/>
</g>`;
const svg = ({ round = false, scale = 1 } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c2306f"/><stop offset="1" stop-color="#7d1846"/></linearGradient>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#2a0616" flood-opacity=".45"/></filter></defs>
  <rect width="512" height="512" rx="${round ? 112 : 0}" fill="url(#bg)"/>
  <g transform="translate(256 262) scale(${scale}) rotate(-4)" filter="url(#sh)">${label()}</g></svg>`;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT)) if (/\.png$/.test(f)) fs.unlinkSync(path.join(OUT, f));
  fs.writeFileSync(path.join(OUT, 'icon.svg'), svg({ round: true }));
  const browser = await chromium.launch(), page = await browser.newPage();
  const out = async (file, size, opts) => {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<html><body style="margin:0;background:transparent">${svg(opts).replace('width="512" height="512"', `width="${size}" height="${size}"`)}</body></html>`);
    await page.screenshot({ path: path.join(OUT, file.replace('.png', `-${V}.png`)), omitBackground: !!(opts && opts.round), clip: { x: 0, y: 0, width: size, height: size } });
  };
  await out('icon-512.png', 512, { round: true });
  await out('icon-192.png', 192, { round: true });
  await out('icon-maskable-512.png', 512, { scale: .78 });
  await out('apple-touch-icon.png', 180, {});
  await out('favicon-32.png', 32, { round: true });
  await browser.close();
  console.log('icons written');
})();
