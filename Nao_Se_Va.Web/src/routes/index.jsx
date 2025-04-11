import { createBrowserRouter } from "react-router-dom";
import { MainView } from "../views/mainView";
import { Home } from "../views/home";
import { Login } from "../views/login/login";
import { MainDash } from "../views/mainDash";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <MainView />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/dash",
                element: <MainDash />,
                children: [
                    {
                        path: "/dash/alunos",
                        element: <>oi</>,
                    },
                ],
            },
        ]
    }
])