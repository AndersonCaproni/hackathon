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
    const [ativoBot, setAtivoBot] = useState(false);
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
    const [listaMensagem, setListaMensagem] = useState([{ user_id: 'IAPADRAOCHATUNICOESTE', name: 'Chat IA', mensagens: [] }])
    const [chatSelecionado, setChatSelecionado] = useState('IAPADRAOCHATUNICOESTE')
    const [loadingResposta, setLoadingResposta] = useState(false)
    const [loadingSupremo, setLoadingSupremo] = useState(false)
    const [mensagemBot, setMensagemBot] = useState([{ tipo: 'pergunta', mensagem: `ddddddddddd ddddddddddddddd dddddddddd dddddddddddddd dddddd dddddd ddddddd ddddd ddddd dddddd dddddddd ddddddddddddd ddddd dddddd dddddd ddd dddd ddddd dddddddddd dd dddd dddddd dddd ddddd ddddddd ddddddd ddddd dddddd dddd ddddddddd dddddd ddddddd dddd dddd ddddd ddd dddddd dddddddd dddddd ddddddd dddddddddddddd ddddddd ddddddd ddddddd dddddddd dddddd dddd dddddddd ddddddd dddd ddddd dddddddddddd dddddddd dddd ddd dddddddd dd ddddddddddd dddddddd dd dddd ddd dddddd dddd dddddd ddddddddd dddddd ddddd dddddd ddddd dddddd ddddd ddd d ddddd ddddd d ddddddddddddd dd ddd ddd ddddd dd dddd ddd` }, { tipo: 'resposta', mensagem: `ddddddddddd ddddddddddddddd dddddddddd dddddddddddddd dddddd dddddd ddddddd ddddd ddddd dddddd dddddddd ddddddddddddd ddddd dddddd dddddd ddd dddd ddddd dddddddddd dd dddd dddddd dddd ddddd ddddddd ddddddd ddddd dddddd dddd ddddddddd dddddd ddddddd dddd dddd ddddd ddd dddddd dddddddd dddddd ddddddd dddddddddddddd ddddddd ddddddd ddddddd dddddddd dddddd dddd dddddddd ddddddd dddd ddddd dddddddddddd dddddddd dddd ddd dddddddd dd ddddddddddd dddddddd dd dddd ddd dddddd dddd dddddd ddddddddd dddddd ddddd dddddd ddddd dddddd ddddd ddd d ddddd ddddd d ddddddddddddd dd ddd ddd ddddd dd dddd ddd` }]);
    const [perguntaBot, setPerguntaBot] = useState('');
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
                        id: "duvidas",
                        title: "Duvidas",
                        type: "item",
                        icon: MenuBook,
                        tamanho: "1rem",
                        url: "/dash/duvidas",
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

    const corpoRefBot = useRef(null);


    const scrollToBottomBot = () => {
        if (corpoRefBot.current) {
            corpoRefBot.current.scrollTop = corpoRefBot.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottomBot();
    }, [mensagemBot, perguntaBot, ativoBot]);

    useEffect(( ) => {console.log(ativoBot);scrollToBottomBot();},[ativoBot])

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

    const handleCloseBot = () => {
        setAtivoBot(false)
    }

    const hanbleOpenBot = () => {
        setAtivoBot(true)
    }

    return (
        <InfosContext.Provider value={{
            corpoRefBot,
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
            LinearProgress,
            ativoBot,
            setAtivoBot,
            handleCloseBot,
            hanbleOpenBot,
            perguntaBot,
            setPerguntaBot,
            mensagemBot,

        }}>
            {children}
        </InfosContext.Provider>
    );
}

export const useInfos = () => {
    return useContext(InfosContext);
}