import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [allitems, setAllitems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/item")
      .then((response) => {
        console.log(response.data);
        setAllitems(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleDeleteitem = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/item/${idFromBelow}`)
      .then((response) => {
        console.log("success deleting item");
        console.log(response);
        const filtereditems = allitems.filter((item) => {
          return item._id !== idFromBelow;
        });
        setAllitems(filtereditems);
      })
      .catch((err) => {
        console.log("error deleting item", err.response);
      });
  };

  return (
    <div className="main-form-container">
      <div class="header-display-all">
        <h1 class="main-title">Sell and buy Fishing Gear!!</h1>

        <button class="add-item-btn">
          <Link to="/itemform" className="link-style">
            Add Item for Sale
          </Link>
        </button>
        <button class="add-item-btn">
          <Link to="/edit" className="link-style">
            Edit item
          </Link>
        </button>
        <button class="add-item-btn">
          <Link to="/sell" className="link-style">
            Sell
          </Link>
        </button>
      </div>

      <div className="row">
        <div className="col-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Seller</th>
                <th scope="col">Actions Available</th>
              </tr>
            </thead>
            <tbody>
              {allitems.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <Link to={`/item/${item._id}`}>
                      <td>{item.item}</td>
                    </Link>
                    <td>{item.price}</td>
                    <td>{item.seller}</td>
                    <td>
                      <Link to={`/sell/${item._id}`}>
                        <button className="btn btn-primary">Sell/Buy</button>
                      </Link>
                      <Link to={`/edit/${item._id}`}>
                        <button className="btn btn-primary">Edit</button>
                      </Link>

                      <button
                        onClick={() => handleDeleteitem(item._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
