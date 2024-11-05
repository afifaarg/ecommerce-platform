import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SimilarProducts from "../components/SimilarProducts";
import CartButton from "../components/AddToCartButton";
export default function ProductPage() {
  const [productData, setProductData] = useState({});
  const [images, setImages] = useState([]);
  const [isLightbox, setLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productDimensions, setProductDimensions] = useState([
    {
      dimension: "38″ X 75″",
      price: 7800,
    },
    {
      dimension: "38″ X 75″",
      price: 8000,
    },
    {
      dimension: "38″ X 80″",
      price: 8500,
    },
    {
      dimension: "53″ X 75″",
      price: 9000,
    },
    {
      dimension: "38″ X 75″",
      price: 9500,
    },
  ]);
  const [selectedDimension, setSelectedDimension] = useState(
    productDimensions[0]
  );
  console.log(selectedDimension);
  // const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const idProduct = id;
    axios
      .get(
        `https://ecommerce-platform-api.onrender.com/backendAPI/produits/${idProduct}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("API RESPONSE", response.data);
          setProductData(response.data);
          setImages(response.data.gallery_images);
          setSelectedImage(response.data.gallery_images[0]);
        } else {
          console.log("Error Fetching Data:", response.status, response.data);
        }
      })

      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response from server:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  }, [id]);

  useEffect(() => {
    console.log("productUpdate", productData);
  }, [productData]);

  function handleClick() {
    setLightbox(!isLightbox);
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      setLightbox(!isLightbox);
    }
  }

  function fullSizeClick(image, index) {
    setSelectedImage(image);
    setCurrentIndex(index);
  }

  function nextImage() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSelectedImage(images[(currentIndex + 1) % images.length]);
  }

  function prevImage() {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    setSelectedImage(
      images[(currentIndex - 1 + images.length) % images.length]
    );
  }

  const productDetailItem = {
    images: [
      {
        original:
          "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail:
          "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        original:
          "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail:
          "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        original:
          "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail:
          "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        original:
          "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        thumbnail:
          "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        original:
          "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail:
          "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    title: "BIG ITALIAN SOFA",
    reviews: "150",
    availability: true,
    brand: "apex",
    category: "Sofa",
    sku: "BE45VGTRK",
    price: 450,
    previousPrice: 599,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque! Velit ratione illo maiores voluptates commodi eaque illum, laudantium non!",

    color: ["indigo", "red", "orange"],
  };
  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  return (
    <section className="flex flex-col mx-auto max-w-[1200px] border-b py-5">
      <div className="max-w-7xl px-4 py-4">
        <div className="flex items-center space-x-2 text-dark text-sm">
          <Link to="/" className="hover:underline hover:text-gray-600">
            Accueil
          </Link>
          <span>
            <svg
              className="h-5 w-5 leading-none text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <Link to="/products" className="hover:underline hover:text-gray-600">
            {productData.category}
          </Link>
          <span>
            <svg
              className="h-5 w-5 leading-none text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <span>{productData.name}</span>
        </div>
      </div>
      <div className="container flex-grow  sm:grid sm:grid-cols-2 ">
        {/* image gallery */}
        <div className="container  px-4 sm:px-2">
          <div className="grid grid-cols-1 w-full">
            {selectedImage && (
              <img
                src={selectedImage}
                onClick={handleClick}
                className="rounded-lg w-[500px] h-[500px] max-sm:rounded-none"
                alt=""
              />
            )}
            <div className="grid grid-cols-4 gap-3 pt-4 w-10/12">
              {images.map((image, imageIndex) => (
                <button key={imageIndex} className="focus:opacity-60">
                  <img
                    className="rounded-md hover:opacity-70 w-[150px] h-[100px]"
                    src={image}
                    alt={`image thumbnail ${imageIndex + 1}`}
                    onClick={() => fullSizeClick(image, imageIndex)}
                  />
                </button>
              ))}
            </div>
            <div
              onClick={handleOverlayClick}
              style={{ display: isLightbox ? "flex" : "none" }}
              className="flex flex-col items-center justify-center group-hover:block fixed inset-0 bg-black bg-opacity-50 max-sm:justify-start"
            >
              <div className="relative flex flex-col items-end">
                <button
                  onClick={prevImage}
                  className="hover:opacity-80 cursor-pointer bg-white rounded-full w-fit h-[44px] absolute -left-5 top-1/2 transform -translate-y-1/2 px-4 py-2 max-sm:left-0"
                ></button>

                <svg
                  className="fill-dark active:fill-orange cursor-pointer"
                  width="15"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleClick}
                >
                  <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" />
                </svg>
                <img
                  className="rounded-lg mt-10 h-2/3 z-50 "
                  src={selectedImage}
                  alt={`Image ${currentIndex + 1}`}
                  width={550}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto px-5 ">
          <h2 className="pt-4 text-3xl text-primary font-bold lg:pt-0">
            {productData.name}
            {productData.availability ? (
              <span className="ml-4 bg-green-600 p-1 text-xs text-white rounded-full">
                Disponible{" "}
              </span>
            ) : (
              <span className="ml-4 bg-red-600 p-1 text-xs text-white rounded-full">
                Rupture du Stock
              </span>
            )}
          </h2>
          <div className="mt-1">
            {/* <div className="flex items-center">
               <Rater
                style={{ fontSize: "20px" }}
                total={5}
                interactive={false}
                rating={3.5}
              /> 

              <p className="ml-3 text-sm text-gray-400">
                ({productDetailItem.reviews})
              </p>
            </div> */}
          </div>
          <p className="font-bold text-primary">
            Marque : <span className="font-normal">Marque</span>
          </p>
          <p className="font-bold text-primary">
            Cathegory:{" "}
            <span className="font-normal">{productData.category}</span>
          </p>
          <p className="font-bold text-primary">
            SKU: <span className="font-normal">{productData.reference}</span>
          </p>
          <p className="mt-4 text-4xl font-bold text-primary">
            {selectedDimension.price} DZD{" "}
          </p>
          <p className="pt-5 text-sm leading-5 text-gray-500">
            {productData.description}
          </p>
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Dimensions</p>
            <div className="flex gap-1">
              <select
                name="dimensions"
                onChange={(e) => {
                  // Parse the selected option's value back to an object
                  const selectedObj = JSON.parse(e.target.value);
                  setSelectedDimension(selectedObj); // Set the whole object to selectedDimension
                }}
                id=""
                className="rounded-lg w-28 px-2  outline-none space-x-2 focus:border-none focus:outline-none"
              >
                {productDimensions.map((x, index) => {
                  return (
                    <option value={JSON.stringify(x)} key={index}>
                      {x.dimension}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Couleurs</p>
            <div className="flex gap-1">
              {productDetailItem.color.map((x, index) => {
                return (
                  <div
                    key={index}
                    className={`h-8 w-8 cursor-pointer border rounded-full border-white bg-${x}-500 focus:ring-2 focus:ring-${x}-500 active:ring-2 active:ring-${x}-500`}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-7 flex flex-row items-center gap-2">
            <CartButton
              id={productData.id}
              name={productData.name}
              category={productData.category}
              image={productData.image}
              price={selectedDimension.price}
            />
            <button className="flex h-12 w-1/2 rounded-xl items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
              <AiOutlineHeart className="mx-2" />
              Liste des Favories
            </button>
          </div>
        </div>
      </div>
      {/* Tabs Section */}
      <div className="tabs">
        <div className="tab-links flex space-x-4 mb-4">
          <span
            onClick={() => setActiveTab("description")}
            className={`tab-link active:outline-none ${
              activeTab === "description" ? "active" : ""
            }`}
          >
            Produits Similaires{" "}
          </span>
          <span
            onClick={() => setActiveTab("feedbacks")}
            className={`tab-link ${activeTab === "feedbacks" ? "active" : ""}`}
          >
            Feedbacks
          </span>
        </div>

        <div className="tab-content mt-2">
          {activeTab === "description" && (
            <div className="tab-description">
              <h1 className="text-left text-2xl "></h1>
              <SimilarProducts />
            </div>
          )}
          {activeTab === "feedbacks" && (
            <div className="tab-feedbacks">
              <h3>Feedbacks</h3>
              <p>Aucun feedback disponible pour ce produit.</p>{" "}
              {/* Placeholder */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
