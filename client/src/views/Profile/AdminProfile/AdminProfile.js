import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { Box, ThemeProvider, createTheme, positions } from '@mui/system';
import { useUser } from './../../../Contexts/UserContext'
import axios from '../../../api';
import { useState, useEffect } from 'react';

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
  width: '20vw',
  height: '20vh',
};

const AdminProfile = () => {
  const { currentUser } = useUser()
  const [users, setUsers] = React.useState([])
  
  useEffect(() => {
  axios({
      method: 'get',
      url: '/api/users',
    }).then(response => {
        setUsers(response.data)
    }).catch(function (error) {
      console.log(error)
    });
  },[]);
   
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
              <Avatar alt='Friend' sx={{ width: 200, height: 200 }}
              src = {currentUser.profilePhoto}>
              </Avatar>
            </ButtonBase>

            <Typography variant='h3' component='div'>
              {currentUser.username}
            </Typography>

            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
              <Typography variant='subtitle1' component='div'>
                Total Users: {' '}
                {users.length}
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

          <Box 
          sx={{ ...commonStyles, border: 0, flexGrow: 1}}
          >
            <Typography
              paragraph
              variant='h5'
              color='text.secondary'
              sx={{ p: 2, marginleft: '1', flexGrow: 1 }}
            >
              {currentUser.description}
            </Typography>
          </Box>

            <Box 
            display='flex'
            justifyContent='space-between'
            sx={{pt:2}}
            >
              <Button
                variant='contained'
                component={Link}
                to='/timeline'
                style={{ margin: 5 }}
              >
                Events
              </Button>
              <Button
                variant='contained'
                component={Link}
                to='/dashboard'
                style={{ margin: 5 }}
              >
                Dashboard
              </Button>
              </Box>
            </Grid>

          </Grid>

        </Grid>


      </Grid>
    
    </Grid>

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import { Link } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import ButtonBase from '@mui/material/ButtonBase';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import IconButton from '@mui/material/IconButton';
// import PersonIcon from '@mui/icons-material/Person';
// import { Box, ThemeProvider, createTheme, positions } from '@mui/system';

// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%'
// });

// const theme = createTheme({
//   palette: {
//     background: {
//       paper: '#ddbea9'
//     },
//     text: {
//       primary: '#173A5E',
//       secondary: '#46505A'
//     },
//     action: {
//       active: '#001E3C'
//     },
//     success: {
//       dark: '#009688'
//     }
//   }
// });

// const commonStyles = {
//   bgcolor: 'background.paper',
//   m: 1,
//   borderColor: 'text.primary',
//   width: '20rem',
//   height: '8rem',
//   border: 1
// };

// const AdminProfile = () => {
//   const handleMemberList = event => {
//     //gets list of users and displays to admin
//   }
//   return (
//     <Grid
//       container
//       spacing={0}
//       direction='row'
//       alignItems='center'
//       justifyContent='center'
//       style={{ minHeight: '100vh' }}
//       padding='0px'
//       padding-left='0px'
//       style={{ minHeight: '100vh', minWidth: '100vw' }}
//       sx={{
//         borderRadius: '16px',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         background: 'linear-gradient(141deg, #C9D991 0%, #d0f0c0 51%, #F2F2F2 75%);'
//       }}
//     >
//       <Grid
//         container
//         direction='row'
//         alignItems='center'
//         component={Paper}
//         elevation={6}
//         borderRadius={16}
//         padding='15px'
//         xs={5}
//       >
//         <Grid container spacing={2}>
//           <Grid item>
//             <ButtonBase sx={{ width: 128, height: 128 }}>
//               <Avatar alt='Friend' sx={{ width: 100, height: 100 }}></Avatar>
//             </ButtonBase>
//           </Grid>

//           <Grid item xs={12} sm container>
//             <Grid item xs container direction='column' spacing={2}>
//               <Grid item xs>
//                 <Typography variant='h3' component='div'>
//                   Admin
//                 </Typography>

//                 <Grid item xs container direction='row'>
//                   <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'
//                     onClick={handleMemberList}>
//                     <PersonIcon sx={{ borderRadius: 2 }} />
//                     <Typography variant='subtitle1' component='div'>
//                       257 members
//                     </Typography>
//                   </IconButton>
//                 </Grid>

//                 <Grid
//                   container
//                   direction='row'
//                   columns={{ xs: 4, sm: 8, md: 12 }}
//                   spacing={2}
//                   pb={1}
//                   pl={1}
//                 >
//                   <Grid item>
//                   </Grid>
//                 </Grid>
//                 <Grid item xs>
//                   <Box sx={{ ...commonStyles, border: 1, borderRadius: '16px' }}>
//                     <Typography
//                       paragraph
//                       variant='body2'
//                       color='text.secondary'
//                       sx={{ p: 2, marginleft: '1', maxWidth: 300, flexGrow: 1 }}
//                     >
//                       Description Description Description Description
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Box display='flex'>
//                   <Button variant='contained' component={Link} to="/dashboard" style={{ margin: 5 }} >View Statistics</Button>
//                   {/* <Button variant='contained' component={Link} to="/upcoming-events" style={{margin: 5}}>Upcoming Events</Button> */}
//                 </Box>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
  );
};

export default AdminProfile;
