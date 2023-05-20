import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Doughnut } from "react-chartjs-2";
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
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, CardContent, Divider, Grid } from "@mui/material";

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
const doughnutData = {
  labels: false,
  datasets: [
    {
      data: [200, 200, 100],
      backgroundColor: ["#795BFF", "#FFA412", "#666666"],
      hoverBackgroundColor: ["#795BFF", "#FFA412", "#666666"],
      borderWidth: 0,
    },
  ],
};

const CustomizedIconButton = styled(IconButton)({
  backgroundColor: "#383838",
  borderRadius: 0,

  "&:hover": {
    backgroundColor: "none",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

function MyExchange() {
  return (
    <Card
      sx={{
        background: "#191919",
        minHeight: "400px",
        border: "1px solid #666666",
        minWidth: "400px",

        marginBottom: "40px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Stack
          mt={2}
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <Typography
            sx={{ fontSize: 18, p: "20px", fontWeight: 700 }}
            color="White"
          >
            Binance
          </Typography>
          <Stack spacing={1} direction="row" mr="10px">
            <IconButton
              sx={{ background: "#383838", borderRadius: 0, color: "#CCCCCC" }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              sx={{ background: "#383838", borderRadius: 0, color: "#CCCCCC" }}
            >
              <SaveAsIcon />
            </IconButton>
            <IconButton
              sx={{ background: "#383838", borderRadius: 0, color: "#CCCCCC" }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{
                background: "#795BFF",
                borderRadius: 0,
                color: "#CCCCCC",
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Stack>
        </Stack>

        <hr sx={{ border: "1px solid #7A8580" }} />

        <Stack spacing={4} p={3} mt={2} alignItems="flex-start" direction="row">
          <div style={{ height: 121, width: 121 }}>
            <Doughnut data={doughnutData} />
          </div>
          <Grid container>
            <Grid xs={6} item>
              <Typography>Balance</Typography>
            </Grid>
            <Grid xs={6} item>
              <Typography color="#CCCCCC">24 hour Change</Typography>
            </Grid>
            <Grid mt={2} xs={12} item>
              <div
                style={{
                  margin: "4px 0",
                  height: "2px",
                  background:
                    "repeating-linear-gradient(to right, #666666, #666666 5px, #191919 5px, #191919 10px)",
                }}
              />
            </Grid>
            <Grid mt={2} xs={6} item>
              <Typography fontSize={18} color="#CCCCCC">
                1185
              </Typography>
            </Grid>
            <Grid mt={2} xs={6} item>
              <Stack alignItems="center" spacing="1px" direction="row">
                <SouthIcon sx={{ color: "#FFA412" }} fontSize="6px" />
                <Typography fontSize={18} color="#FFA412">
                  15
                </Typography>
              </Stack>
            </Grid>
            <Grid mt={2} xs={12} item>
              <div
                style={{
                  margin: "4px 0",
                  height: "2px",
                  background:
                    "repeating-linear-gradient(to right, #666666, #666666 5px, #191919 5px, #191919 10px)",
                }}
              />
            </Grid>
            <Grid mt={2} xs={6} item>
              <Typography fontSize={18} color="#CCCCCC">
                1200
              </Typography>
            </Grid>
            <Grid mt={2} xs={6} item>
              <Stack alignItems="flex-start" spacing="1px" direction="row">
                <NorthIcon color="primary" fontSize="6px" />
                <Typography fontSize={18} color="primary">
                  15
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        <Stack justifyContent="center" p={3} direction="row" spacing={2}>
          <Button
            sx={{
              background: "#795BFF",
              borderRadius: 0,
              color: "#CCCCCC",
            }}
            color="primary"
          >
            Deposit
          </Button>
          <Button
            sx={{ background: "#383838", borderRadius: 0, color: "#CCCCCC" }}
            color="primary"
          >
            Trade
          </Button>
          <Button
            sx={{ background: "#383838", borderRadius: 0, color: "#CCCCCC" }}
            color="primary"
          >
            Sell to BTC
          </Button>
          <Button
            sx={{ background: "#383838", borderRadius: 0, color: "#CCCCCC" }}
            color="primary"
          >
            Sell to USD(T)
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default MyExchange;
