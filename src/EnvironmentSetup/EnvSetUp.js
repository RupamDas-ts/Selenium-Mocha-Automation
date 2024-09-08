import fs from 'fs';
import Constants from '../AutomationHelpers/Constants.js';

class EnvSetUp {
  static initialized = false;

  static {
    if (!EnvSetUp.initialized) {
      const userConfigData = JSON.parse(fs.readFileSync(Constants.USER_CONFIG_FILE_PATH, 'utf-8'));
      process.env.USER_NAME = userConfigData.userName;
      process.env.ACCESS_KEY = userConfigData.accessKey;
      process.env.HUB_URL = userConfigData.hubUrl;
      EnvSetUp.initialized = true;
    }
  }
}

export default EnvSetUp;