import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {FC, useContext} from "react";
import {ChosenTheme} from "../../providers";
import {Divider, styled, Switch} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {authorizeApi} from "../../services/authorize.service";
import {useAppSelector} from "../../hooks/redux.hooks";
import {getUserMail} from "../../store/selectors/userCredentials.selector";
import {StyledTypography} from "../../styled-components/typography";


const ThemeSwitch = styled(Switch)(({theme}) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const DDosLogo = styled('div')(({theme}) => ({
    width: '72px',
    backfaceVisibility: 'hidden',
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    transition: '250ms',
    display: 'block',
    font: '600 10px Helvetica,arial,sans-serif',
    textTransform: 'uppercase',
    color: theme.palette.mode === 'dark' ? '#d7d7d7' : '#fff',
    span: {
        right: '14px'
    },
    "&:: before": {
        transition: '1s easy 0s',
        content: '""',
        height: '44px',
        filter: theme.palette.mode === 'dark' ? 'sepia(70%)' : '',
        display: 'block',
        margin: '0 auto 7px',
        background: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiA0MiI+DQogIDxkZWZzPg0KICAgIDxzdHlsZT4NCiAgICAgIC5hIHsNCiAgICAgICAgZmlsbDogIzMzOTllMDsNCiAgICAgIH0NCg0KICAgICAgLmIgew0KICAgICAgICBmaWxsOiAjZmZmOw0KICAgICAgfQ0KICAgIDwvc3R5bGU+DQogIDwvZGVmcz4NCiAgPHRpdGxlPmxvZ288L3RpdGxlPg0KICA8cGF0aCBjbGFzcz0iYSIgZD0iTTE4LjAwMDIsNDJDOC43Mjg0MSw0MS4xMzMzNS43MTY3NywyNC40MzYyNywwLDEwLjM1MzkzLDYuNTc3NzQsOS4zMjQ4NywxMy4wODMzLDUuMjU1NzYsMTguMDAwMiwwLDIyLjYyOTI3LDUuMTM5NzUsMjkuNDIyMjQsOS4zMjQ4NywzNiwxMC4zNTM5MywzNS4yODMyNCwyNC40MzYyNywyNy4yNzE5LDQxLjEzMzM1LDE4LjAwMDIsNDIiLz4NCiAgPHBhdGggY2xhc3M9ImIiIGQ9Ik0xMS4wNTgzMywyNC4yNjc2NFYyMi44OTc0OGw2LjY3MDMyLS45MjEwNVYyMC4wNDA1NUwxMS4wNTgzMywyMS40MTlWMjAuMDEwODNMMTcuNywxNy44MjM0M3YtMS43MTZsLTYuNjQxNjYsMi40NDg4VjE3LjI0NjU0TDE3LjcsMTQuMTE2VjExLjk2MzUybC02LjY0MTY2LDMuOTA2MjdWMTQuNzg1MTZMMTcuOTMwMzksOS42OTVsNi45MDEsNS4yNjQ1VjI1LjkyNTMxaC44NjMyMnYxLjk3ODEzSDEwLjMxMTE2VjI1LjkyNTMxSDE3LjdWMjMuODg4ODJaIi8+DQo8L3N2Zz4NCg==') center no-repeat",
    },
    "&:hover": {
        opacity: 0.5,
    },
    "&:active": {
        opacity: 1
    }
}));


const AppBar: FC = () => {
    const navigate = useNavigate();
    const {theme, setTheme} = useContext(ChosenTheme);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [logout, {}] = authorizeApi.useLogoutMutation();

    const userEmail = useAppSelector(getUserMail)

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLogout = async () => {
        await logout();
        handleCloseUserMenu();
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleGoToProfile = (): void => {
        navigate('/');
        handleCloseUserMenu();
    };

    const handleGoHome = (): void => {
        navigate('/');
        handleCloseUserMenu();
    };

    return (
        <MuiAppBar sx={{padding: '10px', top: 0}} position="sticky">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography
                        noWrap
                        component="div"
                        sx={{cursor: 'pointer', mr: 2, display: {md: 'flex'}}}
                        onClick={handleGoHome}
                    >
                        <DDosLogo>
                            <span>ddos-guard</span>
                        </DDosLogo>
                    </Typography>

                    <Box display='flex' justifyContent='flex-end' flexGrow='1' alignItems='center'>
                        <ThemeSwitch
                            checked={theme === 'dark'}
                            onChange={({target: {checked}}) => {
                                const themeToSet = checked ? 'dark' : 'light'
                                setTheme(themeToSet);
                            }}/>
                        <Tooltip title="Открыть настройки">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {userEmail &&
                                <StyledTypography sx={{padding: '15px'}}>
                                    {userEmail}
                                </StyledTypography>
                            }
                            <Divider orientation='horizontal'/>
                            <MenuItem onClick={handleGoToProfile}>
                                <Typography textAlign="center">Настройки</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Выйти из аккаунта</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
};
export default AppBar;
