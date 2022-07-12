const React = require('react');
const PropTypes = require('prop-types');

const FilterList = ({ i18n, filters, setFilters }) => {

  const handleDelete = (f) => {
    setFilters(filters.filter(filter => filter !== f))
  }

  return (
    <>
        <h2>{i18n.gettext('Filtros')}</h2>
        <ul>
          {
            filters.map((f, i) => (
              <li key={i}>
                <span>{i18n.gettext(f)}</span>
                <button onClick={() => handleDelete(f)}>X</button>
              </li>
            ))
          }
        </ul>
    </>
  );
};

FilterList.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = FilterList;
