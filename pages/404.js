import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

const Error404 = () => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <Box
      className="content-center"
      sx={{
        p: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography variant="h1">404</Typography>
        <Typography variant="h5" sx={{ mb: 1, fontSize: "1.5rem !important" }}>
          Page Not Found ⚠️
        </Typography>
        <Typography variant="body2">
          We could not find the page you are looking for.
        </Typography>
      </Box>

      <Button onClick={handleClick} variant="contained" sx={{ px: 5.5, mt: 5 }}>
        Back to Home
      </Button>
    </Box>
  );
};

export default Error404;
