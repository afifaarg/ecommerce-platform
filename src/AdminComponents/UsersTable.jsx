import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
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
} from "@windmill/react-ui";

const UsersTable = ({ searchTerm, users }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]); // New state for paginated data

  useEffect(() => {
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPaginatedData(filteredData.slice(page - 1, page));
  }, [users, searchTerm, page]); // Dependencies updated
  // pagination setup
  const totalResults = users.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(users.slice(page - 1, page));
  }, [page, searchTerm]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteClient, setSelectedDeleteClient] = useState(null);
  async function openDeleteModal(selectUser) {
    const user = await users.find((user) => user.id === selectUser.id);
    setSelectedDeleteClient(selectUser);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }
  const API_URL = "http://127.0.0.1:8000/backendAPI/clients/";
  async function handleDeleteClient() {
    try {
      if (selectedDeleteClient) {
        await axios.delete(`${API_URL}${selectedDeleteClient.id}/`);
        closeDeleteModal();
        alert("Client supprimée avec succès!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error suppression du Client:", error);
    }
  }
  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nom Complet</TableCell>

              <TableCell>Email</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>N° Téléphone</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {paginatedData.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <div className="flex space-x-3 justify-center items-center">
                    <button
                      onClick={() => openAddModal(user)}
                      size="small"
                      className="bg-primary text-white text-sm p-1 px-2 rounded-lg hover:shadow-lg"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => openDeleteModal(user)}
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
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
      {/* Delete Category Modal */}
      <Modal
        className="w-1/2 bg-white mx-auto p-8 rounded-lg"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      >
        <ModalHeader>Supprimer le Client</ModalHeader>
        <ModalBody>
          Êtes-vous sûr de vouloir supprimer le Client{" "}
          {selectedDeleteClient && `"${selectedDeleteClient.name}"`} ?
        </ModalBody>
        <ModalFooter>
          <span
            onClick={closeDeleteModal}
            className="text-primary font-bold cursor-pointer hover:underline mr-4"
          >
            Annuler
          </span>
          <button
            onClick={handleDeleteClient}
            className="bg-red-500 px-4 py-2 text-white font-bold rounded-lg hover:shadow-lg"
          >
            Supprimer
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UsersTable;
