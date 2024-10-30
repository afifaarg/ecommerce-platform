import { useState, useContext } from "react";
import { FaShoppingCart, FaBox } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import PropTypes from "prop-types";
import CartModal from "./CartModal"; // Import your modal component

const CartButton = ({ product }) => {
  const [clicked, setClicked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isEnded, setIsEnded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal visibility
  const { addToCart } = useContext(CartContext);

  const onButtonClick = () => {
    setClicked(true);
    setIsEnded(false);
    addToCart(product);

    // Show modal after product is added
    setTimeout(() => {
      setIsAdded(true);
      setIsModalOpen(true); // Open the modal
    }, 1500);

    // Reset the button after the animation
    setTimeout(() => {
      setClicked(false);
      setIsAdded(false);
      setIsEnded(true);
    }, 3000);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <button
        className={`relative px-2 w-full inline-block h-12 border-0 rounded-lg bg-primary text-white outline-none cursor-pointer transition duration-300 ease-in-out overflow-hidden hover:shadow-lg active:scale-90 ${
          clicked ? "clicked" : ""
        }`}
        onClick={onButtonClick}
      >
        <FaShoppingCart
          className={`absolute z-20 top-1/2 left-[-10%] text-2xl transform -translate-x-1/2 -translate-y-1/2 transition-all ${
            clicked ? "animate-cart" : ""
          }`}
        />
        <FaBox
          className={`absolute z-30 top-[-20%] left-[52%] text-lg transform -translate-x-1/2 -translate-y-1/2 transition-all ${
            clicked ? "animate-box" : ""
          }`}
        />
        <span
          className={`absolute z-30 left-1/2 top-1/2 text-base font-bold transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
            !isEnded ? "opacity-0" : "opacity-100"
          }`}
        >
          Ajouter au panier
        </span>
        <span
          className={`absolute z-30 left-1/2 top-1/2 text-base font-bold transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
            isAdded ? "opacity-100" : "opacity-0"
          }`}
        >
          Ajouté
        </span>
      </button>
      {/* Render the modal */}
      {isModalOpen && <CartModal isOpen={isModalOpen} onClose={closeModal} />}
    </>
  );
};

CartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartButton;
