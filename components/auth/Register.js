import React, { useState } from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import Copyright from "../Copyright";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import "typeface-poppins";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    marginTop: "5px",
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
    // "&:focus": {
    //   boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    //   borderColor: theme.palette.primary.main,
    // },
    "&::placeholder": {
      color: "#ffffff",
    },
  },
}));

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      // name: data.get("name"),
      // companyName: data.get("companyName"),
      email: data.get("email"),
      // mobile: data.get("mobile"),
      password: data.get("password"),
    };
    console.log(payload);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newData = await response.json();

    if (newData.status == 409) {
      setLoading(false);

      setError("Email already exists");
    } else {
      const res = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });

      const session = await getSession();
      setLoading(false);
      setError("");
      // router.push({pathname: '/verify-token', query: {email: session.user.email}});
      router.push("/verify-token");
    }
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
        component="main"
        // maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "65vw",
            alignItems: "center",
            marginTop: "-5%",
            borderRadius: 10,
            px: 10,
            py: 5,
            backgroundImage: "url(https://i.ibb.co/p3vmvzc/authBg.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: "0px solid #666666",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* <Avatar>
            <LockOutlinedIcon color="primary" />
          </Avatar>     */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                mt: 1,
                fontSize: "50px",
                color: "white",
                fontWeight: "800",
                lineHeight: 1,
              }}
              color="primary"
              component="h1"
            >
              Start Signup
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontSize: "50px",
                color: "white",
                fontWeight: "800",
                lineHeight: 1,
              }}
              color="primary"
              component="h1"
            >
              for free
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#CCC2CF",
                fontWeight: "400",
                lineHeight: 4,
              }}
            >
              Create your free account
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={12}>
                <ValidationTextField
                  focused
                  required
                  autoComplete="given-name"
                  fullWidth
                  // name="firstName"
                  // id="firstName"
                  // label="First Name"
                  name="name"
                  id="name"
                  placeholder="Name"
                  variant="outlined"
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                {/* <Typography
                  sx={{ marginBottom: 1, mt: 2 }}
                  color="#FFFFFF"
                  variant="h6"
                >
                  Company Name
                </Typography> */}
                <ValidationTextField
                  focused
                  required
                  fullWidth
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  // id="companyName"
                  // placeholder="Company Name"
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <Typography
                  sx={{ marginBottom: 1, mt: 2 }}
                  color="#FFFFFF"
                  variant="h6"
                >
                  Mobile Number
                </Typography> */}
                <ValidationTextField
                  focused
                  required
                  fullWidth
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  // id="mobile"
                  // placeholder="Mobile Number"
                  // name="mobile"
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <Typography
                  sx={{ marginBottom: 1, mt: 2 }}
                  color="#FFFFFF"
                  variant="h6"
                >
                  Email Address
                </Typography> */}
                <ValidationTextField
                  focused
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <Typography
                  sx={{ marginBottom: 1, mt: 2 }}
                  color="#FFFFFF"
                  variant="h6"
                >
                  Create Password
                </Typography> */}
                <ValidationTextField
                  color="primary"
                  focused
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    pt: 2,
                    pb: 4,
                  }}
                >
                  <Checkbox
                    style={{
                      color: "white",
                      "&$checked": {
                        color: "white",
                      },
                    }}
                  />
                  <Typography sx={{ fontSize: "14px" }}>
                    By signing up you agree to our{" "}
                    <Link>terms and conditions</Link>.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                sx={{
                  mb: 5,
                  height: "40px",
                  width: "180px",
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
                }}
              >
                Sign Up
              </LoadingButton>
            </Box>
            {error && (
              <Alert sx={{ mb: 1 }} severity="error">
                {error}
              </Alert>
            )}
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="login"
                  color="#FFFFFF"
                  variant="body2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  Already have an account?{" "}
                  <Typography sx={{ fontWeight: 800 }}> Sign in</Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Box
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            minHeight: "100vh",
            minWidth: "50%",
            height: "auto",
          }}
        >
          <Image
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              minHeight: "100vh",
              minWidth: "90%",
            }}
            src="/signUp.svg"
            width={500}
            height={800}
          />
        </Box> */}
      </Container>

      <Copyright sx={{ mt: 8, pb: 3 }} />
    </>
  );
};

export default Register;
