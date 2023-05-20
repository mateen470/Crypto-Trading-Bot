// import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import React, { useEffect, useState } from "react";

const TileChart = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        data: [
          {
            x: "BTC",
            y: 6.2,
          },
          {
            x: "ETH",
            y: 0.4,
          },
          {
            x: "ADA",
            y: -1.4,
          },
          {
            x: "BNB",
            y: 2.7,
          },
          {
            x: "USDT",
            y: -0.3,
          },
          {
            x: "ONE",
            y: 5.1,
          },
          {
            x: "ALGO",
            y: -2.3,
          },
          {
            x: "DOGE",
            y: 2.1,
          },
          {
            x: "BUSDsad",
            y: 0.3,
          },
        ],
      },
    ],

    legend: {
      show: false,
    },
    chart: {
      width: 500,
      height: 500,
      type: "treemap",
    },
    title: {
      text: "",
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      formatter: function (text, op) {
        return [text, op.value];
      },
      offsetY: -4,
    },
    plotOptions: {
      treemap: {
        enableShades: true,
        shadeIntensity: 0.5,
        reverseNegativeShade: true,
        colorScale: {
          ranges: [
            {
              from: -6,
              to: 0,
              color: "#EE4758",
            },
            {
              from: 0.001,
              to: 6,
              color: "#48CD81",
            },
          ],
        },
      },
    },
  });

  const [chartSeries, setChartSeries] = useState(chartOptions.series);
  const updateChart = () => {
    setChartOptions({
      ...chartOptions,
      title: {
        text: "Updated Treemap Chart",
      },
    });

    setChartSeries([
      {
        data: [
          {
            x: "Category A",
            y: 20,
          },
          {
            x: "Category B",
            y: 50,
          },
          {
            x: "Category C",
            y: 30,
          },
        ],
      },
    ]);
  };

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (newPos) => setPosition(newPos),
      console.error
    );
  }, []);

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="treemap"
      height={700}
      width={550}
    />
  );
};

export default TileChart;
