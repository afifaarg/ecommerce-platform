import React from "react";

import InfoCard from "../AdminComponents/Cards/InfoCard";
import ChartCard from "../AdminComponents/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../AdminComponents/Chart/ChartLegend";
import PageTitle from "../AdminComponents/Typography/PageTitle";

import RoundIcon from "../AdminComponents/RoundIcon";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";
import OrdersTable from "../AdminComponents/OrdersTable";

export default function Dashboard() {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total customers" value="765">
          Pepople
        </InfoCard>

        <InfoCard title="Total income" value="$ 6,760.89">
          round
        </InfoCard>

        <InfoCard title="New Orders" value="150">
          round
        </InfoCard>

        <InfoCard title="Unread Chats" value="15">
          round
        </InfoCard>
      </div>

      {/* <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="User Analytics">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>
      </div> */}

      <PageTitle>Orders</PageTitle>
      <OrdersTable resultsPerPage={10} />
    </>
  );
}
