import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Dialog, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, styled, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Copyright} from "../../styled-components/copyright";
import {authorizeApi} from "../../services/authorize.service";
import {LoginRequest} from "../../models/authorize.model";
import {ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState} from "react";
import ReportIcon from '@mui/icons-material/Report';
import {Alert, AlertTitle, LoadingButton} from "@mui/lab";
import {StyledLink} from "../../styled-components/link";
import {validateEmail} from "../../validators/authorization.validators";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";


export default function SignIn() {
    const navigate = useNavigate();

    const [login, {isLoading: loginLoading, error: loginError}] = authorizeApi.useLoginMutation();
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    // @ts-ignore
    const errorMessage: string | null = loginError && loginError.data.error;
    useEffect(() => {
        if (loginError) {
            setOpenAlert(true)
        }
    }, [loginError])

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    const [loginRequest, setLoginRequest] = useState<LoginRequest>({
        email: '',
        password: '',
        showPassword: false
    });

    const handleClickShowPassword = () => {
        setLoginRequest(prev => ({
            ...prev,
            showPassword: !prev.showPassword
        }))
    }

    const handleLoginRequestPasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setLoginRequest(prev => ({
            ...prev,
            password: event.target.value.trim()
        }))
    }

    const handleLoginRequestEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setLoginRequest(prev => ({
            ...prev,
            email: event.target.value.trim()
        }))
    }

    const isNotValidForm = validateEmail(loginRequest.email);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        login(loginRequest)
            .unwrap()
            .then(() => {
                navigate('/');
                return;
            })
            .catch(() => {
                return;
            });
    };

    const handleGoToSignUp = () => {
        navigate('/sign-up')
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email адрес"
                            name="email"
                            id='email'
                            autoComplete="email"
                            autoFocus
                            error={validateEmail(loginRequest.email)}
                            helperText={validateEmail(loginRequest.email) ? "Неккоректный Email!" : ""}
                            value={loginRequest.email}
                            onChange={handleLoginRequestEmailChange}
                        />
                        <FormControl sx={{width: '100%'}} variant="outlined">
                            <InputLabel required>Пароль</InputLabel>
                            <OutlinedInput
                                fullWidth
                                required
                                inputProps={{
                                    maxLength: 30
                                }}
                                type={loginRequest.showPassword ? 'text' : 'password'}
                                value={loginRequest.password}
                                onChange={handleLoginRequestPasswordChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {loginRequest.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Пароль"
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Запомнить меня"
                        />
                        <LoadingButton
                            type="submit"
                            disabled={isNotValidForm}
                            fullWidth
                            variant="contained"
                            loading={loginLoading}
                            sx={{mt: 3, mb: 2}}
                        >
                            Войти
                        </LoadingButton>
                        <Grid container>
                            <Grid item xs>
                                <StyledLink title='А не надо было забывать :)' variant="body2">
                                    Забыли пароль?
                                </StyledLink>
                            </Grid>
                            <Grid item>
                                <StyledLink mr={1} title='Перейти к регистрации.' variant="body2" onClick={handleGoToSignUp}>
                                    Нет аккаунта? Зарегестрируйтесь!
                                </StyledLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
            <Dialog open={openAlert}>
                <Alert
                    severity="warning"
                    color="error"
                    role="button"
                    closeText='Закрыть'
                    icon={<ReportIcon/>}
                    sx={{padding: '35px', fontFamily: '"Montserrat", sans-serif'}}
                    onClose={handleCloseAlert}
                >
                    <AlertTitle sx={{fontFamily: '"Montserrat", sans-serif'}}>Ошибка!</AlertTitle>
                    {errorMessage}
                </Alert>
            </Dialog>
        </>
    );
}