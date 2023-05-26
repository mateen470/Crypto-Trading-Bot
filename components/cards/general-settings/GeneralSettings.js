import React, { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signIn, getSession } from "next-auth/react";
import Divider from "@mui/material/Divider";
import SelectInput from "../../widgets/SelectInput";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const GeneralSettings = (props) => {
  const names = [100, 200, 300, 400, 500];
  const exchange = ["Binance", "OKX"];
  const botType = ["Single Pair", "Multiple Pair"];
  const name = ["Long", "Short"];
  const listOfPairs = ["BTC/USDT", "ETH/USDT", "DOGE/USDT", "SOL/USDT"];
  return (
    <Box
      sx={{
        // background: "linear-gradient(to right,#3E2146,#371655)",
        mt: 5,
        borderRadius: "5px",
        // p: 3,
        marginBottom: 5,
      }}
      maxWidth="100%"
    >
      <Box>
        <Typography
          sx={{ mt: 1, fontWeight: 500 }}
          color="white"
          component="h1"
          variant="h5"
        >
          General Settings
        </Typography>
      </Box>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 10, md: 16 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Typography
              sx={{ marginBottom: 1, mt: 2, fontSize: 16, pl: 0.5 }}
              color="#CCCCCC"
            >
              Bot Name
            </Typography>
            <ValidationTextField
              margin="normal"
              required
              id="botName"
              placeholder="Name"
              fullWidth
              name="botName"
              value={props.botName}
              onChange={() => {
                props.setBotName(event.target.value);
              }}
              disabled={props.editSettings}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Typography
              sx={{ marginBottom: 1, mt: 2, fontSize: 16, pl: 0.5 }}
              color="#CCCCCC"
            >
              Bot Type
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <SelectInput
                placeHolder={"Bot Type"}
                options={botType}
                fullWidth
                keyName={"botType"}
                value={props.botType}
                onChange={async (event) => {
                  props.setBotType(event.target.value);
                }}
                disabled={props.editSettings}
              />
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Typography
              sx={{ marginBottom: 1, mt: 2, fontSize: 16, pl: 0.5 }}
              color="#CCCCCC"
            >
              Pairs
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Autocomplete
                id="pairs"
                freeSolo
                options={listOfPairs}
                disableClearable
                disabled={props.editSettings}
                fullWidth
                PaperComponent={({ children }) => (
                  <Paper
                    sx={{
                      backgroundColor: "#452951",
                      "& .MuiAutocomplete-option.Mui-selected": {
                        opacity: 0.3,
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {children}
                  </Paper>
                )}
                renderInput={(params) => {
                  const { InputLabelProps, InputProps, ...rest } = params;
                  return (
                    <ValidationTextField
                      margin="normal"
                      required
                      placeholder={
                        props.strategyPair ? props.strategyPair : "Search Pair"
                      }
                      fullWidth
                      {...params.InputProps}
                      {...rest}
                      value={props.strategyPair}
                      disabled={props.editSettings}
                    />
                  );
                }}
                onSelect={async (event) => {
                  props.setStrategyPair(event.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Typography
              sx={{ marginBottom: 1, mt: 2, fontSize: 16, pl: 0.5 }}
              color="#CCCCCC"
            >
              Exchange
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Select
                name={"exchange"}
                onChange={async (event) => {
                  props.setExchangeName(event.target.value);
                }}
                input={<OutlinedInput />}
                value={props.exchangeName}
                disabled={props.editSettings}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "#452951",
                      mt: 0.5,
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
                  "& .MuiSelect-select .notranslate::after": "Exchange"
                    ? {
                        content: `"Exchange"`,
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
                {props?.exchangeOptions?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.exchangeName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Typography
              sx={{ marginBottom: 1, mt: 2, fontSize: 16, pl: 0.5 }}
              color="#CCCCCC"
            >
              Strategy Type
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <SelectInput
                placeHolder={"Strategy Type"}
                options={name}
                fullWidth
                keyName={"strategyType"}
                value={props.strategyType}
                onChange={async (event) => {
                  props.setStrategyType(event.target.value);
                }}
                disabled={props.editSettings}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GeneralSettings;
