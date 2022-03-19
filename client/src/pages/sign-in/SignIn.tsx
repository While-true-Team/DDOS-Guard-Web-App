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
import {styled} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Copyright} from "../../styled-components/copyright";
import {authorizeApi} from "../../services/authorize.service";
import {useDispatch} from "react-redux";
import {testAccessToken} from "../../store/reducers/authorize.slice";

const StyledLink = styled(Link)(({theme}) => ({
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
    cursor: 'pointer'
}))

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [login, {}] = authorizeApi.useLoginMutation();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        dispatch(testAccessToken())
        // await login(data);
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email адрес"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Запомнить меня"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Войти
                    </Button>
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
                </Box>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    );
}