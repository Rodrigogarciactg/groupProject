import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

// import DeleteItem from './DeleteItem';

const ViewItem = (props) => {
  const [items, setItems] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/item/" + id)
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDeleteitem = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/item/${idFromBelow}`)
      .then((response) => {
        console.log("success deleting item");
        console.log(response);
        navigate("/");
        const filtereditems = items.filter((item) => {
          return items._id !== idFromBelow;
        });
        setItems(filtereditems);
      })
      .catch((err) => {
        console.log("error deleting item", err.response);
      });
  };

  return (
    <div className="container">
        <Button 
          variant="contained" 
          style={{ backgroundColor: "#FFB300"}}
          sx={{ m: 2}}>
          <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
            Home
          </Link>
        </Button>
      {/* <h3>{items.item}</h3> */}
      {/* <CardActionArea> */}
      <div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent justifyContent="center" alignItems="center">
            <Typography 
              variant="h5" 
              style={{color: 'black'}}
              gutterBottom>
              Item : {items.item}
            </Typography>
            <Typography 
              variant="h5" 
              style={{color: 'black'}}
              gutterBottom>
              Price : ${items.price}
            </Typography>
            <Typography 
              variant="h5" 
              style={{color: 'black'}}
              component="div">
              Seller : {items.seller}
            </Typography>
            <Link to={`/edit/${items._id}`} style={{textDecoration: 'none'}}>
              <Button 
              variant="contained" 
              style={{backgroundColor: "#0D47A1"}}>
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => handleDeleteitem(items._id)}
              variant="contained"
              style={{backgroundColor: '#FFB300'}}
              sx={{ m: 2}}>
              Buy!
            </Button>
          </CardContent>
        </Card>
        {/* </CardActionArea> */}
      </div>
    </div>
  );
};

export default ViewItem;
