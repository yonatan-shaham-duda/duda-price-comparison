const axios = require("axios");
const { group } = require("console");
const creds = require("./../dev-data/creds");

const site = require("./siteController");

var sites = site.sites;

var products = [];
var flatProducts = [];

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
      products.push(siteProducts);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const loadAllProducts = async () => {
  await sites.forEach(async (site) => {
    loadProductsBySiteName(site);
  });
};

const flattenProducts = (products) => {
  var list = [];
  if (flatProducts.length === 0) {
    products.forEach((site) => {
      site.products.forEach((product) => {
        var flatten = product;
        flatten.siteName = site.siteName;
        flatten.siteUrl = site.baseUrl;
        flatten.absolutPath =
          site.baseUrl + "product/" + product.seo.product_url;
        flatten.storeUrl = site.baseUrl;
        flatten.businessName = site.businessName;
        list.push(flatten);
      });
    });
    flatProducts = list;
  } else {
    list = flatProducts;
  }
  return list;
};

const groupProductsByName = (flatProducts) => {
  var list = [];
  flatProducts.forEach((product) => {
    var productGroup = list.find((element) => element.name === product.name);
    if (productGroup !== undefined) {
      productGroup.products.push(product);
    } else {
      var newGroup = {
        name: product.name,
        products: [product],
      };
      list.push(newGroup);
    }
  });
  return list;
};

const sortProductsInGroup = (products) => {
  var temp = products.sort((p1, p2) =>
    p1.prices[0].price < p2.prices[0].price ? -1 : 1
  );
  temp.forEach((product) => {
    product.orderByPrice = temp.indexOf(product);
  });
  return temp;
};

const compareProducts = (flatProducts) => {
  var temp = groupProductsByName(flatProducts);
  temp.forEach((group) => {
    group.products = sortProductsInGroup(group.products);
  });
  temp.forEach((group) => {
    const cheapestProduct = group.products.find((e) => e.orderByPrice === 0);
    group.cheapest = {
      price: cheapestProduct.prices[0].price,
      url: cheapestProduct.absolutPath,
      businessName: cheapestProduct.businessName,
    };
  });
  return temp;
};

const init = async () => {
  await loadAllProducts();
  console.log("Products loaded.");
};

init();

exports.getRawProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
};

exports.getFlatProducts = (req, res) => {
  const result = flattenProducts(products);
  res.status(200).json({
    status: "success",
    results: result.length,
    data: result,
  });
};

exports.getComaredProducts = (req, res) => {
  const result = compareProducts(flattenProducts(products));
  res.status(200).json({
    status: "success",
    results: result.length,
    data: result,
  });
};

const renderProductList = (req, res) => {
  res
    .status(200)
    .render("home", { groups: compareProducts(flattenProducts(products)) });
};

exports.getAllProducts = (req, res) => {
  renderProductList(req, res);
};

exports.getAProduct = (req, res) => {
  const groups = compareProducts(flattenProducts(products));
  const group = groups.find(
    (e) => e.products[0].seo.product_url === req.params.productSlug
  );
  res.status(200).render("productList", { group: group });
};
