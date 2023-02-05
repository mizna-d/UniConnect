import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './Components/Header';
import Descriptions from './Components/Descriptions';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundSize: 'cover',
  },
  waveBorder: {
    paddingTop: theme.spacing(0),
  },
}));
export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Descriptions />
    </div>
  );
}
