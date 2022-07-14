const React = require('react');
const RegistryFormView = require('../view');
const { render, screen, fireEvent } = require('@testing-library/react');

describe('La view de Registry Form', () => {
    let component;
    const i18n = { gettext: text => text };
    
    beforeEach(() => {
        component = render(<RegistryFormView i18n={i18n}/>);
    });

    it('1) Renderiza', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });

    it('2) Renderiza un formulario con un campo para `Celular`', () => {
        const input = screen.getByLabelText(/celular/i);
        expect(input).toBeInTheDocument();
    });

    it('3) Renderiza un formulario con un campo para `Email`', () => {
        const input = screen.getByLabelText(/email/i);
        expect(input).toBeInTheDocument();
    });

    it('4) Muestra un mensaje de error cuando se ingresa un número de celular con menos de 10 dígitos y se remueve el foco del campo', () => {
        const input = screen.getByLabelText(/celular/i);
        fireEvent.change(input, { target: { value: 34534 }});
        fireEvent.blur(input);
        const error = screen.getByText(/el teléfono debe tener al menos 10 números/i);
        expect(error).toBeInTheDocument();
    });

    it('5) Elimina el mensaje de error cuando el campo `Celular` cumple con los requisitos', () => {
        const input = screen.getByLabelText(/celular/i);
        fireEvent.change(input, { target: { value: 34534 }});
        fireEvent.blur(input);
        fireEvent.change(input, { target: { value: 1561354235 }});
        fireEvent.blur(input);
        const error = screen.queryByText(/el teléfono debe tener al menos 10 números/i);
        expect(error).toBeNull();
    });

    it('6) Muestra un mensaje de error cuando se ingresa un formato de email inválido y se remueve el foco del campo', () => {
        const input = screen.getByLabelText(/email/i);
        fireEvent.change(input, { target: { value: 'andres@' }});
        fireEvent.blur(input);
        const error = screen.getByText(/debe ingresar un mail valido/i);
        expect(error).toBeInTheDocument();
    });

    it('7) Elimina el mensaje de error cuando el campo `Email` cumple con los requisitos', () => {
        const input = screen.getByLabelText(/email/i);
        fireEvent.change(input, { target: { value: 'andres@' }});
        fireEvent.blur(input);
        fireEvent.change(input, { target: { value: 'andres@meli.com' }});
        fireEvent.blur(input);
        const error = screen.queryByText(/debe ingresar un mail valido/i);
        expect(error).toBeNull();
    });
});
