import "./index.css"; // Ensure this points to your main CSS file
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
import Productspage from "./pages/Productspage";
import Productpage from "./pages/ProductPage"
import { CartProvider } from "./providers/CartProvider";
import Cart from "./pages/CartPage";
function App() {
  return (
    <>
       <CartProvider> 
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<Productspage />} />
                <Route path="products/:id" element={<Productpage />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="cart" element={<Cart />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
    </>
  );
}

export default App;
