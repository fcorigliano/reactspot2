const React = require('react')
const ProducsContextView = require('../view');
const { CartProvider } = require('../../../context/CartContext');
const { render, screen, fireEvent, act, within } = require('@testing-library/react');
const restclient = require('nordic/restclient');
const mockProducts = require('./sample.json');
const mockProduct = require('./sample2.json');

jest.mock('nordic/restclient', () => () => ({
    get: jest.fn((url) => {
        switch (url) {
            case '/getProducts':
                return Promise.resolve({ data: mockProducts });
            case '/getProduct':
                return Promise.resolve({ data: mockProduct });
        }
    })
}));

describe('La view de ProductsContext', () => {
    let component;
    const i18n = { gettext: text => text };

    beforeEach(async () => {
        await act(async () => {
            component = render(
                <CartProvider>
                    <ProducsContextView i18n={i18n}/>
                </CartProvider>
            );
        });
    });

    it('1) Renderiza', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });

    it('2) Renderiza un listado de productos desde el client con las propiedades title, price y thumbnail', async () => {
        const cellphone1Title = screen.getAllByText(/samsung galaxy/i)[0];
        const cellphone1Price = screen.getByText(/38999/i);
        const cellphone1Img = screen.getAllByRole('img')[0];
        expect(cellphone1Title).toBeInTheDocument();
        expect(cellphone1Price).toBeInTheDocument();
        expect(cellphone1Img.src).toBe("http://http2.mlstatic.com/D_737913-MLA49433851234_032022-I.jpg");
    });

    it('3) Cada producto cuenta también con la propiedad `description`', () => {
        const description = screen.getAllByText(/Fotografía profesional en tu bolsillo Descubrí infinitas posibilidades para tus fotos con las 4 cámaras/i)[0];
        expect(description).toBeInTheDocument();
    })

    it('4) Renderiza un input y un botón para agregar cada producto al carrito', () => {
        /**
         * El role 'spinbutton' indica que el elemento es un input que 
         * restringe su valor a un rango discreto de valores (type number
         * en este caso).
         */
        const inputs = screen.getAllByRole('spinbutton');
        const buttons = screen.getAllByRole('button');
        expect(inputs.length).toBeGreaterThanOrEqual(6);
        expect(buttons.length).toBeGreaterThanOrEqual(6);
    });

    it('5) Renderiza la lista productos seleccionados cuando se ingresa una cantidad y se presiona el botón para agregar al carrito', async () => {
        const input = screen.getAllByRole('spinbutton')[0];
        fireEvent.change(input, { target: { value: 5 }});
        await act(async () => {
            const button = screen.getAllByRole('button')[0];
            fireEvent.click(button);
        });
        const cartProduct = screen.getByTestId(mockProduct.id);
        const quantity = within(cartProduct).getByText('5');
        expect(cartProduct).toBeInTheDocument();
        expect(quantity).toBeInTheDocument();
    });

    it('6) Suma la cantidad de productos seleccionados cuando agregamos 2 veces el mismo producto', async () => {
        const input = screen.getAllByRole('spinbutton')[0];
        fireEvent.change(input, { target: { value: 2 }});
        const button = screen.getAllByRole('button')[0];
        await act(async () => {
            fireEvent.click(button);
        });
        fireEvent.change(input, { target: { value: 3 }});
        await act(async () => {
            fireEvent.click(button);
        });
        const cartProduct = screen.getByTestId(mockProduct.id);
        const quantity = within(cartProduct).getByText('5');
        expect(cartProduct).toBeInTheDocument();
        expect(quantity).toBeInTheDocument();
    });
});
