import React, { useState } from "react";
import background from "./greenbg.jpg"
import { Button, Grid, Paper, Tooltip, Typography, Box, Icon, TextField, Link } from '@mui/material';
import { green } from '@mui/material/colors';
import SignUpImg from './signupanimate.svg'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { IconButton } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import { useUser } from '../../Contexts/UserContext';
import axios from '../../api'
import { signup } from "../../api/functions"
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { Save } from "@material-ui/icons";



function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [university, setUniversity] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false)
      };

    const handleValueChange = (event, setter, checker) => {
        const value = event.target.value;

        setter(value)
        if(checker != null) {
            checker()
        }
    };

    const { setCurrentUser } = useUser()

    const [isFormInvalid, setIsFormInvalid] = useState(true);
    const [passwordValidate, setPasswordValidate] = useState(false);
    const [emailValidate, setEmailValidate] = useState(false);
    const [passwordMatchValidate, setPasswordMatchValidate] = useState(true);
    const [usernameValidate, setUsernameValidate] = useState(false);

    const validateForm = () => {
        validateUsername()
        validatePassword()
        validateEmail()
        validatePasswordMatch()
    };

    const validatePasswordMatch = () => {
        if (password !== passwordAgain) {
            setPasswordMatchValidate(false)}
        else {
            setPasswordMatchValidate(true)
        }
    };

    const validateEmail = () => {
        if (!email.includes('@') || !email.includes('.')) {
            setEmailValidate(true)
        } else {
            setEmailValidate(false)
        }
    };

    const validateUsername = () => {
        if (username.length < 5) {
            setUsernameValidate(true)
        } else {
        setUsernameValidate(false)
        }
    };

    const validatePassword = () => {
        if (password.length < 5) {
            setPasswordValidate(true)
        } else {
        setPasswordValidate(false)
        }
    };


    function handleRegister(event) {
        event.preventDefault()
        validateForm()
        if (isFormInvalid) {
            signup(email, password, university, username, name, setCurrentUser, image, setOpenSnackbar)
        }
        else {
            setOpenSnackbar(true)

        }
    }

    const Input = styled('input')({
        display: 'none',
    });

    function photoHandler(event) {
        setImage(event.target.files[0])
    }

    return (
        <Grid
            container
            xs={4}
            lg={4}
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
                xs={7}
                mt='6vh'
            >
                <img src={SignUpImg}
                    style={{
                        position: 'abolsute',
                        marginLeft: '-3vw',
                        marginRight: '-15vw',
                        maxHeight: 600
                    }} />
                {/* </Grid> */}
                <Grid container
                    direction="column"
                    alignItems="center"
                    justifyItems='center'
                    justifyContent='center'
                    component={Paper}
                    elevation={6}
                    variant='outlined'
                    borderRadius={16}
                    padding='0px'
                    marginRight='1vw'
                    // zIndex='1000'
                    style={{
                        maxHeight: '90vh', minWidth: '20vw', border: `3px solid ${green[200]}`,
                        padding: '5vh'
                    }}
                    xs={7}>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item xs={9}>
                            <Typography component="h1" variant='h3' marginTop='2vh' fontFamily='revert' fontStyle='revert'>
                                Sign Up!
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <form>
                            <Grid container direction='row' alignItems='center' justifyItems='center'>
                                <Grid item xs={10.25}>
                                <Tooltip title="Username must be unique and require more than 6 characters" placement='right' arrow>
                                    <TextField 
                                        fullWidth 
                                        label='Username' 
                                        right-padding='5px' 
                                        margin='normal' 
                                        required='true' 
                                        placeholder='Create your own unique username' 
                                        error={usernameValidate}
                                        helperText={usernameValidate && 'Username is either too short or not unique'}
                                        value={username} 
                                        onChange={(event) => {handleValueChange(event, setUsername, null)}} />
                                </Tooltip>
                                </Grid>
                                <Grid item><label htmlFor="icon-button-file" xs={1}>
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={photoHandler}/>
                                    <Tooltip title='Upload your profile picture'>
                                        <IconButton color="green" component="span">
                                            <PhotoCamera background='green' />
                                        </IconButton>
                                    </Tooltip>
                                </label>
                                </Grid>
                            </Grid>
                            <TextField 
                                fullWidth 
                                label='Name' 
                                right-padding='5px' 
                                margin='normal' 
                                required='true' 
                                placeholder='Type your display name' 
                                value={name} 
                                onChange={(event) => {handleValueChange(event, setName, null)}} />
                            <TextField 
                                fullWidth 
                                label='Email' 
                                margin='normal' 
                                required='true' 
                                placeholder='Type your email' 
                                error={emailValidate}
                                helperText={emailValidate && 'Invalid Email Address'}
                                value={email} 
                                onChange={(event) => {handleValueChange(event, setEmail, null)}}
                            />
                            <TextField 
                                fullWidth 
                                label='University' 
                                required='true' 
                                margin='normal' 
                                placeholder='Enter your University' 
                                value={university} 
                                onChange={(event) => {handleValueChange(event, setUniversity, null)}} 
                            />
                            <Tooltip 
                                title="Password must have more than 6 characters" 
                                placement='right' 
                                arrow
                            >
                            <TextField 
                                fullWidth 
                                label='Password' 
                                required='true' 
                                margin='normal' 
                                placeholder='Create a secure password' 
                                error={passwordValidate}
                                helperText={passwordValidate && 'Password is too short'}
                                value={password} 
                                onChange={(event) => {handleValueChange(event, setPassword, null)}} 
                            />
                            </Tooltip>
                            <TextField 
                                fullWidth 
                                label='Password' 
                                required='true' 
                                margin='normal' 
                                placeholder='Retype your password' 
                                error={!passwordMatchValidate}
                                helperText={!passwordMatchValidate && 'Passwords do not match'}
                                value={passwordAgain} 
                                onChange={(event) => {handleValueChange(event, setPasswordAgain, null)}} 
                            />
                        </form>
                    </Grid>
                    <Grid item padding='0'>
                        <Button type='submit'
                            variant="outline"
                            sx={{ mt: 1, color: 'white', background: 'green' }}
                            onClick={handleRegister}>
                            Register
                        </Button>
                    </Grid>
                    <Grid item padding='0' sx={{ mt: 5, mb: 0 }}>
                        <Link href="./login" variant="body2" color="#1fc449">
                            {"Already have an account? Log In"}
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <div>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={1000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert severity='error'> Registration Could Not Be Completed</Alert>
                </Snackbar>
            </div>
        </Grid>)
}

export default Signup
