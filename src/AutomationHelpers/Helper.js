import { By, until, Builder } from 'selenium-webdriver';
import fs from 'fs';
import {logger} from '../Utils/Logger.js';
import Constants from './Constants.js';
import '../EnvironmentSetup/EnvSetUp.js';

// Load test configuration with error handling
let testConfig;
try {
  testConfig = JSON.parse(fs.readFileSync(Constants.TEST_CONFIG_FILE_PATH, 'utf-8'));
} catch (error) {
  logger.error('Failed to load test configuration:', error);
  process.exit(1); // Exit the process if the configuration file cannot be loaded
}
const browserName = testConfig['LT:Options'].browserName;

// Build the Selenium WebDriver
const hubUrl = `https://${process.env.USER_NAME}:${process.env.ACCESS_KEY}@${process.env.HUB_URL}`;
logger.info("hubUrl: " + hubUrl);
logger.info("testConfig: " + JSON.stringify(testConfig, null, 2));

const testDriver = new Builder()
  .usingServer(hubUrl)
  .withCapabilities(testConfig)
  .forBrowser(browserName)
  .build();

class Helper {
  constructor() {
    this.driver = testDriver;
    this.action = this.driver.actions();
  }

  async quit() {
    try {
      await this.driver.quit();
    }catch(err) {
      logger.error(`Unable to quit the session. Error: ${err.message}`);
    }
  }


  async getElement (locator, timeout = 10000){
    if (locator.length < 2) throw new Error(`Invalid locator. Locator object ${locator}`);

    const [method, path] = locator;
    const strategies = {
      id: By.id,
      name: By.name,
      css: By.css,
      class: By.className,
      xpath: By.xpath,
      tagName: By.tagName,
    };

    const locateBy = strategies[method];

    if (!locateBy) {
      logger.error(`Invalid locator method: ${method}.\nSupported methods: ${strategies}`)
      throw new Error(`Invalid locator method: ${method}`);
    }

    const element = await this.driver.wait(until.elementLocated(locateBy(path)), timeout);
    return this.driver.wait(until.elementIsVisible(element), timeout);
  }

  async getUrl(url){
    logger.info(`Opening url: ${url}`);
    await this.driver.get(url);
  }

  async sendKeysToElement(driver= this.driver, locator, keys){
    logger.info(`Locator to send keys: ${locator}, keys: ${keys}`);
    let element = await this.getElement(driver, locator);
    await element.sendKeys(keys);
  }

  async getTextOfSpecificElement(locator) {
    logger.info(`Locator to get text: ${locator}`);
    let element = await this.getElement(locator);
    let text = await element.getText();
    logger.info(`Received text: ${text}`);
    return text;
  }

  async clickOnElement(locator) {
    logger.info(`Locator to click: ${locator}`);
    let element = await this.getElement(locator);
    await element.click();
  }

  async hoverOnElement(locator) {
    let element = await this.getElement(locator);
    try{
      await this.action.move({ origin: element }).perform();
    }catch(err){
      logger.error(`Unable to move element: ${locator}`);
      throw err;
    }
  }

  async isDisplayed(locator) {
    let status = false;
    try {
      let element = await this.getElement(locator);
      status = await element.isDisplayed();
    }catch(err){
      logger.error(`Element is not displayed: ${locator}`);
    }
    return status;
  }

  async getAttributeValue(locator, attribute) {
    return await (await this.getElement(locator)).getAttribute(attribute);
  }

  async executeJS(script) {
    if(script){
      await this.driver.executeScript(script);
    }else{
      logger.error(`Invalid script ${script}`);
      throw new Error(`Invalid Script ${script}`);
    }
  }

  async scrollToBottomOfThePage(){
    const script = "window.scrollTo(0, document.body.scrollHeight)";
    await this.executeJS(script);
  }
}

export default Helper;
