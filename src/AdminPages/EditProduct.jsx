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
  Button,
  Select,
} from "@windmill/react-ui";
import axios from "axios";

export default function EditProduct() {
  const { id } = useParams();
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
  const PRODUCT_API = `https://ecommerce-platform-api.onrender.com/backendAPI//produits/${id}/`;

  useEffect(() => {
    // Fetch categories
    console.log(id);
    axios.get(API_URL).then((response) => setCategories(response.data));

    // Fetch product details
    axios.get(PRODUCT_API).then((response) => {
      const product = response.data;
      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        reference: product.reference,
        price: product.price,
        cost_price: product.cost_price,
        margin: product.margin,
        tva: product.tva,
        in_stock: product.in_stock,
        is_active: product.is_active,
        promo: product.promo,
      });
      setProductImages(product.gallery_images);
      setPromoVideo(product.promo_video);
      setVariants(
        product.variants.map((item) => {
          const type = item.color ? "color" : "text";
          const value = type === "color" ? item.color : item.dimension;
          const variantPrice = item.variant_price;
          return {
            type,
            value,
            price: variantPrice,
          };
        })
      );
    });
  }, [PRODUCT_API]);
  console.log(formData);
  console.log(variants);
  console.log(productImages);

  const handleAddVariant = () => {
    const newVariant = {
      type: variantType,
      value: variantValue,
      price: variantPrice,
    };
    setVariants([...variants, newVariant]);
    setShowVariantModal(false);
    setVariantType("");
    setVariantValue("");
    setVariantPrice("");
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };
  const handleRemoveImage = (index) => {
    const updatedImages = productImages.filter((_, i) => i !== index);
    setProductImages(updatedImages);
  };
  const handleImageChange = (event) => {
    const files = event.target.files;
    setProductImages([...productImages, ...Array.from(files)]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setPromoVideo(file);
  };

  const handleSubmit = () => {
    const data = new FormData();

    // Log the formData entries
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    productImages.forEach((image) => {
      data.append("gallery_images", image);
    });

    variants.forEach((variant) => {
      data.append(
        "variants",
        JSON.stringify({
          type: variant.type,
          value: variant.value,
          variant_price: variant.price,
        })
      );
    });

    // if (promoVideo) {
    //   data.append("promo_video", promoVideo);
    // }

    // Log FormData contents
    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    console.log(new URLSearchParams(data).toString());
    axios
      .put(PRODUCT_API, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) =>
        console.log("Product updated successfully:", response.data)
      )
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div>
      <PageTitle>Modifier le produit</PageTitle>

      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-primary">
          <NavLink exact to="/app/dashboard" className="mx-2">
            Tableau de bord
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Modifier un produit</p>
      </div>

      <div className="mt-8">
        <div className="flex">
          {[
            "Informations générales",
            "Informations commerciales",
            "Galerie médias",
            "Personnalisation",
          ].map((tabName, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index + 1)}
              className={`px-4 py-2 mr-2 ${
                activeTab === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              }`}
            >
              {tabName}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {activeTab === 1 && (
            <Card>
              <CardBody>
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
                  value={formData.category}
                  name="category"
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
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
            <Card>
              <CardBody>
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
            <Card>
              <CardBody>
                {/* Displaying current images */}
                <Label>Images produit</Label>
                <div className="mb-4">
                  {productImages.map((image, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <a
                        href={image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline mr-2"
                      >
                        Image {index + 1}
                      </a>
                      <Button
                        size="small"
                        layout="link"
                        onClick={() => handleRemoveImage(index)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Label>Vidéo promotionnelle</Label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
              </CardBody>
            </Card>
          )}

          {activeTab === 4 && (
            <Card>
              <CardBody>
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Type de variante</th>
                        <th className="border px-4 py-2">Valeur de variante</th>
                        <th className="border px-4 py-2">Prix de variante</th>
                        <th className="border px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants.map((variant, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{variant.type}</td>
                          <td className="border px-4 py-2">{variant.value}</td>
                          <td className="border px-4 py-2">{variant.price}</td>
                          <td className="border px-4 py-2">
                            <Button
                              size="small"
                              onClick={() => handleRemoveVariant(index)}
                            >
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button size="small" onClick={() => setShowVariantModal(true)}>
                  Ajouter une variante
                </Button>

                <Modal
                  isOpen={showVariantModal}
                  onClose={() => setShowVariantModal(false)}
                >
                  <Modal.Header>Ajouter une variante</Modal.Header>
                  <Modal.Body>
                    <Label>Type de variante</Label>
                    <Input
                      className="mb-4"
                      value={variantType}
                      onChange={(e) => setVariantType(e.target.value)}
                      placeholder="Type de variante"
                    />
                    <Label>Valeur de variante</Label>
                    <Input
                      className="mb-4"
                      value={variantValue}
                      onChange={(e) => setVariantValue(e.target.value)}
                      placeholder="Valeur de variante"
                    />
                    <Label>Prix de variante</Label>
                    <Input
                      className="mb-4"
                      value={variantPrice}
                      onChange={(e) => setVariantPrice(e.target.value)}
                      placeholder="Prix de variante"
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      layout="outline"
                      onClick={() => setShowVariantModal(false)}
                    >
                      Annuler
                    </Button>
                    <Button onClick={handleAddVariant}>Ajouter</Button>
                  </Modal.Footer>
                </Modal>
              </CardBody>
            </Card>
          )}
        </div>

        <Button className="mt-4 bg-primary text-white" onClick={handleSubmit}>
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
