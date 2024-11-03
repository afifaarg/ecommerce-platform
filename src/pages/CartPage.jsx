import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateCart } =
    useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(total);
  }, [cartItems]);

  const handleQtysChange = (id, newQty) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, newQty);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    setLoading(true);
    try {
      const cItems = cartItems.map((item) => ({
        product: 1, // The ID of the product
        quantity: item.quantity,
        total_price: item.price * item.quantity, // Calculate the total price for this item
      }));

      const response = await axios.post(
        "http://127.0.0.1:8000/backendAPI/orders/",
        {
          customer_fullname: orderData.name,
          customer_phonenumber: orderData.phone,
          shipping_address: orderData.address,
          billing_address: orderData.address,
          total_price: total,
          payment_status: "en attente",
          items: cItems,
        }
      );

      if (response.status === 201) {
        clearCart(); // Clear the cart after a successful order
        setShowModal(false); // Close the modal
        alert("Commande soumise avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande", error);
      alert("Une erreur est survenue lors de la soumission de la commande.");
    } finally {
      setLoading(false);
    }
  };
  if (cartItems.length === 0) {
    return (
      <div className="h-[55vh] flex flex-col py-[5vh] justify-center items-center">
        <h1 className="text-center text-4xl">Votre Panier est Vide</h1>
        <Link
          to={"/products"}
          className="flex justify-center items-center font-semibold text-gray-900 text-sm rounded-xl text-center mx-auto w-1/4 px-4 py-2 hover:bg-gray-200"
        >
          <svg
            className="fill-current mr-2 text-gray-900 w-4"
            viewBox="0 0 448 512"
          >
            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
          </svg>
          Retour au Produits
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row container mx-auto mt-10">
      <div className="w-full md:w-3/4 shadow-md my-10">
        <div className="bg-white px-10 py-1">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Panier d&#39;Achat</h1>
            <h2 className="font-semibold text-2xl">
              {cartItems.length} Articles
            </h2>
          </div>

          {cartItems.map((cart) => (
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center hover:bg-gray-100 border-b px-6 py-5"
              key={cart.id}
            >
              <div className="flex w-full sm:w-2/5">
                <div className="w-32">
                  <img
                    className="h-28 w-28 rounded-xl"
                    src={cart.image}
                    alt={cart.name}
                  />
                </div>
                <div className="flex flex-col space-x-2 ml-1 justify-center items-start">
                  <span className="font-bold text-lg">{cart.name}</span>
                  <span className="text-red-500 text-xs capitalize">
                    {cart.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-3/5 mt-4 sm:mt-0">
                <div className="flex items-center justify-between w-full sm:w-1/3 mb-4 sm:mb-0">
                  <span className="text-center font-semibold text-sm sm:hidden">
                    Quantité:
                  </span>
                  <input
                    className="border w-12 text-center"
                    type="number"
                    value={cart.quantity}
                    onChange={(e) =>
                      handleQtysChange(cart.id, parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="flex items-center justify-between w-full sm:w-1/3 mb-4 sm:mb-0">
                  <span className="text-center font-semibold text-sm sm:hidden">
                    Prix:
                  </span>
                  <span className="text-center font-semibold text-sm">
                    DZD {cart.price}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full sm:w-1/3 mb-4 sm:mb-0">
                  <span className="text-center font-semibold text-sm sm:hidden">
                    Total:
                  </span>
                  <span className="text-center font-semibold text-sm">
                    DZD {(cart.price * cart.quantity).toFixed(2)}
                  </span>
                </div>
                <div
                  className="text-red-500 hover:text-red-700 text-xs cursor-pointer sm:w-1/6 sm:ml-4"
                  onClick={() => removeFromCart(cart.id)}
                >
                  <svg
                    viewBox="0 0 448 512"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between border-t py-4">
            <Link
              to="/products"
              className="font-bold text-gray-600 rounded-xl px-4 py-2 hover:bg-gray-100 hover:text-gray-700 text-sm"
            >
              Retour aux Produits
            </Link>
            <button
              onClick={clearCart}
              className="font-bold text-red-600 rounded-xl px-4 py-2 hover:bg-red-100 hover:text-red-700 text-sm"
            >
              Vider le Panier
            </button>
          </div>
        </div>
      </div>

      {/* Section Résumé du Panier */}
      <div className="w-full flex flex-col md:w-1/3  shadow-md my-5 md:ml-4 rounded-xl">
        <div className="bg-white p-6  border-b ">
          <h2 className="font-semibold text-xl border-b pb-4">
            Résumé des achats
          </h2>
          <ul className="mt-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.name}{" "}
                  <span className="ml-2 font-bold">x {item.quantity}</span>
                </span>
                <span className="font-semibold">
                  {(item.price * item.quantity).toFixed(2)} DZD
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>DZD {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="font-bold mx-auto text-white rounded-xl px-4 py-2 my-8 bg-primary-dark hover:bg-primary  text-sm"
        >
          Valider La commande
        </button>
      </div>

      {/* Modal */}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-11/12 sm:w-2/3 lg:w-1/3 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-left text-primary">
              Confirmation de commande
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Nom complet"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-md"
              />
              <input
                type="text"
                name="phone"
                placeholder="Numéro de téléphone"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-md"
              />
              <input
                type="text"
                name="address"
                placeholder="Adresse de livraison"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-md"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 font-bold px-4 py-2 hover:text-red-600"
              >
                Annuler
              </button>
              <button
                onClick={handleOrderSubmit}
                disabled={loading}
                className="bg-primary text-white font-bold px-6 py-3 rounded-md"
              >
                {loading ? "En cours..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
