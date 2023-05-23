import { Navbar } from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage/Index";
import CartPage from "./pages/CartPage/Index";
import LoginPage from "./pages/LoginPage/Index";
import AdminPage from "./pages/AdminPage/Index";
import SalesRecapPage from "./pages/AdminPage/SalesRecapPage/Index";
import "./globals.css";
import ProductDetailPage from "./pages/ProductPage/ProductDetailPage/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index path="/" element={<ProductPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/sales-recap" element={<SalesRecapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
