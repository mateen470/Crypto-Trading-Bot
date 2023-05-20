import Login from "../components/auth/Login";
import Header from "../components/layout/Header";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        backgroundImage: "url(https://i.postimg.cc/CMf1H64S/bg.png)",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundSize:'auto 100%',
        height: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Login />
      </div>
    </div>
  );
  
  
}
