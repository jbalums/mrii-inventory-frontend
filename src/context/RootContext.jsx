import { createContext, useContext, useEffect, useReducer } from "react";
import { initialRoot, root as rootReducer } from "./reducers/rootReducer";
const RootContext = createContext();

export function RootContextWrapper({ children }) {
    const [root, dispatch] = useReducer(rootReducer, initialRoot, () => {
        const localData = localStorage.getItem("root");
        return localData ? JSON.parse(localData) : initialRoot;
    });

    useEffect(() => {
        console.log("root useEffect", root);
        localStorage.setItem("root", JSON.stringify({ ...root }));
        if (typeof window == "object") {
            if (window?.outerWidth < 1024) {
                dispatch({
                    type: "TOGGLE_SIDEBAR",
                    value: true,
                });
            }
        }
    }, [root]);

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
