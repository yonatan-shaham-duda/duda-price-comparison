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

const renderProductList = (req, res) => {
  var list = [];
  products.forEach((site) => {
    site.products.forEach((product) => {
      var flatten = product;
      flatten.siteName = site.siteName;
      flatten.siteUrl = site.baseUrl;
      flatten.absolutPath = site.baseUrl + "product/" + product.seo.product_url;
      list.push(flatten);
    });
  });
  res.status(200).render("home", { products: list });
};

exports.getAllProducts = (req, res) => {
  renderProductList(req, res);
};
