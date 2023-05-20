import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";

const DealsStats = () => {
  return (
    <Card
      sx={{
        background: "linear-gradient(#3C1D47,#331B36)",
        borderRadius: "8px",
        p: 2,
        gap: 2,
        mx: 0.5,
        mb: 4,
      }}
    >
      <Typography
        sx={{
          p: 2,
          fontWeight: "600",
          fontSize: "16px",
        }}
      >
        Deal Statistics
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Box>
            <Typography sx={{ py: 0.7, ml: 0.5, fontSize: "13px" }}>
              Price Change Since 1st Buy
            </Typography>
            <Typography
              sx={{
                p: 1,
                mb: 1,
                fontSize: "14px",
                background: "#422348",
                borderRadius: "8px",
              }}
            >
              10%
            </Typography>
            <Typography sx={{ py: 0.5, ml: 0.5 }}>% Of Protfolio</Typography>
            <Typography
              sx={{
                p: 1,
                mb: 1,
                fontSize: "14px",
                background: "#422348",
                borderRadius: "8px",
              }}
            >
              2%
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ pl: 1 }}>
          <Box>
            <Typography sx={{ py: 0.4, ml: 0.5 }}>Hours in Deal</Typography>
            <Typography
              sx={{
                p: 1,
                mb: 1,
                fontSize: "14px",
                background: "#422348",
                borderRadius: "8px",
              }}
            >
              19
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DealsStats;
