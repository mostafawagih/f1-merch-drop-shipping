const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");

puppeteer.use(StealthPlugin());

async function fetchAndParseF1Store() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    );

    await page.goto(
      "https://f1store.formula1.com/en/mercedes-amg-petronas-f1-team/t-10977535+z-9539237-2587371245",
      { waitUntil: "networkidle2", timeout: 60000 }
    );

    const html = await page.content();
    const $ = cheerio.load(html);

    const products = [];

    $(".product-card").each((_, el) => {
      const title = $(el).find(".product-card-title").text().trim();
      const price = $(el).find(".sr-only").first().text().trim();
      const image = $(el).find("img").attr("src");

      if (title) {
        products.push({ title, price, image });
      }
    });

    return products;
  } catch (err) {
    console.error("Error in fetchAndParseF1Store:", err.message);
    return [];
  } finally {
    await browser.close();
  }
}

module.exports = { fetchAndParseF1Store };
