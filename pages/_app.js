import "../styles/global.css";
import { ThemeProvider } from "@mui/material";
import Head from "next/head";
import { theme } from "../theme";
import Header from "../components/layout/Header";
import connectMongo from "../utils/connectMongo";
import { SessionProvider } from "next-auth/react";
import { store } from "../store";
import { Provider } from "react-redux";
import "typeface-poppins";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <>
          <Head>
            <title>Trading Bot</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
