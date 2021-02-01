/*
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 });
  
  // Browser operations
  
  await browser.close();
})();
*/
/* Debugging our application code in the browser
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ devtools: true });

  // Browser operations

  // Holds the browser until we terminate the process explicitly
  await browser.waitForTarget(() => false);
  
  await browser.close();
})();

Observe que usamos devtools que inicia o navegador em um modo headful por padrão e abre o DevTools automaticamente. Além disso, utilizamos waitForTarget para reter o processo do navegador até encerrá-lo explicitamente.
*/

/*A primeira abordagem é simplesmente uma função que resolve uma promessa quando setTimeout termina. A segunda abordagem, no entanto, é muito mais simples, mas exige uma instância de página (veremos isso mais tarde).
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ devtools: true });

  // Browser operations

  // Option 1 - resolving a promise when `setTimeout` finishes
  const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
  await sleep(3000);

  // Option 2 - if we have a page instance, just using `waitFor`
  await page.waitFor(3000);

  await browser.close();
})();
*/
/*problemas em paginas nao direcionadas
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Instructs the blank page to navigate a URL
  await page.goto('http://www.nyan.cat/');
  
  // Fetches page's title
  const title = await page.title();
  console.info(`The title is: ${title}`);

  await browser.close();
})();
*/
/*await por x elemento
const puppeteer = require('puppeteer');

(async () => { 
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://pptr.dev');

  // Waits until the `title` meta element is rendered
  await page.waitForSelector('title');
  
  const title = await page.title();
  console.info(`The title is: ${title}`);

  await browser.close();
})();*/

/*
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Emulates an iPhone X
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
  await page.setViewport({ width: 375, height: 812 });

  await page.goto('https://pptr.dev');
  await browser.close();
})();
*/ 
/*emuladores
const puppeteer = require('puppeteer');
const devices = puppeteer.devices;


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.emulate(devices['iPhone X']);
  await page.goto('https://pptr.dev');

  await browser.close();
})();*/
/* exposeFunction ? faltou, personalizer funçoes
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Emitted when the DOM is parsed and ready (without waiting for resources)
  page.once('domcontentloaded', () => console.info('✅ DOM is ready'));

  // Emitted when the page is fully loaded
  page.once('load', () => console.info('✅ Page is loaded'));

  // Emitted when the page attaches a frame
  page.on('frameattached', () => console.info('✅ Frame is attached'));

  // Emitted when a frame within the page is navigated to a new URL
  page.on('framenavigated', () => console.info('👉 Frame is navigated'));

  // Emitted when a script within the page uses `console.timeStamp`
  page.on('metrics', data => console.info(`👉 Timestamp added at ${data.metrics.Timestamp}`));

  // Emitted when a script within the page uses `console`
  page.on('console', message => console[message.type()](`👉 ${message.text()}`));

  // Emitted when the page emits an error event (for example, the page crashes)
  page.on('error', error => console.error(`❌ ${error}`));

  // Emitted when a script within the page has uncaught exception
  page.on('pageerror', error => console.error(`❌ ${error}`));

  // Emitted when a script within the page uses `alert`, `prompt`, `confirm` or `beforeunload`
  page.on('dialog', async dialog => {
    console.info(`👉 ${dialog.message()}`);
    await dialog.dismiss();
  });

  // Emitted when a new page, that belongs to the browser context, is opened
  page.on('popup', () => console.info('👉 New page is opened'));

  // Emitted when the page produces a request
  page.on('request', request => console.info(`👉 Request: ${request.url()}`));

  // Emitted when a request, which is produced by the page, fails
  page.on('requestfailed', request => console.info(`❌ Failed request: ${request.url()}`));

  // Emitted when a request, which is produced by the page, finishes successfully
  page.on('requestfinished', request => console.info(`👉 Finished request: ${request.url()}`));

  // Emitted when a response is received
  page.on('response', response => console.info(`👉 Response: ${response.url()}`));

  // Emitted when the page creates a dedicated WebWorker
  page.on('workercreated', worker => console.info(`👉 Worker: ${worker.url()}`));

  // Emitted when the page destroys a dedicated WebWorker
  page.on('workerdestroyed', worker => console.info(`👉 Destroyed worker: ${worker.url()}`));

  // Emitted when the page detaches a frame
  page.on('framedetached', () => console.info('✅ Frame is detached'));

  // Emitted after the page is closed
  page.once('close', () => console.info('✅ Page is closed'));

  await page.goto('https://pptr.dev');
  


// Triggers `metrics` event
await page.evaluate(() => console.timeStamp());

// Triggers `console` event
await page.evaluate(() => console.info('A console message within the page'));

// Triggers `dialog` event
await page.evaluate(() => alert('An alert within the page'));

// Triggers `error` event
page.emit('error', new Error('An error within the page'));

// Triggers `close` event
await page.close();


  await browser.close();
})();
*/
/* mouse
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://pptr.dev');
  
  // Waits until the API sidebar is rendered
  await page.waitForSelector('sidebar-component');

  // Hovers the second link inside the API sidebar
  await page.mouse.move(40, 150);

  await browser.close();
})();
*/
/*
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://pptr.dev');
  await page.waitForSelector('sidebar-component');

  // Clicks the second link and triggers `mouseup` event after 1000ms
  await page.mouse.click(40, 150, { delay: 1000 });

  await browser.close();
})();
*/
/*arrastar e soltar
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://pptr.dev');
  await page.waitForSelector('sidebar-component');

  // Drags the mouse from a point
  await page.mouse.move(0, 0);
  await page.mouse.down();
  
  // Drops the mouse to another point
  await page.mouse.move(100, 100);
  await page.mouse.up();

  await browser.close();
})();
*/
/*////keyboard
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://pptr.dev');
  
  // Waits until the toolbar is rendered
  await page.waitForSelector('toolbar-component');

  // Focuses the search input
  await page.focus('[type="search"]');

  // Types the text into the focused element
  await page.keyboard.type('Keyboard', { delay: 100 });

  // Choosing the third result
  await page.keyboard.press('ArrowDown', { delay: 200 });
  await page.keyboard.press('ArrowDown', { delay: 200 });
  await page.keyboard.press('Enter');

  await browser.close();
})();
*/

