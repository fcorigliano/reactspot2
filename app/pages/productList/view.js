const React = require('react');
const { useEffect, useState, useRef } = React;
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const Image = require('nordic/image');
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
  const [productsCart, setProductsCart] = useState([]);
  const quantityRef = useRef();

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

  const handleSubmit = async (e) => {
      e.preventDefault();

      restClient.get('/getProduct', {
          params: {
              id: e.target.id
          }
      })
        .then(product => {
            setProductsCart(products => [...products, product.data]);
        })
        .catch(err => alert('No se pudo agregar el producto.'));
  }

  console.log(productsCart)
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
              const { id, title, thumbnail, price, description } = p;

              return (
                <li key={id} className='card' >
                    <figure className="img">
                        <Image src={thumbnail} alt={i18n.gettext(title)} lazyload="off" />
                    </figure>
                    <div className="info-products">
                        <h4 className='title-product'>{i18n.gettext(title)} </h4>
                        <h3 className='price'>${price}</h3>
                        <form id={id} onSubmit={e => handleSubmit(e)}>
                            <label>Cantidad: </label>
                            <input type="number" ref={quantityRef}/>
                            <button type="submit">Agregar al carrito</button>
                        </form>
                        <p>{description}</p>
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
