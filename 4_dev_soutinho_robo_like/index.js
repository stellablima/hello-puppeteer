require('dotenv').config();
const puppeteer = require('puppeteer');
console.log("Alimentador de Pets no PrincesaPop");

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.princesapop.com/');

    await page.type('[id="email_connexion_mabimbo"]', process.env.LOGIN);
    await page.type('[id="password_connexion_mabimbo"]', process.env.SENHA);
    await page.click('[type="submit"]');

    await page.waitForSelector('[id="action-pet-hygiene"]');
    await page.click('[id="action-pet-hygiene"]');
    await page.waitForSelector('[id="pet-clean"]');
    await page.click('[id="pet-clean"]');
    await page.waitFor(2902); //buagndo por causa do success mesage da pag
    await page.click('[id="action-pet-moral"]');
    await page.waitForSelector('[id="pet-just-play"]');
    await page.click('[id="pet-just-play"]');
    await page.waitFor(2030);
    const fome = await page.$eval('[name="pet-hunger"]', valor => valor.innerText);
    console.log(fome);
    if (parseInt(fome.slice(0, -1)) > 25) {
        await page.click('[id="action-pet-hunger"]');
        await page.waitForSelector('[id="pet-hunger"]');
        await page.click('[id="pet-hunger"]');
    }
    await page.waitFor(2570);
    browser.close();
})();

   //errado//await page.waitForNavigation();
    //await page.$eval('[data-testid="search-input"]', (el, value) => el.value = value, 'oi');
    //await page.keyboard.press('ArrowDown', { delay: 200 });
    //await page.keyboard.press('Enter');