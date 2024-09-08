import Constants from '../../AutomationHelpers/Constants.js';
import { logger } from '../../Utils/Logger.js';
import fs from 'fs';
import path from 'path';

const pageTwoUrl = "https://the-internet.herokuapp.com/upload";

class FileUploadPage {
  constructor(helper) {
    this.helper = helper;
    this.url = pageTwoUrl;

    /* ---Locators for file upload page--- */
    this.header = [Constants.TAGNAME, "h3"];
    this.chooseFileButton = [Constants.ID,"file-upload"];
    this.submitButton = [Constants.ID,"file-submit"];
  }

  async openFileUploadUrl() {
    await this.helper.getUrl(this.url);
    let pageHeading = this.helper.getTextOfSpecificElement(this.header);
    logger.info(`Page Heading: ${pageHeading}`);
    return pageHeading;
  }
  async uploadFile(){
    try {
      logger.info(`File exist status: ${fs.existsSync(Constants.SAMPLE_IMAGE_PATH)}`);
      const file = path.resolve(Constants.SAMPLE_IMAGE_PATH);
      await this.helper.sendKeysToElement(this.chooseFileButton, file);
      await this.helper.clickOnElement(this.submitButton);
    }catch (error) {
      logger.error(`Failed to read file or send keys: ${error}`);
      throw error;
    }
  }
  async uploadFileStatus(){
    const pageHeading = await this.helper.getTextOfSpecificElement(this.header);
    logger.info(`After upload page heading: ${pageHeading}`);
    return pageHeading;
  }
}

export default FileUploadPage;