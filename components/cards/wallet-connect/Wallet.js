import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CryptoRates from "../crypto-rates/CryptoRates";
import { Btc } from "../../../utils/icons";

const Wallet = () => {
  const walletData = [
    {
      coinName: "Binance",
      coin: Btc,
      available: "0.00",
      lockedBalances: "0.00",
    },
    {
      coinName: "Binance",
      coin: Btc,
      available: "0.00",
      lockedBalances: "0.00",
    },
    {
      coinName: "Binance",
      coin: Btc,
      available: "0.00",
      lockedBalances: "0.00",
    },
  ];

  return (
    <>
      <div style={{ margin: "40px 0px" }}>
        <CryptoRates />
      </div>
      <Grid container spacing={1}>
        {walletData.map((data, index) => (
          <Grid item xs={4} key={index}>
            <Card
              sx={{
                backgroundImage:
                  "url(https://i.postimg.cc/K8q3CHyH/Rectangle-18960.png)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "transparent",
                boxShadow: "none",
                p: "2vw",
              }}
            >
              <CardContent>
                <Typography fontSize={"1.1rem"}>{data.coinName}</Typography>
                <Typography color={"#9F90A2"} fontSize={"0.9rem"}>
                  Assets
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    my: 2,
                    border: "1.5px solid #764080",
                    borderRadius: 1,
                    height: "4rem",
                    pl: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(0.5px)",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <data.coin />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography color={"#9F90A2"}>Available</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography color={"#9F90A2"} fontWeight={600}>
                      {data.available}
                    </Typography>
                    <Typography color={"#5D3FA6"} fontWeight={600}>
                      USDT
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography color={"#9F90A2"}>Locked Balances</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography color={"#9F90A2"} fontWeight={600}>
                      {data.lockedBalances}
                    </Typography>
                    <Typography color={"#5D3FA6"} fontWeight={600}>
                      USDT
                    </Typography>
                  </Box>
                </Box>
                <Button
                  sx={{
                    background: "#C8181A",
                    textTransform: "none",
                    color: "white",
                    float: "right",
                    my: 2,
                    px: 1.5,
                  }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Wallet;
