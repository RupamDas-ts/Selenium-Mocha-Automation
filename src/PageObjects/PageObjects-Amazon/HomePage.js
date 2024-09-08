import Helper from '../../AutomationHelpers/Helper.js';
import Constants from '../../AutomationHelpers/Constants.js';

const pageUrl = "https://www.amazon.in/";
class HomePage extends Helper {
  constructor() {
    super();
    this.url = pageUrl;

    /* ---Locators for Amazon home page--- */
    this.pageHeaderLogo = [Constants.CSS, "div[id='nav-logo'] a"];
    
  }

  async openAmazonHomePage() {
    await this.getUrl(this.url);
  }

  async verifyTheAmazonHomePage() {
    await this.getTextOfSpecificElement()
  }
}