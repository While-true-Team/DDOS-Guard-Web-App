import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from "react-router-dom";
import {Copyright} from "../../styled-components/copyright";
import {ChangeEvent, FormEvent, useState} from "react";
import {authorizeApi} from "../../services/authorize.service";
import {LoadingButton} from "@mui/lab";
import {Save} from "@mui/icons-material";
import {RegistrationRequest} from "../../models/authorize.model";


export default function Registration() {
    const navigate = useNavigate();

    const [registration, {
        isLoading: registrationLoading,
        error: registrationError
    }] = authorizeApi.useRegistrationMutation();

    const [registrationRequest, setRegistrationRequest] = useState<RegistrationRequest>({
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });

    const handleFirstNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRegistrationRequest(prev => ({
            ...prev,
            first_name: event.target.value
        }))
    }

    const handleLastNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRegistrationRequest(prev => ({
            ...prev,
            last_name: event.target.value
        }))
    }

    const handleEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRegistrationRequest(prev => ({
            ...prev,
            email: event.target.value
        }))
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRegistrationRequest(prev => ({
            ...prev,
            password: event.target.value
        }))
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        registration(registrationRequest)
            .unwrap()
            .then(() => {
                navigate('/');
                return;
            })
            .catch(() => {
                return;
            });
    };

    const handleToSignIn = () => {
        navigate('/');
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
                    Регистрация
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Имя"
                                value={registrationRequest.first_name}
                                onChange={handleFirstNameChange}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Фамилия"
                                name="lastName"
                                autoComplete="family-name"
                                value={registrationRequest.last_name}
                                onChange={handleLastNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email адрес"
                                name="email"
                                autoComplete="email"
                                value={registrationRequest.email}
                                onChange={handleEmailChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={registrationRequest.password}
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="Я хочу получать новости, маркетинговые акции и оповещения по электронной почте."
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        loading={registrationLoading}
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Зарегестрироваться
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={handleToSignIn}>
                                Уже есть аккаунт? Войдите!
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 5}}/>
        </Container>
    );
}