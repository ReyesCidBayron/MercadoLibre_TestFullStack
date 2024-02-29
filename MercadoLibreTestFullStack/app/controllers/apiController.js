import axios from 'axios';

const author = {
  name: 'Bayron',
  lastname: 'Reyes',
};

const apiController = {
  searchItems: async (req, res) => {
    try {
      const query = req.query.q;
      const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
      const data = response.data;

      const result = {
        author,
        categories: data.filters.find(filter => filter.id === 'category')?.values[0]?.path_from_root.map(category => category.name) || [],
        items: data.results.slice(0, 4).map(item => ({
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: Math.floor(item.price),
            decimals: Math.floor((item.price % 1) * 100),
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping?.free_shipping || false,
        })),
      };

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener resultados de búsqueda' });
    }
  },

  getItemDetails: async (req, res) => {
    try {
      const itemId = req.params.id;
      const [itemResponse, descriptionResponse] = await Promise.all([
        axios.get(`https://api.mercadolibre.com/items/${itemId}`),
        axios.get(`https://api.mercadolibre.com/items/${itemId}/description`),
      ]);

      const itemData = itemResponse.data;
      const descriptionData = descriptionResponse.data;

      const result = {
        author,
        item: {
          id: itemData.id,
          title: itemData.title,
          price: {
            currency: itemData.currency_id,
            amount: Math.floor(itemData.price),
            decimals: Math.floor((itemData.price % 1) * 100),
          },
          picture: itemData.pictures[0]?.url || '',
          condition: itemData.condition,
          free_shipping: itemData.shipping?.free_shipping || false,
          sold_quantity: itemData.sold_quantity,
          description: descriptionData.plain_text || '',
        },
      };

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener detalles del producto' });
    }
  },
};

export default apiController;