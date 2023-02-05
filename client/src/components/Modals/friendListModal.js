import React, { useState } from 'react';
import {Modal, Box, Typography, Grid, Avatar, Button} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';

const FriendListModal = ({ handleClose, friends }) => {
   const handleClick = () => {

   }
  return (
    <Modal open={true} onClose={handleClose}>
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
          Friends
        </Typography>
        <Grid container spacing={3} style={{ width: '400px' }}>
            {friends.length !== 0 ? friends.map((friend) => (
            <Grid item display='flex' flexDirection='column' alignItems='center'>
              <Avatar {...(friend.photo && `src=${friend.photo}`)}>
                {!friend.photo && <PersonIcon />}
              </Avatar>
              <Typography>{friend.username}</Typography>
            </Grid>
          )) : (
              <Grid item>
              <Typography>No friends yet</Typography>
              </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};

export default FriendListModal;
