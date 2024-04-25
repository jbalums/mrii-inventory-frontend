import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
const ModalHeader = ({
	children,
	className = "",
	headerClassName = "",
	title,
	subtitle,
	titleClassName = "",
	subtitleClassName = "",
	hide,
}) => {
	return (
		<Dialog.Title
			as="div"
			className={`text-lg font-medium leading-6 flex p-4 border-b bg-indigo-50 rounded-t-xl ${className}`}
		>
			<div
				className={`flex flex-col justify-center mr-auto ${headerClassName}`}
			>
				<h2
					className={`text-lg font-bold text-indigo-800 mb-0 ${titleClassName}`}
				>
					{title}
				</h2>
				{subtitle ? (
					<p
						className={`text-xs font-light text-purple-950 ${subtitleClassName}`}
					>
						{subtitle}
					</p>
				) : (
					""
				)}
			</div>
			{children}
			{hide ? (
				<div
					className="justify-self-end w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:cursor-pointer hover:shadow-lg hover:scale-[1.5] duration-200 text-white"
					onClick={hide}
				>
					<FiX className=" font-bold" />
				</div>
			) : (
				""
			)}
		</Dialog.Title>
	);
};

export default ModalHeader;
