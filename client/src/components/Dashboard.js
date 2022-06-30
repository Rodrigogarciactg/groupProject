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
import amber from "@material-ui/core/colors/amber"
import { createTheme } from "@mui/system";
import "../index.css";


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
      backgroundColor: "#0D47A1",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "theme.palette.action.hover",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  // export default function CustomizedTables() {

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Item Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Seller</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allitems.map((item, index) => (
              <StyledTableRow key={item._id}>
                <Link to={`/item/${item._id}`} style={{color:"0D47A1"}}>
                  <StyledTableCell component="th" scope="row">
                    {item.item}
                  </StyledTableCell>
                </Link>
                <StyledTableCell align="center">${item.price}</StyledTableCell>
                <StyledTableCell align="center">{item.seller}</StyledTableCell>
                <StyledTableCell align="center">
                  {/* <Link to={`/sell/${item._id}`}>
                    <button className="btn btn-primary">Sell/Buy</button>
                  </Link> */}
                  <Link to={`/edit/${item._id}`} style={{textDecoration: 'none', color: 'white'}}>
                    <Button variant="contained" style={{backgroundColor: "#FFB300"}}>
                      Edit
                    </Button>
                  </Link>

                  <Button
                    style={{color: '#0D47A1'}}
                    onClick={() => handleDeleteitem(item._id)}
                    >
                    Buy!
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Link to="/itemform" style={{textDecoration: 'none', color: 'white'}}>
        <Button 
          variant="contained" 
          style={{backgroundColor: "#0D47A1"}}
          sx={{ m: 2}}>
          Make a Listing
        </Button>
      </Link>
    </div>
  );
};
export default Dashboard;
