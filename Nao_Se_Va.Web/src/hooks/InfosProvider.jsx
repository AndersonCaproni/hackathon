import { useContext, useState, createContext, useEffect, useRef, } from 'react';
import { TopBar } from '../layouts/topBar'
import { SideBar } from '../layouts/sidebar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Fade, IconButton, Paper, Popper, Typography, LinearProgress, Collapse  } from '@mui/material'
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
    MenuBook
} from "@mui/icons-material";
import Breadcrumbs from '../layouts/breadcrumbs';
import Loading from '../components/Loading';
import {LlamaChat} from '../services/ia';

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
    const [listaMensagem, setListaMensagem] = useState([])
    const [loadingResposta, setLoadingResposta] = useState(false)
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
                        title: "Perfil",
                        url: "/perfil",
                        //icon: icons.IconUser,
                        type: "label",
                    },
                ],
            }
        ]
    };
    const [alunos, setAlunos] = useState([
        {
            id: 2,
            nome: 'João Pedro Lima Ferreira OLiveira de Braga Macial',
            email: 'joaopedro.lima@gmail.com',
            curso: 'Engenharia de Software',
            periodo: 3,
            possibilidadeDeEvasao: 10,
            ultimoAcesso: '2025-03-18',
            frequencia: 92,
            matricula: '2022103456',
            dataNascimento: '2001-06-25',
            situacao: 'Ativo',
            mediaGeral: 8.4,
            disciplinasReprovadas: 0,
            cargaHorariaCumprida: 960,
            cargaHorariaTotal: 3200,
            turno: 'Matutino',
            modalidade: 'EAD',
            endereco: {
                cidade: 'Belo Horizonte',
                estado: 'MG',
                bairro: 'Savassi'
            },
            telefone: '(31) 98888-4567',
            responsavelFinanceiro: 'Mariana Ferreira',
            bolsista: false,
            TipoBolsa: null,
            NotaENEM: 750,
            ParticipaMonitoria: true,
            AtividadesExtracurriculares: ['Monitoria', 'Hackathon'],
            ultimaDisciplinaAcessada: 'Ciência da Computação',
            horasComplementaresAcumuladas: 90,
            DocumentosPendentes: [],
            AlertaPedagogico: false
        },
        {
            id: 3,
            nome: 'Beatriz Santos Oliveira',
            email: 'bia.santos@gmail.com',
            curso: 'Design Digital',
            periodo: 5,
            possibilidadeDeEvasao: 45,
            ultimoAcesso: '2025-02-22',
            frequencia: 68,
            matricula: '2020087890',
            dataNascimento: '1999-11-10',
            situacao: 'Ativo',
            mediaGeral: 6.5,
            disciplinasReprovadas: 3,
            cargaHorariaCumprida: 1600,
            cargaHorariaTotal: 3200,
            turno: 'Vespertino',
            modalidade: 'EAD',
            endereco: {
                cidade: 'Fortaleza',
                estado: 'CE',
                bairro: 'Aldeota'
            },
            telefone: '(85) 97777-3344',
            responsavelFinanceiro: 'Ela mesma',
            bolsista: true,
            TipoBolsa: 'Desempenho Acadêmico',
            NotaENEM: 680,
            ParticipaMonitoria: false,
            AtividadesExtracurriculares: ['Grupo de Design Social'],
            ultimaDisciplinaAcessada: 'Design de Interfaces',
            horasComplementaresAcumuladas: 60,
            DocumentosPendentes: ['Comprovante de Residência'],
            AlertaPedagogico: true
        },
        {
            id: 1,
            nome: 'Ana Maria de Souza Praga',
            email: 'anamaria@gmail.com',
            curso: 'Ciências da Computação',
            periodo: 1,
            possibilidadeDeEvasao: 30,
            ultimoAcesso: '2025-03-01',
            frequencia: 85,
            matricula: '2023102541',
            dataNascimento: '2002-03-12',
            situacao: 'Ativo',
            mediaGeral: 7.8,
            disciplinasReprovadas: 1,
            cargaHorariaCumprida: 480,
            cargaHorariaTotal: 3200,
            turno: 'Noturno',
            modalidade: 'Presencial',
            endereco: {
                cidade: 'São Paulo',
                estado: 'SP',
                bairro: 'Moema'
            },
            telefone: '(11) 99999-1234',
            responsavelFinanceiro: 'Carlos Praga',
            bolsista: true,
            TipoBolsa: 'ProUni Parcial',
            NotaENEM: 720,
            ParticipaMonitoria: false,
            AtividadesExtracurriculares: ['Iniciação Científica'],
            ultimaDisciplinaAcessada: 'Algoritmos e Estruturas de Dados',
            horasComplementaresAcumuladas: 35,
            DocumentosPendentes: ['RG', 'Histórico Escolar'],
            AlertaPedagogico: true
        },
        {
            id: 4,
            nome: 'Lucas Matheus Ribeiro Silva',
            email: 'lucas.ribeiro@gmail.com',
            curso: 'Análise e Desenvolvimento de Sistemas',
            periodo: 2,
            possibilidadeDeEvasao: 15,
            ultimoAcesso: '2025-04-10',
            frequencia: 88,
            matricula: '2023098765',
            dataNascimento: '2003-02-05',
            situacao: 'Ativo',
            mediaGeral: 7.9,
            disciplinasReprovadas: 1,
            cargaHorariaCumprida: 640,
            cargaHorariaTotal: 2000,
            turno: 'Noturno',
            modalidade: 'EAD',
            endereco: {
                cidade: 'Curitiba',
                estado: 'PR',
                bairro: 'Batel'
            },
            telefone: '(41) 99999-1122',
            responsavelFinanceiro: 'Patrícia Silva',
            bolsista: false,
            TipoBolsa: null,
            NotaENEM: 705,
            ParticipaMonitoria: false,
            AtividadesExtracurriculares: ['Voluntariado em TI'],
            ultimaDisciplinaAcessada: 'Banco de Dados',
            horasComplementaresAcumuladas: 40,
            DocumentosPendentes: [],
            AlertaPedagogico: false
        },
        {
            id: 5,
            nome: 'Carla Menezes Tavares',
            email: 'carla.tavares@gmail.com',
            curso: 'Administração',
            periodo: 6,
            possibilidadeDeEvasao: 65,
            ultimoAcesso: '2025-04-12',
            frequencia: 59,
            matricula: '2020056743',
            dataNascimento: '1998-08-14',
            situacao: 'Trancado',
            mediaGeral: 6.1,
            disciplinasReprovadas: 4,
            cargaHorariaCumprida: 1920,
            cargaHorariaTotal: 3200,
            turno: 'Noturno',
            modalidade: 'EAD',
            endereco: {
                cidade: 'Salvador',
                estado: 'BA',
                bairro: 'Barra'
            },
            telefone: '(71) 98888-9988',
            responsavelFinanceiro: 'Ela mesma',
            bolsista: true,
            TipoBolsa: 'FIES',
            NotaENEM: 640,
            ParticipaMonitoria: false,
            AtividadesExtracurriculares: [],
            ultimaDisciplinaAcessada: 'Contabilidade Empresarial',
            horasComplementaresAcumuladas: 30,
            DocumentosPendentes: ['Declaração de Trancamento'],
            AlertaPedagogico: true
        },
        {
            id: 6,
            nome: 'Diego Ramos Nascimento',
            email: 'diego.nascimento@gmail.com',
            curso: 'Sistemas de Informação',
            periodo: 8,
            possibilidadeDeEvasao: 0,
            ultimoAcesso: '2025-04-01',
            frequencia: 97,
            matricula: '2019011222',
            dataNascimento: '2000-12-03',
            situacao: 'Concluído',
            mediaGeral: 8.7,
            disciplinasReprovadas: 0,
            cargaHorariaCumprida: 3200,
            cargaHorariaTotal: 3200,
            turno: 'Matutino',
            modalidade: 'EAD',
            endereco: {
                cidade: 'Porto Alegre',
                estado: 'RS',
                bairro: 'Centro Histórico'
            },
            telefone: '(51) 97777-0001',
            responsavelFinanceiro: 'Eduardo Nascimento',
            bolsista: true,
            TipoBolsa: 'ProUni Integral',
            NotaENEM: 810,
            ParticipaMonitoria: true,
            AtividadesExtracurriculares: ['Monitoria', 'Empresa Júnior'],
            ultimaDisciplinaAcessada: 'Projeto de TCC II',
            horasComplementaresAcumuladas: 130,
            DocumentosPendentes: [],
            AlertaPedagogico: false
        },
        {
            id: 7,
            nome: 'Fernanda Alves Corrêa',
            email: 'fernanda.correa@gmail.com',
            curso: 'Pedagogia',
            periodo: 4,
            possibilidadeDeEvasao: 35,
            ultimoAcesso: '2025-04-18',
            frequencia: 73,
            matricula: '2021064455',
            dataNascimento: '2002-05-21',
            situacao: 'Ativo',
            mediaGeral: 7.2,
            disciplinasReprovadas: 2,
            cargaHorariaCumprida: 1280,
            cargaHorariaTotal: 3200,
            turno: 'Vespertino',
            modalidade: 'EAD',
            endereco: {
                cidade: 'Recife',
                estado: 'PE',
                bairro: 'Boa Viagem'
            },
            telefone: '(81) 96666-7777',
            responsavelFinanceiro: 'Paulo Corrêa',
            bolsista: false,
            TipoBolsa: null,
            NotaENEM: 690,
            ParticipaMonitoria: false,
            AtividadesExtracurriculares: ['Projeto de Leitura nas Escolas'],
            ultimaDisciplinaAcessada: 'Didática e Prática de Ensino',
            horasComplementaresAcumuladas: 55,
            DocumentosPendentes: ['Comprovante de Vacinação'],
            AlertaPedagogico: true
        },
        {
            id: 8,
            nome: 'Lucas Henrique Martins',
            email: 'lucas.h.martins@hotmail.com',
            curso: 'Engenharia Civil',
            periodo: 2,
            possibilidadeDeEvasao: 82,
            ultimoAcesso: '2025-03-10',
            frequencia: 45,
            matricula: '2022078899',
            dataNascimento: '2004-08-12',
            situacao: 'Ativo',
            mediaGeral: 5.4,
            disciplinasReprovadas: 4,
            cargaHorariaCumprida: 400,
            cargaHorariaTotal: 3600,
            turno: 'Noturno',
            modalidade: 'EAD',
            endereco: {
                cidade: 'Fortaleza',
                estado: 'CE',
                bairro: 'Meireles'
            },
            telefone: '(85) 98888-1234',
            responsavelFinanceiro: 'Maria Martins',
            bolsista: true,
            TipoBolsa: 'ProUni Parcial',
            NotaENEM: 610,
            ParticipaMonitoria: false,
            AtividadesExtracurriculares: [],
            ultimaDisciplinaAcessada: 'Mecânica Geral',
            horasComplementaresAcumuladas: 12,
            DocumentosPendentes: ['Histórico Escolar', 'CPF'],
            AlertaPedagogico: true
        },
        {
            id: 9,
            nome: 'Juliana Souza Lima',
            email: 'juliana.lima@aluno.edu.br',
            curso: 'Direito',
            periodo: 6,
            possibilidadeDeEvasao: 5,
            ultimoAcesso: '2025-04-15',
            frequencia: 98,
            matricula: '2020052311',
            dataNascimento: '2001-03-30',
            situacao: 'Ativo',
            mediaGeral: 9.1,
            disciplinasReprovadas: 0,
            cargaHorariaCumprida: 1920,
            cargaHorariaTotal: 3600,
            turno: 'Matutino',
            modalidade: 'EAD',
            endereco: {
                cidade: 'Salvador',
                estado: 'BA',
                bairro: 'Itaigara'
            },
            telefone: '(71) 97777-4567',
            responsavelFinanceiro: 'Ela mesma',
            bolsista: true,
            TipoBolsa: 'Bolsa Mérito Acadêmico Integral',
            NotaENEM: 780,
            ParticipaMonitoria: true,
            AtividadesExtracurriculares: ['Grupo de Estudos Jurídicos', 'Debate Simulado'],
            ultimaDisciplinaAcessada: 'Direito Constitucional',
            horasComplementaresAcumuladas: 130,
            DocumentosPendentes: [],
            AlertaPedagogico: false
        },
        {
            id: 10,
            nome: 'Rafael Oliveira Mendes',
            email: 'rafael.mendes@yahoo.com',
            curso: 'Administração',
            periodo: 3,
            possibilidadeDeEvasao: 48,
            ultimoAcesso: '2025-03-05',
            frequencia: 67,
            matricula: '2021093344',
            dataNascimento: '2003-11-02',
            situacao: 'Ativo',
            mediaGeral: 6.5,
            disciplinasReprovadas: 3,
            cargaHorariaCumprida: 800,
            cargaHorariaTotal: 3200,
            turno: 'Vespertino',
            modalidade: 'EAD',
            endereco: {
                cidade: 'Campinas',
                estado: 'SP',
                bairro: 'Barão Geraldo'
            },
            telefone: '(19) 95555-8888',
            responsavelFinanceiro: 'Carlos Mendes',
            bolsista: true,
            TipoBolsa: 'FIES',
            NotaENEM: 620,
            ParticipaMonitoria: false,
            AtividadesExtracurriculares: ['Feira de Empreendedorismo'],
            ultimaDisciplinaAcessada: 'Gestão de Pessoas',
            horasComplementaresAcumuladas: 25,
            DocumentosPendentes: ['RG', 'Comprovante de Residência'],
            AlertaPedagogico: true
        },
        {
            id: 11,
            nome: 'Mariana Castro Silva',
            email: 'mariana.silva@gmail.com',
            curso: 'Ciência da Computação',
            periodo: 5,
            possibilidadeDeEvasao: 22,
            ultimoAcesso: '2025-04-13',
            frequencia: 85,
            matricula: '2020037766',
            dataNascimento: '2000-10-15',
            situacao: 'Ativo',
            mediaGeral: 7.8,
            disciplinasReprovadas: 1,
            cargaHorariaCumprida: 1600,
            cargaHorariaTotal: 3200,
            turno: 'Noturno',
            modalidade: 'EAD',
            endereco: {
                cidade: 'Belo Horizonte',
                estado: 'MG',
                bairro: 'Savassi'
            },
            telefone: '(31) 98888-9999',
            responsavelFinanceiro: 'João Silva',
            bolsista: false,
            TipoBolsa: null,
            NotaENEM: 700,
            ParticipaMonitoria: true,
            AtividadesExtracurriculares: ['Hackathon de Inovação'],
            ultimaDisciplinaAcessada: 'Estrutura de Dados',
            horasComplementaresAcumuladas: 80,
            DocumentosPendentes: [],
            AlertaPedagogico: false
        }
    ]);

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    useEffect(() => {
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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const toggleDrawer = () => {
        setOpenSide(!openSide);
    };

    return (
        <InfosContext.Provider value={{
            Collapse,
            KeyboardArrowDown,
            KeyboardArrowUp,
            demaisInformacoes,
            setDemaisInformacoes,
            LinearProgress,
            LlamaChat,
            Loading,
            location,
            alunos,
            openSide,
            pergunta,
            setPergunta,
            setOpenSide,
            toggleDrawer,
            TopBar,
            listaMensagem, 
            setListaMensagem,
            SideBar,
            Outlet,
            Box,
            Fade,
            IconButton,
            Paper,
            Popper,
            Typography,
            LoginTwoTone,
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
            setAlunos
        }}>
            {children}
        </InfosContext.Provider>
    );
}

export const useInfos = () => {
    return useContext(InfosContext);
}