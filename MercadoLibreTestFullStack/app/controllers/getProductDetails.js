const axios = require('axios');

// Controlador para obtener detalle de un producto por ID
async function getProductDetails(itemId) {
  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${itemId}`),
      axios.get(`https://api.mercadolibre.com/items/${itemId}/description`)
    ]);

    const item = itemResponse.data;
    const description = descriptionResponse.data;

    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: 2 // Suponiendo 2 decimales para el precio
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: description.plain_text
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getProductDetails
};