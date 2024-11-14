import React, { useState, useRef, useEffect } from "react";
import Select from "react-select"; // Import react-select
import axios from "axios";
import {
  Card,
  CardBody,
  Label,
  Input,
  Textarea,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Select as WindmillSelect,
} from "@windmill/react-ui";
export default function InvoicePage() {
  const [billForm, setBillForm] = useState({
    billId: "",
    invoiceDate: "",
    customer_fullname: "",
    customer_phonenumber: "",
    billing_address: "",
    totalAmount: 0,
    items: [],
  });

  const imageInputRef = useRef(null);
  const [productOptions, setProductOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [clientsOptions, setClientsOptions] = useState([]);
  const optionsProductSelect = productOptions.map((product) => ({
    value: product.id,
    label: `${product.name} - ${product.price} DZD`,
  }));
  useEffect(() => {
    axios
      .get("https://ecommerce-platform-api.onrender.com/backendAPI/produits/")
      .then((response) => setProductOptions(response.data))
      .catch((error) => console.error("Error fetching items:", error));

    axios
      .get("https://ecommerce-platform-api.onrender.com/backendAPI/clients/")
      .then((response) => setClientsOptions(response.data))
      .catch((error) => console.error("Error fetching items:", error));

    axios
      .get("https://ecommerce-platform-api.onrender.com/backendAPI/orders/")
      .then((response) => {
        const bills = response.data;
        const latestBillId = bills.reduce((max, bill) => {
          const billNumber = bill.id;
          return billNumber > max ? billNumber : max;
        }, 0);
        const year = new Date().getFullYear().toString().slice(-2);
        setBillForm((prev) => ({
          ...prev,
          billId: `BV-${year}${(latestBillId + 1).toString().padStart(5, "0")}`,
        }));
      })
      .catch((error) => console.error("Error generating Bill ID:", error));
  }, []);

  // Utility function to generate invoice number
  function generateInvoiceNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setBillForm((prev) => ({ ...prev, imageSrc: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteItem = (reference) => {
    setBillForm((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.reference !== reference),
    }));
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const confirmAddProduct = () => {
    console.log(selectedProduct);

    if (selectedProduct) {
      // Find the selected product in the product options
      const selected = productOptions.find(
        (p) => p.id == selectedProduct.value
      );

      if (selected) {
        const totalProductPrice = selected.price * product.quantity;

        setBillForm((prev) => {
          // Add the new product to the items array and include the reference and name
          const updatedProducts = [
            ...prev.items,
            {
              product: selected.id, // Still include the product ID
              reference: selected.reference, // Add the reference field
              name: selected.name, // Add the name field
              price: selected.price,
              qte: product.quantity,
              total_price: totalProductPrice,
            },
          ];

          return {
            ...prev,
            items: updatedProducts,
            totalAmount: prev.totalAmount + totalProductPrice,
          };
        });

        // Reset quantity for the next product
        setProduct((prev) => ({
          ...prev,
          quantity: 1,
        }));

        closeModal();
      }
    }
  };
  const numberFormat = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };
  // Log the updated billForm.items after state update
  useEffect(() => {
    console.log(billForm.items);
  }, [billForm.items]); // This will log every time billForm.items changes

  // Handle form submission
  const handleSubmit = () => {
    // Create a new object with the necessary properties
    const {
      billId,
      invoiceDate,
      totalAmount,
      items,
      billing_address,
      ...rest
    } = billForm;

    // Transform items to match the specified structure
    const transformedItems = items.map((item) => ({
      product: item.product, // Assuming item.product contains the product object with an `id` field
      quantity: parseInt(item.qte),
      unit_price: parseFloat(item.price),
      total_price: parseInt(item.qte) * parseFloat(item.price),
    }));
    console.log(transformedItems);
    // Create formData with the transformed items and add status field
    const formData = {
      ...rest,
      total_price: netTotal,
      shipping_address: billing_address,
      billing_address: billing_address,
      payment_status: "en attente",
      items: transformedItems,
    };

    // Log the form data that will be sent
    console.log("Submitting form:", formData);

    // Submit the form data using axios
    axios
      .post(
        "https://ecommerce-platform-api.onrender.com/backendAPI/orders/",
        formData
      )
      .then((response) => {
        console.log("Successfully submitted:", response.data);
        // Optionally handle success (reset form, show message, etc.)
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleClientChange = (e) => {
    const selectedClient = clientsOptions.find(
      (client) => client.id === parseInt(e.target.value)
    );

    if (selectedClient) {
      setBillForm({
        ...billForm,
        customer_fullname: selectedClient.name,
        billing_address: selectedClient.address,
        customer_phonenumber: selectedClient.phone,
      });
    }
  };
  const [product, setProduct] = useState({
    product: "",
    quantity: 1,
    unit_price: 0,
    total_price: 0,
    tva: 0,
  });
  const netTotal = billForm.items.reduce((accumulator, item) => {
    return accumulator + item.price * item.qte;
  }, 0);
  const totalGST = netTotal * 0.19;
  const HandleSelection = (selectedOption) => {
    setSelectedProduct(selectedOption);
    const selected = productOptions.find(
      (product) => product.id === selectedOption.value
    );
    if (selected) {
      setProduct((prev) => ({
        ...prev,
        unit_price: selected.price,
        product: selected.name,
      }));
    }
  };
  // Function to trigger the print dialog
  const handlePrint = () => {
    const printContent = document.getElementById("print-template").innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .text-gray-800 { color: #333; }
            .text-gray-600 { color: #777; }
            .text-xs { font-size: 0.75rem; }
            .font-bold { font-weight: bold; }
            .font-medium { font-weight: 500; }
            .uppercase { text-transform: uppercase; }
            .w-32 { width: 8rem; }
            .text-right { text-align: right; }
            .flex { display: flex; }
            .justify-between { justify-content: space-between; }
            .items-start { align-items: flex-start; }
            .mb-8 { margin-bottom: 2rem; }
            .mb-10 { margin-bottom: 2.5rem; }
            .py-2 { padding: 0.5rem 0; }
            .px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
            .flex-1 { flex: 1; }
            .block { display: block; }
            .font-bold { font-weight: bold; }
            .tracking-wide { letter-spacing: 0.1em; }
            /* Ensure table borders are visible */
            table {
                width: 100%;
                margin-bottom:15px;
                border-collapse: collapse; /* Ensures borders collapse into single lines */
            }
            th, td {
                border: 1px solid black; /* Add black border around table cells */
                padding: 0.5rem;
            }
            border{
             border: 1px solid black;
            }
            th {
                background-color: #f1f1f1; /* Optional background color for header cells */
            }
           
            .SecondTable{
                width:150px;
                right:2;
            }
            .dataFirst{
                display:flex;
                flex-direction: column;
                gap:10px;
                border: 1px solid black;
                padding:10px;
                margin:5px;
            }
            .header{
                display : flex;
                justify-content: space-between;
            }
            .title{
                font-size:48px;
                font-weight:bolder;
                text-align:center
            }
            </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <div className="antialiased sans-serif">
      <div className="border-t-8 border-gray-700 h-2"></div>
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">
            Bon de Vente
          </h2>
          <div>
            <div className="relative mr-4 inline-block">
              <div
                className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={handlePrint}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-printer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                  <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
                  <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
                  <rect x="7" y="13" width="10" height="8" rx="2" />
                </svg>
              </div>
              {showTooltip && (
                <div className="z-40 shadow-lg text-center w-32 absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs">
                  Imprimer le Bon!
                </div>
              )}
            </div>

            <div className="relative inline-block">
              <div
                className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center"
                onMouseEnter={() => setShowTooltip2(true)}
                onMouseLeave={() => setShowTooltip2(false)}
                onClick={() => window.location.reload()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-refresh"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
                  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
                </svg>
              </div>
              {showTooltip2 && (
                <div className="z-40 shadow-lg text-center w-32 absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs">
                  Actualiseer la Page
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex mb-8 justify-between">
          <div className="w-2/4">
            <div className="mb-2 md:mb-1 md:flex items-center">
              <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">
                ID BON.
              </label>
              <span className="mr-4 inline-block hidden md:block">:</span>
              <div className="flex-1">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  name="billId"
                  placeholder="eg. #INV-100001"
                  value={billForm.billId}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-2 md:mb-1 md:flex items-center">
              <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">
                Date de Bon
              </label>
              <span className="mr-4 inline-block hidden md:block">:</span>
              <div className="flex-1">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  type="date"
                  name="invoiceDate"
                  placeholder="e.g., 17 Feb, 2020"
                  value={billForm.invoiceDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between mb-8">
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">
                Client/ Bon Pour:
              </label>
              <select
                name="client"
                id="client"
                className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                onChange={handleClientChange}
                value={billForm.customer_fullname}
              >
                <option value="">Selectionnez Client</option>
                {clientsOptions.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <input
                className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                name="billing_address"
                value={billForm.billing_address}
                onChange={handleInputChange}
                type="text"
                placeholder="Adresse Client"
              />
              <input
                className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                name="customer_phonenumber"
                value={billForm.customer_phonenumber}
                onChange={handleInputChange}
                type="text"
                placeholder="Numero de Telephone"
              />
            </div>
          </div>

          <div className="flex -mx-1 border-b py-2 items-start">
            <div className="flex-1 px-1">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                Reference Produit
              </p>
            </div>
            <div className="flex-1 px-1">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                Designation Produit
              </p>
            </div>
            <div className="px-1 w-20 text-right">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                Qte
              </p>
            </div>
            <div className="px-1 w-32 text-right">
              <p className="leading-none">
                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                  Prix Unitaire
                </span>
                <span className="font-medium text-xs text-gray-500">(TTC)</span>
              </p>
            </div>
            <div className="px-1 w-32 text-right">
              <p className="leading-none">
                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                  Total Prix
                </span>
                <span className="font-medium text-xs text-gray-500">(TTC)</span>
              </p>
            </div>
            <div className="px-1 w-20 text-center"></div>
          </div>

          {billForm.items.map((invoice) => (
            <div key={invoice.id} className="flex -mx-1 py-2 border-b">
              <div className="flex-1 px-1">
                <p className="text-gray-800">{invoice.reference}</p>
              </div>
              <div className="flex-1 px-1">
                <p className="text-gray-800">{invoice.name}</p>
              </div>
              <div className="px-1 w-20 text-right">
                <p className="text-gray-800">{invoice.qte}</p>
              </div>
              <div className="px-1 w-32 text-right">
                <p className="text-gray-800">{invoice.price}</p>
              </div>
              <div className="px-1 w-32 text-right">
                <p className="text-gray-800">{invoice.price * invoice.qte}</p>
              </div>
              <div className="px-1 w-20 text-right">
                <a
                  href="#"
                  className="text-red-500 hover:text-red-600 text-sm font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteItem(invoice.reference);
                  }}
                >
                  Supprimer
                </a>
              </div>
            </div>
          ))}

          <button
            className="mt-6 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded shadow-sm"
            onClick={openModal}
          >
            Ajouter Produits
          </button>

          <div className="py-2 ml-auto w-full sm:w-2/4 lg:w-1/4">
            <div className="py-2 border-t border-b">
              <div className="flex justify-between">
                <div className="text-xl text-gray-600 text-right flex-1">
                  Total à payer
                </div>
                <div className="text-right w-40">
                  <div className="text-xl text-gray-800 font-bold">
                    {netTotal}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="p-4 bg-primary rounded-xl text-sm text-white font-bold border hover:bg-white hover:border-primary hover:text-primary"
          >
            Valider le Bon de Vente et Imprimer
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          className="w-3/4 md:w-1/2 mx-auto bg-white p-6 rounded-xl"
        >
          <ModalBody>
            <h2 className="text-lg font-semibold mb-4">Ajouter Un Produit</h2>
            <Label>Produit</Label>
            <Select
              options={optionsProductSelect}
              onChange={HandleSelection}
              className="mt-2 mb-4"
              placeholder="Sélectionner un produit"
            />
            <Label>Quantité</Label>
            <Input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  quantity: e.target.value,
                  total_price: prev.unit_price * e.target.value,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <Label>Prix Unitaire</Label>
            <Input
              type="number"
              value={product.unit_price}
              disabled
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={confirmAddProduct}
              className="py-2 px-6 bg-primary text-white rounded font-bold"
            >
              Ajouter Produit
            </Button>
            <Button
              onClick={closeModal}
              className="py-2 px-6 bg-gray-500 text-white rounded font-bold"
            >
              Annuler
            </Button>
          </ModalFooter>
        </Modal>
      )}
      {/* Print Template */}
      <div id="print-template" className="hidden w-4/5 mx-auto">
        <h1 className="title text-6xl text-center font-bold mb-6 pb-1 tracking-wider uppercase">
          Facture
        </h1>
        <div className="header">
          <div className="dataFirst space-x-3 mb-10">
            <div className="">
              <div className="px-4 py-3">
                <div className="mb-1 flex items-center">
                  <div>
                    <strong>Code Facture :</strong>
                    {billForm.invoiceNumber}
                  </div>
                </div>
                <div className="mb-1 flex items-center">
                  <div>
                    <strong>Date Facture: </strong>
                    {billForm.invoiceDate}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="px-4 py-3">
                <div className="mb-1 flex items-center">
                  <strong>Nom du Client :</strong>
                  <span> {billForm.customer_fullname}</span>
                </div>
                <div className="mb-1 flex items-center">
                  <strong>Adresse du Client :</strong>
                  <span>{billForm.billing_address}</span>
                </div>
                <div className="mb-1 flex items-center">
                  <strong>Notes :</strong>
                  <span>{billForm.customer_phonenumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black px-1 py-2 text-black uppercase tracking-wide text-sm font-bold">
                Reference
              </th>
              <th className="border border-black px-1 py-2 text-black uppercase tracking-wide text-sm font-bold">
                Designation
              </th>
              <th className="border border-black px-1 py-2 w-32 text-right text-black uppercase tracking-wide text-sm font-bold">
                PU.
              </th>
              <th className="border border-black px-1 py-2 w-32 text-right text-black uppercase tracking-wide text-sm font-bold">
                Quantité
              </th>
              <th className="border border-black px-1 py-2 w-32 text-right text-black uppercase tracking-wide text-sm font-bold">
                Montant
              </th>
            </tr>
          </thead>
          <tbody>
            {billForm.items.map((invoice) => (
              <tr className="border border-black">
                <td className="border border-black px-1 py-2 text-black text-xs">
                  {invoice.reference}
                </td>
                <td className="border border-black px-1 py-2 text-black text-xs">
                  {invoice.name}
                </td>
                <td className="border border-black px-1 py-2 text-black text-xs">
                  {numberFormat(invoice.price)}
                </td>
                <td className="border border-black px-1 py-2 w-32 text-right text-black text-xs">
                  {invoice.qte}
                </td>
                <td className="border border-black px-1 py-2 text-black text-xs">
                  {numberFormat(invoice.price * invoice.qte)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="SecondTable h-fit table-auto border-collapse border border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-700 px-4">Net à Payer</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-gray-700">
              <td className="border border-gray-700 px-4">{netTotal} DZD</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between mt-12 mr-0">
          <div></div>
          <div className="font-bold">Cachet et Signature</div>
        </div>
      </div>
    </div>
  );
}
