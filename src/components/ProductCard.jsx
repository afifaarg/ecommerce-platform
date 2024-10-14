// import { CartContext } from "~contexts/CartContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function Product({ product }) {
  // const { addToCart } = useContext(CartContext);
  // const { id, image, category, name, price } = product;

  return (
    <div
      key={product.id}
      className="rounded-xl border border-gray-200 bg-white  hover:shadow-xl shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="h-64 w-full rounded-t-xl overflow-hidden">
      <Link
          to={`/products/${product.id}`} >
          <img
            className="w-full h-full rounded-t-xl object-cover object-cover transform transition-transform duration-500 hover:scale-110"
            src={product.image}
            alt={product.name}
          />
          {/* If you have dark mode images, you can add them here */}
          </Link>
      </div>
      <div className="pt-4 p-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          {/* Example Badge - Adjust based on product data */}
          <span className="me-2 rounded bg-red-500 px-2.5 py-0.5 text-xs font-medium text-secondary dark:bg-primary-dark dark:text-primary-300">
            {product.category}
          </span>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-1">
            <Link
              to={`/products/${product.id}`} // Link to the product details page
              className="rounded-lg p-2 text-primary hover:bg-gray-100"
              data-tooltip-target={`tooltip-quick-look-${product.id}`}
            >
              {/* Quick Look Icon */}
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
            <div
              id={`tooltip-quick-look-${product.id}`}
              role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top"
            >
              Voir Produit {/* Updated tooltip text */}
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>

            <button
              type="button"
              data-tooltip-target={`tooltip-add-to-favorites-${product.id}`}
              className="rounded-lg p-2 rounded-lg p-2 text-primary hover:bg-gray-100"
            >
              <span className="sr-only">Ajouter aux favories</span>
              {/* Favorite Icon */}
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>
            </button>
            <div
              id={`tooltip-add-to-favorites-${product.id}`}
              role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top"
            >
              Ajouter aux favories
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>
          </div>
        </div>

        {/* Product Name */}
        <a
          href="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
        >
          {product.name}
        </a>

        {/* Rating */}
        <div className="mt-2 flex justify-between items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((star, index) => (
              <svg
                key={index}
                className={`h-5 w-5 ${
                  index < Math.floor(5) ? "text-yellow-400" : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
            ))}
            5
          </div>

          <p className="text-lg font-bold leading-tight text-gray-900 dark:text-white">
            {product.price} DZD
          </p>
        </div>

        {/* Features */}
        <ul className="mt-2 flex justify-between items-center gap-4">
          <li className="flex items-center gap-2">
            {/* Fast Delivery Icon */}
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Livraison rapide
            </p>
          </li>

          <li className="flex items-center gap-2">
            {/* Best Price Icon */}
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-10 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Meilleur Prix
            </p>
          </li>
        </ul>

        {/* Price and Add to Cart */}
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center items-center rounded-lg bg-primary w-full  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              className="-ms-2 me-2 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            <span>Ajouter au Panier</span>
          </button>
        </div>
      </div>
    </div>
  );
}
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired, // Assuming it's a string URL
    price: PropTypes.number.isRequired,
  }).isRequired,
};
