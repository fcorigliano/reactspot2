const React = require('react');
const I18nProvider = require('nordic/i18n/I18nProvider');
const View = require('./view');


exports.render = function render(req, res) {
  const Form = props => (
    <I18nProvider i18n={req.i18n}>
        <View {...props} />
    </I18nProvider>
  );

  res.render(Form, {
    translations: req.translations,
  }, {
    layoutOptions: {
      staticMarkup: false,
    },
    navigationOptions: {
      type: 'full',
    },
  });
};