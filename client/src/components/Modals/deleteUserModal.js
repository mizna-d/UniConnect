import React from 'react'
import { useState } from "react";
import { Icon, Button, Alert, IconButton, Tooltip, Snackbar, Grid, Paper, Autocomplete, Avatar, Typography, Box, TextField, Link, SliderValueLabel } from '@mui/material';
import { green } from '@mui/material/colors';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '../../Contexts/UserContext';
import { useHistory } from 'react-router-dom';
import axios from '../../api';


function Modal({ handleClose, users}) {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const [userChosen, setUserChosen] = useState('')

    const handleUserSelectChange = (event, value) => {
        setUserChosen(value)
    };

    const handleClick = () => {
        console.log(userChosen)
        console.log('userchosen')
        if (userChosen != '') { 
            axios({
                method: 'get',
                url: '/api/users/find/by/username',
                params: {
                    username: userChosen.username,
                }
            }).then(response => {
                    const newFriend = response.data
                    console.log(response.data)
                    console.log('response')
                    history.push({
                        pathname: '/userDetails',
                        state: { user: { newFriend } }
                })
            }).catch(function (error) {
                    console.log(userChosen)
                    console.log(error)
                    setOpenSnackbar(true)
            })
        } else {
            setOpenSnackbar(true)
        }
    };

    const Input = styled('input')({
        display: 'none',
    });



    return (
        <Grid
            container
            xs={12}
            alignItems="center"
            justifyContent='center'
            marginTop='10vh'
            sx={{
                minheight: '100vh',
                minWidth: '100vw',
            }}>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyItems='center'
                justifyContent='center'
                component={Paper}
                elevation={6}
                variant='outlined'
                borderRadius={16}
                padding={0}
                xs={9}
                md={8} //5
                lg={3}
                style={{
                    minHeight: '30vh',
                    minWidth: '30vw',
                    border: `3px solid ${green[200]}`,
                    paddingLeft: '4vh',
                    paddingRight: '4vh',
                    paddingBottom: '4vh',
                    paddingTop: '2vh'
                    // margin: '2vh'
                }}>


                <Grid container direction='column' alignItems='center'>
                    <Grid container direction='row' alignSelf='flex-start'>
                        <Grid item xs={10.5} />
                        <Grid item xs={1.5}>
                            <IconButton>
                                <CloseIcon onClick={handleClose} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={3}>
                        <IconButton>
                            <PersonAddDisabledIcon sx={{ fontSize: 60, color: green[300], mb: '2' }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography component="h1" variant='h3' align='center' fontFamily='revert' marginBottom = '1vh'> Find A User</Typography>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyItems='center' justifyContent='center' align='center'>
                    <Grid item xs = {10} justifySelf='center'>
                    <Autocomplete
                        autoHighlight
                        options={users}
                        getOptionLabel={(option) => option.username}
                        onChange={handleUserSelectChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Users"
                                placeholder="All Users"
                            />
                        )}
                    />
                    </Grid>
                </Grid>
                <Grid item padding='0'>
                    <Button
                        type='submit'
                        variant="outlined"
                        onClick={handleClick}
                        sx=
                        {{ mt: 2, background: 'green', color: 'white' }}>
                        Find User
                    </Button>
                </Grid>
            </Grid>               
            <div>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={1000}
                >
                    <Alert severity='error'> User Not Found</Alert>
                </Snackbar>
            </div>
        </Grid>)
}
export default Modal
