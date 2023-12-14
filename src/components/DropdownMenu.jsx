import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { v4 as uuidv4 } from "uuid";
const id = uuidv4();
const DropdownMenu = (props) => {
	const {
		className = "",
		menuButtonClassName = "",
		menuClassName = "",
		menuChildren,
		options = [],
		children,
	} = props;
	return (
		<Menu
			as="div"
			className={`relative inline-block text-left ${className}`}
		>
			<Menu.Button className={menuButtonClassName}>
				{children}
			</Menu.Button>
			{options?.length > 0 ? (
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items
						className={`absolute mt-4 w-full right-0 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${menuClassName}`}
					>
						<div className="px-1 py-1 ">
							{menuChildren}
							{options?.map((option, index) => {
								return (
									<Menu.Item key={`${id}-dp-${index}`}>
										{({ active }) => (
											<button
												onClick={option?.onClick}
												className={`${
													active
														? "bg-primary text-white"
														: "text-gray-900"
												} group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2 ${
													option?.className
												}`}
											>
												{option?.label}
											</button>
										)}
									</Menu.Item>
								);
							})}
						</div>
					</Menu.Items>
				</Transition>
			) : (
				""
			)}
		</Menu>
	);
};

export default DropdownMenu;
