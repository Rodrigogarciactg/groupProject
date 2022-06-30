import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

const Login = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(null);
  const loginUser = (user, setErrors) => {
    axios
      .post('http://localhost:8000/login', user, {
          withCredentials: true,
      })
      .then((response) => {
          navigate('/dash');
      })
      .catch((error) => {
          console.log(error);
          setErrors(error.response.data.message);
      })
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(user, setErrors);
  };
  const handleChange = (e) => {
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
        <Input
          type="submit"
          value="Login"
        />
      </Box>
  );
}

export default Login;