const React = require('react');
const View = require('./view');
const config = require('nordic/config');
const ImageProvider = require('nordic/image/provider');
const I18nProvider = require('nordic/i18n/I18nProvider');
const { CartProvider } = require('../../context/CartContext');

const imagesPrefix = config.assets.prefix;

/* istanbul ignore next */
exports.render = function render(req, res) {
 
/* istanbul ignore next */
  const ProductsContext = props => (
    <I18nProvider i18n={req.i18n}>
      <ImageProvider prefix={imagesPrefix}>
        <CartProvider>
          <View {...props} />
        </CartProvider>
      </ImageProvider> 
    </I18nProvider>
  )

  res.render(ProductsContext, {
    imagesPrefix,
    translations: req.translations 
  }, {
    layoutOptions: {
      staticMarkup: false,
    },
    navigationOptions: {
      type: 'full',
    },
  });
};
