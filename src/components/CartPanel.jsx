import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

function CartPanel() {
  const {
    cartItems,
    setCartItems,
    itemQuantities,
    itemPrices,
    setItemQuantities,
    setItemPrices,
    subtotal,
    setSubtotal,
  } = useContext(CartContext);
  const [CartBody, setCartBody] = useState(null);

  const handleDecrement = (id) => {
    setItemQuantities((old) => {
      const updatedQuantities = { ...old, [id]: old[id] - 1 };
      if (updatedQuantities[id] === 0) {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        // console.log("updatedCartItems: ", updatedCartItems);
        setCartItems(updatedCartItems);
      }
      return updatedQuantities;
    });
  };

  const handleIncrement = (id) => {
    setItemQuantities((old) => {
      return { ...old, [id]: old[id] + 1 };
    });
  };

  useEffect(() => {
    let sum = 0;
    for (const itemId in itemPrices) {
      if (itemQuantities[itemId]) {
        sum += itemPrices[itemId] * itemQuantities[itemId];
      }
    }
    setSubtotal(sum);
    // console.log("cartItems:", cartItems); // imprimir cart items
    // console.log("itemquantities:", itemQuantities); // imprimir cart items
  }, [itemPrices, itemQuantities, cartItems]);

  // Cuerpo del cart
  useEffect(() => {
    // console.log(cartItems);
    // console.log(itemQuantities);
    setCartBody(
      cartItems.map((item) => (
        <article
          key={item.id}
          className="item-cart mb-4 d-flex justify-content-between"
          data-id={item.id}
        >
          <img className="item-cart-img" src={item.imgURL} alt={item.title} />
          <section className="item-cart-info">
            <p
              className="item-cart-title "
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </p>
            <p className="item-cart-price" style={{ color: "blue" }}>
              ${itemPrices[item.id] * itemQuantities[item.id]}
            </p>
          </section>
          <section className="item-cart-actions d-flex justify-content-center">
            <button
              className="btn btn-danger"
              onClick={() => handleDecrement(item.id)}
            >
              -
            </button>
            <span className="m-2">{itemQuantities[item.id]}</span>
            <button
              className="btn btn-success"
              onClick={() => handleIncrement(item.id)}
            >
              +
            </button>
          </section>
        </article>
      ))
    );
  }, [cartItems, itemQuantities]);

  const handleCompra = async () => {
    // Obtener la información necesaria del carrito

    const data = {
      purchase: cartItems,
      subtotal,
    };

    // Realizar la petición fetch
    let token = localStorage.getItem("token");
    await fetch("http://localhost:3001/producto/compra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) {
          res = await res.json();
          throw new Error(res.error);
        }
        return res.json();
      })
      .then((response) => {
        alert("Purchase successfully completed.");
      })
      .then(() => {
        // setCartBody("");
        // const updatedCartItems = cartItems.filter((item) => item.id !== id);
        setCartItems(0);
        setCartItems([]);
        setItemPrices({});
        setItemQuantities({});

        // console.log(itemQuantities);

        // setSubtotal(0);
        // setCartItems(updatedCartItems);
      })
      .catch((error) => {
        // Handle fetch request errors
        // console.error("Error occurred during purchase:", error);
        // console.log("error", error);
        alert(error.message);
      });
  };

  useEffect(() => {
    const updatedCartItems = cartItems.map((item) =>
      itemQuantities[item.id]
        ? { ...item, quantity: itemQuantities[item.id] }
        : { ...item, quantity: 1 }
    );
    setCartItems(updatedCartItems);
  }, [itemQuantities]);

  return (
    <section
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasCart"
      aria-labelledby="offcanvasCart"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasCart">
          Cart Summary
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="cart-body offcanvas-body">{CartBody}</div>
      <div className="offcanvas-footer ">
        <div id="subtotal">
          Subtotal: $<span id="subtotal-price">{subtotal}</span>
        </div>
        <button
          type="button"
          className="btn btn-outline-primary btn-checkout"
          onClick={handleCompra}
        >
          Checkout
        </button>
      </div>
    </section>
  );
}

export default CartPanel;
