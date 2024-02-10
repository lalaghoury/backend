const fs = require("fs");

const unlink = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.log(err);
  });
};

module.exports = { fs, unlink };
