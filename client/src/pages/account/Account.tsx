import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Account = () => {
    return (
        <Box sx={{minHeight: '90vh', width: '100%'}}>
            <Container>
                <Grid>
                    <Typography>
                        Настройки аккаунта
                    </Typography>
                </Grid>
            </Container>
        </Box>
    );
};

export default Account;