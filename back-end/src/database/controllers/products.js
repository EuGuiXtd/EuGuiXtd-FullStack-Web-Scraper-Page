const productService = require('../services/products');

const getProductsAndPostSearch = async (req, res) => {
  const { search, site, category } = req.body;

  const { message, type } = await productService.getProductsAndPostSearch(search, site, category);

  if (type) {
    return res.status(409).json(message);
  }
  return res.status(200).json(message);
};

module.exports = {
    getProductsAndPostSearch,
};