const React = require('react');
const View = require('./view');
const config = require('nordic/config');
const ImageProvider = require('nordic/image/provider');
const I18nProvider = require('nordic/i18n/I18nProvider');

const imagesPrefix = config.assets.prefix;

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
