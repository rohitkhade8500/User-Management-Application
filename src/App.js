
import React, { useState } from 'react';
import { Container, Typography, Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserForm from './UserForm';

import UserList from './UserList';
import NavBar from './NavBar';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#f50057', 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700, 
    },
    button: {
      textTransform: 'none', 
    },
  },
});

function App() {
  const [userToEdit, setUserToEdit] = useState(null);

 
  const handleEdit = (user) => {
    setUserToEdit(user); 
  };

  
  const handleSuccess = () => {
    setUserToEdit(null); 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <NavBar></NavBar>
        <Box sx={{ my: 4, textAlign: 'center', padding: '20px 0' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Matrimonial Site
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Add and manage user details with ease
          </Typography>

          
          <UserForm userToEdit={userToEdit} onSuccess={handleSuccess} />

          <UserList onEdit={handleEdit} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
