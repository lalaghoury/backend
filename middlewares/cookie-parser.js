const cookiieParser = require("cookie-parser");

const useCookieParser = (app) => {
  app.use(cookiieParser());
};

module.exports = useCookieParser;
