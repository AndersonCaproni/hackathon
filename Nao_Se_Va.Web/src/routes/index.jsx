import { createBrowserRouter } from "react-router-dom";
import { MainView } from "../views/mainView";
import { Home } from "../views/home";
import { Login } from "../views/login/login";
import { MainDash } from "../views/mainDash";
import { InfosProvider } from "../hooks/InfosProvider";
import { ListAlunos } from "../views/mainDash/alunos/list";
import { DetalheAluno } from "../views/mainDash/alunos/detail";
import Chat from "../views/mainDash/chat/chat";
import Curso from "../views/mainDash/curso";
import Mensagem from "../views/mainDash/mensagem";

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
                    <InfosProvider>
                        <MainDash />
                    </InfosProvider>,
                children: [
                    {
                        path: "/dash/alunos",
                        children:[
                            {
                                path: "/dash/alunos",
                                element: <ListAlunos/>
                            },
                            {
                                path: "/dash/alunos/:id/detalhe",
                                element: <DetalheAluno/>
                            },
                        ]
                    },
                    {
                        path: "/dash/curso",
                        element: <Curso/>
                    },
                    {
                        path: "/dash/mensagem",
                        element: <Mensagem/>
                    },
                    {
                        path: "/dash/ia",
                        element: <Chat/>
                    },
                    
                ],
            },
        ]
    }
])