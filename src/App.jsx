import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import "rsuite/dist/rsuite.min.css";

const ShowRequestOrder = lazy(() => import("./public-pages/ShowRequestOrder"));
const ScanQr = lazy(() => import("./public-pages/ScanQr"));
const CheckAuth = lazy(() => import("./pages/CheckAuth"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./features/users/Users"));
const PrintUsers = lazy(() => import("./features/users/PrintUsers"));
const Inventory = lazy(() => import("./pages/inventory/Inventory"));
const ManageProductInventory = lazy(
	() => import("./pages/products/ManageProductInventory"),
);
const Products = lazy(() => import("./pages/products/Products.jsx"));
const PrintProducts = lazy(() => import("./pages/products/PrintProducts"));
const Receiving = lazy(() => import("./pages/receiving/Receiving"));
const InternalReceivng = lazy(
	() => import("./pages/receiving/InternalReceivng"),
);
const AcceptOrders = lazy(() => import("./pages/accept-orders/AcceptOrders"));
const RequestOrderDetail = lazy(
	() => import("./pages/request-orders/RequestOrderDetail"),
);
const RequestOrders = lazy(
	() => import("./pages/request-orders/RequestOrdersV2"),
);
const PrintRequestOrder = lazy(
	() => import("./pages/request-orders/PrintRequestOrder"),
);
const PrepareItemDelivery = lazy(
	() => import("./pages/request-orders/PrepareItemDelivery"),
);
const ItemDelivery = lazy(() => import("./pages/request-orders/ItemDelivery"));
const ViewCompletedRequest = lazy(
	() => import("./pages/request-orders/ViewCompletedRequest"),
);
const Approving = lazy(() => import("./pages/approving/Approving"));
const ApproveRequestOrder = lazy(
	() => import("./pages/approving/ApproveRequestOrder"),
);
const ViewRequestOrderPage = lazy(
	() => import("./pages/approving/ViewRequestOrderPage"),
);
const Issuances = lazy(() => import("./pages/issuances/Issuances"));
const Repacking = lazy(() => import("./pages/repacking/Repacking"));
const ReturnMaterials = lazy(
	() => import("./pages/return-materials/ReturnMaterials"),
);
const ProjectPlantRequests = lazy(
	() => import("./pages/project-plant/ProjectPlantRequests"),
);
const ApproveIssuance = lazy(() => import("./pages/approving/ApproveIssuance"));
const ReceivingIssuances = lazy(
	() => import("./pages/issuances/ReceivingIssuances"),
);
const ItemCosting = lazy(() => import("./pages/reports/ItemCosting"));
const IssuanceReport = lazy(() => import("./pages/reports/IssuanceReport"));
const InputsOfReceipts = lazy(() => import("./pages/reports/InputsOfReceipts"));
const AccountsPayableVoucher = lazy(
	() => import("./pages/reports/AccountsPayableVoucher"),
);
const ViewIssuanceOrder = lazy(
	() => import("./pages/approving/ViewIssuanceOrder"),
);
const PurchaseOrderList = lazy(
	() => import("./pages/purchase-order-list/PurchaseOrderList"),
);
const ItemCategories = lazy(
	() => import("./features/item-categories/ItemCategories"),
);
const PrintItemCategories = lazy(
	() => import("./features/item-categories/PrintItemCategories"),
);
const ItemUnits = lazy(() => import("./features/item-units/ItemUnits"));
const PrintItemUnits = lazy(
	() => import("./features/item-units/PrintItemUnits"),
);
const Locations = lazy(() => import("./features/locations/Locations"));
const PrintLocations = lazy(
	() => import("./features/locations/PrintLocations"),
);
const Suppliers = lazy(() => import("./pages/suppliers/Suppliers"));
const PrintSuppliers = lazy(() => import("./pages/suppliers/PrintSuppliers"));
const Profile = lazy(() => import("./pages/user/Profile"));
const MyLogs = lazy(() => import("./pages/user/MyLogs"));
const SystemLogs = lazy(() => import("./pages/user/SystemLogs"));
const Correction = lazy(() => import("./pages/Correction"));
const NotFoundPage = lazy(() => import("./pages/404"));

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/show-order/:id" element={<ShowRequestOrder />} />
			<Route path="/scan-qr" element={<ScanQr />} />
			<Route path="/" element={<CheckAuth />} />
			<Route path="/login" element={<Login />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/users" element={<Users />} />
			<Route path="/users/print" element={<PrintUsers />} />
			<Route path="/inventory" element={<Inventory />} />
			<Route
				path="/manage-product-inventory"
				element={<ManageProductInventory />}
			/>
			<Route path="/products" element={<Products />} />
			<Route path="/products/print" element={<PrintProducts />} />
			<Route path="/receiving" element={<Receiving />} />
			<Route path="/internal-receiving" element={<InternalReceivng />} />
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
				path="/request-orders/:id/print"
				element={<PrintRequestOrder />}
			/>
			<Route
				path="/request-orders/:id/pdf"
				element={<PrintRequestOrder />}
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
			<Route path="/reports/item-costing" element={<ItemCosting />} />
			<Route
				path="/reports/warehouse-issuance"
				element={<IssuanceReport />}
			/>
			<Route
				path="/reports/inputs-of-receipts"
				element={<InputsOfReceipts />}
			/>
			<Route
				path="/reports/accounts-payable-voucher"
				element={<AccountsPayableVoucher />}
			/>
			<Route
				path="/approving/approve-issuance-order/view-issuance/:id"
				element={<ViewIssuanceOrder />}
			/>
			<Route path="/po-lists" element={<PurchaseOrderList />} />
			<Route path="/item-categories" element={<ItemCategories />} />
			<Route
				path="/item-categories/print"
				element={<PrintItemCategories />}
			/>
			<Route path="/item-units" element={<ItemUnits />} />
			<Route path="/item-units/print" element={<PrintItemUnits />} />
			<Route path="/locations" element={<Locations />} />
			<Route path="/locations/print" element={<PrintLocations />} />
			<Route path="/suppliers" element={<Suppliers />} />
			<Route path="/suppliers/print" element={<PrintSuppliers />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/my-logs" element={<MyLogs />} />
			<Route path="/system-changes-logs" element={<SystemLogs />} />
			<Route
				path="/AUzNo13OhD1ONaRO/correction"
				element={<Correction />}
			/>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

function App() {
	const [showSplash, setShowSplash] = useState(true);

	useEffect(() => {
		const timer = window.setTimeout(() => {
			setShowSplash(false);
		}, 2500);

		return () => {
			window.clearTimeout(timer);
		};
	}, []);

	if (showSplash) {
		return <SplashScreen />;
	}

	return (
		<Suspense fallback={<SplashScreen />}>
			<AppRoutes />
		</Suspense>
	);
}

export default App;
