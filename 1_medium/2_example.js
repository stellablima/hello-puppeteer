const puppeteer = require('puppeteer')
let scrape = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://books.toscrape.com/')

    /*
    const result = await page.evaluate(_ => //executar código JavaScript diretamente dentro do navegador que foi lançado 
      Array.from(                //section > div > ol > li > article > div > a > img
        document.querySelectorAll('section > div > ol > li img'))
                .map(books => books.getAttribute('alt'))
    )
    */

    /*const result = await page.evaluate(() => {
      const books = []
      document.querySelectorAll('section > div > ol > li img')
              .forEach((book) => books.push(book.getAttribute('alt')))
      return books
    })*/

    const result = await page.$$eval('li img', titles =>
        titles.map(titles => titles.getAttribute('alt'))
    )

    browser.close()
    return result
}
scrape().then((value) => {
    console.log(value)
})




