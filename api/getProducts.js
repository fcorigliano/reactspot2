const router = require('nordic/ragnar').router();
const productsService = require('../services/productsService');

router.get('/', async (req, res) => {
  const { name, offset, limit } = req.query;

  try {
    const products = await productsService.getProducts(
      req.platform.siteId, 
      name, 
      offset ? offset : 0, 
      limit ? limit : 10);
    const productDescs = await products.map(async(p) => {
      const description = await productsService.getProductDescription(p.id);
      p.description = description;
      return p;
    })
    const productsFull = await Promise.all(productDescs);
    res.json(productsFull);
  } catch(err) {
    res.json([]);
  }    
});
  
module.exports = router;
