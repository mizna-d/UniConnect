import React, { useState, useEffect } from 'react';
import axios from '../../../api';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal'
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AddTags from '../../../components/Modals/addTagsModal'
import DeleteTags from '../../../components/Modals/deleteTagModal'
import DeleteUser from '../../../components/Modals/deleteUserModal'
import { getStats, getReports, getUserById, resolveReport } from "../../../api/functions"
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

import { useUser } from '../../../Contexts/UserContext';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  maxHeight: "20px",
  maxWidth: "30px",
  fontSize: "10px",
  backgroundColor: '#cedbb8'
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Dashboard = () => {
  //   classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openTags, setOpenTags] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [reports, setReports] = useState([])
  const [expanded, setExpanded] = React.useState('panel1');
  const [resolvePressed, setResolvePressed] = useState(false)
  const [reportedUsers, setReportedUsers] = useState([])
  const { currentUser } = useUser()
  
  const handleClose = () => setOpen(false);
  const handleCloseTags = () => setOpenTags(false);
  const handleCloseUser = () => setOpenUser(false);

  const [tags, setTags] = useState([])
  const [users, setUsers] = useState([])
  const [categoryList, setCategories] = useState([])

  const [stats, setStats] = useState({})

  useEffect(async () => {
    const res = await getStats()
    setStats(res)
    const res2 = await getReports()
    setReports(res2)
    console.log(res2)

    const obj1 = {}
    for (const report of res2) {
      const reported = await getUserById(report.reported)
      const reporter = await getUserById(report.reporter)

      obj1[report.reported] = reported
      obj1[report.reporter] = reporter
    }
    setReportedUsers(obj1)
  }, [resolvePressed]);

  const handleOpen = () => {
    axios({
      method: 'get',
      url: '/api/tag',
    }).then(response => {
        setTags(response.data)
        setOpenTags(true)
    }).catch(function (error) {
      console.log(error)
    })}


  const handleOpenTags = () => {
    axios({
      method: 'get',
      url: '/api/categories',
    }).then(response => {
        const arr = []
        response.data.forEach(element => {
          arr.push(element.name) 
        })
        setCategories(arr)
        setOpen(true)
    }).catch(function (error) {
      console.log(error)
    })}

  const handleOpenUser = () => {
    axios({
      method: 'get',
      url: '/api/users',
    }).then(response => {
        setUsers(response.data)
        setOpenUser(true);
    }).catch(function (error) {
      console.log(error)
    })}

  const handleExpandChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);

  };

  const handleResolve = async(event) => {
    resolveReport(event.target.value)
    setResolvePressed(prev => !prev)
  }

  const renderReports = () => {
    const result = []
    for (const report of reports) {
    const reported = reportedUsers[report.reported]
    const reporter = reportedUsers[report.reporter]

    if (!(reported && reporter)) return result

    result.push(
      <Accordion expanded={expanded === report._id} onChange={handleExpandChange(report._id)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{`${reported.username} is reported by ${reporter.username}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {report.description}
          </Typography>
          <StyledButton variant="contained" onClick={handleResolve} value={report._id}>
          Resolve
        </StyledButton>
        </AccordionDetails>
      </Accordion>)
    }

    return result
  }
  
  return (
    <Container 
    maxWidth='md' 
    sx={{
      mt:'120px', 
      borderRadius: '16px',
      minHeight: '50vh',
      backgroundPosition: 'center',
      background: 'linear-gradient(180deg, #C9D991 10%, #d0f0c0 51%, #F2F2F2 90%);'
    }}>
      <Grid container justify='space-between' spacing={3} mt={0}>
        <Grid item container xs={12} sm={7} spacing={3}>
          <Grid item container spacing={3} textAlign='center'>
            <Grid item xs={12} sm={5}>
              {/* <Paper style={{ padding: '15' }}> */}
                <Avatar alt='Friend' sx={{ width: 190, height: 190 }}
                src = {currentUser.profilePhoto}>
                </Avatar>
                {/* <CardMedia
                  component='img'
                  height='200'
                  image='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
                  style={{ marginBottom: 20 }}
                /> */}

                <Typography variant='h5' component='div'>
                  {currentUser.username}
                </Typography>

                <Button fullWidth variant='contained' style={{ backgroundColor: '#C9D991' }} size='medium' sx={{mt:'15px'}}
                  href='/editUserProfile'>
                  Edit Profile
                </Button>
              {/* </Paper> */}
            </Grid>
            <Grid item xs={12} sm={7}>
              <Paper style={{ height: '100%' }}>
                <Typography variant='h5' pt={2} pb={2} color='#4B592D'>
                  {/* Statistics will be taken from the database and displayed. Currently, these are only placeholders. */}
                  STATS
                </Typography>
                <Typography variant='subtitle1' color='#099441'>
                  {/* Statistics will be taken from the database and displayed. Currently, these are only placeholders. */}
                  Total user number: {stats.userNumber}
                </Typography>
                <br/>
                <br/>
                <Typography variant='subtitle1' color='#099441'>
                  {/* Statistics will be taken from the database and displayed. Currently, these are only placeholders. */}
                  Total event number: {stats.eventNumber}
                </Typography>
                <br/>
                <br/>
                <Typography variant='subtitle1' color='#099441'>
                  {/* Statistics will be taken from the database and displayed. Currently, these are only placeholders. */}
                  Total tag number: {stats.tagNumber}
                </Typography>
                <br/>
                <br/>
                {/* <KeyboardArrowDownOutlinedIcon /> */}
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={20} sm={40} 
          textAlign='center'
          >
            {/* <Paper style={{ height: '100%' }}> */}
            <Button fullWidth
              onClick={handleOpenTags}
              style={{ color: '#4B592D', height: '60%', width: '25%', backgroundColor: '#C9D991', margin: '10px' }}
              // sx={{p:'10'}} 
              variant='contained'
            >
              Add tags
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
            >
              <AddTags handleClose={handleClose} categories={categoryList}/>
            </Modal>



            <Button fullWidth
              onClick={handleOpen}
              style={{ color: '#4B592D', height: '60%', width: '30%', backgroundColor: '#C9D991', margin: '10px' }}
              variant='contained'
            >
              Delete Tags
            </Button>
            <Modal
              open={openTags}
              onClose={handleCloseTags}
            >
              <DeleteTags handleClose={handleCloseTags} tags={tags}/>
            </Modal>




            <Button fullWidth
              onClick={handleOpenUser}
              style={{ color: '#4B592D', height: '60%', width: '25%', backgroundColor: '#C9D991', margin: '10px' }}
              variant='contained'
            >
              Find User
            </Button>
            <Modal
              open={openUser}
              onClose={handleCloseUser}
            >
              <DeleteUser handleClose={handleCloseUser} users={users}/>
            </Modal>

            {/* </Paper> */}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5} style={{ textAlign: 'center', alignitems: 'center', }}>
          <Paper style={{ height: '400px', maxHeight: 400, overflow: 'auto', }}>
            <Typography variant='h5' pt={2} color='#4B592D'>
              REPORT FEED
            </Typography>
                {renderReports()}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

{/* <Card style={{ width: '90%', margin: '20px auto', backgroundColor: '#eff5eb' }}>
<CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
  <AccountCircleIcon style={{ marginRight: '1px' }} />
  <Typography>User 1928 has been reported</Typography>
</CardContent>
</Card>
<Card style={{ width: '90%', margin: '20px auto', backgroundColor: '#eff5eb' }}>
<CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
  <AccountCircleIcon style={{ marginRight: '1px' }} />
  <Typography>User 1928 has been reported</Typography>
</CardContent>
</Card>
<Card style={{ width: '90%', margin: '20px auto', backgroundColor: '#eff5eb' }}>
<CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
  <AccountCircleIcon style={{ marginRight: '1px' }} />
  <Typography>User 1928 has been reported</Typography>
</CardContent>
</Card>
<KeyboardArrowDownOutlinedIcon style={{ marginTop: 30 }} /> */}