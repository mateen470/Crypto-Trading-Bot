import {
  Box,
  Grid,
  InputAdornment,
  InputBase,
  Typography,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import SelectInput from "../../widgets/SelectInput";
import TimeFrameSelectInput from "../../widgets/TimeFrameSelectInput";
import SelectMulInput from "../../widgets/SelectMulInput";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import { UpPolygon, DownPolygon } from "../../../utils/icons";

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
const Indicators = (props) => {
  const masConditionOption = ["Above", "Below"];
  const masDistance = [
    "Vector Candle",
    "Moving Averages",
    "Tom Demark",
    "Price/ Price movement",
  ];
  const candleType = ["Upper Body", "Lower Body", "Upper Wick", "Lower Wick"];
  const candleOption = ["red", "purple", "blue", "green"];
  const timeFrame = ["1m", "3m", "5m", "1h", "2h", "1d", "1w", "1y"];
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [time, setTime] = useState(new Date());
  const [error, setError] = useState(false);
  const initialState = () => ({
    checkboxValues: Array(18).fill(false),
    orderAtEvery: "",
    botStartAtSignal: "",
    minCandleSize: "",
    candleTypeValue: candleType[0],
    timeFrameValue: timeFrame[0],
    chooseIndicatorValue: masDistance[0],
    candleValue: [],
    masCondition: "",
    masValue: "",
  });
  const [componentsData, setComponentsData] = useState(
    props.indicatorArray.length > 0 ? props.indicatorArray : [initialState()]
  );

  const handleIndicatorChange = (index, event) => {
    updateComponentData(index, { chooseIndicatorValue: event.target.value });
  };

  const handleCandleChange = (index, event) => {
    updateComponentData(index, { candleValue: event.target.value });
  };

  const handleCandleTypeChange = (index, event) => {
    updateComponentData(index, { candleTypeValue: event.target.value });
  };

  const handleMasCondition = (index, event) => {
    updateComponentData(index, { masCondition: event.target.value });
  };

  const handleMasValue = (index, event) => {
    updateComponentData(index, { masValue: event.target.value });
  };

  const handleMinCandleSize = (index, event) => {
    updateComponentData(index, { minCandleSize: event.target.value });
  };

  const handleBotStartsAtSignal = (index, event) => {
    updateComponentData(index, { botStartAtSignal: event.target.value });
  };

  const handleOrderAtEvery = (index, event) => {
    updateComponentData(index, { orderAtEvery: event.target.value });
  };

  const handleTimeFrame = (index, event) => {
    updateComponentData(index, { timeFrameValue: event.target.value });
  };

  const updateComponentData = (index, updatedData) => {
    setComponentsData((prevData) =>
      prevData.map((componentData, i) =>
        i === index ? { ...componentData, ...updatedData } : componentData
      )
    );
  };

  const handleCheckboxChange = (index, checkboxIndex) => {
    const newCheckboxValues = [...componentsData[index].checkboxValues];
    newCheckboxValues[checkboxIndex] =
      !componentsData[index].checkboxValues[checkboxIndex];
    updateComponentData(index, { checkboxValues: newCheckboxValues });
  };

  const addComponent = () => {
    setComponentsData((prevData) => [...prevData, initialState()]);
  };
  const removeComponent = (index) => {
    setComponentsData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const day = new Date();
  const dateOptions = { weekday: "short", month: "short", day: "numeric" };
  const dayOfMonth = day.getDate();
  const weekOfMonth = Math.ceil(dayOfMonth / 7);
  const monthOfYear = day.getMonth() + 1;
  useEffect(() => {
    props.setIndicators([initialState()]);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    props.setIndicators(componentsData);
  }, [componentsData, props]);

  return (
    <>
      {componentsData.map((componentData, index) => (
        <Box
          key={index}
          sx={{
            background: "linear-gradient(to right,#3E2146,#371655)",
            mt: 5,
            borderRadius: "5px",
            marginBottom: 5,
          }}
        >
          <Typography
            sx={{ mt: 1, fontWeight: 500 }}
            color="white"
            component="h1"
            variant="h5"
          >
            Indicators
            <button
              style={{
                border: "none",
                background: "linear-gradient(#790F87,#794AE3)",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "5px",
              }}
              onClick={addComponent}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "17px",
                }}
              >
                +
              </Typography>
            </button>
            {componentsData.length > 1 && (
              <button
                style={{
                  border: "none",
                  background: "linear-gradient(#790F87,#794AE3)",
                  borderRadius: "5px",
                  cursor: "pointer",
                  float: "right",
                }}
                onClick={() => removeComponent(index)}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "17px",
                  }}
                >
                  -
                </Typography>
              </button>
            )}
          </Typography>
          <Box sx={{ mt: 2, flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ mb: 0 }}>
              <Grid item xs={3} sm={3} xl={3}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Choose Indicator
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <SelectInput
                    placeHolder={masDistance[0]}
                    options={masDistance}
                    fullWidth
                    keyName={"indicator"}
                    onChange={(event) => handleIndicatorChange(index, event)}
                    value={componentData.chooseIndicatorValue}
                  />
                </Box>
              </Grid>
              {componentData.chooseIndicatorValue === "Vector Candle" && (
                <>
                  <Grid item xs={3} sm={3} xl={3}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Select Candle
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectMulInput
                        placeHolder={"Select Candle"}
                        options={candleOption}
                        fullWidth
                        keyName={"indicator"}
                        onChange={(event) => handleCandleChange(index, event)}
                        value={componentData.candleValue}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={3} sm={3} xl={3}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Candle Type
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Choose Candle Type"}
                        options={candleType}
                        fullWidth
                        keyName={"indicator"}
                        onChange={(event) =>
                          handleCandleTypeChange(index, event)
                        }
                        value={componentData.candleTypeValue}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={3} sx={{ mt: 1 }}>
                    <Typography
                      sx={{ my: 1, fontSize: 16, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Timeframe
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <TimeFrameSelectInput
                        placeHolder={"Select TimeFrame"}
                        fullWidth
                        keyName={"timeFrame"}
                        onChange={(event) => handleTimeFrame(index, event)}
                        value={componentData.timeFrameValue}
                      />
                    </Box>
                  </Grid>

                  {/* <Grid
                    item
                    xs={3}
                    sm={3}
                    xl={3}
                    sx={{
                      pl: 1,
                      display: "flex",
                      flexDirection: "column",
                      ...(width >= 1600 && {
                        flexDirection: "row",
                      }),
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        backgroundColor: "#452951",
                        borderRadius: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          Hr
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {time.getHours().toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          Min
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {time.getMinutes().toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          Sec
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {time.getSeconds().toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        backgroundColor: "#452951",
                        borderRadius: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          d
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {dayOfMonth.toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          w
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {weekOfMonth.toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          M
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {monthOfYear.toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                    </Box>
                  </Grid> */}
                  <Grid
                    container
                    sx={{
                      // mt: -13,
                      pl: 1.5,
                      ...(width >= 1600 && {
                        mt: 0,
                      }),
                    }}
                    spacing={2}
                  >
                    <Grid item xs={3}>
                      <Typography
                        sx={{ marginBottom: 1, mt: 1.5, fontSize: 16, ml: 0.5 }}
                        color="#CCCCCC"
                      >
                        Min candle size
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
                          id="minCanldeSize"
                          name="minCanldeSize"
                          onChange={(event) =>
                            handleMinCandleSize(index, event)
                          }
                          value={componentData.minCandleSize}
                        />
                        <InputBase
                          name="minCanldeSize"
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
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          marginBottom: 1,
                          mt: 2,
                          fontSize: 16,
                          ml: 0.5,
                          ...(width <= 1100 && {
                            fontSize: 14,
                          }),
                        }}
                        color="#CCCCCC"
                      >
                        Bot starts at signal
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
                          id="botStartsAtSignal"
                          name="botStartsAtSignal"
                          onChange={(event) =>
                            handleBotStartsAtSignal(index, event)
                          }
                          value={componentData.botStartAtSignal}
                        />
                        <InputBase
                          name="botStartsAtSignal"
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
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                        color="#CCCCCC"
                      >
                        Order at every
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
                          id="orderAtEvery"
                          name="orderAtEvery"
                          onChange={(event) => handleOrderAtEvery(index, event)}
                          value={componentData.orderAtEvery}
                        />
                        <InputBase
                          name="orderAtEvery"
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
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
              {componentData.chooseIndicatorValue === "Moving Averages" && (
                <>
                  <Grid item xs={3} sm={3} xl={3}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Condition
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Choose Ma's Condition"}
                        options={masConditionOption}
                        fullWidth
                        keyName={"masCondition"}
                        onChange={(event) => handleMasCondition(index, event)}
                        value={componentData.masCondition}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Ma's Value
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
                        id="masValue"
                        name="masValue"
                        onChange={(event) => handleMasValue(index, event)}
                        value={componentData.masValue}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={3} sx={{ mt: 1 }}>
                    <Typography
                      sx={{ my: 1, fontSize: 16, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Timeframe
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <TimeFrameSelectInput
                        placeHolder={"Select TimeFrame"}
                        fullWidth
                        keyName={"timeFrame"}
                        onChange={(event) => handleTimeFrame(index, event)}
                        value={componentData.timeFrameValue}
                      />
                    </Box>
                  </Grid>
                </>
              )}
              {componentData.chooseIndicatorValue === "Tom Demark" && (
                <>
                  <Grid item xs={2.8} sx={{ mt: 1, mr: 0.5 }}>
                    <Typography
                      sx={{ my: 1, fontSize: 16, ml: 0.5 }}
                      color="#CCCCCC"
                    >
                      Timeframe
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <TimeFrameSelectInput
                        placeHolder={"Select TimeFrame"}
                        fullWidth
                        keyName={"timeFrame"}
                        onChange={(event) => handleTimeFrame(index, event)}
                        value={componentData.timeFrameValue}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2.8}
                    sx={{
                      mt: 6,
                      mr: 3,
                      ml: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        backgroundColor: "#452951",
                        borderRadius: "8px",
                        py: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          Hr
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {time.getHours().toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          Min
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {time.getMinutes().toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          Sec
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {time.getSeconds().toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid xs={2.8} sx={{ mt: 8 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        backgroundColor: "#452951",
                        borderRadius: "8px",
                        py: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          d
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {dayOfMonth.toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          w
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {weekOfMonth.toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 10px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                          M
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
                        >
                          {monthOfYear.toString().padStart(2, "0")}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{
                            background: "#7A8580",
                            width: "30px",
                          }}
                        />
                        <Typography>-</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {[0, 1, 2].map((colIndex) => (
                        <Grid key={colIndex} item xs={4} index={index}>
                          <FormGroup>
                            {[0, 1, 2, 3, 4, 5].map((rowIndex) => {
                              const boxIndex = colIndex * 6 + rowIndex;
                              const evenBox = boxIndex % 2 === 0;

                              return (
                                <Box
                                  key={boxIndex}
                                  sx={{ display: "flex", mt: 3, ml: 3 }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          componentData.checkboxValues[boxIndex]
                                        }
                                        onChange={() =>
                                          handleCheckboxChange(index, boxIndex)
                                        }
                                        style={{
                                          color: "grey",
                                        }}
                                        value={boxIndex}
                                      />
                                    }
                                  />
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      py: 1,
                                      gap: 2,
                                    }}
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{ fontSize: "14px" }}
                                    >
                                      {evenBox
                                        ? `TD buy sequence ${boxIndex + 1}`
                                        : `TD sell sequence  ${boxIndex + 1}`}
                                    </Typography>
                                    {evenBox ? (
                                      <Box
                                        sx={{
                                          background: " #cccccc2b",
                                          px: 1,
                                          py: 0.8,
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          border: "1px solid grey",
                                          borderRadius: 2,
                                          cursor: "pointer",
                                        }}
                                      >
                                        <UpPolygon />
                                      </Box>
                                    ) : (
                                      <Box
                                        sx={{
                                          background: " #cccccc2b",
                                          px: 1,
                                          py: 0.8,
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          border: "1px solid grey",
                                          borderRadius: 2,
                                          cursor: "pointer",
                                        }}
                                      >
                                        <DownPolygon />
                                      </Box>
                                    )}
                                  </Box>
                                </Box>
                              );
                            })}
                          </FormGroup>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Indicators;
