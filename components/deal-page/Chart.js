import React from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
class CandlestickChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "candlestick",
          height: 350,
          toolbar: {
            show: true,
          },
        },
        xaxis: {
          type: "datetime",
          show: false,
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        zoom: {
          enabled: true,
          autoScaleYaxis: true,
        },
        pan: {
          enabled: true,
          handleDblClick: "reset",
        },
        annotations: {
          position: "back",
          points: [
            {
              x: new Date("2022-01-02").getTime(),
              y: 13.0,
              marker: {
                size: 0,
              },
              label: {
                style: {
                  color: "#fff",
                  background: "#00E396",
                },
                borderColor: "#00E396",
                offsetY: -20,
                text: "Buy",
              },
            },
            {
              x: new Date("2022-01-11").getTime(),
              y: 17.0,
              marker: {
                size: 0,
              },
              label: {
                borderColor: "#FEB019",
                offsetY: -20,
                style: {
                  color: "#fff",
                  background: "#FEB019",
                },
                text: "Sell",
              },
            },
          ],
        },
        plotOptions: {
          candlestick: {
            wick: {
              useFillColor: true,
            },
          },
        },
      },
      series: [
        {
          data: [
            { x: new Date("2022-01-01"), y: [10.0, 12.0, 9.5, 11.5] },
            { x: new Date("2022-01-02"), y: [11.5, 13.0, 11.0, 12.0] },
            { x: new Date("2022-01-03"), y: [12.0, 12.5, 10.5, 11.0] },
            { x: new Date("2022-01-04"), y: [11.0, 11.5, 9.5, 10.5] },
            { x: new Date("2022-01-05"), y: [10.5, 11.5, 10.0, 11.0] },
            { x: new Date("2022-01-06"), y: [11.0, 12.0, 10.5, 11.5] },
            { x: new Date("2022-01-07"), y: [11.5, 13.0, 10.5, 12.5] },
            { x: new Date("2022-01-08"), y: [12.5, 14.0, 12.0, 13.5] },
            { x: new Date("2022-01-09"), y: [13.5, 15.0, 12.5, 14.5] },
            { x: new Date("2022-01-10"), y: [14.5, 16.0, 13.5, 15.5] },
            { x: new Date("2022-01-11"), y: [15.5, 17.0, 14.5, 16.5] },
            { x: new Date("2022-01-12"), y: [16.5, 18.0, 15.5, 17.5] },
            { x: new Date("2022-01-13"), y: [17.5, 19.0, 16.5, 18.5] },
            { x: new Date("2022-01-14"), y: [18.5, 20.0, 17.5, 19.5] },
            { x: new Date("2022-01-15"), y: [19.5, 21.0, 18.5, 20.5] },
            { x: new Date("2022-01-16"), y: [20.5, 22.0, 19.5, 21.5] },
            { x: new Date("2022-01-17"), y: [21.5, 23.0, 20.5, 22.5] },
            { x: new Date("2022-01-18"), y: [22.5, 24.0, 21.5, 23.5] },
            { x: new Date("2022-01-19"), y: [23.5, 25.0, 22.5, 24.5] },
            { x: new Date("2022-01-20"), y: [24.5, 26.0, 23.5, 25.5] },
          ],
        },
      ],
    };
  }

  toggleFullScreen = () => {
    const chartElement = document.getElementById("chart");
    if (!document.fullscreenElement) {
      if (chartElement.requestFullscreen) {
        chartElement.requestFullscreen();
      } else if (chartElement.mozRequestFullScreen) {
        chartElement.mozRequestFullScreen();
      } else if (chartElement.webkitRequestFullscreen) {
        chartElement.webkitRequestFullscreen();
      } else if (chartElement.msRequestFullscreen) {
        chartElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  render() {
    return (
      <Box>
        <button onClick={this.toggleFullScreen}>Toggle Full Screen</button>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
          height={350}
          id="chart"
        />
      </Box>
    );
  }
}

export default CandlestickChart;
