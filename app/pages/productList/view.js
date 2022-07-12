const React = require('react');
const { useEffect, useState } = React;
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const Product = require('../../components/Product');
const restClient = require('nordic/restclient')({ 
  timeout: 10000, 
  baseURL: '/api' 
});

function View(props) {
  const { i18n, translations, imagesPrefix } = props;
  const preloadedState = {
    i18n,
    translations,
    imagesPrefix,
  };

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
      restClient.get('/getProducts', {
        params: {
          name: 'celular',
        }
      })
      .then(data => {
        setProducts(data.data);
      });    
  }, []);

  console.log(selectedProducts);
  
  return (
    <div className="demo">

      <Head>
        <title>
          producList Page
        </title>
      </Head>

      <Style href="productList.css" />
      <Script>
        {`
           window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
           console.log('Product List page is loaded!');
         `}
      </Script>
      <Script src="vendor.js" />
      <Script src="productList.js" />

      <h1>productList</h1>
      <ol>
        {
          products?.length
            ? products.map(p => (
              <Product 
                key={p.id}
                i18n={i18n}
                id={p.id}
                title={p.title}
                thumbnail={p.thumbnail}
                price={p.price}
                description={p.description}
                setSelectedProducts={setSelectedProducts}
              />
            ))
            : <h4>{i18n.gettext('No se encontraron productos.')}</h4>
        }
      </ol>
    </div>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({}),
};

View.defaultProps = {
  translations: {},
  imagesPrefix: '/',
};


module.exports = injectI18n(View);
