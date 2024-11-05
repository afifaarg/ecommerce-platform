import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Layout component for user-facing pages
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
import Productspage from "./pages/Productspage";
import Productpage from "./pages/ProductPage";
import Cart from "./pages/CartPage";
import Login from "./AdminPages/login";
import Dashboard from "./AdminPages/Dashboard";
import AdminLayout from "./containers/Layout";
import { CartProvider } from "./providers/CartProvider";
import { SidebarProvider } from "./contexts/SidebarContext";
import "./index.css";

const App = () => (
  <CartProvider>
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<Productspage />} />
            <Route path="products/:id" element={<Productpage />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route
              path="admin/login-administration-dashboard"
              element={<Login />}
            />
            <Route
              path="admin/administration-dashboard"
              element={<Dashboard />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  </CartProvider>
);

export default App;
