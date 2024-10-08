import { useContext } from "react";
import { Link } from "react-router-dom";
import { HiPlusSmall, HiEye } from "react-icons/hi2";
// import { CartContext } from "~contexts/CartContext";

const Product = ({ product }) => {
  // const { addToCart } = useContext(CartContext);
  const { id, image, category, title, price } = product;

  return (
    <div className="shadow-lg rounded-lg cursor-pointer">
      <div className="border border-[#e4e4e4] mb-4 relative overflow-hidden group transition rounded-lg">
        <div className="w-full h-full flex justify-center items-center">
          <img
            className="w-full h-auto rounded-t-xl group-hover:scale-110 transition duration-300"
            src={image}
            alt={title}
          />
        </div>

        <div
          className="
            absolute top-6 -right-11 group-hover:right-5 p-2 
            flex flex-col items-center justify-center 
            gap-y-2 opacity-0 group-hover:opacity-100
            transition-all duration-300
          "
        >
          <button onClick={() => addToCart(product, id)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-primary-dark">
              <HiPlusSmall className="text-3xl" />
            </div>
          </button>
          <Link
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            to={`/product/${id}`}
          >
            <HiEye />
          </Link>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center justify-between capitalize text-gray-500 mb-1">
          <p className="text-primary font-bold">{category}</p>
          <p className="font-semibold rounded-full border border-primary px-4 text-primary">
            $ {price}
          </p>
        </div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{title}</h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
