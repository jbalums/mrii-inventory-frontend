import { forwardRef, useImperativeHandle, useState } from "react";
import ModalBody from "./components/ModalBody";
import ModalFooter from "./components/ModalFooter";
import ModalHeader from "./components/ModalHeader";
import Modal from "./Modal";

const ConfirmModal = (props, ref) => {
	const { title, body, footer } = props;
	const [open, setOpen] = useState(false);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = () => {
		setOpen(true);
	};
	const hide = () => {
		setOpen(false);
	};
	return (
		<Modal open={open} hide={hide} size="">
			<ModalHeader title={title || "Confirm"} hide={hide} />
			<ModalBody className={`py-6`}>{body}</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				{footer}
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(ConfirmModal);
