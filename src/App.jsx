import Login from "@/src/pages/Login";
import Products from "@/src/pages/products/Products.jsx";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import ItemCategories from "./features/item-categories/ItemCategories";
import PrintItemCategories from "./features/item-categories/PrintItemCategories";
import Locations from "./features/locations/Locations";
import PrintLocations from "./features/locations/PrintLocations";
import PrintUsers from "./features/users/PrintUsers";
import Users from "./features/users/Users";
import NotFoundPage from "./pages/404";
import AcceptOrders from "./pages/accept-orders/AcceptOrders";
import RequestDetails from "./pages/accept-orders/RequestDetails";
import ApproveIssuance from "./pages/approving/ApproveIssuance";
import ApproveRequestOrder from "./pages/approving/ApproveRequestOrder";
import Approving from "./pages/approving/Approving";
import ViewIssuanceOrder from "./pages/approving/ViewIssuanceOrder";
import ViewRequestOrderPage from "./pages/approving/ViewRequestOrderPage";
import CheckAuth from "./pages/CheckAuth";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/inventory/Inventory";
import IssuanceApproval from "./pages/issuances/IssuanceApproval";
import Issuances from "./pages/issuances/Issuances";
import ReceivingIssuances from "./pages/issuances/ReceivingIssuances";
import PrintProducts from "./pages/products/PrintProducts";
import ProjectPlantRequests from "./pages/project-plant/ProjectPlantRequests";
import PurchaseOrderList from "./pages/purchase-order-list/PurchaseOrderList";
import ReceiveOrderDetails from "./pages/receiving-orders/ReceivingOrderDetails";
import ReceivingOrders from "./pages/receiving-orders/ReceivingOrders";
import Receiving from "./pages/receiving/Receiving";
import Repacking from "./pages/repacking/Repacking";
import ItemDelivery from "./pages/request-orders/ItemDelivery";
import PrepareItemDelivery from "./pages/request-orders/PrepareItemDelivery";
import RequestOrderDetail from "./pages/request-orders/RequestOrderDetail";
import RequestOrders from "./pages/request-orders/RequestOrders";
import ViewCompletedRequest from "./pages/request-orders/ViewCompletedRequest";
import ReturnMaterials from "./pages/return-materials/ReturnMaterials";
import PrintSuppliers from "./pages/suppliers/PrintSuppliers";
import Suppliers from "./pages/suppliers/Suppliers";
import Test from "./pages/Test";
import Profile from "./pages/user/Profile";
const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<CheckAuth />} />
			<Route path="/login" element={<Login />} />
			<Route path="/test" element={<Test />} />
			<Route path="/dashboard" element={<Dashboard />} />
			{/* USERS MANAGEMENT*/}
			<Route path="/users" element={<Users />} />
			<Route path="/users/print" element={<PrintUsers />} />
			<Route path="/inventory" element={<Inventory />} />
			<Route path="/inventory" element={<Inventory />} />
			{/* PRODUCTS MANAGEMENT*/}
			<Route path="/products" element={<Products />} />
			<Route path="/products/print" element={<PrintProducts />} />
			<Route path="/receiving" element={<Receiving />} />
			<Route path="/accept-orders" element={<AcceptOrders />} />
			<Route
				path="/accept-orders/details/:id"
				element={<RequestOrderDetail />}
			/>
			<Route path="/request-orders" element={<RequestOrders />} />
			<Route
				path="/request-orders/:id"
				element={<RequestOrderDetail />}
			/>
			<Route
				path="/request-orders/prepare-item-delivery"
				element={<PrepareItemDelivery />}
			/>
			<Route
				path="/request-orders/prepare-item-delivery/:id"
				element={<PrepareItemDelivery />}
			/>
			<Route
				path="/request-orders/item-delivery"
				element={<ItemDelivery />}
			/>
			<Route
				path="/request-orders/view-completed/:id"
				element={<ViewCompletedRequest />}
			/>

			<Route path="/approving" element={<Approving />} />

			<Route
				path="/approving/approve-request-order"
				element={<ApproveRequestOrder />}
			/>
			<Route
				path="/approving/approve-request-order/view-request/:id"
				element={<ViewRequestOrderPage />}
			/>

			<Route path="/issuances" element={<Issuances />} />
			<Route path="/issuances/:id" element={<RequestOrderDetail />} />
			<Route
				path="/for-approval-issuances/:id"
				element={<RequestOrderDetail />}
			/>

			<Route path="/repacking" element={<Repacking />} />
			<Route path="/return-materials" element={<ReturnMaterials />} />
			<Route
				path="/for-project-or-plant-requests"
				element={<ProjectPlantRequests />}
			/>

			<Route
				path="/approving/approve-issuance-order"
				element={<ApproveIssuance />}
			/>

			<Route path="/receiving-orders" element={<ReceivingIssuances />} />
			<Route
				path="/receiving-orders/:id"
				element={<RequestOrderDetail />}
			/>
			{/* 	<Route
				path="/receiving-orders/:id"
				element={<ReceiveOrderDetails />}
			/>
 */}
			<Route
				path="/approving/approve-issuance-order/view-issuance/:id"
				element={<ViewIssuanceOrder />}
			/>
			<Route path="/po-lists" element={<PurchaseOrderList />} />
			{/* PRODUCT CATEGORIES MANAGEMENT*/}
			<Route path="/item-categories" element={<ItemCategories />} />
			<Route
				path="/item-categories/print"
				element={<PrintItemCategories />}
			/>
			{/* LOCATIONS MANAGEMENT*/}
			<Route path="/locations" element={<Locations />} />
			<Route path="/locations/print" element={<PrintLocations />} />
			{/* SUPPLIERS MANAGEMENT*/}
			<Route path="/suppliers" element={<Suppliers />} />
			<Route path="/suppliers/print" element={<PrintSuppliers />} />

			<Route path="/profile" element={<Profile />} />

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
function App() {
	const [showSplash, setShowSplash] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setShowSplash(false);
		}, 2500);
	}, []);

	return showSplash ? <SplashScreen /> : <AppRoutes />;
}

export default App;
