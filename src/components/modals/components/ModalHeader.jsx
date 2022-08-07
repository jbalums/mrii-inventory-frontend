import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
const ModalHeader = ({ title, subtitle, hide }) => {
	return (
		<Dialog.Title
			as="div"
			className="text-lg font-medium leading-6 text-gray-900 flex border-b pb-4 mb-4"
		>
			<div className="flex flex-col">
				<h2 className="text-xl font-bold">{title}</h2>
				{subtitle ? <p>{subtitle}</p> : ""}
			</div>
			{hide ? (
				<div
					className="ml-auto w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:cursor-pointer hover:shadow-lg hover:scale-[1.5] duration-200 text-white"
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
