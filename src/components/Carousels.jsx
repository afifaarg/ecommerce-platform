import React, { useState, useEffect } from "react";
export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of image paths
  const images = [
    "https://pictureserver.net/pic_storage/pic/a0/73/french_src_mobilebanner_picid_8896_image.jpg?ver=1", // Replace with actual image paths
    "https://contract.sonpura.com/WebRoot/StoreContract/Shops/SonpuraContract/MediaGallery/landing_colchones/Banner_landing_FR_comprimido.jpg",
    "https://www.lematelas.fr/media//wysiwyg/page_cms/page_promotion/2023-05-epeda-721x250pagecms-min.jpg",
  ];

  // Automatically switch to the next slide every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, [currentSlide]);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };
  return (
    <>
      {/* Carousel */}
      <div className="relative overflow-hidden">
        {/* Carousel */}
        <div className="relative overflow-hidden  flex content-center items-center justify-center h-[500px]">
          {/* Wrapper for sliding animation */}
          <div
            className="flex transition-transform duration-1000 ease-in-out h-full h-[500px]" // Adjust the duration to 1000ms (1 second) for slower transitions
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${images.length * 100}%`,
            }}
          >
            {/* Carousel Images using img tag for better control */}
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className=" object-cover flex-shrink-0 w-full h-full bg-center bg-cover" // object-cover ensures the image fills the container while maintaining aspect ratio
              />
            ))}
          </div>

          {/* Carousel Navigation Buttons */}
          <span
            onClick={prevSlide}
            className="absolute cursor-default left-0 top-1/2 transform -translate-y-1/2 bg-white text-primary font-bold py-2 px-4 opacity-50 hover:opacity-100"
          >
            &#10094;
          </span>
          <span
            onClick={nextSlide}
            className="absolute cursor-default right-0 top-1/2 transform -translate-y-1/2 bg-white text-primary font-bold py-2 px-4 opacity-50 hover:opacity-100"
          >
            &#10095;
          </span>
        </div>
      </div>
    </>
  );
}