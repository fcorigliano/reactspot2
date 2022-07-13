const React = require('react');
const { useContext } = React;
const PropTypes = require('prop-types');
const { CartContext } = require('../../context/CartContext');

const Cart = ({ i18n }) => {
    const { cartProducts } = useContext(CartContext);

    // console.log(cartProducts)
    return (
        <>
            <h1>Cart</h1>
            <ul>
                {
                    cartProducts?.length 
                    ? cartProducts.map(p => (
                        <li data-testid={p.product.id} key={p.product.id}>
                            <h2>{i18n.gettext(p.product.title)}</h2>
                            <span>{p.quantity}</span>
                        </li>
                    ))
                    : null
                }
            </ul>
        </>
    )
}

Cart.propTypes = {
    i18n: PropTypes.shape({
        gettext: PropTypes.func.isRequired,
    }).isRequired,
}

module.exports = Cart;
