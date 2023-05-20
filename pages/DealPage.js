import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Card, Typography } from "@mui/material";
import Cycle from "../components/deal-page/Cycle";
import DealsStats from "../components/deal-page/DealStats";
import { SmallDown } from "../utils/icons";
import dynamic from "next/dynamic";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });
import Chart from "../components/deal-page/Chart";
import PrivateHeader from "../components/layout/PrivateHeader";
import CryptoRates from "../components/cards/crypto-rates/CryptoRates";
import { useRouter } from "next/router";

const DealPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [strategy, setStrategy] = useState({});

  useEffect(() => {
    fetchStrategy();
  }, []);

  const fetchStrategy = async () => {
    const response = await fetch(`/api/strategy/get-strategy-by-id?id=${id}`, {
      method: "GET",
    });

    const data = await response.json();
    console.log(data.body);
    setStrategy(data.body);
  };

  const Setting = {
    "Bot Name": "Zeus",
    Strategy: "Long",
    "Complated BLocks": "Profit 1 of 4",
    "Take Profit": "2%",
    "Stop Loss": "4%",
    "P & L": "1.5",
  };

  var Stats = 100;
  const USDT = [
    21.0, 20.74, 20.5, 20.0, 14.23, 19.99, 19.5, 19.33, 19.0, 18.5, 18.0, 17.5,
    17.0, 16.8, 16.5, 16.0, 15.5, 15.0, 14.5, 14.0,
  ];
  return (
    <>
      <Box sx={{ my: 4 }}>
        <CryptoRates />
      </Box>
      <Grid container>
        <Grid
          items
          md={8}
          lg={8}
          sx={{
            background:
              "linear-gradient(180deg, rgba(121, 13, 131, 0.0925) 0%, rgba(41, 8, 77, 0.37) 100%)",
            p: 2,
            borderRadius: "8px",
            minHeight: 450,
          }}
        >
          <Grid container>
            <Grid item xs={11}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        lineHeight: "16px",
                        letterSpacing: "1px",
                        p: 1,
                      }}
                    >
                      AVAX/ TetherUS 1h Binance Trading View 020.23 H20.24
                      L19.29 C 20.00 -0.23(-1.14%)
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        lineHeight: "16px",
                        letterSpacing: "1px",
                        p: 1,
                      }}
                    >
                      Zig Zag 5 10 Precent T.. 5 -5 25 85 45 85
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        lineHeight: "16px",
                        letterSpacing: "1px",
                        p: 1,
                      }}
                    >
                      Dashed Dashed 14 Datted 4 Datted 6 Datted 15 Solid 13
                      Solid top_right BTCUSD Dashed London New York, Tokyo,
                      HongKong, Sydney
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      m: 2,
                      px: 1,
                      py: 2,
                      height: "fit-content",
                      background: "linear-gradient(#310B4E, #3D0D58)",
                      backgroundBlendMode: "overlay",
                      backdropFilter: "blur(100px)",
                      borderRadius: "8px",
                      minWidth: "130px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          letterSpacing: "1px",
                          pb: 1,
                        }}
                      >
                        ADR
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          letterSpacing: "1px",
                          pb: 1,
                        }}
                      >
                        1.92 USDT
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          letterSpacing: "1px",
                          pb: 1,
                        }}
                      >
                        ADRXS
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          letterSpacing: "1px",
                          pb: 1,
                        }}
                      >
                        5.76 USDT
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          letterSpacing: "1px",
                          pb: 1,
                        }}
                      >
                        AWR
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          letterSpacing: "1px",
                          pb: 1,
                        }}
                      >
                        6.98 USDT
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          letterSpacing: "1px",
                          pb: 1,
                        }}
                      >
                        AMR
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          letterSpacing: "1px",
                          pb: 1,
                        }}
                      >
                        41.03 USDT
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Chart />
              </Box>
            </Grid>
            <Grid item xs={1} sx={{ pl: 1 }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    pb: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  USDT
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      padding: "0px",
                      margin: "0px 3px",
                      cursor: "pointer",
                    }}
                  >
                    <SmallDown />
                  </button>
                </Typography>
                {USDT.map((item, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: "12px",
                      pb: 1,
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} lg={4} sx={{ pl: 1 }}>
          <Card
            sx={{
              background: "linear-gradient( #44095E, #2B094D)",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                p: 3,
              }}
            >
              General Settings
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#4A0B6D",
                  alignItems: "center",
                  pl: 2,
                  borderRadius: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    p: 3,
                  }}
                >
                  Bot Name
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "auto",
                    p: 3,
                  }}
                >
                  {strategy?.botName}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 2,
                  borderRadius: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    p: 3,
                  }}
                >
                  Strategy
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "auto",
                    p: 3,
                  }}
                >
                  {strategy?.strategyType}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#4A0B6D",
                  alignItems: "center",
                  pl: 2,
                  borderRadius: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    p: 3,
                  }}
                >
                  Completed Orders
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "auto",
                    p: 2,
                  }}
                >
                  {Setting["Complated BLocks"]}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 2,
                  borderRadius: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    p: 3,
                  }}
                >
                  Take Profit
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "auto",
                    p: 3,
                  }}
                >
                  {strategy?.takeProfit === "Fixed"
                    ? `${strategy?.takeProfitPercent}%`
                    : strategy?.takeProfit}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#4A0B6D",
                  alignItems: "center",
                  pl: 2,
                  borderRadius: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    p: 3,
                  }}
                >
                  Stop Loss
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "auto",
                    p: 3,
                  }}
                >
                  {strategy?.stopLoss === "Fixed"
                    ? `${strategy?.stopLossPercent}%`
                    : strategy?.stopLoss}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    p: 3,
                  }}
                >
                  P & L
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginLeft: "auto",
                    p: 3,
                  }}
                >
                  {Setting["P & L"]}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <GaugeChart
                id="gauge-chart1"
                nrOfLevels={1000}
                percent={Setting["P & L"]}
                arcPadding={0}
                cornerRadius={0}
                colors={["#E30D0D", "#009B10"]}
                hideText={true}
                arcWidth={0.1}
                needleColor="rgba(255, 255, 255, 0.38)"
              />
            </Box>
          </Card>
        </Grid>
        <Cycle strategy={strategy} />
        <Grid container>
          <Grid item xs={6}>
            <DealsStats />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
// function dealsPage() {
//   return <PrivateHeader title="Deal Page" current="6" Component={DealPage} />;
// }
// export default dealsPage;

function dealsPage() {
  return (
    <PrivateHeader
      title="Deal Page"
      current="6"
      Component={() => <DealPage />}
    />
  );
}

export default dealsPage;

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   // const baseUrl = process.env.NEXTAUTH_URL;

//   // if (!id) {
//   //   return {
//   //     notFound: true,
//   //   };
//   // }

//   // const response = await fetch(
//   //   `https://fabulous-druid-9cee4e.netlify.app/api/strategy/get-strategy-by-id?id=${id}`,
//   //   {
//   //     method: "GET",
//   //   }
//   // );

//   // const data = await response.json();

//   // if (!data || data.error) {
//   //   return {
//   //     notFound: true,
//   //   };
//   // }

//   return {
//     props: {
//       strategyId: id,
//     },
//   };
// }
