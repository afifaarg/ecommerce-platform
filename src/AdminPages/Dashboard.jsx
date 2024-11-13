// src/components/DashboardClient.jsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import OrdersTable from '../AdminComponents/OrdersTable';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const Dashboard = () => {
  // Fake Data for Clients, Orders, Income, Payment, and Contact Forms
  const fakeData = {
    clients: 500,
    commandes: 1200,
    income: [1000, 1500, 1800, 1200, 2200, 2500, 2700, 3000, 3200, 3500, 3800, 4000], // Monthly Income Data
    payments: [500, 700, 900, 500, 1200, 1500, 1600, 1900, 2100, 2300, 2500, 2700], // Monthly Payment Data
    formulaireContact: 350,
  };

  // Calculating Total Income, Payment and Margin (Income - Payment)
  const totalIncome = fakeData.income.reduce((acc, monthIncome) => acc + monthIncome, 0);
  const totalPayment = fakeData.payments.reduce((acc, monthPayment) => acc + monthPayment, 0);
  const totalMargin = totalIncome - totalPayment;

  // Chart Data for Line Graph (Income and Payment by Month)
  const lineChartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
    ],
    datasets: [
      {
        label: 'Revenu',
        data: fakeData.income,
        borderColor: '#34d399',
        backgroundColor: 'rgba(34, 211, 153, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Paiement',
        data: fakeData.payments,
        borderColor: '#f87171',
        backgroundColor: 'rgba(248, 113, 113, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart Data for Margin (Income - Payment)
  const marginData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
    ],
    datasets: [
      {
        label: 'Marge (Revenu - Paiement)',
        data: fakeData.income.map((income, index) => income - fakeData.payments[index]),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700">Tableau de bord des Clients</h1>

      {/* Cards displaying various metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">Nombre total de clients</h2>
          <p className="text-2xl font-bold text-gray-800">{fakeData.clients}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">Nombre de commandes</h2>
          <p className="text-2xl font-bold text-gray-800">{fakeData.commandes}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">Formulaires de contact</h2>
          <p className="text-2xl font-bold text-gray-800">{fakeData.formulaireContact}</p>
        </div>
      </div>

      {/* Cards for Total Income, Total Payment, and Total Margin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">Revenu total</h2>
          <p className="text-2xl font-bold text-green-600">{totalIncome} DZD</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">Paiement total</h2>
          <p className="text-2xl font-bold text-red-600">{totalPayment} DZD</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600">Marge nette</h2>
          <p className="text-2xl font-bold text-yellow-600">{totalMargin} DZD</p>
        </div>
      </div>

      {/* Line Chart for Income and Payment */}
      <div className="bg-white p-6 rounded-lg shadow h-80">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Revenu et Paiement par mois</h2>
        <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      {/* Line Chart for Margin (Income - Payment) */}
      <div className="bg-white p-6 rounded-lg shadow h-80">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Marge nette par mois</h2>
        <Line data={marginData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <OrdersTable />
    </div>
    
  );
};

export default Dashboard;
