import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

const Register = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    username: '',
    email: '',
    password: '',
    _confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const registerUser = (user, setErrors) => {
    axios
        .post('http://localhost:8000/register', user, {
            withCredentials: true,
        })
        .then((response) => {
            navigate('/dash');
        })
        .catch((error) => {
            console.log(error);
            setErrors(error.response.data.error.errors);
        })
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    registerUser(user, setErrors);
  };
  const handleChange = (e) =>  {
    setUser({...user, [e.target.name]: e.target.value });
  };
  
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      onSubmit={handleSubmit}
      >
        <TextField
          label="User Name"
          name="username"
          helperText={errors.username.message}
          variant="outlined"
          onChange={ handleChange }
        />
        <TextField
          label="Email Address"
          name="email"
          helperText={errors.email.message}
          variant="outlined"
          type="email"
          onChange={ handleChange }
        />
        <TextField
          label="Password"
          name="password"
          helperText={errors.password.message}
          variant="outlined"
          type="password"
          onChange={ handleChange }
        />
        <TextField
          label="Confirm Password"
          name="_confirmPassword"
          helperText={errors._confirmPassword.message}
          variant="outlined"
          type="password"
          onChange={ handleChange }
        />
        <Input
          type="submit"
          value="Register"
        />
    </Box>
  );
}

export default Register;