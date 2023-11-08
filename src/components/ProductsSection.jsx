// import categories from "../data/categories.js";
// import products from "../data/products.js";
import ProductCard from "./ProductCard.jsx";
import "../stylesheets/ProductsSection.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function IndexProductsSection(props) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (!props.homeMode && token) {
      navigate("/home");
    }
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3001/producto/categorias", {
      headers: { authorization: token },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid Token!");
        return res;
      })
      .then((data) => data.json())
      .then((response) => response["categories"].map((item) => item.category))
      .then((dataArray) => setCategories(dataArray))
      .catch((error) => {
        console.error(error);
      });

    let options = {
      "Content-Type": "application/json",
      authorization: token,
    };
    let api =
      window.location.pathname === "/"
        ? "http://localhost:3001/producto/invitado"
        : "http://localhost:3001/producto";
    await fetch(api, {
      headers: options,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid Token!");
        return res.json();
      })
      .then((data) => setProducts(data["products"]))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
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
