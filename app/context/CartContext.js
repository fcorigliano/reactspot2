const React = require('react');
const { useState, createContext } = React;
const CartContext = createContext();

function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    return(
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
            { children }
        </CartContext.Provider>
    )
}

module.exports = { CartContext, CartProvider }