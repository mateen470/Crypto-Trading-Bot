import React, { useEffect, useState } from "react";
import SelectInput from "../../widgets/SelectInput";

import { alpha, styled } from "@mui/material/styles";
import { InputBase, InputAdornment } from "@mui/material";
import { SmallDown } from "../../../utils/icons";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import GeneralSettings from "../../../components/cards/general-settings/GeneralSettings";
import { getSession } from "next-auth/react";
import Chart from "../../deal-page/Chart";
import Indicators from "../indicators/Indicators";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    height: 20,
    backgroundColor: "#452951",
    borderRadius: "8px",
    fontSize: 16,
    padding: "8px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const orderTypeOptions = ["Market", "Limit"];

const avgPriceCondition = ["Above", "Below"];
const stopLoss = ["Fixed", "At candle body w % up or down", "Trailing SL"];
const takeProfit = [
  "Fixed",
  "At candle body",
  "At candle wick w % up or down",
  "Trailing TP",
];

const AddBlock = () => {
  const [count, setCount] = useState(1);

  const [botName, setBotName] = useState("");
  const [exchange, setExchange] = useState("");
  const [botType, setBotType] = useState("");
  const [strategyType, setStrategyType] = useState("");
  const [strategyPair, setStrategyPair] = useState("");

  const setBotSetting = async (values) => {
    let reqBody = {
      ...values,
      botName,
      exchange,
      botType,
      strategyType,
      strategyPair,
    };
    console.log("req", reqBody);

    const response = await fetch("/api/user/create-strategy", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newData = await response.json();
    console.log(newData);
  };

  const handleCount = () => {
    setCount(count + 1);
    console.log(count);
  };

  return (
    <Box
      sx={{
        mt: 5,
      }}
      component="main"
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontWeight: 600, fontSize: "30px" }}>
          Cycle 1
        </Typography>
        <Button
          onClick={handleCount}
          sx={{
            color: "white",
            mx: 2,
            background: "linear-gradient(to right,#790F87,#794AE3)",
            textTransform: "none",
          }}
        >
          <Typography sx={{ fontWeight: 600, px: 2, fontSize: "12px" }}>
            Add Cycle
          </Typography>
        </Button>
      </Box>

      <AddBlockComponent setBotSettings={setBotSetting} />
    </Box>
  );
};

export default AddBlock;

