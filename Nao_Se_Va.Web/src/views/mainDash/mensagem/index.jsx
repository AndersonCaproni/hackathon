import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import style from './_mensagem.module.css'
import { Autocomplete, Button, TextField } from '@mui/material';
import { useInfos } from '../../../hooks/InfosProvider';
import { sendEmail } from '../../../services/email'
import toast from "react-hot-toast";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Mensagem() {
    const [value, setValue] = React.useState(0);
    const [titulo, setTitulo] = React.useState('')
    const [mensagem, setMensagem] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [alunoSelecionado, setAlunoSelecionado] = React.useState(null);
    const [alunoSelecionadoMensagem, setAlunoSelecionadoMensagem] = React.useState(null);
    const [tituloErro, setTituloErro] = useState(false);
    const [emailErro, setEmailErro] = useState(false);
    const [alunoErro, setAlunoErro] = useState(false);
    const [alunoMensagemErro, setAlunoMensagemErro] = useState(false);
    const [mensagemErro, setMensagemErro] = React.useState('')
    const {
        alunos,
        setLoadingSupremo
    } = useInfos()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const EnviarEmail = async () => {
        setLoadingSupremo(true)
        const tituloInvalido = !titulo.trim();
        const emailInvalido = !email.trim();
        const alunoInvalido = !alunoSelecionado || !alunoSelecionado.email?.trim();

        setTituloErro(tituloInvalido);
        setEmailErro(emailInvalido);
        setAlunoErro(alunoInvalido);

        if (tituloInvalido || emailInvalido || alunoInvalido) {
            toast.error('Campos obrigatórios não preenchidos!');
        } else {
            try {
                await sendEmail(alunoSelecionado?.email, titulo, email);
                toast.success('E-mail enviado com sucesso!');
            }
            catch (err) {
                toast.error('Erro ao enviar o E-mail, tente novamente mais tarde!');
            }

        }
        setLoadingSupremo(false)
    };

    const EnviarMensagem = async () => {
        const mensagemInvalido = !mensagem.trim();
        const alunoInvalido = !alunoSelecionadoMensagem || !alunoSelecionadoMensagem.email?.trim();

        setMensagemErro(mensagemInvalido);
        setAlunoMensagemErro(alunoInvalido);

        if (mensagemInvalido || alunoInvalido) {
            toast.error('Campos obrigatórios não preenchidos!');
        } else {
            const numeroFormatado = alunoSelecionadoMensagem?.telefone?.replace(/\D/g, '');
            const numeroComCodigo = `55${numeroFormatado.slice(-11)}`;

            const mensagemCodificada = encodeURIComponent(mensagem);
            const url = `https://wa.me/${numeroComCodigo}?text=${mensagemCodificada}`;

            window.open(url, '_blank');
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab className={style.titulo} sx={{ fontFamily: 'Poppins' }} label="Email" {...a11yProps(0)} />
                    <Tab className={style.titulo} sx={{ fontFamily: 'Poppins' }} label="WhatsApp" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
                        <Autocomplete
                            disablePortal
                            options={alunos}
                            getOptionLabel={(option) => option.nome}
                            noOptionsText="Aluno não encontrado"
                            onChange={(event, value) => {
                                if (value) {
                                    setAlunoSelecionado(value)
                                }
                                else {
                                    setAlunoSelecionado(null)
                                }
                            }}
                            sx={{ width: '40%', borderRadius: '100px' }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Selecione o aluno"
                                    error={alunoErro}
                                    helperText={alunoErro ? 'Selecione um aluno' : ''}
                                    InputProps={{
                                        ...params.InputProps,
                                        sx: {
                                            borderRadius: '100px'
                                        }
                                    }}
                                />
                            }
                        />
                    </div>
                    <TextField
                        id="outlined-required"
                        label="Título"
                        placeholder="Digite o título"
                        onChange={(event) => setTitulo(event.target.value)}
                        error={tituloErro}
                        helperText={tituloErro ? 'Título é obrigatório' : ''}
                        sx={{
                            width: '80%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '100px',
                            },
                        }}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Mensagem"
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={alunoSelecionado ? `Digite sua mensagem para o(a) aluno(a) ${alunoSelecionado?.nome}` : 'Escolha o aluno e digite sua mensagem'}
                        multiline
                        rows={13}
                        error={emailErro}
                        helperText={emailErro ? 'Email é obrigatório' : ''}
                        sx={{
                            width: '80%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '30px',
                            },
                        }}
                    />
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
                        <Button
                            onClick={() => EnviarEmail()}
                            variant="contained"
                            startIcon={<EmailIcon />}
                            sx={{
                                backgroundColor: '#4285F4',
                                '&:hover': {
                                    backgroundColor: '#3367D6',
                                },
                                borderRadius: '12px',
                                paddingX: '20px',
                                paddingY: '10px',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                fontSize: '16px',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            Enviar Email
                        </Button>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
                        <Autocomplete
                            disablePortal
                            options={alunos}
                            getOptionLabel={(option) => option.nome}
                            noOptionsText="Aluno não encontrado"
                            onChange={(event, value) => {
                                if (value) {
                                    setAlunoSelecionadoMensagem(value)
                                }
                                else {
                                    setAlunoSelecionadoMensagem(null)
                                }
                            }}
                            sx={{ width: '40%', borderRadius: '100px' }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Selecione o aluno"
                                    error={alunoMensagemErro}
                                    helperText={alunoMensagemErro ? 'Selecione um aluno' : ''}
                                    InputProps={{
                                        ...params.InputProps,
                                        sx: {
                                            borderRadius: '100px'
                                        }
                                    }}
                                />
                            }
                        />
                    </div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Mensagem"
                        placeholder={alunoSelecionadoMensagem ? `Digite sua mensagem para o(a) aluno(a) ${alunoSelecionadoMensagem?.nome}` : 'Escolha o aluno e digite sua mensagem'}
                        multiline
                        rows={15}
                        error={mensagemErro}
                        onChange={(event) => setMensagem(event.target.value)}
                        helperText={mensagemErro ? 'Mensagem é obrigatório' : ''}
                        sx={{
                            width: '80%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '30px',
                            },
                        }}
                    />
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
                        <Button
                            onClick={() => EnviarMensagem()}
                            variant="contained"
                            startIcon={<WhatsAppIcon />}
                            sx={{
                                backgroundColor: '#25D366',
                                '&:hover': {
                                    backgroundColor: '#1EBE5D',
                                },
                                borderRadius: '12px',
                                paddingX: '20px',
                                paddingY: '10px',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                fontSize: '16px',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            Enviar pelo WhatsApp
                        </Button>
                    </div>
                </div>
            </CustomTabPanel>
        </Box>
    );
}