const React = require('react');
const Script = require('nordic/script');
const { injectI18n } = require('nordic/i18n');
const serialize = require('serialize-javascript');
const PropTypes = require('prop-types');
const { useState } = React;


const View = ({ i18n, translations }) => {
  const preloadedState = {
    i18n,
    translations,
  };

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { id, value } = e.target;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(id === 'phone' && value.trim().length < 10){
      setErrors({
        ...errors,
        [id]: 'El teléfono debe tener al menos 10 números'
      })
    } else if(id === 'email' && !value.match(validRegex)) {
      setErrors({
        ...errors,
        [id]: 'Debe ingresar un email válido'
      })
    }
    else{
      setErrors({
        ...errors,
        [id]: ''
      })
    }
  }

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
    <form>
      <label htmlFor='phone'>Celular</label>
      <input id='phone' name='phone' type='tel' onBlur={handleInput} />
      {errors.phone && <span style={{color: 'red'}}>{errors.phone}</span>}

      <label htmlFor='email'>Email</label>
      <input id='email' name='email' type='email' onBlur={handleInput} />
      {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
    </form>
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
