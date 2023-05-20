import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { RateReviewOutlined } from "@mui/icons-material";
import { getSession } from "next-auth/react";

const CryptoCard = ({ title }) => {
  const [walletObj, setWalletObj] = useState([]);
  useEffect(() => {
    fetchLatestWallet();
  }, []);

  const fetchLatestWallet = async () => {
    const { user } = await getSession();
    const response = await fetch(
      `/api/wallet/get-latest-wallet?id=${user.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setWalletObj(data.body?.assets);
  };

  return (
    <Card
      sx={{ minWidth: 100 }}
      style={{ background: "#19191985", borderRadius: "8px", opacity: "0.8" }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
          {title}
        </Typography>

        <Typography color="white" fontSize={14}>
          {`$B-${walletObj
            ?.find((item) => item?.asset === "BTC")
            ?.usdtBal?.toFixed(2)} $E-${walletObj
            ?.find((item) => item?.asset === "ETH")
            ?.usdtBal?.toFixed(2)} $${walletObj
            ?.find((item) => item?.asset === "USDT")
            ?.usdtBal?.toFixed(2)}`}
        </Typography>
        <Typography
          // color={percentage >= 0 ? "#4BD569" : "#EB5757"}
          color={"#4BD569"}
          fontSize={14}
          pt={0.5}
        >
          {`$B-${walletObj
            ?.find((item) => item?.asset === "BTC")
            ?.usdtBal?.toFixed(2)} $E-${walletObj
            ?.find((item) => item?.asset === "ETH")
            ?.usdtBal?.toFixed(2)} $${walletObj
            ?.find((item) => item?.asset === "USDT")
            ?.usdtBal?.toFixed(2)}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;
