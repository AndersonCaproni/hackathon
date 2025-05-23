import { createBrowserRouter } from "react-router-dom";
import { MainView } from "../views/mainView";
import { Home } from "../views/home";
import { Login } from "../views/login/login";
import { MainDash } from "../views/mainDash";
import { InfosProvider } from "../hooks/InfosProvider";
import { ListAlunos } from "../views/mainDash/alunos/list";
import { DetalheAluno } from "../views/mainDash/alunos/detail";
import Chat from "../views/mainDash/chat/chat";
import Duvidas from "../views/mainDash/duvidas";
import Mensagem from "../views/mainDash/mensagem";
import Perfil from "../views/mainDash/perfil";
import Dash from "../views/mainDash/dash";
import PrivateRoute from './private'

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
                element:
                    <PrivateRoute>
                        <InfosProvider>
                            <MainDash />
                        </InfosProvider>
                    </PrivateRoute>,
                children: [
                    {
                        path: "/dash",
                        element: <Dash />
                    },
                    {
                        path: "/dash/alunos",
                        children: [
                            {
                                path: "/dash/alunos",
                                element: <ListAlunos />
                            },
                            {
                                path: "/dash/alunos/:id/detalhe",
                                element: <DetalheAluno />
                            },
                        ]
                    },
                    {
                        path: "/dash/duvidas",
                        element: <Duvidas />
                    },
                    {
                        path: "/dash/mensagem",
                        element: <Mensagem />
                    },
                    {
                        path: "/dash/ia",
                        element: <Chat />
                    },
                    {
                        path: "/dash/perfil",
                        element: <Perfil />
                    },
                ],
            },
        ]
    }
])