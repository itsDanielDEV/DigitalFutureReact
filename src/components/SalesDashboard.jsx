import { useEffect, useState } from "react";

function SalesDashboard() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
          setProducts(json);
        });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  let totalPrice = 0,
    totalAmount = 0;
  products.forEach((product) => {
    totalPrice += product.price;
    totalAmount += product.rating.count;
  });
  return (
    <div className="container admin-sections">
      <section className="inventory-section">
        <header>
          <h1 id="inventory" className="mb-3">
            Inventory
          </h1>
          <form>
            <button
              type="button"
              className="btn btn-primary mb-2"
              onClick={() => {
                fetch("https://fakestoreapi.com/products", {
                  method: "POST",
                  body: JSON.stringify({
                    title: "test product",
                    price: 13.5,
                    description: "lorem ipsum set",
                    image: "https://i.pravatar.cc",
                    category: "electronic",
                  }),
                })
                  .then((res) => res.json())
                  .then((json) => console.log(json));
              }}
            >
              Add +
            </button>
          </form>
        </header>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio {"(u)"}</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="table-inventory-body">
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.rating.count}</td>
                <td>{`$${product.price}`}</td>
                <td>Acciones</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-inventory-foot">
            <tr>
              <td>Total</td>
              <td>{totalAmount}</td>
              <td>{`$${totalPrice.toFixed(2)}`}</td>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="myorders-section">
        <header>
          <h1 id="myorders" className="mb-3">
            My Orders
          </h1>
        </header>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-09-01</td>
              <td>Producto 1</td>
              <td>$50.00</td>
            </tr>
            <tr>
              <td>2023-09-05</td>
              <td>Producto 2</td>
              <td>$30.00</td>
            </tr>
            <tr>
              <td>2023-09-10</td>
              <td>Producto 3</td>
              <td>$25.00</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="recordsales-section">
        <header>
          <h1 id="recordsales" className="mb-3">
            Record Sales
          </h1>
        </header>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-09-01</td>
              <td>Cliente 1</td>
              <td>Producto A</td>
              <td>3</td>
              <td>$150.00</td>
            </tr>
            <tr>
              <td>2023-09-05</td>
              <td>Cliente 2</td>
              <td>Producto B</td>
              <td>2</td>
              <td>$60.00</td>
            </tr>
            <tr>
              <td>2023-09-10</td>
              <td>Cliente 3</td>
              <td>Producto C</td>
              <td>1</td>
              <td>$30.00</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default SalesDashboard;
