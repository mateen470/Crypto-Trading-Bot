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
import { Box, Button, Card, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

const DealTable = () => {
  const [sortKey, setSortKey] = useState("item");
  const [sortOrder, setSortOrder] = useState("asc");
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    {
      bot: "AAVE Short Bot",
      pair: "AAVE/BUSD Binance",
      created: "ID:1713064156 Start:Today 9:15:8 AM",
    },
  ];

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = data.sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Card sx={{ mt: 3 }}>
      <table
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
      </table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(to right,#300E3A,#41134D)",
        }}
      >
        <Box
          sx={{
            background: "#4E1F63",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            width: width / 1.5,
            ...(width >= 1200 && {
              width: width / 1.8,
            }),
            ...(width >= 1600 && {
              width: width / 2.2,
            }),
            maxHeight: "40px",
          }}
        >
          <Box sx={{ p: 0, m: 0 }}>
            <Button
              sx={{
                background: "#CC0000",
                textTransform: "none",
                color: "whitesmoke",
                px: 2,
                borderRadius: "8px",
              }}
            >
              Cancel
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 0.5,
            }}
          >
            <Dollar />
            <Typography sx={{ fontSize: "14px" }}>
              Close at Market Price
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 0.5,
            }}
          >
            <ReverseBot />
            <Typography sx={{ fontSize: "14px" }}>Reverse Bot</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 0.5,
            }}
          >
            <EditDeals />
            <Typography sx={{ fontSize: "14px" }}>Edit</Typography>
          </Box>
          <Box>
            <Button
              sx={{
                background: "#13393D",
                textTransform: "none",
                color: "whitesmoke",
                px: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: 0.5,
                borderRadius: "8px",
              }}
            >
              <AddFund />
              Add Funds
            </Button>
          </Box>
          <Box>
            <Button
              sx={{
                background: "#642BCA",
                textTransform: "none",
                color: "whitesmoke",
                px: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: 0.5,
                borderRadius: "8px",
              }}
            >
              <Refresh />
              Refresh
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
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
      </Box>
    </Card>
  );
};

export default DealTable;
