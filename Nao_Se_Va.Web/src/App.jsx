import { RouterProvider } from "react-router-dom";
import { route } from "./routes";
import { ThemeProvider } from "@emotion/react";
import theme from "./themes";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster />
            <RouterProvider router={route} />
        </ThemeProvider>
    )
}