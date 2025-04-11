import styles from './_mainDash.module.css'
import { TopBar } from '../../layouts/topBar'
import { SideBar } from '../../layouts/sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { Box, Fade, IconButton, Paper, Popper, Typography } from '@mui/material'
import { LoginTwoTone, PermIdentityOutlined, SettingsTwoTone } from "@mui/icons-material";
import { useEffect, useRef, useState } from 'react';
import Breadcrumbs from '../../layouts/breadcrumbs';
export const MainDash = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const buttonRef = useRef(null);
    const popperRef = useRef(null);
    const navigation = {
        items: [
            {
                id: "dashboard",
                title: "Dashboard",
                type: "collapse",
                url: "/dash",
                tamanho: "1.2rem",
                //icon: icons.IconFilePencil,
                target: false,
                children: [
                    {
                        id: "alunos",
                        title: "Alunos",
                        type: "item",
                        //icon: icons.IconHomeEdit,
                        tamanho: "1rem",
                        url: "/dash/alunos",
                        target: false,
                        //children: [
                        //    {
                        //        title: "Bloquear Cartão",
                        //        icon: icons.IconIdOff,
                        //        url: "/condominios/:id/bloquear_cartao",
                        //    }
                        //],
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

    return (
        <div className={styles.corpo}>
            <TopBar>
                <Box
                    ref={buttonRef}
                    onClick={handleClick('bottom-end')}
                    sx={{
                        width: "5.6rem",
                        height: "3.1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        backgroundColor: "#257ae9",
                        border: "solid 2px #257ae9",
                        borderRadius: "40px",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        "&:hover .icon1": {
                            color: "#257ae9"
                        },
                        "&:hover .icon2": {
                            color: "#ffffff"
                        },
                        "&:hover .icon-button": {
                            backgroundColor: "#257ae9"
                        },
                        "&:hover": {
                            backgroundColor: "#ffffff",
                        }
                    }}>
                    <SettingsTwoTone className="icon1" fontSize="inherit" sx={{ fontSize: "1.7rem", color: "#ffffff" }} />
                    <IconButton sx={{
                        backgroundColor: "#ffffff",
                        p: 0,
                        width: "2.3rem",
                        height: "2.3rem",
                    }}
                        className="icon-button">
                        <PermIdentityOutlined className="icon2" fontSize="inherit" sx={{ fontSize: "1.7rem", color: "#257ae9" }} />
                    </IconButton>
                </Box>
                <Popper
                    ref={popperRef}
                    sx={{ zIndex: 1200 }}
                    open={open}
                    anchorEl={anchorEl}
                    placement={placement}
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper sx={{
                                marginTop: 2,
                                p: 3,
                                borderRadius: "20px",
                                width: "auto", border: "none",
                                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Typography sx={{ borderBottom: "solid rgb(211, 211, 211) 1px" }}>
                                    João Vitor Pereira de Souza
                                </Typography>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    gap: 3,
                                    width: "100%",
                                    cursor: "pointer",
                                    p: 2,
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: "10px"
                                    }
                                }}>
                                    <PermIdentityOutlined />
                                    <Typography variant='h7'>
                                        Perfil
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    gap: 3,
                                    cursor: "pointer",
                                    p: 2,
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: "10px"
                                    }
                                }}
                                    onClick={() => navigate("/")}
                                >
                                    <LoginTwoTone />
                                    <Typography variant='h7'>
                                        Sair
                                    </Typography>
                                </Box>
                            </Paper>
                        </Fade>
                    )}
                </Popper>

            </TopBar>
            <SideBar>
            <Breadcrumbs
                navigation={navigation}
                icons
                title
                rightAlign
            />
            teste conteudo
            <Outlet />
            </SideBar>
        </div>
    )
}