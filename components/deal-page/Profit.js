import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import Updown from "../../assets/Assets/updown.png";
import dynamic from "next/dynamic";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });
const Profit = () => {
  return (
    <Grid item lg={4} md={4} sm={6} xs={12}>
      <Box
        sx={{
          pt: 2,
          pb: 2,
          display: "flex",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, rgba(121, 13, 131, 0.125) 0%, rgba(41, 8, 77, 0.5) 100%)",
          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "14px",
            color: "white",
          }}
        >
          Profit
        </Typography>
        <Box sx={{ pl: 0.5, pr: 0.5 }}>
          <img src={Updown} alt="Updown Arrows" style={{ height: "" }} />
        </Box>
      </Box>
      <Box sx={{ margin: "auto", width: "50%" }}>
        <GaugeChart
          id="gauge-chart1"
          nrOfLevels={1000}
          percent={0.4}
          arcPadding={0}
          cornerRadius={0}
          colors={["#E30D0D", "#009B10"]}
          hideText={true}
          arcWidth={0.1}
          needleColor="rgba(255, 255, 255, 0.38)"
        />
      </Box>
    </Grid>
  );
};

export default Profit;
