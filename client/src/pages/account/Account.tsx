import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import OtpAlert from "../../components/otp-alert/OtpAlert";
import {Button, Paper, styled} from "@mui/material";
import SecureIcon from './2fa.png'
import {StyledButton} from "../../styled-components/button";
import {StyledTypography} from "../../styled-components/typography";
import {useAppSelector} from "../../hooks/redux.hooks";
import {getUserMail} from "../../store/selectors/userCredentials.selector";

const StyledPaper = styled(Paper)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "column",
    alignItems: 'center',
    overflow: 'hidden',
    padding: '25px'
}))

const Account = () => {
    const userEmail = useAppSelector(getUserMail)
    return (
        <Box sx={{minHeight: '90vh', width: '100%'}}>
            <OtpAlert/>
            <Container>
                <StyledTypography textAlign='center' fontSize='3vmax' p={1}>{userEmail && userEmail}</StyledTypography>
                <Grid>
                    <StyledPaper sx={{marginTop: '100px'}} elevation={10}>
                        <StyledTypography textAlign='center'>
                            Двухфакторная аутентификация (Google Authenticator)
                        </StyledTypography>
                        <StyledTypography>На этом аккаунте не подключена двухфакторная
                            аутентификация.</StyledTypography>
                        <Box
                            component="img"
                            src={SecureIcon}
                            sx={{height: {xs: 180, sm: 300, lg: 350}}}
                        />
                        <StyledButton color='success' variant='contained'>Подключить двухфакторную аутентификацию</StyledButton>
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
                        <StyledButton color='success' variant='contained'>Подключить двухфакторную аутентификацию</StyledButton>
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
                        <StyledButton color='success' variant='contained'>Подключить двухфакторную аутентификацию</StyledButton>
                    </StyledPaper>
                </Grid>
            </Container>
        </Box>
    );
};

export default Account;