import React, { useState } from "react";

const FAQ = () => {
  // État pour gérer la question ouverte dans l'accordéon
  const [openQuestion, setOpenQuestion] = useState(null);

  // Fonction pour basculer l'affichage des réponses
  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  // Liste des questions et réponses FAQ
  const faqData = [
    {
      question: "Comment SLEEPWELL assure-t-il une nuit de sommeil parfaite ?",
      answer:
        "Nos matelas sont conçus avec des matériaux de première qualité et une technologie de pointe pour offrir un soutien personnalisé, s'adaptant à votre corps pour une expérience de sommeil inégalée.",
    },
    {
      question: "Puis-je personnaliser la fermeté de mon matelas ?",
      answer:
        "Absolument ! Nous proposons une gamme d'options de fermeté pour répondre à vos préférences, assurant ainsi l'équilibre parfait entre confort et soutien.",
    },
    {
      question: "Qu'est-ce qui distingue SLEEPWELL des autres marques ?",
      answer:
        "SLEEPWELL met l'accent sur des designs innovants, des matériaux haut de gamme et un engagement à offrir le sommeil le plus réparateur possible. La satisfaction de nos clients en témoigne.",
    },
    {
      question: "Proposez-vous des promotions ou des réductions ?",
      answer:
        "Oui ! Nous proposons régulièrement des offres spéciales sur une sélection de matelas. Restez à l'affût sur notre site pour découvrir les dernières promotions.",
    },
    {
      question: "Quelle est votre politique de livraison et de retour ?",
      answer:
        "Nous offrons une livraison rapide et gratuite, et vous pouvez tester votre nouveau matelas à domicile pendant 100 nuits. Si vous n'êtes pas satisfait, les retours sont simples et sans tracas !",
    },
  ];

  return (
    <section id="faq" className="py-12 px-4">
      <div className="container mx-auto">
        {/* Titre de la section FAQ */}
        <h2 className="text-4xl font-bold text-center text-primary-dark uppercase mb-8">
          Questions Fréquemment Posées
        </h2>

        {/* Élément de l'accordéon FAQ */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden border-2 border-primary"
            >
              {/* En-tête de la question */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex justify-between items-center p-4 bg-primary text-secondary-dark font-bold focus:outline-none"
              >
                <span>{item.question}</span>
                <span>{openQuestion === index ? "-" : "+"}</span>
              </button>

              {/* Section de la réponse dans le même conteneur avec bg-primary */}
              {openQuestion === index && (
                <div className="bg-primary">
                  <p className="px-4 py-2 text-white">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
