import { Grid } from "@mui/material";
import WalletConnect from "../components/cards/wallet-connect/WalletConnect";
import PrivateHeader from "../components/layout/PrivateHeader";

const MyExchangesComponent = () => {
  return (
    <Grid container>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "3rem",
          marginLeft: "0.8rem",
        }}
        width={500}
      >
        <WalletConnect />
      </Grid>
    </Grid>
  );
};

export default function MyExchanges() {
  return (
    <PrivateHeader
      title="My Exchanges"
      Component={MyExchangesComponent}
      current="1"
    />
  );
}
