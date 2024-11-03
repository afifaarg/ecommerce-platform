// components/Navbar.js
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import AuthentificationModal from "./AuthentificationModal";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [flyer, setFlyer] = useState(false);
  const { cartLength } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <nav className="bg-[#ffde43] shadow-md hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-around py-2">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button className="text-gray-500 md:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <Link to="/" className="text-primary text-2xl font-bold">
              SLEEPWELL
            </Link>
            {/* Search Bar */}
          </div>
          <nav className="hidden md:flex mx-auto space-x-10 mr-6 border-r border-primary px-4 justify-start items-center">
            <a
              href="#"
              className="text-base font-medium text-primary hover:text-primary-dark"
            >
              Accueil
            </a>
            <div className="relative">
              <button
                type="button"
                className="group rounded-md justify-center text-primary inline-flex items-center text-base font-medium focus:outline-none"
                onClick={() => setFlyer(!flyer)}
              >
                <span>Nos Produits</span>
                <svg
                  className={`ml-2 h-5 w-5 text-primary transition-transform ease-out duration-200 ${
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
                  <div className="bg-white p-5">
                    <div className="container mx-auto items-start justify-start py-2 flex  flex-col  overflow-x-auto">
                      {[
                        "Literie",
                        "Draps",
                        "Coussins",
                        "Couettes",
                        "Oreillers",
                        "Plaids",
                        "Taies d'oreiller",
                        "Housses de matelas",
                      ].map((category, index) => (
                        <Link
                          to="/products"
                          key={index}
                          className="px-4 py-1 whitespace-nowrap text-gray-700 hover:text-primary cursor-pointer rounded-full "
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="#about"
              className="text-base font-medium text-primary hover:text-primary-dark"
            >
              A propos
            </a>

            <Link
              to="/contact"
              className="text-base font-medium text-primary hover:text-primary-dark"
            >
              Contact
            </Link>
          </nav>
          <div className="flex justify-end ">
            {/* Icons */}
            <div className="flex items-center space-x-2">
              <a
                href="#"
                onClick={() => setShowModal(true)}
                className="text-primary flex space-x-2"
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
                className=" relative px-2 whitespace-nowrap inline-flex items-center justify-center text-primary font-bold cursor-pointer hover:text-primary-dark"
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
                  <div className="absolute w-4 h-4 p-0.15 bg-primary -top-2 -right-1 rounded-full text-white text-xs text-center">
                    {cartLength}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile View */}
      <nav className="md:hidden shadow-xl bg-[#ffde43] ">
        <div className="flex items-center justify-between p-2">
          <button className="text-gray-500" onClick={() => setOpen(!open)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <Link to="/" className="text-primary text-xl font-bold">
            SLEEPWELL
          </Link>
          <div className="flex space-x-4">
            <a
              href="#"
              onClick={() => setShowModal(true)}
              className="text-gray-500 hover:text-primary flex space-x-2"
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
              className="relative whitespace-nowrap inline-flex items-center justify-center text-primary font-bold cursor-pointer hover:text-primary-dark"
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
                <div className="absolute w-4 h-4 p-0.15 bg-primary -top-2 -right-1 rounded-full text-white text-xs text-center">
                  {cartLength}
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="flex flex-col space-y-2 p-4  rounded-lg m-2">
            <div className="flex-1 mx-2 hidden md:flex items-center border   rounded-full px-4">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1.2em"
                width="1.2em"
                className="text-gray-400 mr-2  border-r-2"
              >
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
              </svg>
              <input
                type="text"
                placeholder="Recherchez des essentiels, literie et plus..."
                className="w-full  focus:outline-none rounded-full border-none"
              />
            </div>
            <a
              href="#"
              className="text-base font-medium text-primary hover:text-primary-dark"
            >
              Accueil
            </a>
            <a
              href="#products"
              className="text-base font-medium text-primary hover:text-primary-dark"
            >
              Produits
            </a>
            <div className="relative">
              <button
                type="button"
                className="group rounded-md justify-center text-primary hover:text-primary-dark inline-flex items-center text-base font-medium focus:outline-none"
                onClick={() => setFlyer(!flyer)}
              >
                <span>Categories</span>
                <svg
                  className={`ml-2 h-5 w-5 text-primary hover:text-primary-dark transition-transform ease-out duration-200 ${
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
                    ? "block translate-y-0"
                    : "hidden translate-y-1 pointer-events-none"
                } transition ease-out duration-200  w-screen max-w-md sm:px-0 lg:left-1/2 lg:-translate-x-1/2`}
              >
                <div className=" overflow-hidden">
                  <div className="container mx-auto items-start justify-start py-2 flex  flex-col  overflow-x-auto">
                    {[
                      "Literie",
                      "Draps",
                      "Coussins",
                      "Couettes",
                      "Oreillers",
                      "Plaids",
                      "Taies d'oreiller",
                      "Housses de matelas",
                    ].map((category, index) => (
                      <Link
                        to="/products"
                        key={index}
                        className="px-4 py-1 whitespace-nowrap text-gray-700 hover:text-primary cursor-pointer rounded-full "
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#about"
              className="text-base font-medium text-primary hover:text-primary-dark"
            >
              A propos
            </a>
            <Link
              to="/contact"
              className="text-base font-medium text-primary hover:text-primary-dark"
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
      {/* Auth Modal */}
      {showModal && <AuthentificationModal />}
    </>
  );
};

export default Navbar;
