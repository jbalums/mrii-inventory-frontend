import { purposeElements, requestOrderStatus } from "@/libs/elementsHelper";
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
import { useAuth } from "@/hooks/useAuth";
import OrderStatus from "@/src/components/OrderStatus";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";

const RequestOrders = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const form_modal_ref = useRef(null);
	const delete_modal_ref = useRef(null);
	const select_items_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
	const [selectedData, setSelectedData] = useState(null);
	const [loading, setLoading] = useState(false);
	const {
		data,
		loading: dataLoading,
		filters,
		setFilters,
		meta,
		setKeyword,
		setPage,
		setPaginate,
		keyword,
	} = useDataTable(
		`/inventory/requisition`,
		null
		// setList
	);

	useEffect(() => {
		if (data?.data) {
			setList(data?.data);
		}
	}, [data]);
	
	const { deleteSupplier,deleteRequestOrder } = useRequestOrdersHook();
	const { getBranches } = useBranchLocation();
	const [branches, setBranches] = useState([])
	useEffect(()=>{
		getBranches().then((res) => {
			setBranches(res.data.data);
		});
	}, [])

	const columns = useMemo(
		() => [
			{
				header: "Ref #",
				accessorKey: "account_code",
				className: "cursor-pointer font-bold",
				cellClassName: "",
			},
			{
				header: "Project Code",
				accessorKey: "project_code",
				className: "cursor-pointer font-bold",
				cellClassName: "!text-blue-600",
			},
			{
				header: "Purpose",
				accessorKey: "purpose",
				className: "cursor-pointer",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return purposeElements[original?.purpose];
				},
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
				header: "Branch",
				accessorKey: "date_needed",
				className: "cursor-pointer",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return original?.branch ? original?.branch?.name : original?.location?.name
				}
			},
			{
				header: "Order status",
				accessorKey: "order_status",
				className: "cursor-pointer",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return <OrderStatus status={original?.status} />;
				},
			},
			{
				header: "Approved by",
				accessorKey: "approved_by",
				className: "!text-center",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					let condition = ["approved", "completed"];
					if (condition.includes(original?.status))
						return (
							<span
								className={`px-0 py-1  bg-opacity-10  rounded-xl text-success`}
							>
								{user?.user_type}
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
		deleteRequestOrder(id)
			.then((res) => {
				console.log('ress',res.data)
				return;
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
			icon={<FlatIcon icon="rr-add-document" />}
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
						onChange={(e) => {
							setKeyword(e.target.value);
						}}
					/>
					<ReactSelectInputField
						className="w-full lg:w-[256px]"
						placeholder="All status"
						value={filters?.type}
						onChange={(data) => {
							setFilters((currentFilters) => ({
								...currentFilters,
								type: data,
							}));
						}}
						options={[
							{
								value: "pending",
								label: "Pending",
							},
							{
								value: "approved",
								label: "Approved",
							},
							{
								value: "cancelled",
								label: "Cancelled",
							},
							{
								value: "completed",
								label: "Completed",
							},
							{
								value: "declined",
								label: "Declined",
							},
						]}
					/>
					{user?.data?.branch_id == 1 ? (
						<ReactSelectInputField
							className="w-full lg:w-[256px]"
							placeholder="All location / Branches"
							value={filters?.branch_id}
							onChange={(data) => {
								setFilters((prevFilters) => ({
									...prevFilters,
									branch_id: data,
								}));
							}}
							options={[
								{
									label: "All location / branches",
									value: "",
								},
								...branches.map((branch) => ({
									value: branch?.id,
									label: branch?.name,
								})),
							]}
						/>
					) : (
						""
					)}
					<Button
						type="accent"
						className="ml-auto"
						onClick={openFormModal}
					>
						<FlatIcon icon="rs-plus" />
						Add new order
					</Button>
				</div>
				<Table
					rowClick={(data) => {
						window.open(`/request-orders/${data.original.id}`, '_blank');

						/* if (data.original.status == "completed") {
							navigate(
								`/request-orders/view-completed/${data.original.id}`
							);
							return;
						}

						if (data.original.status == "pending") {
							navigate(
								`/approving/approve-request-order/view-request/${data.original.id}`
							);
							return;
						} else {
							navigate(
								`prepare-item-delivery/${data?.original?.id}`
							);
							return;
						} */
					}}
					columns={columns}
					pagination={true}
					loading={dataLoading}
					data={list}
					meta={meta}
					emptyMessage={`You don’t have an order`}
					onTableChange={(data) => {
						setPage(data.pageIndex + 1);
						setPaginate(data.pageSize);
					}}
					keyword={keyword}
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
				title="Cofirmation"
				body={
					<>
					<p className="text-red-600 font-semibold text-lg text-center uppercase">
						Are you sure you want to delete <br/><b className="text-3xl"> REF# {selectedData?.ref}?</b>{" "}
					</p>
					<p className="text-red-600 font-semibold text-lg text-center">
					<i className="text-red-600 text-center text-sm">NOTE: THIS ACTION CANNOT BE UNDONE! </i></p>
					</>
				}
				footer={
					<div className="flex items-center w-full">
						<Button type="secondary" onClick={closeConfirmDelete}>CANCEL</Button>
						<Button
							type="danger"
							className="ml-auto"
							onClick={deleteData}
							loading={loading}
						>
							CONFIRM DELETE
						</Button>
					</div>
				}
			/>
			<SelectItemsModal
				ref={select_items_ref}
				url={`/inventory`}
				defaultFilter={{
					request_order: "yes",
					location_id: user?.data?.branch_id
				}}
			/>
		</AppLayout>
	);
};

export default RequestOrders;
