import React, { useEffect, useState, Fragment } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Stack } from "@mui/material";
import Background from "./bg_img_simp.png"
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Typography,
  Card,
  Button,
  Hidden,
  Box,
  withStyles,
  withWidth,
  isWidthUp,
} from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { lightGreen } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Link } from 'react-router-dom';
import AnimatedBg from "./AnimatedBg";
import Tooltip from '@mui/material/Tooltip';
import { useUser } from '../../../Contexts/UserContext'
import axios from '../../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  appbar: {
    background: 'none',
    padding: '10px 30px',
    width: '100vw',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  colorText: {
    color: '#4B592D',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#C9D991',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#A9BF5A',
    fontSize: '6rem',
  },
  button: {
    backgroundColor: '#C9D991',
    "&:hover": {
      backgroundColor: "#76853e",
    },
    mt: '2px',
    pt: '5px',
  },
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const { currentUser, setCurrentUser } = useUser()
  useEffect(() => {
    setChecked(true);
  }, []);

  const [userSearch, setUserSearch] = useState('')
  const history = useHistory();

  function handleSearch(event) {
    history.push({
      pathname: '/timeline',
})
  }

  function logouthandler() {
    axios({
      method: 'get',
      url: '/api/users/logout'
    }).then(response => {
        console.log(response)
        setCurrentUser(response.data)
    }).catch(function (error) {
      console.log(error);
    }).then(() => {setCurrentUser(null)})
  }

  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          // backgroundImage: `url(${Background})`,
          // backgroundColor: '#F2F2F2',
          background: 'linear-gradient(180deg, #C9D991 0%, #d0f0c0 51%, #F2F2F2 75%);',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={classes.root} id="header">

          <Grid
            container
            // direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <AppBar
              elevation={0}
              position="static"
              color='transparent'
              sx={{ width: '100vw', }}
            >
              <Stack direction="row"
                sx={{ mt: '15vh', mb: '0px', pb: '0px' }}>
                <img
                  src="https://cdn.discordapp.com/attachments/886450083346915328/903444358714490900/globe-removebg-preview.png"
                  alt="logo"
                />
              </Stack>
            </AppBar>

            <Collapse
              in={checked}
              {...(checked ? { timeout: 1000 } : {})}
              collapsedHeight={50}
            >
             
              <div className={classes.container}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={20}
                >
                  
                  <Avatar alt="Logo" src="/images/Connected-pana.png"
                    sx={{ width: 400, height: 400, bgcolor: '#C9D991' }}
                  />
                  
                </Stack>

                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  spacing={10}
                >
                   {(currentUser === null)?( 
                  <>
                  <Grid
                  item
                  marginTop="4vh"
                  >
                  <Button variant="contained"
                    className={classes.button}
                    href="/signup"
                    >
                    <Typography variant="button" component="div" gutterBottom
                      sx={{cursor: 'pointer'}}>
                      Sign Up
                    </Typography>
                  </Button>
                  </Grid>

                  <Grid
                  item
                  marginTop="4vh">
                  <Button href="/login" variant="contained"
                    className={classes.button}
                  >
                    <Typography variant="button" component="div" gutterBottom
                      sx={{ cursor: 'pointer' }}>
                      Log In
                    </Typography>

                  </Button>
                  </Grid>
                  </>):(
                    <>

                  <Grid
                  item
                  marginTop="4vh"
                  >
                  <Button variant="contained"
                    className={classes.button}
                    onClick={logouthandler}
                    >
                    <Typography variant="button" component="div" gutterBottom
                      sx={{ cursor: 'pointer' }}>
                      Logout
                    </Typography>
                  </Button>
                  </Grid>

                  <Grid
                  item
                  marginTop="4vh">
                  <Button variant="contained"
                    className={classes.button}
                    href='/dashboard'
                    >
                    <Typography variant="button" component="div" gutterBottom
                      sx={{ cursor: 'pointer' }}>
                      Dashboard
                    </Typography>
                  </Button>
                  </Grid>
                    </>
                  )
                  }

                </Grid>
                <Scroll to="description" smooth={true}>
                  <IconButton>
                    <ExpandMoreIcon className={classes.goDown} />
                  </IconButton>
                </Scroll>

                <AnimatedBg
                  upperColor="#F2F2F2"
                  lowerColor="#C9D991"
                  className={classes.waveBorder}
                  animationNegativeDelay={2}
                />
              </div>
            </Collapse>
          </Grid>
        </div>
      </Grid>

    </Fragment>
  );
}