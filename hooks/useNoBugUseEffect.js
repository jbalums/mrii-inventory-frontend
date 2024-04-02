/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

const useNoBugUseEffect = ({ functions, params = [1], timeout = 300 }) => {
	useEffect(() => {
		let t = setTimeout(() => {
			if (functions) {
				functions();
			}
		}, timeout);
		return () => {
			clearTimeout(t);
		};
	}, [JSON.stringify(params)]);
};

export default useNoBugUseEffect;
