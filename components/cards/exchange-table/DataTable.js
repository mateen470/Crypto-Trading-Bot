import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Sort } from "../../../utils/icons";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
const DataTable = ({ data, columns, rowsPerPage = 10 }) => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({ field: null, direction: null });

  const handleSortClick = (field) => {
    if (sort.field === field) {
      setSort({
        ...sort,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSort({ field, direction: "asc" });
    }
  };

  const sortedData = sort.field
    ? [...data].sort((a, b) => {
        if (sort.direction === "asc") {
          return a[sort.field] > b[sort.field] ? 1 : -1;
        } else {
          return a[sort.field] < b[sort.field] ? 1 : -1;
        }
      })
    : data;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const tableCellStyle = {
    whiteSpace: "normal",
    wordWrap: "break-word",
    maxWidth: "100px",
    border: "none",
    // paddingLeft: "10px",
    fontSize: "14px",
  };
  const firstTableCellStyle = {
    whiteSpace: "normal",
    wordWrap: "break-word",
    maxWidth: "100px",
    border: "none",
    // paddingLeft: "20px",
    borderTopLeftRadius: "15px",
    fontSize: "15px",
  };

  return (
    <Box
      sx={{
        width: "49vw",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "rgba(41, 8, 77, 0.42)",
        border: "none",
        borderRadius: "8px",
        pt: 2,
        mt: 3,
      }}
    >
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field} style={{ paddingRight: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pb: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "13px" }}>
                    {column.title}
                  </Typography>
                  {column.sortable && (
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        margin: "0px 0px 0px 5px",
                        padding: "0px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSortClick(column.field)}
                    >
                      <Sort />
                    </button>
                  )}
                </Box>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff15" : "none",
                  height: "60px",
                }}
              >
                {columns.map((column) => {
                  return (
                    <td
                      key={column.field}
                      style={
                        column.field === "token"
                          ? firstTableCellStyle
                          : tableCellStyle
                      }
                    >
                      {column.field === "change" ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {parseFloat(row[column.field]) === 0 ? (
                            <span
                              style={{ color: "white", paddingLeft: "15%" }}
                            ></span>
                          ) : row[column.field] !== 0 ? (
                            row[column.field] > 0 ? (
                              <span style={{ color: "green" }}>+</span>
                            ) : (
                              <span style={{ color: "red" }}>-</span>
                            )
                          ) : (
                            <span
                              style={{ color: "white", paddingLeft: "15%" }}
                            ></span>
                          )}
                          <Box
                            sx={{
                              color:
                                row[column.field] !== 0
                                  ? row[column.field] > 0
                                    ? "#4BD469"
                                    : "#EB5757"
                                  : "white",
                            }}
                          >
                            {parseFloat(row[column.field]) === 0
                              ? "0 %"
                              : `${Math.abs(row[column.field])} %`}
                          </Box>
                          {parseFloat(row[column.field]) === 0 ? (
                            <span
                              style={{ color: "white", paddingLeft: "15%" }}
                            ></span>
                          ) : row[column.field] !== 0 ? (
                            row[column.field] > 0 ? (
                              <NorthIcon
                                sx={{
                                  fontSize: "15px !important",
                                  color: "#4BD469",
                                }}
                              />
                            ) : (
                              <SouthIcon
                                sx={{
                                  fontSize: "15px !important",
                                  color: "#EB5757",
                                }}
                              />
                            )
                          ) : (
                            ""
                          )}
                          {/* {row[column.field] !== 0 ? (
                          row[column.field] > 0 ? (
                            <span style={{ color: "green" }}>+</span>
                          ) : (
                            <span style={{ color: "red" }}>-</span>
                          )
                        ) : (
                          <span
                            style={{
                              color: "white",
                              paddingLeft: "15%",
                            }}
                          ></span>
                        )}
                        <Box
                          sx={{
                            color:
                              row[column.field] !== 0
                                ? row[column.field] > 0
                                  ? "#4BD469"
                                  : "#EB5757"
                                : "white",
                          }}
                        >
                          {Math.abs(row[column.field])}%
                        </Box>
                        {row[column.field] !== 0 ? (
                          row[column.field] > 0 ? (
                            <NorthIcon
                              sx={{
                                fontSize: "15px !important",
                                color: "#4BD469",
                              }}
                            />
                          ) : (
                            <SouthIcon
                              sx={{
                                fontSize: "15px !important",
                                color: "#EB5757",
                              }}
                            />
                          )
                        ) : (
                          ""
                        )} */}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {row[column.field]}
                        </Box>
                      )}
                      {/* {row[column.field]} */}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
        <tfoot></tfoot>
      </table>
      <Box sx={{ display: "flex", justifyContent: "flex-end", pb: 7, pr: 4 }}>
        <Box
          sx={{
            marginTop: "2rem",
            border: "0.7px solid grey",
            borderRadius: "3px",
            borderTopLeftRadius: "10px",
          }}
        >
          <button
            onClick={() => handleChangePage(null, page - 1)}
            disabled={page === 0}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 10px",
            }}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
            <button
              key={p}
              onClick={() => handleChangePage(null, p)}
              style={{
                fontWeight: page === p ? "bold" : "normal",
                backgroundColor: page === p ? "#999999" : "transparent",
                border: "0.7px solid grey",
                borderTop: "none",
                borderBottom: "none",
                padding: "8px 10px",
                cursor: "pointer",
              }}
            >
              {p + 1}
            </button>
          ))}
          <button
            onClick={() => handleChangePage(null, page + 1)}
            disabled={page === totalPages - 1}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 10px",
            }}
          >
            Next
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
