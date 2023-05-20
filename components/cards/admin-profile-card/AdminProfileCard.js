import React from "react";
import { useSession } from "next-auth/react";
import { Box, Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
const AdminProfileCard = () => {
  const session = useSession();
  return (
    <Card
      sx={{ minWidth: 200 }}
      style={{ background: "rgba(255, 255, 255, 0.1)", borderRadius: "8px" }}
    >
      <CardContent style={{ padding: "7px" }}>
        <Grid container justifyContent="space-evenly">
          <Grid xs={4} item>
            <img
              src="https://static6.depositphotos.com/1003369/659/i/600/depositphotos_6591667-stock-photo-close-up-of-beautiful-womanish.jpg"
              style={{
                maxHeight: "3rem",
                maxWidth: "3rem",
                borderRadius: "50%",
              }}
            />
          </Grid>
          <Grid xs={8} item>
            <Typography
              sx={{ fontSize: 15, fontWeight: 600, color: "white" }}
              gutterBottom
            >
              {session?.data?.user.firstName}&nbsp;
              {session?.data?.user.lastName}
            </Typography>
            <Typography color="white" fontSize={14}>
              Admin
            </Typography>
          </Grid>
        </Grid>
        <Box style={{ paddingLeft: "2.8rem" }}>
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
            Advanced Plan
          </Typography>
          <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
            <Typography color="error" style={{ fontSize: "13px" }}>
              Upgrade
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminProfileCard;
