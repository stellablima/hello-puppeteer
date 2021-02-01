const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://books.toscrape.com/');
  await page.screenshot({path: 'example1.png'});
  await browser.close();
})();

/* https://medium.com/@fabiojanio/node-js-web-scraping-com-puppeteer-29dd974eb042
De fato as possibilidades são infinitas! O Puppeteer pode ser utilizando tanto para Web Scraping quanto para Web Crawling. Vejamos rapidamente o que cada termo significa:
Web Scraping: ato de baixar automaticamente os dados de uma ou mais páginas tendo como principal objetivo extrair informações muito especificas; Automatizar ações realizadas via uso da interface do navegador, tais como preencher e submeter formulários ou até mesmo simular a navegação de um usuário dentro do “site”.
Web Crawling: ato de baixar automaticamente os dados de uma página web, extrair os hiperlinks contidos nela e segui-los de forma recursiva. De modo grosseiro e simplório, imagine que essa é uma das técnicas utilizadas por buscadores como Google, Bing e outros.
*/