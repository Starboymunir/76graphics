import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs";

const outDir = path.resolve("public/portfolio/sites");
fs.mkdirSync(outDir, { recursive: true });

const sites = [
  { url: "https://oshiworks.com", file: "oshiworks.jpg" },
  // The Roof Planet hero is an auto-rotating slider — capture slide 1 fast.
  { url: "https://www.theroofplanet.com", file: "theroofplanet.jpg", extraSettle: 1500 },
  // Vercel preview can fire a client-side redirect; allow more lenient navigation.
  { url: "https://xpressskins.vercel.app/", file: "xpressskins.jpg", lenient: true },
  { url: "https://www.67stickers.com", file: "stickers67.jpg" },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  protocolTimeout: 120000,
});

for (const s of sites) {
  console.log(`→ ${s.url}`);
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(90000);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
  );
  try {
    await page.goto(s.url, { waitUntil: "domcontentloaded", timeout: 90000 });
  } catch (e) {
    console.warn(`  (continuing despite navigation error: ${e.message})`);
  }
  // Wait for network idle (lazy images / hero videos)
  try {
    await page.waitForNetworkIdle({ idleTime: s.lenient ? 2500 : 1500, timeout: 45000 });
  } catch {
    /* keep going */
  }
  // For sites with lazy-loaded hero backgrounds, nudge scroll to trigger them
  if (s.scrollNudge) {
    try {
      await page.evaluate(() => window.scrollTo({ top: 400, behavior: "instant" }));
      await new Promise((r) => setTimeout(r, 1500));
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await new Promise((r) => setTimeout(r, 1500));
      // Force-load any <img loading="lazy"> still pending
      await page.evaluate(async () => {
        const imgs = Array.from(document.images);
        await Promise.all(
          imgs.map((img) => {
            if (img.complete && img.naturalWidth > 0) return null;
            return new Promise((resolve) => {
              img.loading = "eager";
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
              setTimeout(resolve, 4000);
            });
          })
        );
      });
    } catch {
      /* keep going */
    }
  }
  // Settle animations / lazy content
  const settle = s.extraSettle ?? 6000;
  await new Promise((r) => setTimeout(r, settle));
  const out = path.join(outDir, s.file);
  try {
    await page.screenshot({ path: out, type: "jpeg", quality: 88, fullPage: false });
    const size = fs.statSync(out).size;
    console.log(`  saved ${s.file} (${(size / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.error(`  FAILED to screenshot ${s.file}: ${e.message}`);
  }
  await page.close();
}

await browser.close();
console.log("done");
