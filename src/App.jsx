import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/404";
import Login from "@/src/pages/Login";
import Test from "./pages/Test";
import "react-toastify/dist/ReactToastify.css";
import Users from "./features/users/Users";
import ItemCategories from "./features/item-categories/ItemCategories";
import ItemBranches from "./features/item-branches/ItemBranches";
import Inventory from "./pages/inventory/Inventory";
function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/test" element={<Test />} />

			<Route path="/" element={<Dashboard />} />
			<Route path="/users" element={<Users />} />

			<Route path="/inventory" element={<Inventory />} />

			<Route path="/item-categories" element={<ItemCategories />} />
			<Route path="/item-branches" element={<ItemBranches />} />

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
