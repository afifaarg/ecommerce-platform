import { useState, useContext } from "react";
import { FaShoppingCart, FaBox } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import PropTypes from "prop-types";
import CartModal from "./CartModal"; // Import your modal component

const CartButton = ({ id, name, category, image, price }) => {
  const [clicked, setClicked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isEnded, setIsEnded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal visibility
  const { addToCart } = useContext(CartContext);

  const onButtonClick = () => {
    setClicked(true);
    setIsEnded(false);
    addToCart({
      id: id,
      name: name,
      category: category,
      image: image,
      price: price,
    });

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
          className={`absolute z-30 flex space-x-4 left-1/2 top-1/2 text-base font-bold transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
            !isEnded ? "opacity-0" : "opacity-100"
          }`}
        >
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
          >
            <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 00-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 100 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 00-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 00-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6z" />
          </svg>
          <span>Ajouter au panier</span>
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
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default CartButton;
