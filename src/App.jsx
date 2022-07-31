import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/404";
import Login from "@/src/pages/Login";
import Test from "./pages/Test";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/test" element={<Test />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
