import styles from './_mainDash.module.css'
import { TopBar } from '../../layouts/topBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { Box, Fade, IconButton, Paper, Popper, Typography } from '@mui/material'
import { LoginTwoTone, PermIdentityOutlined, SettingsTwoTone } from "@mui/icons-material";
import { useEffect, useRef, useState } from 'react';
export const MainDash = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const buttonRef = useRef(null);
    const popperRef = useRef(null);

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
            <TopBar
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    padding: "0 20px",
                    boxShadow: "0 0 10px rgba(0,0,0)"
                }}
            >
                <Box
                    ref={buttonRef}
                    onClick={handleClick('bottom-end')}
                    sx={{
                        width: "5.5rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        backgroundColor: "white",
                        borderRadius: "40px",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        "&:hover .icon1": {
                            color: "#ffffff"
                        },
                        "&:hover .icon2": {
                            color: "#91b9ce"
                        },
                        "&:hover .icon-button": {
                            backgroundColor: "#ffffff"
                        },
                        "&:hover": {
                            backgroundColor: "#91b9ce",
                        }
                    }}>
                    <SettingsTwoTone className="icon1" fontSize="inherit" sx={{ fontSize: "1.7rem", color: "#91b9ce" }} />
                    <IconButton sx={{
                        backgroundColor: "#91b9ce",
                        p: 0,
                        width: "2.3rem",
                        height: "2.3rem",
                    }}
                        className="icon-button">
                        <PermIdentityOutlined className="icon2" fontSize="inherit" sx={{ fontSize: "1.7rem", color: "#ffffff" }} />
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
                                gap: 1
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    flexDirection: "row",
                                    gap: 1,
                                    p: 2,
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: "10px"
                                    }
                                }}>
                                    <Typography variant='h6'>
                                        Nome:
                                    </Typography>
                                    <Typography>
                                        João Vitor Pereira de Souza
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "100%", display: "flex", alignItems: "center", padding: "0 10px" }}>
                                    <IconButton onClick={() => navigate("/")}>
                                        <LoginTwoTone />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Fade>
                    )}
                </Popper>

            </TopBar>
            <Outlet />
        </div>
    )
}