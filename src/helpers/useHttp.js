import axios from "@/libs/axios";
import axios2 from "axios";
import { useEffect, useState } from "react";

let cancel_token = axios2.CancelToken.source();

export const useHttp = (url, dependencies) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
	const [meta, setMeta] = useState(null);

	useEffect(() => {
		setData(null);
		setIsLoading(true);
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
						setIsLoading(false);
					})
					.catch((error) => {
						setIsLoading(false);
						setTimeout(() => {
							setIsLoading(false);
						}, 100);
					})
					.finally(() => {
						setIsLoading(false);
						setTimeout(() => {
							setIsLoading(false);
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

	return { isLoading, data, meta, setIsLoading, setData };
};
