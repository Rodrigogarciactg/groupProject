import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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
    <form onSubmit={submitHandler}>
      {itemNotFoundError ? (
        <h2>
          {itemNotFoundError} <Link to="/">Home</Link>
        </h2>
      ) : null}
      <button class="add-item-btn">
        <Link to="/" className="link-style">
          Home
        </Link>
      </button>
      <button className="add-item-btn">
        <Link to="/itemform" className="link-style">
          Add an item
        </Link>
      </button>
      <div className="form-group">
        <label htmlFor="item">Item</label>
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        {errors.name ? <p>{errors.name.message}</p> : null}
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.name ? <p>{errors.name.message}</p> : null}
        <label htmlFor="seller">Seller</label>
        <input
          type="text"
          id="seller"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
        />
        {errors.name ? <p>{errors.name.message}</p> : null}
      </div>
      <button type="submit" className="btn btn-primary">
        Edit item
      </button>
    </form>
  );
};

export default EditItem;
