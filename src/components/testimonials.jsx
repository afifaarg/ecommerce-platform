import { Link } from "react-router-dom";
import { useState } from "react";

const testimonialsData = [
  {
    name: "Anisha Li",
    text: "“Manage a dynamisé le flux de travail de notre équipe. La possibilité de maintenir une visibilité sur les grandes étapes à tout moment motive tout le monde.”",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMrGabqGs2BewLyivOm2hAmQfJ_ZbhKSkct8xFOzezuLECXhu5iyLBo3uynv1022AbtDw&usqp=CAU",
  },
  {
    name: "Ali Bravo",
    text: "“Nous avons pu annuler tellement d'autres abonnements depuis que nous utilisons Manage. Il n'y a plus de confusion entre les canaux et tout le monde est beaucoup plus concentré.”",
    avatar:
      "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg",
  },
  {
    name: "Richard Watts",
    text: "“Gérer a vraiment amélioré notre efficacité. Nous avons enfin une vue d'ensemble sur nos projets.”",
    avatar:
      "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg",
  },
  {
    name: "Ahmed Zahir",
    text: "“La qualité des matelas que nous avons achetés ici est incroyable. Nous avons un sommeil bien meilleur maintenant!”",
    avatar:
      "https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg",
  },
  {
    name: "Fatima Bouaziz",
    text: "“Le service client est exceptionnel! J'ai reçu de l'aide pour choisir le matelas parfait.”",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMrGabqGs2BewLyivOm2hAmQfJ_ZbhKSkct8xFOzezuLECXhu5iyLBo3uynv1022AbtDw&usqp=CAU",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= testimonialsData.length - 4 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 4 : prevIndex - 1
    );
  };

  return (
    <section id="testimonials" className="bg-gray-50 py-12">
      {/* Container for heading and testimonials */}
      <div className="max-w-6xl px-5 mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-primary-dark">
          Pourquoi choisir nos matelas ?
        </h2>
        {/* Testimonials Container */}
        <div className="flex items-center justify-center mt-10">
          {/* Previous Button */}
          <button
            onClick={prevTestimonial}
            className=" hidden sm:block p-4 rounded-full bg-primary text-white hover:bg-primary-light"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
            </svg>
          </button>
          <div className="flex flex-col mt-12 space-y-4 sm:space-y-0 md:flex-row md:space-x-6">
            {testimonialsData
              .slice(currentIndex, currentIndex + 4)
              .map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-primary-light shadow-md md:w-1/4"
                >
                  <img
                    src={testimonial.avatar}
                    className="w-16 -mt-14 rounded-full border-2 border-primary"
                    alt={testimonial.name}
                  />
                  <h5 className="text-lg font-bold text-text-secondary-dark">
                    {testimonial.name}
                  </h5>
                  <p className="text-sm text-black">{testimonial.text}</p>
                </div>
              ))}
          </div>
          {/* Next Button */}
          <button
            onClick={nextTestimonial}
            className="hidden sm:block py-4 px-4 rounded-full bg-primary text-white hover:bg-primary-light hover:text-primary"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z" />
            </svg>
          </button>
        </div>
        {/* Button to get started */}
        <div className="my-16">
          <Link
            to="#"
            className="p-3 px-8 pt-2 font-bold  rounded-full baseline bg-primary text-white hover:shadow-lg hover:text-text-secondary "
          >
            Commander
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
