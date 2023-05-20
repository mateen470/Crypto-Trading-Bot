import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
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
import Card from "@mui/material/Card";
import { Box, CardContent } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { useRouter } from "next/router";

function ProfitByDay() {
  const router = useRouter();
  const { id } = router.query;

  const [profitByDayData, setProfitByDayData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Profit",
        data: [],
        backgroundColor: "#44816E",
        borderColor: "#44816E",
        tension: 0.4,
        fill: true,
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 50,
        // pointStyle: "rect",
        // pointBorderColor: "blue",
        // pointBackgroundColor: "#fff",
        showLine: true,
      },
    ],
  });

  useEffect(() => {
    fetchOrdersByStrategy();
  }, []);

  const fetchOrdersByStrategy = async () => {
    const response = await fetch(`/api/order/get-order-by-strategy?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newData = await response.json();

    if (newData.body) {
      const labels = newData?.body?.map((item) => {
        const createdDate = new Date(item.created);
        return createdDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        });
      });
      const profitData = newData?.body?.map((item) => item.totalProfit);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Total Profit",
            data: profitData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            barThickness: 20,
            categoryPercentage: 0.8,
            barPercentage: 0.8,
            borderRadius: 5,
          },
        ],
      };
      setProfitByDayData(chartData);
    }
  };

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "First Dataset",
        data: [],
        backgroundColor: "#44816E",
        borderColor: "#44816E",
        tension: 0.4,
        fill: true,
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 50,
        // pointStyle: "rect",
        // pointBorderColor: "blue",
        // pointBackgroundColor: "#fff",
        showLine: true,
      },
    ],
  });
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawTicks: false,
        },
      },
    },
  };
  return (
    <Card
      sx={{
        background: "linear-gradient(#300348,#3C1249)",
        minHeight: "400px",
        minWidth: "300px",
        borderRadius: "8px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Typography sx={{ fontSize: 18, p: "20px" }} color="White">
          Profit By Day
        </Typography>
        <Box sx={{ visibility: "hidden" }}>
          <hr />
        </Box>
        <div style={{ padding: "20px", minHeight: "400px" }}>
          <Bar
            style={{ minHeight: "300px" }}
            data={profitByDayData}
            options={options}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfitByDay;
