import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AnimatedBg from '../Home/Components/AnimatedBg'
import classNames from "classnames";
import { Paper, Avatar, TextField, Link } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  waveBorder: {
    mb: '0px',
    pb: '0px'
  },
  wrapper: {
    position: "relative",
    backgroundColor: '#C9D991',
    paddingBottom: theme.spacing(20),
  },
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', borderRadius: 16 }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent
      sx={{ maxWidth: 550, }}>
      <Typography sx={{ p: 2 }} align='center' variant="h2" component="div" gutterbottom>
        Enter your emails and new password below:
      </Typography>
      <form spacing={2}> 
          <TextField fullWidth label='Email Address' margin = 'normal' placeholder='Enter Email'
        //   InputProps={{endAdornment: <Button m={4} pt={3} size="large" href="/profile">Enter</Button>}}
        />
      </form>
      <form spacing={2}> 
          <TextField fullWidth label='New Password' margin = 'normal' placeholder='Enter New Password'
        //   InputProps={{endAdornment: <Button m={4} pt={3} size="large" href="/profile">Enter</Button>}}
        />
      </form>
    </CardContent>
    {/* server call to reset password & saves user input */}
    <CardActions>
      <Button m={4} pt={3} size="large" href='/login'>Reset Password</Button>
    </CardActions>
  </React.Fragment>
);

export default function AccountSetup() {
  const classes = useStyles();
  return (
    <React.Fragment>

      <div className={classNames("lg-p-top", classes.wrapper)}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            background: 'linear-gradient(180deg, #C9D991 0%, #d0f0c0 51%, #F2F2F2 75%);',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >

          <Box sx={{ p: 2, minWidth: 275, marginTop: 30, borderRadius: 16, }} >
            <Card variant="outlined" sx={{ borderRadius: 16, p: '5vh' }}>{card}</Card>
          </Box>

        </Grid>

        <AnimatedBg
          upperColor="#F2F2F2"
          lowerColor="#C9D991"
          className={classes.waveBorder}
          animationNegativeDelay={5}
        />
      </div>
    </React.Fragment>

  );
}