import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    minWidth: 600,
    background: 'rgba(0,0,0,0.5)',
    margin: '20px',
  },
  media: {
    height: 440,
  },
  title: {
    fontSize: '1.7rem',
    color: '#fff',
  },
  desc: {
    fontSize: '1rem',
    color: '#ddd',
  },
});

export default function ImageCard({ description, checked }) {
  const classes = useStyles();

  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={description.imageUrl}
          title="pictures"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            className={classes.title}
          >
            {description.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            {description.description}
          </Typography>
          <Typography>
            {description.link}
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
}