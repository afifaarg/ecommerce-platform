import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [flyer, setFlyer] = useState(false);
  const { cartLength } = useContext(CartContext);
  console.log(cartLength);

  return (
    <>
      {/* NavBar */}
      <div className="relative bg-primary z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <span className="font-bold font-serif text-secondary text-xl">
                  SLEEPWELL
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 -my-2 flex justify-between md:hidden">
              <div className="flex items-center py-4 space-x-2">
                <a
                  href="#"
                  className=" px-2 whitespace-nowrap text-base font-medium text-secondary border-r-2 border-secondary-dark"
                >
                  <svg
                    viewBox="0 0 940 1000"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path d="M736 722c136 48 204 88.667 204 122v106H470 0V844c0-33.333 68-74 204-122 62.667-22.667 105.333-45.667 128-69s34-55 34-95c0-14.667-7.333-31-22-49s-25.333-42.333-32-73c-1.333-8-4.333-14-9-18s-9.333-6.667-14-8c-4.667-1.333-9.333-7-14-17s-7.667-24.333-9-43c0-10.667 1.667-19.333 5-26 3.333-6.667 6.333-10.667 9-12l4-4c-5.333-33.333-9.333-62.667-12-88-2.667-36 11-73.333 41-112s82.333-58 157-58 127.333 19.333 158 58 44 76 40 112l-12 88c12 5.333 18 19.333 18 42-1.333 18.667-4.333 33-9 43s-9.333 15.667-14 17c-4.667 1.333-9.333 4-14 8s-7.667 10-9 18c-5.333 32-15.667 56.667-31 74s-23 33.333-23 48c0 40 11.667 71.667 35 95s65.667 46.333 127 69" />
                  </svg>
                </a>
                <Link
                  to="/cart"
                  className=" relative px-2 whitespace-nowrap inline-flex items-center justify-center text-secondary font-bold cursor-pointer hover:text-secondary-dark"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 00-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 100 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 00-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 00-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6z" />
                  </svg>
                  {cartLength > 0 && (
                    <div className="absolute w-4 h-4 p-0.15 bg-secondary -top-2 -right-1 rounded-full text-primary text-xs text-center">
                      {cartLength}
                    </div>
                  )}
                </Link>
              </div>
              <button
                type="button"
                className=" rounded-md p-2 inline-flex items-center justify-center text-secondary-light hover:text-secondary-dark"
                onClick={() => setOpen(!open)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex space-x-10 items-center">
              <div className="relative">
                <button
                  type="button"
                  className="group rounded-md justify-center text-secondary-light hover:text-secondary-dark inline-flex items-center text-base font-medium focus:outline-none"
                  onClick={() => setFlyer(!flyer)}
                >
                  <span>Nos Produits</span>
                  <svg
                    className={`ml-2 h-5 w-5 text-secondary-light hover:text-secondary-dark transition-transform ease-out duration-200 ${
                      flyer ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`${
                    flyer
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1 pointer-events-none"
                  } transition ease-out duration-200 absolute z-10 mt-3 w-screen max-w-md sm:px-0 lg:left-1/2 lg:-translate-x-1/2`}
                  onMouseLeave={() => setFlyer(false)}
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="bg-white p-5">Here get categories</div>
                  </div>
                </div>
              </div>

              <a
                href="#products"
                className="text-base font-medium text-secondary-light hover:text-secondary-dark"
              >
                Nouveautés
              </a>
              <a
                href="#about"
                className="text-base font-medium text-secondary-light hover:text-secondary-dark"
              >
                A propos
              </a>
              <a
                href="#faq"
                className="text-base font-medium text-secondary-light hover:text-secondary-dark"
              >
                FAQ
              </a>
              <Link
                to="/contact"
                className="text-base font-medium text-secondary-light hover:text-secondary-dark"
              >
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                to="#"
                className="whitespace-nowrap text-base font-medium px-2 text-secondary border-r-2 border-secondary-dark"
              >
                <svg
                  viewBox="0 0 940 1000"
                  fill="currentColor"
                  height="1.2em"
                  width="1.2em"
                >
                  <path d="M736 722c136 48 204 88.667 204 122v106H470 0V844c0-33.333 68-74 204-122 62.667-22.667 105.333-45.667 128-69s34-55 34-95c0-14.667-7.333-31-22-49s-25.333-42.333-32-73c-1.333-8-4.333-14-9-18s-9.333-6.667-14-8c-4.667-1.333-9.333-7-14-17s-7.667-24.333-9-43c0-10.667 1.667-19.333 5-26 3.333-6.667 6.333-10.667 9-12l4-4c-5.333-33.333-9.333-62.667-12-88-2.667-36 11-73.333 41-112s82.333-58 157-58 127.333 19.333 158 58 44 76 40 112l-12 88c12 5.333 18 19.333 18 42-1.333 18.667-4.333 33-9 43s-9.333 15.667-14 17c-4.667 1.333-9.333 4-14 8s-7.667 10-9 18c-5.333 32-15.667 56.667-31 74s-23 33.333-23 48c0 40 11.667 71.667 35 95s65.667 46.333 127 69" />
                </svg>
              </Link>

              <Link
                to="/cart"
                className=" relative px-2 whitespace-nowrap inline-flex items-center justify-center text-secondary font-bold cursor-pointer hover:text-secondary-dark"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="1.5em"
                  width="1.5em"
                >
                  <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 00-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 100 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 00-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 00-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6z" />
                </svg>
                {cartLength > 0 && (
                  <div className="absolute w-4 h-4 p-0.15 bg-secondary -top-2 -right-1 rounded-full text-primary text-xs text-center">
                    {cartLength}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            open
              ? "opacity-100 scale-100 transition ease-out duration-200 fixed inset-0 h-screen z-10 bg-transparent md:hidden"
              : "opacity-0 scale-95 pointer-events-none fixed inset-0 h-screen z-10 md:hidden"
          }`}
        >
          <div className="rounded-lg shadow-lg h-screen ring-1 bg-primary bg-opacity-75 backdrop-blur-sm divide-y-2 divide-gray-50">
            <div className="px-5 flex items-center justify-between py-2">
              <div></div>
              <button
                type="button"
                className="rounded-md p-2 inline-flex items-center justify-center text-secondary-dark focus:outline-none"
                onClick={() => setOpen(!open)}
              >
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="py-4 px-4 space-y-6">
              <Link
                to="/products"
                className="block text-secondary-dark hover:text-secondary text-xl font-semibold"
              >
                Nouveautés
              </Link>
              <Link
                to="/#about"
                className="block text-secondary-dark hover:text-secondary text-xl font-semibold"
              >
                A propos
              </Link>
              <Link
                to="/#faq"
                className="block text-secondary-dark hover:text-secondary text-xl font-semibold"
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="block text-secondary-dark hover:text-secondary text-xl font-semibold"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
