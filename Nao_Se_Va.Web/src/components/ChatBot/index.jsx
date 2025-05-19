import { Box, CircularProgress, IconButton, Modal, TextField, Tooltip, Typography } from "@mui/material"
import RoboIcon from '../../assets/roboIcon.png'
import { ArrowUpward, ContentCopy } from "@mui/icons-material";
import style from './_chatBot.module.css'
import { useEffect, useRef, useState } from "react";
import { useInfos } from "../../hooks/InfosProvider";

const ChatBot = () => {
    const [loadingBot, setLoadingBot] = useState(false);
    
const {
        ativoBot,
        setAtivoBot,
        handleCloseBot,
        perguntaBot,
        setPerguntaBot,
        mensagemBot,
        corpoRefBot
    } = useInfos()

    return (
        <Modal
            open={ativoBot}
            onClose={handleCloseBot}
            BackdropProps={{
                style: {
                    backgroundColor: 'transparent'
                }
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    bottom: '40px',
                    right: '60px',
                    height: '45rem',
                    width: '30rem',
                    zIndex: 9999,
                    borderRadius: '30px',
                    boxShadow: '0px 0px 40px rgba(110, 108, 108,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                <Box
                    sx={{
                        position: 'relative',
                        backgroundColor: '#257ae9',
                        height: '4.5rem',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        pl: 3,
                        pr: 3,
                        justifyContent: 'space-between'
                    }}>
                    <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '100%', backgroundColor: '#ffffff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={RoboIcon} arc={'Icone robo'} style={{ width: '70%', height: '70%' }} />
                    </div>
                    <Typography sx={{ fontFamily: 'Poppins', color: '#fff', fontSize: '1.6rem' }}> IA Assistent</Typography>
                </Box>
                <form
                    className={style.pagina}
                    onSubmit={(e) => {
                        e.preventDefault();
                        //Mensagem();
                    }}
                >
                    <div className={style.corpo} ref={corpoRefBot}>
                        {
                            mensagemBot?.length === 0 || !mensagemBot ?
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: ' rgb(235, 235, 235)',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Inicie sua conversa
                                    </Typography>
                                </Box> :

                                mensagemBot?.map((item, index) =>
                                    item?.tipo !== 'perguntaAluno' &&
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: item?.tipo === 'pergunta' ? 'right' : 'left',
                                            position: 'relative',

                                        }}>
                                        <Box
                                            sx={{
                                                textAlign: 'left',
                                                maxWidth: '70%',
                                                border: item?.tipo === 'pergunta' ? '2px solid #257ae9' : '2px solid rgb(105, 133, 170)',
                                                borderRadius: '20px',
                                                backgroundColor: item?.tipo === 'resposta' && 'rgb(241, 243, 245)',
                                                wordBreak: 'break-word',
                                                whiteSpace: 'pre-wrap',
                                                padding: 1,
                                                pb: 3
                                            }}>
                                            <Typography

                                                variant="h7"
                                            >
                                                {item?.mensagem}
                                            </Typography>
                                            <Tooltip title="Copiar">
                                                <IconButton
                                                    sx={{
                                                        position: "absolute",
                                                        border: '1px solid #999999',
                                                        color: '#257ae9',
                                                        backgroundColor: "#ffffff",
                                                        zIndex: 10,
                                                        bottom: -10,
                                                        right: item?.tipo === 'pergunta' && -10,
                                                        left: item?.tipo === 'resposta' && -10,
                                                        '&:hover': {
                                                            backgroundColor: 'rgb(230, 234, 241)',
                                                        }
                                                    }}
                                                    onClick={() => navigator.clipboard.writeText(item?.mensagem)}
                                                >
                                                    <ContentCopy fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>

                                    </Box>
                                )
                        }
                    </div>
                    <div className={style.input}>
                        <div className={style.text}>
                            <TextField
                                label="Diga como podemos te ajudar ..."
                                variant="outlined"
                                size="small"
                                value={perguntaBot}
                                onChange={(e) => { setPerguntaBot(e.target.value) }}
                                sx={{
                                    width: '80%',
                                    backgroundColor: ' #fff',
                                    borderRadius: '100px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '100px',
                                        paddingRight: 1,
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '10px 20px',
                                    },
                                }}
                            />
                            <IconButton
                                sx={{
                                    color: '#ffffff',
                                    backgroundColor: '#257ae9',
                                    '&:hover': {
                                        backgroundColor: '#1e63c5',
                                    },
                                }}
                                type="submit"
                            >
                                {
                                    loadingBot ?
                                        <CircularProgress size="20px" sx={{ color: '#ffffff', }} /> :
                                        <ArrowUpward />
                                }

                            </IconButton>
                        </div>
                    </div>
                </form >
            </Box>
        </Modal>
    )
}

export default ChatBot