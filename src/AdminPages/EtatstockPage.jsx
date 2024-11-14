// src/components/Dashboard.jsx

import React, { useContext } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Fake stock data
  const stockData = [
    { nom: 'Matelas A', quantite: 30, ventes: 120, faible: 3 },
    { nom: 'Matelas B', quantite: 5, ventes: 200, faible: 8 },
    { nom: 'Oreiller C', quantite: 50, ventes: 80, faible: 1 },
    { nom: 'Couette D', quantite: 0, ventes: 50, faible: 6 },
    { nom: 'Matelas E', quantite: 3, ventes: 180, faible: 5 },
    { nom: 'Oreiller F', quantite: 10, ventes: 150, faible: 2 },
    { nom: 'Couette G', quantite: 15, ventes: 60, faible: 7 },
    { nom: 'Matelas A', quantite: 30, ventes: 120, faible: 3 },
    { nom: 'Matelas B', quantite: 5, ventes: 200, faible: 8 },
    { nom: 'Oreiller C', quantite: 50, ventes: 80, faible: 1 },
    { nom: 'Couette D', quantite: 0, ventes: 50, faible: 6 },
    { nom: 'Matelas E', quantite: 3, ventes: 180, faible: 5 },
    { nom: 'Oreiller F', quantite: 10, ventes: 150, faible: 2 },
    { nom: 'Couette G', quantite: 15, ventes: 60, faible: 7 },
    { nom: 'Matelas A', quantite: 30, ventes: 120, faible: 3 },
    { nom: 'Matelas B', quantite: 5, ventes: 200, faible: 8 },
    { nom: 'Oreiller C', quantite: 50, ventes: 80, faible: 1 },
    { nom: 'Couette D', quantite: 0, ventes: 50, faible: 6 },
    { nom: 'Matelas E', quantite: 3, ventes: 180, faible: 5 },
    { nom: 'Oreiller F', quantite: 10, ventes: 150, faible: 2 },
    { nom: 'Couette G', quantite: 15, ventes: 60, faible: 7 },
    { nom: 'Matelas A', quantite: 30, ventes: 120, faible: 3 },
    { nom: 'Matelas B', quantite: 5, ventes: 200, faible: 8 },
    { nom: 'Oreiller C', quantite: 50, ventes: 80, faible: 1 },
    { nom: 'Couette D', quantite: 0, ventes: 50, faible: 6 },
    { nom: 'Matelas E', quantite: 3, ventes: 180, faible: 5 },
    { nom: 'Oreiller F', quantite: 10, ventes: 150, faible: 2 },
    { nom: 'Couette G', quantite: 15, ventes: 60, faible: 7 },
  ];

  // Process data for charts
  const lowStockItems = stockData.filter(item => item.quantite < 5);
  const totalStock = stockData.reduce((acc, item) => acc + item.quantite, 0);
  const outOfStockItems = stockData.filter(item => item.quantite === 0);

  // Most Sold Products
  const mostSoldProduct = stockData.sort((a, b) => b.ventes - a.ventes).slice(0, 3);

  // Most faible Products
  const mostfaibleProduct = stockData.sort((a, b) => b.faible - a.faible).slice(0, 3);

  // Data for Bar Chart (Quantité par produit)
  const barChartData = {
    labels: stockData.map(item => item.nom),
    datasets: [
      {
        label: 'Quantité en stock',
        data: stockData.map(item => item.quantite),
        backgroundColor: '#4ade80',
      },
    ],
  };

  // Data for Doughnut Chart (Etat global du stock)
  const doughnutData = {
    labels: ['En stock', 'En rupture', 'Stock faible'],
    datasets: [
      {
        label: 'Etat du Stock',
        data: [totalStock - outOfStockItems.length, outOfStockItems.length, lowStockItems.length],
        backgroundColor: ['#4ade80', '#f87171', '#facc15'],
      },
    ],
  };

  // Data for Most Sold Product Bar Chart
  const mostSoldData = {
    labels: mostSoldProduct.map(item => item.nom),
    datasets: [
      {
        label: 'Ventes',
        data: mostSoldProduct.map(item => item.ventes),
        backgroundColor: '#38bdf8',
      },
    ],
  };

  // Data for Most faible Product Bar Chart
  const mostfaibleData = {
    labels: mostfaibleProduct.map(item => item.nom),
    datasets: [
      {
        label: 'faibleté',
        data: mostfaibleProduct.map(item => item.faible),
        backgroundColor: '#f59e0b',
      },
    ],
  };

  // Data for Combined Chart (Sales + Fragility)
  const combinedChartData = {
    labels: stockData.map(item => item.nom),
    datasets: [
      {
        label: 'Ventes',
        data: stockData.map(item => item.ventes),
        backgroundColor: '#38bdf8',
        yAxisID: 'y1',
      },
      {
        label: 'Faibleté',
        data: stockData.map(item => item.faible),
        backgroundColor: '#f59e0b',
        yAxisID: 'y2',
      },
    ],
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700">Tableau de bord - État de stock</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">Stock total</h2>
          <p className="text-2xl font-bold text-gray-800">{totalStock}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">Articles en rupture</h2>
          <p className="text-2xl font-bold text-red-500">{outOfStockItems.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">Stock faible</h2>
          <p className="text-2xl font-bold text-yellow-500">{lowStockItems.length}</p>
        </div>
      </div>

      {/* Bar Chart for Stock Quantities */}
      <div className="bg-white p-6 rounded-lg shadow h-80">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Quantité par produit</h2>
        <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      {/* Doughnut Chart for Stock State */}
      <div className="bg-white p-6 rounded-lg shadow h-80">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Etat global du stock</h2>
        <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      {/* Bar Chart for Most Sold Products */}
      <div className="bg-white p-6 rounded-lg shadow h-80">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Produits les plus vendus</h2>
        <Bar data={mostSoldData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      {/* Bar Chart for Most faible Products */}
      <div className="bg-white p-6 rounded-lg shadow h-80">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Produits les plus faibles</h2>
        <Bar data={mostfaibleData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      {/* Combined Bar Chart (Sales + Fragility) */}
      <div className="bg-white p-6 rounded-lg shadow h-80">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Ventes et faibleté des Produits</h2>
        <Bar
          data={combinedChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y1: {
                type: 'linear',
                position: 'left',
                beginAtZero: true,
              },
              y2: {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
