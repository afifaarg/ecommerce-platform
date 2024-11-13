import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge,
  Pagination,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";

export default function OrdersTable({ resultsPerPage, filter }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [commandes, setCommandes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);

  const onPageChange = (p) => setPage(p);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/backendAPI/orders/"
        );
        setCommandes(response.data);
        console.log(response.data);
        setTotalResults(response.data.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };
    fetchCommandes();
  }, []);

  const openModal = (commande) => {
    setSelectedCommande(commande);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCommande(null);
    setIsModalOpen(false);
  };

  const updateCommandeStatus = async (commandeId, status) => {
    try {
      console.log(status);
      await axios.patch(
        `http://127.0.0.1:8000/backendAPI/orders/${commandeId}/`,
        { status }
      );
      const response = await axios.get(
        "http://127.0.0.1:8000/backendAPI/orders/"
      );
      setCommandes(response.data);

      closeModal();
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut de la commande :",
        error
      );
    }
  };

  useEffect(() => {
    const filteredData = filter
      ? commandes.filter((commande) => commande.status.toLowerCase() === filter)
      : commandes;
    setData(
      commandes.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    );
  }, [page, resultsPerPage, filter, commandes]);

  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nom du Client</TableCell>
              <TableCell>ID de Commande</TableCell>
              <TableCell>Prix Total</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Date de Commande</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((commande) => (
              <TableRow key={commande.id}>
                <TableCell>
                  <span className="font-semibold">
                    {commande.customer_fullname}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">#{commande.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{commande.total_price} DZD</span>
                </TableCell>
                <TableCell>
                  <div
                    className={
                      commande.status === "En attente"
                        ? "bg-orange-500 w-fit text-white p-1  rounded"
                        : commande.status === "Confirmé"
                        ? "bg-green-500 w-fit text-white p-1  rounded"
                        : "bg-red-500 w-fit text-white p-1  rounded"
                    }
                  >
                    {commande.status}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(commande.created_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => openModal(commande)}
                    className="bg-primary text-white text-sm p-1 px-2 rounded-lg hover:shadow-lg"
                  >
                    Voir détails
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Navigation de la table"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      {selectedCommande && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          className="w-3/4 h-4/5top-1 md:w-1/2 mx-auto bg-white p-6 rounded-xl"
        >
          <ModalBody>
            <h2 className="text-lg font-semibold mb-4">
              Détails de la Commande
            </h2>
            <div className="border-b py-4">
              <p>
                <strong>Nom du Client :</strong>{" "}
                {selectedCommande.customer_fullname}
              </p>
              <p>
                <strong>Téléphone :</strong>{" "}
                {selectedCommande.customer_phonenumber}
              </p>
              <p>
                <strong>Adresse de Livraison :</strong>{" "}
                {selectedCommande.shipping_address}
              </p>
              <p>
                <strong>Adresse de Facturation :</strong>{" "}
                {selectedCommande.billing_address}
              </p>
              <p>
                <strong>Prix Total :</strong> {selectedCommande.total_price} DZD
              </p>
              <p>
                <strong>Statut :</strong> {selectedCommande.status}
              </p>
              <p>
                <strong>Date de Commande :</strong>{" "}
                {new Date(selectedCommande.created_at).toLocaleDateString()}
              </p>
            </div>

            <h3 className="text-lg text-black mb-1font-semibold mt-4">
              Articles
            </h3>
            <TableContainer>
              <Table className="overflow-x-hidden">
                <TableHeader>
                  <tr>
                    <TableCell>Reference d'article</TableCell>
                    <TableCell>Nom de l'Article</TableCell>
                    <TableCell>Prix Unitaire</TableCell>
                    <TableCell>Quantité</TableCell>
                    <TableCell>Prix Total</TableCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {selectedCommande.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product_reference}</TableCell>
                      <TableCell>{item.product_name}</TableCell>
                      <TableCell>{item.prix_unitaire}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.total_price} DZD</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter className="px-1">
            <span
              onClick={closeModal}
              className="mr-auto text-primary font-bold cursor-default hover:underline"
            >
              Fermer
            </span>
            <button
              onClick={() =>
                updateCommandeStatus(selectedCommande.id, "Confirmé")
              }
              className="bg-green-500 text-white mr-2 p-1 px-2 rounded-lg shadow-lg"
            >
              Confirmer la Commande
            </button>
            <button
              onClick={() =>
                updateCommandeStatus(selectedCommande.id, "Annulé")
              }
              className="bg-red-500 text-white mr-2 p-1 px-2 rounded-lg shadow-lg"
            >
              Annuler la Commande
            </button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
