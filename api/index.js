const router = require('nordic/ragnar').router();
const getProducts = require('./getProducts');

router.use('/getProducts', getProducts);

module.exports = router;
