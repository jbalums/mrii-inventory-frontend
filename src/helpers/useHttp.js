import axios from "@/libs/axios";
import axios2 from "axios";
import { useEffect, useState } from "react";

let cancel_token = axios2.CancelToken.source();

export const useHttp = (url, dependencies, allowFetch = true) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [meta, setMeta] = useState(null);

	useEffect(() => {
		setData(null);
		setLoading(true);
		cancel_token = axios2.CancelToken.source();
		let timeout = setTimeout(() => {
			if (url && allowFetch) {
				axios
					.get(url, {
						cancelToken: cancel_token.token,
					})
					.then((result) => {
						setData(result?.data);
						setMeta(result?.data.meta);
						setLoading(false);
					})
					.catch((error) => {
						setLoading(false);
						setTimeout(() => {
							setLoading(false);
						}, 100);
					})
					.finally(() => {
						setLoading(false);
						setTimeout(() => {
							setLoading(false);
						}, 150);
					});
			}
		}, 600);
		return () => {
			clearTimeout(timeout);
			if (cancel_token) {
				cancel_token.cancel();
			}
		};
	}, [JSON.stringify(dependencies)]);

	return { loading, data, meta, setLoading, setData };
};
