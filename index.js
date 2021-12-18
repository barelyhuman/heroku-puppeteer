const chromium = require("chrome-aws-lambda");
const { addExtra } = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const puppeteerExtra = addExtra(chromium.puppeteer);

puppeteerExtra.use(StealthPlugin());

puppeteerExtra.use(
  require("puppeteer-extra-plugin-block-resources")({
    blockedTypes: new Set(["image", "stylesheet"]),
  })
);

puppeteerExtra.use(StealthPlugin());

export async function main() {
  const browser = await puppeteerExtra.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
  });
  const page = await browser.newPage();
  await page.goto("https://google.com");
  await page.screenshot({ path: "example.png" });

  await browser.close();
}

main();
