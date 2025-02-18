import { forwardRef, useImperativeHandle, useState } from "react";
import FlatIcon from "../FlatIcon";
import ModalBody from "./components/ModalBody";
import ModalFooter from "./components/ModalFooter";
import ModalHeader from "./components/ModalHeader";
import Modal from "./Modal";

const AffirmationModal = (props, ref) => {
	const { 
		title, 
		body, 
		footer, 
		footerClassName = "", 
		icon="br-check", 
		iconClassName="text-accent text-5xl", 
		iconBorderColor="border-dark",
		titleColor="text-darker " ,
		bodyClassName=""
	} = props;
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
					<div className={`h-24 w-24 rounded-full border-2 ${iconBorderColor} flex items-center justify-center`}>
						<FlatIcon
							icon={icon}
							className={iconClassName}
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<h4 className={`text-lg font-bold mb-4 text-center ${titleColor}`}>
						{title}
					</h4>
					<p className={`text-sm text-dark text-center ${bodyClassName}`}>{body}</p>
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
