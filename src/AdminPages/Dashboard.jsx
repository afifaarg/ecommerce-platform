import React from "react";
import InfoCard from "../AdminComponents/Cards/InfoCard";
import ChartCard from "../AdminComponents/Chart/ChartCard";
import { Line, Doughnut } from "react-chartjs-2";
import ChartLegend from "../AdminComponents/Chart/ChartLegend";
import PageTitle from "../AdminComponents/Typography/PageTitle";
import OrdersTable from "../AdminComponents/OrdersTable";

import { doughnutOptions, lineOptions } from "../utils/demo/chartsData";

export default function Dashboard() {
  const lineData = {
    labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
    datasets: [
      {
        label: "Chiffre d'affaire (DZD)",
        data: [120000, 150000, 130000, 170000, 160000, 180000],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.4, // Adds curve to the line
        fill: true,
      },
      {
        label: "Prix d'achat (DZD)",
        data: [80000, 90000, 70000, 110000, 100000, 120000],
        borderColor: "#FF5722",
        backgroundColor: "rgba(255, 87, 34, 0.1)",
        tension: 0.4, // Adds curve to the line
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ["Direct", "Site Web", "Réseaux Sociaux", "Recommandations"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <>
      <PageTitle>Tableau de Bord</PageTitle>

      {/* Cards */}
      <div className="grid gap-6 mb-8 px-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="765">
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1.5em"
            width="1.5em"
          >
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6z" />
            <path
              fillRule="evenodd"
              d="M5.216 14A2.238 2.238 0 015 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 005 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
            />
            <path d="M4.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
          </svg>
        </InfoCard>

        <InfoCard title="Chiffre d'affaire" value="DZD 6,760,890">
          DZD
        </InfoCard>

        <InfoCard title="Nouvelles commandes" value="150">
          📦
        </InfoCard>

        <InfoCard title="Messages non lus" value="15">
          📧
        </InfoCard>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* Revenue vs. Purchase Cost Line Chart */}
        <ChartCard title="Comparaison du Chiffre d'affaire et du Prix d'achat (Mensuel)">
          <Line
            data={lineData}
            options={{
              ...lineOptions,
              plugins: {
                title: {
                  display: true,
                  text: "Chiffre d'affaire vs. Prix d'achat (DZD)",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Montant (DZD)",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Mois",
                  },
                },
              },
            }}
          />
          <ChartLegend
            legends={[
              { title: "Chiffre d'affaire", color: "#4CAF50" },
              { title: "Prix d'achat", color: "#FF5722" },
            ]}
          />
        </ChartCard>

        {/* Order Sources Doughnut Chart */}
        <ChartCard title="Sources des Commandes">
          <Doughnut
            data={doughnutData}
            options={{
              ...doughnutOptions,
              plugins: {
                title: { display: true, text: "Répartition des Sources" },
              },
            }}
          />
          <ChartLegend
            legends={[
              { title: "Direct", color: "#FF6384" },
              { title: "Site Web", color: "#36A2EB" },
              { title: "Réseaux Sociaux", color: "#FFCE56" },
              { title: "Recommandations", color: "#4BC0C0" },
            ]}
          />
        </ChartCard>
      </div>

      <PageTitle>Commandes</PageTitle>
      <OrdersTable />
    </>
  );
}
