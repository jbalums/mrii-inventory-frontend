export default (state, action) => {
    const switchTheme = (value) => {
        console.log("switchTheme", state, action);
        return {
            ...state,
            theme: value || "dark",
        };
    };
    const toggleSidebar = (val = null) => {
        console.log("toggleSidebar", state, action);
        return {
            ...state,
            collapseSidebar: val != null ? val : !state?.collapseSidebar,
        };
    };
    switch (action.type) {
        case "SWITCH_THEME":
            return switchTheme(action.value);
        case "TOGGLE_SIDEBAR":
            return toggleSidebar(action.value);
        default:
            return state;
    }
};
