import { mobileNumber } from "@/libs/helpers";
import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SuppliersFormModal from "./components/SuppliersFormModal";
import { useSuppliersHook } from "./hooks/useSuppliersHook";

const TextInfoH3 = ({ label = "", text = "" }) => {
	if (label && text)
		return (
			<div className="flex flex-col">
				{label && (
					<span className="text-sm text-placeholder">{label}</span>
				)}
				{text && <h3 className="text-base !font-bold">{text}</h3>}
			</div>
		);
	return "";
};
const Suppliers = () => {
	const form_modal_ref = useRef(null);
	const delete_modal_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const {
		data,
		loading: dataLoading,
		setKeyword,
		keyword,
	} = useDataTable(`/management/suppliers`);

	const { deleteSupplier } = useSuppliersHook();

	const columns = useMemo(
		() => [
			{
				header: "Supplier",
				accessorKey: "name",
				className: "min-w-[256px]",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					const {
						name,
						code,
						street,
						address,
						gl_account,
						tin,
						owner,
					} = original;
					return (
						<div className="flex flex-col">
							<div className="flex flex-col mb-2">
								<p className="text-lg font-bold text-darker">
									{name}
								</p>
								<span className="text-base">{code}</span>
							</div>
							<div className="flex flex-col mb-2">
								<span className="text-xs text-placeholder">
									Address
								</span>
								<span className="text-base text-darker">
									{street}, {address}
								</span>
							</div>
							<div className="flex flex-col mb-2">
								<span className="text-xs text-placeholder">
									TIN
								</span>
								<span className="text-base text-darker">
									{tin}
								</span>
							</div>
							<div className="flex flex-col mb-2">
								<span className="text-xs text-placeholder">
									GL Account ID
								</span>
								<span className="text-base text-darker">
									{gl_account || (
										<>
											<i className="text-placeholder !text-xs">
												-
											</i>
											&nbsp;
										</>
									)}
								</span>
							</div>
							<div className="flex flex-col mb-2">
								<span className="text-xs text-placeholder">
									Owner
								</span>
								<span className="text-base text-darker">
									{owner}
								</span>
							</div>
						</div>
					);
				},
			},

			{
				header: "Contacts",
				accessorKey: "code",
				className: "min-w-[256px]",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					const { contacts } = original;
					return (
						<div className="flex flex-col gap-y-2">
							{contacts?.map((contact) => {
								return (
									<div className="p-3 rounded-lg shadow-sm shadow-blue-400 bg-white relative">
										<div className="absolute right-4 top-4">
											<FlatIcon
												icon="rr-circle-phone"
												className="text-[50px] text-blue-400 opacity-30 "
											/>
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col mb-2">
												<p className="text-base font-bold text-darker flex items-center gap-2">
													{contact?.name}
												</p>
												<span className="text-sm mb-1">
													{contact?.position || "-"}
												</span>
											</div>
											<div className="flex items-center mb-1 gap-2">
												<FlatIcon icon="rr-phone-call" />
												<span className="text-sm font-">
													{mobileNumber(
														contact?.number
													)}
												</span>
											</div>
											<div className="flex items-center mb-1 gap-2">
												<FlatIcon icon="rr-envelope" />
												<span className="text-sm font-">
													{contact?.email}
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					);
				},
			},
			{
				header: "Bank Accounts",
				accessorKey: "code",
				className: "min-w-[328px]",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					const { banks } = original;
					return (
						<div className="flex flex-col gap-y-2">
							{banks?.map((bank) => {
								return (
									<div className="p-3 rounded-lg bg-white shadow-sm shadow-indigo-600 flex items-start gap-3">
										<FlatIcon
											icon="rr-bank"
											className="text-[40px] text-indigo-400 opacity-30 mt-2"
										/>
										<div className="flex flex-col">
											<div className="flex flex-col mb-2">
												<p className="text-base font-bold text-darker">
													{bank?.account_name}
												</p>
												<span className="text-sm">
													{bank?.name}
												</span>
											</div>
											<div className="flex items-center mb-2 gap-2">
												<FlatIcon icon="rr-hastag" />
												<span className="text-base font-semibold">
													{bank?.account_number}
												</span>
											</div>
											<div className="flex items-center mb-1 gap-2">
												<FlatIcon icon="rr-map-marker" />
												<span className="text-sm font-">
													{bank?.location || (
														<i className="text-placeholder text-xs">
															blank
														</i>
													)}
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					);
				},
			},
			{
				header: "Actions",
				accessorKey: "id",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					console.log("roww", row);
					return (
						<>
							<div className="flex items-center justify-center text-center gap-4">
								<Button
									type="primary"
									size="sm"
									className="rounded-full"
									onClick={() => {
										openFormModal(row?.original);
									}}
								>
									<FiEdit className="font-bold text-sm" />
								</Button>
								<Button
									type="danger"
									size="sm"
									className="rounded-full"
									onClick={() => {
										setId(row?.original?.id);
										openConfirmDelete();
									}}
								>
									<FiTrash2 className="font-bold text-sm" />
								</Button>
							</div>
						</>
					);
				},
			},
		],
		[]
	);

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	const openFormModal = (data) => {
		form_modal_ref.current.show(data.type == "click" ? null : data);
	};

	const openConfirmDelete = () => {
		setLoading(false);
		delete_modal_ref.current.show();
	};

	const closeConfirmDelete = () => {
		setLoading(false);
		delete_modal_ref.current.hide();
	};

	const addToList = (item) => {
		setList((list) => [item, ...list]);
	};

	const updateInList = (item) => {
		setList((list) => list.map((x) => (x.id == item.id ? item : x)));
	};

	const deleteData = () => {
		setLoading(true);
		deleteSupplier(id)
			.then((res) => {
				toast.success("Supplier deleted successfully!");
				removeFromList({ id: id });
			})
			.catch(() => {
				toast.error(
					"An error occured while trying to delete supplier! Please try again later."
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const removeFromList = (item) => {
		setList((list) => list.filter((x) => x.id != item.id));
	};

	return (
		<AppLayout
			title={
				<div className="flex items-center gap-2">
					<FlatIcon icon="rr-truck-moving" />
					Suppliers
				</div>
			}
		>
			<div className="flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search"
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
				/>
				<div className="ml-auto flex items-center gap-4">
					<Link to={"/suppliers/print"}>
						<Button className="gap-2" type="foreground">
							<FlatIcon icon="rr-print" className="text-base" />{" "}
							Print supplier
						</Button>
					</Link>
					<Button
						type="accent"
						className="ml-auto"
						onClick={openFormModal}
					>
						<FlatIcon icon="rs-plus" /> Register supplier
					</Button>
				</div>
			</div>
			<div className="w-full">
				<Table
					columns={columns}
					loading={dataLoading}
					data={list}
					keyword={keyword}
				/>
			</div>
			<SuppliersFormModal
				ref={form_modal_ref}
				addToList={addToList}
				updateInList={updateInList}
			/>
			<ConfirmModal
				ref={delete_modal_ref}
				title="Cofirm delete item category?"
				body={
					<p className="text-red-600 font-semibold text-lg text-center">
						Are you sure you want to delete item category?{" "}
					</p>
				}
				footer={
					<div className="flex items-center">
						<Button onClick={closeConfirmDelete}>No</Button>
						<Button
							type="danger"
							className="ml-4"
							onClick={deleteData}
							loading={loading}
						>
							Yes, delete item category!
						</Button>
					</div>
				}
			/>
		</AppLayout>
	);
};

export default Suppliers;
