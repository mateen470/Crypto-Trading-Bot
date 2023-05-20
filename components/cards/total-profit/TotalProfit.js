import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { TotalProfitYellow } from "../../../utils/icons";
import { useSelector } from "react-redux";

const TotalProfit = (props) => {
  const widthAbove1600 = useSelector((state) => state.dashboardWidth.value);
  return (
    <Card
      sx={{
        minWidth: 400,
        background: "#2D1537",
        borderRadius: "8px",
        minHeight: widthAbove1600 < 1600 ? 165 : 165,
        maxHeight: widthAbove1600 < 1600 ? "auto" : 357,
      }}
    >
      <CardContent>
        <Stack alignItems="center" direction="row" spacing={3}>
          <div
            style={{
              backgroundColor: "#482255",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <TotalProfitYellow />
          </div>
          <Stack spacing={1}>
            <Typography>Total Profit</Typography>
            <Typography fontSize="24px" color="#4BD569">
              {props.profit} $
            </Typography>
          </Stack>
        </Stack>
        {/* <Grid
          mt={2}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>Today Profit :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>Average Profit By Day :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>Yesterday Profit :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>Average Profit By Week :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>This Week Profit :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>Average Profit By Month :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>This Month Profit :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
        </Grid> */}
      </CardContent>
    </Card>
  );
};

export default TotalProfit;
