import { forwardRef, useImperativeHandle, useState } from "react";
import FlatIcon from "../FlatIcon";
import ModalBody from "./components/ModalBody";
import ModalFooter from "./components/ModalFooter";
import ModalHeader from "./components/ModalHeader";
import Modal from "./Modal";

const AffirmationModal = (props, ref) => {
	const { title, body, footer, footerClassName = "" } = props;
	const [open, setOpen] = useState(false);
	const [btnLoading, setBtnLoading] = useState(false);

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
			<ModalBody className={`px-8 pt-8 rounded-t-xl`}>
				<div className="flex flex-col items-center justify-center mb-8">
					<div className="h-24 w-24 rounded-full border-2 border-dark flex items-center justify-center">
						<FlatIcon
							icon="br-check"
							className="text-accent text-3xl"
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<h4 className="text-lg font-bold mb-4 text-darker text-center">
						{title}
					</h4>
					<p className="text-sm text-dark text-center">{body}</p>
				</div>
			</ModalBody>
			<ModalFooter
				className={`flex items-center justify-end bg-background rounded-b-xl pb-6 gap-2 ${footerClassName}`}
			>
				{typeof footer == "function"
					? footer({ btnLoading, setBtnLoading })
					: footer}
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(AffirmationModal);
