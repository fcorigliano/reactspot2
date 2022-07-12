const React = require('react');
const { useEffect, useState, useContext } = React;
const { CartContext } = require('../../context/CartContext');
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const Product = require('../../components/Product');
const Cart = require('../../components/Cart');
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

  const { cartProducts } = useContext(CartContext);
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
      restClient.get('/getProducts', {
        params: {
          name: 'celular',
        }
      })
      .then(data => {
        setProducts(data.data)
      });    
  }, []);
  
  return (
    <div className="demo">

      <Head>
        <title>
          productContext Page
        </title>
      </Head>

      <Style href="productsContext.css" />
      <Script>
        {`
           window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
           console.log('Products Context page is loaded!');
         `}
      </Script>
      <Script src="vendor.js" />
      <Script src="productsContext.js" />

      <h1>productsContext</h1>

      {
        cartProducts.length
        ? <Cart i18n={i18n} />
        : null
      }
      
      <ol>
        {
          products.length
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
    </div>
  );
}


module.exports = injectI18n(View);
