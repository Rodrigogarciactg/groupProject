import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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

  return (
    <div className="container">
      <Link to="/">Dashboard</Link>
      <h3>{items.item}</h3>
      <div className="item-form">
        <div className="form-field">
          <p>Price:</p>
          <p>{items.price}</p>
        </div>
        <div className="form-field">
          <p>Seller Name:</p>
          <p>{items.seller}</p>
        </div>
        <div className="form-field">
          <p>Description:</p>
          {/* <p>{item.desc}</p> */}
        </div>
        <div className="form-field">
          <p>Venmo Handle:</p>
          {/* <p>{item.venmo}</p> */}
        </div>
        <div className="form-field">
          <Link to={`/edit/${items._id}`}>Edit</Link>
          {/* <DeleteItem id={item._id} /> */}
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
