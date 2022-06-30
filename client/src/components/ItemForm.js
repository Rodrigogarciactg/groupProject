import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

const ItemForm = (props) => {
  const { items, setItems } = props;
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [seller, setSeller] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/item", {
        item,
        price,
        seller,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
        setItems([...items, res.data]);
        setItem("");
        setPrice("");
        setSeller("");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };

  return (
    <div className="form-container">
      <Button 
        variant="contained" 
        style={{ backgroundColor: "#FFB300"}}
        sx={{ m: 2}}>
        <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
          Home
        </Link>
      </Button>
      <Typography variant="h5" gutterBottom component="div">
        Create a Listing
      </Typography>

      <form onSubmit={submitHandler} className="add-item-form">
        <div>
            <TextField
              label="Item"
              id="item"
              value={item}
              sx={{ m:1, width:'25ch'}}
              onChange={(e) => setItem(e.target.value)}
            />
            {errors.item ? <p style={{color: 'red'}}>{errors.item.message}</p> : null}
          </div>

          <div>
            <TextField
              label="Price"
              id="price"
              value={price}
              sx={{ m:1, width:'25ch'}}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price ? <p style={{color: 'red'}}>{errors.price.message}</p> : null}
          </div>

          <div>
            <TextField
              label="Seller"
              id="seller"
              value={seller}
              sx={{ m:1, width:'25ch'}}
              onChange={(e) => setSeller(e.target.value)}
            />
            {errors.seller ? <p style={{color: 'red'}}>{errors.seller.message}</p> : null}
          </div>

          <div>
            <Button 
              type="submit" 
              variant="contained" 
              style={{ backgroundColor: "#0D47A1"}}>
              List Item
            </Button>
          </div>

      </form>
    </div>
  );
};

export default ItemForm;
