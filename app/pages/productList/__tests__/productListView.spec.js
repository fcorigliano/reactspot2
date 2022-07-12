const React = require('react');
const ProductListView = require('../view');
const { render, screen, fireEvent, act } = require('@testing-library/react');
const restclient = require('nordic/restclient');
const mockProducts = require('./sample.json');

jest.mock('nordic/restclient', () => () => ({
    get: jest.fn(() => Promise.resolve({data: mockProducts}))
}));

describe('La view de ProductList', () => {
    let component;
    const i18n = { gettext: text => text};
    const mockConsole = jest.spyOn(console, "log");
    const spyGet = jest.spyOn(restclient(), 'get');

    beforeEach(async() => {
        await act(async() => {
            component = render(<ProductListView i18n={i18n}/>)
        });
    });

    it('1) Renderiza', async() => {
        await act(async() => {
            const { asFragment } = component;
            expect(asFragment()).toMatchSnapshot();
        });
    });

    it('2) Renderiza un listado de productos desde el client con las propiedades title, price y thumbnail', async() => {
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
        const inputs = screen.getAllByRole('spinbutton');
        const buttons = screen.getAllByRole('button');
        expect(inputs.length).toBeGreaterThanOrEqual(6);
        expect(buttons.length).toBeGreaterThanOrEqual(6);
    });

    it('5) Agrega el producto a un array de productos seleccionados cuando se ingresa una cantidad y se presiona el botón', async() => {
        const input = screen.getAllByRole('spinbutton')[0];
        const button = screen.getAllByRole('button')[0];
        console.log(spyGet.mock)
        fireEvent.change(input, { target: { value: 2}});
        await act(async() => {
            fireEvent.click(button);
            expect(mockConsole).toHaveBeenCalled();
        });
    });
});