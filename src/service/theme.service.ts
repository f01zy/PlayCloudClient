"use client"

import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        colorInfo: {
          backgroundColor: "gray",
          color: "black"
        }
      }
    }
  }
});