const React = require('react');
const { useState } = React;



const AddFilter = ({ i18n, price, setPrice, category, setCategory }) => {

	const initialState = {
		max: '',
		min: '',
		category: ''
	}
	const [form, setForm] = useState(initialState)

	const sendNumbersToFilterList = (e) => {
		e.preventDefault();
		setPrice({
			...price,
			max: form.max,
			min: form.min
		})
	}

	const addCategory = (e) => {
		e.preventDefault()
		setCategory([...category, form.category]);
		setForm({ ...form, category: '' })
	}

	const handleForm = (e) => {
		const { name, value } = e.target;

		setForm({ ...form, [name]: value })
	}
	return <>
		<h1>{i18n.gettext('AddFilter')}</h1>

		<form onSubmit={sendNumbersToFilterList}>
			<label htmlFor='min'>
				{i18n.gettext('Min')}
				<input 
					type='number' 
					name='min' 
					id='min'
					placeholder='Min'
					onChange={handleForm} 
				/>
			</label>
			<label htmlFor='max'>
				{i18n.gettext('Max')}
				<input 
					type='number' 
					name='max' 
					id='max'
					placeholder={i18n.gettext('Max')}
					onChange={handleForm} 
				/>
			</label>

			<button type='submit'>{i18n.gettext('agregar rango por precio')}</button>
		</form>

		<form onSubmit={addCategory}>

			<label htmlFor='category'>
			{i18n.gettext('Categoría')}
				<input type='text' 
				name='category' 
				value={form.category} 
				onChange={handleForm} 
				id='category'
				placeholder={i18n.gettext('agregar categoria')}
				/>
			</label>

			<button type='submit'>{i18n.gettext('agregar categoria')}</button>
		</form>
	</>
}


module.exports = AddFilter;