import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  // export default function CustomizedTables() {
  return (
    <div>
      <div class="header-display-all">
        {/* <h1 class="main-title">Sell and buy Fishing Gear!!</h1> */}

        <button class="add-item-btn">
          <Link to="/edit" className="link-style">
            Edit item
          </Link>
        </button>
        {/* <button class="add-item-btn">
          <Link to="/sell" className="link-style">
            Sell
          </Link>
        </button> */}
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Seller</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allitems.map((item, index) => (
              <StyledTableRow key={item._id}>
                <Link to={`/item/${item._id}`}>
                  <StyledTableCell component="th" scope="row">
                    {item.item}
                  </StyledTableCell>
                </Link>
                <StyledTableCell align="right">{item.price}</StyledTableCell>
                <StyledTableCell align="right">{item.seller}</StyledTableCell>
                <StyledTableCell align="right">
                  {/* <Link to={`/sell/${item._id}`}>
                    <button className="btn btn-primary">Sell/Buy</button>
                  </Link> */}
                  <Link to={`/edit/${item._id}`}>
                    <Button variant="contained" className="btn btn-primary">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    color="warning"
                    onClick={() => handleDeleteitem(item._id)}
                    className="btn btn-danger"
                  >
                    Buy!
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Link to="/itemform" className="link-style">
        <Button variant="contained" class="add-item-btn">
          Add Item for Sale
        </Button>
      </Link>
    </div>
  );
};
export default Dashboard;
