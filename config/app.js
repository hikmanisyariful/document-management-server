require("dotenv").config();

module.exports = {
  appKey: process.env.APP_KEY,
  appUrl: process.env.APP_URL,
  appPort:
    process.env.NODE_ENV === "production"
      ? process.env.APP_PORT_PROD
      : process.env.APP_PORT_DEV,
};
