import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import styles from "./CryptoRates.module.css";
const ccxt = require("ccxt");

const binance = new ccxt.binance();
const CryptoRates = () => {
  const symbolBTC = "BTC/USDT";
  const symbolETH = "ETH/USDT";
  const symbolBNB = "BNB/USDT";
  const symbolXRP = "XRP/USDT";
  const symbolLTC = "LTC/USDT";
  const [btcTickerValue, setBtcTickerValue] = React.useState({});
  const [ethTickerValue, setEthTickerValue] = React.useState({});
  const [bnbTickerValue, setBnbTickerValue] = React.useState({});
  const [xrpTickerValue, setXrpTickerValue] = React.useState({});
  const [ltcTickerValue, setLtcTickerValue] = React.useState({});

  React.useEffect(() => {
    const interval = setInterval(() => {
      binance
        .fetchTicker(symbolBTC)
        .then((ticker) => {
          setBtcTickerValue(ticker);
        })
        .catch((error) => {
          console.error(`Error fetching ticker for ${symbolBTC}: ${error}`);
        });

      binance
        .fetchTicker(symbolETH)
        .then((ticker) => {
          setEthTickerValue(ticker);
        })
        .catch((error) => {
          console.error(`Error fetching ticker for ${symbolETH}: ${error}`);
        });

      binance
        .fetchTicker(symbolBNB)
        .then((ticker) => {
          setBnbTickerValue(ticker);
        })
        .catch((error) => {
          console.error(`Error fetching ticker for ${symbolBNB}: ${error}`);
        });

      binance
        .fetchTicker(symbolXRP)
        .then((ticker) => {
          setXrpTickerValue(ticker);
        })
        .catch((error) => {
          console.error(`Error fetching ticker for ${symbolXRP}: ${error}`);
        });

      binance
        .fetchTicker(symbolLTC)
        .then((ticker) => {
          setLtcTickerValue(ticker);
        })
        .catch((error) => {
          console.error(`Error fetching ticker for ${symbolLTC}: ${error}`);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.scrollContainer}>
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", gap: "0.4rem" }}>
        <span style={{ color: "#999999", fontSize: "14px" }}>{symbolBTC}</span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          ${btcTickerValue?.last}{" "}
        </span>
        <span
          style={{
            color: `${btcTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
            fontSize: "14px",
          }}
        >
          {btcTickerValue?.percentage > 0 ? "+" : ""}{" "}
          {btcTickerValue?.percentage}%
        </span>
      </Box>
      <Box sx={{ display: "flex", gap: "0.4rem" }}>
        <span style={{ color: "#999999", fontSize: "14px" }}>{symbolETH}</span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          ${ethTickerValue?.last}{" "}
        </span>
        <span
          style={{
            color: `${ethTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
            fontSize: "14px",
          }}
        >
          {ethTickerValue?.percentage > 0 ? "+" : ""}
          {ethTickerValue?.percentage}%
        </span>
      </Box>
      <Box sx={{ display: "flex", gap: "0.4rem" }}>
        <span style={{ color: "#999999", fontSize: "14px" }}>{symbolBNB}</span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          ${bnbTickerValue?.last}{" "}
        </span>
        <span
          style={{
            color: `${bnbTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
            fontSize: "14px",
          }}
        >
          {bnbTickerValue?.percentage > 0 ? "+" : ""}{" "}
          {bnbTickerValue?.percentage}%
        </span>
      </Box>
      <Box sx={{ display: "flex", gap: "0.4rem" }}>
        <span style={{ color: "#999999", fontSize: "14px" }}>{symbolXRP}</span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          ${xrpTickerValue?.last}{" "}
        </span>
        <span
          style={{
            color: `${xrpTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
            fontSize: "14px",
          }}
        >
          {xrpTickerValue?.percentage > 0 ? "+" : ""}
          {xrpTickerValue?.percentage}%
        </span>
      </Box>
      <Box sx={{ display: "flex", gap: "0.4rem" }}>
        <span style={{ color: "#999999", fontSize: "14px" }}>{symbolLTC}</span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          ${ltcTickerValue?.last}{" "}
        </span>
        <span
          style={{
            color: `${ltcTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
            fontSize: "14px",
          }}
        >
          {ltcTickerValue?.percentage > 0 ? "+" : ""}
          {ltcTickerValue?.percentage}%
        </span>
      </Box>
      
      
    </Box>
    </div>
  );
};

export default CryptoRates;
