import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";

import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";

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

export default function VerifyToken() {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleVerify = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const session = await getSession();
    const payload = {
      email: session.user.email,
      code: data.get("verifyNumber"),
    };

    const response = await fetch("/api/user/verify-email", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newData = await response.json();
    if (newData.status == 404) {
      setError("Invalid Code! Try Again.");
    } else {
      router.push("dashboard");
      setError("");
      // setShowVerification(true);
    }
  };

  return (
    <>
      <Container
        sx={{
          background: "#191919",
          borderRadius: 5,
          p: 3,
          mt: 10,
          border: "1px solid #666666",
        }}
        component="main"
        maxWidth="xs"
      >
        <Box
          component="form"
          onSubmit={handleVerify}
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MarkEmailReadIcon color="primary" fontSize="large" />
          <Typography
            color="white"
            variant="h6"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Verification code is sent to your email address. Please enter the
            code:
          </Typography>
          <ValidationTextField
            focused
            id="verifyNumber"
            name="verifyNumber"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Verify
          </Button>
          {error && (
            <Alert sx={{ mb: 1 }} severity="error">
              {error}
            </Alert>
          )}
        </Box>
      </Container>
    </>
  );
}
