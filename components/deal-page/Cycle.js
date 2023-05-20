import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Card } from "@mui/material";

const Cycle = ({ strategy }) => {
  return (
    <Grid item lg={5.9} md={5.9} sx={{ mb: 2, mx: 0.5 }}>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "24px",
          mt: 4,
          mb: 2,
          ml: 1,
        }}
      >
        Cycle - 1
      </Typography>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "linear-gradient(#3C1D47,#331B36)",
          borderRadius: "8px",
          p: 2,
          gap: 1,
          maxHeight: "600px",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <Typography
                sx={{
                  p: 2,
                  fontWeight: 600,
                }}
              >
                Order
              </Typography>
              {/* <Typography sx={{ py: 0.5, ml: 0.5 }}>
                Order Size {strategy.orderSize} Multiplier{" "}
                {strategy.candleSizeAndVol}% {"    "}OrderType{" "}
                {strategy.orderType}
              </Typography> */}
              <Typography
                sx={{
                  p: 1,
                  mb: 1,
                  fontSize: "14px",
                  background: "#422348",
                  borderRadius: "8px",
                }}
              >
                Order Size: {strategy?.orderSize} Multiplier:{" "}
                {strategy?.candleSizeAndVol}% {"    "}OrderType:{" "}
                {strategy?.orderType}
              </Typography>
              <Typography
                sx={{
                  p: 2,
                  fontWeight: 600,
                }}
              >
                Take Profit
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
                {strategy?.takeProfit === "Fixed" ||
                strategy?.takeProfit === "At candle wick w % up or down"
                  ? `${strategy?.takeProfit}   ${strategy?.takeProfitPercent}%`
                  : `${strategy?.takeProfit}`}
              </Typography>
              <Typography
                sx={{
                  p: 2,
                  fontWeight: 600,
                }}
              >
                Stop Loss
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
                {strategy?.stopLoss === "Fixed"
                  ? `${strategy?.stopLoss}   ${strategy?.stopLossPercent}%`
                  : `${strategy?.stopLoss}`}
              </Typography>
              {/* <Typography
                sx={{
                  p: 1,
                  mb: 1,
                  fontSize: "14px",
                  background: "#422348",
                  borderRadius: "8px",
                }}
              >
                Buy only every 2 Tiggers
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
                Buy Only Below Average Deal Price By 1 %
              </Typography> */}
            </Box>
          </Grid>

          <Grid item xs={6} sx={{ pl: 1 }}>
            <Box>
              <Typography
                sx={{
                  p: 2,
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Trigger Conditions
              </Typography>
              {/* <Typography sx={{ py: 0.5, ml: 0.5 }}>
                Order type Limit
              </Typography> */}
              {strategy?.indicators?.map((item) => {
                return (
                  <Typography
                    sx={{
                      p: 1,
                      mb: 1,
                      fontSize: "14px",
                      background: "#422348",
                      borderRadius: "5px",
                    }}
                  >
                    {item.chooseIndicatorValue === "Vector Candle" &&
                      `${item.chooseIndicatorValue} ${item.candleValue} ${item.timeFrameValue}`}
                    {item.chooseIndicatorValue === "Moving Averages" &&
                      `${item.chooseIndicatorValue} ${item.masCondition} ${item.masValue} ${item.timeFrameValue}`}
                  </Typography>
                );
              })}
              <Typography
                sx={{
                  p: 2,
                  fontWeight: 600,
                }}
              >
                Profit Currency
              </Typography>
              <Typography
                sx={{
                  p: 1,
                  mb: 1,
                  fontSize: "14px",
                  background: "#422348",
                  borderRadius: "5px",
                }}
              >
                {strategy?.strategyPair}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Cycle;
