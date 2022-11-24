import { useState } from "react";
import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListProperties from "./pages/ListProperties";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-property" element={<ListProperties />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
