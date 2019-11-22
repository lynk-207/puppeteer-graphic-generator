var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/casper', function(req, res, next) {
  res.render('index', { title: 'Cool' });
  const puppeteer = require('puppeteer');

  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://loto-images.s3.amazonaws.com/svg-data/11-55e5522f-af60-427d-a6a9-850d409e2651-1574447547226.html');
    page.on('response', response => {
      console.info(`👉 Response: ${response}`)
      // browser.close();
    });
    await page.evaluate(() => window.scrollTo(0, Number.MAX_SAFE_INTEGER));
    await page.waitFor(3000);
    await page.screenshot({
      path: 'screenshot.png',
      fullPage: true
    });
    await browser.close();
 
  })();
});


module.exports = router;
