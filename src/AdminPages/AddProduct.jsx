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
  Button,
  Select,
} from "@windmill/react-ui";
import axios from "axios";

// You can fetch the categories from the backend

const AddProduct = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [promoVideo, setPromoVideo] = useState(null);
  const [variants, setVariants] = useState([]);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [variantType, setVariantType] = useState("");
  const [variantValue, setVariantValue] = useState("");
  const [variantPrice, setVariantPrice] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    reference: "",
    price: "",
    cost_price: "",
    margin: "",
    tva: "0",
    in_stock: true,
    is_active: true,
    promo: false,
  });
  const API_URL =
    "https://ecommerce-platform-api.onrender.com/backendAPI/categories/";
  const PRODUCT_API =
    "https://ecommerce-platform-api.onrender.com/backendAPI/produits/";

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data);
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
  }, []);

  const handleAddVariant = () => {
    const newVariant = {
      type: variantType,
      value: variantValue,
      price: variantPrice,
    };
    setVariants([...variants, newVariant]);
    setShowVariantModal(false); // Close the modal after adding the variant
    setVariantType("");
    setVariantValue("");
    setVariantPrice("");
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };
  const handleImageChange = (event) => {
    const files = event.target.files;
    setProductImages(Array.from(files)); // Convert FileList to an array
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setPromoVideo(file);
  };
  const handleSubmit = () => {
    const data = new FormData();
    // Append product details
    // Append product details
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Add images
    productImages.forEach((image, index) => {
      data.append("gallery_images", image); // Append each image as 'gallery_images'
    });

    // Add variants
    variants.forEach((variant) => {
      // Append each variant as a JSON string
      data.append(
        "variants",
        JSON.stringify({
          type: variant.type,
          value: variant.value,
          variant_price: variant.price,
        })
      );
    });

    // Add video
    if (promoVideo) {
      data.append("promo_video", promoVideo); // Add the promo video if selected
    }

    console.log(new URLSearchParams(data).toString());
    axios
      .post(PRODUCT_API, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Product created successfully:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <div>
      <PageTitle>Ajouter un nouveau produit</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-primary">
          <NavLink exact to="/app/dashboard" className="mx-2">
            Tableau de bord
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Ajouter un produit</p>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex">
          <button
            onClick={() => setActiveTab(1)}
            className={`px-4 py-2 mr-2 ${
              activeTab === 1 ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Informations générales
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`px-4 py-2 mr-2 ${
              activeTab === 2 ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Informations commerciales
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`px-4 py-2 mr-2 ${
              activeTab === 3 ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Galerie médias
          </button>
          <button
            onClick={() => setActiveTab(4)}
            className={`px-4 py-2 ${
              activeTab === 4 ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Personnalisation
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 1 && (
            <Card className="row-span-2 md:col-span-2">
              <CardBody>
                <FormTitle>Informations générales</FormTitle>
                <Label>Référence</Label>
                <Input
                  className="mb-4"
                  value={formData.reference}
                  name="reference"
                  onChange={handleInputChange}
                  placeholder="Référence du produit"
                />
                <Label>Désignation</Label>
                <Input
                  className="mb-4"
                  value={formData.name}
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Désignation du produit"
                />

                <Label>Catégorie</Label>
                <Select
                  className="mb-4"
                  value={formData.categroy}
                  name="category"
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>

                <Label>Marque</Label>
                <Input
                  className="mb-4"
                  value={formData.marque}
                  name="marque"
                  onChange={handleInputChange}
                  placeholder="Nom de la marque"
                />

                <Label>Description</Label>
                <Textarea
                  className="mb-4"
                  rows="3"
                  value={formData.description}
                  name="description"
                  onChange={handleInputChange}
                  placeholder="Description du produit"
                />
              </CardBody>
            </Card>
          )}

          {activeTab === 2 && (
            <Card className="row-span-2 md:col-span-2">
              <CardBody>
                <FormTitle>Informations commerciales</FormTitle>
                <Label>Prix de revient</Label>
                <Input
                  className="mb-4"
                  value={formData.cost_price}
                  name="cost_price"
                  onChange={handleInputChange}
                  placeholder="Prix de revient"
                />

                <Label>Prix de vente</Label>
                <Input
                  className="mb-4"
                  value={formData.price}
                  name="price"
                  onChange={handleInputChange}
                  placeholder="Prix de vente"
                />

                <Label>La marge</Label>
                <Input
                  className="mb-4"
                  value={formData.margin}
                  name="margin"
                  onChange={handleInputChange}
                  placeholder="Marge"
                />

                <Label>TVA</Label>
                <Select
                  value={formData.tva}
                  name="tva"
                  onChange={handleInputChange}
                  className="mb-4"
                >
                  <option value="0">0%</option>
                  <option value="19">19%</option>
                </Select>
              </CardBody>
            </Card>
          )}

          {activeTab === 3 && (
            <Card className="row-span-2 md:col-span-2">
              <CardBody>
                <FormTitle>Galerie médias</FormTitle>
                <Label>Images produit</Label>
                <input
                  type="file"
                  className="mb-4 text-gray-800 dark:text-gray-300"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange} // Handle image selection
                />
                <Label>Vidéo promotionnelle</Label>
                <input
                  type="file"
                  className="mb-4 text-gray-800 dark:text-gray-300"
                  accept="video/*"
                  onChange={handleVideoChange} // Handle video selection
                />
              </CardBody>
            </Card>
          )}

          {activeTab === 4 && (
            <Card className="row-span-2 md:col-span-2">
              <CardBody>
                <FormTitle>Personnalisation</FormTitle>
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Valeur de variante</th>
                        <th className="border px-4 py-2">Prix de variante</th>
                        <th className="border px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants.map((variant, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{variant.value}</td>
                          <td className="border px-4 py-2">{variant.price}</td>
                          <td className="border px-4 py-2">
                            <button
                              className="text-red-500 font-bold bg-red-50"
                              onClick={() => handleRemoveVariant(index)}
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  className="bg-blue-100 rounded-xl text-primary py-2 px-1 hover:shadow-lg"
                  onClick={() => setShowVariantModal(true)}
                >
                  + Ajouter une variante
                </button>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      <div className="w-full py-4 mb-4">
        <button
          className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-white border font-bold hover:border-primary hover:text-primary"
          onClick={handleSubmit}
        >
          Ajouter le produit
        </button>
      </div>

      {/* Variant Modal */}
      <Modal
        isOpen={showVariantModal}
        onRequestClose={() => setShowVariantModal(false)}
        contentLabel="Ajouter une variante"
        className="bg-white w-1/2 mx-auto p-8 rounded-lg "
        overlayClassName="Overlay"
      >
        <h2 className="mb-4 text-lg font-semibold">
          Ajouter une nouvelle variante
        </h2>
        <Label>Type de variante</Label>
        <select
          name="type variante"
          id="typeVariante"
          className="rounded-lg py-1 w-full mb-4 px-2 border border-gray-300"
          onChange={(e) => setVariantType(e.target.value)}
        >
          <option value="">Type de variante</option>
          <option value="color">Couleur</option>
          <option value="text">Dimension</option>
        </select>

        <Label className="">Valeur de variante</Label>
        <Input
          className="mb-4 focus:border-none"
          value={variantValue}
          onChange={(e) => setVariantValue(e.target.value)}
          placeholder="Valeur de variante"
          type={variantType === "color" ? "color" : "text"}
        />
        <Label>Prix de variante</Label>
        <Input
          className="mb-4 focus:border-none"
          value={variantPrice}
          onChange={(e) => setVariantPrice(e.target.value)}
          placeholder="Prix de variante"
        />
        <div className="flex justify-end items-center">
          <button
            onClick={() => setShowVariantModal(false)}
            className="mt-4 mr-4 text-red-500 font-bold hover:underline"
            layout="outline"
          >
            Annuler
          </button>
          <button
            onClick={handleAddVariant}
            className="mt-4 bg-primary rounded-lg text-white py-1 font-bold px-4 hover:shadow-lg"
          >
            Ajouter
          </button>
        </div>
      </Modal>
    </div>
  );
};
const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};

export default AddProduct;
