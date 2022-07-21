const React = require('react');
const ProductsView = require('../view');
const { render, screen, fireEvent, act } = require('@testing-library/react');
const restclient = require('nordic/restclient');
const mockProducts = require('./sample.json');

jest.mock('nordic/restclient', () => () => ({
    get: jest.fn((url, params) => {
        let offset;

        url.split('?')[1]?.split('&').map(q => {
                q = q.split('=');
                if (q[0] == 'offset') {
                    offset = q[1];
                }
            });

        if (!params?.params?.offset || params?.params?.offset == 0 || offset == 0) {
            return Promise.resolve({ data: [ mockProducts[0], mockProducts[1] ] });
        }
        if (params?.params?.offset > 0 || offset > 0) {
            return Promise.resolve({ data: [ mockProducts[2], mockProducts[3] ] });
        }
    })
}));

describe('La view de Products', () => {
    let component;
    const i18n = { gettext: text => text};

    beforeEach(async() => {
        await act(async() => {
            component = render(<ProductsView i18n={i18n}/>)
        });
    });

    it('1) Renderiza', async () => {
        await act(async () => {
            const { asFragment } = component;
            expect(asFragment()).toMatchSnapshot();
        });
    });

    it('2) Renderiza un listado de productos', async () => {
        const cellphone1Title = screen.getAllByText(/samsung galaxy/i)[0];
        const cellphone1Price = screen.getByText(/38999/i);
        expect(cellphone1Title).toBeInTheDocument();
        expect(cellphone1Price).toBeInTheDocument();
    });

    it('3) Renderiza dos botones: uno para ir a la página Siguiente, y otro para volver a la página Anterior', () => {
        const previous = screen.getByText(/anterior/i, { selector: 'button' });
        const next = screen.getByText(/siguiente/i, { selector: 'button' });
        expect(previous).toBeInTheDocument();
        expect(next).toBeInTheDocument();        
    });

    it('4) Actualiza la página con los siguientes productos cuando se clickea el botón `Siguiente`', async () => {
        const next = screen.getByText(/siguiente/i, { selector: 'button' });
        await act(async () => {
            fireEvent.click(next);
        });
        const product = await screen.findByText(/Moto G22 128 Gb Cosmic Black 4 Gb Ram/i);
        expect(product).toBeInTheDocument();
    });

    it('5) Actualiza la página con los productos anteriores cuando se clickea el botón `Anterior`', async () => {
        const next = screen.getByText(/siguiente/i, { selector: 'button' });
        await act(async () => {
            fireEvent.click(next);
        });
        const previous = await screen.findByText(/anterior/i, { selector: 'button' });
        await act(async () => {
            fireEvent.click(previous);
        });
        const product = await screen.findByText(/Samsung Galaxy A03 128 Gb Negro 4 Gb Ram/i);
        expect(product).toBeInTheDocument();
    });

    it('BONUS: deshabilitar el botón `Anterior` si estamos en la página 1', () => {
        const previous = screen.getByText(/anterior/i, { selector: 'button' });
        expect(previous.disabled).toBeTruthy();
    });
});