import React, { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../AdminComponents/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { Card, CardBody, Label, Select } from "@windmill/react-ui";
import OrdersTable from "../AdminComponents/OrdersTable";

// Icon component (unchanged)
function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Orders = () => {
  // State for orders, pagination, and filter

  const [resultsPerPage, setResultPerPage] = useState(10);
  const [filter, setFilter] = useState("all");

  // Fetch orders from the backend

  // Handle filter change
  const handleFilter = (filter_name) => {
    if (filter_name === "All") {
      setFilter("all");
    } else if (filter_name === "Un-Paid Orders") {
      setFilter("un-paid");
    } else if (filter_name === "Paid Orders") {
      setFilter("paid");
    } else if (filter_name === "Completed") {
      setFilter("completed");
    }
  };

  // Method to confirm or cancel an order

  return (
    <div>
      <PageTitle>Liste des Commandes</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <NavLink exact to="/admin/administration-dashboard" className="mx-2">
            Tableau de Bord
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Liste des Commandes</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filtres Commandes
            </p>

            <Label className="mx-3">
              <Select
                className="py-3"
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option>Tous</option>
                <option>Confirmé</option>
                <option>Annulé</option>
              </Select>
            </Label>
          </div>
        </CardBody>
      </Card>

      {/* Orders Table */}
      <OrdersTable resultsPerPage={resultsPerPage} filter={filter} />
    </div>
  );
};

export default Orders;
