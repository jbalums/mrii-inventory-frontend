import React from "react";
import HomeHeader from "./HomeHeader";

const HomeLayout = ({ children }) => {
	return (
		<>
			<HomeHeader />
			{children}
		</>
	);
};

export default HomeLayout;
