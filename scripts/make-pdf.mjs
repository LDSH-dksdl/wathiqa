import puppeteer from 'puppeteer';
import { pathToFileURL } from 'url';
import path from 'path';

const src = path.resolve('index.html');
const out = path.resolve('wathiqa.pdf');

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto(pathToFileURL(src).href, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await page.emulateMediaType('print');
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' },
});
await browser.close();
console.log('wrote', out);
