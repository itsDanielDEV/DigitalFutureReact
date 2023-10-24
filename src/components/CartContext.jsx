// CartContext.js
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemPrices, setItemPrices] = useState({});
  const [itemQuantities, setItemQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        itemPrices,
        setItemPrices,
        itemQuantities,
        setItemQuantities,
        subtotal,
        setSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
