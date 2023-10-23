import categories from "../data/categories.js";
import products from "../data/products.js";
import ProductCard from "./ProductCard.jsx";
import "../stylesheets/ProductsSection.css";

function IndexProductsSection(props) {
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
                        imgURL={product.imgURL}
                        name={product.name}
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
                    imgURL={product.imgURL}
                    name={product.name}
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
