import Register from "../components/auth/Register";
import Header from "../components/layout/Header";
export default function RegisterPage() {
  return (
    <div
      style={{
        backgroundImage: "url(https://i.postimg.cc/CMf1H64S/bg.png)",
        backgroundSize: "105%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
      }}
    >
      <Header />
      <Register />
    </div>
  );
}
