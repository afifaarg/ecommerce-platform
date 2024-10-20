import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
// import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  // const navigate = useNavigate();
  const { cartItems, removeFromCart,clearCart ,updateCart  } = useContext(CartContext); // Ensure updateCart is in context
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    setTotal(total);
  }, [cartItems]);

  const handleInc = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    // Update the context with the new cart state
    updateCart(updatedCart); // Call the update function from context
  };

  const handleDec = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    });
    // Update the context with the new cart state
    updateCart(updatedCart); // Call the update function from context
  };

  
  if(cartItems.length===0){
    return (
      <div className='h-[55vh] flex flex-col py-[5vh] justify-center items-center'>
        <h1 className=' text-center text-4xl'>Votre Panier est Vide </h1>
        <Link to={'/products'} className="flex font-semibold text-gray-900 text-sm rounded-xl text-center mx-auto w-1/4  px-4 py-2 hover:bg-gray-200 ">
            <svg className="fill-current mr-2 text-gray-900 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Retour au Produits
        </Link>
      </div>

    )
      
  }
  return (
    <div className="flex container mx-auto mt-10">
      <div className="w-3/4 shadow-md my-10 flex-wrap">
        <div className="bg-white px-10 py-1">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Panier d&#39;Achat</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Articles</h2>
          </div>
          <div className="flex flex-wrap mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Détails du Produit</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantité</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Prix</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {
            cartItems?.map((cart) => {
              return (
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={cart.id}>
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img className="h-24" src={cart?.image} alt={cart?.name} />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{cart?.name}</span>
                      <span className="text-red-500 text-xs capitalize">{cart?.category}</span>
                      <div className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer" onClick={() => removeFromCart(cart?.id)}>Retirer</div>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" onClick={() => handleDec(cart?.id)}>
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                    <input className="px-1 border text-center w-12 mx-2" type="text" value={cart?.quantity}  readOnly />
                    <svg className="fill-current text-gray-600 w-3 cursor-pointer" onClick={() => handleInc(cart?.id)} viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">${cart?.price}</span>
                  <span className="text-center w-1/5 font-semibold text-sm">${(cart?.price * cart?.quantity).toFixed(2)}</span>
                </div>
              );
            })
          }
          <div className="flex justify-between border-t py-4">
          <Link to={'/products'} className="flex font-semibold text-gray-900 text-sm rounded-xl  px-4 py-2 hover:bg-gray-200 ">
            <svg className="fill-current mr-2 text-gray-900 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Retour au Produits
          </Link>
            <button onClick={clearCart} className="font-bold text-red-600 rounded-xl  px-4 py-2 hover:bg-red-100 hover:text-red-700 text-sm"> Vider le Panier</button>
          </div>
        </div>
      </div>
      <div>
      <div className="container mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit}>
        {/* Shipping Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          <div className="mb-4">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Payment Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
          <div className="mb-4">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Link to='/'
            onClick={() => handleSubmit()}
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
          >
            Place Order
          </Link>
        </div>
      </form>
    </div>
      </div>
    </div>
  );
};

export default Cart;
