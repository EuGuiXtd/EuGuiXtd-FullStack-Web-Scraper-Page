import { useState } from "react";
import { getProductsAndPostSearch } from "./services/request";
import Swal from "sweetalert2";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  const [selectCategory, setSelectCategory] = useState("");

  const [selectSite, setSelectSite] = useState("");

  const [inputProduct, setInputProduct] = useState("");

  const [loading, setLoading] = useState(false);


  const handleInputProduct = ({ target }) => {
    setInputProduct(target.value);
  };

  const formValidation = () => {
    if (inputProduct === "" || selectCategory === "" || selectSite === "") {
      return true;
    }
  };
  const alert = () => {
    Swal.fire({
      title: "Ops!",
      text: "No items found with search",
      imageUrl:
        "https://www.navigation.com/static/WFS/Shop-CitroenEMEA-Site/-/Shop-CitroenEMEA/en_GB/Product%20Not%20Found.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Not found itens",
    });
  };

  const newSale = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = await getProductsAndPostSearch({
        search: inputProduct,
        site: selectSite,
        category: selectCategory,
      });
      if (data === "Not found itens") alert();
      setLoading(false);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectSite);
  return (
    <div>
      <ul class="nav justify-content-center" style={{ paddingBottom: "15px" }}>
        <li class="nav-item">
          <select
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
            class="nav-link active"
            style={{ border: "1px solid #17a2b8", marginRight: "0.5rem", cursor: "pointer" }}
          >
            <option value=''>Categoria</option>
            <option value="celular">Mobile</option>
            <option value="geladeira">Refrigerator</option>
            <option value="tv">TV</option>
          </select>
        </li>
        <li class="nav-item">
          <select
            value={selectSite}
            onChange={(e) => setSelectSite(e.target.value)}
            class="nav-link"
            style={{ border: "1px solid #17a2b8", cursor: "pointer" }}
          >
            <option value=''>Web</option>
            <option value="Ambos">Both</option>
            <option value="Mercado Livre">Mercado Livre</option>
            <option value="Buscapé">Buscapé</option>
          </select>
        </li>
        <li class="nav-item">
          <form class="form-inline">
            <input
              class="form-control mr-sm-2"
              id="search-for-products"
              type="text"
              style={{
                display: "inline-block",
                width: "auto",
                verticalAlign: "middle",
                border: "1px solid #17a2b8",
                marginLeft: "0.5rem",
              }}
              placeholder="Search for products here"
              value={inputProduct}
              onChange={handleInputProduct}
              onKeyPress={(event) => {
                if (event.key ==='Enter') {
                  newSale(event)}
                }
              }
            />
            <button
              type="button"
              onClick={(event) => newSale(event)}
              disabled={formValidation()}
              class="btn btn-outline-info"
            >
              Search
            </button>
          </form>
        </li>
      </ul>
      {loading ? (
        <div class="divloader">
          <div class="loader" />
        </div>
      ) : products === "Not found itens" ? null : (
        <div
          class="card-columns"
          style={{
            flexWrap: "wrap",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <div
              class="card text-center border-info mb-3"
              style={{ width: "220px", borderRadius: "8px" }}
            >
              <img
                class="card-img-top"
                src={product.image}
                alt="Imagem de capa do card"
                style={{ maxHeight: "400px", padding: "30px" }}
              />
              <div class="card-body">
                <h5 class="card-title">{product.price}</h5>
                <p class="card-text" style={{ height: "100px" }}>
                  {product.description}
                </p>
                <p >
                  {`site: ${product.web}`}
                </p>
                <a
                  href={product.link}
                  target="_blank"
                  class="btn btn-primary"
                  rel="noreferrer"
                >
                  Ir a Web
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
