import { useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve cart items from localStorage, or initialize as an empty array
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const cartLength = cartItems.length;

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.id === item.id && i.price === item.price
      );
      if (existingItem) {
        const updatedItems = prevItems.map((i) =>
          i.id === item.id && i.price === item.price
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : i
        );
        // Update localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      }
      const newItems = [...prevItems, { ...item, quantity: 1 }];
      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    // Clear localStorage
    localStorage.removeItem("cartItems");
  };

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Sync cartItems with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCart,
        cartLength,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
