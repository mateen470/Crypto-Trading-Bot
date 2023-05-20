import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Doughnut } from "react-chartjs-2";
import Stack from "@mui/material/Stack";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  Title,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

const ccxt = require("ccxt");
import { signIn, getSession, useSession } from "next-auth/react";

import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);
// const doughnutData = {
//   labels: false,
//   datasets: [
//     {
//       data: [200, 1000, 100],
//       backgroundColor: ["#795BFF", "#FFA412", "#666666"],
//       hoverBackgroundColor: ["#795BFF", "#FFA412", "#666666"],
//       borderWidth: 0,
//     },
//   ],
// };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      gridLines: {
        drawOnChartArea: false,
        color: "red",
        lineWidth: 1,
      },
      ticks: {
        fontColor: "white",
      },
    },

    y: {
      gridLines: {
        drawOnChartArea: false,
        color: "red",
        lineWidth: 1,
      },
      ticks: {
        display: false,
        fontColor: "white",
        beginAtZero: true,
      },
    },
  },
};

function AggregateAccountBalance(props) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchAllWallet();
  }, []);

  const fetchAllWallet = async () => {
    const { user } = await getSession();
    const getWalletData = await fetch(
      `/api/wallet/get-all-wallet?id=${user.id}`,
      {
        method: "GET",
      }
    );
    const walletData = await getWalletData.json();

    let chartData = {
      labels: [],
      datasets: [],
    };

    let assetData = {};

    if (walletData.body.length > 0) {
      const data = {
        labels: getAssetLabels(
          walletData.body[walletData.body.length - 1].assets
        ),
        datasets: [
          {
            data: getAssetBalances(
              walletData.body[walletData.body.length - 1].assets
            ),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      };
      setDoughnutData(data);

      const newData = {
        labels: [],
        datasets: [
          {
            label: "Total USDT Bal",
            data: [],
            fill: false,
            borderColor: "#CC5500",
            tension: 0.1,
          },
        ],
      };

      const newChartData = walletData?.body.reduce((acc, wallet) => {
        const date = new Date(wallet.created).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        });
        const totalUsdtBal = wallet.assets.reduce((total, asset) => {
          if (asset.asset === "USDT") {
            return total + parseFloat(asset.usdtBal);
          }
          return total;
        }, 0);

        if (!acc[date]) {
          acc[date] = {
            date,
            totalUsdtBal,
          };
        } else {
          acc[date].totalUsdtBal += totalUsdtBal;
        }

        return acc;
      }, {});

      const chartDataArray = Object.values(newChartData);

      chartDataArray.forEach((dataItem) => {
        const { date, totalUsdtBal } = dataItem;
        const labelIndex = data.labels.indexOf(date);

        if (labelIndex === -1) {
          newData.labels.push(date);
          newData.datasets[0].data.push(totalUsdtBal);
        } else {
          newData.datasets[0].data[labelIndex] += totalUsdtBal;
        }
      });

      setChartData(newData);

      //   // Extract data from the array of objects and create an object with assets as keys
      //   await walletData?.body?.forEach((doc) => {
      //     const date = doc.created.substring(5, 10);
      //     if (chartData.labels.includes(date)) {
      //       // Skip this object if the date already exists
      //       return;
      //     }
      //     chartData.labels.push(date);
      //     doc.assets.forEach((asset) => {
      //       if (!assetData[asset.asset]) {
      //         assetData[asset.asset] = {
      //           label: asset.asset,
      //           data: [],
      //           backgroundColor: "transparent",
      //           borderColor: getRandomColor(),
      //           borderWidth: 2,
      //         };
      //       }
      //       assetData[asset.asset].data.push(asset.usdtBal);
      //     });
      //   });

      //   // Add datasets to the chart data
      //   await Object.keys(assetData).forEach((key) => {
      //     chartData.datasets.push(assetData[key]);
      //   });

      //   console.log(chartData);

      //   setChartData(chartData);
    }
  };

  function getAssetLabels(assets) {
    return assets.map((asset) => asset.asset);
  }

  function getAssetBalances(assets) {
    return assets.map((asset) => asset.usdtBal);
  }
  // Generate a random color
  function getRandomColor() {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 1)`;
  }

  const doughnutOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <Grid container>
      <Grid xs={12} item>
        <Card
          sx={{
            background: "#19191985",
            minHeight: "200px",
            // border: "1px solid #666666",
            minWidth: "400px",
            // marginBottom: "40px",
            marginTop: "1.5rem",
          }}
        >
          <CardContent sx={{ padding: "0px" }}>
            {/* <hr sx={{ border: "1px solid #7A8580" }} /> */}
            <Stack
              ml={2}
              pl={2}
              mr={2}
              mt={2}
              alignItems="center"
              direction="row"
            >
              <Grid container>
                <Grid
                  xs={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ height: 130, width: 130 }}>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                  </div>
                  <div>
                    <Typography
                      sx={{
                        fontSize: 22,
                        transform: "rotate(-90deg)",
                      }}
                      color="White"
                    >
                      USD
                    </Typography>
                  </div>
                </Grid>

                <Grid xs={10}>
                  <div style={{ width: "100%", height: "230px" }}>
                    <Line data={chartData} options={options} />
                  </div>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AggregateAccountBalance;
