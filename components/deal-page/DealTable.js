import { useState } from "react";
import {
  GreenSort,
  Arrow,
  AddFund,
  Hide,
  Message,
  EditDeals,
  ReverseBot,
  Dollar,
  Refresh,
} from "../../utils/icons";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import Circle from "./Circle";
import { useSelector } from "react-redux";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

const DealTable = () => {
  // const [sortKey, setSortKey] = useState("item");
  // const [sortOrder, setSortOrder] = useState("asc");
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const labels = ["Order 1", "Order 2", "Order 3", "Order 4", "Order 5"];
  const data = [
    {
      title: "BTC Vector Candles Bot",
      totalVolume: 6115,
      PnL: 611,
      order: 4,
      price: 18500,
      Volume: "",
    },
    {
      title: "BTC Vector Candles Bot",
      totalVolume: 6115,
      PnL: 611,
      order: 4,
      price: 18500,
      Volume: "",
    },
    {
      title: "BTC Vector Candles Bot",
      totalVolume: 6115,
      PnL: 611,
      order: 4,
      price: 18500,
      Volume: "",
    },
  ];

  const handleButtonClick = (buttonName, cardId) => {
    switch (buttonName) {
      case "Cancel":
        console.log(`Cancel button clicked on card with id ${cardId}`);
        break;
      case "Add Funds":
        console.log(`Add Funds button clicked on card with id ${cardId}`);
        break;
      case "Close At Market Price":
        console.log(
          `Close at Market Price button clicked on card with id ${cardId}`
        );
        break;
      case "Reverse Bot":
        console.log(`Reverse Bot button clicked on card with id ${cardId}`);
        break;
      case "Edit":
        console.log(`Edit button clicked on card with id ${cardId}`);
        break;
      case "Refresh":
        console.log(`Refresh button clicked on card with id ${cardId}`);
        break;
      default:
        console.log(`Unknown button clicked: ${buttonName}`);
    }
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  // const data = [
  //   {
  //     bot: "AAVE Short Bot",
  //     pair: "AAVE/BUSD Binance",
  //     created: "ID:1713064156 Start:Today 9:15:8 AM",
  //   },
  // ];

  // const handleSort = (key) => {
  //   if (key === sortKey) {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortKey(key);
  //     setSortOrder("asc");
  //   }
  // };

  // const sortedData = data.sort((a, b) => {
  //   const valueA = a[sortKey];
  //   const valueB = b[sortKey];
  //   if (valueA < valueB) {
  //     return sortOrder === "asc" ? -1 : 1;
  //   }
  //   if (valueA > valueB) {
  //     return sortOrder === "asc" ? 1 : -1;
  //   }
  //   return 0;
  // });

  return (
    <Grid container spacing={1}>
      {data.map((data, index) => (
        <Grid
          item
          xs={
            width < 1050
              ? 6
              : isDrawerOpen && width < 1600 && width > 1050
              ? 6
              : 4
          }
          key={index}
        >
          <Card
            sx={{
              mt: 3,
              // background: "linear-gradient(#44224E, #3B253C)",
              background: "#790d832d",
            }}
          >
            <Box pt={2} pl={2}>
              <Typography fontSize={"1.1rem"} fontWeight={500}>
                {data.title}
              </Typography>
            </Box>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  mb: 3,
                  mt: 5,
                }}
              >
                {labels.map((label, index) => (
                  <Circle
                    key={index}
                    index={index}
                    total={labels.length}
                    radius={105}
                    label={label}
                  />
                ))}
                <GaugeChart
                  id="gauge-chart1"
                  nrOfLevels={1000}
                  percent={0.4}
                  arcPadding={0}
                  cornerRadius={0}
                  colors={["#E30D0D", "#009B10"]}
                  hideText={true}
                  arcWidth={0.15}
                  needleColor="rgba(255, 255, 255, 0.38)"
                  style={{ margin: "auto" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(2px)",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    pl: 1,
                    pr: 3,
                    py: 0.5,
                  }}
                >
                  <Typography fontSize={"0.8rem"}>
                    Order : {data.order}
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    Price : {data.price}{" "}
                  </Typography>
                  <Typography fontSize={"0.8rem"}>
                    Volume : {data.Volume}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  background: "#543A56",
                  border: "1px solid #6C5570",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
                  px: 2,
                  py: 1,
                  mb: 2,
                }}
              >
                <Typography fontSize={"1rem"}>
                  Total Volume : {data.totalVolume}$
                </Typography>
                <Typography fontSize={"1rem"}>P&L : {data.PnL}$</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  overflowY: "none",
                  width: "100%",
                  pb: 1,
                  px: 1,
                  "&::-webkit-scrollbar": {
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                    margin: "0px 10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#555",
                  },
                }}
              >
                <Box>
                  <Button
                    sx={{
                      background: "#CC0000",
                      textTransform: "none",
                      color: "whitesmoke",
                      boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
                      px: 0,
                      py: 0.6,
                      mr: 0.2,
                      fontSize: "0.8rem",
                      textShadow: "2px 2px 2px  rgba(0,0,0,0.3)",
                      borderRadius: "8px 0px 0px 8px",
                      "&:hover": {
                        backgroundColor: "#cc0000b3",
                      },
                    }}
                    onClick={() => handleButtonClick("Cancel", index)}
                  >
                    Cancel
                  </Button>
                </Box>
                <Box>
                  <Button
                    sx={{
                      background: "#1D8A36",
                      textTransform: "none",
                      color: "whitesmoke",
                      borderRadius: "0px ",
                      textShadow: "2px 2px 2px  rgba(0,0,0,0.3)",
                      boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
                      px: 0.5,
                      py: 0.8,
                      mr: 0.2,
                      fontSize: "0.8rem",
                      "&:hover": {
                        background: "#1d8a36bd",
                      },
                    }}
                    onClick={() => handleButtonClick("Add Funds", index)}
                  >
                    <AddFund style={{ marginRight: "3px" }} />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontSize={"0.8rem"} pr={0.5}>
                        Add
                      </Typography>
                      <Typography fontSize={"0.8rem"}>Funds</Typography>
                    </Box>
                  </Button>
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(#6A477D,#692E75)",
                      boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
                      textTransform: "none",
                      color: "whitesmoke",
                      borderRadius: "0px ",
                      height: "2rem",
                      width: "90px",
                      cursor: "pointer",
                      mr: 0.2,
                      textShadow: "2px 2px 2px  rgba(0,0,0,0.3)",
                      "&:hover": {
                        background: "linear-gradient(#6a477db4,#692e75aa)",
                      },
                    }}
                    onClick={() =>
                      handleButtonClick("Close At Market Price", index)
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontSize={"0.8rem"} mb={-0.8}>
                        Close at
                      </Typography>
                      <Typography fontSize={"0.8rem"}>Market Price</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Button
                    sx={{
                      background: "linear-gradient(#6A477D,#692E75)",
                      boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
                      textTransform: "none",
                      color: "whitesmoke",
                      borderRadius: "0px ",
                      textShadow: "2px 2px 2px  rgba(0,0,0,0.3)",
                      px: 0.5,
                      py: 0,
                      mr: 0.2,
                      "&:hover": {
                        background: "linear-gradient(#6a477db4,#692e75aa)",
                      },
                    }}
                    onClick={() => handleButtonClick("Reverse Bot", index)}
                  >
                    <ReverseBot style={{ marginRight: "5px" }} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography fontSize={"0.8rem"} mb={-0.4}>
                        Reverse
                      </Typography>
                      <Typography fontSize={"0.8rem"} mt={-0.4}>
                        Bot
                      </Typography>
                    </Box>
                  </Button>
                </Box>
                <Box>
                  <Button
                    sx={{
                      background: "linear-gradient(#6A477D,#692E75)",
                      boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
                      textTransform: "none",
                      color: "whitesmoke",
                      color: "whitesmoke",
                      borderRadius: "0px ",
                      textShadow: "2px 2px 2px  rgba(0,0,0,0.3)",
                      px: 0,
                      py: 0.6,
                      mr: 0.2,
                      fontSize: "0.8rem",
                      "&:hover": {
                        background: "linear-gradient(#6a477db4,#692e75aa)",
                      },
                    }}
                    onClick={() => handleButtonClick("Edit", index)}
                  >
                    <EditDeals style={{ marginRight: "3px" }} />
                    Edit
                  </Button>
                </Box>
                <Box>
                  <Button
                    sx={{
                      background:
                        "linear-gradient( to left,#790D83 , #7A5CFF )",
                      textTransform: "none",
                      boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
                      color: "whitesmoke",
                      borderRadius: "0px 8px 8px 0px ",
                      textShadow: "2px 2px 2px  rgba(0,0,0,0.3)",
                      pr: 0.5,
                      pl: 0,
                      py: 0.6,
                      mr: 0.2,
                      fontSize: "0.8rem",
                      "&:hover": {
                        background:
                          "linear-gradient( to left,#790D83 , #7A5CFF )",
                        opacity: 0.85,
                      },
                    }}
                    onClick={() => handleButtonClick("Refresh", index)}
                  >
                    <Refresh />
                    Refresh
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DealTable;

{
  /* <table
        style={{
          borderCollapse: "collapse",
          minWidth: "100%",
          background: "pink",
          background: "#341237",
          border: "none",
          borderRadius: "5px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                cursor: "pointer",
                padding: "20px",
                textAlign: "center",
              }}
              onClick={() => handleSort("bot")}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  fontSize: "14px",
                }}
              >
                Bot
                <GreenSort />
              </Typography>
            </th>
            <th
              style={{
                cursor: "pointer",
                padding: "20px",
                textAlign: "center",
              }}
              onClick={() => handleSort("pair")}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  fontSize: "14px",
                }}
              >
                Pair <GreenSort />
              </Typography>
            </th>
            <th
              style={{
                cursor: "pointer",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  fontSize: "14px",
                }}
              >
                Profit <GreenSort />
              </Typography>
            </th>
            <th
              style={{
                cursor: "pointer",
                padding: "20px",
                textAlign: "center",
              }}
              onClick={() => handleSort("created")}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  fontSize: "14px",
                }}
              >
                Created <GreenSort />
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => {
            const pairParts = item.pair.split(" ");
            const pairs = pairParts.join("\n");
            const createdPairs = item.created.split(" ");
            const created = createdPairs.join("\n");
            return (
              <>
                <tr
                  key={index}
                  style={{
                    background: "linear-gradient(to right,#300E3A,#41134D)",
                  }}
                >
                  <td
                    style={{
                      paddingTop: "1rem",
                      height: "150px",
                      paddingBottom: "50px",
                      width: "220px",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          background: "#512456",
                          cursor: "pointer",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "2px",
                          margin: "15px",
                        }}
                      >
                        <Arrow />
                      </Box>
                      <Typography sx={{ color: "#795BFF" }}>
                        {item.bot}
                      </Typography>
                    </Box>
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      whiteSpace: "pre-wrap",
                      height: "150px",
                      paddingBottom: "30px",
                      width: "220px",
                      textAlign: "center",
                    }}
                  >
                    {pairs}
                  </td>
                  <td
                    style={{
                      width: "50%",
                      textAlign: "center",
                    }}
                  >
                    <Box sx={{ margin: "auto", width: "60%" }}>
                      <GaugeChart
                        id="gauge-chart1"
                        nrOfLevels={1000}
                        percent={0.4}
                        arcPadding={0}
                        cornerRadius={0}
                        colors={["#E30D0D", "#009B10"]}
                        hideText={true}
                        arcWidth={0.1}
                        needleColor="rgba(255, 255, 255, 0.38)"
                      />
                    </Box>
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      whiteSpace: "pre-wrap",
                      height: "150px",
                      width: "160px",
                      textAlign: "center",
                    }}
                  >
                    {created}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table> */
}
{
  /* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          py: 2,
          background: "linear-gradient(to right,#300E3A,#41134D)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            pl: 2,
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(97.12deg, #790D83 3.01%, #7A5CFF 92.48%)",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 0.5,
              py: 0.5,
            }}
          >
            <Message />
          </Box>
          <Typography>You can place a note here</Typography>
        </Box>
        <Box sx={{ pl: 5, cursor: "pointer" }}>
          <Hide />
        </Box>
      </Box> */
}
