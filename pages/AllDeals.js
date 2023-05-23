import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Stats, Profit, Deals, Balance } from "../utils/icons";
import Filter from "../components/deal-page/Filter";
import OverallStats from "../components/deal-page/OverallStats";
import Balances from "../components/deal-page/Balances";
import DealsProfit from "../components/deal-page/DealsProfit";
import PrivateHeader from "../components/layout/PrivateHeader";
import DealTable from "../components/deal-page/DealTable";

const AllDeals = () => {
  const cardData = [
    {
      image: Stats,
      title: "Overall Stats",
      text: "Dictumst nulla",
      amount: "$25.62",
    },
    {
      image: Profit,
      title: "Average Profit",
      text: "Vestibulum, curabitur",
      amount: "$27.49",
    },
    {
      image: Deals,
      title: "Completed Deals Profit",
      text: " Arcu ut",
      amount: "$36.75",
    },
    {
      image: Balance,
      title: "Balances",
      text: " Pretium non",
      amount: "$29.765",
    },
  ];
  return (
    <Grid container sx={{ mt: 3, mb: 4 }}>
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ mb: 4 }}>
        {cardData.map((item, index) => {
          return (
            <Grid xs={2} sm={2} md={4} lg={3} item key={index}>
              <Box
                sx={{
                  display: "flex",
                  p: 2,
                  pl: 4,
                  justifyContent: "flex-start",
                  height: "150px",
                  alignItems: "center",
                  borderRadius: "5px",
                  // background:
                  //   "linear-gradient( #3E124B, rgba(41, 8, 77, 0.5) )",
                  background: "#790d832d",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#621B7B",
                    backgroundBlendMode: "overlay",
                    p: 1,
                    mr: 1,
                  }}
                >
                  <item.image />
                </Box>
                <Box sx={{ p: 1, width: "fit-content" }}>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "white",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "white",
                    }}
                  >
                    {item.text}
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "17px",
                      color: "#795BFF",
                    }}
                  >
                    {item.amount}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ p: 0, m: 0, minWidth: "100%" }}>
        <Filter />
      </Box>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        rowSpacing={1}
        columnSpacing={1}
      >
        <Grid item md={6} sm={10} xs={10} lg={4}>
          <OverallStats />
        </Grid>
        <Grid item md={6} sm={10} xs={10} lg={4}>
          <DealsProfit />
        </Grid>
        <Grid item md={6} sm={10} xs={10} lg={4}>
          <Balances />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <DealTable />
        </Grid>
      </Grid>
    </Grid>
  );
};
function allDeals() {
  return <PrivateHeader title="All Deals" current="5" Component={AllDeals} />;
}
export default allDeals;
