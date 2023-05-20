import PrivateHeader from "../components/layout/PrivateHeader";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Grid from "@mui/material/Grid";
import DescriptionCard from "../components/cards/bot-config-cards/DescriptionCard";
import {
  AverageTimeSignalIcon,
  DealsCompletedIcon,
  MaxDealIcon,
  MaxDropIcon,
  TotalProfitBarIcon,
  TradingBotsIcon,
} from "../utils/icons";
import SummaryProfit from "../components/charts/SummaryProfit";
import ProfitByDay from "../components/charts/ProfitByDay";
import ProfitCalendar from "../components/calendar/ProfitCalendar";
import EditBlock from "../components/cards/edit-block/EditBlock";
import GeneralSettings from "../components/cards/general-settings/GeneralSettings";
import Strategy from "../components/cards/strategy/Strategy";
import CryptoRates from "../components/cards/crypto-rates/CryptoRates";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

const BotConfigEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  const [profitCards, setProfitCards] = useState([]);

  useEffect(() => {
    fetchOrdersAndStrategy();
  }, []);

  const fetchOrdersAndStrategy = async () => {
    const orderResponse = await fetch(
      `/api/order/get-order-by-strategy?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const orderData = await orderResponse.json();

    console.log(orderData.body);

    let totalProfit = 0;
    orderData.body.forEach((item) => {
      if (!isNaN(item.totalProfit)) {
        totalProfit += item.totalProfit;
      }
    });

    console.log(totalProfit, totalProfit / orderData.body.length);

    const strategyResponse = await fetch(
      `/api/strategy/get-strategy-by-id?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const strategyData = await strategyResponse.json();

    let timeArray = [];
    let totalTime = 0;
    let maxTime = 0;
    let formattedTotalTime = 0;
    let avgTime = 0;
    if (strategyData.body) {
      strategyData.body?.dealTime.forEach((item) => {
        if (item.endTime === "") {
          return; // Skip the object with empty endTime
        }

        const startTime = new Date(item.startTime);
        const endTime = new Date(item.endTime);
        const duration = endTime - startTime;

        if (!isNaN(duration)) {
          timeArray.push(duration);
          totalTime += duration;
        }
      });

      maxTime = convertTime(Math.max(...timeArray));
      formattedTotalTime = convertTime(totalTime);
      avgTime = convertTime(totalTime / timeArray.length);
    }

    const profitCards = [
      {
        title: "Total Profit",
        icon: <TotalProfitBarIcon />,
        data: `$ ${totalProfit}`,
      },
      {
        title: "Deals Completed",
        icon: <DealsCompletedIcon />,
        data: timeArray.length > 0 ? timeArray.length : 0,
      },
      {
        title: "Max. Drop in Deal",
        icon: <MaxDropIcon />,
        data: "$0",
      },
      { title: "Max. Deal Time", icon: <MaxDealIcon />, data: maxTime },
      {
        title: "Avg. Deal Time",
        icon: <MaxDealIcon />,
        data: `${avgTime}`,
      },
      {
        title: "Avg. Profit",
        icon: <TotalProfitBarIcon />,
        data: `$ ${totalProfit / orderData?.body?.length}`,
      },
      {
        title: "Avg. Time Between Signals",
        icon: <AverageTimeSignalIcon />,
        data: "0",
      },
      {
        title: "Total Time",
        icon: <AverageTimeSignalIcon />,
        data: formattedTotalTime,
      },
    ];
    setProfitCards(profitCards);
  };

  const convertTime = (time) => {
    // Convert milliseconds to hours and minutes
    const totalHours = Math.floor(time / 3600000);
    const totalMinutes = Math.floor((time % 3600000) / 60000);

    // Format the result as "hours:minutes Hour"
    const formattedTime = `${totalHours}:${
      totalMinutes < 10 ? "0" : ""
    }${totalMinutes} Hour`;
    return formattedTime;
  };

  // const profitCards = [
  //   { title: "Total Profit", icon: <TotalProfitBarIcon />, data: totalProfit },
  //   {
  //     title: "Deals Completed",
  //     icon: <DealsCompletedIcon />,
  //     data: "$25.62",
  //   },
  //   {
  //     title: "Max. Drop in Deal",
  //     icon: <MaxDropIcon />,
  //     data: "$0",
  //   },
  //   { title: "Max. Deal Time", icon: <MaxDealIcon />, data: "1:30 Hour" },
  //   {
  //     title: "Avg. Deal Time",
  //     icon: <MaxDealIcon />,
  //     data: "1:30 Hour",
  //   },
  //   {
  //     title: "Avg. Profit",
  //     icon: <TotalProfitBarIcon />,
  //     data: totalProfit / orderData?.body?.length,
  //   },
  //   {
  //     title: "Avg. Time Between Signals",
  //     icon: <AverageTimeSignalIcon />,
  //     data: "0",
  //   },
  //   {
  //     title: "Total Time",
  //     icon: <AverageTimeSignalIcon />,
  //     data: "1:30 Hour",
  //   },
  // ];

  console.log(id);
  return (
    <>
      <div style={{ margin: "40px 0px" }}>
        <CryptoRates />
      </div>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {profitCards.map((item, index) => {
          return (
            <Grid xs={2} sm={2} md={4} lg={3} item key={index}>
              <DescriptionCard
                title={item?.title}
                icon={item?.icon}
                data={item?.data}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid sx={{ mt: 2 }} container rowSpacing={3} columnSpacing={3}>
        <Grid xs={12} md={6} xl={4} item>
          <SummaryProfit />
        </Grid>
        <Grid xs={12} md={6} xl={4} item>
          <ProfitByDay />
        </Grid>
        {/* <Grid xs={12} md={6} xl={4} item>
          <ProfitCalendar />
        </Grid> */}
      </Grid>
      {/* <GeneralSettings />
      <Strategy /> */}
      <Grid container>
        <Grid item xs={12}>
          <EditBlock />
        </Grid>
      </Grid>
    </>
  );
};

export default function BotConfigEditPage() {
  return (
    <>
      <PrivateHeader
        current="4"
        Component={BotConfigEdit}
        title="Update Bot Detail"
      />
    </>
  );
}
