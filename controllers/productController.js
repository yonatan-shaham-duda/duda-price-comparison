const axios = require("axios");
const creds = require("./../dev-data/creds");

const site = require("./siteController");

var sites = site.sites;

var products = [];
var flatProducts = [];
var productsCompared = [];

const addToCompared = (product) => {
  var productGroup = productsCompared.find((element) => element.name);
  if (productGroup) {
    productGroup.push(product);
  } else {
    var newGroup = [product];
    productsCompared.push(newGroup);
  }
  console.log(productsCompared);
};

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
        businessName: site.businessName,
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

const flattenProducts = () => {
  var list = [];
  products.forEach((site) => {
    site.products.forEach((product) => {
      var flatten = product;
      flatten.siteName = site.siteName;
      flatten.siteUrl = site.baseUrl;
      flatten.absolutPath = site.baseUrl + "product/" + product.seo.product_url;
      flatten.storeUrl = site.baseUrl;
      flatten.businessName = site.businessName;
      list.push(flatten);
    });
  });
  flatProducts = list;
};

const init = async () => {
  loadAllProducts();
  flattenProducts();
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
  res.status(200).render("home", { products: flattenProducts });
};

exports.getAllProducts = (req, res) => {
  renderProductList(req, res);
};
