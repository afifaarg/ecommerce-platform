import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import slick CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick theme CSS

// Sample products data
const products = [
  {
    id: 5,
    image:
      "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
    category: "Matelas",
    name: "Matelas Hybride",
    price: 399.99,
  },
  {
    id: 6,
    image:
      "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
    category: "Meuble",
    name: "Fauteuil Relax",
    price: 249.99,
  },
  {
    id: 7,
    image:
      "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
    category: "Matelas",
    name: "Matelas Bio",
    price: 349.99,
  },
  {
    id: 8,
    image:
      "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
    category: "Meuble",
    name: "Bibliothèque Moderne",
    price: 159.99,
  },
];

// Carousel settings
const settings = {
  dots: true,
  infinite: true,
  speed: 400,
  slidesToShow: 4,
  arrows: false,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function SimilarProducts() {
  return (
    <div className="mt-2 mb-10  overflow-hidden" id="products">
      <Slider {...settings} className=" max-w-full px-2 py-6 mb-6">
        {products.map((product) => (
          <div key={product.id} className="px-2">
          <div
      key={product.id}
      className="rounded-xl border border-gray-200 bg-white  hover:shadow-xl shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="h-64 w-full rounded-t-xl overflow-hidden">
        <Link
          to={`/products/1`} >
          <img
            className="w-full h-full rounded-t-xl object-cover object-cover transform transition-transform duration-500 hover:scale-110"
            src={product.image}
            alt={product.name}
          />
          {/* If you have dark mode images, you can add them here */}
          </Link>
      </div>
      <div className="pt-4 p-4">
        {/* Product Name */}
        <a
          href="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
        >
          {product.name}
        </a>
      </div>
    </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
