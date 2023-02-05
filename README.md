##### <b>README :</b> TEAM 23 </br></br>

## **README-DocsV is the most updated version of the README as of Nov 7th*

# <b>Welcome to <em>UniConnect</em>!</b>
<em><b>‘UniConnect’</b></em> aims to join students from various universities across downtown Toronto through common interests and events. Students who want to participate in group activities but do not know where to look can now go onto our web app to do so. Users can select their interests through our unique tagging system, ranging from arts and music to technology and gaming which will allow them to find related events. By joining events, users can meet up with people virtually and in person to connect through common interests. </br></br>

# Features

Below, we have listed out our main features provided for users on our web app. Differences between administrators and users will be explained as well as our plans going forwards.

### <b>Navigation</b>

When first arriving on our page, end-users will be greeted by our lively landing page. 
</br></br>
<img src='README-Images\LandingPage.png'/>
<img src='README-Images\LandingPageScroll.png'/>
</br></br>
From there, users can search for events using the search bar, login or signup. When logging in, users can always reset their password or make a new account.
</br></br> 
<img src='README-Images\loginv1.png'></img>
<img src='README-Images\forgotPassword.png'></img>
<img src='README-Images\signup.png'></img>
<img src='README-Images\verifyEmail.png'></img>
</br></br>
Admins, on the other hand, are created only on an appointed basis, and thus cannot simply sign up. Further functionality for admins will be added with a database. 

#
## <b>Login and Logout</b>

Users will login using “user” as their username and password. Admins will login using “admin” as their username and password. After logging in, users and admins will see a different view of the navigation bar, which includes their respective timelines, profiles, and dashboards. To log out, users and admins can click on the right-most icon on the navigation bar. 
</br></br><img src='README-Images\navbar.png'/> </br></br>
Users can use the search bar to look at events, however if users want to attend events, they must have an account and be logged in. Admins will not be able to attend events, however they can delete any user created events.

After logging out, users and admins will no longer have access to their profiles or dashboards, and users will no longer be able to attend events. Admins will not be able to delete events.

#
## <b>User and Admin</b>

Users and admins have different views on timeline, profile and dashboard. They can both see the same events, however users will be able to attend events while admins will not. Admins will have access to statistics and all registered users. Users can only find another user by attending events and searching people by username. Further distinctions between the two user types will be made in later sections. 
#
## <b>Dashboard</b>

### <b>User</b>
<img/>
Users can view their dashboard when clicking on the square formation icon on their navigation bar. Upcoming events will be on their dashboard without any navigation. Their view consists of their profile picture, along with the function to edit and view their profile. Users can add tags, create events, and add courses by clicking the respective buttons, and these functionalities will be shown to users as a pop-up. Edit interests will take users to the interest selector. 

<img/>

Users can click on each tab to select the tags that they would like to display on their profile, as well as events using similar tags. 
Users can add friends as well as view their past events. Adding a friend will display a pop-up search bar which will then lead users to another person’s profile provided that they entered the correct username. Each username will be unique and this will be implemented further with the use of databases. After adding someone as a friend, users will be able to see their upcoming and past events. 

Past events will allow users to keep track of all the friends they have made from attending events. It will bring users to view a list of past events as well as provide the full details for each event. Further implementation will be done using databases. 

<img/>

### <b>Admin</b>
Admins can view their dashboard with the same icon as users. They will see their profile picture, statistics of the website as well as a report feed of reports made against users. These will have further functionality with databases. 
Admins will be able to add tags, delete tags and delete users, giving them access to the functionalities that are not provided to users. These will be seen as pop-ups once clicked. 
#
## <b>Profile</b>
### User

<img/>

Users profiles will display their past and upcoming events. Past events will take users to see all of their completed events. Similarly, upcoming events will take users to see the events that have yet to be completed. Tags that users have selected from the interest finder will be displayed on their profile, as well as a personal description. Users will be able to click and view their friend list by the friend icon below their name, which will be implemented with a database. Users can also post a personalized profile picture. 

### Admin
<img/>

The admin profile is similar to the user, except that admins will not have tags as they do not need to attend events or find other users. Instead, they will be able to see a list of all users on the web app in order to find the user to delete or reprimand. This functionality will be developed further with databases. 
Admins will also be able to provide a description of themselves, along with a profile picture, and they can click ‘view statistics’ in order to return to their dashboard. 

#
## <b>Timeline</b>

#### User
<img src='README-Images\image4.png'></img>
Users can see their timeline by clicking the home button on the left-most side of the icons on the navigation bar. A list of possible events will be displayed, and users can also search for more events by using their selected tags, which will become a functionality when databases are brought in. Users will be able to click ‘Learn More’ at the bottom of each of the event cards, which will bring users to a larger view of the event that will provide more information of the event. 

#### Admin
<img src='README-Images\image1.png'></img>
An admin can see all the information of users to monitor appropriate activity. They cannot participate in events, however they have access to view all events, as well as deleting events. With databases, this functionality can be expanded upon. 

#
## <b>Events</b>

#### User
<img src='README-Images\image7.png'></img>
After clicking learn more on an event, users will be brought to the event card. This displays the name of the event at the top, an image associated with the event that the organizer set. The organizer’s name is displayed under the title of the event, as well as a list of tags that the organizer has set that is suitable for the event. The organizer will also set the attendee limit, location and the description of the event. Users can then click attend if they would like to join the event. Users can also click on the location to see the designated location on google maps (to be implemented with databases).
<img src='README-Images\image15.png'></img>
After clicking attend, users will be able to see the list of attendees. By clicking on the attendee list, users can then connect with other users and see their profiles and add them as friends. Users can then click the ‘Complete’ button once the event has finished. 

#### Admins
<img src='README-Images\image8.png'></img>
Admins will not be able to attend events, however they will be able to see the list of attendees without needing to attend. By clicking on the attendee list, admins can see the profiles of all attendees.


#
## Next Steps
In Phase 2, we plan on incorporating more functionality for users. Below are possible new features that we will provide:
Hearts: Users will be able to send hearts to friends and receive hearts. 
Chats: Users will be able to create group chats with their friends after attending the same event, or taking the same school courses.

With the addition of databases, the above features will be able to be flushed out, and users will have more interactions together. Admins will be able to regulate the statistical side of the website more. Tags, events, profiles will all be able to be created and saved. Please look forward to our next implementation!



</br></br>


# Notes

## Third Party Libraries: 
* React.Js
* @mui/material
* @mui/icons-materials

## Third Party Resources
* Wave generator: https://getwaves.io/ 
* Stories by FreePik

#

###### Designed and Coded by : Mizna Dada, Jiessie Tie, Suhyun Park, Onur Eren Arpaci 
