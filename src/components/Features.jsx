import React from "react";

const Features = () => {
  return (
    <section id="about" className="bg-primary py-14 rounded-xl mx-4">
      <div className="container flex flex-col px-4 mx-auto space-y-12 md:space-y-0 md:flex-row">
        {/* Left Section - Introduction */}
        <div className="flex flex-col space-y-6 md:w-1/2 my-4">
          <h2 className="text-2xl md:text-4xl text-center sm:text-left font-bold text-secondary-light">
            Qui est{" "}
            <span className="font-serif text-secondary-dark">SLEEPWELL</span> ?
          </h2>
          <h3 className="text-2xl md:text-5xl font-bold text-white text-center md:text-left">
            Découvrez le confort d'un sommeil réparateur
          </h3>
          <p className="text-base md:text-lg text-secondary-light text-center md:text-left">
            Nos matelas offrent un soutien personnalisé et un confort inégalé,
            pour un sommeil paisible et un réveil en pleine forme.
          </p>
        </div>

        {/* Right Section - Features List */}
        <div className="flex flex-col space-y-8 my-4 md:w-1/2">
          {/* Feature 1 */}
          <FeatureItem
            number="01"
            title="Matériaux de qualité supérieure"
            description="Nos matelas sont fabriqués avec des matériaux durables et confortables, sélectionnés pour une qualité optimale."
          />

          {/* Feature 2 */}
          <FeatureItem
            number="02"
            title="Confort personnalisé"
            description="Trouvez le matelas idéal parmi une gamme de fermetés pour répondre à vos besoins spécifiques."
          />

          {/* Feature 3 */}
          <FeatureItem
            number="03"
            title="Offres spéciales"
            description="Profitez de promotions régulières sur notre sélection de matelas haut de gamme."
          />
        </div>
      </div>
    </section>
  );
};

/* FeatureItem Component for cleaner structure */
const FeatureItem = ({ number, title, description }) => (
  <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
    <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
      <div className="flex items-center space-x-2">
        <div className="px-4 py-2 text-sm md:text-base text-white rounded-full md:py-1 bg-brightRed">
          {number}
        </div>
        <h3 className="text-sm md:text-base font-bold text-secondary-light md:mb-4 md:hidden">
          {title}
        </h3>
      </div>
    </div>
    <div>
      <h3 className="hidden mb-4 text-lg md:text-xl font-bold text-secondary-dark md:block">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-50">{description}</p>
    </div>
  </div>
);

export default Features;
