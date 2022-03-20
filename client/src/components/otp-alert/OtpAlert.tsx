import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {StyledLink} from "../../styled-components/link";
import SecureIcon from '../../pages/account/otp.png'
import ShieldIcon from '@mui/icons-material/Shield';
import Box from "@mui/material/Box";
import {DialogContentText} from "@mui/material";
import {StyledButton} from "../../styled-components/button";


const StyledDialogText = styled(DialogContentText)(({theme}) => ({
    color: theme.palette.mode === 'dark' ? '#fff' : "#000",
    fontFamily: '"Montserrat", sans-serif'
}))

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function OtpAlert() {
    const [open, setOpen] = React.useState(!localStorage.getItem('alertChecked'));

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        localStorage.setItem('alertChecked', 'true')
    };

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle
                sx={{fontFamily: '"Montserrat", sans-serif'}}>{"Хотите использовать двухфакторную аутентификацию?"}</DialogTitle>
            <DialogContent>
                <StyledDialogText id="alert-dialog-slide-description">
                    Двухфакторная аутентификация — это метод идентификации пользователя в каком-либо сервисе (как
                    правило, в Интернете) при помощи запроса аутентификационных данных двух разных типов, что
                    обеспечивает двухслойную, а значит, более эффективную защиту аккаунта от несанкционированного
                    проникновения.
                </StyledDialogText>
                <StyledDialogText>
                    Предагаем вам подключить двухфакторную аутентификацию!
                </StyledDialogText>
            </DialogContent>
            <DialogActions>
                <StyledButton color='warning' variant='contained' onClick={handleClose}>В следующий раз</StyledButton>
                <StyledButton color='success' variant='contained' onClick={handleClose}>Перейти в настройки</StyledButton>
            </DialogActions>
        </Dialog>
    );
}