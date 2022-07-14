const React = require('react');
const { useEffect, useState } = React;
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const Pagination = require('../../components/Pagination');
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
  const [limit, setLimit] = useState(10);

  useEffect(() => {
      restClient.get('/getProducts', {
        params: {
          name: 'celular',
          limit
        }
      })
      .then(data => {
        setProducts(data.data);
      });    
  }, []);
  
  return (
    <section className="demo">

      <Head>
        <title>
          products Page
        </title>
      </Head>

      <Style href="products.css" />
      <Script>
        {`
           window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
           console.log('Products page is loaded!');
         `}
      </Script>
      <Script src="vendor.js" />
      <Script src="products.js" />

      <h1>products</h1>

      <Pagination i18n={i18n} setProducts={setProducts} limit={limit}/>

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
              />
            ))
            : <h4>{i18n.gettext('No se encontraron productos.')}</h4>
        }
      </ol>
    </section>
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
