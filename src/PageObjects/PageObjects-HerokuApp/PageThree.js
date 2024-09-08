import Constants from '../../AutomationHelpers/Constants.js';

const pageThreeUrl = "https://the-internet.herokuapp.com/hovers";

class HoverFunctionality{
  constructor(helper) {
    this.helper = helper;
    this.url = pageThreeUrl;

    /* ---Locators for Hover functionality check page--- */
    this.header = [Constants.TAGNAME, "h3"];
    this.lastImage = [Constants.CSS, ".figure:nth-of-type(3)"];
    this.onHoverCaption = [Constants.XPATH, "(//div[@class='figcaption'])[3]/h5"];
  }

  async openHoverPage(){
    await this.helper.getUrl(this.url);
  }

  async performActionsHoverPage() {
    await this.helper.hoverOnElement(this.lastImage);
  }

  async verifyMouseHoverSuccessful(){
    return await this.helper.isDisplayed(this.onHoverCaption);
  }
}

export default HoverFunctionality;