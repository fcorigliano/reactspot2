const React = require('react');
const Script = require('nordic/script');
const { injectI18n } = require('nordic/i18n');
const serialize = require('serialize-javascript');
const PropTypes = require('prop-types');


const View = ({ i18n, translations }) => {
  const preloadedState = {
    i18n,
    translations,
  };

  return (<>
    <Script>
      {`
           window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
           console.log('Products page is loaded!');
         `}
    </Script>
    <Script src="vendor.js" />
    <Script src="registryForm.js" />
    <h1>{i18n.gettext('Form')}</h1>
    <button onClick={() => alert('holi')}>click</button>
          </>);
};


View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({}),
};
View.defaultProps = {
  translations: {},
};

module.exports = injectI18n(View);
