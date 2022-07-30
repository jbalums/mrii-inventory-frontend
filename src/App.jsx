import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/404";
import Login from "@/src/pages/Login";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
