import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const IconPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#4E116D" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  borderRadius: "8px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DescriptionCard = ({ title, icon, data }) => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Card
      sx={{
        minWidth: 200,
        maxWidth: 600,
        // background: "linear-gradient(#310E4B,#420B5C )",
        background: "#790d832d",
        boxShadow: "none",
        borderRadius: "0px",
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          paddingLeft={1.5}
          style={{
            minHeight: "20vh",
            ...(width >= 1300 && {
              minHeight: "13vh",
            }),
            ...(width >= 1400 && {
              minHeight: "10vh",
            }),
            ...(width >= 1600 && {
              minHeight: "8vh",
            }),
          }}
        >
          <Grid item>
            <Stack
              justifyContent="center"
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <IconPaper>{icon}</IconPaper>

              <Stack>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  {title}
                </Typography>
                <Typography color="primary" fontWeight={600}>
                  {data}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
