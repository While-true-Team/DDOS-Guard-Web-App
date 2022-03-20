import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import OtpAlert from "../../components/otp-alert/OtpAlert";
import {Button, Divider, Paper, styled} from "@mui/material";
import SecureIcon from './2fa.png'
import {StyledButton} from "../../styled-components/button";
import {StyledTypography} from "../../styled-components/typography";
import {useAppSelector} from "../../hooks/redux.hooks";
import {getUserMail} from "../../store/selectors/userCredentials.selector";
import EmailIcon from '@mui/icons-material/Email';

const StyledPaper = styled(Paper)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "column",
    alignItems: 'center',
    overflow: 'hidden',
    padding: '10px'
}))

const StyledLi = styled('li')(({theme}) => ({
    color: 'error',
    wordBreak: 'break-all'
}))

const Account = () => {
    const userEmail = useAppSelector(getUserMail)
    return (
        <Box sx={{minHeight: '90vh', width: '100%'}}>
            <OtpAlert/>
            <Container>
                <StyledTypography pt={5} fontSize={30} textAlign='center'>
                    Настройки аккаунта
                </StyledTypography>
                <Grid>
                    <StyledPaper elevation={10} sx={{marginTop: '50px'}}>
                        <StyledTypography>EMAIL</StyledTypography>
                        <StyledTypography sx={{width: '100%', flex: 1}}>
                            <Box boxSizing='border-box' sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                wordBreak: 'break-all'
                            }}>
                                <EmailIcon sx={{marginRight: '10px'}}/>
                                {userEmail && userEmail}
                            </Box>
                            <Divider sx={{margin: '10px 0'}} orientation='horizontal'/>
                            <ul>
                                <StyledLi>Почта не подтверждена.</StyledLi>
                                <StyledLi>Двухфакторная аутентификация не подключена.</StyledLi>
                            </ul>
                        </StyledTypography>
                        <StyledButton disabled={true} color='success' variant='contained'>Подключить двухфакторную
                            аутентификацию по почте.
                        </StyledButton>
                        <StyledTypography sx={{color: 'red', marginTop: '10px'}}>
                            Для подключения необходимо подвтердить почту!
                        </StyledTypography>
                    </StyledPaper>
                    <StyledPaper sx={{marginTop: '100px'}} elevation={10}>
                        <StyledTypography textAlign='center'>
                            Двухфакторная аутентификация (Google Authenticator)
                        </StyledTypography>
                        <StyledTypography>На этом аккаунте не подключена двухфакторная
                            аутентификация.
                        </StyledTypography>
                        <Box
                            component="img"
                            src={SecureIcon}
                            sx={{height: {xs: 180, sm: 300, lg: 350}}}
                        />
                        <StyledButton color='success' variant='contained'>Подключить двухфакторную
                            аутентификацию</StyledButton>
                    </StyledPaper>
                    <StyledPaper sx={{marginTop: '100px'}} elevation={10}>
                        <StyledTypography textAlign='center'>
                            Двухфакторная аутентификация (SMS)
                        </StyledTypography>
                        <Box
                            component="img"
                            src={SecureIcon}
                            sx={{height: {xs: 180, sm: 300, lg: 350}}}
                        />
                        <StyledButton color='success' variant='contained'>Подключить двухфакторную
                            аутентификацию</StyledButton>
                    </StyledPaper>
                    <StyledPaper elevation={10} sx={{
                        margin: "100px 0 100px 0"
                    }}>
                        <StyledTypography textAlign='center'>
                            Двухфакторная аутентификация (EMAIL)
                        </StyledTypography>
                        <Box
                            component="img"
                            src={SecureIcon}
                            sx={{height: {xs: 180, sm: 300, lg: 350}}}
                        />
                        <StyledButton color='success' variant='contained'>Подключить двухфакторную
                            аутентификацию</StyledButton>
                    </StyledPaper>
                </Grid>
            </Container>
        </Box>
    );
};

export default Account;