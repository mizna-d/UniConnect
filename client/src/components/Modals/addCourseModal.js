import React from 'react'
import { Icon, Button, Alert, IconButton, Tooltip, Snackbar, Grid, Paper, Autocomplete, Avatar, Typography, Box, TextField, Link, SliderValueLabel } from '@mui/material';
import { green } from '@mui/material/colors';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


function AddCourse({ handleClose }) {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        if (true) {
            // all 
            addCourse();
            setOpen(true);
            window.setTimeout(function () {
                window.location.reload()
            }, 2000)
        } else {
            // display a negative 
        }
    };

    function addCourse() {
        // here we will be adding the course to the user's list of courses in the database
        return null
    }

    const Input = styled('input')({
        display: 'none',
    });



    return (
        <Grid
            container
            xs={12}
            alignItems="center"
            justifyContent='center'
            marginTop='10vh'
            sx={{
                minheight: '100vh',
                minWidth: '100vw',
            }}>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyItems='center'
                justifyContent='center'
                component={Paper}
                elevation={6}
                variant='outlined'
                borderRadius={16}
                padding={0}
                xs={9}
                md={8} //5
                lg={3}
                style={{
                    minHeight: '30vh',
                    minWidth: '30vw',
                    border: `3px solid ${green[200]}`,
                    paddingLeft: '4vh',
                    paddingRight: '4vh',
                    paddingBottom: '4vh',
                    paddingTop: '2vh'
                    // margin: '2vh'
                }}>


                <Grid container direction='column' alignItems='center'>
                    <Grid container direction='row' alignSelf='flex-start'>
                        <Grid item xs={10.5} />
                        <Grid item xs={1.5}>
                            <IconButton>
                                <CloseIcon onClick={handleClose} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton>
                            <AddCircleOutlineRoundedIcon sx={{ fontSize: 60, color: green[300] }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography component="h1" variant='h3' align='center' fontFamily='revert'> Add a Course</Typography>
                    </Grid>
                </Grid>
                <Grid item align='center'>
                    <Box component="form">
                        <TextField fullWidth margin='normal' label="Course Code" required='true' placeholder='ex. CSC309' type="search" />
                        <TextField fullWidth margin='normal' label="Professor Name" placeholder="Please provide your Professor's Full Name" type="search" />
                        <Autocomplete
                            options={semesters}
                            required='true'
                            getOptionLabel={(option) => option.sem}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Semester" placeholder="ex. Fall, Winter" />}
                        />
                        <TextField fullWidth margin='normal' label="Section" placeholder='ex. L0101' type="search" />
                    </Box>
                </Grid>
                <Grid item padding='0'>
                    <Button
                        type='submit'
                        variant="outline"
                        onClick={handleClick}
                        sx=
                        {{ mt: 3, background: 'green' }}>
                        Add Course
                    </Button>
                </Grid>
            </Grid>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={1000}
                >
                    <Alert severity='success'> Course Added</Alert>
                </Snackbar>
            </div>
            {/* </Grid> */}
        </Grid>)
}
export default AddCourse

// these values will be called from the database
const courses = [
    { course: 'LIN203' },
    { course: 'CSC209' },
    { course: 'CSC309' }];

const semesters = [
    { sem: 'Fall' },
    { sem: 'Winter' },
    { sem: 'Full Year' },
    { sem: 'Summer' }];