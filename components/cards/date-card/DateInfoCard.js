import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";

function DateInfoCard({ date, profit }) {
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Card
      sx={{
        width: "70px",
        height: "70px",
        ...(width >= 1530 && {
          width: "60px",
          height: "70px",
        }),
        ...(width >= 1650 && {
          width: "70px",
          height: "70px",
        }),
        background: "linear-gradient(#410853, #470A65)",
        boxShadow: "none",
        borderRadius: "10px",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
          {date}
        </Typography>
        {profit >= 0 ? (
          <Typography color="#4BD569">+{profit}</Typography>
        ) : (
          <Typography color="#EB5757">-{profit}</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default DateInfoCard;
