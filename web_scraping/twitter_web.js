const { default: puppeteer } = require("puppeteer");
const { writeFile, readFile } = require("fs/promises");
const { load } = require("cheerio");

const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://twitter.com/home");
  await page.waitForTimeout(200000);
  const productdata = [];
  const $ = load(await page.content());
  $("section >div > div > div").each((_, el) => {
    if (productdata.length < 50) {
      productdata.push({
        //           //   name: $(el).find("h3").text(),
        name: $(
          "div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-dnmrzs > div > a",
          el
        ).text(),

        caption: $(
          "div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu > div",
          el
        ).text(),
        post: $(
          "div > div.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-ipm5af.r-13qz1uu > div > img",
          el
        ).attr("src"),
        likes: $(
          "div > div > div > div.css-1dbjc4n.r-xoduu5.r-1udh08x",
          el
        ).text(),
      });
    }
  });
  await writeFile("product.json", JSON.stringify(productdata));
  await browser.close();
};
main();

// await page.click("#identifierNext")
// await page.
