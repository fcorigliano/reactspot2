const normalize = products => products.map(p => p.buy_box_winner || p);

module.exports = normalize;