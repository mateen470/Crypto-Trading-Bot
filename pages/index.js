import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Header from "../components/layout/Header";
export default function Home() {
  const router = useRouter();
  const handleSignUp = (e) => {
    e.preventDefault();
    router.push("register");
  };
  return (
    <div>
      <Header />
    </div>
  );
}
