import React from 'react'
import App from '../App';
import { AppLayout } from '../components/layout/AppLayout';
import { Typography } from '@mui/material';

const Home = () => {
  return (
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        style={{ padding: 'rem 0' }}
      >
        Select a user to chat
      </Typography>
  )
}
export default AppLayout()(Home);
