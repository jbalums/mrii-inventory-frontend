import Login from "@/src/pages/Login";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ItemCategories from "./features/item-categories/ItemCategories";
import Locations from "./features/locations/Locations";
import Users from "./features/users/Users";
import NotFoundPage from "./pages/404";
import AcceptOrders from "./pages/accept-orders/AcceptOrders";
import RequestDetails from "./pages/accept-orders/RequestDetails";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/inventory/Inventory";
import Receiving from "./pages/receiving/Receiving";
import ItemDelivery from "./pages/request-orders/ItemDelivery";
import PrepareItemDelivery from "./pages/request-orders/PrepareItemDelivery";
import RequestOrders from "./pages/request-orders/RequestOrders";
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

			<Route path="/inventory" element={<Inventory />} />
			<Route path="/receiving" element={<Receiving />} />

			<Route path="/accept-orders" element={<AcceptOrders />} />
			<Route
				path="/accept-orders/request/1"
				element={<RequestDetails />}
			/>

			<Route path="/request-orders" element={<RequestOrders />} />
			<Route
				path="/request-orders/prepare-item-delivery"
				element={<PrepareItemDelivery />}
			/>
			<Route
				path="/request-orders/item-delivery"
				element={<ItemDelivery />}
			/>

			<Route path="/item-categories" element={<ItemCategories />} />
			<Route path="/locations" element={<Locations />} />
			<Route path="/suppliers" element={<Suppliers />} />

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
