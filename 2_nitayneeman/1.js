const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();//chromiun
//const browser = await puppeteer.launch({ product: 'firefox' });
  console.info(browser);
  await browser.close();
})();