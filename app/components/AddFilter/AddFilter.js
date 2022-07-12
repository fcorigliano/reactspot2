const React = require('react');
const PropTypes = require('prop-types');

const AddFilter = ({ i18n, setFilters }) => {
  const [price, setPrice] = React.useState({
    min: '',
    max: ''
  });
  const [category, setCategory] = React.useState('');

  function handlePriceChange(e) {
    setPrice({
      ...price,
      [e.target.name]: e.target.value
    });
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  function handleSubmitPrice(e) {
    e.preventDefault();
    if (price.min || price.max) {
      setFilters(filters => [...filters, e.target.id]);
      setPrice({ min: '', max: '' })
    }
  }

  function handleSubmitCategory(e) {
    e.preventDefault();
    if (category.length > 2) {
      setFilters(filters => [...filters, category]);
    }
    setCategory('');
  }

  return (
    <>
      <form id="precio" onSubmit={e => handleSubmitPrice(e)}>
        <label>
          {i18n.gettext('Rango de Precio')}
          <input 
            type="number" 
            name="min" 
            value={price.min} 
            placeholder="Min" 
            onChange={e => handlePriceChange(e)}
          />
          <input 
            type="number" 
            name="max" 
            value={price.max} 
            placeholder="Max" 
            onChange={e => handlePriceChange(e)}
          />
        </label>
        <button type="submit">{i18n.gettext('Agregar rango de precio')}</button>
      </form>
      <form id="categoria" onSubmit={e => handleSubmitCategory(e)}>
        <label>
          <input 
            type="text" 
            name="category" 
            placeholder="Categoria" 
            value={category} 
            onChange={e => handleCategoryChange(e)}
          />
        </label>
        <button type="submit">{i18n.gettext('Agregar filtro por categoría')}</button>
      </form>
    </>
  );
};

AddFilter.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = AddFilter;
