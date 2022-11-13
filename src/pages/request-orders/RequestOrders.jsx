import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import RequestOrdersFormModal from "./components/RequestOrdersFormModal";
import useRequestOrdersHook from "./hooks/useRequestOrdersHook.js";

const RequestOrders = () => {
	const form_modal_ref = useRef(null);
	const delete_modal_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const { data, loading: dataLoading } = useDataTable(
		`/management/suppliers`
	);

	const { deleteSupplier } = useRequestOrdersHook();

	const columns = useMemo(
		() => [
			{
				header: "Order number",
				accessorKey: "name",
				className: "",
				cellClassName: "",
			},
			{
				header: "Location",
				accessorKey: "name",
				className: "",
				cellClassName: "",
			},
			{
				header: "Date created",
				accessorKey: "name",
				className: "",
				cellClassName: "",
			},
			{
				header: "Requested QTY",
				accessorKey: "name",
				className: "",
				cellClassName: "",
			},
			{
				header: "Shipping status",
				accessorKey: "name",
				className: "",
				cellClassName: "",
			},
			{
				header: "Approve by",
				accessorKey: "name",
				className: "",
				cellClassName: "",
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
		<AppLayout title="RequestOrders">
			<div className="w-full">
				<div className="flex flex-col lg:flex-row gap-6 pb-6">
					<TextInputField
						className="lg:w-[320px]"
						icon={<FlatIcon icon="rr-search" className="text-sm" />}
						placeholder="Search Purchase order"
					/>
					<ReactSelectInputField
						className="w-full lg:w-[256px]"
						placeholder="All status"
						/* options={supliers?.map((supplier) => ({
							label: supplier?.name + ` - [${supplier?.address}]`,
							value: supplier?.id,
						}))} */
					/>
					<Button
						type="accent"
						className="ml-auto"
						onClick={openFormModal}
					>
						<FlatIcon icon="rs-plus" className="mr-2" /> Add
						received PO
					</Button>
				</div>
				<Table
					rowClick={(data) => {
						viewProductModal(data);
					}}
					columns={columns}
					pagination={true}
					loading={dataLoading}
					data={[]}
					emptyMessage={`You don’t have an order`}
				/>
			</div>
			<RequestOrdersFormModal
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

export default RequestOrders;
