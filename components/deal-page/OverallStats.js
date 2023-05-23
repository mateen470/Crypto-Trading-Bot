import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { Refresh } from "../../utils/icons";
import Card from "@mui/material/Card";

const OverallStats = () => {
  const data = [
    { text: "Today Profit", value: "***" },
    { text: "Total", value: "***" },
    { text: " Active Deals", value: "6" },
    { text: " Funds Locked in DVA Bot Deals", value: " " },
    { text: " UPNL of Active Bot Deals", value: " " },
  ];

  return (
    <Card
      sx={{
        mt: 2,
        pt: 3,
        borderRadius: "5px",
        boxShadow: "none",
        minHeight: "300px",
        // background:
        //   "linear-gradient(180deg, rgba(121, 13, 131, 0.125) 0%, rgba(41, 8, 77, 0.5) 100%)",
        background: "#790d832d",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pl: 2,
          pr: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "18px",
            color: "white",
          }}
        >
          Overall Stats
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            py: 0.5,
            px: 1.5,
            cursor: "pointer",
            borderRadius: "8px",
            background:
              "linear-gradient(97.12deg, #790D83 3.01%, #7A5CFF 92.48%)",
          }}
        >
          <Box
            sx={{
              p: 0.5,
              mr: 0.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              background:
                "linear-gradient(97.12deg, #790D83 3.01%, #7A5CFF 92.48%)",
            }}
          >
            <Refresh />
          </Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "16px",
              color: "white",
            }}
          >
            History
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ border: " 1px solid rgba(255, 255, 255, 0.3)", mt: 1 }} />
      <Box sx={{ p: 2 }}>
        {data.map((item, index) => {
          return (
            <Box
              sx={{ display: "flex", alignItems: "center", pb: 1 }}
              key={index}
            >
              <Typography>
                {item.text} : {item.value}
              </Typography>
              <Box
                sx={{
                  background: "#621E70",
                  backgroundBlendMode: "overlay",
                  borderRadius: "50%",
                  px: 1,
                  ml: 1,
                }}
              >
                <Typography>?</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

export default OverallStats;
