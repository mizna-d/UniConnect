import React from 'react'
import { useState } from "react";
import { Icon, Button, Alert, IconButton, Tooltip, Snackbar, Grid, Paper, Autocomplete, Avatar, Typography, Box, TextField, Link, SliderValueLabel } from '@mui/material';
import { green } from '@mui/material/colors';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from "../../Contexts/UserContext";
import axios from '../../api';

function Modal({ handleClose, categories }) {
    const { setCurrentUser } = useUser()

    const [tag, setTag] = useState('')

    const handleTagChange = event => {
        const value = event.target.value;
        setTag(value)
    };
    const [category, setCategory] = useState('')

    const categoryChange = (event, value) => {
        setCategory(value)
    }

    const [open, setOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        setOpenSnackbar(false)
      };

    const handleClick = (event) => {
        event.preventDefault()
        if(tag != '' && category != '') {
            axios({
                method: 'post',
                url: '/api/tag',
                data: {
                    name: tag,
                    category: category               
                }
              }).then(response => {
                console.log(response)
                setTag('')
                setCategory('')
                setOpen(true);
            }).catch(function (error) {
              console.log(error);
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
                            <LocalOfferIcon sx={{ fontSize: 60, color: green[300], mb: '2' }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography component="h1" variant='h3' align='center' fontFamily='revert'> Create Tag</Typography>
                    </Grid>
                </Grid>
                <Grid item align='center' xs={12}>
                    <form onSubmit={handleClick}>
                        <TextField fullWidth margin='normal' label="New Tag Name" placeholder='ex. gaming, movies' type="search" value={tag} onChange={handleTagChange}/>
                        
                        <Autocomplete
                        autoHighlight
                        options={categories}
                        getOptionLabel={(option) => option}
                        value={category}
                        onChange={categoryChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Category"
                                placeholder="Select which category this tag belongs to"
                                fullWidth
                            />
                        )}
                    />
                    </form>
                </Grid>
                <Grid item padding='0'>
                    <Button
                        type='submit'
                        variant="outline"
                        onClick={handleClick}
                        sx=
                        {{ mt: 2, background: 'green' }}>
                        Create Tag
                    </Button>
                </Grid>
            </Grid>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert severity='success'> Tag Created </Alert>
                </Snackbar>
            </div>
            <div>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={2000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert severity='error'> Tag Not Created </Alert>
                    </Snackbar>
                </div>
        </Grid>)
}
export default Modal
