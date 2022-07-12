const router = require('nordic/ragnar').router();
const getProducts = require('./getProducts');
const getProduct = require('./getProduct');

router.use('/getProducts', getProducts);
router.use('/getProduct', getProduct);

module.exports = router;
