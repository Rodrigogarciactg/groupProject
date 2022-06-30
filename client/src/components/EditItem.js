import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FormControl, TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Input } from "@mui/material";

const EditItem = (props) => {
  const { id } = useParams();
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [seller, setSeller] = useState("");
  const [errors, setErrors] = useState({});
  const [itemNotFoundError, setitemNotFoundError] = useState("");
  const navigate = useNavigate();

  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/item/${id}`)
      .then((response) => {
        console.log(response.data);
        setItem(response.data.item);
        setPrice(response.data.price);
        setSeller(response.data.seller);
      })
      .catch((err) => {
        console.log(err.response);
        setitemNotFoundError(`item not found using that ID`);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8000/api/item/" + id, {
        item,

        price,

        seller,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        {itemNotFoundError ? (
          <h2>
            {itemNotFoundError} <Link to="/">Home</Link>
          </h2>
        ) : null}
        <Button 
          variant="contained" 
          style={{ backgroundColor: "#FFB300"}}
          sx={{ m: 2}}>
          <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
            Home
          </Link>
        </Button>
        <Button 
          variant="contained" 
          style={{ backgroundColor: "#0D47A1"}}
          sx={{ m: 2}}>
          <Link to="/itemform" style={{textDecoration: 'none', color: 'white'}}>
            Add an item
          </Link>
        </Button>

        <div className="form-group">
          {/* <div>
            <label htmlFor="item">Item</label>
            <input
              type="text"
              id="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            {errors.name ? <p>{errors.name.message}</p> : null}
          </div> */}

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
              Edit item
            </Button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default EditItem;
