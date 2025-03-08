const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const sourceDir = 'src'
const screenshotsDir = 'tests/screenshots'

/** @type {puppeteer.Browser} */
let browser
/** @type {puppeteer.Page} */
let page

let timeout = 10000
let count = 1

/**
 * @function getBrowser
 * @return {puppeteer.Browser}
 */
async function getBrowser() {
    const pathToExtension = path.join(process.cwd(), sourceDir)
    console.log('pathToExtension:', pathToExtension)
    return await puppeteer.launch({
        args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`,
            // '--disable-blink-features=AutomationControlled',
            // '--disable-features=ChromeUserPermPrompt',
        ],
        dumpio: true,
        // headless: false,
        // slowMo: 50,
    })
}

/**
 * @function getWorker
 * @global browser
 * @global timeout
 * @return {puppeteer.Page}
 */
async function getWorker() {
    const workerTarget = await browser.waitForTarget(
        (target) =>
            target.type() === 'service_worker' &&
            target.url().endsWith('service-worker.js'),
        { timeout }
    )
    return await workerTarget.worker()
}

/**
 * @function getPage
 * @global browser
 * @global timeout
 * @param {String} name
 * @param {Boolean=} log
 * @param {String=} size
 * @return {puppeteer.Page}
 */
async function getPage(name, log, size) {
    console.debug(`getPage: ${name}`, log, size)
    const target = await browser.waitForTarget(
        (target) => target.type() === 'page' && target.url().includes(name),
        { timeout }
    )
    const newPage = await target.asPage()
    await newPage.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'dark' },
    ])
    newPage.setDefaultTimeout(timeout)
    if (size) {
        const [width, height] = size.split('x').map((x) => parseInt(x))
        await newPage.setViewport({ width, height })
    }
    if (log) {
        console.debug(`Adding Logger: ${name}`)
        newPage.on('console', (msg) =>
            console.log(`console: ${name}:`, msg.text())
        )
    }
    return newPage
}

/**
 * @function screenshot
 * @global count
 * @global page
 * @param {String} name
 * @return {Promise<void>}
 */
async function screenshot(name) {
    const n = count.toString().padStart(2, '0')
    await page.screenshot({ path: `${screenshotsDir}/${n}_${name}.png` })
    count++
}

async function scrollPage() {
    await page.evaluate(() => {
        window.scrollBy({
            top: window.innerHeight,
            left: 0,
            behavior: 'instant',
        })
    })
    await new Promise((resolve) => setTimeout(resolve, 500))
}

;(async () => {
    fs.rmSync(screenshotsDir, { recursive: true, force: true })
    fs.mkdirSync(screenshotsDir)

    // Get Browser
    browser = await getBrowser()
    console.log('browser:', browser)

    // Get Service Worker
    const worker = await getWorker()
    console.log('worker:', worker)

    const logs = []

    const url = process.argv[2]
    page = await browser.newPage()
    await page.goto(url)
    page.on('console', (msg) => {
        logs.push(msg)
        console.log(`console: ${url}:`, msg.text())
    })
    await page.bringToFront()
    await page.waitForNetworkIdle()

    await worker.evaluate('chrome.action.openPopup();')
    page = await getPage('popup.html', true)
    page.on('console', (msg) => logs.push(msg.text()))
    await page.locator('a[data-filter=""]').click()

    page = await getPage('links.html', true, '768x920')
    page.on('console', (msg) => logs.push(msg.text()))
    await page.waitForNetworkIdle()
    await screenshot('links')

    await browser.close()
    console.log('logs:', logs)
    // for (const msg of logs) {
    //     console.log('msg:', msg.text())
    // }
})()
