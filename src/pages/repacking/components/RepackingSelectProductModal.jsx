import {
	useState,
	Fragment,
	forwardRef,
	useImperativeHandle,
	useEffect,
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

const RepackingSelectProductModal = (props, ref) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [products, setProducts] = useState([]);
	useEffect(() => {
		let t = setTimeout(() => {
			setLoading(true);
			getProductList();
		}, 500);
		return () => {
			clearTimeout(t);
		};
	}, [keyword]);
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setOpen(true);
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
	const submitForm = (data) => {};
	const getProductList = () => {
		axios
			.get(`/inventory?keyword=${keyword}`)
			.then((res) => {
				setProducts(res.data.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader title={`Repack Product`} hide={hide} />
			<ModalBody className={`py-4`}>
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-12 gap-3 flex flex-col">
						<div className="flex items-center">
							<h3 className="text-lg font-bold">
								Select Product
							</h3>
							<TextInputField
								className="ml-auto"
								placeholder="Seach products"
								icon={<FlatIcon icon="rr-search" />}
								onChange={(e) => {
									setKeyword(e.target.value);
								}}
							/>
						</div>
						<div className=" max-h-[calc(45vh)] min-h-[calc(45vh)] overflow-auto w-full ">
							<div className="table w-[calc(100%-1px)] ">
								<table className="!bg-white">
									<thead className="sticky top-[-1px] !border-2 border-border !shadow-[0px_0px_1px_0px_inset] shadow-[#DDDEE6]">
										<tr className="divide-x">
											<th className="!shadow-[0px_0px_0px_1px]">
												Code
											</th>
											<th className="!shadow-[0px_0px_0px_1px]">
												Name
											</th>
											<th className="!text-center !shadow-[0px_0px_0px_1px]">
												UM
											</th>
											<th className="!shadow-[0px_0px_0px_1px]">
												Location
											</th>
											<th className=" !text-center w-[100px]">
												Stock
											</th>
											<th className="!shadow-[0px_0px_0px_1px] !text-center w-[100px]">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<tr>
												<td
													colSpan={3}
													className="animate-pulse"
												>
													Loading...
												</td>
											</tr>
										) : (
											<>
												{products?.length == 0 ? (
													<tr>
														<td colSpan={3}>
															No products found.
														</td>
													</tr>
												) : (
													products?.map((item) => {
														return (
															<tr
																className="divide-x"
																key={`product-${item?.id}`}
															>
																<td>
																	{item?.code}
																</td>
																<td>
																	<b>
																		{
																			item?.name
																		}
																	</b>
																</td>
																<td className="!text-center">
																	{
																		item?.unit_measurement
																	}
																</td>
																<td className="!text-">
																	{item
																		?.location
																		?.name ||
																		"-"}
																</td>
																<td className="!text-center">
																	{
																		item?.total_quantity
																	}
																</td>
																<td>
																	<Button
																		className="mx-auto max-w-[100px]"
																		size="sm"
																		type="success"
																	>
																		<FlatIcon icon="rr-check" />
																		Select
																	</Button>
																</td>
															</tr>
														);
													})
												)}
											</>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default forwardRef(RepackingSelectProductModal);
