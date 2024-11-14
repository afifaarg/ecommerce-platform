import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
import Productspage from "./pages/Productspage";
import Productpage from "./pages/ProductPage";
import Cart from "./pages/CartPage";
import Login from "./AdminPages/Login";
import Dashboard from "./AdminPages/Dashboard";
import Orders from "./AdminPages/Orders";
import ProductsAll from "./AdminPages/ProductsAll";
import AddProduct from "./AdminPages/AddProduct";
import Customers from "./AdminPages/Customers";
import Chats from "./AdminPages/Chats";
import EditProduct from "./AdminPages/EditProduct";
import Page404 from "./AdminPages/404";
import AdminLayout from "./containers/Layout";
import { CartProvider } from "./providers/CartProvider";
import { SidebarProvider } from "./contexts/SidebarContext";
import "./index.css";
import CategoriesPage from "./AdminPages/CategoriesPage";
import BillingPage from "./AdminPages/BillingPage";
import NewBillPage from "./AdminPages/NewBillPage";
import EditPurchaseOrderPage from "./AdminPages/EditBill";
import EtatstockPage from "./AdminPages/EtatstockPage";
import Invoice from "./AdminPages/InvoicePage";
import Fournisseurs from "./AdminPages/Fournisseurs";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

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

          <Route path="private-space-admin/" element={<Login />} />

          {/* Protect admin routes with PrivateRoute */}
          <Route
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route
              path="admin/administration-dashboard"
              element={<Dashboard />}
            />
            <Route path="admin/orders" element={<Orders />} />
            <Route path="admin/etat-stock" element={<EtatstockPage />} />
            <Route path="admin/products" element={<ProductsAll />} />
            <Route path="admin/categories" element={<CategoriesPage />} />
            <Route path="admin/add-product" element={<AddProduct />} />
            <Route path="admin/product/:id" element={<EditProduct />} />
            <Route path="admin/customers" element={<Customers />} />
            <Route path="admin/contact-forms" element={<Chats />} />
            <Route path="admin/buying-bills-page" element={<BillingPage />} />
            <Route path="admin/new-buy-bill" element={<NewBillPage />} />
            <Route path="admin/newInvoice" element={<Invoice />} />
            <Route path="admin/fournisseurs" element={<Fournisseurs />} />
            <Route
              path="admin/edit-bill-buy/:id"
              element={<EditPurchaseOrderPage />}
            />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  </CartProvider>
);

export default App;
