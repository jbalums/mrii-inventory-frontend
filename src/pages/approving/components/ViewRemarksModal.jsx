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

const ViewRemarksModal = (props, ref) => {
	const { remarks_form_ref } = props;
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
		<Modal open={open} hide={hide} size="md">
			<ModalHeader
				title={"Remarks"}
				subtitle={`Remarks from the approved manager`}
				hide={hide}
			>
				<div className="ml-auto px-2 lg:px-4 mr-2 lg:mr-4 border-r border-border">
					<Button
						type="accent"
						className="gap-2"
						onClick={() => {
							remarks_form_ref.current.show();
							hide();
						}}
					>
						<FlatIcon icon="rr-edit" />
						Edit
					</Button>
				</div>
			</ModalHeader>
			<ModalBody className={`!p-0 !bg-background`}>
				<div className="p-4">
					Lorem ipsum dolor sit amet consectetur. Viverra amet nibh
					ipsum ipsum. Bibendum sed ultrices enim cursus felis
					pretium. In turpis a suspendisse nisl tortor.
				</div>
			</ModalBody>
		</Modal>
	);
};

export default forwardRef(ViewRemarksModal);
