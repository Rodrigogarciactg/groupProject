import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ItemForm = (props) => {
  const { items, setItems } = props;
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [seller, setSeller] = useState("");
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
        console.log(err);
      });
  };

  return (
    <div className="form-container">
      <button class="add-item-btn">
        <Link to="/" className="link-style">
          Home
        </Link>
      </button>
      <h1 class="main-title">Add Item for Sale</h1>

      <form onSubmit={submitHandler} className="add-item-form">
        <div className="form-fields">
          <label>Item</label>
          <input
            onChange={(e) => setItem(e.target.value)}
            //We set our value to title here mainly to help us clear out the inputs on submission
            value={item}
            item="item"
            type="text"
          />
        </div>

        <br />

        <div className="form-fields">
          <label>Price</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            item="price"
            type="text"
          />
        </div>

        <br />

        <div className="form-fields">
          <label>Seller</label>
          <input
            onChange={(e) => setSeller(e.target.value)}
            value={seller}
            item="seller"
            type="text"
          />
        </div>

        <br />

        <input
          className="submit-input"
          type="submit"
          value="Add Item for Sale"
        />
      </form>
    </div>
  );
};

export default ItemForm;
