import axios from "@/libs/axios";
import axios2 from "axios";
import { useEffect, useState } from "react";

export const useHttp = (url, dependencies, allowFetch = true) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [meta, setMeta] = useState(null);

	useEffect(() => {
		setData(null);
		setMeta(null);

		if (!url || !allowFetch) {
			setLoading(false);
			return;
		}

		const cancelToken = axios2.CancelToken.source();
		let isMounted = true;

		setLoading(true);

		axios
			.get(url, {
				cancelToken: cancelToken.token,
			})
			.then((result) => {
				if (!isMounted) return;
				setData(result?.data ?? null);
				setMeta(result?.data?.meta ?? null);
			})
			.catch((error) => {
				if (!axios2.isCancel(error) && isMounted) {
					setData(null);
					setMeta(null);
				}
			})
			.finally(() => {
				if (isMounted) {
					setLoading(false);
				}
			});

		return () => {
			isMounted = false;
			cancelToken.cancel();
		};
	}, [url, allowFetch, JSON.stringify(dependencies)]);

	return { loading, data, meta, setLoading, setData };
};
