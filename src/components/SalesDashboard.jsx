import { stripBasename } from "@remix-run/router";
import { useEffect, useState } from "react";

function SalesDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchData = () => {
    const token = localStorage.getItem("token");
    const options = {
      "Content-Type": "application/json",
      authorization: token,
    };

    fetch("http://localhost:3001/producto", {
      headers: options,
    })
      .then((res) => res.json())
      .then((json) => setProducts(json["products"]));

    fetch("http://localhost:3001/producto/categorias", {
      headers: options,
    })
      .then((res) => res.json())
      .then((json) => setCategories(json["categories"]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  let totalPrice = 0,
    totalQuantity = 0;

  products.forEach((product) => {
    totalPrice += product.price * product.quantity;
    totalQuantity += product.quantity;
  });

  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("electronics");
  const [imgURL, setImageURL] = useState("");
  const [quantity, setQuantity] = useState("");

  function inputHandler(input, type) {
    if (type === "category") {
      input = input.target.options[input.target.selectedIndex].value;
    } else {
      input = input.target.value;
    }

    switch (type) {
      case "title":
        setTitle(input);
        break;

      case "price":
        setPrice(input);
        break;

      case "description":
        setDescription(input);
        break;

      case "category":
        setCategory(input);
        break;

      case "imgURL":
        setImageURL(input);
        break;

      case "quantity":
        setQuantity(input);
        break;

      default:
        console.error("caso no existe");
        break;
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (modalButton === "Add") {
      addProduct();
    } else {
      updateHandler();
    }
  }

  async function addProduct() {
    const token = localStorage.getItem("token");

    const id = await fetch("http://localhost:3001/producto", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((response) => response["products"].length + 1);

    await fetch("http://localhost:3001/producto", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({
        product: {
          id: Number(id),
          title,
          price: Number(price),
          description,
          category,
          imgURL,
          quantity: Number(quantity),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid Token!");
        return res;
      })
      .then((response) => response.json())
      .then((data) => alert("Product successfully added"))
      .catch((error) => {
        alert("Access forbidden. Insufficient privileges.");
      });
    fetchData();
  }

  async function deleteHandler(id) {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:3001/producto/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid Token!");
        return res;
      })
      .then((response) => response.json())
      .then((data) => alert("Product successfully deleted"))
      .catch((error) => {
        alert("Access forbidden. Insufficient privileges.");
      });
    fetchData();
  }

  async function updateHandler() {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:3001/producto/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({
        product: {
          id,
          title,
          price,
          description,
          category,
          imgURL,
          quantity,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid Token!");
        return res;
      })
      .then((response) => response.json())
      .then((data) => alert("Product successfully updated."))
      .catch((error) => {
        alert("Access forbidden. Insufficient privileges.");
      });
    fetchData();
  }

  let $select = document.querySelector(".form-select");
  // console.log(products);

  const [modalTitle, setModalTitle] = useState();
  const [modalButton, setModalButton] = useState();

  function cleanModal(e) {
    setTitle("");
    setPrice("");
    setDescription("");
    $select.value = "electronics";
    setImageURL("");
    setQuantity("");
  }

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
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="btn btn-primary mb-2"
              onClick={(e) => {
                setModalTitle("Add Product");
                setModalButton("Add");
              }}
            >
              Add +
            </button>
          </form>
        </header>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio {"(u)"}</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="table-inventory-body">
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>{`$${product.price}`}</td>
                <td>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={(e) => {
                      // alert(product.id);
                      setModalTitle("Edit Product");
                      setModalButton("Edit");
                      setId(product.id);
                      setTitle(product.title);
                      setPrice(product.price);
                      setDescription(product.description);
                      $select.value = product.category;
                      setImageURL(product.image);
                      setQuantity(product.quantity);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      fill="black"
                      viewBox="0 0 512 512"
                    >
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                  </button>
                  <button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={(e) => {
                      deleteHandler(product.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-inventory-foot">
            <tr>
              <td></td>
              <td>Total</td>
              <td>{totalQuantity}</td>
              <td>{`$${totalPrice.toFixed(2)}`}</td>
              <td></td>
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

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {modalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                id="addProduct-form"
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Product Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      inputHandler(e, "title");
                    }}
                    value={title}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Price
                  </span>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    className="form-control"
                    placeholder="Product Price"
                    aria-label="Price"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      inputHandler(e, "price");
                    }}
                    required
                    value={price}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Description
                  </span>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Product Description"
                    aria-label="Description"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      inputHandler(e, "description");
                    }}
                    required
                    value={description}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Category
                  </span>

                  <select
                    name="category"
                    className="form-select"
                    onChange={(e) => {
                      inputHandler(e, "category");
                    }}
                    aria-label="Default select example"
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category.id}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Image URL
                  </span>
                  <input
                    type="url"
                    name="imgURL"
                    className="form-control"
                    placeholder="Product Image URL"
                    aria-label="Image"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      inputHandler(e, "imgURL");
                    }}
                    required
                    value={imgURL}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Quantity
                  </span>
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    placeholder="Product Quantity"
                    aria-label="Quantity"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      inputHandler(e, "quantity");
                    }}
                    required
                    value={quantity}
                  />
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => {
                      cleanModal(e);
                    }}
                  >
                    Clean
                  </button>
                  <section>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {modalButton}
                    </button>
                  </section>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesDashboard;
