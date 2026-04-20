import {
	useState,
	Fragment,
	forwardRef,
	useImperativeHandle,
	useEffect,
	useRef,
} from "react";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import Modal from "@/src/components/modals/Modal";
import TextInputField from "@/src/components/forms/TextInputField";
import { useForm } from "react-hook-form";
import Button from "@/src/components/Button";
import axios from "@/libs/axios";
import FlatIcon from "@/src/components/FlatIcon";
import RepackingSelectProductModal from "./RepackingSelectProductModal";
import { toast } from "react-toastify";

const RepackingModal = (props, ref) => {
	const { onSuccess } = props;
	const {
		register,
		handleSubmit,
		setError,
		watch,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	const selectProductRef = useRef(null);
	const selectOutputProductRef = useRef(null);

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [product, setProduct] = useState(null);
	const [productOutput, setProductOutput] = useState(null);

	const [qty, setQty] = useState(0);
	const [outputQty, setOutputQty] = useState(0);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setOpen(true);
		setProduct(null);
		setProductOutput(null);
		setQty(0);
		setOutputQty(0);
	};
	const hide = () => {
		setOpen(false);
		setTimeout(() => {
			reset();
			setId(null);
		}, 300);
	};
	const successCallBack = (data) => {
		hide();
	};
	const submitForm = () => {
		if (qty == 0 || qty == "") {
			setError("qty", {
				type: "manual",
				message: "Qty must be greater than zero.",
			});
		}
		if (outputQty == 0 || qty == "") {
			setError("outputQty", {
				type: "manual",
				message: "Qty must be greater than zero.",
			});
		}
		let formData = new FormData();
		formData.append("product_id", product?.product_id);
		formData.append("qty", qty);
		formData.append("output_product_id", productOutput?.product_id);
		formData.append("output_qty", outputQty);
		axios.post(`/inventory/repack`, formData).then((res) => {
			toast.success("Item has been repacked successfully!");
			if (onSuccess) {
				onSuccess();
			}
			hide();
		});
	};
	return (
		<>
			<Modal open={open} hide={hide} size="lg">
				<ModalHeader title={`	`} hide={hide} />
				<ModalBody className={`py-4 relative min-h-[256px] !bg-white`}>
					<div className="flex flex-col">
						<h3 className="text-base font-bold mb-2 flex items-center !text-secondary-dark">
							Product Source{" "}
							<span
								className="bg-secondary px-2 rounded-lg text-white !text-sm !font-normal cursor-pointer ml-2"
								onClick={() => {
									selectProductRef.current.show();
								}}
							>
								{product?.id ? "Change Item" : "Select Item"}
							</span>
						</h3>
						{product ? (
							<div className="flex flex-col">
								<div className="table">
									<table>
										<tbody>
											<tr>
												<td className="!py-1">
													Product:
												</td>
												<th
													className="!py-1 !text-secondary-dark"
													colSpan={3}
												>
													{product?.product?.name}
												</th>
											</tr>
											<tr>
												<td className="!py-1">
													Refecence #:
												</td>
												<th className="!py-1">
													{product?.product
														?.account_code || "-"}
												</th>
												<td className="!py-1">Code:</td>
												<th className="!py-1">
													{product?.product?.code}
												</th>
											</tr>
											<tr>
												<td className="!py-1">
													Location:
												</td>
												<th className="!py-1">
													{product?.branch?.name}
												</th>
												<td className="!py-1">U/M:</td>
												<th className="!py-1">
													{
														product?.product
															?.unit_measurement
													}
												</th>
											</tr>
										</tbody>
									</table>
								</div>

								<div className="table">
									<table>
										<tbody>
											<tr className="divide-x">
												<td className="text-center w-1/2">
													Stock on hand
												</td>
												<td className="text-center w-1/2">
													Quantity to convert
												</td>
											</tr>
											<tr className="divide-x">
												<th className="text-center !text-xl">
													{product?.total_quantity}
												</th>
												<th className="text-center">
													<TextInputField
														max={
															product?.total_quantity
														}
														type="number"
														inputClassName="border rounded h-9 p-1 !text-xl text-center"
														register={register(
															"qty",
														)}
														error={
															errors?.qty?.message
														}
														value={qty}
														onChange={(e) => {
															setQty(
																e.target.value,
															);
														}}
													/>
												</th>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						) : (
							<div
								className="w-full backdrop-blur flex items-center justify-center mb-6 py-6 relative border-2  border-dotted rounded-lg text-xl text-placeholder cursor-pointer"
								onClick={() => {
									selectProductRef.current.show();
								}}
							>
								Select product
							</div>
						)}
						<h3 className="text-base font-bold mt-6 mb-2 flex items-center text-primary">
							Output Product
							<span
								className="bg-primary px-2 rounded-lg text-white !text-sm !font-normal cursor-pointer ml-2"
								onClick={() => {
									selectOutputProductRef.current.show();
								}}
							>
								{productOutput?.id
									? "Change Item"
									: "Select Item"}
							</span>
						</h3>
						{productOutput ? (
							<div className="flex flex-col">
								<div className="table">
									<table>
										<tbody>
											<tr>
												<td className="!py-1">
													Product:
												</td>
												<th
													className="!py-1 !text-danger"
													colSpan={3}
												>
													{
														productOutput?.product
															?.name
													}
												</th>
											</tr>
											<tr>
												<td className="!py-1">
													Refecence #:
												</td>
												<th className="!py-1">
													{
														productOutput?.product
															?.account_code
													}
												</th>
												<td className="!py-1">Code:</td>
												<th className="!py-1">
													{
														productOutput?.product
															?.code
													}
												</th>
											</tr>
											<tr>
												<td className="!py-1">
													Location:
												</td>
												<th className="!py-1">
													{
														productOutput?.branch
															?.name
													}
												</th>
												<td className="!py-1">U/M:</td>
												<th className="!py-1">
													{
														productOutput?.product
															?.unit_measurement
													}
												</th>
											</tr>
										</tbody>
									</table>
								</div>

								<div className="table">
									<table>
										<tbody>
											<tr className="divide-x">
												<td className="text-center w-1/2">
													Stock on hand
												</td>
												<td className="text-center w-1/2">
													Output quantity
												</td>
											</tr>
											<tr className="divide-x">
												<th className="text-center !text-xl">
													{
														productOutput?.total_quantity
													}
												</th>
												<th className="text-center">
													<TextInputField
														type="number"
														inputClassName="border rounded h-9 p-1 !text-xl text-center"
														register={register(
															"outputQty",
														)}
														value={outputQty}
														error={
															errors?.outputQty
																?.message
														}
														onChange={(e) => {
															setOutputQty(
																e.target.value,
															);
														}}
													/>
												</th>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						) : (
							<div
								className="w-full backdrop-blur flex items-center justify-center mb-6 py-6 relative border-2  border-dotted rounded-lg text-xl text-placeholder cursor-pointer"
								onClick={() => {
									selectOutputProductRef.current.show();
								}}
							>
								Select product
							</div>
						)}
					</div>
				</ModalBody>
				<ModalFooter className={`flex items-center justify-end`}>
					<Button
						onClick={handleSubmit(submitForm)}
						loading={loading}
					>
						Submit
					</Button>
				</ModalFooter>
			</Modal>
			<RepackingSelectProductModal
				ref={selectProductRef}
				setProduct={setProduct}
				setProductOutput={setProductOutput}
			/>
			<RepackingSelectProductModal
				ref={selectOutputProductRef}
				setProduct={setProductOutput}
			/>
		</>
	);
};

export default forwardRef(RepackingModal);
