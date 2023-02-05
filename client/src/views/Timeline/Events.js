import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Event from './Event';
import axios from '../../api';
import { getAllTags, checkSession } from '../../api/functions'
import { useLocation } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext'

const Events = ({selectedTags, setSelectedTags}) => {
  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState({});
  const location = useLocation();
  const fromSearch = location.state ? location.state.fromSearch : null
  const { currentUser, setCurrentUser } = useUser()

  useEffect(async () => {
    await axios
      .get('/api/events')
      .then((res) => {
        console.log('res.data: ', res.data);
        setEvents(res.data);
      })
      .catch((error) => {
        console.log(error);
    }, [events]);

    const res = await getAllTags()
    const obj1 = {}
    res.forEach(tag => {obj1[tag._id] = tag.name})
    setTags(obj1)

    if(!fromSearch){
      const tempUser = await checkSession(setCurrentUser)
      res.forEach(tag => {
        if(tempUser.tags.includes(tag._id)){
          setSelectedTags(prevState => ({
            ...prevState,
            [tag.name]: true
          }));
        }
      })
    }

  }, []);

  useEffect( () => () => {
    setSelectedTags(prevState => {
      const temp = {}
      for (const property in prevState) {
          temp[property] = false
      }
      return temp
    });
  }, [] );

  const eventFilter = () => {
    let filtered = false
    for (const property in selectedTags) {
      if(selectedTags[property]) filtered = true
    }

    if(filtered){
      return events.filter(event => {
        let take = false
        event.tags.forEach(id => {if(selectedTags[tags[id]]) take = true})
        return take
      })
    }
    else{
      return events
    }
  }

  return (
    <Grid
      justifyContent='center'
      sx={{
        background: 'linear-gradient(120deg, #C9D991 0%, #d0f0c0 51%, #F2F2F2 75%);',
        backgroundSize: 'cover',
        height:'100%',
        minHeight:'100vh',
        paddingBottom: 5
      }}
    >
      <Container>
        <Grid container spacing={3} mt={12}>
          {eventFilter().map((event) => {
            return (
              <Grid item xs={12} sm={6}>
                <Event event={event} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Grid>
  );
};
export default Events;
