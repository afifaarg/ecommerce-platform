import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function ProductPage() {
  const [productData, setProductData] = useState({});
  const [images, setImages] = useState([]);
  const [isLightbox, setLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams(); // This will give you the product id

  useEffect(() => {
    const idProduct = id;
    axios
      .get(`https://ecommerce-platform-api.onrender.com/backendAPI/produits/${idProduct}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle success
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
        // Detailed error handling
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error(
            `Error: ${error.response.data.detail || "Something went wrong!"}`
          );
        } else if (error.request) {
          console.error("No response from server:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  }, [id]); // Add `id` to dependencies to fetch data when it changes

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
  return (
    <section className="w-full px-4 sm:w-4/5 mx-auto py-8 flex flex-col">
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

      <div className="flex items-start space-y-4  gap-2  flex-col sm:flex-row max-sm:py-0 max-sm:px-0 mb-10">
        <div className="grid grid-cols-1 w-full ">
          {selectedImage && (
            <img
              src={selectedImage}
              onClick={handleClick}
              className="rounded-lg w-[500px] h-[500px] max-sm:rounded-none"
              alt=""
            />
          )}
          <div className="grid grid-cols-4 gap-3 pt-4 w-10/12">
            {images.map((image, imageIndex) => {
              return (
                <button key={imageIndex} className="focus:opacity-60">
                  <img
                    className="rounded-md hover:opacity-70 w-[150px] h-[100px]"
                    src={image} // Directly use the image URL
                    alt={`image thumbnail ${imageIndex + 1}`}
                    onClick={() => fullSizeClick(image, imageIndex)} // Pass the image and index
                  />
                </button>
              );
            })}
          </div>
          <div
            onClick={handleOverlayClick}
            style={{ display: isLightbox ? "flex" : "none" }}
            className="flex flex-col items-center justify-center group-hover:block fixed inset-0 bg-black bg-opacity-50 max-sm:justify-start"
          >
            <div className="relative flex flex-col items-end">
              <button
                src="images/icon-previous.svg"
                onClick={prevImage}
                className="hover:opacity-80 cursor-pointer bg-white rounded-full w-fit h-[44px] absolute -left-5 top-1/2 transform -translate-y-1/2 px-4 py-2 max-sm:left-0"
              ></button>
              <img
                src="images/icon-next.svg"
                onClick={nextImage}
                className="hover:opacity-80 cursor-pointer bg-white rounded-full w-fit h-[44px] absolute -right-5 top-1/2 transform -translate-y-1/2 px-4 py-2 max-sm:right-0"
              />
              <svg
                className=" fill-white active:fill-orange cursor-pointer"
                width="15"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleClick}
              >
                <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" />
              </svg>
              <img
                className="rounded-lg max-sm:mt-12 max-sm:h-2/3"
                src={selectedImage} // Use the selected image for the lightbox
                alt={`Image ${currentIndex + 1}`}
                width={550}
              />
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="max-w-lg px-4 py-12">
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-4xl">
            {productData.name}
          </h2>
          <p className="text-gray-500 text-sm">
            By{" "}
            <a href="#" className="text-primary-dark font-bold hover:underline">
              SLEEPWELL{" "}
            </a>
          </p>

          <div className="flex items-center space-x-4 my-4">
            <div>
              <div className="rounded-lg bg-gray-100 flex py-1 px-3">
                <span className="font-bold text-primary-dark text-xl">
                  {productData.price}
                </span>
                <span className="text-indigo-400 ml-1 mt-1">DZD</span>
              </div>
            </div>
            {/* <div className="flex-1">
            <p className="text-green-500 text-xl font-semibold">Save 12%</p>
            <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
          </div> */}
          </div>

          <p className="text-gray-500">{productData.description}</p>

          <div className="flex py-4 space-x-4">
            <button
              type="button"
              className="h-14 flex items-center space-x-3 px-6 py-2 font-semibold rounded-xl bg-primary text-secondary hover:shadow-lg active:scale-80 transition-transform	active:outline-none"
            >
              <svg fill="none" viewBox="0 0 15 15" height="1.5em" width="1.5em">
                <path
                  fill="currentColor"
                  d="M6.929.757L4.383 5h6.234L8.07.757 8.93.243 11.783 5h2.514c.388 0 .703.315.703.703v.439a18.96 18.96 0 01-2.002 8.48.684.684 0 01-.612.378H2.614a.685.685 0 01-.612-.379A18.96 18.96 0 010 6.141v-.438C0 5.315.315 5 .703 5h2.514L6.07.243l.858.514z"
                />
              </svg>
              <span>Ajouter Au Panier</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
