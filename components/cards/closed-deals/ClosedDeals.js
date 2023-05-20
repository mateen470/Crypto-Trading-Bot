import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { YellowHandShakeBig } from "../../../utils/icons";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";

const ClosedDeals = () => {
  const widthAbove1600 = useSelector((state) => state.dashboardWidth.value);

  const [closedDeals, setClosedDeals] = useState(0);
  const [activeDeals, setActiveDeals] = useState(0);
  useEffect(() => {
    fetchAndSetActiveStrategy();
  }, []);

  const fetchAndSetActiveStrategy = async () => {
    let session = await getSession();
    const response = await fetch(
      `/api/strategy/get-strategy?id=${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    let newCount = 0;
    newData.body.forEach((item) => {
      if (item.dealTime && item.dealTime.length > 0) {
        item.dealTime.forEach((time) => {
          if (time.startTime && time.endTime) {
            newCount++;
          }
        });
      }
    });
    setClosedDeals(newCount);
    const onStrategies = newData.body.filter(
      (strategy) => strategy.state === "on"
    );
    setActiveDeals(onStrategies.length);
  };
  return (
    <Card
      sx={{
        minWidth: 200,
        minHeight: widthAbove1600 < 1600 ? 120 : 120,
        maxHeight: widthAbove1600 < 1600 ? "auto" : 357,
        background: "#2D1537",
        borderRadius: "8px",
      }}
    >
      <CardContent sx={{ pl: 4 }}>
        <Stack alignItems="center" direction="row" spacing={3}>
          <div
            style={{
              backgroundColor: "#482255",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <YellowHandShakeBig />
          </div>
          <Stack spacing={1}>
            <Typography color="#CCCCCC">Closed Deals</Typography>
            <Typography fontSize="24px" fontWeight="600" color="#CCCCCC">
              {closedDeals}
            </Typography>
          </Stack>
        </Stack>
        <Typography mt={3} color="#CCCCCC">
          Active Deals: {activeDeals}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClosedDeals;
