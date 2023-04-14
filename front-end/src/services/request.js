import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const getProductsAndPostSearch = async ({ search, site, category }) => {
  const { data } = await api.post('/products', { search, site, category });

  return data;
};

export default api;