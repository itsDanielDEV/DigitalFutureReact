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
  }, [itemPrices, itemQuantities]);

  // Cuerpo del cart
  useEffect(() => {
    // console.log(cartItems);
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

  const handleCompra = () => {
    // Obtener la información necesaria del carrito
    const data = {
      cartItems: cartItems,
      subtotal: subtotal,
    };

    // Realizar la petición fetch
    fetch("URL_DEL_API", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Purchase successfully completed.", data);
      })
      .catch((error) => {
        // Manejar errores de la petición fetch
        console.error("Error occurred during purchase:", error);
      });
  };

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
