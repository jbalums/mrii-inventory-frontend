import { createContext, useContext, useEffect, useReducer } from "react";
import { initialRoot, root as rootReducer } from "./reducers/rootReducer";
const RootContext = createContext();

export function RootContextWrapper({ children }) {
	const [root, dispatch] = useReducer(rootReducer, initialRoot, () => {
		const localData = localStorage.getItem("root");
		return localData ? JSON.parse(localData) : initialRoot;
	});

	useEffect(() => {
		localStorage.setItem("root", JSON.stringify({ ...root }));
		if (typeof window == "object") {
			if (window?.outerWidth < 1024) {
				setTimeout(() => {
					dispatch({
						type: "SET_DEVICE",
						value: "mobile",
					});
				}, 200);
			}
		}
	}, [
		window,
		root.theme.theme,
		root.theme.collapseSidebar,
		root.theme.device,
	]);

	return (
		<RootContext.Provider
			value={{
				dispatch,
				theme: root?.theme || null,
			}}
		>
			{children}
		</RootContext.Provider>
	);
}

export function useRootContext() {
	return useContext(RootContext);
}
