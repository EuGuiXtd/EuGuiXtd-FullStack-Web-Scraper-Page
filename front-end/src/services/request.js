import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3001`,
});

export const getProductsAndPostSearch = async ({ search, site, category }) => {
  const { data } = await api.post('/products', { search, site, category });

  return data;
};

export default api;