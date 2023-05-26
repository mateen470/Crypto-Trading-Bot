import { Divider, Grid, Typography, Box } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const DealsProfit = () => {
  return (
    <Card
      sx={{
        mt: 2,
        pt: 3,
        minHeight: "300px",
        boxShadow: "none",
        // background:
        //   "linear-gradient(180deg, rgba(121, 13, 131, 0.125) 0%, rgba(41, 8, 77, 0.5) 100%)",
        background: "#790d832d",
      }}
    >
      <Box sx={{ pl: 2 }}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            fontWeight: "500",
            fontSize: "18px",
            py: 0.5,
          }}
        >
          Completed Deals Profit
        </Typography>
      </Box>
      <Divider sx={{ border: "1px solid rgba(255, 255, 255, 0.3)", mt: 1 }} />
      <Box sx={{ pl: 2, pt:3 }}>
        <Typography>***</Typography>
        <Typography>***</Typography>
      </Box>
    </Card>
  );
};

export default DealsProfit;
