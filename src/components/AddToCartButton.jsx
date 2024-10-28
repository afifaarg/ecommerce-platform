import { useState, useContext } from 'react';
import { FaShoppingCart, FaBox } from 'react-icons/fa';
import { CartContext } from "../contexts/CartContext";
import PropTypes from "prop-types";

const CartButton = ({ product }) => {
  const [clicked, setClicked] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // New state to track when the item is added
  const { addToCart } = useContext(CartContext);

  const onButtonClick = () => {
    setClicked(true);
    addToCart(product);

    // Set the state to display "Ajouté" after animation completes
    setTimeout(() => {
      setIsAdded(true); // Show "Ajouté"
    }, 1500); // Duration of the animation (same as the one used for clicked state)

    // Reset the button after the animation
    setTimeout(() => {
      setClicked(false);
      setIsAdded(false); // Reset to show "Ajouter au panier"
    }, 3000); // Reset after 3 seconds (1.5s animation + 1.5s display time)
  };

  return (
    <button
      className={`relative px-2 w-full inline-block h-12 border-0 rounded-lg bg-primary text-white outline-none cursor-pointer transition duration-300 ease-in-out overflow-hidden hover:bg-primary-dark active:scale-90 ${
        clicked ? 'clicked' : ''
      }`}
      onClick={onButtonClick}
    >
      <FaShoppingCart
        className={`absolute z-20 top-1/2 left-[-10%] text-2xl transform -translate-x-1/2 -translate-y-1/2 transition-all ${
          clicked ? 'animate-cart' : ''
        }`}
      />
      <FaBox
        className={`absolute z-30 top-[-20%] left-[52%] text-lg transform -translate-x-1/2 -translate-y-1/2 transition-all ${
          clicked ? 'animate-box' : ''
        }`}
      />
      <span
        className={`absolute z-30 left-1/2 top-1/2 text-lg transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
          clicked && !isAdded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Ajouter au panier
      </span>
      <span
        className={`absolute z-30 left-1/2 top-1/2 text-lg transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
          isAdded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Ajouté
      </span>
    </button>
  );
};

CartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired, // Assuming it's a string URL
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartButton;
