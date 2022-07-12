const React = require('react');
const { useState, useContext } = React;
const PropTypes = require('prop-types');
const Image = require('nordic/image');
const { CartContext } = require('../../context/CartContext');
const restClient = require('nordic/restclient')({ 
    timeout: 10000, 
    baseURL: '/api' 
});

const ProductForContext = ({ i18n, id, title, thumbnail, price, description }) => {
    const [quantity, setQuantity] = useState('');
    const { cartProducts, setCartProducts } = useContext(CartContext);

    const handleChange = e => {
        setQuantity(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let productExists = cartProducts?.some(p => p.product.id == e.target.id)
        if(productExists) {
            setCartProducts(products => products.map(p => {
                if (p.product.id === e.target.id) {
                    let newQuantity = p.quantity + parseInt(quantity);
                    return {
                        ...p,
                        quantity: newQuantity
                    }
                }
                return p;
            }));
            setQuantity('')
        } else {
            restClient.get('/getProduct', {
                params: {
                    id: e.target.id
                }
            })
              .then(product => {
                    setCartProducts(products => [...products, {
                        quantity: parseInt(quantity),
                        product: product.data
                    }]);
                    setQuantity('');
              })
              .catch(err => {
                console.log(err)  
                alert('No se pudo agregar el producto.');
              });
        }
    }

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
                    <input type="number" value={quantity} onChange={handleChange}/>
                    <button type="submit">{i18n.gettext('Agregar al carrito')}</button>
                </form>
                <p>{i18n.gettext(description)}</p>
            </div>
        </li>
    )
}

ProductForContext.propTypes = {
    i18n: PropTypes.shape({
        gettext: PropTypes.func.isRequired,
      }).isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number
}

module.exports = ProductForContext;