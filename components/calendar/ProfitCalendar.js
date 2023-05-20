import { React, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Box, CardContent } from "@mui/material";
import { getDaysInMonth } from "../../utils/helpers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DateInfoCard from "../cards/date-card/DateInfoCard";
import { useEffect } from "react";

const monthData = [
  {
    monthNumber: 1,
    month: "January",
  },
  {
    monthNumber: 2,
    month: "February",
  },
  {
    monthNumber: 3,
    month: "March",
  },
  {
    monthNumber: 4,
    month: "April",
  },
  {
    monthNumber: 5,
    month: "May",
  },
  {
    monthNumber: 6,
    month: "June",
  },
  {
    monthNumber: 7,
    month: "July",
  },
  {
    monthNumber: 8,
    month: "August",
  },
  {
    monthNumber: 9,
    month: "September",
  },
  {
    monthNumber: 10,
    month: "October",
  },
  {
    monthNumber: 11,
    month: "November",
  },
  {
    monthNumber: 12,
    month: "December",
  },
];
function ProfitCalendar() {
  const [month, setMonth] = useState(2);
  const [days, setDays] = useState("");

  const dummy = Array(32).fill(1);

  const handleChange = (event) => {
    setMonth(event.target.value);
    const date = new Date();
    const currentYear = date.getFullYear();
    setDays(getDaysInMonth(currentYear, event.target.value));
  };
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Card
      sx={{
        background: "linear-gradient(#460961,#2E0B4B)",
        minHeight: "400px",
        minWidth: "500px",
        ...(width >= 1530 && {
          minWidth: "420px",
        }),
        ...(width >= 1650 && {
          minWidth: "460px",
        }),
        ...(width >= 1800 && {
          minWidth: "500px",
        }),
        borderRadius: "8px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Typography sx={{ fontSize: 18, p: "20px" }} color="White">
          Profit By Day Calendar
        </Typography>
        <div style={{ padding: "20px" }}>
          <FormControl sx={{ my: 1, pb: 2, minWidth: "70px" }}>
            <Select
              value={month}
              onChange={handleChange}
              displayEmpty
              sx={{
                height: "30px",
                borderRadius: "10px",
                background: "linear-gradient(to right,#790D83,#7A5CFF)",
                color: "white",
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              inputProps={{ "aria-label": "Without label" }}
            >
              {monthData.map((item) => {
                return (
                  <MenuItem value={item.monthNumber} key={item.monthNumber}>
                    {item.month}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Grid container rowSpacing={2} columnSpacing={2}>
            {dummy?.map((item, index) => {
              return (
                <Grid xs={2} item key={index}>
                  <DateInfoCard date={1} profit={200} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfitCalendar;
