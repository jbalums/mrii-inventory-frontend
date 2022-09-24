import combineReducers from "react-combine-reducers";
import themeReducer from "./themeReducer";

const [root, initialRoot] = combineReducers({
    theme: [
        themeReducer,
        {
            theme: "default",
            collapseSidebar: false,
        },
    ],
});
export { root, initialRoot };
