// src/pages/Productspage.jsx

import { useState, useMemo } from "react";
import Product from "../components/ProductCard";
const productsData =[
    {
        id: 1,
        name: "Matelas en Mousse à Mémoire Premium",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Matelas",
        price: 799,
        rating: 4.5,
        reviews: 120,
      },
      {
        id: 2,
        name: "Couette en Duvet de Luxe",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Couvertures",
        price: 299,
        rating: 4.8,
        reviews: 85,
      },
      {
        id: 3,
        name: "Matelas à Ressorts Hybride",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Matelas",
        price: 999,
        rating: 4.7,
        reviews: 150,
      },
      {
        id: 4,
        name: "Housse Hypoallergénique en Soie",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Couvertures",
        price: 199,
        rating: 4.6,
        reviews: 60,
      },
      {
        id: 5,
        name: "Oreiller en Mousse à Mémoire",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Oreillers",
        price: 49,
        rating: 4.7,
        reviews: 200,
      },
      {
        id: 6,
        name: "Draps en Coton de Luxe",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Linge de lit",
        price: 129,
        rating: 4.9,
        reviews: 80,
      },
      {
        id: 7,
        name: "Cadre de Lit Réglable",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Cadres",
        price: 399,
        rating: 4.6,
        reviews: 50,
      },
      {
        id: 8,
        name: "Protector de Matelas Imperméable",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Protecteurs",
        price: 59,
        rating: 4.5,
        reviews: 65,
      },
      {
        id: 9,
        name: "Housse de Duvet en Coton Bio",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Couvertures",
        price: 159,
        rating: 4.4,
        reviews: 75,
      },
      {
        id: 10,
        name: "Surmatelas en Gel Rafraîchissant",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Matelas",
        price: 249,
        rating: 4.8,
        reviews: 90,
      },
      {
        id: 11,
        name: "Oreiller en Plumes",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Oreillers",
        price: 89,
        rating: 4.5,
        reviews: 140,
      },
      {
        id: 12,
        name: "Cadre de Lit en Bambou Réglable",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Cadres",
        price: 599,
        rating: 4.7,
        reviews: 45,
      },
      {
        id: 13,
        name: "Couverture en Sherpa Doux",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Linge de lit",
        price: 79,
        rating: 4.9,
        reviews: 110,
      },
      {
        id: 14,
        name: "Matelas de Soutien Ferme",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Matelas",
        price: 899,
        rating: 4.6,
        reviews: 130,
      },
      {
        id: 15,
        name: "Taies d'Oreiller en Soie de Luxe",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Linge de lit",
        price: 39,
        rating: 4.9,
        reviews: 125,
      },
      {
        id: 16,
        name: "Matelas Écologique",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Matelas",
        price: 1199,
        rating: 4.8,
        reviews: 100,
      },
      {
        id: 17,
        name: "Couverture de Matelas Chauffante",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Matelas",
        price: 199,
        rating: 4.7,
        reviews: 65,
      },
      {
        id: 18,
        name: "Couette en Laine Bio",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Couvertures",
        price: 259,
        rating: 4.5,
        reviews: 85,
      },
      {
        id: 19,
        name: "Draps de Collection d'Hôtel de Luxe",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Linge de lit",
        price: 219,
        rating: 4.8,
        reviews: 95,
      },
      {
        id: 20,
        name: "Oreiller en Mousse à Mémoire Rafraîchissante",
        image: "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
        category: "Oreillers",
        price: 59,
        rating: 4.6,
        reviews: 190,
      },
];

export default function Productspage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; // Define how many products per page
  
    // Extract unique categories from products data
    const categories = useMemo(() => {
      const cats = productsData.map((product) => product.category);
      return ["All", ...new Set(cats)];
    }, []);
  
    // Filtered products based on search, category, and price
    const filteredProducts = useMemo(() => {
      return productsData.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        const matchesPrice =
          product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      });
    }, [searchTerm, selectedCategory, priceRange]);
  
    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  

  return (
    <div>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {/* Breadcrumb */}
          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div>
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      <svg
                        className="me-2.5 h-3 w-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                      </svg>
                      Accueil
                    </a>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 rtl:rotate-180"
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
                          d="m9 5 7 7-7 7"
                        />
                      </svg>
                      <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                        Produits
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            {/* Search Bar */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-24 rounded-lg border border-gray-300 px-2 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-24 rounded-lg border border-gray-300 px-2 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {currentProducts.map((product) => (
             <Product product={product} />
            ))}
          </div>

          {/* Show More Button */}
          <div className="mt-6 flex justify-center">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="mx-1 rounded-md border px-3 py-1"
            >
              Précedent
            </button>
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num + 1)}
                className={`mx-1 rounded-md border px-3 py-1 ${
                  currentPage === num + 1
                    ? "bg-primary-500 text-white"
                    : "bg-white text-primary-500"
                }`}
              >
                {num + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="mx-1 rounded-md border px-3 py-1"
            >
              Suivant
            </button>
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="w-full text-center text-gray-500 dark:text-gray-400">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
