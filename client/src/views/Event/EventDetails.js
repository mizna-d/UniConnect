import { useEffect, useState } from 'react';
import {
  CardMedia,
  CardContent,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  AvatarGroup,
  Modal,
  Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext';
import axios from '../../api';
import { Events } from 'react-scroll';

const EventDetails = () => {
  const [open, setOpen] = useState(false);
  const [creator, setCreator] = useState({});
  const history = useHistory();
  const location = useLocation();
  const { currentUser } = useUser();
  const [event, setEvent] = useState(location.state.event.event);
  const d = new Date(event.date);
  const creatorId = event.creator;
  const [attendees, setAttendees] = useState([]);
  const [tags, setTags] = useState([]);
  const [attend, setAttend] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(async () => {
    const tagList = [];
    const getTag = (tagId) => {
      const getTagUrl = `/api/tag/${tagId}`;
      return axios
        .get(getTagUrl)
        .then((res) => {
          tagList.push({ name: res.data.name });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    event.tags.map((tag) => {
      getTag(tag);
    });
    setTags(tagList);

    const getCreatorUrl = `/api/users/${creatorId}`;
    const getCreator = () => {
      return axios
        .get(getCreatorUrl)
        .then((res) => {
          console.log('res.data: ', res.data);
          setCreator(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCreator();
  }, []);

  const handleAttendees = ((attendeeList) => {
    const getAttendee = (attendeeId) => {
      const getAttendeeUrl = `/api/users/${attendeeId}`;
      return axios
        .get(getAttendeeUrl)
        .then((res) => {
          attendeeList.push({ name: res.data.name, photo: res.data.photo });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    event.attendees.map((attendee) => {
      getAttendee(attendee);
    });
    setAttendees(attendeeList);
  });

  const handleAttend = () => {
    if (event.attendeeLimit === event.attendees.length) {
      return setShowAlert(true);
    }
    const attendUrl = `/api/events/attend/${event._id}`;
    axios({
      method: 'patch',
      url: attendUrl
    })
      .then((response) => {
        console.log('add attendees: ', response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const addEventUrl = `/api/users/addEvent/${event._id}`;
    axios({
      method: 'patch',
      url: addEventUrl
    })
      .then((response) => {
        console.log('add events: ', response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const getEventUrl = `/api/events/${event._id}`;
    const getEvent = () => {
      return axios
        .get(getEventUrl)
        .then((res) => {
          console.log('res.data: ', res.data);
          setEvent(res.data);
          console.log(event);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getEvent();
    setAttend(true);
    handleAttendees([{name: currentUser.name, photo: currentUser.photo}]);
  };

  const checkAttending = () => {
    try {
      if (currentUser._id === creatorId) {
        setAttend(true);
      } else {
        currentUser.attendingEvents.forEach((attendingEvent) => {
          if (attendingEvent == event._id) {
            setAttend(true);
          }
        });
      }
    } catch {
      history.push('/login');
    }
  };

  const handleComplete = () => {
    setComplete(true);
    console.log(complete);
    const editEventUrl = `/api/events/${event._id}`;
    axios({
      method: 'patch',
      url: editEventUrl,
      data: {
        completed: true
      }
    })
      .then((response) => {
        console.log('completed: ', response.data.completed);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(async () => {
    checkAttending();
    setComplete(event.completed);
    handleAttendees([]);
  });

  return (
    <Grid container alignItems='center' justifyContent='center' spacing={8} pt={15} direction='row'>
      <Grid item direction='column' xs={5}>
        <Grid item>
          <CardMedia component='img' height='400' image={event.photo} style={{ padding: 10 }} />
        </Grid>

        <Grid item container direction='column'>
          <CardContent>
            <Typography mt={1} variant='h3'>
              {event.name}
            </Typography>
            <Grid container mt={1} spacing={1}>
              {tags.map((tag) => (
                <Grid item>
                  <Button variant='outlined'>{tag.name}</Button>
                </Grid>
              ))}
            </Grid>
            <Typography mt={1} variant='h5'>
              <LocationOnSharpIcon />
              {event.location}
            </Typography>
            <Typography mt={1}>{d.toDateString()} |</Typography>
            <Typography mt={1}>{event.description}</Typography>
          </CardContent>
        </Grid>
      </Grid>
      <Grid item xs={3} container spacing={5} direction='column'>
        <Grid item>
          <Paper textAlign='center' style={{ padding: 20 }}>
            <Typography variant='h6'>host: {creator.name}</Typography>
            <Typography variant='h6'>Attendee Limit: {event.attendeeLimit}</Typography>
            <Typography variant='h6'>Attending : {event.attendees.length}</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            // component={
            //   currentUser && (currentUser.userType || currentUser._id === creatorId) && Button
            // }
            fullWidth
            textAlign='center'
            style={{
              padding: 20,
              alignItems: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              textTransform: 'none'
            }}
            // onClick={
            //   currentUser && (currentUser.userType || currentUser._id === creatorId) && handleOpen
            // }
          >
            <Typography variant='h6' mb={1}>
              Attendees
            </Typography>
            <AvatarGroup total={event.attendees.length} max={5}>
              {event.attendees.length == 0 ? (
                <Typography>No attendees yet. Be the first one!</Typography>
              ) : (
                event.attendees.map((attendee) => (
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                ))
              )}
            </AvatarGroup>
          </Paper>
          {/* <Modal open={open} onClose={handleClose}>
            <Box
              position='absolute'
              top='50%'
              left='50%'
              transfrom='translate(-50%, -50%)'
              backgroundColor='white'
              boxShadow='24'
              p={4}
            >
              <Typography mb={2} variant='h6' component='h2'>
                Attendees
              </Typography>
              <Grid container spacing={3} style={{ width: '400px' }}>
                {attendees.map((attendee) => (
                  <Grid item display='flex' flexDirection='column' alignItems='center'>
                    <Avatar {...(attendee.photo && `src=${attendee.photo}`)}>
                      {!attendee.photo && <PersonIcon />}
                    </Avatar>
                    <Typography>{attendee.name}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Modal> */}
        </Grid>
        <Grid item>
          {currentUser._id === creatorId || currentUser.userType ? (
            complete ? (
              <Button variant='outlined' disabled onClick={handleComplete} fullWidth size='large'>
                completed
              </Button>
            ) : (
              <Button variant='contained' onClick={handleComplete} fullWidth size='large'>
                complete
              </Button>
            )
          ) : attend ? (
            <Button variant='contained' fullWidth size='large' disabled='true'>
              Attending
            </Button>
          ) : (
            <Button onClick={handleAttend} variant='contained' fullWidth size='large'>
              Attend
            </Button>
          )}
        </Grid>
        <Grid item>
          {showAlert && (
            <Alert onClose={() => setShowAlert(false)} severity='error'>
              Sorry, this event is full
            </Alert>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EventDetails;
