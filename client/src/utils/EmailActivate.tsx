import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {StyledTypography} from "../styled-components/typography";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";


const EmailActivate = () => {
    const params = useParams();
    const uuid = params.uuid;

    const activate = async () => {
        return await axios.get(`${window.location.protocol + "//" + window.location.hostname}:8080/activation/${uuid}`)
    }
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        activate().then(() => {
            window.location.replace('/');
        }).catch((err) => {
            setError(err.response.data.message);
        });
    }, [])
    console.log(error)
    return (
        <Box sx={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {error ? (
                    <Paper elevation={10} sx={{padding: '30px', borderRadius: '25px', margin: '0 15px'}}>
                        <Grid>
                            <StyledTypography sx={{color: 'red', fontSize: '6vmin'}} textAlign='center' mb={5}>
                                Ошибка!
                            </StyledTypography>
                            <StyledTypography textAlign='center' sx={{fontSize: '4vmin'}}>
                                {error}
                            </StyledTypography>
                        </Grid>
                    </Paper>)
                :
                <Paper elevation={10} sx={{padding: '30px', borderRadius: '25px', margin: '0 15px'}}>
                    <StyledTypography>
                        Активация почты...
                    </StyledTypography>
                </Paper>
            }
        </Box>
    );
};

export default EmailActivate;