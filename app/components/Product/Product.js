const React = require('react');
const { useRef, useContext } = React;
const PropTypes = require('prop-types');
const Image = require('nordic/image');
const restclient = require('nordic/restclient')({ 
    timeout: 10000, 
    baseURL: '/api' 
});

const Product = ({ i18n, id, title, thumbnail, price, description, setSelectedProducts }) => {
    
    const quantityRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
  
        restclient.get('/getProduct', {
            params: {
                id: e.target.id
            }
        })
          .then(product => {
                setSelectedProducts(products => [...products, {
                    quantity: parseInt(quantityRef.current.value),
                    product: product.data
                }]);
                quantityRef.current.value = '';
          })
          .catch(err => {
            console.log(err)  
            alert('No se pudo agregar el producto.');
          });
    }

    return (
        <li className='card' >
            <figure className="img">
                <Image src={thumbnail} alt={i18n.gettext(title)} lazyload="off" />
            </figure>
            <div className="info-products">
                <h4 className='title-product'>{i18n.gettext(title)} </h4>
                <h3 className='price'>${price}</h3>
                <form id={id} onSubmit={e => handleSubmit(e)}>
                    <label>Cantidad: </label>
                    <input type="number" ref={quantityRef}/>
                    <button type="submit">{i18n.gettext('Agregar al carrito')}</button>
                </form>
                <p>{i18n.gettext(description)}</p>
            </div>
        </li>
    )
}

Product.propTypes = {
    i18n: PropTypes.shape({
        gettext: PropTypes.func.isRequired,
      }).isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    setSelectedProducts: PropTypes.func
}

module.exports = Product;