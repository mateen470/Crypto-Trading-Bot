import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { setWidth } from "../../slices/dashboardWidthController-slice";
import { useRouter } from "next/router";
import {
  Logo,
  Dash,
  BlueDash,
  ClosedMenuIcon,
  TradingBotsIcon,
  HandShake,
  VgridBot,
  VdcaBot,
  History,
  Lock,
  BlueLock,
  BlueHandShake,
  BlueTradingBotsIcon,
  BlueHistory,
} from "../../utils/icons";
import { signOut } from "next-auth/react";
import CryptoCard from "../cards/header-cards/CryptoCard";
import AdminProfileCard from "../cards/admin-profile-card/AdminProfileCard";
import AdminProfileCardSideBar from "../cards/admin-profile-card/AdminProfileCardSideBar";
import SearchBar from "../widgets/SearchBar";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button } from "@mui/material";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function PrivateHeader({ title, current, Component }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();
  const router = useRouter();

  const handleClick = (item) => {
    router.push(`${item.path}?selected=${item.index}`);
  };

  const getSelectedIndexFromUrl = () => {
    const selectedIndex = parseInt(router.query.selected);
    return isNaN(selectedIndex) ? -1 : selectedIndex;
  };

  const getListItemStyle = (index) => {
    return {
      color: selectedItem === index ? "#9079F6" : "white",
      width: index === 2 && open ? "75%" : "100%",
      pl: 1,
      minHeight: 45,
      cursor: "pointer",
      "&::before": {
        content: '""',
        backgroundColor: "#CDC4F6",
        minHeight: 30,
        width: "5px",
        position: "absolute",
        left: 0,
        opacity: 0,
        borderRadius: "1px",
      },
      "&:hover::before": {
        opacity: 1,
      },
      "&:hover": {
        backgroundColor: !open ? "none" : "#473956",
        borderRadius: index === 2 && open ? "0px 5px 5px 0px" : "0px",
      },
    };
  };

  const handleDropdownClick = () => {
    setToggle(!toggle);
  };
  const items = [
    {
      index: 0,
      title: "Dashboard",
      icon: selectedItem === 0 ? BlueDash : Dash,
      path: "/dashboard",
    },
    {
      index: 1,
      title: "My Exchanges",
      icon: selectedItem === 1 ? BlueLock : Lock,
      path: "/my-exchanges",
    },
    // {
    //   index: 2,
    //   title: "Trading Bots",
    //   icon: selectedItem === 2 ? BlueTradingBotsIcon : TradingBotsIcon,
    //   path: "/trading-bots",
    // },
    {
      index: 3,
      title: "VDCA Bot",
      icon: selectedItem === 3 ? VdcaBot : VdcaBot,
      path: "/dca-bots",
    },
    {
      index: 4,
      title: "Bot Config",
      icon: selectedItem === 4 ? VgridBot : VgridBot,
      path: "/bot-config",
    },
    {
      index: 5,
      title: "My Deals",
      icon: selectedItem === 5 ? BlueHandShake : HandShake,
      path: "/AllDeals",
    },
    // {
    //   index: 6,
    //   title: "History",
    //   icon: selectedItem === 6 ? BlueHistory : History,
    //   path: "/history",
    // },
  ];

  React.useEffect(() => {
    setSelectedItem(() => getSelectedIndexFromUrl());
  }, [getSelectedIndexFromUrl()]);

  React.useEffect(() => {
    const handleOpen = () => {
      dispatch(setWidth(open));
    };
    handleOpen();
  }, [dispatch, open]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setToggle(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        PaperProps={{
          sx: {
            color: "#795BFF",
            border: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            background: `${
              open
                ? "linear-gradient(to bottom left, #29084D , #191919)"
                : " linear-gradient(to bottom left, #19191985 10% , #191919 ) "
            }`,
          },
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader
          sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
        >
          {/* <Typography
            sx={{
              display: `${open ? "inline-block" : "none"}`,
              fontWeight: "600",
              fontSize: "20px",
              paddingLeft: "15px",
              margin: "0px",
            }}
          >
            VeBot
          </Typography> */}
          {!open ? (
            <IconButton onClick={handleDrawerOpen} sx={{ left: -7 }}>
              <ClosedMenuIcon />
            </IconButton>
          ) : (
            <>
              <Logo />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon sx={{ color: "#FFFFFF" }} />
                ) : (
                  <CloseIcon sx={{ color: "#FFFFFF" }} />
                )}
              </IconButton>
            </>
          )}
          {/* <img
              style={{
                cursor: "pointer",
                // flexWrap:'nowrap',
                // marginLeft:'50%'
              }}
              src="https://i.postimg.cc/wBfYXdvq/Group-1000009101-1.png"
              width={130}
            ></img> */}
          {/* https://i.postimg.cc/HnrK4JN3/Group-1000009101.png */}
          {/* {!open ? (
            <IconButton
              onClick={handleDrawerOpen}
              sx={{ left: selectedItem === 0 ? -7 : -3.5 }}
            >
              <MenuIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "#FFFFFF" }} />
              ) : (
                <CloseIcon sx={{ color: "#FFFFFF" }} />
              )}
            </IconButton>
          )} */}
        </DrawerHeader>
        {/* <Box
          sx={{
            display: `${open ? "inline-block" : "none"}`,
            padding: "5px 15px",
          }}
        >
          <SearchBar />
        </Box> */}
        <List sx={{ mb: "40vh", mt: open ? 2 : 0 }}>
          {items.map((item) => (
            <div key={item.index}>
              {item.index === 0 && open && (
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "18px",
                    paddingLeft: "15px",
                    margin: "0px",
                    marginTop: "5px",
                  }}
                >
                  Market Dashboard
                </Typography>
              )}
              {item.index === 3 && open && (
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "18px",
                    paddingLeft: "15px",
                    margin: "0px",
                    marginTop: "5px",
                  }}
                >
                  Trading Bot
                </Typography>
              )}
              {item.index === 4 && open && (
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "18px",
                    paddingLeft: "15px",
                    margin: "0px",
                    marginTop: "5px",
                  }}
                >
                  Configuration
                </Typography>
              )}
              {item.index === 5 && open && (
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "18px",
                    paddingLeft: "15px",
                    margin: "0px",
                    marginTop: "5px",
                  }}
                >
                  Deals
                </Typography>
              )}
              <ListItem
                sx={getListItemStyle(item.index)}
                onClick={() => handleClick(item)}
              >
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: open ? "center" : "center",
                    alignItems: "center",
                    pr: !open ? 3 : "",
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ display: !open ? "none" : "" }}
                />
              </ListItem>
              {/* {item.title === "Trading Bots" && (
                <div
                  onClick={handleDropdownClick}
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "118px",
                    display: open ? "inline-block" : "none",
                  }}
                >
                  {toggle ? (
                    <ExpandLess style={{ color: "white", cursor: "pointer" }} />
                  ) : (
                    <ExpandMore style={{ color: "white", cursor: "pointer" }} />
                  )}
                </div>
              )}
              {item.title === "Trading Bots" && (
                <Collapse in={toggle} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      sx={getListItemStyle(3)}
                      onClick={() => router.push("/dca-bots?selected=3")}
                    >
                      <ListItemIcon sx={{ pl: 4, pr: 2 }}>
                        <VdcaBot />
                      </ListItemIcon>
                      <ListItemText
                        primary={"VDCA Bot"}
                        sx={{ display: !open ? "none" : "" }}
                      />
                    </ListItem>
                  </List>
                </Collapse>
              )} */}
            </div>
          ))}
        </List>
        <List>
          <ListItem
            sx={{
              display: `${open ? "flex" : "none"}`,
              pl: 2,
              minHeight: 45,
              cursor: "pointer",
              "&::before": {
                content: '""',
                backgroundColor: "#CDC4F6",
                minHeight: 30,
                width: "5px",
                position: "absolute",
                left: 0,
                opacity: 0,
                borderRadius: "1px",
              },
              "&:hover::before": {
                opacity: 1,
              },
              "&:hover": {
                backgroundColor: "#473956",
              },
            }}
          >
            <SettingsIcon style={{ color: "white" }} />
            <Typography sx={{ pl: 1, fontSize: "15px", color: "white" }}>
              Settings
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: `${open ? "flex" : "none"}`,
              pl: 1.5,
              minHeight: 45,
              cursor: "pointer",
              "&::before": {
                content: '""',
                backgroundColor: "white",
                minHeight: 30,
                width: "5px",
                position: "absolute",
                left: 0,
                opacity: 0,
                borderRadius: "1px",
              },
              "&:hover::before": {
                opacity: 1,
              },
              "&:hover": {
                backgroundColor: "#473956",
              },
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                "&:hover": {
                  background: "none",
                },
              }}
              onClick={() => {
                signOut({ callbackUrl: "http://localhost:3000/login" });
              }}
            >
              <LogoutIcon style={{ color: "white" }} />
              <Typography sx={{ pl: 1, fontSize: "14px", color: "#FFFFFF" }}>
                Log Out
              </Typography>
            </Button>
          </ListItem>
          <ListItem sx={{ display: `${open ? "block" : "none"}`, mt: 4 }}>
            <AdminProfileCardSideBar />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 0 }}>
        {/* <DrawerHeader /> */}
        <Box
          open={open}
          sx={{
            background: "none",
            boxShadow: 0,
          }}
        >
          <Box>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                color: "#FFFFFF",
                ...(open && { display: "none" }),
              }}
            ></IconButton>
            <Grid
              sx={{ pt: 2 }}
              container
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={4}>
                <Typography
                  variant="h2"
                  component="div"
                  color="#FFFFFF"
                  fontSize={30}
                  fontWeight={600}
                  sx={{ cursor: "pointer", ml: 1 }}
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Grid container spacing={2} item>
                      <Grid item>
                        <CryptoCard title="Real Summary Balance" />
                      </Grid>

                      {/* <Grid item>
                        <CryptoCard
                          title="Paper Trading Balance"
                          rate="B 1 2 3 B 1 2 3 $ 1 2 3"
                          percentage="B 1 2 3 B 1 2 3 $ 1 2 3"
                        />
                      </Grid> */}
                      <Grid item>
                        <AdminProfileCard />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {Component && (
          <div>
            <Component />
          </div>
        )}
      </Box>
    </Box>
  );
}
