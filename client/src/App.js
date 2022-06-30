import "./App.css";
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EditItem from "./components/EditItem";
import SellPage from "./components/SellPage";
import ItemForm from "./components/ItemForm";
import ViewItem from "./components/ViewItem";
import Auth from "./components/Auth";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div className="App">
      <Typography variant="h1" component="div" gutterBottom>
        ClickBait
      </Typography>
      <Typography variant="h4" component="div" gutterBottom>
        Sell and Buy Fishing Gear!!
      </Typography>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/item/:id" element={<ViewItem />} />
          <Route path="/itemform" element={<ItemForm />} />
          <Route path="/sell/:id" element={<SellPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/edit" element={<EditItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
