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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AcceptOrdersFormModal from "./components/AcceptOrdersFormModal";
import useAcceptOrdersHook from "./hooks/useAcceptOrdersHook.js";

const AcceptOrders = () => {
	const navigate = useNavigate();
	const form_modal_ref = useRef(null);
	const delete_modal_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const { data, loading: dataLoading } = useDataTable(`/inventory/request`);

	const { deleteSupplier } = useAcceptOrdersHook();

	const columns = useMemo(
		() => [
			{
				header: "Project code",
				accessorKey: "requisition.project_code",
				className: " cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Name",
				accessorKey: "requisition.requester.name",
				className: " cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Location",
				accessorKey: "requisition.location.name",
				className: " cursor-pointer",
				cellClassName: "",
			},
			{
				header: "BU",
				accessorKey: "requisition.requester.business_unit",
				className: " cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Date needed",
				accessorKey: "requisition.date_needed",
				className: " cursor-pointer",
				cellClassName: "",
			},

			{
				header: "Request Approve by",
				accessorKey: "requisition.accepted_by.name",
				className: " cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Status",
				accessorKey: "id",
				className: "!text-center flex items-center justify-center",
				cell: ({ row, getValue }) => {
					console.log("roww", row);
					return (
						<div className="px-2 py-1 rounded-xl w-[80px] bg-warning bg-opacity-10 text-warning capitalize">
							{row.original?.status}
						</div>
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
		<AppLayout title="Accept orders" titleChildren={""}>
			<div className="w-full">
				<div className="flex flex-col lg:flex-row gap-6 pb-6">
					<TextInputField
						className="lg:w-[320px]"
						icon={<FlatIcon icon="rr-search" className="text-sm" />}
						placeholder="Search request"
					/>
					{/* 	<ReactSelectInputField
						className="w-full lg:w-[256px]"
						placeholder="All status"
						 options={supliers?.map((supplier) => ({
							label: supplier?.name + ` - [${supplier?.address}]`,
							value: supplier?.id,
						}))} 
					/> */}
				</div>
				<Table
					rowClick={(data) => {
						console.log("rowClickrowClick", data.original);
						navigate(
							`/accept-orders/details/${data.original?.requisition?.id}`
						);
						/* navigate(
							`/accept-orders/request/${data?.original?.id}`
						); */
					}}
					columns={columns}
					loading={dataLoading}
					data={list}
					emptyMessage={`You don’t have an order`}
				/>
			</div>
			<AcceptOrdersFormModal
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

export default AcceptOrders;
