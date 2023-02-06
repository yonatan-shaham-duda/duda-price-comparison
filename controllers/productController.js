const axios = require("axios");
const creds = require("./../dev-data/creds");

const site = require("./siteController");

var sites = site.sites;

var products = [];

const loadProductsBySiteName = (siteName) => {
  axios({
    method: "get",
    url: `https://api-sandbox.duda.co/api/sites/multiscreen/${siteName}/ecommerce/products`,
    auth: {
      username: creds.user,
      password: creds.password,
    },
  })
    .then(function (response) {
      const siteProducts = {
        siteName: siteName,
        results: response.data.results.length,
        products: response.data.results,
      };
      products.push(siteProducts);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const init = async () => {
  sites.forEach((site) => {
    loadProductsBySiteName(site.siteName);
  });
};

init();

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
};
