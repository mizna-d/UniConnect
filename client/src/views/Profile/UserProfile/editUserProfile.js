import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Button, Grid, Paper, Typography, TextField, Dialog, DialogActions, DialogContent,DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { Box, ThemeProvider, createTheme, positions } from '@mui/system';
import { useUser } from './../../../Contexts/UserContext'
import axios from '../../../api';
import { useState, useEffect } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { uploadPicture } from '../../../api/functions';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

const theme = createTheme({
  palette: {
    background: {
      paper: '#ddbea9'
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A'
    },
    action: {
      active: '#001E3C'
    },
    success: {
      dark: '#009688'
    }
  }
});

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '20vw',
  height: '20vh',
  border: 1,
//   borderRadius: 16
};

const EditUserProfile = () => {
const { currentUser } = useUser()
const [username, setUsername] = useState('')
const [description, setDescription] = useState('')
const [name, setName] = useState('')
const [image, setImage] = useState(null)

const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const handleValueChange = (event, setter) => {
    const value = event.target.value;

    setter(value)
};

function photoHandler(event) {
    setImage(event.target.files[0])
}
const Input = styled('input')({
    display: 'none',
});

function handleSubmit(event) {
    event.preventDefault()
    const userUrl = '/api/users/'+currentUser._id
    const passData = {};

    if(name !== ''){
        passData['name'] = name
    }
    if(username !== ''){
        passData['username'] = username
        console.log(passData)
    }
    if(description !== ''){
      passData['description'] = description
      console.log(passData)
  }
    axios({
      method: 'patch',
      url: userUrl,
      data: passData
    }).then(response => {
        if(image != null){
            const url = `/api/user-photo/${response.data._id}`
            uploadPicture(url, image)
        }   
        console.log(response.data)
        handleClose()
    }).catch(function (error) {
      console.log(error)
    });
}
   
  return (

    <Grid
      container
      spacing={0}
      direction='row'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
      padding='0px'
      padding-left='0px'
      style={{ minHeight: '100vh', minWidth: '100vw' }}
      sx={{
        borderRadius: '16px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: 'linear-gradient(180deg, #C9D991 10%, #d0f0c0 51%, #F2F2F2 90%);'
      }}
    >
        
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        component={Paper}
        elevation={6}
        borderRadius={16}
        spacing={2}
        sx={{p:5}}
        maxWidth='55vw'
      >
        
        <Grid 
        item
        xs
        >
          <form>
          <Grid container direction='column' alignItems='center' justifyItems='center'>
          <Typography 
          variant='h3'
          >Edit Profile</Typography>
            <TextField 
            fullWidth
            label='New Username'
            variant="standard"
            defaultValue="Default Value"
            helperText="Enter new username above and click submit" 
            right-padding='5px' 
            margin='normal' 
            placeholder='Write New Username' 
            value={username} 
            onChange={(event) => {handleValueChange(event, setUsername)}}
            error={username !== "" && username.length < 5}
            />

            <TextField 
            fullWidth
            label='New Name'
            variant="standard"
            defaultValue="Default Value"
            helperText="Enter new name above and click submit" 
            right-padding='5px' 
            margin='normal' 
            placeholder='Write New Name' 
            value={name} 
            onChange={(event) => {handleValueChange(event, setName)}}
            />

            <Grid item>
                <label htmlFor="icon-button-file" xs={1}>
                <Input accept="image/*" id="icon-button-file" type="file" onChange={photoHandler}/>
                
                <Tooltip title='Upload your profile picture'>
                <IconButton component="span">
                <PhotoCamera />
                </IconButton>
                </Tooltip>
                
                </label>
            </Grid>

            </Grid>
            </form>
            </Grid>
        <Grid 
        item
        xs
        >
          <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          >
          <Grid
          item
          >
            <TextField 
            fullWidth
            multiline='true'
            rows={4}
            label='New Description'
            variant="outlined"
            defaultValue="Default Value"
            helperText="Enter new Description above and click submit" 
            right-padding='5px' 
            margin='normal' 
            placeholder='Write New Description' 
            value={description} 
            onChange={(event) => {handleValueChange(event, setDescription)}}
            />

            <Box 
            display='flex'
            justifyContent='space-between'
            sx={{pt:2}}
            >
                <Tooltip title='Return to Dashboard without saving'>
              <Button
                variant='contained'
                component={Link}
                to='/dashboard'
                style={{ margin: 5 }}
              >
                Dashboard
              </Button>
              </Tooltip>

              <div>
                <Button 
                variant='contained'
                style={{ margin: 5 }}
                type='submit'
                onClick={handleClickOpen}>
                    Save Changes
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Click Submit, then Logout to see your changes"}
                    </DialogTitle>

                    <DialogActions>
                    <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>

                </Dialog>
                </div>

              </Box>
            </Grid>

          </Grid>

        </Grid>


      </Grid>
    
    </Grid>
    )
}

export default EditUserProfile
