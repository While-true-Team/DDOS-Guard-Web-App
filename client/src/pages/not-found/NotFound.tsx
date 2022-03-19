import Icon404 from './404Error.svg'
import {Link} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import {Box, Button, Typography, Container} from '@mui/material';

const RootStyle = styled(Box)(({theme}) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function NotFound() {
    return (
        <RootStyle>
            <Container>
                <Box
                    sx={{maxWidth: 480, margin: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="h3" paragraph>
                        Извините, страница не найдена!
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Извините, мы не смогли найти страницу, которую вы ищете. Возможно, вы ошиблись адресом?
                        Обязательно проверьте правописание.
                    </Typography>
                    <Box
                        component="img"
                        src={Icon404}
                        sx={{height: {xs: 180, sm: 300, lg: 350}}}
                    />
                    <Button to="/" size="large" variant="contained" component={Link}>
                        Вернуться
                    </Button>
                </Box>
            </Container>
        </RootStyle>
    );
}