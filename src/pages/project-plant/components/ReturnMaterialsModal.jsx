import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Fade from "react-reveal/Fade";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "@/libs/axios";

const ReturnMaterialsModal = (props, ref) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		clearErrors,
		reset,
		formState: { errors },
		control,
	} = useForm();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (showData) => {
		console.log("datadatadata", showData);
		getDetails(showData);
		setOpen(true);
	};
	const hide = () => {
		setOpen(false);
	};
	const submitForm = (data) => {
		console.log(data);
	};
	const getDetails = (showData) => {
		axios
			.get(`/inventory/project-plant-orders/${showData?.id}`)
			.then((res) => {
				setData(res.data.data);
			});
	};
	return (
		<Modal open={open} hide={hide} size="lg">
			<ModalHeader
				title={`Return Materials`}
				subtitle="Return of unused/excess materials to main warehouse"
				hide={hide}
			/>
			<ModalBody className={`py-4`}>{JSON.stringify(data)}</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button onClick={handleSubmit(submitForm)} loading={loading}>
					Submit
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(ReturnMaterialsModal);
