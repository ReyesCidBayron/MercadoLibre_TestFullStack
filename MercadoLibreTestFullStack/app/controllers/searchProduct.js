const axios = require('axios');

// Controlador para buscar productos
async function searchProducts(query) {
  try {
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    return response.data.results.slice(0, 4).map(item => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: 2 // Suponiendo 2 decimales para el precio
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping
    }));
  } catch (error) {
    throw error;
  }
}

module.exports = {
  searchProducts
};