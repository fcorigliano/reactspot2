const React = require('react');
const { useState, useEffect } = require('react');
const PropTypes = require('prop-types');
const restclient = require('nordic/restclient')({ 
    timeout: 10000, 
    baseURL: '/api' 
});

const Pagination = ({ i18n, setProducts, limit }) => {
    const [offset, setOffset] = useState(0);

    const handlePrev = () => {
        if (offset > 0) {
            setOffset(offset => offset - limit)
        }
    }

    const handleNext = () => {
        setOffset(offset => offset + limit)
    }
    
    useEffect(() => {
        // restclient.get('/getProducts?hola=si&chau=no&offsets=12', {
        restclient.get('/getProducts', {
            params: {
                name: 'celular',
                offset
            }
        })
            .then(products => {
                setProducts(products.data);
            })
    }, [offset]);
    
    return (
        <nav>
            <ul>
                <li>
                    <button disabled={offset == 0} onClick={handlePrev}>{i18n.gettext('Anterior')}</button>
                </li>
                <li>
                    <button onClick={handleNext}>{i18n.gettext('Siguiente')}</button>
                </li>
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    i18n: PropTypes.shape({
        gettext: PropTypes.func.isRequired,
      }).isRequired
}

module.exports = Pagination;