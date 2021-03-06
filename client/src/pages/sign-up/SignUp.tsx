import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Copyright } from "../../styled-components/copyright";
import { ChangeEvent, FormEvent, useState } from "react";
import { AlertTitle, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done, Visibility, VisibilityOff } from "@mui/icons-material";
import { RegistrationRequest } from "../../models/authorize.model";
import {
  Dialog,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../../validators/authorization.validators";
import { StyledLink } from "../../styled-components/link";
import ReportIcon from "@mui/icons-material/Report";
import { registration } from "../../services/registration.service";
import ReCAPTCHA from "react-google-recaptcha";

const siteKey = import.meta.env.VITE_RECAPTCHA_PUBLIC;

const SuccessRegistrationDialog = styled(Dialog)(({ theme }) => ({
  padding: "5px",
  variant: "success",
}));

export default function Registration() {
  const navigate = useNavigate();
  const [reCaptchaLoaded, setReCaptchaLoaded] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setRegistrationRequest((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const [registrationLoading, setRegistrationLoading] = useState(false);

  const showReCaptchaLoaded = () => {
    setReCaptchaLoaded(true);
  };

  const [errorAlert, setErrorAlert] = useState({
    open: false,
    message: "",
  });
  const [successAlert, setSuccessAlert] = useState({
    open: false,
    message: "",
  });

  const handleCloseErrorAlert = () => {
    setErrorAlert((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleCloseSuccessAlert = () => {
    setSuccessAlert((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const [registrationRequest, setRegistrationRequest] =
    useState<RegistrationRequest>({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      showPassword: false,
    });

  const isValidForm: boolean =
    validateEmail(registrationRequest.email) ||
    validateName(registrationRequest.first_name) ||
    validateName(registrationRequest.last_name) ||
    validatePassword(registrationRequest.password);

  const handleFirstNameChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRegistrationRequest((prev) => ({
      ...prev,
      first_name: event.target.value.trim(),
    }));
  };

  const handleLastNameChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRegistrationRequest((prev) => ({
      ...prev,
      last_name: event.target.value.trim(),
    }));
  };

  const handleEmailChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRegistrationRequest((prev) => ({
      ...prev,
      email: event.target.value.trim(),
    }));
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRegistrationRequest((prev) => ({
      ...prev,
      password: event.target.value.trim(),
    }));
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setRegistrationLoading(true);
    const requestData: RegistrationRequest = {
      email: registrationRequest.email,
      password: registrationRequest.password,
      first_name: registrationRequest.first_name,
      last_name: registrationRequest.last_name,
    };
    registration(requestData)
      .then((res) => {
        setRegistrationLoading(false);
        setSuccessAlert((prev) => ({
          message: res.data.message,
          open: true,
        }));
      })
      .catch((err) => {
        setRegistrationLoading(false);
        setErrorAlert(() => ({
          open: true,
          message: err.response.data.error,
        }));
      });
  };

  const handleToSignIn = () => {
    navigate("/");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ??????????????????????
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="??????"
                  value={registrationRequest.first_name}
                  inputProps={{
                    maxLength: 30,
                  }}
                  helperText={
                    validateName(registrationRequest.first_name)
                      ? "?? ?????????? ???? ?????????????????????? ???????????????????????? ???????????? ????????!"
                      : ""
                  }
                  error={validateName(registrationRequest.first_name)}
                  onChange={handleFirstNameChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="??????????????"
                  name="lastName"
                  autoComplete="family-name"
                  helperText={
                    validateName(registrationRequest.last_name)
                      ? "?? ?????????????? ???? ?????????????????????? ???????????????????????? ???????????? ????????!"
                      : ""
                  }
                  error={validateName(registrationRequest.last_name)}
                  value={registrationRequest.last_name}
                  inputProps={{
                    maxLength: 30,
                  }}
                  onChange={handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email ??????????"
                  name="email"
                  error={validateEmail(registrationRequest.email)}
                  helperText={
                    validateEmail(registrationRequest.email)
                      ? "???????????????????????? Email!"
                      : ""
                  }
                  autoComplete="email"
                  value={registrationRequest.email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel required>????????????</InputLabel>
                  <OutlinedInput
                    fullWidth
                    required
                    inputProps={{
                      maxLength: 30,
                    }}
                    type={
                      registrationRequest.showPassword ? "text" : "password"
                    }
                    error={validatePassword(registrationRequest.password)}
                    value={registrationRequest.password}
                    onChange={handlePasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {registrationRequest.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="????????????"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="?? ???????? ???????????????? ??????????????, ?????????????????????????? ?????????? ?? ???????????????????? ???? ?????????????????????? ??????????."
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                opacity: reCaptchaLoaded ? 1 : 0,
                transition: "250ms",
              }}
              mt={2}
              width="100%"
              display="flex"
              justifyContent="center"
            >
              <ReCAPTCHA
                onLoadCapture={showReCaptchaLoaded}
                theme={"dark"}
                sitekey={siteKey || ""}
              />
            </Box>
            <LoadingButton
              type="submit"
              loading={registrationLoading}
              fullWidth
              variant="contained"
              disabled={isValidForm}
              sx={{ mt: 3, mb: 2 }}
            >
              ????????????????????????????????????
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <StyledLink
                  title="?????????????? ?? ??????????."
                  href="#"
                  variant="body2"
                  onClick={handleToSignIn}
                >
                  ?????? ???????? ??????????????? ??????????????!
                </StyledLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Dialog open={errorAlert.open}>
        <Alert
          severity="warning"
          color="error"
          role="button"
          closeText="??????????????"
          icon={<ReportIcon />}
          sx={{ padding: "35px", fontFamily: '"Montserrat", sans-serif' }}
          onClose={handleCloseErrorAlert}
        >
          <AlertTitle sx={{ fontFamily: '"Montserrat", sans-serif' }}>
            ????????????!
          </AlertTitle>
          {errorAlert.message}
        </Alert>
      </Dialog>
      <SuccessRegistrationDialog open={successAlert.open}>
        <Alert
          severity="success"
          color="success"
          role="button"
          closeText="??????????????"
          icon={<Done />}
          sx={{ padding: "35px", fontFamily: '"Montserrat", sans-serif' }}
          onClose={handleCloseSuccessAlert}
        >
          <AlertTitle sx={{ fontFamily: '"Montserrat", sans-serif' }}>
            ???????????????? ??????????????????????!
          </AlertTitle>
          {successAlert.message}
        </Alert>
      </SuccessRegistrationDialog>
    </>
  );
}
