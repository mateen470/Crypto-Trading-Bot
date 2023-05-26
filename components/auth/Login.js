import React, { useEffect, useState } from "react";
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

import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { setExchange } from "../../slices/exchange-slice";
import { setAssets } from "../../slices/asset-slice";
import { Google } from "../../utils/icons";
import "typeface-poppins";
const ccxt = require("ccxt");

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    marginTop: "2rem",
    padding: "10px 5px",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #fff",
    fontSize: 18,
    color: "#fff",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      // borderColor: theme.palette.primary.main,
      boxShadow: "none",
      borderColor: "none",
    },
  },
}));

const Login = () => {
  const [error, setError] = useState("");
  const [width, setWidth] = useState(globalThis?.innerWidth);

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
        router.push("/dashboard?selected=0");
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
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Container
        sx={{
          marginTop: width > 1600 ? "0%" : "-10%",
          minHeight: "90vh",
        }}
        component="main"
        // maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              width: "50vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: "url(https://i.ibb.co/p3vmvzc/authBg.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: 10,
              px: 11,
              py: 8,
              border: "0px solid #666666",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              sx={{
                mt: 1,
                fontSize: "50px",
                color: "white",
                fontWeight: "800",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
              color="primary"
              component="h1"
            >
              Welcome Back
            </Typography>
            {/* Log in to access your account */}
            <Typography
              sx={{ mt: 1 }}
              color="#cecece"
              variant="h6"
              fontSize="1rem"
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    textTransform: "none",
                    background:
                      "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
                    color: "white",
                    fontWeight: "600",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
                      opacity: 0.9,
                    },
                    width: "8rem",
                  }}
                >
                  Login
                </Button>
              </Box>

              {error && (
                <Alert sx={{ mb: 1 }} severity="error">
                  {error}
                </Alert>
              )}
              <Box
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 1,
                  mt: 3,
                }}
              >
                <Typography fontWeight={600}>Or Login with</Typography>
                <Google />
              </Box>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" color="#795BFF" variant="body2">
                  Forgot password?
                </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Link
            href="register"
            color="#FFFFFF"
            variant="body2"
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            Don't have an account?{" "}
            <Typography sx={{ fontWeight: 800 }}> Sign Up</Typography>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default Login;
