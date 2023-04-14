import { useState } from 'react';
import { getProductsAndPostSearch } from './services/request';

function App() {

  const [products, setProducts] = useState([]);

  const [selectCategory, setSelectCategory] = useState('celular');

  const [selectSite, setSelectSite] = useState('Ambos');

  const [inputProduct, setInputProduct] = useState('');
  
  const [researched, setResearched] = useState(false)

  const handleInputProduct = ({ target }) => {
    setInputProduct(target.value);
  };



  const formValidation = () => {
    if(inputProduct === '' || selectCategory === '' || selectSite === ''){
      return true;
    }
  }

  const newSale = async (event) => {
    event.preventDefault();
    try {
      const data = await getProductsAndPostSearch(
        {
          search: inputProduct, 
          site: selectSite, 
          category: selectCategory,
        });
      setProducts(data);
      setResearched(true)
    } catch (error) {
      console.log(error);
    }
  };
  console.log(products);
  console.log(selectCategory);
  console.log(selectSite);
  console.log(inputProduct);
  console.log(researched);
  
  return (
    <div>
      <select
        value={ selectCategory }
        onChange={ (e) => setSelectCategory(e.target.value) }
      >
          <option 
          value='celular'
          >
            Mobile
            </option>
          <option 
          value='geladeira' 
          >
            Refrigerator
            </option>
          <option 
          value='tv' 
          >
            TV
            </option>
      </select>
      <select
        value={ selectSite }
        onChange={ (e) => setSelectSite(e.target.value) }
      >
          <option 
          value='Mercado Livre'
          >
            Mercado Livre
            </option>
          <option 
          value='Buscapé'
          >
            Buscapé
            </option>
            <option 
          value='Ambos'
          >
            Todas
            </option>
      </select>
      <label 
      htmlFor='search-for-products'
      >
      <input 
      id='search-for-products' 
      type='text' 
      placeholder='Search for products here'
      value={ inputProduct }
      onChange={ handleInputProduct }
      />
      </label>
      <button 
      type='button'
      onClick={ (event) => newSale(event) }
      disabled={formValidation()}
      >
        Search
        </button>
         {
        (researched)
          ? (
            products.map((product) => (
              <section
              key={ product.description }
              >
                <a href={product.link}>Ir a Web</a>
                <img src={product.image} alt='product thumbnail' />
                <p>{product.price}</p>
                <h2>{product.description}</h2>
                </section>
            ))
          )
          : null
      } 
    </div>
  );
}

export default App;
