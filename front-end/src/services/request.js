import axios from 'axios';

const api = axios.create({
  baseURL: `https://lex-art-test-back-end.onrender.com/`,
});

export const getProductsAndPostSearch = async ({ search, site, category }) => {
  const { data } = await api.post('/products', { search, site, category });

  return data;
};

export default api;