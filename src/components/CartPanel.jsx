import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

function CartPanel() {
  const { cartItems } = useContext(CartContext);
  const [itemQuantities, setItemQuantities] = useState({});
  const [itemPrices, setItemPrices] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [CartBody, setCartBody] = useState(null);

  const updatePricesAndSubtotal = () => {
    const updatedPrices = {};
    let sum = 0;
    cartItems.forEach((item) => {
      const price = item.price * (itemQuantities[item.id] || 1);
      updatedPrices[item.id] = price;
      sum += price;
    });
    setItemPrices(updatedPrices);
    setSubtotal(sum);
  };

  const handleDecrement = (itemId) => {
    const newQuantity = (itemQuantities[itemId] || 1) - 1;
    if (newQuantity > 0) {
      setItemQuantities((prev) => ({
        ...prev,
        [itemId]: newQuantity,
      }));
    } else {
      const { [itemId]: deletedItem, ...updatedQuantities } = itemQuantities;
      setItemQuantities(updatedQuantities);
    }
  };

  const handleIncrement = (itemId) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1,
    }));
  };

  useEffect(() => {
    updatePricesAndSubtotal();
  }, [itemQuantities, cartItems]);

  useEffect(() => {
    setCartBody(
      cartItems.map((item) => (
        <article key={item.id} className="item-cart" data-id={item.id}>
          <img className="item-cart-img" src={item.imgURL} alt={item.name} />
          <section className="item-cart-info">
            <p className="item-cart-title">{item.name}</p>
            <p className="item-cart-price">
              ${itemPrices[item.id] || item.price}
            </p>
          </section>
          <section className="item-cart-actions">
            <button
              className="btn btn-danger"
              onClick={() => handleDecrement(item.id)}
            >
              -
            </button>
            <span className="m-2">{itemQuantities[item.id] || 1}</span>
            <button
              onClick={() => handleIncrement(item.id)}
              className="btn btn-success"
            >
              +
            </button>
          </section>
        </article>
      ))
    );
  }, [cartItems, itemQuantities, itemPrices]);

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
