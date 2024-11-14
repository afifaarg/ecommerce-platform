import React, { useState, useEffect } from "react";
import ChatUserCard from "../AdminComponents/ChatUserCard";
// import SelectChatWaiter from "../AdminComponents/SelectChatWait/SelectChatWaiter";
import PageTitle from "../AdminComponents/Typography/PageTitle";
import SectionTitle from "../AdminComponents/Typography/SectionTitle";
import { Card, CardBody, Button } from "@windmill/react-ui";
import axios from "axios";

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contact forms from the backend
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-platform-api.onrender.com/backendAPI/contact/"
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const handleSelect = (user) => {
    setSelectedChat(user);
  };

  const handleCloseChat = async (id) => {
    try {
      await axios.patch(
        `https://ecommerce-platform-api.onrender.com/backendAPI/contact/${id}/`,
        {
          etat: "ferme",
        }
      );
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === id ? { ...contact, etat: "ferme" } : contact
        )
      );
      if (selectedChat?.id === id) {
        setSelectedChat((prev) => ({ ...prev, etat: "ferme" }));
      }
    } catch (error) {
      console.error("Erreur lors de la fermeture du chat:", error);
    }
  };

  const splitName = (fullName) => {
    const [nom, prenom] = fullName.split(" ");
    return { nom: nom || "", prenom: prenom || "" };
  };

  return (
    <div>
      <PageTitle>
        Messages Envoyés Sur le formulaire CONTACT sur le siteweb
      </PageTitle>
      {!selectedChat && <PageTitle>Communiquez avec vos clients</PageTitle>}

      {selectedChat && (
        <div className="flex items-center mt-6">
          <p className="mx-3 inline-flex text-xl text-gray-700 dark:text-gray-200">
            Message de la part de : {selectedChat.nom}
          </p>
          <span
            className={`ml-4 w-fit rounded-lg p-1 ${
              selectedChat.etat === "ferme" ? "bg-green-500" : "bg-red-500"
            } text-white font-semibold`}
          >
            {selectedChat.etat === "ferme" ? "Fermé" : "Ouvert"}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
        <div className="md:col-span-3">
          {!selectedChat ? (
            <div className="mt-32 flex flex-col justify-center items-center">
              {/* <SelectChatWaiter /> */}
              <p className="text-gray-600 dark:text-gray-400">
                Sélectionnez un chat
              </p>
            </div>
          ) : (
            <div className="mt-3 mb-8 mr-4">
              <Card className="shadow-md relative">
                <CardBody>
                  <div className="py-4">
                    <p>
                      <strong>Nom Complet :</strong> {selectedChat.nom}
                    </p>
                    <p>
                      <strong>Email :</strong> {selectedChat.email}
                    </p>
                  </div>
                  <hr />
                  <div className="mt-4">
                    <strong>Message :</strong>
                    <p className="text-sm m-3">{selectedChat.message}</p>
                  </div>
                </CardBody>
              </Card>
              {selectedChat.etat !== "fermé" && (
                <Button
                  className="mt-4 bg-gray-500 text-white hover:shadow-lg px-2 p-1 rounded-lg"
                  onClick={() => handleCloseChat(selectedChat.id)}
                >
                  Marquer comme fermé
                </Button>
              )}
            </div>
          )}
        </div>

        <div>
          <SectionTitle>Contacts</SectionTitle>
          {contacts.map((user) => {
            const { nom, prenom } = splitName(user.nom);
            return (
              <button
                key={user.id}
                className="flex items-center justify-start mb-1 border-b py-4 hover:bg-gray-50 cursor-pointer w-full text-left"
                onClick={() => handleSelect(user)}
              >
                <span className="bg-primary text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {nom.charAt(0)}
                  {prenom.charAt(0)}
                </span>
                <span className="text-dark font-bold px-4">{user.nom}</span>
                <span
                  className={`ml-4 w-fit rounded-lg px-1 ${
                    user.etat === "ferme" ? "bg-green-500" : "bg-red-500"
                  } text-white font-semibold`}
                >
                  {user.etat === "ferme" ? "Fermé" : "Ouvert"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chats;
