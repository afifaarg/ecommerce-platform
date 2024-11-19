import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge,
  Pagination,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
} from "@windmill/react-ui";
import PageTitle from "../AdminComponents/Typography/PageTitle";

export default function BannersPage() {
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [newBanner, setNewBanner] = useState({
    title: "",
    show: true,
  });
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const API_URL =
    "https://ecommerce-platform-api.onrender.com/backendAPI/banners/";

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(API_URL);
      setBanners(response.data);
      console.log(response.data);
      setTotalResults(response.data.length);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      await axios.patch(`${API_URL}${id}/`, { show: !currentVisibility });
      setBanners((prev) =>
        prev.map((banner) =>
          banner.id === id ? { ...banner, show: !currentVisibility } : banner
        )
      );
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const deleteBanner = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setBanners((prev) => prev.filter((banner) => banner.id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const handleAddBanner = async () => {
    try {
      // Check if the file is valid before appending
      if (!file) {
        console.error("File is required.");
        return; // Prevent submitting if no file is selected
      }

      const data = new FormData();
      data.append("title", newBanner.title); // Ensure this is a string
      data.append("show", newBanner.show); // Ensure this is a boolean or string
      if (file) {
        data.append("file", file); // Add the promo video if selected
      }
      // Log form data to ensure correctness
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(API_URL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response after the banner is added
      console.log(response.data);
      setBanners((prev) => [response.data, ...prev]);
      setIsModalOpen(false);
      setNewBanner({ title: "", file: null, show: true });
    } catch (error) {
      console.error("Error adding banner:", error);
    }
  };
  return (
    <div>
      <PageTitle>Gestion des Bannières (Images/Vidéos)</PageTitle>
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Liste des bannières disponibles
            </p>
            <Button onClick={() => setIsModalOpen(true)} className="bg-primary">
              Ajouter une Bannière
            </Button>
          </div>
        </CardBody>
      </Card>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Titre</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Visible</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>{banner.title}</TableCell>
                <TableCell>
                  <a
                    href={banner.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fichier {banner.title}
                  </a>
                </TableCell>
                <TableCell>
                  <Badge type={banner.show ? "success" : "danger"}>
                    {banner.show ? "Oui" : "Non"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="small"
                      onClick={() => toggleVisibility(banner.id, banner.show)}
                    >
                      {banner.show ? "Cacher" : "Afficher"}
                    </Button>
                    <Button
                      size="small"
                      className="bg-red-500"
                      onClick={() => deleteBanner(banner.id)}
                    >
                      Supprimer
                    </Button>
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
            onChange={setPage}
          />
        </TableFooter>
      </TableContainer>
      <Modal
        className="w-1/2 bg-white mx-auto p-8 rounded-lg"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalHeader>Ajouter une Nouvelle Bannière</ModalHeader>
        <ModalBody>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm">Titre</label>
              <input
                type="text"
                name="title"
                value={newBanner.title}
                onChange={(e) =>
                  setNewBanner({ ...newBanner, title: e.target.value })
                }
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm">URL</label>
              <input
                type="file"
                name="url"
                onChange={handleFileChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newBanner.show}
                onChange={(e) =>
                  setNewBanner({ ...newBanner, show: e.target.checked })
                }
                className="mr-2"
              />
              <label>Visible</label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <span
            onClick={() => setIsModalOpen(false)}
            className="text-red-500 font-bold cursor-pointer mr-4 hover:underline"
          >
            Annuler
          </span>
          <button
            onClick={handleAddBanner}
            className="bg-primary px-4 py-2 text-white font-bold rounded-lg hover:shadow-lg"
          >
            Ajouter
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
