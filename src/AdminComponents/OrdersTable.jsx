import React, { useState, useEffect, useRef } from "react";
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
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";

export default function OrdersTable({ resultsPerPage, filter }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [commandes, setCommandes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [selectedDeleteOrder, setSelectedDeleteOrder] = useState(null);
  const onPageChange = (p) => setPage(p);
  const printRef = useRef();
  const API_URL = "http://127.0.0.1:8000/backendAPI/orders/";
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
  const openDeleteModal = (commande) => {
    setSelectedDeleteOrder(commande);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCommande(null);
    setIsModalOpen(false);
  };
  const closeDeleteModal = () => {
    setSelectedDeleteOrder(null);
    setIsDeleteModalOpen(false);
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

  async function handleDeleteOrder() {
    console.log("Deleting order ..." + selectedDeleteOrder);
    try {
      if (selectedDeleteOrder) {
        setData(data.filter((item) => item.id != selectedDeleteOrder.id));
        await axios.delete(`${API_URL}${selectedDeleteOrder.id}/`);
        closeDeleteModal();
        alert("Commande supprimée avec succès!");
      }
    } catch (error) {
      console.error("Error Suppression commande:", error);
    }
  }
  const handlePrint = () => {
    const printContent = printRef.current;
    const WindowPrint = window.open("", "", "width=800,height=600");
    WindowPrint.document.write(`
      <html>
        <head>
          <title>Facture de Vente</title>
          <style>
            /* Add your print styles here */
            body {
              font-family: Arial, sans-serif;
              color: #333;
            }
            h2, h3 {
              margin-top: 2;
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .header, .footer {
              margin-bottom: 1em;
            }
            .footer{
              display:flex;
              justify-content: end;
            }
            .header{
              padding : 10px;
              border : 1px solid black;
            }
            .cachetClass{
              text-align:right;
            }
          </style>
        </head>
        <body>
        <h2> FACTURE DE VENTE</h2>
          <div class="header">
            <p><strong>ID Bon :</strong># ${selectedCommande.id}</p>
             <p><strong>Date du Bon :</strong> ${new Date(
               selectedCommande.created_at
             ).toLocaleDateString()}</p>
            <p><strong>Nom du Client :</strong> ${
              selectedCommande.customer_fullname
            }</p>
            <p><strong>Nom du Client :</strong> ${
              selectedCommande.customer_phonenumber
            }</p>
            <p><strong>Adresse de Livraison :</strong> ${
              selectedCommande.billing_address
            }</p>
           
          </div>


          <table>
            <thead>
              <tr>
                <th>Reference d'article</th>
                <th>Nom de l'Article</th>
                <th>Prix Unitaire</th>
                <th>Quantité</th>
                <th>Prix Total</th>
              </tr>
            </thead>
            <tbody>
              ${selectedCommande.items
                .map(
                  (item) => `
                <tr>               
                  <td>${item.product_reference}</td>
                  <td>${item.product_name}</td>
                  <td>${item.unit_price}</td>
                  <td>${item.quantity}</td>
                  <td>${item.total_price} DZD</td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
          <div class="footer">
            <p><strong>Total:</strong> ${selectedCommande.items.reduce(
              (total, item) => total + parseFloat(item.total_price),
              0
            )} DZD</p>
          </div>
          <p class="cachetClass">
           <strong>Signature & Cachet</strong>
          </p>
        </body>
      </html>
    `);
    WindowPrint.document.close();
    WindowPrint.print();
  };
  return (
    <div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr className="text-center">
              <TableCell>Nom du Client</TableCell>
              <TableCell>ID de Commande</TableCell>
              <TableCell>Prix Total</TableCell>
              <TableCell>Source</TableCell>
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
                  <span
                    className={`ml-4 w-14 text-sm text-center font-medium me-2 px-2.5 py-0.5 rounded  ${
                      commande.client
                        ? " bg-green-100 text-green-800 border-green-500 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 border-red-500 dark:bg-red-900 dark:text-red-300"
                    } text-white font-semibold`}
                  >
                    {commande.client ? "Client" : "SiteWeb"}
                  </span>
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
                  <button
                    onClick={() => openDeleteModal(commande)}
                    className="bg-red-500 text-sm text-white p-1 px-2 rounded-lg hover:shadow-lg"
                  >
                    Supprimer
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
          <ModalBody ref={printRef}>
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
                      <TableCell>{item.unit_price}</TableCell>
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
              onClick={handlePrint}
              className="bg-gray-500 text-white mr-2 p-1 px-2 rounded-lg shadow-lg"
            >
              Imprimer le Bon
            </button>
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
      {/* Delete product model */}
      <Modal
        className="w-1/2 bg-white mx-auto p-8 rounded-lg"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      >
        <ModalHeader className="flex items-center">
          Supprimer Commande
          {/* </div> */}
        </ModalHeader>
        <ModalBody>
          Êtes-vous sûr de vouloir supprimer le produit de{" "}
          {selectedDeleteOrder && `"${selectedDeleteOrder.customer_fullname}"`}
        </ModalBody>

        <ModalFooter>
          <span
            onClick={closeDeleteModal}
            className="text-primary font-bold cursor-pointer hover:underline mr-4"
          >
            Annuler
          </span>
          <button
            onClick={handleDeleteOrder}
            className="bg-red-500 px-4 py-2 text-white font-bold rounded-lg hover:shadow-lg"
          >
            Supprimer
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
