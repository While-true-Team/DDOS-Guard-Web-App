import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

export const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/While-true-Team">
                While-true-Team
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}