/* screenshots
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');

  // Takes a screenshot of the whole viewport
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();
*/

/*

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');
  
  // Takes a screenshot of an area within the page
  await page.screenshot({
    path: 'screenshot.jpg',
    type: 'jpeg',
    quality: 80,
    clip: { x: 220, y: 0, width: 630, height: 360 }
  });
  
  await browser.close();
})();
*/

/*
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigates to the project README file
  await page.goto('https://github.com/GoogleChrome/puppeteer/blob/master/README.md');

  // Generates a PDF from the page content
  await page.pdf({ path: 'overview.pdf' });

  await browser.close();
})();
*/
//geolocation - verificar problemas https://github.com/appium/appium/issues/10848
/*
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ devtools: true });
  const page = await browser.newPage();

  // Grants permission for changing geolocation
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://pptr.dev', ['geolocation']);

  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');

  // Changes to the north pole's location
  await page.setGeolocation({ latitude: 90, longitude: 0 });
  await browser.close();
})();
*/
//acessibilidade
/* We can obtain the full tree through setting interestingOnly to false.
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');

  // Captures the current state of the accessibility tree
  const snapshot = await page.accessibility.snapshot();
  console.info(snapshot);

  await browser.close();
})();
*/
/*
//Code Coverage, estudar a parte, e fornece a capacidade de medir quanto código está sendo usado, em comparação com o código que está realmente carregado. Desta forma, podemos reduzir o código morto e, eventualmente, acelerar o tempo de carregamento das páginas.

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Starts to gather coverage information for JS and CSS files
  await Promise.all([page.coverage.startJSCoverage(), page.coverage.startCSSCoverage()]);

  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');

  // Stops the coverage gathering
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ]);

  // Calculates how many bytes are being used based on the coverage
  const calculateUsedBytes = (type, coverage) =>
    coverage.map(({ url, ranges, text }) => {
      let usedBytes = 0;

      ranges.forEach(range => (usedBytes += range.end - range.start - 1));

      return {
        url,
        type,
        usedBytes,
        totalBytes: text.length
      };
    });

  console.info([
    ...calculateUsedBytes('js', jsCoverage),
    ...calculateUsedBytes('css', cssCoverage)
  ]);

  await browser.close();
})();
*/


//Measuring Performance
/* load time 
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');

  // Executes Navigation API within the page context
  const metrics = await page.evaluate(() => JSON.stringify(window.performance));

  // Parses the result to JSON
  console.info(JSON.parse(metrics));

  await browser.close();
})();
Note: All explanations about the different timings above are available here.
*/
/*runtime
 
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');

  // Returns runtime metrics of the page
  const metrics = await page.metrics();
  console.info(metrics);

  await browser.close();
})();

{
   Timestamp: 6400.768827, // When the metrics were taken
   Documents: 13, // Number of documents
   Frames: 7, // Number of frames
   JSEventListeners: 33, // Number of events
   Nodes: 51926, // Number of DOM elements
   LayoutCount: 6, // Number of page layouts
   RecalcStyleCount: 13, // Number of page style recalculations
   LayoutDuration: 0.545877, // Total duration of all page layouts
   RecalcStyleDuration: 0.011856, // Total duration of all page style recalculations
   ScriptDuration: 0.064591, // Total duration of JavaScript executions
   TaskDuration: 1.244381, // Total duration of all performed tasks by the browser
   JSHeapUsedSize: 17158776, // Actual memory usage by JavaScript
   JSHeapTotalSize: 33492992 // Total memory usage, including free allocated space, by JavaScript
}

*/
//tracing F12 >PERFORMANCE > arrasta e joga
/*
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Starts to record a trace of the operations
  await page.tracing.start({ path: 'trace.json' });

  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');

  // Stops the recording
  await page.tracing.stop();

  await browser.close();
})();
*/