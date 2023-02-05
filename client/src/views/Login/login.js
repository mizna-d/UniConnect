import React, { useState } from "react";
import loginImage from "./loginImage.svg";
import background from "./greenbg.jpg"
import { Button, Grid, Paper, Avatar, Typography, Box, TextField, Link, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useUser } from "../../Contexts/UserContext";
import { login } from "../../api/functions"
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import axios from "../../api";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility } from "@material-ui/icons";
import { VisibilityOff } from "@material-ui/icons";

const Login = () => {
    const { setCurrentUser } = useUser()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false)
      };

    const handleemailChange = event => {
        const value = event.target.value;

        setEmail(value)
    };

    const handlePasswordChange = event => {
        const value = event.target.value;

        setPassword(value)
    };

    const submitHandler = (event) => {
        event.preventDefault()
        // if(isFormInvalid) {
            axios({
                method: 'post',
                url: '/api/users/login',
                data: {
                    email: email,
                    password: password
                }
              }).then(response => {
                  console.log(response)
                  setCurrentUser(response.data)
              }).catch(function (error) {
                console.log(error);
                setOpenSnackbar(true)
                validate()
              });
        }
        // else {
        //     setOpenSnackbar(true)
        // }
    // }

    const [isFormInvalid, setIsFormInvalid] = useState(false);

    const validate = () => {
        if (email === "" || password === '') {
            setIsFormInvalid(false);
        } else {
            setIsFormInvalid(true);
        }
    };

    return (
        <Grid
            container component="main"
            spacing={0}
            padding='0px'
            padding-left='0px'
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', minWidth: '100vw' }}
            sx={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <Grid container
                direction="row"
                alignItems="center"
                component={Paper}
                elevation={6}
                borderRadius={16}
                padding='0px'
                xs={6}>
                <Grid
                    item
                    xs={6}
                    alignItems='flex-end' >
                    <img src={loginImage} />
                </Grid>
                <Grid
                    item
                    xs={5}>
                    <Grid
                        item
                        sx={{ alignItems: 'center' }}>
                        <Typography
                            component="h1"
                            align='right'
                            variant='h3'
                            fontFamily='revert'
                            fontSize='40px'
                            marginRight='10px' >
                            Welcome Back to<em><b> UniConnect</b></em>!
                        </Typography>
                    </Grid>
                    <form spacing={2}>
                        <TextField
                            fullWidth
                            label='Email'
                            type='email'
                            margin='normal'
                            placeholder='Enter email'
                            error={isFormInvalid}
                            helperText={isFormInvalid && 'Incorrect Email or Does Not Match Password'}
                            value={email}
                            onChange={handleemailChange} />
                        <TextField
                            fullWidth
                            label='Password'
                            type={showPassword ? "text" : "password"}
                            marginBottom='normal'
                            placeholder='Enter Password'
                            error={isFormInvalid}
                            helperText={isFormInvalid && 'Incorrect Password or Does Not Match Email'}
                            value={password}
                            onChange={handlePasswordChange}
                            InputProps={{ 
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }} />
                    </form>
                    <Grid
                        alignItems='center'
                        justifyItems='center'>
                        <Button
                            type='submit'
                            variant="contained"
                            // href= '/timeline'
                            onClick={submitHandler}
                            mt='2'
                            background='green'
                            sx={{
                                mt: 2,
                                background: 'green'
                            }}>
                            Login
                        </Button>
                    </Grid>
                    <Grid
                        container
                        direction='row'
                        alignItems='center'
                        justifyContent='center'
                        marginTop='2vh'>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link
                                href="/signup"
                                variant="body2"
                                color="#1fc449"
                                fontSize='12px'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={1000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert severity='error'> Login Failed</Alert>
                </Snackbar>
            </div>
        </Grid>)
}

export default Login