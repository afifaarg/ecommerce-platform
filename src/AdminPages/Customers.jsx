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
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Label,
  Input,
  Select,
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

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    type: "client",
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

  const [clientOrderRatioData, setClientOrderRatioData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Client to Order Ratio",
        data: [0.5, 0.6, 0.7, 0.9, 0.8, 0.5, 0.7],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    // Fetch users from the database (this is a mock API call)
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://ecommerce-platform-api.onrender.com/backendAPI/signup/"
        ); // Replace with your API endpoint
        const data = await response.json();
        setUsers(data);

        // Update charts based on the fetched data (mock data for now)
        const newUserGrowthData = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "Users",
              data: data.map((user) => user.createdAt.monthlyUsers), // Adjust as per actual data structure
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        };
        setUserGrowthData(newUserGrowthData);

        const newClientOrderRatioData = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "Client to Order Ratio",
              data: data.map((user) => user.clientOrderRatio), // Adjust as per actual data structure
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
            },
          ],
        };
        setClientOrderRatioData(newClientOrderRatioData);
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
    try {
      // Make API call to add new user (replace with your API endpoint)
      await fetch(
        "https://ecommerce-platform-api.onrender.com/backendAPI/signup/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );
      setIsModalOpen(false);
      setNewUser({ name: "", email: "", type: "client" });
      // Refresh users list
      const response = await fetch(
        "https://ecommerce-platform-api.onrender.com/backendAPI/signup/"
      );
      const data = await response.json();
      setUsers(data);
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
  const [searchTerm, setSearchTerm] = useState("");
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Weekly Online Visitors" },
    },
  };

  return (
    <div>
      <PageTitle>Liste des utilisateurs</PageTitle>

      {/* <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="User Growth">
          <Line data={userGrowthData} options={lineOptions} />
          <ChartLegend
            legends={[{ title: "Users", color: "rgba(75, 192, 192, 1)" }]}
          />
        </ChartCard>

        <ChartCard title="Client to Order Ratio">
          <Line data={clientOrderRatioData} options={lineOptions} />
          <ChartLegend
            legends={[
              {
                title: "Client to Order Ratio",
                color: "rgba(54, 162, 235, 1)",
              },
            ]}
          />
        </ChartCard>
      </div> */}

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
            Add New User
          </button>
        </div>
      </div>

      <UsersTable resultsPerPage={10} users={users} searchTerm={searchTerm} />

      {/* Modal to add new user */}

      <Modal
        className="bg-white mx-auto w-4/5 md:w-1/2 rounded-xl p-8"
        isOpen={isModalOpen}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>Add New User</ModalHeader>
        <ModalBody>
          <Label for="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Enter user name"
            className="mb-4"
          />
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Enter user email"
            className="mb-4"
          />
          <Label for="type">User Type</Label>
          <Select
            id="type"
            name="type"
            value={newUser.type}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, type: e.target.value }))
            }
            className="mb-4"
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAddUser} className="bg-primary text-white">
            Add User
          </Button>
          <Button onClick={toggleModal} className="bg-gray-500 text-white">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Customers;