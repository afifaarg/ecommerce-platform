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
import Orders from "./AdminPages/Orders";
import ProductsAll from "./AdminPages/ProductsAll";
import SingleProduct from "./AdminPages/SingleProduct";
import AddProduct from "./AdminPages/AddProduct";
import Customers from "./AdminPages/Customers";
import Chats from "./AdminPages/Chats";
import EditProduct from "./AdminPages/EditProduct";
import Page404 from "./AdminPages/404";
import AdminLayout from "./containers/Layout";
import { CartProvider } from "./providers/CartProvider";
import { SidebarProvider } from "./contexts/SidebarContext";
import "./index.css";
import CategoriesPage from "./AdminPages/categoriesPage";
import BillingPage from "./AdminPages/BillingPage";
import NewBillPage from "./AdminPages/NewBillPage";
import EditPurchaseOrderPage from "./AdminPages/EditBill";

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
          <Route path="admin/" element={<Login />} />
          <Route element={<AdminLayout />}>
            <Route path="admin/orders" element={<Orders />} />
            <Route path="admin/products" element={<ProductsAll />} />
            <Route path="admin/categories" element={<CategoriesPage />} />
            <Route path="admin/add-product" element={<AddProduct />} />
            <Route path="admin/product/:id" element={<EditProduct />} />
            <Route path="admin/orders" element={<Orders />} />
            <Route path="admin/customers" element={<Customers />} />
            <Route path="admin/contact-forms" element={<Chats />} />
            <Route path="admin/buying-bills-page" element={<BillingPage />} />
            <Route path="admin/new-buy-bill" element={<NewBillPage />} />
            <Route
              path="admin/edit-bill-buy/:id"
              element={<EditPurchaseOrderPage />}
            />
            <Route
              path="admin/administration-dashboard"
              element={<Dashboard />}
            />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  </CartProvider>
);

export default App;
