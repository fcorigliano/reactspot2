const router = require('nordic/ragnar').router();
const productsService = require('../services/productsService');

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    const products = await productsService.getProducts(req.platform.siteId, name, 10, 0)
    products.forEach(async(p) => {
      const description = await productsService.getProductDescription(p.id);
      p.description = description;
    });
    res.json(products);
  } catch(err) {
    res.json([]);
  }
});

module.exports = router;
