import * as React from 'react';
import { useState } from 'react';
import { Icon, InputBase, Button, Alert, IconButton, Tooltip, Snackbar, Grid, Paper, Autocomplete, Avatar, Typography, Box, TextField, Link, SliderValueLabel } from '@mui/material';
import { green } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { ContactSupport, ControlCameraOutlined, HowToVoteRounded } from '@material-ui/icons';
import { useUser } from '../../Contexts/UserContext';
import { useHistory } from 'react-router-dom';
import axios from '../../api';


function Modal({ handleClose }) {
    const [friend, setFriend] = useState('');
    const [username, setUsername] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { currentUser } = useUser();
    const history = useHistory();

    const handleUserChange = (event) => {
        const value = event.target.value;
        setUsername(value)
    }

    const handleClick = (event) => {
        event.preventDefault()
        console.log(username)
        if (username != '') {
        axios({
            method: 'get',
            url: '/api/users/find/by/username',
            params: {
                username: username,
            }
          }).then(response => {
                setFriend(response.data)
                const newFriend = response.data
                console.log(response)
                history.push({
                    pathname: '/userDetails',
                    state: { user: { newFriend } }
            })
          }).catch(function (error) {
                console.log(username)
                console.log(error)
                setOpenSnackbar(true)
          })
        } else {
            setOpenSnackbar(true)
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false)
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
                md={8}
                lg={3}
                style={{
                    minHeight: '30vh',
                    minWidth: '30vw',
                    border: `3px solid ${green[200]}`,
                    paddingLeft: '4vh',
                    paddingRight: '4vh',
                    paddingBottom: '4vh',
                    paddingTop: '2vh'
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
                            <PersonAddAlt1Icon sx={{ fontSize: 60, color: green[300], mb: '2' }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography component="h1" variant='h3' align='center' fontFamily='revert' marginBottom='2vh'> Find Friend</Typography>
                    </Grid>
                </Grid>
               
               



            <Grid>
                <Box>
                    <TextField
                        fullWidth
                            placeholder="Input your friend's username"
                            onSubmit={(e) => {handleClick(e)}}
                            inputProps={{ 'aria-label': 'search' }}
                            value={username}
                            onChange={handleUserChange}
                        />
                    </Box>
            </Grid>
                <Grid container direction='row' justifyItems='center' justifyContent='center'>
                    {/* <Grid xs={}></Grid> */}
                    <Grid item justifySelf='center'>
                        <Button
                            startIcon={<SearchIcon/>}
                            type='submit'
                            variant='outlined'
                            paddingRight='30vh'
                            onClick={(e) => {handleClick(e)}}
                            sx={{
                                color: 'white',
                                background: 'green',
                                marginTop: '2vh',
                                "&:hover": {
                                    variant: 'outlined',
                                    color: "green",
                                },
                            }}
                        >
                            Find Friend
                        </Button>
                    </Grid>
                </Grid>
            <div>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={2000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert severity='error'> User Not Found </Alert>
                    </Snackbar>
                </div>
        </Grid>
    </Grid>)}

export default Modal