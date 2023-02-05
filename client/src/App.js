import React, { Fragment, useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Home from './views/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Timeline from './views/Timeline/Events';
import Events from './views/Timeline/Events';

import EventDetails from './views/Event/EventDetails'

import AccountSetup from './views/AccountSetup/AccountSetup';
import userDetails from './views/AddFriend/AddFriend';
import AnimatedBg from './views/Home/Components/AnimatedBg';
import InterestFinder from './views/InterestFinder';
import { useUser } from "./Contexts/UserContext";
import DashboardRouter from "./views/Dashboard/DashboardRouter";
import LoginRouter from "./views/Login/LoginRouter";
import SignupRouter from "./views/Signup/SignupRouter";
import ResetPassword from "./views/ResetPassword/ResetPassword"
import UserProfile from "./views/Profile/UserProfile/UserProfile";
import EditUserProfile from "./views/Profile/UserProfile/editUserProfile";
import AdminProfile from "./views/Profile/AdminProfile/AdminProfile";
import PastEvents from './views/Event/PastEvents';
import UpcomingEvents from './views/Event/UpcomingEvents';
import ProfileRouter from "./views/Profile/ProfileRouter";
import {getAllTags} from "./api/functions"

const theme = createTheme({
  typography: {
    fontFamily: [
      'Varela',
      'round',
    ].join(','),
  },

  palette: {
    primary: {
      main: "#A9BF5A",
    },
    secondary: {
      main: "#4B592D",
    },
  },

});



function App() {
  const [eventId, setEventId] = useState(0);
  // const [userType, setUsertype] = useState("unauthorized");
  // //const [userType, setUsertype] = useState("user");
  const history = useHistory();
  const { currentUser, setCurrentUser } = useUser()
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState({})
  
  useEffect(async () => {
    const tempTags = await getAllTags()
    const tempTagsArr = []
    tempTags.forEach(tag => {
      tempTagsArr.push(tag.name)
    })
    //console.log(tempTagsArr)
    setTags(tempTagsArr)

    const obj1 = {}
    tempTags.forEach(tag => {obj1[tag.name] = false})
    setSelectedTags(obj1)
  }, [])

  useEffect(async () => {
    const tempTags = await getAllTags()
    const tempTagsArr = []
    tempTags.forEach(tag => {
      tempTagsArr.push(tag.name)
    })
    //console.log(tempTagsArr)
    setTags(tempTagsArr)
  }, [currentUser])



  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <React.StrictMode>
          <Switch>
            <Route path="/" exact component={Home} />
            <div>
              <Navbar tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
              <Route path="/timeline" exact> <Timeline eventId={eventId} setEventId={setEventId} selectedTags={selectedTags} setSelectedTags={setSelectedTags} /> </Route>

              <Route exact path="/EventDetails" exact component={EventDetails} />

              <Route path="/login" exact component={LoginRouter} />
              <Route path="/signup" exact component={SignupRouter} />
              {/* <Route path="/Event" exact element> <Event eventId={eventId} setEventId={setEventId} /> </Route> */}
              <Route path="/past-events" exact component={PastEvents} />
              <Route path="/upcoming-events" exact component={UpcomingEvents} />
              <Route path="/AccountSetup" exact component={AccountSetup} />
              <Route path="/dashboard" exact component={DashboardRouter} />
              <Route path="/userDetails" exact component={userDetails} />
              <Route path="/AnimatedBg" exact component={AnimatedBg} />
              <Route path="/interestFinder" exact component={InterestFinder} />
              <Route path="/ResetPassword" exact component={ResetPassword} />
              <Route path="/Profile" exact component={ProfileRouter} />

              <Route path="/UserProfile" exact component={UserProfile} />
              <Route path="/EditUserProfile" exact component={EditUserProfile} />
            </div>
          </Switch>
        </React.StrictMode>
      </div>
    </ThemeProvider>
  );
}

export default App;