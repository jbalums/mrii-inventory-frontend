import { useAuth } from "@/hooks/useAuth";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import DropdownMenu from "../DropdownMenu";
import notificationEcho from "@/src/services/notificationService";
const Header = () => {
	const { user } = useAuth();
	// console.log("useruser", user);

	useEffect(() => {
		console.log("TestEvent11");
		const channel = notificationEcho.channel("notifications");
		channel.listen(".TestEvent", (data) => {
			// Handle incoming notifications
			console.log("TestEvent", data);
		});

		return () => {
			channel.unbind();
		};
	});
	return (
		<div className="w-full flex items-center h-16">
			{console.log("user", user)}
			<div className="h-11 px-6 flex items-center justify-center">
				<img src={"/logo.png"} className="h-9" />
			</div>
			<div className="ml-auto border-l px-6 flex items-center">
				<img
					src=""
					alt=""
					className="h-11 w-11 rounded-full bg-slate-400 mr-2"
				/>
				<span className="font-semibold">{`${user?.firstname} ${user?.lastname}`}</span>
				<FiChevronDown className="ml-2 font-bold text-lg" />
			</div>
		</div>
	);
};

export default Header;
