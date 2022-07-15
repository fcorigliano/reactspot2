const React = require('react');

const FilterList = ({ category, setCategory, price ,setPrice, i18n}) => {

	const deleteFilter = (name) => {
		const filtered = category.filter(x => x !== name)
		name == 'price' ?  
			setPrice({min:0,max:0})
		: setCategory(filtered)
	}
	return <>
		<h1>{i18n.gettext('FilterList')}</h1>
		{
			category.length ? category.map(categoria => {
				return (
					<div key={categoria}>
						<h3>{categoria}</h3>
						<button onClick={() => deleteFilter(categoria)}>
							{i18n.gettext('Borrar categoría')}
						</button>
					</div>
				)
			}) : null
		}
		<p>${price?.min} - ${price?.max}</p>
		<button 
			onClick={() => deleteFilter('price')}>
			{i18n.gettext('Borrar precio')}
		</button>
	</>
}



module.exports = FilterList;