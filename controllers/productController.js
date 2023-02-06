const axios = require("axios");
const creds = require("./../dev-data/creds");

const site = require("./siteController");

var sites = site.sites;

var products = [];

const loadProductsBySiteName = (site) => {
  axios({
    method: "get",
    url: `https://api-sandbox.duda.co/api/sites/multiscreen/${site.siteName}/ecommerce/products`,
    auth: {
      username: creds.user,
      password: creds.password,
    },
  })
    .then(function (response) {
      const siteProducts = {
        siteName: site.siteName,
        baseUrl: site.url,
        results: response.data.results.length,
        products: response.data.results,
      };
      //console.log(siteProducts);
      products.push(siteProducts);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const loadAllProducts = () => {
  sites.forEach((site) => {
    loadProductsBySiteName(site);
  });
};

const init = async () => {
  loadAllProducts();
};

init();

exports.getRawProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
};

exports.getAllProducts = (req, res) => {
  var list = [];
  products.forEach((site) => {
    site.products.forEach((product) => {
      console.log(site);
      var listItem = product;
      listItem.siteName = site.siteName;
      listItem.absolutPath =
        site.baseUrl + "product/" + product.seo.product_url;
      list.push(listItem);
    });
  });
  res.status(200).json({
    status: "success",
    results: list.length,
    data: list,
  });
};
