import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, userName, onLogout }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Matrimonial Site
        </Typography>
        <Box>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/search" color="inherit">
            Search
          </Button>
          {isLoggedIn ? (
            <>
              <Typography variant="body1" color="inherit" sx={{ mx: 2 }}>
                Welcome, {userName}!
              </Typography>
              <Button color="inherit" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/signup" color="inherit">
                Sign Up
              </Button>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            </>
          )}
          <Button component={Link} to="/contact" color="inherit">
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
