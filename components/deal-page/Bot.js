import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Arrow from "../../assets/Assets/DownArrow.png";
import Updown from "../../assets/Assets/updown.png";

const Bot = () => {
  return (
    <Grid item lg={3} md={3} sm={6} xs={12}>
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
          Bot
        </Typography>
        <Box sx={{ pl: 0.5, pr: 0.5 }}>
          <img src={Updown} alt="Updown Arrows" style={{ height: "" }} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",

          justifyContent: "space-between",
          p: 1,
        }}
      >
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.21)",
            backgroundBlendMode: "overlay",
            pl: 0.7,
            pr: 0.7,
            borderRadius: "10px",
          }}
        >
          <img src={Arrow} alt="Down Arrow" />
        </Box>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "16px",
            color: "#795BFF",
          }}
        >
          AAVE Short Bot
        </Typography>
      </Box>
    </Grid>
  );
};

export default Bot;