const AddBlockComponent = (props) => {
  const [maPercentage, setMaPercentage] = useState("");
  const [dynamicPercentage, setDynamicPercentage] = useState("");
  const [error, setError] = useState(false);

  const [showTPPercentageTab, setShowTPPercentageTab] = useState(false);
  const [showSLPercentageTab, setShowSLPercentageTab] = useState(false);

  const [botName, setBotName] = useState("");
  const [exchange, setExchange] = useState("");
  const [botType, setBotType] = useState("");
  const [strategyType, setStrategyType] = useState("");
  const [strategyPair, setStrategyPair] = useState("");

  const [orderType, setOrderType] = useState("");
  const [baseOrderSize, setBaseOrderSize] = useState("");
  const [safetyOrderMul, setSafetyOrderMul] = useState("");
  const [safetyOrder, setSafetyOrder] = useState("");
  const [maxOrder, setMaxOrder] = useState("");
  const [maxOrderPercent, setMaxOrderPercent] = useState("");
  const [maxVol, setMaxVol] = useState("");
  const [maxVolPercent, setMaxVolPercent] = useState("");

  const [indicatorArray, setIndicatorArray] = useState([]);

  const [takeProfitValue, setTakeProfitValue] = useState("");
  const [takeProfitPercent, setTakeProfitPercent] = useState("");

  const [stopLossValue, setStopLossValue] = useState("");
  const [stopLossPercent, setStopLossPercent] = useState("");

  const [buyOnCondition, setBuyOnCondition] = useState("");
  const [buyOnConditionX, setBuyOnConditionX] = useState("");
  const [avgPrice, setAvgPrice] = useState("");
  const [avgPricePercent, setAvgPricePercent] = useState("");
  const [ignoreCondition, setIgnoreCondition] = useState("");
  const [ignoreConditionX, setIgnoreConditionX] = useState("");

  const [exchangeOptions, setExchangeOptions] = useState([]);

  useEffect(() => {
    fetchUserAndSetExchanges();
  }, []);

  const fetchUserAndSetExchanges = async () => {
    let session = await getSession();
    const response = await fetch(
      `/api/user/get-user-info?id=${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    console.log(newData);
    setExchangeOptions(newData?.body?.exchanges);
  };

  const handleChangeMaPercentage = (event) => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setAvgPricePercent(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleChangeTakeProfitPercent = (event) => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setTakeProfitPercent(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleChangeStopLossPercent = (event) => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setStopLossPercent(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleChangeXcondition = () => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setBuyOnConditionX(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
    console.log("happy");
  };
  const handleChangeFirstXcondition = () => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setIgnoreConditionX(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
    console.log("happy");
  };

  const handleOnChange = async (event) => {
    if (
      event.target.value === "Fixed" ||
      event.target.value === "At candle wick w % up or down"
    ) {
      setShowTPPercentageTab(true);
    } else {
      setShowTPPercentageTab(false);
      setTakeProfitPercent("");
    }
    setTakeProfitValue(event.target.value);
  };

  const handleStopLossOnChange = async (event) => {
    if (event.target.value === "Fixed") {
      setShowSLPercentageTab(true);
    } else {
      setShowSLPercentageTab(false);
      setStopLossPercent("");
    }
    setStopLossValue(event.target.value);
  };

  const handleMaxVolume = () => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setMaxVolPercent(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
    console.log("handleMaxVolume");
  };
  const handleMaxOrder = () => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setMaxOrderPercent(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
    console.log("handleMaxOrder");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let session = await getSession();
    let formData = {
      orderSize: data.get("orderSize"),
      availablePercentage: data.get("availablePercentage"),
      safetyOrderSize: data.get("safetyOrderSize"),
      candleSizeAndVol: data.get("candleSizeAndVol"),
      orderType: data.get("orderType"),
      profitCurrency: data.get("profitCurrency"),
      indicator: data.get("indicator"),

      indicatorValues: {
        redAction: data.get("redAction"),
        purpleAction: data.get("purpleAction"),
        blueAction: data.get("blueAction"),
        greenAction: data.get("greenAction"),
        minimumTp: data.get("minimumTp"),
      },

      buyOnCondition: data.get("buyOnCondition"),
      avgPrice: data.get("avgPrice"),
      avgPricePercent: data.get("avgPricePercent"),
      ignoreCondition: data.get("ignoreCondition"),
      maxOrders: data.get("maxOrders"),
      maxVol: data.get("maxVol"),
      stopLoss: data.get("stopLoss"),
      takeProfit: data.get("takeProfit"),
      takeProfitPercent: data.get("takeProfitPercent"),
      userId: session.user.id,
    };

    console.log(formData);

    props.setBotSettings(formData);
  };

  const handleTestStrategy = async () => {
    if (
      botName === "" ||
      exchange === "" ||
      botType === "" ||
      strategyType === "" ||
      strategyPair === ""
    ) {
      alert("Please Fill out the General Settings Section");
    } else if (orderType === "" || baseOrderSize === "") {
      alert("Please Fill out the required fields in Orders Section");
    } else if (
      indicatorArray.length === 0 ||
      indicatorArray[0]?.chooseIndicatorValue === "" ||
      indicatorArray[0]?.timeFrameValue === ""
    ) {
      alert("Please Fill out the required fields in Indicators Section");
    } else {
      let session = await getSession();
      const body = {
        botName,
        exchange,
        botType,
        strategyType,
        strategyPair,
        orderSize: baseOrderSize,
        // availablePercentage,
        safetyOrderSize: safetyOrder,
        candleSizeAndVol: safetyOrderMul,
        orderType,
        indicators: indicatorArray,
        buyOnCondition,
        buyOnConditionPercent: buyOnConditionX,
        avgPrice,
        avgPricePercent,
        ignoreCondition,
        ignoreConditionPercent: ignoreConditionX,
        maxOrders: maxOrder,
        maxOrderPercent,
        maxVol,
        maxVolPercent,
        stopLoss: stopLossValue,
        stopLossPercent,
        takeProfit: takeProfitValue,
        takeProfitPercent,
        logs: "",
        state: "off",
        userId: session.user.id,
      };
      console.log(body);
      const response = await fetch("/api/user/create-strategy", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newData = await response.json();
      console.log(newData);
      alert("Saved");
    }
  };

  const handlebacktest = async ()=> {
    if (
      botName === "" ||
      exchange === "" ||
      botType === "" ||
      strategyType === "" ||
      strategyPair === ""
    ) {
      alert("Please Fill out the General Settings Section");
    } else if (orderType === "" || baseOrderSize === "") {
      alert("Please Fill out the required fields in Orders Section");
    } else if (
      indicatorArray.length === 0 ||
      indicatorArray[0]?.chooseIndicatorValue === "" ||
      indicatorArray[0]?.timeFrameValue === ""
    ) {
      alert("Please Fill out the required fields in Indicators Section");
    } else {
      let session = await getSession();
      const body = {
        botName,
        exchange,
        botType,
        strategyType,
        strategyPair,
        orderSize: baseOrderSize,
        // availablePercentage,
        safetyOrderSize: safetyOrder,
        candleSizeAndVol: safetyOrderMul,
        orderType,
        indicators: indicatorArray,
        buyOnCondition,
        buyOnConditionPercent: buyOnConditionX,
        avgPrice,
        avgPricePercent,
        ignoreCondition,
        ignoreConditionPercent: ignoreConditionX,
        maxOrders: maxOrder,
        maxOrderPercent,
        maxVol,
        maxVolPercent,
        stopLoss: stopLossValue,
        stopLossPercent,
        takeProfit: takeProfitValue,
        takeProfitPercent,
        logs: "",
        state: "off",
        userId: session.user.id,
      };
      console.log(body);
      const response = await fetch("/api/user/create-strategy", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newData = await response.json();
      console.log(newData);
      console.log(newData['body']['_id'])
      alert("Saved");
      try {
        const response = await fetch("https://dcabot1.herokuapp.com/backtest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // If you need to send a JSON body, uncomment the following line and replace '{}' with the appropriate JSON object
          body: JSON.stringify({ strategyId: newData['body']['_id'] }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data);
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  console.log(indicatorArray);
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [activeTab, setActiveTab] = useState("general");
  const USDT = [
    21.0, 20.74, 20.5, 20.0, 14.23, 19.99, 19.5, 19.33, 19.0, 18.5, 18.0, 17.5,
    17.0, 16.8, 16.5, 16.0, 15.5, 15.0, 14.5, 14.0,
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box>
      <Box>
        <Box
          sx={{
            background: "linear-gradient(to right,#3E2146,#371655)",
            mt: 2,
            borderRadius: "5px",
            p: 3,
            marginBottom: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "40px",
              mb: 4,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontSize: "16px",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                whiteSpace: "nowrap",
                cursor: "pointer",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                background:
                  activeTab === "general"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("general")}
            >
              General Settings
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                cursor: "pointer",
                whiteSpace: "nowrap",
                background:
                  activeTab === "orders"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("orders")}
            >
              Orders
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                cursor: "pointer",
                whiteSpace: "nowrap",
                background:
                  activeTab === "indicators"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("indicators")}
            >
              Indicators
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                cursor: "pointer",
                whiteSpace: "nowrap",
                background:
                  activeTab === "take-profit"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("take-profit")}
            >
              Take Profit
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                cursor: "pointer",
                whiteSpace: "nowrap",
                background:
                  activeTab === "stop-loss"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("stop-loss")}
            >
              Stop Loss
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "white",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                cursor: "pointer",
                whiteSpace: "nowrap",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                background:
                  activeTab === "advanced"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("advanced")}
            >
              Advanced Settings
            </Typography>
          </Box>
          {activeTab === "general" && (
            <GeneralSettings
              botName={botName}
              setBotName={setBotName}
              exchangeName={exchange}
              setExchangeName={setExchange}
              botType={botType}
              setBotType={setBotType}
              strategyType={strategyType}
              setStrategyType={setStrategyType}
              strategyPair={strategyPair}
              setStrategyPair={setStrategyPair}
              exchangeOptions={exchangeOptions}
            />
          )}
          {activeTab === "orders" && (
            <>
              <Typography
                sx={{ mt: 1, fontWeight: 600 }}
                color="white"
                component="h1"
                variant="h5"
              >
                Order
              </Typography>
              <Divider
                variant="fullWidth"
                sx={{
                  marginX: -3,
                  marginTop: 1,
                  background: "#7A8580",
                }}
              />
              <Box sx={{ mt: 1, flexGrow: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={2.25}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 14, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Order Type
                    </Typography>
                    <SelectInput
                      placeHolder={"Order Type"}
                      options={orderTypeOptions}
                      keyName={"orderType"}
                      fullWidth
                      value={orderType}
                      onChange={async (event) => {
                        setOrderType(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2.25}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 14, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Base order size
                    </Typography>
                    <ValidationTextField
                      type="number"
                      margin="normal"
                      required
                      fullWidth
                      id="orderSize"
                      name="orderSize"
                      value={baseOrderSize}
                      sx={{
                        ...(width <= 1050 && {
                          pl: 1,
                        }),
                      }}
                      onChange={async (event) => {
                        setBaseOrderSize(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2.25}>
                    <Typography
                      sx={{
                        marginBottom: 1,
                        mt: 2,
                        fontSize: 14,
                      }}
                      color="#CCCCCC"
                    >
                      Safety order multiplier
                    </Typography>
                    <ValidationTextField
                      margin="normal"
                      fullWidth
                      id="candleSizeAndVol"
                      name="candleSizeAndVol"
                      value={safetyOrderMul}
                      onChange={async (event) => {
                        setSafetyOrderMul(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2.25}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 14, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Safety order size
                    </Typography>
                    <ValidationTextField
                      margin="normal"
                      fullWidth
                      id="safetyOrderSize"
                      name="safetyOrderSize"
                      value={safetyOrder}
                      onChange={async (event) => {
                        setSafetyOrder(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{ marginBottom: 1, mt: 2, fontSize: 14 }}
                        color="#CCCCCC"
                      >
                        Max orders
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          background: "#452951",
                          borderRadius: "8px",
                        }}
                      >
                        <ValidationTextField
                          margin="normal"
                          fullWidth
                          id="maxOrder"
                          name="maxOrder"
                          value={maxOrder}
                          onChange={async (event) => {
                            setMaxOrder(event.target.value);
                          }}
                        />{" "}
                        {/* <InputBase
                          name="maxOrder"
                          value={maxOrderPercent}
                          onChange={handleMaxOrder}
                          type="number"
                          sx={{
                            paddingLeft: 2,
                            paddingRight: 2,
                            borderRadius: "8px",
                            height: 37,
                            width: 90,
                            backgroundColor: "#6D4873",
                            color: "#CCCCCC",
                          }}
                          endAdornment={
                            <InputAdornment position="center">%</InputAdornment>
                          }
                          inputProps={{ min: "0", max: "100" }}
                          error={error}
                          helperText={
                            error
                              ? "Please enter a number between 0 and 100"
                              : ""
                          }
                        /> */}
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ marginBottom: 1, mt: 2, fontSize: 14 }}
                        color="#CCCCCC"
                      >
                        Max volume
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          background: "#452951",
                          borderRadius: "8px",
                        }}
                      >
                        <ValidationTextField
                          margin="normal"
                          fullWidth
                          id="maxVolume"
                          name="maxVolume"
                          value={maxVol}
                          onChange={async (event) => {
                            setMaxVol(event.target.value);
                          }}
                        />{" "}
                        {/* <InputBase
                          name="maxVolume"
                          value={maxVolPercent}
                          onChange={handleMaxVolume}
                          type="number"
                          sx={{
                            paddingLeft: 2,
                            paddingRight: 2,
                            borderRadius: "8px",
                            height: 37,
                            width: 90,
                            backgroundColor: "#6D4873",
                            color: "#CCCCCC",
                          }}
                          endAdornment={
                            <InputAdornment position="center">%</InputAdornment>
                          }
                          inputProps={{ min: "0", max: "100" }}
                          error={error}
                          helperText={
                            error
                              ? "Please enter a number between 0 and 100"
                              : ""
                          }
                        /> */}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}

          {activeTab === "indicators" && (
            <Indicators
              setIndicators={setIndicatorArray}
              indicatorArray={indicatorArray}
            />
          )}
          {activeTab === "advanced" && (
            <>
              {" "}
              <Typography
                sx={{ mt: 3, ml: 1, fontWeight: 600 }}
                color="white"
                component="h1"
                variant="h5"
              >
                Advanced Settings
              </Typography>
              <Box
                sx={{
                  background: "linear-gradient(to left,#3E2146,#301631)",
                  mt: 2,
                  borderRadius: "5px",
                  p: 3,
                  marginBottom: 5,
                }}
              >
                <Box sx={{ mt: 1, flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} xl={4}>
                      <Typography
                        sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                        color="#CCCCCC"
                      >
                        Buy only every X conditions met
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          background: "#452951",
                          borderRadius: "8px",
                        }}
                      >
                        <ValidationTextField
                          margin="normal"
                          fullWidth
                          id="buyOnCondition"
                          name="buyOnCondition"
                          value={buyOnCondition}
                          onChange={async (event) => {
                            setBuyOnCondition(event.target.value);
                          }}
                        />{" "}
                        {/* <InputBase
                          name="buyOnConditionX"
                          value={buyOnConditionX}
                          onChange={handleChangeXcondition}
                          type="number"
                          sx={{
                            paddingLeft: 2,
                            paddingRight: 2,
                            borderRadius: "8px",
                            height: 37,
                            width: 80,
                            backgroundColor: "#6D4873",
                            color: "#CCCCCC",
                          }}
                          endAdornment={
                            <InputAdornment position="center">%</InputAdornment>
                          }
                          inputProps={{ min: "0", max: "100" }}
                          error={error}
                          helperText={
                            error
                              ? "Please enter a number between 0 and 100"
                              : ""
                          }
                        /> */}
                      </Box>
                    </Grid>
                    <Grid item xs={6} xl={4}>
                      <Typography
                        sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                        color="#CCCCCC"
                      >
                        Buy Only x% Above/Below avg. Price
                      </Typography>
                      <Box
                        sx={{
                          background: "#452951",
                          mr: 2,
                          borderRadius: "8px",
                        }}
                      >
                        <Grid container>
                          <Grid item xs={10}>
                            <SelectInput
                              placeHolder={"Order Type"}
                              options={avgPriceCondition}
                              keyName={"avgPrice"}
                              value={avgPrice}
                              onChange={async (event) => {
                                setAvgPrice(event.target.value);
                              }}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <InputBase
                              name="avgPricePercent"
                              value={avgPricePercent}
                              onChange={handleChangeMaPercentage}
                              type="number"
                              sx={{
                                paddingLeft: 2,
                                paddingRight: 2,
                                borderRadius: "8px",
                                height: 37,
                                width: 80,
                                backgroundColor: "#6D4873",
                                color: "#CCCCCC",
                              }}
                              endAdornment={
                                <InputAdornment position="center">
                                  %
                                </InputAdornment>
                              }
                              inputProps={{ min: "0", max: "100" }}
                              error={error}
                              helperText={
                                error
                                  ? "Please enter a number between 0 and 100"
                                  : ""
                              }
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={6} xl={4}>
                      <Typography
                        sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                        color="#CCCCCC"
                      >
                        Ignore first X Conditions
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          background: "#452951",
                          borderRadius: "8px",
                        }}
                      >
                        <ValidationTextField
                          margin="normal"
                          fullWidth
                          id="ignoreCondition"
                          name="ignoreCondition"
                          value={ignoreCondition}
                          onChange={async (event) => {
                            setIgnoreCondition(event.target.value);
                          }}
                        />{" "}
                        {/* <InputBase
                          name="ignoreConditionX"
                          value={ignoreConditionX}
                          onChange={handleChangeFirstXcondition}
                          type="number"
                          sx={{
                            paddingLeft: 2,
                            paddingRight: 2,
                            borderRadius: "8px",
                            height: 37,
                            width: 80,
                            backgroundColor: "#6D4873",
                            color: "#CCCCCC",
                          }}
                          endAdornment={
                            <InputAdornment position="center">%</InputAdornment>
                          }
                          inputProps={{ min: "0", max: "100" }}
                          error={error}
                          helperText={
                            error
                              ? "Please enter a number between 0 and 100"
                              : ""
                          }
                        /> */}
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider
                    variant="fullWidth"
                    sx={{
                      marginX: -3,
                      marginTop: 3,
                      marginBottom: 5,
                      background: "#7A8580",
                    }}
                  />
                </Box>
              </Box>{" "}
            </>
          )}
          {activeTab === "stop-loss" && (
            <Box
              sx={{
                background: "linear-gradient(to left,#3E2146,#301631)",
                mt: 5,
                borderRadius: "5px",
                p: 3,
                marginBottom: 5,
              }}
            >
              <Typography
                sx={{ mt: 1, fontWeight: 600 }}
                color="white"
                component="h1"
                variant="h5"
              >
                Stop Loss
              </Typography>
              <Divider
                variant="fullWidth"
                sx={{
                  marginX: -3,
                  marginTop: 1,
                  background: "#7A8580",
                }}
              />
              <Box sx={{ mt: 1, flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 10, md: 16 }}
                >
                  <Grid item xs={8} sm={8} md={8}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Stop Loss
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Trailing SL"}
                        options={stopLoss}
                        fullWidth
                        keyName={"stopLoss"}
                        value={stopLossValue}
                        onChange={handleStopLossOnChange}
                      />
                      {""}
                      {showSLPercentageTab && (
                        <InputBase
                          name="stopLossPercent"
                          value={stopLossPercent}
                          onChange={handleChangeStopLossPercent}
                          type="number"
                          sx={{
                            paddingLeft: 6,
                            paddingRight: 2,
                            borderRadius: "8px",
                            height: 43,
                            width: 250,
                            backgroundColor: "#FFFFFF33",
                            color: "#CCCCCC",
                          }}
                          endAdornment={
                            <InputAdornment position="center">%</InputAdornment>
                          }
                          inputProps={{ min: "0", max: "100" }}
                          error={error}
                          helperText={
                            error
                              ? "Please enter a number between 0 and 100"
                              : ""
                          }
                        />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
          {activeTab === "take-profit" && (
            <Box
              sx={{
                background: "linear-gradient(to left,#3E2146,#301631)",
                mt: 5,
                borderRadius: "5px",
                p: 3,
                marginBottom: 5,
              }}
            >
              <Typography
                sx={{ mt: 1, fontWeight: 600 }}
                color="white"
                component="h1"
                variant="h5"
              >
                Take Profit
              </Typography>
              <Divider
                variant="fullWidth"
                sx={{
                  marginX: -3,
                  marginTop: 1,
                  background: "#7A8580",
                }}
              />
              <Box sx={{ mt: 1, flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Take Profit
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"At candle body"}
                        options={takeProfit}
                        fullWidth
                        keyName={"takeProfit"}
                        value={takeProfitValue}
                        onChange={handleOnChange}
                      />
                      {showTPPercentageTab && (
                        <InputBase
                          name="takeProfitPercent"
                          value={takeProfitPercent}
                          onChange={handleChangeTakeProfitPercent}
                          type="number"
                          sx={{
                            paddingLeft: 6,
                            paddingRight: 2,
                            borderRadius: "8px",
                            height: 43,
                            width: 250,
                            backgroundColor: "#FFFFFF33",
                            color: "#CCCCCC",
                          }}
                          endAdornment={
                            <InputAdornment position="center">%</InputAdornment>
                          }
                          inputProps={{ min: "0", max: "100" }}
                          error={error}
                          helperText={
                            error
                              ? "Please enter a number between 0 and 100"
                              : ""
                          }
                        />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Box>

        <Grid container>
          <Grid item xs={8}></Grid>
          <Grid item xs={4} sx={{ pl: 2 }}>
            <Box
              sx={{
                mt: 4,
                mb: 2,
              }}
            >
              <button
                style={{
                  background: "linear-gradient(to right,#790F87,#794AE3)",
                  cursor: "pointer",
                  border: "none",
                  padding: "7px 20px",
                }}
                onClick={handlebacktest}
              >
                <Typography>Test Your Strategy!</Typography>
              </button>
            </Box>
          </Grid>
        </Grid>

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
          <Grid item xs={4} sx={{ pl: 2 }}>
            <Box
              sx={{
                background:
                  "linear-gradient(180deg, rgba(121, 13, 131, 0.0925) 0%, rgba(41, 8, 77, 0.37) 100%)",
                borderRadius: "8px",
                minHeight: 600,
              }}
            >
              <Box sx={{ display: "flex", minWidth: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "50%",
                  }}
                >
                  {[...Array(10)].map((_, index) => (
                    <Typography
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "16px",
                        textAlign: "center",
                        px: "auto",
                        py: 3,
                        borderBottom: "1px solid grey",
                      }}
                    ></Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "50%",
                  }}
                >
                  {[...Array(10)].map((_, index) => (
                    <Typography
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "16px",
                        textAlign: "center",
                        borderBottom: "1px solid grey",
                        px: "auto",
                        py: 3,
                        borderLeft: "1px solid grey",
                      }}
                    ></Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
