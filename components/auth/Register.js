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
    fontSize: 16,
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
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "90vh",
        }}
        component="main"
        // maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            width: "45%",
            // alignItems: "center",
          }}
        >
          {/* <Avatar>
            <LockOutlinedIcon color="primary" />
          </Avatar>     */}
          <Typography
            sx={{ mt: 1, fontSize: "50px", color: "white", fontWeight: "800" }}
            color="primary"
            component="h1"
          >
            Start Signup for free
          </Typography>
          <Typography
            sx={{ fontSize: "20px", color: "white", fontWeight: "400" }}
          >
            Create your free account
          </Typography>
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
                  // pla="companyName"
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
                mb: 5,
                height: "40px",
                width: "180px",
                background: "linear-gradient(#790D83,#7A5CFF)",
                borderRadius: "5px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(0.95)",
                },
              }}
            >
              <LoadingButton
                type="submit"
                loading={loading}
                // fullWidth
                // variant="contained"
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
                <Link color="#795BFF" href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
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
        </Box>
      </Container>

      <Copyright sx={{ mt: 8, pb: 3 }} />
    </>
  );
};

export default Register;
