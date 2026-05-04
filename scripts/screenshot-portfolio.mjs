import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs";

const outDir = path.resolve("public/portfolio/sites");
fs.mkdirSync(outDir, { recursive: true });

const sites = [
  { url: "https://oshiworks.com", file: "oshiworks.jpg" },
  { url: "https://www.theroofplanet.com", file: "theroofplanet.jpg" },
  { url: "https://www.xpressskins.com", file: "xpressskins.jpg" },
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
    await page.waitForNetworkIdle({ idleTime: 1500, timeout: 30000 });
  } catch {
    /* keep going */
  }
  // Settle animations / lazy content
  await new Promise((r) => setTimeout(r, 6000));
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
