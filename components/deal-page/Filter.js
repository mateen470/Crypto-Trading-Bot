import { Grid, Typography, Box, Button } from "@mui/material";
import React from "react";
import { Lines, Arrow } from "../../utils/icons";

const Filter = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Grid
        item
        lg={10}
        md={10}
        sm={11}
        xs={11}
        sx={{
          background: "linear-gradient(to right,#532261,#551D70,#48127A)",
          backgroundBlendMode: "overlay",
          borderRadius: "5px",
          px: 3,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "18px",
            color: "#CCCCCC",
          }}
        >
          Filters
        </Typography>
      </Grid>
      <Grid
        item
        lg={1}
        md={1}
        sx={{
          backgroundColor: "#430D7A",
          backgroundBlendMode: "overlay",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "auto",
        }}
      >
        <Button sx={{ textTransform: "none" }}>
          <Typography
            sx={{
              width: "auto",
              fontWeight: "500",
              fontSize: "15px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Lines />
            Clear
          </Typography>
        </Button>
      </Grid>
      <Grid
        item
        lg={0.5}
        md={0.5}
        xs={0.5}
        sx={{
          backgroundColor: "#430D7A",
          backgroundBlendMode: "overlay",
          display: "flex",
          pt: 1,
          justifyContent: "center",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <Box>
          <Arrow />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Filter;
