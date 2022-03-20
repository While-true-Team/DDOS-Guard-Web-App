import {styled} from "@mui/material";
import Typography from "@mui/material/Typography";

export const StyledTypography = styled(Typography)(({theme}) => ({
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    fontFamily: '"Montserrat", sans-serif'
}))