"use client"

import { muiTheme } from "@/service/theme.service";
import { store } from "@/store/store";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  )
}