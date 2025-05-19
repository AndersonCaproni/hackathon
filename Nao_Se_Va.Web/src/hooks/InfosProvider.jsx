import { useContext, useState, createContext, useEffect, useRef, } from 'react';
import { TopBar } from '../layouts/topBar'
import { SideBar } from '../layouts/sidebar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Fade, IconButton, Paper, Popper, Typography, LinearProgress, Collapse, Tooltip } from '@mui/material'
import {
    LoginTwoTone,
    PermIdentityOutlined,
    SettingsTwoTone,
    People,
    House,
    Person,
    KeyboardArrowDown,
    AutoAwesome,
    KeyboardArrowUp,
    Message,
    MenuBook,
    Sync
} from "@mui/icons-material";
import Breadcrumbs from '../layouts/breadcrumbs';
import Loading from '../components/Loading';
import { LlamaChat } from '../services/ia';
import { obterAlunos } from '../services/unifenas';
import toast from "react-hot-toast";

const InfosContext = createContext();

export const InfosProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openSide, setOpenSide] = useState(true);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const [demaisInformacoes, setDemaisInformacoes] = useState(false)
    const buttonRef = useRef(null);
    const popperRef = useRef(null);
    const [pergunta, setPergunta] = useState("")
    const [listaMensagem, setListaMensagem] = useState([{ user_id: 'IAPADRAOCHATUNICOESTE', nome: 'Chat IA', mensagens: [] }])
    const [chatSelecionado, setChatSelecionado] = useState('IAPADRAOCHATUNICOESTE')
    const [loadingResposta, setLoadingResposta] = useState(false)
    const [loadingSupremo, setLoadingSupremo] = useState(false)
    const navigation = {
        items: [
            {
                id: "dashboard",
                title: "Dashboard",
                type: "collapse",
                url: "/dash",
                tamanho: "1.2rem",
                icon: House,
                target: false,
                children: [
                    {
                        id: "alunos",
                        title: "Alunos",
                        type: "item",
                        icon: People,
                        tamanho: "1rem",
                        url: "/dash/alunos",
                        target: false,
                        children: [
                            {
                                id: "detalhe",
                                title: "Detalhe",
                                type: "item",
                                icon: Person,
                                tamanho: "1rem",
                                url: "/dash/alunos/:id/detalhe",
                                target: false,
                            }
                        ],
                    },
                    {
                        id: "ia",
                        title: "Chat IA",
                        type: "item",
                        icon: AutoAwesome,
                        tamanho: "1rem",
                        url: "/dash/ia",
                        target: false,
                    },

                    {
                        id: "mensagem",
                        title: "Mensagem",
                        type: "item",
                        icon: Message,
                        tamanho: "1rem",
                        url: "/dash/mensagem",
                        target: false,
                    },
                    {
                        id: "curso",
                        title: "Curso",
                        type: "item",
                        icon: MenuBook,
                        tamanho: "1rem",
                        url: "/dash/curso",
                        target: false,
                    },
                    {
                        id: "perfil",
                        title: "Perfil",
                        url: "/dash/perfil",
                        icon: PermIdentityOutlined,
                        type: "label",
                    },
                ],
            }
        ]
    };
    const [alunos, setAlunos] = useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    useEffect(() => {
        setLoadingSupremo(true);
        const fetchData = async () => {
            const local = JSON.parse(localStorage?.getItem("token"));
            setCoordenador(local);
            
            if (local?.access_token) {
                try {
                    const respost = await obterAlunos(local.access_token);
                    setAlunos(respost);
                }
                catch (erro) {
                    console.error(erro);
                    toast.error('Erro ao obter os Alunos, recarregue e tente novamente!')
                }
            }
        };

        fetchData();

        const handleClickOutside = (event) => {
            if (
                popperRef.current &&
                !popperRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        setLoadingSupremo(false);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [coordenador, setCoordenador] = useState({});

    const toggleDrawer = () => {
        setOpenSide(!openSide);
    };

    return (
        <InfosContext.Provider value={{
            Tooltip,
            Collapse,
            KeyboardArrowDown,
            KeyboardArrowUp,
            demaisInformacoes,
            setDemaisInformacoes,
            LinearProgress,
            LlamaChat,
            Loading,
            loadingSupremo,
            setLoadingSupremo,
            location,
            alunos,
            openSide,
            pergunta,
            setPergunta,
            setOpenSide,
            toggleDrawer,
            TopBar,
            coordenador,
            setCoordenador,
            listaMensagem,
            setListaMensagem,
            chatSelecionado,
            setChatSelecionado,
            SideBar,
            Outlet,
            Box,
            Fade,
            IconButton,
            Paper,
            Popper,
            Typography,
            LoginTwoTone,
            Sync,
            PermIdentityOutlined,
            SettingsTwoTone,
            useRef,
            Breadcrumbs,
            navigate,
            anchorEl,
            setAnchorEl,
            open,
            setOpen,
            placement,
            setPlacement,
            buttonRef,
            popperRef,
            navigation,
            handleClick,
            loadingResposta,
            setLoadingResposta,
            Button,
            setAlunos,
            AutoAwesome,
            LinearProgress
        }}>
            {children}
        </InfosContext.Provider>
    );
}

export const useInfos = () => {
    return useContext(InfosContext);
}