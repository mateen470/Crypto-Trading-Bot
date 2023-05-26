import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { TotalProfitYellow } from "../../../utils/icons";

const TotalProfit = (props) => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Card
      sx={{
        minWidth: 400,
        background: "#2D1537",
        borderRadius: "8px",
        minHeight: 165,
        maxHeight: width < 1600 ? "auto" : 357,
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
            <Typography fontWeight={500}>Total Profit</Typography>
            <Typography fontSize="24px" color="#4BD569" fontWeight={600}>
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
