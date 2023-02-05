import * as React from 'react';
import { useState } from "react";
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
import { TextField } from '@mui/material';


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

export default function AccountSetup() {
  const [inputCode, setInputCode] = useState('')
  const classes = useStyles();

  const handleVerificationCode = event => {
    const value = event.target.value;

    setInputCode(value)
    checkServerCode()
  };

  const handleResend = event => {

    //goes into database to find email and resend verification
  }
  function checkServerCode() {
    //get code from server
    const serverCode = "asdf"
    if (serverCode == inputCode) {
      //allow user to enter
    }
  };

  const card = (
    <React.Fragment>
      <CardContent
        sx={{ maxWidth: 550, }}>
        <Typography sx={{ p: 2 }} align='center' variant="h2" component="div" gutterbottom>
          Verify your email
        </Typography>
        <Typography align='center' variant="h5" gutterbottom>
          We sent an email to your account with a verification code. Enter it below:
        </Typography>
        <form spacing={2}
        >
          <TextField fullWidth label='Verification Code' margin='normal' placeholder='Enter Code'
            InputProps={{ endAdornment: <Button m={4} pt={3} size="large" href="/Profile" onClick={checkServerCode}>Enter</Button> }}
            onChange={handleVerificationCode}
            value={inputCode}
          />
        </form>
      </CardContent>
      <CardActions>
        <Button m={4} pt={3} size="large"
          onChange={handleResend}
        >Click to Resend</Button>
      </CardActions>
    </React.Fragment>
  );

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

          <Box sx={{ p: 2, minWidth: 275, marginTop: 30 }}>
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