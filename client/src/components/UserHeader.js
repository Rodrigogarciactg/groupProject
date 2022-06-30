import React from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";

const UserHeader = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post('http://localhost:8000/logout', {}, { withCredentials: true})
      .then((response) => {
          Cookies.remove('userToken');
          setUser(null);
          navigate('/');
      })
      .catch((error) => {
          console.log('Logout error', error);
      })
  };
  return (
    <div>
      <p>Welcome{user && <p>{user.username}</p> }</p>
      <Button class="home-btn">
        <NavLink to="/dash" className="link-style">
          Home
        </NavLink>
      </Button>
      <Button
        class="logout-btn"
        onClick={handleLogout}>
          Logout
      </Button>
    </div>
  )
}

export default UserHeader