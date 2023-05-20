import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  TableBody,
} from "@mui/material";
import React from "react";
import { Refresh } from "../../utils/icons";
import Card from "@mui/material/Card";

const Balances = () => {
  return (
    <Card
      sx={{
        mt: 2,
        boxShadow: "none",
        minHeight: "300px",
        background:
          "linear-gradient(180deg, rgba(121, 13, 131, 0.125) 0%, rgba(41, 8, 77, 0.5) 100%)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "600",
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              Balances
            </TableCell>
            <TableCell
              sx={{ borderRight: "1px solid rgba(255, 255, 255, 0.3)" }}
            ></TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "110px",
                  py: 0.5,
                  px: 1.5,
                  cursor: "pointer",
                  borderRadius: "8px",
                  background:
                    "linear-gradient(97.12deg, #790D83 3.01%, #7A5CFF 92.48%)",
                }}
              >
                <Box
                  sx={{
                    p: 0.5,
                    mr: 0.5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    background:
                      "linear-gradient(97.12deg, #790D83 3.01%, #7A5CFF 92.48%)",
                  }}
                >
                  <Refresh />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "white",
                  }}
                >
                  History
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              sx={{ borderRight: "1px solid rgba(255, 255, 255, 0.3)" }}
            ></TableCell>
            <TableCell
              sx={{
                fontWeight: "600",
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              Reserved
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "600",
              }}
            >
              Available
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                justifyContent: "flex-end",
                display: "flex",
              }}
            >
              BUSD
            </TableCell>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              ***
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              ***
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                justifyContent: "flex-end",
                display: "flex",
              }}
            >
              USDT
            </TableCell>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              ***
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              ***
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                borderBottom: "none",
              }}
            ></TableCell>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                borderBottom: "none",
              }}
            ></TableCell>
            <TableCell sx={{ borderBottom: "none" }}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                borderBottom: "none",
              }}
            ></TableCell>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                borderBottom: "none",
              }}
            ></TableCell>
            <TableCell sx={{ borderBottom: "none" }}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default Balances;
