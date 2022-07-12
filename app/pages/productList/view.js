const React = require('react');
const { useEffect, useState } = React;
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const Image = require('nordic/image');
const restClient = require('nordic/restclient')({ 
  timeout: 5000, 
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

  useEffect(() => {
      restClient.get('/getProducts', {
        params: {
          name: 'celular',
        }
      })
      .then(data => {
        setProductList(data.data)
      });    
  }, []);

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
           console.log('Products page is loaded!');
         `}
      </Script>
      <Script src="vendor.js" />
      <Script src="productList.js" />

      <h1>productList</h1>
      <ol>
        {
          products.length
            ? products.map(p => {
              const { id, title, thumbnail, price, permalink } = p;

              return (
                <li key={id} className='card' >
                    <figure className="img">
                        <Image src={thumbnail} alt={i18n.gettext(title)} lazyload="off" />
                    </figure>
                    <div className="info-products">
                        <h4 className='title-product'>{i18n.gettext(title)} </h4>
                        <h3 className='price'>${price}</h3>
                    </div>
                </li>
              )
            })
            : <h4>{i18n.gettext('No se encontraron productos.')}</h4>
        }
      </ol>
    </div>
  );
}


module.exports = injectI18n(View);
