import styles from './_home.module.css'
import { TopBarLogOut } from '../../layouts/topBarLogOut'
import { Botao } from '../../components/Botao'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

export const Home = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.corpo}>
            <TopBarLogOut>
                <Button variant="outlined" size={"large"} style={{ color: "#257ae9", fontWeight: "bold", margin: 0 }} onClick={() => navigate('/login')}>
                    Login
                </Button>
            </TopBarLogOut>
        </div>
    )
}