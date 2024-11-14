import React, { useState, useEffect } from "react";
import PageTitle from "../AdminComponents/Typography/PageTitle";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import JsBarcode from "jsbarcode"; // Import jsbarcode
import Barcode from "react-barcode";
import {
  Card,
  CardBody,
  Label,
  Select,
  Button,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";

const ProductsAll = () => {
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const totalResults = data.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(data.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, resultsPerPage]);

  const API_URL = "http://127.0.0.1:8000/backendAPI/produits/";

  // Fetch categories when component mounts
  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.log("Error Fetching Data:", response.status, response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response from server:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  }, []); // Empty dependency array ensures it only runs on mount

  // Delete action model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
  async function openModal(productId) {
    let product = await data.filter((product) => product.id === productId)[0];
    // console.log(product);
    setSelectedDeleteProduct(product);
    setIsModalOpen(true);
  }

  async function handleDeleteProduits() {
    console.log("Deleting product ..." + selectedDeleteProduct);
    try {
      if (selectedDeleteProduct) {
        setData(data.filter((item) => item.id != selectedDeleteProduct.id));
        await axios.delete(`${API_URL}${selectedDeleteProduct.id}/`);
        closeModal();
        alert("Produit supprimée avec succès!");
      }
    } catch (error) {
      console.error("Error deleting produit:", error);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const printBarcode = (reference, price) => {
    // Open a new window
    const printWindow = window.open("", "_blank", "width=600,height=400");

    // Write the content to the print window
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            body { text-align: center; padding: 20px; }
            .barcode-container { margin-top: 50px; }
          </style>
        </head>
        <body>
          <div class="barcode-container">
            <div> ${price} DZD</div>
            <div>
              <svg id="barcode"></svg>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
            <script>
              JsBarcode("#barcode", "${reference}", {
                format: "CODE128",
                width: 2,
                height: 100,
                displayValue: true
              });
              window.print();  // Trigger the print dialog
            </script>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close(); // Close the document to render the content
  };
  return (
    <div>
      <PageTitle>All Products</PageTitle>
      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <NavLink exact to="/admin/administration-dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">All Products</p>
      </div>
      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All Products
              </p>

              <Label className="mx-3">
                <Select className="py-3">
                  <option>Sort by</option>
                  <option>Asc</option>
                  <option>Desc</option>
                </Select>
              </Label>

              <Label className="mx-3">
                <Select className="py-3">
                  <option>Filter by Category</option>
                  <option>Electronics</option>
                  <option>Cloths</option>
                  <option>Mobile Accerssories</option>
                </Select>
              </Label>

              <Label className="mr-8">
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Number of Results"
                    value={resultsPerPage}
                    onChange={(e) => setResultsPerPage(e.target.value)}
                  />
                </div>
              </Label>
            </div>
            <div className="">
              <Link
                to="/admin/add-product"
                className="p-2 bg-primary rounded-xl text-sm text-white font-bold border hover:bg-white hover:border-primary hover:text-primary"
                aria-label="Edit"
              >
                Nouveau Produit
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
      {/* Delete product model */}
      <Modal className="w-1/2 bg-white mx-auto p-8 rounded-lg" isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="flex items-center">
          Supprimer Produit
          {/* </div> */}
        </ModalHeader>
        <ModalBody>
        Êtes-vous sûr de vouloir supprimer  le produit{" "}
          {selectedDeleteProduct && `"${selectedDeleteProduct.name}"`}
        </ModalBody>

        <ModalFooter>
          <span
            onClick={closeModal}
            className="text-primary font-bold cursor-pointer hover:underline mr-4"
          >
            Annuler
          </span>
          <button
            onClick={handleDeleteProduits}
            className="bg-red-500 px-4 py-2 text-white font-bold rounded-lg hover:shadow-lg"
          >
            Supprimer
          </button>
        </ModalFooter>
        
      </Modal>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr className="text-center">
              <TableCell>Reference</TableCell>
              <TableCell>Nom du Produit</TableCell>
              <TableCell>QTE</TableCell>
              <TableCell>Prix achat</TableCell>
              <TableCell>Prix Vente</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <TableRow className="text-center" key={product.id}>
                <TableCell>
                <div className="flex items-center justify-center">
                    {/* <Barcode value={product.reference} width={1} height={25} /> */}
                    <span>
                    {product.reference}
                    </span>
                </div>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-sm">{product.available_quantity}</TableCell>
                <TableCell className="text-sm">{product.cost_price}</TableCell>
                <TableCell className="text-sm">{product.price}</TableCell>
                <TableCell>
                  <div className="flex space-x-2 items-center justify-center">
                    <Link
                      to={`/admin/product/${product.id}`}
                      className="bg-primary text-white text-sm p-1 px-2 rounded-lg hover:shadow-lg"
                    >
                      Modifier
                    </Link>

                    <button
                      onClick={() => openModal(product.id)}
                      className="bg-red-500 text-sm text-white p-1 px-2 rounded-lg hover:shadow-lg"
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={() => printBarcode(product.reference, product.price)} // Trigger print on click
                      className="bg-gray-500 text-sm text-white p-1 px-1 rounded-lg hover:shadow-lg"
                    >
                      Imprimer Barcode
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
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </div>
  );
};

export default ProductsAll;
