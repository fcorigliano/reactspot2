const productsService = require('../../../services/productsService');

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
        .mockResolvedValueOnce({ data: {
            plain_text: undefined
        }})
        .mockResolvedValueOnce({ data: {
            id: 'MLA23432',
            title: 'LG',
            price: 34634,
            thumbnail: "http://http2.mlstatic.com/D_973809-MLA48041270287_102021-I.jpg"
        }})    
}));

describe('El servicio productsService', () => {
    describe('El método getProducts', () => {
        it('1) Devuelve un array de productos', () => {
            return productsService.getProducts('MLA', 'celularLG', 0, 10)
                .then(response => {
                    expect(response).toBeInstanceOf(Array);
                    expect(response[0].id).toBe('MLA23432');
                });
        });
    });

    describe('El método getProductDescription', () => {
        it('2) Devuelve la descripción del producto que se encuentra en la ruta /items/:id/description de la API interna', async() => {
            const description = await productsService.getProductDescription('MLA23432');
            expect(typeof description).toBe('string');
            expect(description).toBe('Celular de alta gama con cámara de 233242 píxeles.');
        });

        it('3) Si el producto no cuenta con descripción, devuelve un string vacío', () => {
            return productsService.getProductDescription('MLA23432')
                .then(response => {
                    expect(response).toBe('');
                });
        });
    });

    describe('El método getProduct', () => {
        it('4) Devuelve un producto con sus respectivas propiedades', async () => {
            const product = await productsService.getProduct('MLA23432');
            expect(typeof product).toBe('object');
        });
    });
})