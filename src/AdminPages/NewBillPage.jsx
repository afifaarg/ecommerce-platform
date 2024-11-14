import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PageTitle from "../AdminComponents/Typography/PageTitle";
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
import axios from "axios";
import Select from "react-select"; // Import react-select

export default function NewPurchaseOrderPage() {
  const [bill, setBill] = useState({
    bill_id: "",
    payment_method: "",
    total_amount: 0,
    fournisseur: "",
    products: [],
  });
  const [productOptions, setProductOptions] = useState([]);
  const [product, setProduct] = useState({
    product: "",
    quantity: 1,
    unit_price: 0,
    total_price: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fournisseursList, setFournisseurList] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecommerce-platform-api.onrender.com/backendAPI/produits/")
      .then((response) => setProductOptions(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    axios
      .get(
        "https://ecommerce-platform-api.onrender.com/backendAPI/fournisseurs/"
      )
      .then((response) => setFournisseurList(response.data))
      .catch((error) => console.error("Error fetching fournisseurs:", error));

    axios
      .get(
        "https://ecommerce-platform-api.onrender.com/backendAPI/buyingBills/"
      )
      .then((response) => {
        const bills = response.data;
        const latestBillId = bills.reduce((max, bill) => {
          const billNumber = parseInt(bill.bill_id.split("-")[1]);
          return billNumber > max ? billNumber : max;
        }, 0);
        const year = new Date().getFullYear().toString().slice(-2);
        setBill((prev) => ({
          ...prev,
          bill_id: `BA-${year}${(latestBillId + 1)
            .toString()
            .padStart(5, "0")}`,
        }));
      })
      .catch((error) => console.error("Error generating Bon ID:", error));
  }, []);

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle input change for bill fields
  const handleBillChange = (e) => {
    const { name, value } = e.target;
    setBill((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product selection and add to bill
  const confirmAddProduct = () => {
    if (selectedProduct) {
      const selected = productOptions.find(
        (p) => p.id === selectedProduct.value
      );
      if (selected) {
        const totalProductPrice = selected.cost_price * product.quantity;
        setBill((prev) => ({
          ...prev,
          products: [
            ...prev.products,
            {
              ...product,
              product: selected.id,
              cost_price: selected.cost_price,
              quantity: parseInt(product.quantity),
              total_price: totalProductPrice,
            },
          ],
          total_amount: prev.total_amount + totalProductPrice,
        }));
        setProduct({ product: "", unit_price: 0, quantity: 1, total_price: 0 });
        closeModal();
      }
    }
  };

  const submitBill = async () => {
    try {
      const response = await axios.post(
        "https://ecommerce-platform-api.onrender.com/backendAPI/buyingBills/",
        bill
      );
      console.log("Bill submitted:", response.data);
      alert("Bill successfully submitted!");
      setBill({
        bill_id: "",
        payment_method: "",
        total_amount: 0,
        fournisseur: "",
        products: [],
      });
    } catch (error) {
      console.error("Error submitting bill:", error);
      alert("Failed to submit bill. Please try again.");
    }
  };

  // Map productOptions to react-select format
  const optionsProductSelect = productOptions.map((product) => ({
    value: product.id,
    label: `${product.name} - ${product.cost_price} DZD`,
  }));

  // Handle selection from react-select
  const HandleSelection = (selectedOption) => {
    setSelectedProduct(selectedOption);
    const selected = productOptions.find(
      (product) => product.id === selectedOption.value
    );
    if (selected) {
      setProduct((prev) => ({
        ...prev,
        unit_price: selected.cost_price,
        product: selected.name,
      }));
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Title */}
      <PageTitle>Nouveau Bon d'Achat</PageTitle>

      {/* Navigation Breadcrumb */}
      <div className="flex text-gray-800 dark:text-gray-300 mb-6">
        <div className="flex items-center text-primary">
          <NavLink exact to="/admin/administration-dashboard" className="mx-2">
            Tableau de Bord
          </NavLink>
        </div>
        {">"}
        <div className="flex items-center text-primary">
          <NavLink exact to="/admin/buying-bills-page" className="mx-2">
            Liste Bons d'Achat
          </NavLink>
        </div>
        <p className="mx-2">Nouveau Bon d'Achat</p>
      </div>

      {/* Bill Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Bill ID */}
        <div>
          <Label>ID BON</Label>
          <Input
            className="mb-4"
            value={bill.bill_id}
            name="bill_id"
            onChange={handleBillChange}
            placeholder="ID Bon d'Achat"
            disabled
          />
        </div>

        {/* Fournisseur */}
        <div>
          <Label>Fournisseur</Label>
          <WindmillSelect
            value={bill.fournisseur}
            onChange={handleBillChange}
            name="fournisseur"
            className="mb-4 py-2"
          >
            <option value="">Sélectionner un fournisseur</option>
            {fournisseursList?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </WindmillSelect>
        </div>

        {/* Payment Method */}
        <div>
          <Label>Mode de Paiement</Label>
          <WindmillSelect
            value={bill.payment_method}
            onChange={handleBillChange}
            name="payment_method"
            className="mb-4 py-2"
          >
            <option value="">Sélectionner un mode de paiement</option>
            <option value="Cash">Cash</option>
            <option value="Credit">Crédit</option>
          </WindmillSelect>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full bg-gray-100 rounded-xl">
          <thead>
            <tr className="text-left bg-gray-50 ">
              <th className="py-2 px-4">Produit</th>
              <th className="py-2 px-4">Prix Achat Unitaire</th>
              <th className="py-2 px-4">Quantité</th>
              <th className="py-2 px-4">Prix Achat Total</th>
            </tr>
          </thead>
          <tbody>
            {bill.products.map((p, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{p.product}</td>
                <td className="py-2 px-4">{p.cost_price}</td>
                <td className="py-2 px-4">{p.quantity}</td>
                <td className="py-2 px-4">{p.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between border-b pb-4">
          <button
            onClick={openModal}
            className="py-2 px-4 bg-primary text-white rounded hover:shadow-lg hover:scale-90 transform ease-in"
          >
            Ajouter un Produit
          </button>
        </div>
      </div>

      {/* Total Amount */}
      <div className="mb-6 flex justify-between">
        <div className="text-xl font-semibold"></div>
        <div className="text-xl font-semibold">
          Montant Total : <span>{bill.total_amount} DZD</span>
        </div>
      </div>

      {/* Submit Bill Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={submitBill}
          className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-white border font-bold hover:border-primary hover:text-primary"
        >
          Soumettre Bon d'Achat
        </button>
      </div>

      {/* Modal for Product Selection */}
      <Modal
        className="bg-white w-1/2 mx-auto p-8 rounded-xl"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <ModalBody>
          <h2 className="text-xl font-semibold mb-4">Ajouter un Produit</h2>
          <div className="mb-4">
            <Label>Produit</Label>
            <Select
              options={optionsProductSelect}
              onChange={HandleSelection}
              placeholder="Sélectionner un produit"
            />
          </div>

          <div className="mb-4">
            <Label>Quantité</Label>
            <Input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
              min="1"
            />
          </div>

          <div className="mb-4">
            <Label>Prix Unitaire</Label>
            <Input
              type="number"
              value={product.unit_price}
              onChange={(e) =>
                setProduct({ ...product, unit_price: e.target.value })
              }
              disabled
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={confirmAddProduct}>Ajouter</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
