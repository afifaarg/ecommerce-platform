import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import PageTitle from "../AdminComponents/Typography/PageTitle";
import ChartCard from "../AdminComponents/Chart/ChartCard";
import ChartLegend from "../AdminComponents/Chart/ChartLegend";
import UsersTable from "../AdminComponents/UsersTable";
import axios from "axios";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Label,
  Input,
  Pagination,
} from "@windmill/react-ui";

// Register Chart.js components
ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Fournisseurs = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]); // New state for paginated data
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPaginatedData(filteredData.slice(page - 1, page));
  }, [users, searchTerm, page]);
  // pagination setup
  const totalResults = users.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }
  useEffect(() => {
    setUsers(users.slice(page - 1, page));
  }, [page, searchTerm]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [userGrowthData, setUserGrowthData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Users",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    // Fetch users from the database (this is a mock API call)
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://ecommerce-platform-api.onrender.com/backendAPI/fournisseurs/"
        ); // Replace with your API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    console.log(newUser);
    try {
      // Make API call to add new user
      await axios.post(
        "https://ecommerce-platform-api.onrender.com/backendAPI/fournisseurs/",
        newUser,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsModalOpen(false);
      setNewUser({ name: "", email: "", address: "", phone: "" });

      // Refresh users list
      const response = await axios.get(
        "https://ecommerce-platform-api.onrender.com/backendAPI/fournisseurs/"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "User Growth Over Time" },
    },
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteFournisseur, setSelectedDeleteFournisseur] =
    useState(null);
  async function openDeleteModal(selectUser) {
    const user = await users.find((user) => user.id === selectUser.id);
    setSelectedDeleteFournisseur(selectUser);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }
  const API_URL =
    "https://ecommerce-platform-api.onrender.com/backendAPI/fournisseurs/";
  async function handleDeleteFournisseur() {
    try {
      if (selectedDeleteFournisseur) {
        await axios.delete(`${API_URL}${selectedDeleteFournisseur.id}/`);
        closeDeleteModal();
        alert("Fournisseur supprimée avec succès!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error suppression du fournisseur:", error);
    }
  }
  return (
    <div>
      <PageTitle>Liste des Fournisseurs</PageTitle>

      <div className="flex items-center justify-between p-2 my-2 rounded-lg bg-gray-100 shadow-lg border-gray-300">
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
            onClick={toggleModal}
            className="p-2 bg-primary rounded-xl text-sm text-white font-bold border hover:bg-white hover:border-primary hover:text-primary"
          >
            Nouveau Fournisseur
          </button>
        </div>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nom Complet</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>N° Téléphone</TableCell>
              <TableCell>Email</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {paginatedData.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
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
        <ModalHeader>Supprimer le fournisseur</ModalHeader>
        <ModalBody>
          Êtes-vous sûr de vouloir supprimer le fournisseur{" "}
          {selectedDeleteFournisseur && `"${selectedDeleteFournisseur.name}"`} ?
        </ModalBody>
        <ModalFooter>
          <span
            onClick={closeDeleteModal}
            className="text-primary font-bold cursor-pointer hover:underline mr-4"
          >
            Annuler
          </span>
          <button
            onClick={handleDeleteFournisseur}
            className="bg-red-500 px-4 py-2 text-white font-bold rounded-lg hover:shadow-lg"
          >
            Supprimer
          </button>
        </ModalFooter>
      </Modal>

      {/* Modal to add new user */}
      <Modal
        className="bg-white mx-auto w-4/5 md:w-1/2 rounded-xl p-8"
        isOpen={isModalOpen}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>Nouveau Fournisseur</ModalHeader>
        <ModalBody>
          <Label htmlFor="name">Nom Complet</Label>
          <Input
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Nom & prenom du fournisseur"
            className="mb-4"
          />
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email du fournisseur"
            className="mb-4"
          />
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            name="address"
            value={newUser.address}
            onChange={handleInputChange}
            placeholder="Adresse du fournisseur"
            className="mb-4"
          />
          <Label htmlFor="adresse">Numéro de téléphone</Label>
          <Input
            id="PHONE"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
            placeholder="Numéro de téléphone du fournisseur"
            className="mb-4"
          />
        </ModalBody>
        <ModalFooter>
          <span
            onClick={toggleModal}
            className="text-primary font-bold cursor-pointer hover:underline mr-4"
          >
            Annuler
          </span>
          <button
            onClick={handleAddUser}
            className="bg-green-500 px-4 py-2 text-white font-bold rounded-lg hover:shadow-lg"
          >
            Ajouter
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Fournisseurs;
