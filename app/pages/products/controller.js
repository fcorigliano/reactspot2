const React = require('react');
const View = require('./view');
const config = require('nordic/config');
const ImageProvider = require('nordic/image/provider');
const I18nProvider = require('nordic/i18n/I18nProvider');
// const productsService = require('../../../services/productsService');

const imagesPrefix = config.assets.prefix;

/**
 * En caso de querer implementar SSR en el primer renderizado, 
 * los middlewares fetchProducts y fetchProductsDescription deben
 * estar descomentados y requeridos e implementados en el index de 
 * la page. También habría que descomentar la línea que le envía products 
 * como prop a la view y realizar los cambios detallados en cada
 * archivo que forme parte del flujo.
 */

// exports.fetchProducts = function fetchProducts(req, res, next) {
//   productsService.getProducts(req.platform.siteId, 'celular', 0, 10)
//     .then(products => {
//       res.locals.products = products;
//       next();
//     })
//     .catch(err => next(err));
// }

// exports.fetchProductsDescription = function fetchProductsDescription(req, res, next) {
//   /**
//    * ¿Por qué el Promise.all()?
//    * Porque cada iteración de map devuelve una Promise y 
//    * hay que esperar a que se cumplean todas para seguir
//    * adelante con el pasamanos de middlewares, sino no va
//    * a llegar la info necesaria al render.
//    */
//   let productDescs = res.locals?.products?.map((p) => {
//     productsService.getProductDescription(p.id)
//       .then(description => {
//         p.description = description;
//         return p;
//       })
//   })
//   Promise.all(productDescs)
//     .then(() => {
//       next();
//     })
// }

/* istanbul ignore next */
exports.render = function render(req, res) {
 
/* istanbul ignore next */
  const Products = props => (
    <I18nProvider i18n={req.i18n}>
      <ImageProvider prefix={imagesPrefix}>
        <View {...props} />
      </ImageProvider> 
    </I18nProvider>
  )

  res.render(Products, {
    imagesPrefix,
    translations: req.translations,
    products: res.locals.products 
  }, {
    layoutOptions: {
      staticMarkup: false,
    },
    navigationOptions: {
      type: 'full',
    },
  });
};
