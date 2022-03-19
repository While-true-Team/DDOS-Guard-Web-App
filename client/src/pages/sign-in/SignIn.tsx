import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {styled} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Copyright} from "../../styled-components/copyright";
import {authorizeApi} from "../../services/authorize.service";
import {LoginRequest} from "../../models/authorize.model";
import {ChangeEvent, FormEvent, useState} from "react";
// @ts-ignore
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import jwtDecode from "jwt-decode";
import {accessTokenName} from "../../http";
import {LoadingButton} from "@mui/lab";

const StyledLink = styled(Link)(({theme}) => ({
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
    cursor: 'pointer'
}))

export default function SignIn() {
    const navigate = useNavigate();

    const [loginRequest, setLoginRequest] = useState<LoginRequest>({
        email: '',
        password: ''
    });

    const handleLoginRequestPasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setLoginRequest(prev => ({
            ...prev,
            password: event.target.value
        }))
    }

    const handleLoginRequestEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setLoginRequest(prev => ({
            ...prev,
            email: event.target.value
        }))
    }


    const [login, {isLoading: loginLoading, error: loginError}] = authorizeApi.useLoginMutation();
    // const jwt = jwtDecode(localStorage.getItem(accessTokenName))
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await login(loginRequest);
        navigate('/');
    };

    const handleGoToSignUp = () => {
        navigate('/sign-up')
    }

    return (
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
                <ValidatorForm onSubmit={handleSubmit} sx={{mt: 1}}>
                    <TextValidator
                        margin="normal"
                        required
                        fullWidth
                        label="Email адрес"
                        name="email"
                        id='email'
                        autoComplete="email"
                        autoFocus
                        validators={['required', 'isEmail']}
                        errorMessages={['Это поле обязательно к заполению!', 'Неправильный Email!']}
                        value={loginRequest.email}
                        onChange={handleLoginRequestEmailChange}
                    />
                    <TextValidator
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                        value={loginRequest.password}
                        validators={['required']}
                        errorMessages={['Это поле обязательно к заполению!']}
                        onChange={handleLoginRequestPasswordChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Запомнить меня"
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={loginLoading}
                        sx={{mt: 3, mb: 2}}
                    >
                        Войти
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <StyledLink variant="body2">
                                Забыли пароль?
                            </StyledLink>
                        </Grid>
                        <Grid item>
                            <StyledLink variant="body2" onClick={handleGoToSignUp}>
                                Нет аккаунта? Зарегестрируйтесь!
                            </StyledLink>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    );
}