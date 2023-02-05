import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import Event from '../Timeline/Event';
import axios from '../../api';
import { useUser } from '../../Contexts/UserContext';


const PastEvents = () => {
  const [events, setEvents] = useState([]);
  const { currentUser } = useUser();

  useEffect(async () => {
    await axios
    .get('/api/events')
    .then((res) => {
      const eventFilter = res.data.filter(function (event){return event.completed})
      console.log('filter: ', eventFilter);
      setEvents(eventFilter);
    })
    .catch((error) => {
      console.log(error);
    }, [events]);
  }, []);
  
  return (
    <Grid
      justifyContent='center'
      sx={{
        background: 'linear-gradient(120deg, #C9D991 0%, #d0f0c0 51%, #F2F2F2 75%);',
        backgroundSize: 'cover',
        paddingBottom: 5,
        height: '100%',
        minHeight: '100vh'
      }}
    >
      <Container>
        <Grid container spacing={3} mt={12}>
          {events.map((event) => (
            <Grid item xs={12} sm={6}>
              <Event event={event} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};

export default PastEvents;
