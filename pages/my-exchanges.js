import WalletConnect from "../components/cards/wallet-connect/WalletConnect";
import Wallet from "../components/cards/wallet-connect/Wallet";
import PrivateHeader from "../components/layout/PrivateHeader";

const MyExchangesComponent = () => {
  return <Wallet />;
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
