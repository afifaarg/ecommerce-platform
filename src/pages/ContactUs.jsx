import React from "react";

const ContactUs = () => {
  return (
    <section id="contact" className="py-12 px-4">
      <div className="container rounded-xl bg-primary mx-auto flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12">
        {/* Left Section */}
        <div className="md:w-1/2 p-4 flex flex-col items-start space-y-6">
          <h2 className="text-4xl font-bold text-center text-secondary-dark px-4">
            Rejoignez-nous
          </h2>
          <div className="space-y-2 text-white p-4">
            <h3 className="text-lg font-bold text-secondary-dark">
              Informations de contact
            </h3>
            <div className="flex space-x-2 items-center">
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                height="1.5em"
                width="1.5em"
                className="text-white"
              >
                <path
                  fill="currentColor"
                  d="M12 0H3c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1zM7.5 15.278a.778.778 0 110-1.555.778.778 0 010 1.555zM12 13H3V2h9v11z"
                />
              </svg>
              <p> +213 123 456 789</p>
            </div>
            <div className="flex space-x-2 items-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1.5em"
                width="1.5em"
                className="text-white"
              >
                <path d="M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>
              <p> contact@sleepwell.com</p>
            </div>
          </div>
          <div className="w-full h-64 rounded-lg overflow-hidden px-4">
            <h3 className="text-lg font-bold py-1 text-secondary-dark">
              Rendez Nous Visite
            </h3>
            <iframe
              title="Map of Bab Ezzouar"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26226707.13155883!2d2.434463267916207!3d36.72425338611088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f4e2aaf06df29f%3A0xfde2a3f4c977a2b3!2sBab%20Ezzouar%2C%20Algeria!5e0!3m2!1sen!2s!4v1696755389324!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full md:w-1/2 bg-gray-50 rounded-b-lg sm:rounded-r-lg shadow-lg  p-6">
          <h3 className="text-3xl font-bold text-primary-dark mb-4">
            Contactez Nous!
          </h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Nom
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-primary rounded-full outline-none focus:ring focus:ring-primary-dark"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-primary rounded-full outline-none focus:ring focus:ring-primary-dark"
                placeholder="Votre email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 border border-primary rounded-lg outline-none focus:ring focus:ring-primary-dark"
                placeholder="Votre message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-primary-dark text-white rounded hover:bg-primary focus:outline-none focus:ring focus:ring-primary-dark"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
