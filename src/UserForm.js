// src/UserForm.js

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Paper, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useState ,useEffect } from 'react';


const UserForm = ({ userToEdit, onSuccess }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userToEdit) {
      formik.setValues(userToEdit);
    }
  }, [userToEdit]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    address: Yup.string().required('Address is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: '',
    },
    validationSchema,
    //('http://localhost:8080/api/users', values)
    onSubmit: async (values) => {
      try {
        if (userToEdit) {
          await axios.put(`http://localhost:8080/api/users/${userToEdit.id}`, values);
          setSuccessMessage('User updated successfully!');
        } else {
          await axios.post('http://localhost:8080/api/users', values);
          setSuccessMessage('User registered successfully!');
        }
        setErrorMessage('');
        formik.resetForm();
        onSuccess(); // Callback to refresh user list
      } catch (error) {
        setErrorMessage('Error submitting form. Please try again.');
        setSuccessMessage('');
      }
    },
  });

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
      {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          margin="normal"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          margin="normal"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          margin="normal"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          margin="normal"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            p: 1,
            width: '100%',
            borderRadius: '8px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#155fa0',
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default UserForm;
