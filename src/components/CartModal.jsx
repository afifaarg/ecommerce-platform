import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CartModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative z-60">
        <h2 className="text-lg font-bold mb-4">
          Produit ajouté à votre panier
        </h2>
        <p className="mb-4">
          Vous pouvez continuer vos achats ou aller au panier pour finaliser
          votre commande.
        </p>
        <div className="flex justify-between">
          <Link
            to="/cart"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Aller au panier
          </Link>
          <Link
            to="/products"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default CartModal;
