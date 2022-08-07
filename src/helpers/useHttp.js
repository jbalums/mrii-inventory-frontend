import axios from "@/libs/axios";
import axios2 from "axios";
import { useEffect, useState } from "react";

let cancel_token = axios2.CancelToken.source();

export const useHttp = (url, dependencies) => {
	const [loadingData, setLoadingData] = useState(false);
	const [data, setData] = useState(null);
	const [meta, setMeta] = useState(null);

	useEffect(() => {
		setData(null);
		setLoadingData(true);
		cancel_token = axios2.CancelToken.source();
		let timeout = setTimeout(() => {
			if (url) {
				axios
					.get(url, {
						cancelToken: cancel_token.token,
					})
					.then((result) => {
						setData(result?.data);
						setMeta(result?.data?.meta);
						setLoadingData(false);
					})
					.catch((error) => {
						setLoadingData(false);
						setTimeout(() => {
							setLoadingData(false);
						}, 100);
					})
					.finally(() => {
						setLoadingData(false);
						setTimeout(() => {
							setLoadingData(false);
						}, 150);
					});
			}
		}, 400);
		return () => {
			clearTimeout(timeout);
			if (cancel_token) {
				cancel_token.cancel();
			}
		};
	}, dependencies);

	return { loadingData, data, meta, setLoadingData, setData };
};
