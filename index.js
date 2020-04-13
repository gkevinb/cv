const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2'})
    await page.pdf(
        {
            path: 'export/using_puppeteer.pdf',
            format: 'A4'
        }
    )
    await browser.close()
})()