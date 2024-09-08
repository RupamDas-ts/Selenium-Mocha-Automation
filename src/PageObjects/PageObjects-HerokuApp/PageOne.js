import Constants from '../../AutomationHelpers/Constants.js';
import { logger } from '../../Utils/Logger.js';

const pageOneUrl = "https://the-internet.herokuapp.com/checkboxes";

class CheckBoxPage {
  constructor(helper) {
    this.helper = helper;
    this.url = pageOneUrl;

    /* ---Locators for checkbox page--- */
    this.header = [Constants.TAGNAME, "h3"];
    this.firstCheckBox = [Constants.CSS, "input[type='checkbox']:nth-of-type(1)"];
    this.secondCheckBox = [Constants.CSS, "input[type='checkbox']:nth-of-type(2)"];
  }

  async openCheckBoxPage() {
    await this.helper.getUrl(this.url);
  }

  async performActionsCheckBoxPage() {
    const pageHeading = await (await this.helper.getElement(this.header, Constants.SMALL_WAIT)).getText();
    logger.info(`Page Heading: ${pageHeading}`);

    // const firstCheckBox = await this.getElement(this.driver, this.firstCheckBox, Constants.SMALL_WAIT);
    let isFirstChecked = Boolean(await this.helper.getAttributeValue(this.firstCheckBox,'checked'));
    logger.info(`Status before click: ${isFirstChecked}`);

    // await (await this.getElement(this.driver, this.firstCheckBox, Constants.SMALL_WAIT)).click();
    await this.helper.clickOnElement(this.firstCheckBox);

    isFirstChecked = Boolean(await this.helper.getAttributeValue(this.firstCheckBox,'checked'));
    logger.info(`Status after click: ${isFirstChecked}`);

    return isFirstChecked;
  }
}

export default CheckBoxPage;