const request = require('supertest');
const api = require('../../../index');
const restclient = require('nordic/restclient');

jest.mock('nordic/restclient', () => () => ({
    get: jest.fn()
        .mockResolvedValueOnce({ data: 
                {
                    id: 'MLA34547099',
                    title: 'LG',
                    price: 34634,
                    thumbnail: "http://http2.mlstatic.com/D_973809-MLA48041270287_102021-I.jpg"
                }
        })
}));

describe('La ruta /getProduct', () => {
    let baseUrl = `/api/getProduct?domain_override=mercadolibre.com.ar&`;

    it('1) Devuelve un objeto con la información del producto requerido', async () => {
        const response = await request(api.app).get(`${baseUrl}id=MLA34547099`);
        const product = JSON.parse(response.res.text);
        expect(typeof product).toBe('object');
        expect(product).toEqual(expect.objectContaining({
            id: 'MLA34547099',
            title: 'LG',
            price: 34634,
            thumbnail: "http://http2.mlstatic.com/D_973809-MLA48041270287_102021-I.jpg"
        }));
    });
})