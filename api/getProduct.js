const router = require('nordic/ragnar').router();
const productsService = require('../services/productsService');

router.get('/', (req, res) => {
    const { id } = req.query;

    productsService.getProduct(id)
        .then(product => res.json(product))
        .catch(err => res.send('No se encontró el producto.'));
});

module.exports = router;