import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 10, py: 5, px: 2, bgcolor: '#f5f5f5' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Typography variant="h4" color="error">
          404
        </Typography>
      </Box>
      <Typography variant="h4" align="center" color="error">
        Page Not Found
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary">
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default NotFound;