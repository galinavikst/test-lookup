"use client";
import { Paper, InputBase } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  onInputChange: (string: string) => void;
}

export default function Search({ onInputChange }: SearchProps) {
  return (
    <Paper
      component="form"
      sx={{
        p: "5px",
        display: "flex",
        alignItems: "center",
        width: "40%",
        minWidth: 265,
        m: "30px auto",
        background: "transparent",
        border: "1px solid #fff",
        color: "#fff",
      }}
    >
      <InputBase
        onChange={(e) => onInputChange(e.target.value.toLocaleLowerCase())}
        sx={{ ml: 1, flex: 1, color: "inherit" }}
        placeholder="Type here..."
      />
      <SearchIcon color="inherit" />
    </Paper>
  );
}
