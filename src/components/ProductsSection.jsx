import Product from "./ProductCard";
const products = [
  {
    id: 1,
    image:
      "https://noom-literie.com/cdn/shop/files/141af561f9577dd74cdefb1cb2d8809f.jpg?v=1726862626&width=360",
    category: "Matelas",
    title: "Matelas Confort Plus",
    price: 299.99,
  },
  {
    id: 2,
    image:
      "https://noom-literie.com/cdn/shop/files/141af561f9577dd74cdefb1cb2d8809f.jpg?v=1726862626&width=360",
    category: "Matelas",
    title: "Matelas Ergonomique",
    price: 349.99,
  },
  {
    id: 3,
    image:
      "https://noom-literie.com/cdn/shop/files/141af561f9577dd74cdefb1cb2d8809f.jpg?v=1726862626&width=360",
    category: "Meuble",
    title: "Canapé en Cuir",
    price: 599.99,
  },
  {
    id: 4,
    image:
      "https://noom-literie.com/cdn/shop/files/141af561f9577dd74cdefb1cb2d8809f.jpg?v=1726862626&width=360",
    category: "Meuble",
    title: "Table en Bois Massif",
    price: 199.99,
  },
  {
    id: 5,
    image:
      "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
    category: "Matelas",
    title: "Matelas Hybride",
    price: 399.99,
  },
  {
    id: 6,
    image:
      "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
    category: "Meuble",
    title: "Fauteuil Relax",
    price: 249.99,
  },
  {
    id: 7,
    image:
      "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
    category: "Matelas",
    title: "Matelas Bio",
    price: 349.99,
  },
  {
    id: 8,
    image:
      "https://noom-literie.com/cdn/shop/files/paulo.jpg?v=1701957615&width=360",
    category: "Meuble",
    title: "Bibliothèque Moderne",
    price: 159.99,
  },
];

export default function ProductsSection() {
  return (
    <div className="mt-2" id="products">
      <div className="py-2 border-primary-dark flex flex-col justify-center mx-12 items-center">
        <h1 className="font-bold pb-2 text-2xl sm:text-4xl text-primary-dark  text-start">
          Nouveautés Produits
        </h1>
        <a href="" className="text-lg text-primary underline">
          Voir Plus
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-12 py-8">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
