import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSuppliersHook } from "../suppliers/hooks/useSuppliersHook";
import AddItemsReceivedModal from "./components/AddItemsReceivedModal";
import ReceivingFormModal from "./components/ReceivingFormModal";
import ViewReceivedPOModal from "./components/ViewReceivedPOModal";

const Receiving = () => {
	const addFormRef = useRef(null);
	const viewProductRef = useRef(null);
	const add_items_received = useRef(null);
	const delete_modal_ref = useRef(null);
	const view_po_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
	const [supliers, setSuppliers] = useState([]);
	const [loading, setLoading] = useState(false);
	const {
		data,
		loading: dataLoading,
		addToList,
		updateInList,
		removeFromList,
		setFilters,
		filters,
	} = useDataTable(`/inventory/receiving`, setList);

	const { getSuppliers } = useSuppliersHook();

	useEffect(() => {
		getSuppliers().then((res) => {
			setSuppliers(res.data.data);
		});
	}, []);

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	const openFormModal = (data = null) => {
		addFormRef.current.show(data);
	};
	const viewProductModal = (data) => {
		viewProductRef.current.show(data);
	};

	const openConfirmDelete = () => {
		setLoading(false);
		delete_modal_ref.current.show();
	};

	const closeConfirmDelete = () => {
		setLoading(false);
		delete_modal_ref.current.hide();
	};
	const columns = useMemo(
		() => [
			{
				header: "PO number",
				accessorKey: "purchase_order",
			},
			{
				header: "Supplier Name",
				accessorKey: "supplier",
				cell: ({ row, getValue }) => {
					return (
						<div className="flex flex-col">
							<h5 className="text-sm font-bold">
								{row.original?.supplier?.name || ""}
							</h5>
							<span className="text-xs">
								{row.original?.supplier?.address || ""}
							</span>
						</div>
					);
				},
			},
			{
				header: "Date received",
				accessorKey: "created_at",
				className: "!text-center",
			},
			{
				header: "No. of received items",
				accessorKey: "details",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					return getValue().length || 0;
				},
			},
			/* {
				header: "Manage",
				accessorKey: "action",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					return (
						<>
							<div className="flex items-center justify-center text-center gap-4">
								<Button
									type="background"
									size="sm"
									onClick={() => {
										openFormModal(row?.original);
									}}
								>
									<FlatIcon
										icon="rr-edit"
										className="text-sm text-info"
									/>
								</Button>
								<Button
									type="background"
									size="sm"
									onClick={() => {
										setId(row?.original?.id);
										openConfirmDelete();
									}}
								>
									<FlatIcon
										icon="rr-trash"
										className="text-sm text-danger"
									/>
								</Button>
							</div>
						</>
					);
				},
			}, */
		],
		[]
	);

	const deleteData = () => {
		setLoading(true);
		deleteSupplier(id)
			.then((res) => {
				toast.success("Data deleted successfully!");
				removeFromList({ id: id });
			})
			.catch(() => {
				toast.error(
					"An error occured while trying to delete data! Please try again later."
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<AppLayout
			icon={<FlatIcon icon="rr-hand-holding-box" />}
			title={<div className="flex items-center gap-2">Receiving</div>}
			breadcrumbs={[
				{
					to: "/receiving",
					label: "Receiving",
				},
			]}
		>
			<div className="flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search PO"
					onChange={(e) => {
						let val = e.target.value;
						setFilters((prevFilters) => ({
							...prevFilters,
							keyword: val,
							query: val,
						}));
					}}
				/>
				<ReactSelectInputField
					className="w-full lg:w-[256px]"
					placeholder="All suppliers"
					options={supliers?.map((supplier) => ({
						label: supplier?.name + ` - [${supplier?.address}]`,
						value: supplier?.id,
					}))}
					value={filters?.supplier_id}
					onChange={(val) => {
						setFilters((prevFilters) => ({
							...prevFilters,
							supplier_id: val,
						}));
					}}
				/>
				<TextInputField
					type="date"
					className="w-full lg:w-[192px]"
					placeholder="By date"
					onChange={(e) => {
						let val = e.target.value;
						setFilters((prevFilters) => ({
							...prevFilters,
							date: val,
						}));
					}}
				/>
				<Button
					type="accent"
					className="ml-auto"
					onClick={openFormModal}
				>
					<FlatIcon icon="rs-plus" /> Add received PO
				</Button>
			</div>
			<Table
				rowClick={(data) => {
					viewProductModal(data?.original);
				}}
				columns={columns}
				pagination={true}
				loading={dataLoading}
				data={list}
			/>
			<ReceivingFormModal
				ref={addFormRef}
				addToList={addToList}
				add_items_received={add_items_received}
				updateInList={updateInList}
			/>
			<AddItemsReceivedModal ref={add_items_received} />
			<ConfirmModal
				ref={delete_modal_ref}
				title="Cofirm delete record?"
				body={
					<p className="text-red-600 font-semibold text-lg text-center">
						Are you sure you want to delete record?{" "}
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
							Yes, delete record!
						</Button>
					</div>
				}
			/>
			<ViewReceivedPOModal ref={viewProductRef} />
		</AppLayout>
	);
};

export default Receiving;
