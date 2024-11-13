import React, { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../AdminComponents/Typography/PageTitle";
import { Link, NavLink } from "react-router-dom";
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

export default function CategoriesPage() {
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState([]); // New state for paginated data
  const totalResults = data.length;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  const API_URL =
    "https://ecommerce-platform-api.onrender.com/backendAPI/categories/";

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

  // Update the paginated data when the page or resultsPerPage changes
  useEffect(() => {
    const filteredData = data.filter((categorie) =>
      categorie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginate the filtered data
    setPaginatedData(
      filteredData.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    );
  }, [data, searchTerm, page, resultsPerPage]); // Dependencies updated

  // Pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // Open and close modals

  function closeAddModal() {
    setIsAddModalOpen(false);
    setNewCategory({ name: "", description: "" });
  }

  async function openDeleteModal(categoryId) {
    const category = await data.find((category) => category.id === categoryId);
    setSelectedDeleteProduct(category);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function openAddModal(category = null) {
    if (category) {
      setNewCategory({
        id: category.id, // Include the ID to differentiate update vs. add
        name: category.name,
        description: category.description,
      });
    } else {
      setNewCategory({ name: "", description: "" });
    }
    setIsAddModalOpen(true);
  }

  // Modify handleAddCategory to check for update vs. add
  // Modify handleAddCategory to add alert after adding or updating a category
  async function handleAddCategory() {
    try {
      if (newCategory.name && newCategory.description) {
        if (newCategory.id) {
          // Update category
          await axios.put(`${API_URL}${newCategory.id}/`, newCategory);
          // Update the data state directly without re-fetching
          setData(
            data.map((cat) => (cat.id === newCategory.id ? newCategory : cat))
          );
          alert("Catégorie modifiée avec succès!");
        } else {
          // Create new category
          const response = await axios.post(API_URL, newCategory);
          setData([...data, response.data]); // Add new category to data
          alert("Nouvelle catégorie ajoutée avec succès!");
        }
        closeAddModal();
      }
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  }

  // Handle Delete Category
  async function handleDeleteCategory() {
    try {
      if (selectedDeleteProduct) {
        await axios.delete(`${API_URL}${selectedDeleteProduct.id}/`);
        closeDeleteModal();
        alert("Catégorie supprimée avec succès!");
        fetchCategories(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  return (
    <div>
      <PageTitle>Toutes les catégories</PageTitle>

      {/* Table and Grid Layout */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Rechercher ..."
                className="px-4 py-2 w-60 border-2 rounded-lg focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <button
                onClick={() => openAddModal()}
                className="p-2 bg-primary rounded-xl text-sm text-white font-bold border hover:bg-white hover:border-primary hover:text-primary"
              >
                Nouvelle catégorie
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Add Category Modal */}
      <Modal
        className="w-1/2 bg-white mx-auto p-8 rounded-lg"
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
      >
        <ModalHeader>
          {newCategory.name
            ? "Modifier la catégorie"
            : "Ajouter une nouvelle catégorie"}
        </ModalHeader>
        <ModalBody>
          <Label>
            <span className="font-bold">Nom de la catégorie</span>
            <input
              className="mt-1 p-2 w-full  border rounded-lg  focus:border-primary focus:outline-none"
              placeholder="Nom de la catégorie"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
          </Label>
          <Label className="mt-4">
            <span className="font-bold">Description</span>
            <textarea
              className="mt-1 p-2 w-full border rounded-lg"
              value={newCategory.description}
              placeholder="Description de la catégorie"
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            />
          </Label>
        </ModalBody>
        <ModalFooter>
          <span
            onClick={closeAddModal}
            className="text-red-500 font-bold cursor-pointer mr-4 hover:underline"
          >
            Annuler
          </span>
          <button
            onClick={handleAddCategory}
            className="bg-primary px-4 py-2 text-white font-bold rounded-lg hover:shadow-lg"
          >
            {newCategory.name ? "Modifier" : "Ajouter"}
          </button>
        </ModalFooter>
      </Modal>

      {/* Delete Category Modal */}
      <Modal
        className="w-1/2 bg-white mx-auto p-8 rounded-lg"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      >
        <ModalHeader>Supprimer la catégorie</ModalHeader>
        <ModalBody>
          Êtes-vous sûr de vouloir supprimer la catégorie{" "}
          {selectedDeleteProduct && `"${selectedDeleteProduct.name}"`} ?
        </ModalBody>
        <ModalFooter>
          <span
            onClick={closeDeleteModal}
            className="text-primary font-bold cursor-pointer hover:underline mr-4"
          >
            Annuler
          </span>
          <button
            onClick={handleDeleteCategory}
            className="bg-red-500 px-4 py-2 text-white font-bold rounded-lg hover:shadow-lg"
          >
            Supprimer
          </button>
        </ModalFooter>
      </Modal>

      {/* Category Table */}
      <TableContainer>
        <Table>
          <TableHeader>
            <tr className="text-center">
              <TableCell>Categorie</TableCell>
              <TableCell>Description Categorie</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {paginatedData.map((category) => (
              <TableRow className="text-center" key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-3 justify-center items-center">
                    <button
                      onClick={() => openAddModal(category)}
                      size="small"
                      className="bg-primary text-white text-sm p-1 px-2 rounded-lg hover:shadow-lg"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => openDeleteModal(category.id)}
                      size="small"
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
      </TableContainer>

      {/* Pagination */}
      <Pagination
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onChange={onPageChange}
        currentPage={page}
      />
    </div>
  );
}
