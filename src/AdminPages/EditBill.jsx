import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
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
} from "@windmill/react-ui";
import Select from "react-select"; // Correct import for react-select
import axios from "axios";

export default function EditPurchaseOrderPage() {
  const { id } = useParams(); // Getting the bill ID from the URL params

  const [bill, setBill] = useState({
    bill_id: "",
    payment_method: "",
    total_amount: 0,
    fournisseur: "",
    products: [],
  });
  const [productOptions, setProductOptions] = useState([]);
  const optionsProductSelect = productOptions.map((product) => ({
    value: product.reference, // Use the product reference as the value
    label: `${product.name} - ${product.cost_price} DZD`, // Use product name and cost price as the label
  }));
  const [product, setProduct] = useState({
    product: "",
    quantity: 1,
    unit_price: 0,
    total_price: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Use null initially

  useEffect(() => {
    // Fetch product options from backend
    axios
      .get("https://ecommerce-platform-api.onrender.com/backendAPI/produits/")
      .then((response) => {
        setProductOptions(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch existing bill details based on the id
    axios
      .get(
        `https://ecommerce-platform-api.onrender.com/backendAPI/buyingBills/${id}/`
      )
      .then((response) => {
        setBill(response.data);
      })
      .catch((error) => console.error("Error fetching bill:", error));
  }, [id]);

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle input change for bill fields
  const handleBillChange = (e) => {
    const { name, value } = e.target;
    setBill((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product selection
  const HandleSelection = (selectedOption) => {
    const selectedProductTosubmit = productOptions.find(
      (item) => item.reference === selectedOption.value
    );
    if (selectedProductTosubmit) {
      setProduct({
        ...selectedProductTosubmit,
        quantity: 1,
        unit_price: selectedProductTosubmit.cost_price,
        total_price: selectedProductTosubmit.cost_price,
      });
    }
  };

  // Update product's total price when quantity or unit price changes
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
      total_price:
        name === "quantity" || name === "unit_price"
          ? prev.unit_price * parseInt(value || 1)
          : prev.total_price,
    }));
  };

  // Confirm and add the product to the bill
  const confirmAddProduct = () => {
    setBill((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          product: product.id,
          unit_price: parseFloat(product.unit_price),
          quantity: parseInt(product.quantity),
          total_price: product.unit_price * parseInt(product.quantity),
        },
      ],
      total_amount:
        parseFloat(prev.total_amount) + parseFloat(product.total_price),
    }));
    setProduct({ product: "", unit_price: 0, quantity: 1, total_price: 0 });
    closeModal();
  };

  const handleProductRemove = (productId) => {
    setBill((prev) => {
      const updatedProducts = prev.products.filter(
        (p) => p.product !== productId
      );
      const updatedTotalAmount = updatedProducts.reduce(
        (acc, p) => acc + p.total_price,
        0
      );
      return {
        ...prev,
        products: updatedProducts,
        total_amount: updatedTotalAmount,
      };
    });
  };

  const submitBill = async () => {
    try {
      console.log(bill);
      const response = await axios.put(
        `http://127.0.0.1:8000/backendAPI/buyingBills/${id}/`,
        bill
      );
      console.log("Bill updated:", response.data);
      alert("Bill successfully updated!");
    } catch (error) {
      console.error("Error submitting bill:", error);
      alert("Failed to update bill. Please try again.");
    }
  };

  return (
    <div>
      <PageTitle>Editer Bon d'Achat</PageTitle>
      {/* Breadcrumb */}
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
        <p className="mx-2">Editer Bon d'Achat</p>
      </div>

      {/* Bill Details */}
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
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full bg-gray-100 rounded">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="py-2 px-4">Produit</th>
              <th className="py-2 px-4">Prix Achat Unitaire</th>
              <th className="py-2 px-4">Quantité</th>
              <th className="py-2 px-4">Prix Achat Total</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bill.products.map((p, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{p.reference}</td>
                <td className="py-2 px-4">{p.unit_price}</td>
                <td className="py-2 px-4">{p.quantity}</td>
                <td className="py-2 px-4">{p.total_price}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleProductRemove(p.product)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between border-b pb-4">
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

      {/* Validate and Update Button */}
      <div className="text-right mt-4 flex justify-between border-t py-2">
        <div></div>
        <button
          onClick={submitBill}
          className="py-2 px-6 bg-white border border-primary text-primary hover:text-white hover:bg-primary rounded font-bold"
        >
          Mettre à Jour le Bon
        </button>
      </div>

      {/* Modal for Product Selection */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          style={{ maxWidth: "600px" }}
        >
          <ModalBody>
            <Label className="mt-4">
              <span>Produit</span>
              <Select
                options={optionsProductSelect}
                onChange={HandleSelection}
                className="mt-2"
                placeholder="Sélectionner un produit"
              />
            </Label>
            <Label className="mt-4">
              <span>Prix Achat Unitaire</span>
              <Input
                type="number"
                name="unit_price"
                value={product.unit_price}
                onChange={handleProductChange}
              />
            </Label>
            <Label className="mt-4">
              <span>Quantité</span>
              <Input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleProductChange}
              />
            </Label>
            <Label className="mt-4">
              <span>Prix Achat Total</span>
              <Input
                type="number"
                name="total_price"
                value={product.total_price}
                disabled
              />
            </Label>
          </ModalBody>
          <ModalFooter>
            <Button layout="outline" onClick={closeModal}>
              Annuler
            </Button>
            <Button onClick={confirmAddProduct}>Confirmer</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
