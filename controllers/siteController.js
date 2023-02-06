const fs = require("fs");

const sites = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/sites.json`)
);

exports.sites = sites;
