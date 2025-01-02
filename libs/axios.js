import Axios from "axios";

const axios = Axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	headers: {
		"X-Requested-With": "XMLHttpRequest",
		"X-Db-Config": import.meta.env.VITE_API_DB,
	},
	withCredentials: true,
});


export default axios;