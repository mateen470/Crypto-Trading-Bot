import React, { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import { ccxt } from 'ccxt';
import emailjs from "@emailjs/browser";
import nc from "next-connect";
import { createProxyMiddleware } from "http-proxy-middleware";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import { signIn, getSession, useSession } from "next-auth/react";
import SelectInput from "../../widgets/SelectInput";
import { useSelector, useDispatch } from "react-redux";
import { setExchange } from "../../../slices/exchange-slice";
import { CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#292929",
    border: "1px solid #ced4da",
    fontSize: 16,
    color: "#CCCCCC",
    padding: "10px 12px",
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

const exchangeTypes = [
  "Binance Futures Testnet",
  "Binance Futures",
  "Binance Spot",
];

const WalletConnect = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connectionData, setConnectionData] = useState();

  const [loading, setLoading] = useState(true);
  const [selectedExchange, setSelectedExchange] = useState("Select Exchange");

  const [allExchange, setAllExchange] = useState([]);

  useEffect(() => {
    fetchAssetsFromUserInfo();
  }, []);

  const fetchAssetsFromUserInfo = async () => {
    const { user } = await getSession();
    const response = await fetch(`/api/user/get-user-info?id=${user.id}`, {
      method: "GET",
    });
    const data = await response.json();

    if (data.body.exchanges[0]) {
      setAllExchange(data.body.exchanges);
      setSelectedExchange(data.body.exchanges[0].exchangeName);
      console.log("Exchange: ",data.body.exchanges[0].exchangeName)
      const { USDMClient } = require("binance");
      const baseUrl = "https://testnet.binancefuture.com";
      const client = new USDMClient({
        api_key: data.body.exchanges[0].apiKey,
        api_secret: data.body.exchanges[0].apiSecret,
        baseUrl,
      });

      client
        .getBalance()
        .then((result) => {
          console.log("getBalance result: ", result);
          setConnectionData(result);
          setConnected(true);
          setShowDrawer(false);
          setLoading(false);
        })
        .catch((err) => {
          console.error("getBalance error: ", err);
          setLoading;
        });
    } else {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowDrawer(false);
  };
  const handleConnectAccount = () => {
    setShowDrawer(true);
  };

  const handleBinance = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let session = await getSession();
    // console.log(session.user);
    var ccxt = require("ccxt");
    const { USDMClient } = require("binance");
    console.log("Exchangee",data)
    const API_KEY = data.get("apiKey");
    const API_SECRET = data.get("apiSecret");
    const baseUrl = "https://testnet.binancefuture.com";
    const client = new USDMClient({
      api_key: API_KEY,
      api_secret: API_SECRET,
      baseUrl,
    });

    client
      .getBalance()
      .then((result) => {
        console.log("getBalance result: ", result);
        setConnectionData(result);
        setConnected(true);
        setShowDrawer(false);
      })
      .catch((err) => {
        console.error("getBalance error: ", err);
        setShowDrawer(false);
      });

    const body = [
      ...allExchange,
      {
        exchangeName: data.get("exchangeName"),
        name: data.get("name"),
        apiKey: data.get("apiKey"),
        apiSecret: data.get("apiSecret"),
      },
    ];

    const response = await fetch(
      `/api/user/connect-binance?id=${session.user.id}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resp = await response.json();
    setAllExchange(resp.body.exchanges);
    setSelectedExchange(data.get("name"));

    if (resp.body.balances) {
      setConnectionData(resp.body);
      setConnected(true);
      setShowDrawer(false);
    }
  };

  const handleExchangeOnChange = (event) => {
    console.log(event.target.value);

    var ccxt = require("ccxt");
    const { USDMClient } = require("binance");
    const { MainClient } = require('binance');

    const API_KEY = event.target.value.apiKey;
    const API_SECRET = event.target.value.apiSecret;
    console.log("yo",event.target.value.exchangeName)
    let client = new USDMClient();
    if (event.target.value.exchangeName === "Binance Futures Testnet")
    {
      console.log ("Truth Nothing")
    const baseUrl = "https://testnet.binancefuture.com";
    client = new USDMClient({
      api_key: API_KEY,
      api_secret: API_SECRET,
      baseUrl,
    });
    }
    else if (event.target.value.exchangeName === "Binance Futures")
    {
      console.log ("Truth Futures")
      client = new USDMClient({
        api_key: API_KEY,
        api_secret: API_SECRET,
        baseUrl,
      });
    }
    else if (event.target.value.exchangeName === "Binance Spot"){
      console.log ("Truth Spot")
      const client = new MainClient({
        api_key: API_KEY,
        api_secret: API_SECRET,
      });
    }
    else {
      
      alert ("Invalid Exchange, Try again")
      return
    }

    client
      .getBalance()
      .then((result) => {
        console.log("getBalance result: handleExchange", result);
        setConnectionData(result);
        setConnected(true);
        setShowDrawer(false);
      })
      .catch((err) => {
        console.error("getBalance error: ", err);
      });
  };

  return (
    <Container
      sx={{
        background: "#191919",
        borderRadius: 1,
        p: 3,
        border: "1px solid #666666",
      }}
      component="main"
      maxWidth="xs"
    >
      <Button
        onClick={handleConnectAccount}
        variant="contained"
        sx={{ mt: 1, mb: 3 }}
      >
        + Add Exchange
      </Button>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "black",
          },
        }}
        anchor="right"
        open={showDrawer}
        onClose={handleClose}
      >
        <Box
          sx={{
            width: 300,
            p: 1,
          }}
          role="presentation"
          component="form"
          onSubmit={handleBinance}
        >
          <Typography
            variant="h5"
            color="white"
            sx={{ textAlign: "center", mt: 17, mb: 2 }}
          >
            Connect Exchange
          </Typography>
          <Typography color="white" variant="p">
            Select Exchange:
          </Typography>
          <SelectInput
            placeHolder={"Select Exchange"}
            options={exchangeTypes}
            width={"100%"}
            keyName={"exchangeName"}
          />
          <Typography color="white" variant="p">
            Name:
          </Typography>
          <ValidationTextField
            sx={{ mb: 1 }}
            size="small"
            required
            fullWidth
            id="name"
            name="name"
            autoFocus
          />
          <Typography color="white" variant="p">
            API Key:
          </Typography>
          <ValidationTextField
            sx={{ mb: 1 }}
            size="small"
            required
            fullWidth
            id="apiKey"
            name="apiKey"
            autoFocus
          />
          <Typography color="white" variant="p">
            API Secret:
          </Typography>
          <ValidationTextField
            sx={{ mb: 1 }}
            size="small"
            required
            fullWidth
            id="apiSecret"
            name="apiSecret"
            autoFocus
          />
          <Button type="submit" sx={{ mt: 2 }} fullWidth variant="contained">
            Connect
          </Button>
        </Box>
      </Drawer>

      {
        loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : connected ? (
          <Box>
            <Typography sx={{ marginBottom: 2 }}>Wallet</Typography>
            <Select
              onChange={handleExchangeOnChange}
              input={<OutlinedInput />}
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
                "& .MuiSelect-select .notranslate::after": `${selectedExchange}`
                  ? {
                      content: `"${selectedExchange}"`,
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
              {allExchange.map((item) => (
                <MenuItem key={item._id} value={item}>
                  {item.exchangeName}
                </MenuItem>
              ))}
            </Select>
            <Box>
              <ul>
                {connectionData.map((connectionData) => (
                  <li key={connectionData.asset}>
                    {connectionData.asset}: {connectionData.balance}
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography sx={{ marginBottom: 2 }}>
              No Wallet Connected
            </Typography>
          </Box>
        )

        
      }

      
    </Container>
  );
};

export default WalletConnect;
