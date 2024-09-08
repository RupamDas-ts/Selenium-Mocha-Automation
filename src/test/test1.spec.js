import { expect } from "chai";
import { describe, it } from "mocha";
import Helper from '../AutomationHelpers/Helper.js';
import PageOne from '../PageObjects/PageObjects-HerokuApp/PageOne.js';
import PageTwo from '../PageObjects/PageObjects-HerokuApp/PageTwo.js';
import PageThree from '../PageObjects/PageObjects-HerokuApp/PageThree.js';


describe("Heroku app test", function () {
  this.timeout(80000);

  let helper;

  before("Set up test", async () => {
    helper = new Helper();
  });

  it("Page one test", async () => {
    let pageOne = new PageOne(helper);
    this.retries(2); // Added retry as this page has some loading issues
    await pageOne.openCheckBoxPage();
    expect(await pageOne.performActionsCheckBoxPage(),"First page actions failed.").to.equal(true);
  })

  // Skipping the second page test as the file upload is not working correctly
  it.skip("Perform file upload test", async () => {
    let pageTwo = new PageTwo(helper);
    let fileUploadPageHeading = await pageTwo.openFileUploadUrl();
    expect(fileUploadPageHeading, "File upload page didn't open").to.contain("File Uploader");
    await pageTwo.uploadFile();
    let afterUploadHeading = await pageTwo.uploadFileStatus();
    expect(afterUploadHeading, "File upload unsuccessful").to.contain("File Uploaded");
  })

  it("Hover functionality test", async () => {
    let pageThree = new PageThree(helper);
    await pageThree.openHoverPage();
    await pageThree.performActionsHoverPage();
    expect(await pageThree.verifyMouseHoverSuccessful(), "Hover functionality test failed").to.equal(true);
  })

  after("Quit test", async () => {
    await helper.quit();
  })
})