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
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {authorizeApi} from "../../services/authorize.service";
import {Alert, AlertTitle, LoadingButton} from "@mui/lab";
import {Save, Visibility, VisibilityOff} from "@mui/icons-material";
import {RegistrationRequest} from "../../models/authorize.model";
import isEmail from 'validator/lib/isEmail';
import validator from "validator";
import {Dialog, FormControl, InputAdornment, InputLabel, OutlinedInput, styled} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import {
    validatePassword,
    validateName,
    validateEmail
} from "../../../validators/authorization.validators";
import {StyledLink} from "../../styled-components/link";
import ReportIcon from "@mui/icons-material/Report";

export default function Registration() {
    const navigate = useNavigate();

    const [registration, {
        isLoading: registrationLoading,
        error: registrationError
    }] = authorizeApi.useRegistrationMutation();

    const handleClickShowPassword = () => {
        setRegistrationRequest((prev) => ({
            ...prev,
            showPassword: !prev.showPassword
        }))
    }

    const [openAlert, setOpenAlert] = useState<boolean>(false)

    useEffect(() => {
        if (registrationError) {
            setOpenAlert(true)
        }
    }, [registrationError])

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }


    const [registrationRequest, setRegistrationRequest] = useState<RegistrationRequest>({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        showPassword: false
    });

    // @ts-ignore
    const errorMessage: string | null = registrationError && registrationError.data.error;
    const isValidForm: boolean = (validateEmail(registrationRequest.email) || validateName(registrationRequest.first_name) || validateName(registrationRequest.last_name) || validatePassword(registrationRequest.password))

    const handleFirstNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRegistrationRequest(prev => ({
            ...prev,
            first_name: event.target.value.trim()
        }))
    }

    const handleLastNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRegistrationRequest(prev => ({
            ...prev,
            last_name: event.target.value.trim()
        }))
    }

    const handleEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRegistrationRequest(prev => ({
            ...prev,
            email: event.target.value.trim()
        }))
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRegistrationRequest(prev => ({
            ...prev,
            password: event.target.value.trim()
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
                        Регистрация
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
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
                                    inputProps={{
                                        maxLength: 30
                                    }}
                                    helperText={validateName(registrationRequest.first_name) ? 'В имени не допускается использовние цифр!' : ''}
                                    error={validateName(registrationRequest.first_name)}
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
                                    helperText={validateName(registrationRequest.last_name) ? 'В фамилии не допускается использовние цифр!' : ''}
                                    error={validateName(registrationRequest.last_name)}
                                    value={registrationRequest.last_name}
                                    inputProps={{
                                        maxLength: 30
                                    }}
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
                                    error={validateEmail(registrationRequest.email)}
                                    helperText={validateEmail(registrationRequest.email) ? 'Некорректный Email!' : ''}
                                    autoComplete="email"
                                    value={registrationRequest.email}
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{width: '100%'}} variant="outlined">
                                    <InputLabel required
                                                error={validatePassword(registrationRequest.password)}>Пароль</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        required
                                        inputProps={{
                                            maxLength: 30
                                        }}
                                        error={validatePassword(registrationRequest.password)}
                                        type={registrationRequest.showPassword ? 'text' : 'password'}
                                        value={registrationRequest.password}
                                        onChange={handlePasswordChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {registrationRequest.showPassword ? <VisibilityOff/> :
                                                        <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Пароль"
                                    />
                                </FormControl>
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
                            disabled={isValidForm}
                            sx={{mt: 3, mb: 2}}
                        >
                            Зарегистрироваться
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <StyledLink title='Перейти к входу.' href="#" variant="body2" onClick={handleToSignIn}>
                                    Уже есть аккаунт? Войдите!
                                </StyledLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
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