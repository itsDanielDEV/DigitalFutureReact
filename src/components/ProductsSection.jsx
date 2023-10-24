// import categories from "../data/categories.js";
// import products from "../data/products.js";
import ProductCard from "./ProductCard.jsx";
import "../stylesheets/ProductsSection.css";
import { useState, useEffect } from "react";

function IndexProductsSection(props) {
  const [categories, setCategories] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      // Manejar errores aquí
      // console.error("Error fetching data:", error);
    }
  };

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      // Manejar errores aquí
      // console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, []);

  return (
    <div id="shop-cards" className="container px-4 px-lg-5 mt-5">
      {products.length > 0 ? (
        <>
          {props.homeMode ? (
            categories.map((category) => (
              <div key={category}>
                <h2 id={category.toLowerCase().replace(" & ", "and")}>
                  {category}
                </h2>
                <section className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                  {products.map((product) =>
                    product.category === category.toLowerCase() ? (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        imgURL={product.image}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        homeMode={props.homeMode}
                      />
                    ) : null
                  )}
                </section>
              </div>
            ))
          ) : (
            <>
              <h2 id="trendingproducts">Trending Products</h2>
              <section className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    imgURL={product.image}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    homeMode={props.homeMode}
                  />
                ))}
              </section>
            </>
          )}
        </>
      ) : (
        <h2>No hay productos que mostrar</h2>
      )}
    </div>
  );
}

export default IndexProductsSection;
