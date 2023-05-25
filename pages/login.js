import { useEffect, useState } from "react";
import Login from "../components/auth/Login";
import Header from "../components/layout/Header";
import Copyright from "../components/Copyright";
import { Auth, NavBarLogo } from "../utils/icons";

export default function LoginPage() {
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  let parentDivHeight = "80vw";

  if (width < 1100) {
    parentDivHeight = "83vw";
  } else if (width > 1100 && width < 1300) {
    parentDivHeight = "70vw";
  } else if (width > 1300 && width < 1400) {
    parentDivHeight = "63vw";
  } else if (width > 1400) {
    parentDivHeight = "60vw";
  }

  return (
    <div
      style={{
        position: "relative",
        height: parentDivHeight,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: width > 1600 ? -500 : -600,
          top: -120,
        }}
      >
        <Auth />
      </div>
      <Header />
      <div style={{ position: "absolute", right: 0 }}>
        <Login />
      </div>
      <Copyright
        sx={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 30,
          zIndex: 100,
        }}
      >
        <NavBarLogo />
      </div>
    </div>
  );
}
