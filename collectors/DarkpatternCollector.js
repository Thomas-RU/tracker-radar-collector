const fs = require('fs');
// @ts-ignore
const BaseCollector = require('./BaseCollector');
const puppeteer = require('puppeteer');


class DarkPatternCollector extends BaseCollector {

    id() {
        return 'darkpatterns';
    }

    init() {
        /** @type {DarkPatterns} */ this.darkPatterns;
        /** @type {puppeteer.Page} */ this.page;
        /** @type {string} */ this.url;
    }

    /**
     * @override
     * @param {{cdpClient: import('puppeteer').CDPSession, page: import('puppeteer').Page, url: string, type: import('./TargetCollector').TargetType}} targetInfo 
     */
    addTarget({page, url}) {
        this.page = page;
        this.url = url
    }

    async getData() {
        const delay = (/** @type {number} */ ms) => new Promise(res => setTimeout(res, ms));
        let inputPatterns = fs.readFileSync('../tracker-radar-collector-main/InputData/InputPatterns.txt', {encoding: 'utf8', flag:'r'});
        this.darkPatterns = await processFile(this.page, this.url, inputPatterns);
        delay(10000);
        await this.page.evaluate(() => window.scrollTo(0,document.body.scrollHeight));
        let k = await processFile(this.page, this.url, inputPatterns);
        this.darkPatterns.pattern = this.darkPatterns.pattern.concat(k.pattern);
        return this.darkPatterns;
    }

}

module.exports = DarkPatternCollector;

    /**
     * @param {puppeteer.Page} page
     * @param {string} url
     * @param {string} inputPatterns
     * @returns {Promise<DarkPatterns>}
     */
async function processFile (page, url, inputPatterns) {
    //turn pagetext into lower case
    const pageText = await page.evaluate(() => document.body.innerText);
    let darkPatterns = await processData(inputPatterns, pageText.toLowerCase(), url);
    return darkPatterns;
}
    /**
     * @param {string} content
     * @param {string} pageText
     * @param {string} url
     * @returns {Promise<DarkPatterns>} 
     */
async function processData(content, pageText, url) {
    //checks if darkpatterns are present in body of page
    /** @type {DarkPatterns} */ let result = {url: url, pageText: [pageText], pattern: []};
    if(this.darkPatterns === undefined){
        this.darkPatterns = result;
    } else {
        // @ts-ignore
        result.pageText = result.pageText.concat(this.darkPatterns.pageText);
    }
    const darkpatterns = content.split("\r\n");
    for(const pattern of darkpatterns){
        //easy search easy mistakes
        const phrase = pageText.match(new RegExp(pattern, 'g'));
        if (phrase !== null){
            result.pattern.push(phrase.toString());
        }
    };
    return result;
}

/**
 * @typedef DarkPatterns
 * @property {string} url
 * @property {string[]} pageText
 * @property {string[]} pattern
 */