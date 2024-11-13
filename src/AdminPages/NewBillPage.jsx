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
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

  useEffect(() => {
    // Fetch products from backend
    axios
      .get("http://127.0.0.1:8000/backendAPI/produits/")
      .then((response) => setProductOptions(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    // Generate Bon ID
    axios
      .get("http://127.0.0.1:8000/backendAPI/buyingBills/")
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
        (p) => p.id == selectedProduct.value
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
        "http://127.0.0.1:8000/backendAPI/buyingBills/",
        bill
      );
      console.log("Bill submitted:", response.data);
      alert("Bill successfully submitted!");
      // Reset the bill after submission
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
    <div>
      <PageTitle>Nouveau Bon d'Achat</PageTitle>
      <div className="flex text-gray-800 dark:text-gray-300">
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

      <div className="grid grid-cols-1 gap-4 mb-8">
        <div>
          <label htmlFor="">ID BON</label>
          <Input
            className="mb-4"
            value={bill.bill_id}
            name="bill_id"
            onChange={handleBillChange}
            placeholder="ID Bon d'Achat"
            disabled
          />
        </div>
        <div>
          <label htmlFor="">Fournisseur</label>
          <Input
            className="mb-4"
            value={bill.fournisseur}
            name="fournisseur"
            onChange={handleBillChange}
            placeholder="Fournisseur"
          />
        </div>
        <div>
          <label htmlFor="">Mode de Paiement</label>
          <WindmillSelect
            value={bill.payment_method}
            onChange={handleBillChange}
            name="payment_method"
            className="mb-4"
          >
            <option value="">Sélectionner un mode de paiement</option>
            <option value="Cash">Cash</option>
            <option value="Credit">Crédit</option>
          </WindmillSelect>
        </div>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full bg-gray-100 rounded">
          <thead>
            <tr className="text-left bg-gray-200">
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
        <div className=" mt-4 flex justify-between border-b pb-4">
          <button
            onClick={openModal}
            className="w-fit py-2 px-4 bg-primary text-white rounded hover:shadow-lg hover:scale-90 transform ease-in"
          >
            Ajouter un Produit
          </button>
        </div>
      </div>

      <div className="text-right font-bold">
        Montant Total: {bill.total_amount} DZD
      </div>

      <div className="text-right mt-4 flex justify-between border-t py-2">
        <div></div>
        <button
          onClick={submitBill}
          className="py-2 px-6 bg-white border border-primary text-primary hover:text-white hover:bg-primary rounded font-bold"
        >
          Valider le Bon
        </button>
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
    </div>
  );
}
