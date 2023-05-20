import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import SearchBar from "../../widgets/SearchBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  TextField,
  IconButton,
  InputBase,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Edit, Sort } from "../../../utils/icons";
import Modal from "@mui/material/Modal";
import { getSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

const useStyles = makeStyles(() => ({
  input: {
    // width: "685px",
    height: "48px",
    backgroundColor: "#35193C",
    padding: "10px 12px",
    fontSize: 16,
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

// const columns = [
//   {
//     field: "name",
//     headerName: "Name",
//     width: 580,
//     renderHeader: () => {
//       return <strong>{"Name"}</strong>;
//     },
//     renderCell: (cellValues) => {
//       return (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//             }}
//           >
//             <div
//               style={{
//                 padding: 2,
//                 paddingLeft: 4,
//                 paddingRight: 4,
//                 marginRight: 8,
//                 backgroundColor: "#FFFFFF22",
//                 color: "#CCCCCC",
//                 // width: "48px",
//                 // height: "20px",
//                 // left: "222px",
//                 // top: "1502px",

//                 // backgroundColor: "#FFFFFF",
//                 // opacity: 0.6,
//                 backgroundBlendMode: "overlay",
//                 backdropFilter: blur("100px"),
//               }}
//             >
//               {cellValues.row.strategyTime === "short" ? "Short" : "Long"}
//             </div>
//             <div
//               style={{
//                 fontFamily: "Poppins",
//                 fontStyle: "normal",
//                 fontWeight: 400,
//                 fontSize: "16px",
//                 lineHeight: "24px",
//                 color: "#795BFF",
//               }}
//             >
//               {cellValues.row.name}
//             </div>
//           </div>
//           <div>{cellValues.row.description}</div>
//           <div
//             style={{
//               padding: 2,
//               paddingLeft: 4,
//               paddingRight: 4,
//               backgroundColor: "#FFFFFF22",
//               color: "#CCCCCC",
//               width: "206px",
//               // height: "20px",
//               // left: "222px",
//               // top: "1502px",

//               // backgroundColor: "#FFFFFF",
//               // opacity: 0.6,
//               backgroundBlendMode: "overlay",
//               backdropFilter: blur("100px"),
//             }}
//           >
//             {cellValues.row.botType}
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     field: "exchange",
//     headerName: "Exchange",
//     width: 280,
//     renderHeader: () => {
//       return <strong>{"Exchange"}</strong>;
//     },
//     renderCell: (cellValues) => {
//       return (
//         <div
//         // style={{
//         //   fontFamily: "Poppins",
//         //   fontStyle: "normal",
//         //   fontWeight: 400,
//         //   fontSize: "16px",
//         //   lineHeight: "24px",
//         //   color: "#795BFF",
//         // }}
//         >
//           <div
//             style={{
//               fontFamily: "Poppins",
//               fontStyle: "normal",
//               fontWeight: 400,
//               fontSize: "16px",
//               lineHeight: "24px",
//               color: "#795BFF",
//             }}
//           >
//             {cellValues.row.exchange}
//           </div>
//           <div>{cellValues.row.exchange}</div>
//         </div>
//       );
//     },
//   },
//   {
//     field: "pair",
//     headerName: "Pair",
//     width: 220,
//     sortable: false,
//     renderHeader: () => {
//       return <strong>{"Pair"}</strong>;
//     },
//     renderCell: (cellValues) => {
//       return (
//         <div
//           style={{
//             fontFamily: "Poppins",
//             fontStyle: "normal",
//             fontWeight: 400,
//             fontSize: "16px",
//             lineHeight: "24px",
//             color: "#795BFF",
//           }}
//         >
//           {cellValues.row.pair}
//         </div>
//       );
//     },
//   },
//   {
//     field: "activeDeal",
//     width: 160,
//     sortable: false,
//     renderHeader: () => {
//       return <strong>{"Active Deal"}</strong>;
//     },
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     type: "boolean",
//     width: 200,
//     sortable: false,
//     renderHeader: () => {
//       return <strong>{"Status"}</strong>;
//     },
//     renderCell: (cellValues) => {
//       return <AntSwitch checked={cellValues.row.status} />;
//     },
//   },
//   {
//     headerName: "Action",
//     width: 200,
//     sortable: false,
//     renderHeader: () => {
//       return <strong>{"Action"}</strong>;
//     },
//     renderCell: (cellValues) => {
//       return (
//         <div
//           style={{
//             display: "flex",
//             float: "right",
//             justifyContent: "space-between",
//           }}
//         >
//           <div
//             style={{
//               padding: 2,
//               height: "30px",
//               paddingLeft: 5,
//               paddingRight: 5,
//               marginRight: 4,
//               backgroundColor: "#FFFFFF22",
//             }}
//           >
//             <VisibilityIcon />
//           </div>
//           <div
//             style={{
//               padding: 2,
//               height: "30px",
//               paddingLeft: 5,
//               paddingRight: 5,
//               marginRight: 4,
//               backgroundColor: "#FFFFFF22",
//             }}
//           >
//             <EditIcon />
//           </div>
//           <div
//             style={{
//               padding: 2,
//               height: "30px",
//               paddingLeft: 5,
//               paddingRight: 5,
//               backgroundColor: "#F87171",
//             }}
//           >
//             <DeleteIcon />
//           </div>
//         </div>
//       );
//     },
//   },
// ];

const rows = [];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BotsTable = () => {
  const router = useRouter();

  const [value, setValue] = React.useState(0);
  const [tableRow, setTableRow] = React.useState([]);
  const [searchByBotsName, setSearchByBotsName] = React.useState("");
  const [width, setWidth] = React.useState(globalThis?.innerWidth);

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [logs, setLogs] = React.useState("");

  const [loading, setLoading] = React.useState(true);

  const [exchangeArr, setExchangeArr] = React.useState([]);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  const handleSearch = (event) => {
    setSearchByBotsName(event.target.value);
  };
  useEffect(() => {
    fetchStrategy();
  }, []);

  const fetchStrategy = async () => {
    const session = await getSession();
    setExchangeArr(session.user.exchanges);
    const response = await fetch(
      `/api/strategy/get-strategy?id=${session?.user?.id}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    let body = data.body.map((item) => {
      return {
        ...item,
        id: item._id,
      };
    });
    setTableRow(body);
    setLoading(false);
  };

  const handleStatus = async (event, item) => {
    let tableRowIndex = tableRow.findIndex(
      (element) => element._id === item._id
    );
    let newData = [...tableRow];
    let strat = item._id;
    let url = "";
    if (event.target.checked) {
      newData[tableRowIndex].state = "on";
      url = "start";
      newData[tableRowIndex].dealTime.push({
        startTime: new Date(),
        endTime: "",
      });
    } else {
      newData[tableRowIndex].state = "off";
      let index =
        newData[tableRowIndex]?.dealTime?.length > 0
          ? newData[tableRowIndex]?.dealTime?.length - 1
          : -1; // Set initial index as -1

      if (
        index === -1 ||
        typeof newData[tableRowIndex]?.dealTime?.[index] === "undefined"
      ) {
        index = 0; // Assign 0 if index is -1 or undefined
        newData[tableRowIndex].dealTime[index] = {};
      }

      newData[tableRowIndex].dealTime[index] = {
        ...newData[tableRowIndex].dealTime[index],
        endTime: new Date(),
      };

      // newData[tableRowIndex].dealTime[index] = {
      //   ...dealTime[index],
      //   endTime: "20",
      // };
      url = "stop";
    }

    console.log(newData[tableRowIndex]);

    // const response = await fetch(`http://localhost:8000/${url}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ strategyID: item._id }),
    // });
    // const responseData = await response.json();
    // console.log(responseData);
    let reqBody = {
      strategyId: item._id,
      state: newData[tableRowIndex].state,
    };

    const updatedStrategy = await fetch(
      `/api/strategy/put-strategy?id=${item._id}`,
      {
        method: "PUT",
        body: JSON.stringify(newData[tableRowIndex]),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTableRow(newData);

    try {
      const response = await fetch("https://dcabot1.herokuapp.com/" + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // If you need to send a JSON body, uncomment the following line and replace '{}' with the appropriate JSON object
        body: JSON.stringify({ strategyId: strat }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      field: "botName",
      headerName: "Name",
      width: 450,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderHeader: () => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            <strong>{"Name"}</strong>
            <Sort />
          </div>
        );
      },
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(`/DealPage?id=${cellValues.row._id}`);
              }}
            >
              <div
                style={{
                  padding: 2,
                  paddingLeft: 4,
                  paddingRight: 4,
                  marginRight: 8,
                  borderRadius: "4px",
                  marginBottom: "5px",
                  background:
                    cellValues.row.strategyTime === "short"
                      ? "#3A0B15"
                      : "#1E3332",
                  color: "#CCCCCC",
                  // width: "48px",
                  // height: "20px",
                  // left: "222px",
                  // top: "1502px",
                  // backgroundColor: "#FFFFFF",
                  // opacity: 0.6,
                  // backgroundBlendMode: "overlay",
                  // backdropFilter: blur("100px"),
                }}
              >
                {cellValues.row.strategyTime === "short" ? "Short" : "Long"}
              </div>
              <div
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 420,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#795BFF",
                }}
              >
                {cellValues.row.botName}
              </div>
            </div>
            <div>{`TP: ${cellValues?.row?.takeProfitPercent}%, BO: ${cellValues?.row?.orderSize}, SO: ${cellValues?.row?.safetyOrderSize}, OS: ${cellValues?.row?.maxOrders}, `}</div>
            <div
              style={{
                padding: 2,
                paddingLeft: 4,
                marginTop: "7px",
                // paddingRight: 4,
                backgroundColor: "#FFFFFF22",
                color: "#CCCCCC",
                borderRadius: "4px",
                // width: "206px",
                // height: "20px",
                // left: "222px",
                // top: "1502px",

                // backgroundColor: "#FFFFFF",
                // opacity: 0.6,
                backgroundBlendMode: "overlay",
                backdropFilter: blur("100px"),
              }}
            >
              {cellValues.row.botType}
            </div>
          </div>
        );
      },
    },
    {
      field: "exchange",
      headerName: "Exchange",
      width: 220,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderHeader: () => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            <strong>{"Exchange"}</strong>
            <Sort />
          </div>
        );
      },
      renderCell: (cellValues) => {
        const exchange = exchangeArr.find(
          (item) => item._id === cellValues.row.exchange
        );
        return (
          <div
          // style={{
          //   fontFamily: "Poppins",
          //   fontStyle: "normal",
          //   fontWeight: 400,
          //   fontSize: "16px",
          //   lineHeight: "24px",
          //   color: "#795BFF",
          // }}
          >
            <div
              style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#795BFF",
              }}
            >
              {exchange?.exchangeName}
            </div>
            <div>{exchange?.exchangeName}</div>
          </div>
        );
      },
    },
    {
      field: "pair",
      headerName: "Pair",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return <strong>{"Pair"}</strong>;
      },
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#795BFF",
            }}
          >
            {cellValues.row.strategyPair}
          </div>
        );
      },
    },
    {
      field: "activeDeal",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return <strong>{"Active Deal"}</strong>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      type: "boolean",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return <strong>{"Status"}</strong>;
      },
      renderCell: (cellValues) => {
        return (
          <AntSwitch
            // color={
            //   cellValues.row.status
            //     ? "linear-gradient(to right,#790D83,#7A5CFF)"
            //     : "#5A2B6A"
            // }
            checked={cellValues?.row?.state === "on" ? true : false}
            onChange={() => handleStatus(event, cellValues.row)}
          />
        );
      },
    },
    {
      headerName: "Action",
      width: 170,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return <strong>{"Action"}</strong>;
      },
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              display: "flex",
              float: "right",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                padding: 2,
                height: "30px",
                paddingLeft: 5,
                paddingRight: 5,
                marginRight: 4,
                borderRadius: "5px",
                backgroundColor: "#5B2A6D",
                cursor: "pointer",
              }}
              onClick={() => {
                handleViewModal(cellValues?.row);
              }}
            >
              <VisibilityIcon />
            </div>
            <div
              style={{
                padding: 4,
                height: "30px",
                width: "35px",
                paddingLeft: 6,
                marginRight: 4,
                borderRadius: "5px",
                backgroundColor: "#5B2A6D",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(`/bot-edit?id=${cellValues.row._id}`);
              }}
            >
              <Edit
                viewBox="0 0 15 15"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div
              style={{
                padding: 2,
                height: "30px",
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: "5px",
                backgroundColor: "#CB5F5F",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(cellValues.row)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  // React.useEffect(() => {
  //   setTableRow(rows);
  // }, []);

  React.useEffect(() => {
    switch (value) {
      case 0:
        setTableRow(rows);
        break;
      case 1:
        setTableRow(rows.filter((item) => item.status === true));
        break;
      case 2:
        setTableRow(rows.filter((item) => item.status === false));
        break;
      case 3:
        setTableRow(rows.filter((item) => item.strategyTime === "short"));
        break;
      case 4:
        setTableRow(rows.filter((item) => item.strategyTime === "long"));
        break;
      case 5:
        setTableRow(rows.filter((item) => item.exchange === "Binance"));
        break;
      case 6:
        setTableRow(
          rows.filter((item) => item.exchange === "Binance Futures USDT-M")
        );
        break;
      default:
        break;
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const handleDelete = async (newValue, event) => {
    setTableRow(tableRow.filter((item) => item.id !== newValue.id));

    await fetch("/api/strategy/delete-strategy", {
      method: "DELETE",
      body: JSON.stringify({ strategyId: newValue._id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleClearFilter = () => {
    setTableRow(rows);
  };
  const handleViewModal = async (row) => {
    const session = await getSession();
    setLogs(row.logs);
    setSelectedRow(row);
    setShowModal(true);

    const response = await fetch(
      `/api/strategy/get-strategy?id=${session?.user?.id}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    let filteredBot = data.body.filter((item) => item?._id === row._id);
    setLogs(filteredBot[0].logs);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleRefresh = async () => {
    const session = await getSession();
    const response = await fetch(
      `/api/strategy/get-strategy?id=${session?.user?.id}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    let filteredBot = data.body.filter((item) => item?._id === selectedRow._id);
    setLogs(filteredBot[0].logs);
  };

  const classes = useStyles();
  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2.5,
          minWidth: "100%",
          my: 5.5,
        }}
      >
        <Button
          sx={{
            background: "linear-gradient(to right,#790D83,#7A5CFF)",
            textTransform: "none",
            border: "none",
            transition: "transform 0.2s",
            borderRadius: "5px",
            padding: "8px 15px",
            "&:hover": {
              transform: "scale(0.95)",
              backgroundColor: "linear-gradient(to right,#790D83,#7A5CFF)",
              cursor: "pointer",
            },
          }}
        >
          <Typography sx={{ color: "white", fontSize: "13px" }}>
            {" "}
            Stop All Bots
          </Typography>
        </Button>
        <Button
          sx={{
            background: "linear-gradient(to right,#790D83,#7A5CFF)",
            textTransform: "none",
            border: "none",
            transition: "transform 0.2s",
            borderRadius: "5px",
            padding: "8px 15px",
            "&:hover": {
              transform: "scale(0.95)",
              backgroundColor: "linear-gradient(to right,#790D83,#7A5CFF)",
              cursor: "pointer",
            },
          }}
        >
          <Typography sx={{ color: "white", fontSize: "13px" }}>
            {" "}
            Start All Bots
          </Typography>
        </Button>
        <Button
          sx={{
            background: "linear-gradient(to right,#790D83,#7A5CFF)",
            textTransform: "none",
            border: "none",
            transition: "transform 0.2s",
            borderRadius: "5px",
            padding: "8px 15px",
            "&:hover": {
              transform: "scale(0.95)",
              backgroundColor: "linear-gradient(to right,#790D83,#7A5CFF)",
              cursor: "pointer",
            },
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            {" "}
            Sell At Market All Bots
          </Typography>
        </Button>
      </Container>
      <Container
        sx={{
          background: "#2C162F",
          borderRadius: 2,
          p: 3,
          marginTop: 5,
          marginBottom: 5,
          disableGutters: true,
        }}
        component="main"
        maxWidth="100%"
      >
        <Modal open={showModal} onClose={handleModalClose}>
          <Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                // overflowY: "scroll",
                width: 700,
                maxHeight: 600,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Grid container justifyContent="space-between">
                <Grid>
                  <Typography sx={{ fontWeight: 650, fontSize: "2rem" }}>
                    Logs
                  </Typography>
                </Grid>
                <Grid>
                  <Button onClick={handleRefresh}>Refresh</Button>
                </Grid>
              </Grid>
              <Box
                sx={{
                  overflowY: "scroll",
                  width: 650,
                  maxHeight: 450,
                  "&::-webkit-scrollbar": {
                    width: "0.4em",
                  },
                  "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.1)",
                    outline: "1px solid slategrey",
                  },
                }}
              >
                <p dangerouslySetInnerHTML={{ __html: logs }}></p>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            marginBottom: 5,
            "& .MuiTabs-indicator": {
              backgroundColor: "white",
            },
          }}
        >
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="All"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Enabled"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Disabled"
            {...a11yProps(2)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Short"
            {...a11yProps(3)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Long"
            {...a11yProps(4)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Binance"
            {...a11yProps(5)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Binance Futures USDT-M"
            {...a11yProps(6)}
          />
        </Tabs>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4} xl={4}>
            <InputBase
              placeholder="Search by bot's name"
              sx={{
                minWidth: "100%",
                height: "38px",
                background: "#ffffff1f",
                borderRadius: "3px",
                fontSize: 16,
              }}
              value={searchByBotsName}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    style={{
                      color: "white",
                      paddingRight: "0px",
                      paddingLeft: "5px",
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={5} sm={5} xl={6}>
            <InputBase
              placeholder="Pairs"
              sx={{
                minWidth: "100%",
                height: "38px",
                paddingLeft: "10px",
                background: "#ffffff1f",
                borderRadius: "3px",
                fontSize: 16,
              }}
            />
          </Grid>
          <Grid item xs={3} sm={3} xl={2}>
            <Button
              sx={{
                background: "linear-gradient(to right,#790D83,#7A5CFF)",
                textTransform: "none",
                border: "none",
                transition: "transform 0.2s",
                borderRadius: "7px",
                padding: "6px 15px",
                width: "100%",
                "&:hover": {
                  transform: "scale(0.95)",
                  backgroundColor: "linear-gradient(to right,#790D83,#7A5CFF)",
                  cursor: "pointer",
                },
              }}
              variant="contained"
              onClick={handleClearFilter}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
        {/* <Box sx={{ height: 709, disableGutters: true, width: "100%"}}> */}
        <Box
          sx={{
            width: "100%",
            ...(width >= 1600 && {
              width: "100%",
              pl: 7,
              pr: 5,
            }),
            ...(width >= 1800 && {
              width: "100%",
              pl: 14,
              pr: 14,
            }),
          }}
        >
          <Box
            sx={{
              "::-webkit-scrollbar-vertical": {
                display: "none",
              },
              // minWidth: "100%",
              px: 0,
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 40,
                  marginBottom: 20,
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <DataGrid
                sx={{
                  ".MuiDataGrid-columnSeparator": {
                    display: "none",
                  },
                  "&.MuiDataGrid-root": {
                    border: "none",
                  },
                  " & .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  ".MuiDataGrid-cell:focus-within": {
                    outline: "none !important",
                  },
                  ".MuiDataGrid-row.Mui-even": {
                    backgroundColor: "#2D1537",
                    backgroundBlendMode: "overlay",
                  },
                  height: 710,
                  // minWidth: "100%",
                  padding: 0,
                  marginTop: 5,
                }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0
                    ? "Mui-even"
                    : "Mui-odd"
                }
                rowHeight={"110px"}
                rows={tableRow}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
              />
            )}
          </Box>
        </Box>
        {/* </Box> */}
      </Container>
    </>
  );
};

export default BotsTable;
