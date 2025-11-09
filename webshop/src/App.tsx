import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import AddProduct from "./pages/admin/AddProduct";
import Settings from "./pages/Settings";
import Shops from "./pages/Shops";
import GiftCards from "./pages/GiftCards";
import NavigationBar from "./components/NavigationBar";
import Calculator from "./pages/Calculator";
import NotFound from "./pages/NotFound";
import Supplier from "./pages/admin/Supplier";
import Supplier2 from "./pages/admin/Supplier2";
import Supplier3 from "./pages/admin/Supplier3";
import AdminHome from "./pages/admin/AdminHome";
import ManageProducts from "./pages/admin/ManageProducts";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/auth/Profile";
import Map from "./pages/Map";
import { ContactUs } from "./pages/ContactUs";
import EditProduct from "./pages/admin/EditProduct";
import SingleProduct from "./pages/SingleProduct";
import ManageCategories from "./pages/admin/ManageCategories";
import { Toaster } from "react-hot-toast";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ostukorv" element={<Cart />} />
        <Route path="/seaded" element={<Settings />} />
        <Route path="/kinkekaart" element={<GiftCards />} />
        <Route path="/poed" element={<Shops />} />
        <Route path="/kalkulaator" element={<Calculator />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/lisa-toode" element={<AddProduct />} />
        <Route path="/admin/supplier1" element={<Supplier />} />
        <Route path="/admin/supplier2" element={<Supplier2 />} />
        <Route path="/admin/supplier3" element={<Supplier3 />} />
        <Route path="/admin/halda-tooteid" element={<ManageProducts />} />
        <Route
          path="/admin/halda-kategooriaid"
          element={<ManageCategories />}
        />
        <Route path="/admin/muuda-toode/:productId" element={<EditProduct />} />

        <Route path="/toode/:productId" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map" element={<Map />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
