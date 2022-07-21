const request = require('supertest');
const api = require('../../../index');
const restclient = require('nordic/restclient');

jest.mock('nordic/restclient', () => () => ({
    get: jest.fn()
        .mockResolvedValueOnce({ data: {
            results: [
                {
                    id: 'MLA23432',
                    title: 'LG',
                    price: 34634,
                    thumbnail: "http://http2.mlstatic.com/D_973809-MLA48041270287_102021-I.jpg"
                }
            ]
        }})
        .mockResolvedValueOnce({ data: {
            plain_text: 'Celular de alta gama con cámara de 233242 píxeles.'
        }})
}));


describe('La ruta /getProducts', () => {
    let baseUrl = `/api/getProducts?domain_override=mercadolibre.com.ar&`;

    it('1) EJERCICIO 4 - Devuelve un array de productos con su descripción', async () => {
        const response = await request(api.app).get(`${baseUrl}name=celularLG`);
        const products = await JSON.parse(response.res.text);
        expect(products).toBeInstanceOf(Array);
        expect(products).toHaveLength(1);
    });

    it('2) Devuelve un array vacío si hubo un error o no se encontraron productos', async () => {
        const response = await request(api.app).get(`${baseUrl}name=celularLG`);
        const error = await JSON.parse(response.res.text);
        expect(error).toBeInstanceOf(Array);
        expect(error).toHaveLength(0);
    });
});