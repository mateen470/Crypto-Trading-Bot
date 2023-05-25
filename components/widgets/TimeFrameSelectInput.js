import React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { GlobalStyles } from "@mui/material";
const TimeFrameSelectInput = (props) => {
  return (
    <>
      <GlobalStyles
        styles={{
          "*::-webkit-scrollbar": {
            width: "5px",
          },
          "*::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "2px",
            zIndex: 100,
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        }}
      />
      <Select
        id={props.keyName}
        name={props.keyName}
        onChange={props.onChange}
        input={<OutlinedInput />}
        value={props.value}
        disabled={props.disabled}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "#452951",
              mt: 0.5,
              overflow: "overlay",
              "& .MuiMenuItem-root": {
                color: "white",
                "&:hover": {
                  backgroundColor: "#4E2C60",
                },
              },
              "& .Mui-selected": {
                opacity: 0.4,
                backgroundColor: "transparent",
              },
              "& .MuiList-root": {
                paddingTop: 0,
                paddingBottom: 0,
              },
              "& .MuiMenu-paper": {
                marginTop: "8px",
              },
              "& .MuiListItem-root": {
                paddingTop: "10px",
                paddingBottom: "10px",
                "&:hover": {
                  backgroundColor: "none",
                },
              },
            },
          },
        }}
        sx={{
          "& .MuiSelect-select .notranslate::after": `${props.placeHolder}`
            ? {
                content: `"${props.placeHolder}"`,
                opacity: 0.42,
              }
            : {},
          minWidth: "100%",
          height: 37,
          borderRadius: "8px",
          color: "white",
          backgroundColor: "#452951",
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
        }}
      >
        <ListSubheader
          sx={{ color: "#929292", background: "#452951", fontWeight: 800 }}
        >
          SECONDS
        </ListSubheader>
        <MenuItem value={"1 second"}>1 second</MenuItem>
        <MenuItem value={"5 seconds"}>5 seconds</MenuItem>
        <MenuItem value={"10 seconds"}>10 seconds</MenuItem>
        <MenuItem value={"15 seconds"}>15 seconds</MenuItem>
        <MenuItem value={"30 seconds"}>30 seconds</MenuItem>
        <ListSubheader
          sx={{ color: "#929292", background: "#452951", fontWeight: 800 }}
        >
          MINUTES
        </ListSubheader>
        <MenuItem value={"1 minute"}>1 minute</MenuItem>
        <MenuItem value={"2 minutes"}>2 minutes</MenuItem>
        <MenuItem value={"3 minutes"}>3 minutes</MenuItem>
        <MenuItem value={"5 minutes"}>5 minutes</MenuItem>
        <MenuItem value={"15 minutes"}>15 minutes</MenuItem>
        <MenuItem value={"24 minutes"}>24 minutes</MenuItem>
        <MenuItem value={"30 minutes"}>30 minutes</MenuItem>
        <MenuItem value={"45 minutes"}>45 minutes</MenuItem>
        <MenuItem value={"90 minutes"}>90 minutes</MenuItem>
        <MenuItem value={"100 minutes"}>100 minutes</MenuItem>
        <ListSubheader
          sx={{ color: "#929292", background: "#452951", fontWeight: 800 }}
        >
          HOURS
        </ListSubheader>
        <MenuItem value={"1 hour"}>1 hour</MenuItem>
        <MenuItem value={"2 hours"}>2 hours</MenuItem>
        <MenuItem value={"3 hours"}>3 hours</MenuItem>
        <MenuItem value={"4 hours"}>4 hours</MenuItem>
        <MenuItem value={"5 hours"}>5 hours</MenuItem>
        <MenuItem value={"8 hours"}>8 hours</MenuItem>
        <MenuItem value={"12 hours"}>12 hours</MenuItem>
        <MenuItem value={"20 hours"}>20 hours</MenuItem>
        <MenuItem value={"21 hours"}>21 hours</MenuItem>
        <MenuItem value={"22 hours"}>22 hours</MenuItem>
        <ListSubheader
          sx={{ color: "#929292", background: "#452951", fontWeight: 800 }}
        >
          DAYS
        </ListSubheader>
        <MenuItem value={"1 day"}>1 day</MenuItem>
        <MenuItem value={"2 days"}>2 days</MenuItem>
      </Select>
    </>
  );
};

export default TimeFrameSelectInput;
