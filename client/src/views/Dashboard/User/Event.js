import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, createTheme, Stack } from "@mui/material";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const TimelineEventCard = ({
  title,
  description,
  location,
  picture,
  totalParticipant,
  currentParticipant,
  eventLink
}) => {


  return (
    <Card style={{ height: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <CardMedia
            component="img"
            height="250"
            image={picture}
            style={{ padding: 10 }}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <CardContent style={{ paddingBottom: 16 }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Stack direction="row" mt={3} mb={0}>
              <LocationOnSharpIcon />
              <Typography
                variant="overline"
                display="block"
                color="textSecondary"
              >
                {location}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1" display="block" color="textSecondary">
                {currentParticipant} / {totalParticipant}
              </Typography>
              <PeopleAltIcon />
            </Stack>
            <Typography variant="body1" display="block" color="textSecondary">
              {eventLink}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>

  );
};

export default TimelineEventCard;
