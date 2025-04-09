import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from './_login.module.css';
import * as Yup from "yup";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            toast("Login realizado com sucesso", {
                duration: 4000,
                position: "top-center",

                // Styling
                style: {
                    backgroundColor: " #00C851",
                    color: `white`,
                    borderRadius: "8px",
                  },
                className: "",

                // Custom Icon
                icon: "✅",

                // Change colors of success/error/loading icon
                iconTheme: {
                    primary: "#000",
                    secondary: "#fff",
                },

                // Aria
                ariaProps: {
                    role: "status",
                    "aria-live": "polite",
                },
            });
            navigate("/dash");

        } catch (err) {
            toast("Não foi possivel realizar o login", {
                duration: 4000,
                position: "top-center",

                // Styling
                style: {
                    backgroundColor: "red",
                    color: `white`,
                    borderRadius: "8px",
                },
                className: "",

                // Custom Icon
                icon: "⚠️",

                // Change colors of success/error/loading icon
                iconTheme: {
                    primary: "#000",
                    secondary: "#fff",
                },

                // Aria
                ariaProps: {
                    role: "status",
                    "aria-live": "polite",
                },
            });
        }
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
                >
                    {({ errors, handleBlur, handleChange, touched, values }) => (
                        <form
                            style={{ position: "relative", display: "flex", flexDirection: "column", gap: "2rem", width: "100%" }}
                            noValidate
                            onSubmit={(e) => onSubmit(e, values)}
                        >
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
                                    sx={{backgroundColor:"#11445E"}}
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