const axios = require("axios");
const user = "76d14a7db3";
const password = "jCGuUNhgN4Fw";
var products;

axios({
  method: "get",
  url: "https://api-sandbox.duda.co/api/sites/multiscreen/28aa80cd8a194babadd11e78897c7d15/ecommerce/products",
  auth: {
    username: user,
    password: password,
  },
})
  .then(function (response) {
    products = response.data.results;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: 0,
    data: products,
  });
};
