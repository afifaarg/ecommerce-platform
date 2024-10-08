import { useEffect, useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";

function Carousel() {
  const [slides, setSlides] = useState([
    {
      id: 1,
      src: "https://pbs.twimg.com/media/EG75BrQU4AAx7p9.jpg",
      text: "Confort ultime à prix réduit ! Profitez de nos matelas haut de gamme avec des remises exclusives. Transformez vos nuits en moments de pure détente.",
    },
    {
      id: 2,
      src: "https://www.slumbersearch.com/img/banner-header.jpg",
      text: "Réinvente ton intérieur avec nos meubles tendances ! Design moderne et qualité supérieure, à des prix imbattables. Offre spéciale cette semaine !",
    },
    {
      id: 3,
      src: "https://pbs.twimg.com/media/EG75BrQU4AAx7p9.jpg",
      text: "Apportez une touche d'élégance à votre maison avec nos objets de décoration. Promotions exceptionnelles sur une large gamme d'articles !",
    },
  ]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
    startAutoSlide();
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  if (!slides.length || !slides[index]) {
    return null;
  }

  return (
    <section className="relative">
      {/* Carousel Section */}
      <div
        className="relative py-32 flex content-center items-center justify-center min-h-screen-75"
        {...swipeHandlers}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${slides[index].src})`,
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="text-center">
                <h1 className="text-secondary font-semibold text-2xl mb-4">
                  {slides[index].text}
                </h1>
                <p className="text-secondary-dark text-center text-xl">
                  Profitez de nos meilleures offres maintenant !
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center justify-center">
          <button onClick={prevSlide} className="text-white text-4xl p-4">
            &#10094;
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center justify-center">
          <button onClick={nextSlide} className="text-white text-4xl p-4">
            &#10095;
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-0 w-full flex justify-center">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-3 w-3 rounded-full mx-2 ${
                idx === index ? "bg-white" : "bg-gray-500"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <section className="pb-12 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white bg-primary p-3 text-center inline-flex items-center justify-center  mb-5 shadow-lg rounded-full">
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      height="2em"
                      width="2em"
                    >
                      <path
                        fill="currentColor"
                        d="M15 9.5L10.5 14 9 12.5l-1 1 2.5 2.5 5.5-5.5z"
                      />
                      <path
                        fill="currentColor"
                        d="M7 12h5v-1.799c-1.05-.613-2.442-1.033-4-1.16v-.825c1.102-.621 2-2.168 2-3.716C10 2.015 10 0 7 0S4 2.015 4 4.5c0 1.548.898 3.095 2 3.716v.825C2.608 9.318 0 10.985 0 13h7v-1z"
                      />
                    </svg>
                  </div>
                  <h6 className="text-xl font-semibold">
                    Leader sur le marché
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    Forts de notre expérience et de notre expertise, nous sommes
                    le leader incontesté du secteur, avec des milliers de
                    clients satisfaits.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white bg-primary p-3 text-center inline-flex items-center justify-center  mb-5 shadow-lg rounded-full">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="2em"
                      width="2em"
                    >
                      <path d="M3 4h14v4h3l3 4v5h-2a3 3 0 01-3 3 3 3 0 01-3-3H9a3 3 0 01-3 3 3 3 0 01-3-3H1V6a2 2 0 012-2m14 5.5V12h4.47L19.5 9.5H17m-11 6A1.5 1.5 0 004.5 17 1.5 1.5 0 006 18.5 1.5 1.5 0 007.5 17 1.5 1.5 0 006 15.5m12 0a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5M8 14l6-6-1.41-1.42L8 11.17 5.91 9.08 4.5 10.5 8 14z" />
                    </svg>
                  </div>
                  <h6 className="text-xl font-semibold">Livraison rapide</h6>
                  <p className="mt-2 mb-4 text-dark">
                    Nous offrons une livraison express en moins de 24 heures,
                    assurant que vos colis arrivent à temps, à chaque fois.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white bg-primary p-3 text-center inline-flex items-center justify-center  mb-5 shadow-lg rounded-full">
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      height="2em"
                      width="2em"
                    >
                      <path d="M3 4h14v4h3l3 4v5h-2a3 3 0 01-3 3 3 3 0 01-3-3H9a3 3 0 01-3 3 3 3 0 01-3-3H1V6a2 2 0 012-2m14 5.5V12h4.47L19.5 9.5H17m-11 6A1.5 1.5 0 004.5 17 1.5 1.5 0 006 18.5 1.5 1.5 0 007.5 17 1.5 1.5 0 006 15.5m12 0a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5M8 14l6-6-1.41-1.42L8 11.17 5.91 9.08 4.5 10.5 8 14z" />
                    </svg>
                  </div>
                  <h6 className="text-xl font-semibold">
                    Satisfaction garantie
                  </h6>
                  <p className="mt-2 mb-4 text-dark">
                    Notre engagement envers la qualité et la satisfaction client
                    nous permet d'offrir une garantie complète sur tous nos
                    produits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Carousel;
