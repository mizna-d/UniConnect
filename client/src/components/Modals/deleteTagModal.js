import React from 'react'
import { useState } from "react";
import { Icon, Button, Alert, IconButton, Tooltip, Snackbar, Grid, Paper, Autocomplete, Avatar, Typography, Box, TextField, Link, SliderValueLabel } from '@mui/material';
import { green } from '@mui/material/colors';
import LabelOffIcon from '@mui/icons-material/LabelOff';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../api'


function Modal({ handleClose, tags}) {
    const [open, setOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const [tagsChosen, setTagChosen] = useState([])

    const handleTagSelectChange = (event, value) => {
        setTagChosen(value)
    }

    const handleClick = () => {
        if (tagsChosen != '') { 
            deleteTags()
            setTagChosen([])
            setOpen(true);
            // tagsChosen.forEach(element => {        
            //     axios({
            //        method: 'delete',
            //        url: '/api/tag',
            //        params: {
            //            name: element.name
            //        }
            //      }).then(response => {
            //         setOpen(true);
            //          console.log(response)
            //          tagsChosen([])
            //      }).catch(function (error) {
            //        console.log(error);
            //        setOpenSnackbar(true)
            //      });
            //    })
        } else {
            setOpenSnackbar(true)
        }
    };

    const Input = styled('input')({
        display: 'none',
    });

    function deleteTags() {
        tagsChosen.forEach(element => {        
            axios({
               method: 'delete',
               url: '/api/tag',
               params: {
                   name: element.name
               }
             }).then(response => {
                 console.log(response)
             }).catch(function (error) {
               console.log(error);
               setOpenSnackbar(true)
             });
           })
    }


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
                    <Grid item >
                        <IconButton>
                            <LabelOffIcon sx={{ fontSize: 60, color: green[300], mb: '2' }} />
                        </IconButton>
                    </Grid>
                    <Grid item >
                        <Typography component="h1" variant='h3' align='center' fontFamily='revert' marginBottom = '1vh'> Delete Tags</Typography>
                    </Grid>
                </Grid>
                <Grid container direction='row'justifyItems='center' justifyContent='center' align='center'>
                <Grid item align='center' xs={10}>
                    <Autocomplete
                        multiple
                        options={tags}
                        getOptionLabel={(option) => option.name}
                        value={tagsChosen}
                        onChange={handleTagSelectChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tags"
                                placeholder="Select tags to Delete"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                </Grid>
                <Grid item padding='0'>
                    <Button
                        type='submit'
                        variant="outline"
                        onClick={() => { handleClick()}}
                        sx=
                        {{ mt: 2, background: 'green' }}>
                        Delete Tags
                    </Button>
                </Grid>
            </Grid>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                >
                    <Alert severity='success'> Tag Deleted </Alert>
                </Snackbar>
            </div>
            <div>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                >
                    <Alert severity='error'> Tag Not Deleted </Alert>
                </Snackbar>
            </div>
        </Grid>)
}
export default Modal
