// components/BeddingCategories.js
import React from "react";
import { Link } from "react-router-dom";
const categories = [
  {
    id: 1,
    name: "Draps",
    image:
      "https://noom-literie.com/cdn/shop/collections/WhatsApp_Image_2022-10-04_at_3.32.59_PM.jpg?v=1664897898&width=535",
  },
  {
    id: 2,
    name: "Couettes",
    image:
      "https://noom-literie.com/cdn/shop/collections/WhatsApp_Image_2022-10-03_at_12.50.20_PM.jpg?v=1664986031&width=535",
  },
  {
    id: 3,
    name: "Oreillers",
    image:
      "https://noom-literie.com/cdn/shop/collections/WhatsApp_Image_2022-10-02_at_5.34.51_PM.jpg?v=1705959252&width=535",
  },
  {
    id: 4,
    name: "Coussins",
    image:
      "https://noom-literie.com/cdn/shop/collections/WhatsApp_Image_2022-10-03_at_12.50.26_PM.jpg?v=1726869107&width=535",
  },
  {
    id: 5,
    name: "Plaids",
    image:
      "https://medias.maisonsdumonde.com/image/upload/ar_1:1,c_fill,f_auto,q_auto,w_354/v1/img/plaid-polaire-texture-vert-sauge-150x230-1000-12-11-231620_1.jpg",
  },
  {
    id: 6,
    name: "Taies d'oreiller",
    image:
      "https://imagescdn.simons.ca/images/8284-1212160-10-A1_2/la-taie-d-oreiller-unie-pour-enfant.jpg?__=15",
  },
  {
    id: 7,
    name: "Housses de matelas",
    image:
      "https://saatva.imgix.net/products/waterproof-mattress-protector/lifestyle-corner/waterproof-mattress-protector-lifestyle-corner-16-9.jpg?w=1200&fit=crop&auto=format",
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between border-b border-gray-500 mb-4">
          <h2 className="font-semibold text-lg sm:text-2xl border-b-2 border-primary text-gray-800 text-start ">
            Magasinez parmi{" "}
            <span className="cursor-default font-bold capitalize text-primary">
              les meilleures catégories
            </span>{" "}
            de literie
          </h2>
          <Link
            to="/products"
            className="text-sm sm:text-base font-bold text-gray-500 hover:underline"
          >
            Voir Tout
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`relative overflow-hidden transform transition duration-300 rounded-lg group cursor-pointer ${
                index % 2 === 0 ? "rotate-2" : "-rotate-2"
              }`}
              style={{
                margin: `${Math.random() * 10}px ${Math.random() * 5}px`,
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 h-48 bg-black bg-opacity-30 rounded-lg flex items-center justify-center transition-opacity duration-300">
                <span className="text-white text-lg font-semibold flex items-center gap-2 cursor-default">
                  {category.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
