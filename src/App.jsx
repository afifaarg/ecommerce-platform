import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
