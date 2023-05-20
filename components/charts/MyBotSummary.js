import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Line } from "react-chartjs-2";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Select from "react-select";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, InputLabel } from "@mui/material";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
const customStyles = {
  control: (provided) => ({
    ...provided,
    background: "#482255",
    borderRadius: "4px",
    minHeight: "25px",
    maxHeight: "25px",
    border: "none",
    cursor: "pointer",
    boxShadow: "none",
    borderRadius: "5px",
    padding: "0px",
    color: "white",
    borderWidth: "0px !important",
    minWidth: "140px",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
  }),
  indicatorSeparator: () => null,
  menu: (provided) => ({
    ...provided,
    background: "#371A3E",
    borderRadius: "4px",
    border: "none",
    minWidth: "150px",
    borderRadius: "5px",
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    opacity: state.isSelected ? "0.5" : "1",
    cursor: "pointer",

    background: "transparent",
    isFocused: false,
    ":active": {
      backgroundColor: "transparent",
    },
    ":hover": {
      backgroundColor: "transparent",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#ffffff",
    cursor: "pointer",
    display: "inline-block",
    marginTop: "-10px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
    paddingBottom: "15px",
    marginTop: "-1px",
    paddingLeft: "10px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
    paddingBottom: "15px",
    marginTop: "-1px",
    paddingLeft: "10px",
  }),
};
const MyBotSummary = () => {
  const widthAbove1600 = useSelector((state) => state.dashboardWidth.value);
  const [isActive, setActive] = React.useState(1);
  const handleClick = (buttonIndex) => {
    setActive(buttonIndex);
  };
  const [data, setData] = useState({
    labels: ["22 June", "24 June", "26 June", "28 June", "30 June"],
    datasets: [
      {
        label: "First Dataset",
        data: [25, 50, 50, 25, 50, 75, 100, 100, 125, 25, 50],
        backgroundColor: "#262238",
        borderColor: "#795BFF",
        tension: 0.4,
        fill: true,
        // pointStyle: "rect",
        // pointBorderColor: "blue",
        // pointBackgroundColor: "#fff",
        showLine: true,
      },
    ],
  });

  const labels = [
    { value: "day", label: "Profit By Day" },
    { value: "week", label: "Profit By Week" },
    { value: "month", label: "Profit By Month" },
  ];
  const [duration, setDuration] = useState(null);
  const handleChange = (option) => {
    setDuration(option);
  };
  return (
    <Grid container>
      <Grid xs={12} item>
        <Card
          sx={{
            minWidth: 600,
            background: "#2D1537",
            borderRadius: "8px",
            minHeight: widthAbove1600 < 1600 ? 340 : 357,
            maxHeight: widthAbove1600 < 1600 ? "auto" : 357,
          }}
        >
          <CardContent>
            <Stack spacing={1} direction="row">
              <Button
                size="large"
                sx={{
                  backgroundImage: isActive === 1 ? "#7E5E82" : "#482255",
                  backgroundColor: isActive === 1 ? "#7E5E82" : "#482255",
                  "&:hover": {
                    backgroundColor: "#482255",
                  },
                  color: "#ffffff",
                  textTransform: "none",
                  height: "25px",
                  width: "140px",
                  ml: 1,
                }}
                onClick={() => handleClick(1)}
              >
                Summary Profit
              </Button>

              <Select
                value={duration}
                options={labels}
                onChange={handleChange}
                styles={customStyles}
                isSearchable={false}
                placeholder={"Profit By?"}
              />
              <Button
                size="large"
                sx={{
                  backgroundImage: isActive === 2 ? "#7E5E82" : "#482255",
                  backgroundColor: isActive === 2 ? "#7E5E82" : "#482255",
                  "&:hover": {
                    backgroundColor: "#482255",
                  },
                  color: "#ffffff",
                  textTransform: "none",
                  height: "25px",
                  width: "140px",
                }}
                onClick={() => handleClick(2)}
              >
                Profit By Pair
              </Button>
              <Button
                size="large"
                sx={{
                  backgroundImage: isActive === 3 ? "#7E5E82" : "#482255",
                  backgroundColor: isActive === 3 ? "#7E5E82" : "#482255",
                  "&:hover": {
                    backgroundColor: "#482255",
                  },
                  color: "#ffffff",
                  textTransform: "none",
                  height: "25px",
                  width: "140px",
                }}
                onClick={() => handleClick(3)}
              >
                Profit By Bot
              </Button>
            </Stack>
            <Grid container>
              <Grid xs={11.7} item>
                <Box
                  sx={{
                    padding: "5px 0px",
                    marginTop: widthAbove1600 < 1600 ? "20px" : "5px",
                  }}
                >
                  <Line
                    options={options}
                    data={data}
                    style={{ maxHeight: "300px", minWidth: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MyBotSummary;
