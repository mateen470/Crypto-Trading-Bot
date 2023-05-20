import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getSession } from "next-auth/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: "red",
        },
      },
    ],
  },
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,

  plugins: {
    labels: {
      fontColor: "blue",
      fontSize: 18,
    },
    legend: {
      position: "right",
      display: false,
    },
  },
};

const BotsProgress = (props) => {
  const widthAbove1600 = useSelector((state) => state.dashboardWidth.value);

  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    // fetchOrdersByUser();
    setChartData(props.chartData);
  }, [props.chartData]);

  const fetchOrdersByUser = async () => {
    let session = await getSession();
    const response = await fetch(
      `/api/order/get-order?id=${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    const simpleArr = newData.body.map((item) => {
      return {
        ...item,
        strategyName: item.strategyId.botName,
      };
    });
    const chartData = simpleArr.reduce(
      (result, item) => {
        const label = item.strategyName;
        const profit = item.totalProfit;

        // check if the label already exists in the result array
        const existingIndex = result.labels.indexOf(label);
        if (existingIndex >= 0) {
          // add the profit to the existing label
          result.data[existingIndex] += profit;
        } else {
          // add a new label with the profit
          result.labels.push(label);
          result.data.push(profit);
        }

        return result;
      },
      { labels: [], data: [] }
    );

    // sort the data in descending order and update the labels
    const dataWithLabels = chartData.data.map((data, index) => ({
      data,
      label: chartData.labels[index],
    }));
    const sortedData = dataWithLabels.sort((a, b) => b.data - a.data);
    chartData.labels = sortedData.map((data) => data.label);
    chartData.data = sortedData.map((data) => data.data);
    const chartDataLimited = {
      labels: chartData.labels.slice(0, 6),
      data: chartData.data.slice(0, 6),
    };
    console.log(chartData);
    setChartData(chartDataLimited);
  };

  return (
    <Card
      sx={{
        minWidth: 200,
        minHeight: widthAbove1600 < 1600 ? 340 : 357,
        maxHeight: widthAbove1600 < 1600 ? "auto" : 357,
        background: "#2D1537",
        borderRadius: "8px",
        pt: 1,
      }}
    >
      <CardContent>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SignalCellularAltIcon />
          <Typography>{props.heading}</Typography>
        </Stack>
        <Bar
          options={options}
          data={{
            labels: chartData?.labels,
            datasets: [
              {
                label: "Total Profit",
                data: chartData?.data,
                backgroundColor: "#FFA412",
                borderColor: "#FFA412",
                barThickness: 10,
                categoryPercentage: 0.8,
                barPercentage: 0.8,
                borderRadius: 5,
              },
            ],
          }}
        />
      </CardContent>
    </Card>
  );
};

export default BotsProgress;
