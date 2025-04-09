import styles from './_home.module.css'
import { TopBar } from '../../layouts/topBar'
import { Botao } from '../../components/Botao'
import { useNavigate } from 'react-router-dom'
export const Home = () => {
    const navigate = useNavigate()
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
                <Botao
                    tipo="text"
                    style={{
                        color: "#fff",
                        margin: 0,
                        height: "2rem"
                    }}
                    onClick={() => navigate('/login')}
                >
                    Login
                </Botao>
            </TopBar>
        </div>
    )
}