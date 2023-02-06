exports.getAllCategories = (req, res) => {
  res.status(200).json({
    status: "success",
    results: 0,
    data: {},
  });
};
