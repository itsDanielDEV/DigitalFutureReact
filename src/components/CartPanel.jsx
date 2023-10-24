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
        <article key={item.id} className="item-cart" data-id={item.id}>
          <img className="item-cart-img" src={item.imgURL} alt={item.title} />
          <section className="item-cart-info">
            <p className="item-cart-title text-wrap text-break">{item.title}</p>
            <p className="item-cart-price">
              ${itemPrices[item.id] * itemQuantities[item.id]}
            </p>
          </section>
          <section className="item-cart-actions" style={{ width: "250px" }}>
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
        <button className="btn btn-outline-primary btn-checkout">
          Checkout
        </button>
      </div>
    </section>
  );
}

export default CartPanel;
