import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import style from './_mensagem.module.css'
import { Autocomplete, Button, TextField } from '@mui/material';
import { useInfos } from '../../../hooks/InfosProvider';

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
    const {
        alunos
    } = useInfos()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [alunoSelecionado, setAlunoSelecionado] = React.useState();

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab className={style.titulo} sx={{ fontFamily: 'Poppins' }} label="Telefone" {...a11yProps(0)} />
                    <Tab className={style.titulo} sx={{ fontFamily: 'Poppins' }} label="Email" {...a11yProps(1)} />
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
                                    console.log('ID do aluno selecionado:', value);
                                    setAlunoSelecionado(value)
                                }
                            }}
                            sx={{ width: '40%', borderRadius: '100px' }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Selecione o aluno"
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
                        placeholder={alunoSelecionado ? `Digite sua mensagem para o(a) aluno(a) ${alunoSelecionado?.nome}` : 'Escolha o aluno e digite sua mensagem'}
                        multiline
                        rows={15}
                        sx={{
                            width: '80%',
                            boxShadow: '0 0 10px rgba(37, 122, 233, 0.2)',
                            border: 'none',
                            borderRadius: '10px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
                        <Button sx={{ borderRadius: '10px', width: '10%' }} variant="contained">
                            Enviar
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
                                    console.log('ID do aluno selecionado:', value);
                                    setAlunoSelecionado(value)
                                }
                            }}
                            sx={{ width: '40%', borderRadius: '100px' }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Selecione o aluno"
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
                        sx={{
                            width: '80%',
                            boxShadow: '0 0 10px rgba(37, 122, 233, 0.2)',
                            border: 'none',
                            borderRadius: '10px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Mensagem"
                        placeholder={alunoSelecionado ? `Digite sua mensagem para o(a) aluno(a) ${alunoSelecionado?.nome}` : 'Escolha o aluno e digite sua mensagem'}
                        multiline
                        rows={13}
                        sx={{
                            width: '80%',
                            boxShadow: '0 0 10px rgba(37, 122, 233, 0.2)',
                            border: 'none',
                            borderRadius: '10px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
                        <Button sx={{ borderRadius: '10px', width: '10%' }} variant="contained">
                            Enviar
                        </Button>
                    </div>
                </div>
            </CustomTabPanel>
        </Box>
    );
}