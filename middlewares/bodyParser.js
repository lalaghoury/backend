const bodyParser = require("body-parser");

const useBodyParser = (app) => {
  app.use(bodyParser.json());
};

module.exports = useBodyParser;
