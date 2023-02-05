import React from 'react'
import { Button, Grid, Paper, Avatar, Typography, Box, TextField, Link, Icon } from '@mui/material';
import { green } from '@mui/material/colors';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';


export class createCourse extends React.Component {

    render() {
        return (
            <Grid container xs={12} sx={{
                // backgroundImage: `url(${background})`,
                backgroundColor: '#d4ffdf',
                minheight: '100vh', minWidth: '100vw',
                backgroundSize: "auto"
            }}>

                <Grid
                    container
                    alignItems="center"
                    justifyContent='center'
                    // justifyItems="center"
                    style={{ minHeight: '100vh', minWidth: '50vw' }}
                // sx={{
                //     // backgroundImage: `url(${background})`,
                //     backgroundColor: '#c8f7c8',
                //     backgroundSize: 'cover',
                //     backgroundPosition: 'center'}}
                >
                    <Grid container
                        direction="column"
                        alignItems="center"
                        justifyItems='center'
                        justifyContent='center'
                        component={Paper}
                        elevation={6}
                        variant='outlined'
                        padding={0}
                        xs={3}
                        style=
                        {{ minHeight: '30vh', minWidth: '30vw', border: `3px solid ${green[200]}`, borderRadius: 16, padding: '5vh', margin: '2vh' }}>
                        <Grid container direction='column' alignItems='center'>
                            <Grid item xs={3}>
                                <Icon>
                                    <AddCircleOutlineRoundedIcon sx={{ fontSize: 60, color: green[300] }} />
                                </Icon>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography component="h1" variant='h3' marginTop='2vh' align='center' fontFamily='revert'> Add a Course</Typography>
                            </Grid>
                        </Grid>
                        <Grid item align='center'>
                            <Box component="form">
                                <TextField fullWidth margin='normal' label="Course Code" required='true' placeholder='ex. CSC309' type="search" />
                                <TextField fullWidth margin='normal' label="Professor Name" placeholder="Please provide your Professor's Full Name" type="search" />
                                <TextField fullWidth margin='normal' label="Semester" placeholder='ex. Fall, Winter, Summer' type="search" />
                                <TextField fullWidth margin='normal' label="Section" placeholder='ex. L0101' type="search" />
                            </Box>
                        </Grid>
                        <Grid item padding='0'>
                            <Button
                                type='submit'
                                variant="outline"
                                href="/timeline"
                                sx=
                                {{ mt: 3, background: 'green' }}>
                                Add Course
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>)
    }
}
export default createCourse
