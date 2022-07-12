const normalize = require('./transforms/normalize');
const restclient = require('nordic/restclient')({
  timeout: 5000,
});

class ProductsService {
  static getProducts(siteId, name, offset, limit) {
    return restclient.get(`/sites/${siteId}/search`, {
      params: {
        q: name, 
        offset,
        limit
      }
    })
      .then(response => normalize(response.data.results))
      .catch(err => ([]));
  }

  static getProductDescription(id) {
    return restclient.get(`/items/${id}/description`)
        .then(response => response.data)
        .catch(err => {
          return [];
            // throw new Error('FetchProductDescription error', err);
        });
  }

}

module.exports = ProductsService;