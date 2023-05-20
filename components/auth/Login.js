import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import Link from "@mui/material/Link";
import { alpha, styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../Copyright";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { setExchange } from "../../slices/exchange-slice";
import { setAssets } from "../../slices/asset-slice";

const ccxt = require("ccxt");

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: "#292929",
    borderBottom: "1px solid #ced4da",
    fontSize: 16,
    color: "#CCCCCC",
    padding: "20px 12px",
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

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const exchanges = useSelector((state) => state.exchanges.value);
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (!res.error) {
      const session = await getSession();
      if (session.user.accountVerified === false) {
        // router.push({pathname: '/verify-token', query: {email: session.user.email}});
        router.push("/verify-token");
      } else {
        fetchAssetsFromUserInfo(true);
        router.push("/dashboard");
      }
    } else {
      setError("Please enter correct email or password");
    }
  };

  const fetchAssetsFromUserInfo = async (save) => {
    const { user } = await getSession();
    const response = await fetch(`/api/user/get-user-info?id=${user.id}`, {
      method: "GET",
    });
    const data = await response.json();
    if (user.exchanges[0]) {
      const { USDMClient } = require("binance");
      const baseUrl = "https://testnet.binancefuture.com";
      const client = new USDMClient({
        api_key: user.exchanges[0]?.apiKey,
        api_secret: user.exchanges[0]?.apiSecret,
        baseUrl,
      });

      let filteredAssets;

      await client
        .getBalance()
        .then(async (result) => {
          filteredAssets = result.filter(
            (item) => parseFloat(item.balance) !== 0
          );
          setAssets(filteredAssets);
        })
        .catch((err) => {
          console.error("getBalance error: ", err);
        });

      if (filteredAssets?.length > 0 && save) {
        const binance = new ccxt.binance();
        for (const asset of filteredAssets) {
          if (asset.asset === "USDT") {
            asset["usdtBal"] = +asset.balance;
          } else {
            // Get the USDT exchange rate for the asset
            const symbol = `${asset.asset}/USDT`;
            const ticker = await binance.fetchTicker(symbol);
            const usdtPrice = ticker.last;
            // Multiply the balance by the USDT exchange rate to get the balance in USDT
            const usdtBalance = parseFloat(asset.balance) * usdtPrice;
            asset["usdtBal"] = usdtBalance;
          }
        }
        let reqBody = {
          exchangeId: user.exchanges[0]._id,
          userId: user.id,
          assets: filteredAssets,
        };
        const response = await fetch("/api/wallet/create-wallet", {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  };

  return (
    <>
      <Container
         sx={{
          marginTop:'-5%',
          background: "rgba(255, 255, 255, 0.09)",
          borderRadius: 10,
          p: 1,
          // marginLeft:'60%',
          border: "0px solid #666666",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", // For Safari compatibility
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: add a subtle shadow for depth
        }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ mt: 1 ,fontSize:'2.5rem'}}
            color="white"
            fontWeight={800}
            fontFamily="poppins"
            component="h1"
            variant="h5"
          >
            Welcome Back
          </Typography>
          {/* Log in to access your account */}
          <Typography
              sx={{  mt: 1 }}
              color="#cecece"
              variant="h6"
              fontSize='1rem'
            >
              Log in to access your account
            </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {/* <Typography
              sx={{ marginBottom: 1, mt: 2 }}
              color="#cecece"
              variant="h6"
              fontSize='1rem'
            >
              Email Address:
            </Typography> */}
            <ValidationTextField
              focused
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              placeholder="Email Address / Username"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {/* <Typography
              sx={{ marginBottom: 1, mt: 2 }}
              color="#cecece"
              variant="h6"
              fontSize='1rem'
            >
              Password:
            </Typography> */}
            <ValidationTextField
              focused
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              
              variant="contained"
              
              sx={{ mt: 3, mb: 2,ml:16 ,
                background: "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
                  opacity: 0.9,
                },
                width:'8rem',
                fontWeight:'600'
              }}
            >
              Sign In
            </Button>
            {error && (
              <Alert sx={{ mb: 1 }} severity="error">
                {error}
              </Alert>
            )}

            <Grid container>
              <Grid item xs>
                {/* <Link href="#" color="#795BFF" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="register" color="#795BFF" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default Login;
