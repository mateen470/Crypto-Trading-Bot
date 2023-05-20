import PrivateHeader from "../components/layout/PrivateHeader";
import React from "react";
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
import AddBlock from "../components/cards/add-block/AddBlock";
import GeneralSettings from "../components/cards/general-settings/GeneralSettings";
import Strategy from "../components/cards/strategy/Strategy";
import CryptoRates from "../components/cards/crypto-rates/CryptoRates";

const profitCards = [
  { title: "Total Profit", icon: <TotalProfitBarIcon />, data: "$0" },
  {
    title: "Deals Completed",
    icon: <DealsCompletedIcon />,
    data: "$0",
  },
  {
    title: "Max. Drop in Deal",
    icon: <MaxDropIcon />,
    data: "$0",
  },
  { title: "Max. Deal Time", icon: <MaxDealIcon />, data: "0 Hour" },
  {
    title: "Avg. Deal Time",
    icon: <MaxDealIcon />,
    data: "0 Hour",
  },
  {
    title: "Avg. Profit",
    icon: <TotalProfitBarIcon />,
    data: "$0",
  },
  {
    title: "Avg. Time Between Signals",
    icon: <AverageTimeSignalIcon />,
    data: "0 Hour",
  },
  {
    title: "Total Time",
    icon: <AverageTimeSignalIcon />,
    data: "0 Hour",
  },
];

const BotConfig = () => {
  var formRef = useRef(null);

  const handleClick = () => {
    const form = formRef.current;
    console.log(form);
    if (form) {
      form.submit();
    }
    // formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
    // formRef.current.submit();
  };
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
                title={item.title}
                icon={item.icon}
                data={item.data}
              />
            </Grid>
          );
        })}
      </Grid>
      {/* <Grid sx={{ mt: 2 }} container rowSpacing={3} columnSpacing={3}>
        <Grid xs={12} md={6} xl={4} item>
          <SummaryProfit />
        </Grid>
        <Grid xs={12} md={6} xl={4} item>
          <ProfitByDay />
        </Grid>
        <Grid xs={12} md={6} xl={4} item>
          <ProfitCalendar />
        </Grid>
      </Grid> */}
      {/* <GeneralSettings />
      <Strategy /> */}
      <Grid container>
        <Grid item xs={12}>
          <AddBlock formRef={formRef} />
        </Grid>
      </Grid>
    </>
  );
};

export default function BotConfigPage() {
  return (
    <>
      <PrivateHeader
        current="4"
        Component={BotConfig}
        title="Bot Configuration"
      />
    </>
  );
}
