const React = require('react');
const Forms = require('../view');
const { render, screen, fireEvent } = require('@testing-library/react');
const { getByLabelText, getByRole, getByText, getAllByRole, getByPlaceholderText } = screen;

describe('Forms View', () => {
	let component;
	let i18n = { gettext: text => text }

	let inputMax;
	let inputMin;
	let inputName;
	let inputTextarea;
	let buttonSubmit_1;
	let buttonSubmit_0;
	
	beforeEach(() => {
		component = render(<Forms i18n={i18n} />);
		inputMax = getByLabelText(/max/i);
		inputMin = getByLabelText(/min/i);
		buttonSubmit_1 = getAllByRole('button')[1];
		buttonSubmit_0 = getAllByRole('button')[0];
		inputName = getByPlaceholderText(/tu nombre/i);
		inputTextarea = getByPlaceholderText(/comentario/i);
	})
	it('<Forms/>', () => {
		const { asFragment } = component;
		expect(asFragment()).toMatchSnapshot();
	});
	it('2) A- AddFilter debe agregar rango de precio correctamente', () => {

		fireEvent.change(inputMax, { target: { value: 200 } });
		fireEvent.change(inputMin, { target: { value: 100 } });
		fireEvent.click(buttonSubmit_0);

		const range = getByText('$100 - $200');

		expect(Number(inputMin.value)).toBe(100);
		expect(Number(inputMax.value)).toBe(200);
		expect(range).toBeInTheDocument();
	})

	it('2) B- AddFilter debe agregar una categoria correctamente',()=>{
		
		const inputCategory = getByLabelText(/categoría/i);
		fireEvent.change(inputCategory, {target:{value: 'home'}});
		expect(inputCategory.value).toBe('home');
		fireEvent.click(buttonSubmit_1);
		const addedCategory = getByText('home');
		expect(addedCategory).toBeInTheDocument();
	})

	

	
	describe('3) Filter List',()=>{
		it("El botón 'Borrar categoría' debería eliminar la categoría seleccionada",()=>{
			const inputCategory = getByLabelText(/categoría/i);
			
			fireEvent.change(inputCategory, {target:{value: 'home'}});
			fireEvent.click(buttonSubmit_1);
	
			const regex = new RegExp(/borrar categoría/,'i');
			const deleteButton = getByText(regex);
			const addedCategory = getByText('home');
			
			expect(addedCategory).toBeInTheDocument();
			fireEvent.click(deleteButton);
			expect(addedCategory).not.toBeInTheDocument();
		})

		it("El botón 'borrar precio' deberia resetar a 0 los rangos de min y max",()=>{
	
			fireEvent.change(inputMax, { target: { value: 200 } });
			fireEvent.change(inputMin, { target: { value: 100 } });
			fireEvent.click(buttonSubmit_0);
	
			const range = getByText('$100 - $200');
			expect(range).toBeInTheDocument();
			
			const regex = new RegExp(/(B)orrar precio/,'i');
			const deleteButton = getByText(regex);
			expect(deleteButton).toBeInTheDocument();
			fireEvent.click(deleteButton);
			
			const reset = getByText('$0 - $0');
			expect(reset).toBeInTheDocument();
		})
	})
	describe('Debe existir un formulario donde poder dejar feedback',()=>{

		it('Debe existir un input donde poder cargar el nombre del usuario',()=>{
			fireEvent.change(inputName,{target:{value:'Benito'}});
			expect(inputName.value).toBe('Benito');
			
		})
		it('Debe existir un textarea donde poder cargar el feedback del usuario',()=>{
			const comment = 'Este es mi comentario';
			fireEvent.change( inputTextarea,{ target: { value: comment } } );
			expect( inputTextarea.value ).toBe( comment );
		})
		it('Al hacer submit, deben renderizarse ambos mensajes ',()=>{
			fireEvent.change(inputName,{target:{value:'Benito'}});
			
			const comment = 'Este es mi comentario';
			fireEvent.change( inputTextarea,{ target: { value: comment } } );
			const submitButton = getAllByRole('button')[3];
			fireEvent.click(submitButton);

			expect(inputName).toBeInTheDocument();
			expect(inputTextarea).toBeInTheDocument();
		})
	})
})