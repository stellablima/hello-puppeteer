const puppeteer = require('puppeteer')
let scrape = async () => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  await page.goto('http://books.toscrape.com/')
  page.click('h3 > a') //primeiro link da pag
  await page.waitForNavigation() // aguardar que o conteúdo da página seja carregado
  //await page.waitFor(1000); para paginas dinamicas pesadas que demoram muuuuuito
  //await page.waitForFunction('document.querySelector("body").innerText.includes("Carregado!")');  o código interno da função está verificando se a palavra “Carregado!” está incluída no corpo da página, caso não esteja irá aguardar até que a mesma se faça presente.
  await page.screenshot({ path: 'example3.png' })
  /*const result = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div.product_main')).reduce(
      (result, book) => {
        return {
          title: book.getElementsByTagName('h1')[0].innerText,
          price: book.getElementsByClassName('price_color')[0].innerText,
        }
      }, {})
  })*/
//Implicitamente este método executa um document.querySelector
  const title = await page.$eval(
    'div.product_main h1', divs => divs.innerText
  )
  const price = await page.$eval(
    'div.product_main .price_color', divs => divs.innerText
  )


  browser.close()
  return {title, price} //result
}
scrape().then((value) => {
  console.log(value)
})



/*
Caso esteja lidando com um sistema onde é solicitado o preenchimento de um Captcha, você tem basicamente duas opções, utilizar algum mecanismo/algoritmo a parte resolução/quebra do Captcha, ou lançar uma instância gráfica do navegador com um await page.waitFor(10000); de modo a ter tempo hábil para resolver o Captcha. Isso é valido principalmente quando você tem um processo que funciona em loop, precisando raramente passar novamente pela etapa que possui o Captcha.
await page.type('#idCampo', 'valor'); inserindo valores

await page.keyboard.press('Enter');


Já passei por casos onde o botão que eu queria clicar não tinha um identificador único e nem uma posição fixa na árvore de elementos da página. Para contornar este problema utilizei o page.$x(). Basicamente informamos a tag que envolve o elemento, neste caso era td, verificamos se ela contém em seu texto o valor procurado e armazenamos a referência para o elemento.
Na sequência verificamos se o elemento existe > 0, se existir chamamos o método click do elemento. Grosseiramente falando seria isso 😉
const result = await page.$x("//td[contains(text(), 'Texto aqui')]");
if (result.length > 0) {
  await result[0].click();
}


topicos futuros:
 não implementa fluxos de tratamento de exceções, fato este que poderia quebrar sua aplicação em tempo de execução.
*/