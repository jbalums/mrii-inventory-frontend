import { Dialog, Transition } from "@headlessui/react";

const ModalHeader = () => {
	return (
		<Dialog.Title
			as="h3"
			className="text-lg font-medium leading-6 text-gray-900"
		>
			Payment successful
		</Dialog.Title>
	);
};

export default ModalHeader;
