import {styled} from "@mui/material";
import Link from "@mui/material/Link";

export const StyledLink = styled(Link)(({theme}) => ({
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
    cursor: 'pointer'
}))