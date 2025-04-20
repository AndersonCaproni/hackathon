import styles from './_home.module.css'
import { TopBarLogOut } from '../../layouts/topBarLogOut'
import { Botao } from '../../components/Botao'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'

export const Home = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.corpo}>
            <TopBarLogOut>
                <Button variant="outlined" size={"large"} style={{ color: "#257ae9", fontWeight: "bold", margin: 0 }} onClick={() => navigate('/login')}>
                    Login
                </Button>
            </TopBarLogOut>
            <Box
                sx={{
                    flexGrow: 1,
                    position: 'relative',
                    overflowY: 'scroll',
                    height: "calc(100vh - 7rem)",
                    width: '100%',
                    '&::-webkit-scrollbar': {
                        width: '7px',
                        backgroundColor: 'transparent',

                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#257ae9',
                        borderRadius: '10px',
                        cursor: 'pointer',
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        backgroundColor: "#ffffff",
                        width: "calc(100% - 2rem)",
                        minHeight: "calc(100% - 2rem)",
                        borderRadius: "10px",
                        boxShadow: "4px 4px 10px 0px rgba(37, 122, 233, 0.4)",
                        m: '1rem',
                        flexDirection: 'column'
                    }}
                >
                </Box>
            </Box>
        </div>
    )
}