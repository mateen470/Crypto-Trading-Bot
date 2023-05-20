import React, { useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  IconButton,
  InputBase,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    props?.setInputSearch(event.target.value);
  };
  return (
    <InputBase
      placeholder="Search…"
      sx={{
        minWidth: "200px",
        height: "38px",
        background: "#ffffff1f",
        borderRadius: "3px",
        // padding: '10px 12px',
        fontSize: 16,
      }}
      value={props?.inputSearch}
      onChange={handleSearch}
      startAdornment={
        <InputAdornment position="start">
          <IconButton
            style={{ color: "white", paddingRight: "0px", paddingLeft: "5px" }}
          >
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default SearchBar;
