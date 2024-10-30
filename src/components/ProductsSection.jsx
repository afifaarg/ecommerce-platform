import { Link } from "react-router-dom";
import Product from "./ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import slick CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick theme CSS

// Sample products data
const products = [
  {
    id: 1,
    image:
      "https://noom-literie.com/cdn/shop/files/141af561f9577dd74cdefb1cb2d8809f.jpg?v=1726862626&width=360",
    category: "Matelas",
    name: "Matelas Confort Plus",
    price: 299.99,
  },
  {
    id: 2,
    image:
      "https://noom-literie.com/cdn/shop/files/141af561f9577dd74cdefb1cb2d8809f.jpg?v=1726862626&width=360",
    category: "Matelas",
    name: "Matelas Ergonomique",
    price: 349.99,
  },
  {
    id: 3,
    image:
      "https://noom-literie.com/cdn/shop/files/141af561f9577dd74cdefb1cb2d8809f.jpg?v=1726862626&width=360",
    category: "Meuble",
    name: "Canapé en Cuir",
    price: 599.99,
  },
  {
    id: 4,
    image:
      "https://noom-literie.com/cdn/shop/files/141af561f9577dd74cdefb1cb2d8809f.jpg?v=1726862626&width=360",
    category: "Meuble",
    name: "Table en Bois Massif",
    price: 199.99,
  },
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
  arrows: true,
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

export default function ProductsSection() {
  return (
    <div className="mt-14 mb-10 mx-auto  overflow-hidden" id="products">
      {" "}
      {/* Added margin-bottom here */}
      <div className="mt-4 border-gray-500 flex justify-between border-b mx-12 items-center">
        <h1 className="font-semibold text-xl sm:text-2xl border-b-2 border-primary text-gray-800 text-start ">
          Profitez des meilleures{" "}
          <span className="font-bold cursor-default text-primary">
            Nouveautés
          </span>
        </h1>
        <Link
          to="/products"
          className="text-lg font-bold text-gray-500 hover:underline"
        >
          Voir Tout
        </Link>
      </div>
      <Slider {...settings} className="max-w-full px-4 mx-4 py-6 mb-6">
        {products.map((product) => (
          <div key={product.id} className="px-2">
            {" "}
            {/* Added padding for space between cards */}
            <Product product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
