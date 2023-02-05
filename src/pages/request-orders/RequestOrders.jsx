import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import SelectItemsModal from "@/src/components/items/SelectItemsModal";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RequestOrdersFormModal from "./components/RequestOrdersFormModal";
import useRequestOrdersHook from "./hooks/useRequestOrdersHook.js";

const RequestOrders = () => {
	const navigate = useNavigate();
	const form_modal_ref = useRef(null);
	const delete_modal_ref = useRef(null);
	const select_items_ref = useRef(null);

	const [list, setList] = useState([
		/* {
			rs_number: "32132",
			name: "Test Requestor name 1",
			location: "Tagbilaran City, Bohol",
			created: "Nov. 12, 2022",
			needed: "Nov. 15, 2022",
			qty: "12",
			status: "2 of 7 completed",
			by: "Ariel Man",
		},
		{
			rs_number: "112233",
			name: "Test Requestor name 2",
			location: "Cebu City, Cebu",
			created: "Nov. 12, 2022",
			needed: "Nov. 16, 2022",
			qty: "25",
			status: "6 of 7 completed",
			by: "Test User",
		},
		{
			rs_number: "22234",
			name: "Test Requestor name 2",
			location: "Maribojoc, Bohol",
			created: "Nov. 14, 2022",
			needed: "Nov. 25, 2022",
			qty: "5",
			status: "2 of 7 completed",
			by: "Ariel Man",
		}, */
	]);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const { data, loading: dataLoading } = useDataTable(
		`/inventory/requisition`,
		null
		// setList
	);

	useEffect(() => {
		if (data?.data) {
			setList(data?.data);
		}
	}, [data]);

	const { deleteSupplier } = useRequestOrdersHook();

	const columns = useMemo(
		() => [
			{
				header: "Project Code",
				accessorKey: "project_code",
				className: "cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Requestor name",
				accessorKey: "name",
				className: "cursor-pointer",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return `${original?.requester?.lastname}, ${
						original?.requester?.firstname
					} ${original?.requester?.middlename.slice(0, 1)}`;
				},
			},
			{
				header: "Date requested",
				accessorKey: "created_at",
				className: "cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Date needed",
				accessorKey: "date_needed",
				className: "cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Order status",
				accessorKey: "order_status",
				className: "cursor-pointer",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return (
						<span
							className={`px-2 py-1  bg-opacity-10  rounded-xl capitalize ${
								original?.status == "approved"
									? "text-success bg-success"
									: "text-warning bg-warning"
							}`}
						>
							{original?.status}
						</span>
					);
				},
			},
			{
				header: "Approved by",
				accessorKey: "approved_by",
				className: "",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					if (original?.status == "approved")
						return (
							<span
								className={`px-0 py-1  bg-opacity-10  rounded-xl text-success`}
							>
								{original.accepted_by?.name}
							</span>
						);
				},
			},
		],
		[]
	);

	useEffect(() => {
		// setList(data?.data || []);
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
			title="Request orders"
			breadcrumbs={[
				{
					to: "/request-orders",
					icon: "rr-inbox-in",
					label: "Request orders",
				},
			]}
		>
			<div className="w-full">
				<div className="flex flex-col lg:flex-row gap-6 pb-6">
					<TextInputField
						className="lg:w-[320px]"
						icon={<FlatIcon icon="rr-search" className="text-sm" />}
						placeholder="Search request"
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
						<FlatIcon icon="rs-plus" className="mr-2" />
						Add new order
					</Button>
				</div>
				<Table
					rowClick={(data) => {
						if (data.original.status == "pending") {
							navigate(
								`/approving/approve-request-order/view-request/${data.original.id}`
							);
						} else {
							navigate(
								`prepare-item-delivery/${data?.original?.id}`
							);
						}
					}}
					columns={columns}
					pagination={true}
					loading={dataLoading}
					data={list}
					emptyMessage={`You don’t have an order`}
				/>
			</div>
			<RequestOrdersFormModal
				ref={form_modal_ref}
				addToList={addToList}
				updateInList={updateInList}
				select_items_ref={select_items_ref}
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
			<SelectItemsModal
				ref={select_items_ref}
				url={`/inventory`}
				defaultFilter={{
					request_order: "yes",
				}}
			/>
		</AppLayout>
	);
};

export default RequestOrders;
