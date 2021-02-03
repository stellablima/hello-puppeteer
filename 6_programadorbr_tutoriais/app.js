const puppeter = require('puppeteer')

async function start(){

    async function loadMore(page, selector){
        const moreButton = await page.$(selector)
        if(moreButton) {
            console.log("click")
            await moreButton.click(); 
            await page.waitForSelector(selector, {timeout: 4000}).catch(() => {console.log("timeout")});
            await loadMore(page, selector);
        }
    }

    async function getComments(page, selector){
        const comments = await page.$$eval(selector, links => links.map(link => link.innerText));
        return comments
    }

    const browser = await puppeter.launch();
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/p/CChMVvQgYKK/');
    
    await loadMore(page, '.dCJp8');
    const arrobas = await getComments(page, '.C4VMK span a');
    const counted = count(arrobas);
    const sorted = sort(counted);
    sorted.forEach(arroba => {console.log(arroba)})

    await browser.close()
}

function count(arrobas){
    const count = {}
    arrobas.forEach(arroba => {
        count[arroba] = (count[arroba]||0) + 1
    });
    return count
}

function sort(counted){
    /*const entries =[] // https://www.instagram.com/{ursename}/?__a=1
    for (prop in counted){
        entries.push([prop, counted[prop]])
    }*/
    const entries = Object.entries(counted);
    const sorted = entries.sort((a, b) => b[1] - a[1])

    return sorted
}
start()

