import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextAreaInputField from "@/src/components/forms/TextAreaInputField";
import Infotext from "@/src/components/InfoText";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";

const RemarksFormModal = (props, ref) => {
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
		<Modal open={open} hide={hide} size="sm">
			<ModalHeader title={"Write a remarks"} hide={hide} />
			<ModalBody className={`!p-0 !bg-background`}>
				<TextAreaInputField
					inputClassName="!rounded-none"
					placeholder={`Write your remarks`}
					rows={8}
				/>
			</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button type="accent" className="gap-2 ml-auto">
					<FlatIcon icon="rr-disk" />
					Save remarks
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(RemarksFormModal);
