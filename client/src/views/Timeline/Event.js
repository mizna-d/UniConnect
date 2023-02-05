import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Grid,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useUser } from '../../Contexts/UserContext';
import { useHistory } from 'react-router-dom';
import axios from '../../api';

const Event = ({ event }) => {
  const { currentUser } = useUser();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    const deleteEventUrl = `/api/events/${event._id}`;
    axios({
      method: 'delete',
      url: deleteEventUrl
    })
      .then((response) => {
        console.log('deleted event: ', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose()
    window.location.reload();
  };

  return (
    <Card style={{ height: '100%' }} pb={10}>
      <Grid container spacing={3} style={{ height: '100%' }}>
        <Grid item xs={12} md={5}>
          <CardMedia component='img' height='250' image={event.photo} style={{ padding: 10 }} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid
            container
            style={{
              padding: 10,
              paddingBottom: 25,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}
          >
            <Grid item>
              <Typography gutterBottom variant='h5' component='div'>
                {event.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' textAlign='left' gutterBottom>
                {event.description}
              </Typography>
            </Grid>
            <Grid item>
              <Stack direction='row' mt={3} mb={0}>
                <LocationOnSharpIcon />
                <Typography variant='overline' display='block' color='textSecondary'>
                  {event.location}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1} ml={1}>
                <Typography variant='body1' color='textSecondary'>
                  {event.attendees.length} / {event.attendeeLimit}
                </Typography>
                <PeopleAltIcon />
                <Typography>attendees</Typography>
              </Stack>
              <CardActions>
                <Button
                  onClick={() => {
                    history.push({
                      pathname: '/eventdetails',
                      state: { event: { event } }
                    });
                  }}
                >
                  Learn More
                </Button>
                {currentUser && currentUser.userType && (
                  <>
                    <Button onClick={handleOpen}>Delete</Button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>{"Delete the event?"}</DialogTitle>
                      <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                )}
              </CardActions>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Event;
