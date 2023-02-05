import { useEffect, useState, React } from 'react';
import { styled } from '@mui/material/styles';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Box, ThemeProvider, createTheme, positions } from '@mui/system';
import { GridClassKey } from '@material-ui/core';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import { useUser } from '../../Contexts/UserContext'
import axios from '../../api';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const theme = createTheme({
  palette: {
    background: {
      paper: '#ddbea9',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '20rem',
  height: '8rem',
  border: 1,

};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const AddFriend = () => {
  const location = useLocation();
  const friend = location.state.user.newFriend;
  const { currentUser } = useUser()
  const history = useHistory();

function setText(friendly) {

  if(currentUser !== null){
    if(currentUser.friends.includes(friend._id)){
      friendly = 'delete friend'
    }
    else if (currentUser.userType){
      friendly = 'delete user'
    }
    else{
      friendly = 'add friend'
    }
  }
  return friendly

}

const handleValueChange = (event, setter) => {
  const value = event.target.value;

  setter(value)
};

function handleFindFriend() {
  // event.preventDefault()
  if(currentUser.friends.includes(friend._id)){
    window.location.reload();
    console.log('delete')
    const friendUrl = '/api/users/friend/'+friend._id
  axios({
    method: 'delete',
    url: friendUrl
  }).then(response => {
      console.log(response.data)
  }).catch(function (error) {
    console.log(error)
  });
  }
  else if (currentUser.userType){
    console.log('delete')
    const friendUrl = '/api/users/'+friend._id
  axios({
    method: 'delete',
    url: friendUrl
  }).then(response => {
      console.log(response.data)
      history.push({
        pathname: '/dashboard',
})
  }).catch(function (error) {
    console.log(error)
  });
  }
  else{
    window.location.reload();
  const friendUrl = '/api/users/addFriend/'+friend._id
  axios({
    method: 'patch',
    url: friendUrl
  }).then(response => {
      console.log(response.data)
  }).catch(function (error) {
    console.log(error)
  });
}
}

  const [tags, setTags] = useState([])  
  useEffect(() => {
  axios({
      method: 'get',
      url: '/api/tag',
    }).then(response => {
        setTags(response.data)
    }).catch(function (error) {
      console.log(error)
    });
  },[]);

  const getFriendTags = () =>{
    const arr = []
    tags.forEach( tag=> {
      if(friend.tags.includes(tag._id)){
        arr.push(tag.name)
      }
    })
    return arr;
  }  

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [description, setDescription] = useState('')

  const handleReport = () => {
    axios({
      method: 'post',
      url: "/api/user-report",
      data: {
        id: friend._id,
        description: description
      }
    }).then(response => {
      console.log("resposne data")
        console.log(response.data)
        setOpen(false);
    }).catch(function (error) {
      console.log(error)
    });
  };

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
      // rowSpacing='50px'
    >
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
          <ButtonBase item sx={{ width: 200, height: 200 }}>
            <Avatar alt='Friend' sx={{ width: 150, height: 150 }}
            src = {friend.profilePhoto}>
            </Avatar>
          </ButtonBase>

          <Typography variant='h3' component='div'>
            {friend.username}
          </Typography>

          <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
            <PersonIcon sx={{ borderRadius: 2 }} />
            <Typography variant='subtitle1' component='div'>
              {friend.friends.length}
            </Typography>
          </IconButton>
        </Grid>
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
          {(setText() != 'add friend') &&
          <>
          <Box 
          sx={{ ...commonStyles, border: 0, overflow:"auto", 
          flexgrow: 1, flexDirection:"column"}}
          >
            <Typography
              paragraph
              variant='h5'
              color='text.secondary'
              sx={{ p: 2, marginleft: '1', flexGrow: 1 }}
            >
              {friend.description}
            </Typography>
          </Box>
          </>}
          
        <Grid
        container
        direction='row'
        columns={{ xs: 4, sm: 8, md: 12 }}
        spacing={2}
        pb={1}
        pl={1}
        >
          {getFriendTags().map((tag) => (
            <Grid 
              item key={tag._id}
              >
              <Button variant='outlined'>
                
                <Typography sx={{ cursor: 'pointer' }}>
                  {tag}
                </Typography>
              </Button>
            </Grid>
            ))}
          </Grid>

          <Grid
        container
        direction='row'
        justifyContent="space-evenly"
        >

          <Box 
          display='center'
          alignItems="center"
          justifyContent='space-between'
          sx={{pt:2}}
          >
            <Button 
            color="secondary"
            id='friendly'
            onClick={ () => {handleFindFriend();}}
            >
              <Item>
                <Typography variant="button" component="div" gutterBottom
                value='help'
                sx={{ cursor: 'pointer' }}
                >
                  {setText()}
                </Typography>
              </Item>
            </Button>
            
            {(currentUser !== null) && !(currentUser.userType) && (
              <>

              <div>
                    <Button 
                    id='friendly'
                    onClick={handleClickOpen}>
                    <Item>
                    <Typography variant="button" component="div" gutterBottom
                    value='help'
                    sx={{ cursor: 'pointer' }}
                    >
                      Report
                    </Typography>
                    </Item>
                    </Button>
              
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Report</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Write below why you would like to report this user:
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          type="text"
                          label="Report"
                          fullWidth
                          variant="standard"
                          value={description} 
                          onChange={(event) => {handleValueChange(event, setDescription)}}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleReport}>Report</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
            </>
            )}

            </Box>
            </Grid>
          </Grid>

        </Grid>

      </Grid>


    </Grid>
  
  </Grid>



    // <Grid
    //   container
    //   spacing={0}
    //   direction="row"
    //   alignItems="center"
    //   justifyContent="center"
    //   style={{ minHeight: '100vh' }}
    //   padding='0px'
    //   padding-left='0px'
    //   style={{ minHeight: '100vh', minWidth: '100vw' }}
    //   sx={{
    //     borderRadius: '16px',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     background: 'linear-gradient(141deg, #C9D991 0%, #d0f0c0 51%, #F2F2F2 75%);',
    //   }}
    // >

    //   <Grid
    //     container
    //     direction="row"
    //     alignItems="center"
    //     component={Paper}
    //     elevation={6}
    //     borderRadius={16}
    //     padding='15px'
    //     xs={5}
    //   >
    //     <Grid container spacing={2}>
    //       <Grid item>
    //         <ButtonBase sx={{ width: 128, height: 128 }}>
    //           <Avatar
    //             alt="Friend"
    //             sx={{ width: 100, height: 100 }}>
    //           </Avatar>
    //         </ButtonBase>
    //       </Grid>

    //       <Grid item xs={12} sm container>

    //         <Grid item xs container direction="column" spacing={2}>

    //           <Grid item xs>
    //             <Typography variant="h3" component="div" gutterBottom>
    //               Friend Name
    //             </Typography>

    //             <Grid item xs
    //               container
    //               direction="row">
    //               <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
    //                 <FavoriteIcon sx={{ borderRadius: 2 }} />
    //                 <Typography variant="subtitle1" component="div">
    //                   3 (Heart number)
    //                 </Typography>
    //               </IconButton>
    //             </Grid>

    //             <Box sx={{ p: '10px', flexGrow: 1, display: 'flex', borderRadius: '50%' }}
    //               item xs="auto">

    //               <Grid
    //                 container
    //                 direction="row"
    //                 justifyContent="flex-start"
    //                 alignItems="flex-start"
    //                 spacing={{ xs: 1, md: 2 }}
    //                 columns={{ xs: 4, sm: 8, md: 12 }}>

    //                 {Array.from(Array(3)).map((_, index) => (
    //                   <Button color="secondary">
    //                     <Item>
    //                       <Typography variant="button" component="div" gutterBottom
    //                         sx={{ cursor: 'pointer' }}>
    //                         Tag
    //                       </Typography>
    //                     </Item>
    //                   </Button>
    //                 ))}

    //               </Grid>
    //             </Box>

    //             <Box sx={{ display: 'flex', width: 300, height: 200 }}>
    //               <Box sx={{ ...commonStyles, border: 1, borderRadius: '16px' }}>
    //                 <Typography paragraph variant="body2" color="text.secondary"
    //                   sx={{ p: 2, marginleft: '1', maxWidth: 300, flexGrow: 1 }}>
    //                   Description
    //                   Description
    //                   Description
    //                   Description
    //                 </Typography>
    //               </Box>
    //             </Box>
    //           </Grid>

    //           <Grid
    //             container
    //             direction="row"
    //             justifyContent="flex-start"
    //             alignItems="flex-start">

    //             <Button component={Link} to='/Profile' color="secondary"
    //               onChange={handleFindFriend}>
    //               <Item>
    //                 <Typography variant="button" component="div" gutterBottom
    //                   sx={{ cursor: 'pointer' }}>
    //                   Add as Friend
    //                 </Typography>
    //               </Item>
    //             </Button>

    //           </Grid>

    //         </Grid>

    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
  )
}

export default AddFriend

