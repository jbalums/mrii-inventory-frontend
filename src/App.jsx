import Login from "@/src/pages/Login";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ItemCategories from "./features/item-categories/ItemCategories";
import Locations from "./features/locations/Locations";
import Users from "./features/users/Users";
import NotFoundPage from "./pages/404";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/inventory/Inventory";
import Suppliers from "./pages/suppliers/Suppliers";
import Test from "./pages/Test";
function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />

            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />

            <Route path="/inventory" element={<Inventory />} />

            <Route path="/item-categories" element={<ItemCategories />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/suppliers" element={<Suppliers />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
