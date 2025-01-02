import Axios from "axios";

const axios = Axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	headers: {
		"X-Requested-With": "XMLHttpRequest",
		'X-Db-Config': 'mrii_prod_2024',
	},
	withCredentials: true,
});

export default axios;
