import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
  Card,
  CardBody,
  Label,
  Select,
} from "@windmill/react-ui";
import PageTitle from "../AdminComponents/Typography/PageTitle";

export default function BillingPage() {
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [buyingBills, setBuyingBills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBon, setSelectedBill] = useState(null);
  const printRef = useRef();
  const [formData, setFormData] = useState({
    bill_id: "",
    payment_method: "",
    is_paid: false,
    total_amount: "",
    fournisseur: "",
  });
  const onPageChange = (p) => setPage(p);
  const API_URL = "http://127.0.0.1:8000/backendAPI/buyingBills/";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        setBuyingBills(response.data);
      })
      .catch((error) => console.error("Error fetching buying bills:", error));
  }, []);

  const openModal = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBill(null);
    setIsModalOpen(false);
  };
  const openDeleteModal = (bill) => {
    setSelectedBill(bill);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedBill(null);
    setIsDeleteModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function handleDeleteBills() {
    console.log("Deleting Bill ..." + selectedBon.id);
    try {
      if (selectedBon) {
        await axios.delete(`${API_URL}${selectedBon.id}/`);
        closeModal();
        setBuyingBills(buyingBills.filter((item) => item.id != selectedBon.id));
        alert("Bon supprimé avec succès!");
      }
    } catch (error) {
      console.error("Error deleting bon:", error);
    }
  }
  const handlePrint = () => {
    const printContent = printRef.current;
    const WindowPrint = window.open('', '', 'width=800,height=600');
    WindowPrint.document.write(`
      <html>
        <head>
          <title>Bon Achat</title>
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
            .header{
              border : 1px solid black;
            }
          </style>
        </head>
        <body>
        <h2> Bon d'Achat</h2>
          <div class="header">
            <p><strong>ID Bon :</strong> ${selectedBon.bill_id}</p>
            <p><strong>Nom du Fournisseur :</strong> ${selectedBon.fournisseur}</p>
            <p><strong>Date du Bon :</strong> ${new Date(selectedBon.date).toLocaleDateString()}</p>
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
              ${selectedBon.products.map(item => `
                <tr>
                  <td>${item.product_reference}</td>
                  <td>${item.product_name}</td>
                  <td>${item.unit_price}</td>
                  <td>${item.quantity}</td>
                  <td>${item.total_price} DZD</td>
                </tr>`).join('')}
            </tbody>
          </table>
          <div class="footer">
            <p><strong>Total:</strong> ${selectedBon.products.reduce((total, item) => total + parseFloat(item.total_price), 0)} DZD</p>
          </div>
        </body>
      </html>
    `);
    WindowPrint.document.close();
    WindowPrint.print();
  };
  return (
    <div>
      <PageTitle>Liste Bons d'Achat</PageTitle>
      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <NavLink exact to="/admin/administration-dashboard" className="mx-2">
            Tableau de Bord
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Liste Bons d'Achat</p>
      </div>
      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Liste Bons d'Achat
              </p>
            </div>
            <div className="">
              <Link
                to="/admin/new-buy-bill"
                className="p-2 bg-primary rounded-xl text-sm text-white font-bold border hover:bg-white hover:border-primary hover:text-primary"
                aria-label="Edit"
              >
                Nouveau Bon Achat
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr className="text-center">
              <TableCell>ID Bon</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Fournisseur</TableCell>
              <TableCell>Méthode de paiement</TableCell>
              <TableCell>Payé</TableCell>
              <TableCell>Montant Total</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {buyingBills.map((bill) => (
              <TableRow className="text-center" key={bill.bill_id}>
                <TableCell>{bill.bill_id}</TableCell>
                <TableCell>
                  {new Date(bill.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-sm">{bill.fournisseur}</TableCell>
                <TableCell className="text-sm">{bill.payment_method}</TableCell>
                <TableCell className="text-sm">
                  {bill.is_paid ? "Paye" : "Non-Paye"}
                </TableCell>
                <TableCell className="text-sm">
                  {bill.total_amount} DZD
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 items-center justify-center">
                    <Link
                      to={`/admin/edit-bill-buy/${bill.id}`}
                      className="bg-primary text-white text-sm p-1 px-2 rounded-lg hover:shadow-lg"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => openModal(bill)}
                      className="bg-primary text-white text-sm p-1 px-2 rounded-lg hover:shadow-lg"
                    >
                      Voir détails
                    </button>
                    <button
                      onClick={() => openDeleteModal(bill)}
                      className="bg-red-500 text-sm text-white p-1 px-2 rounded-lg hover:shadow-lg"
                    >
                      Supprimer
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      {/* Delete product model */}
      <Modal className="w-1/2 bg-white mx-auto p-8 rounded-lg" isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader className="flex items-center">
          Supprimer Bon d'Achat
          {/* </div> */}
        </ModalHeader>
        <ModalBody>
          Etes vous sur de vouloir supprimer le Bon numero :{" "}
          {selectedBon && `"${selectedBon.bill_id}"`}
        </ModalBody>
        <ModalFooter>
          <span
            onClick={closeDeleteModal}
            className="text-primary font-bold cursor-pointer hover:underline mr-4"
          >
            Annuler
          </span>
          <button
            onClick={handleDeleteBills}
            className="bg-red-500 px-4 py-2 text-white font-bold rounded-lg hover:shadow-lg"
          >
            Supprimer
          </button>
        </ModalFooter>

      </Modal>
      {selectedBon && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          className="w-3/4 h-4/5top-1 md:w-1/2 mx-auto bg-white p-6 rounded-xl"
        >
          <ModalBody ref={printRef}>
            <h2 className="text-lg font-semibold mb-4">Détails du Bon Achat</h2>
            <div className="border-b py-4">
              <p>
                <strong>ID Bon :</strong> {selectedBon.bill_id}
              </p>
              <p>
                <strong>Nom du Fournisseur :</strong> {selectedBon.fournisseur}
              </p>
              <p>
                <strong>Date du Bon :</strong>{" "}
                {new Date(selectedBon.date).toLocaleDateString()}
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
                  {selectedBon.products.map((item) => (
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
              className="bg-green-500 text-white mr-2 p-1 px-2 rounded-lg shadow-lg"
            >
              Imprimer le Bon
            </button>
            {/* <button
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
            </button> */}
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
