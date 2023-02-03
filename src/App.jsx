import Login from "@/src/pages/Login";
import Products from "@/src/pages/products/Products.jsx";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/inventory/Inventory";
import PrintProducts from "./pages/products/PrintProducts";
import PurchaseOrderList from "./pages/purchase-order-list/PurchaseOrderList";
import ReceiveOrderDetails from "./pages/receiving-orders/ReceivingOrderDetails";
import ReceivingOrders from "./pages/receiving-orders/ReceivingOrders";
import Receiving from "./pages/receiving/Receiving";
import ItemDelivery from "./pages/request-orders/ItemDelivery";
import PrepareItemDelivery from "./pages/request-orders/PrepareItemDelivery";
import RequestOrders from "./pages/request-orders/RequestOrders";
import PrintSuppliers from "./pages/suppliers/PrintSuppliers";
import Suppliers from "./pages/suppliers/Suppliers";
import Test from "./pages/Test";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<Dashboard />} />
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
                path="/accept-orders/request/:id"
                element={<RequestDetails />}
            />
            <Route path="/request-orders" element={<RequestOrders />} />
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
            <Route path="/approving" element={<Approving />} />
            <Route
                path="/approving/approve-request-order"
                element={<ApproveRequestOrder />}
            />
            <Route
                path="/approving/approve-request-order/view-request/:id"
                element={<ViewRequestOrderPage />}
            />
            <Route
                path="/approving/approve-issuance-order"
                element={<ApproveIssuance />}
            />

            <Route path="/receiving-orders" element={<ReceivingOrders />} />
            <Route
                path="/receiving-orders/:id"
                element={<ReceiveOrderDetails />}
            />

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
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowSplash(false);
        }, 3000);
    }, []);

    return showSplash ? <SplashScreen /> : <AppRoutes />;
}

export default App;
