import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from './_login.module.css';
import * as Yup from "yup";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoAzulIcon.png'
import { login } from '../../services/unifenas';

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100%", width: "100%" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "auto",
                width: "30rem",
                padding: "2rem",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        submit: null,
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email("E-mail invalido")
                            .max(255)
                            .required("O E-mail é obrigatório"),
                        password: Yup.string().max(255).required("A Senha é obrigatória"),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            // Simulação de login
                            const resposta = await login(values?.email, values?.password);

                            toast("Login realizado com sucesso", {
                                duration: 4000,
                                position: "top-center",
                                style: {
                                    backgroundColor: "#00C851",
                                    color: "white",
                                    borderRadius: "8px",
                                },
                                icon: "✅",
                                iconTheme: {
                                    primary: "#000",
                                    secondary: "#fff",
                                },
                                ariaProps: {
                                    role: "status",
                                    "aria-live": "polite",
                                },
                            });

                            navigate("/dash");

                        } catch (err) {
                            console.error(err)
                            toast("Não foi possível realizar o login", {
                                duration: 4000,
                                position: "top-center",
                                style: {
                                    backgroundColor: "red",
                                    color: "white",
                                    borderRadius: "8px",
                                },
                                icon: "⚠️",
                                iconTheme: {
                                    primary: "#000",
                                    secondary: "#fff",
                                },
                                ariaProps: {
                                    role: "status",
                                    "aria-live": "polite",
                                },
                            });
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, touched, values, handleSubmit }) => (
                        <form
                            style={{ position: "relative", display: "flex", flexDirection: "column", gap: "2rem", width: "100%" }}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
                                <img src={Logo} alt='logo' className={styles.logo} />
                                <Typography sx={{ fontFamily: 'Poppins', color: '#585757', width: '90%', textAlign: 'center' }} variant='h5'>
                                    Olá, Bem-Vindo ao nosso Portal!
                                </Typography>
                                <Typography sx={{ fontFamily: 'Poppins', color: 'rgb(156, 156, 156)', width: '90%', textAlign: 'center' }} variant='caption'>
                                    Faça seu login para ter acesso ao nosso Portal
                                </Typography>
                            </Box>

                            <FormControl
                                fullWidth
                                error={Boolean(touched.email && errors.email)}
                            >
                                <InputLabel
                                    htmlFor="outlined-adornment-email-login"
                                    placeholder="teste"
                                >
                                    E-mail
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email-login"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{
                                        borderRadius: '100px',
                                    }}
                                    label="E-mail"
                                    inputProps={{}}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-email-login"
                                    >
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl
                                fullWidth
                                error={Boolean(touched.password && errors.password)}
                            >
                                <InputLabel htmlFor="outlined-adornment-password-login">
                                    Senha
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-login"
                                    type={showPassword ? "text" : "password"}
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{
                                        borderRadius: '100px',
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    inputProps={{}}
                                />
                                {touched.password && errors.password && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-password-login"
                                    >
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            {errors.submit && (
                                <Box sx={{ mt: 3 }}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Box>
                            )}

                            <Box sx={{ mt: 2, gap: 2, display: "flex", flexDirection: "row" }}>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        backgroundColor: "#257ae9",
                                        '&:hover': {
                                            backgroundColor: '#226ac9'
                                        }
                                    }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Grid>
    )
}