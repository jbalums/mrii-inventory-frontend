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

const Issuances = () => {
	const navigate = useNavigate();
	const form_modal_ref = useRef(null);
	const delete_modal_ref = useRef(null);
	const select_items_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
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
		`/inventory/issuances`,
		null
		// setList
	);

	useEffect(() => {
		if (data?.data) {
			setList(data?.data);
		}
	}, [data]);

	const columns = useMemo(
		() => [
			{
				header: "Ref #",
				accessorKey: "account_code",
				className: "cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Project Code",
				accessorKey: "project_code",
				className: "cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Purpose",
				accessorKey: "purpose",
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
				header: "Status",
				accessorKey: "issuance_status",
				className: "cursor-pointer",
				cellClassName: "",
				cell: (data) => {
					let original = data?.row?.original;

					return original?.status == "pending_approval" &&
						original?.issuance_status == "completed"
						? "for approval"
						: original?.issuance_status;
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
			icon={<FlatIcon icon="rr-file-export" />}
			title="Issuances"
			breadcrumbs={[
				{
					to: "/request-orders",
					label: "Issuances",
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
						]}
					/>
				</div>
				<Table
					rowClick={(data) => {
						navigate(`/issuances/${data.original.id}`);
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
		</AppLayout>
	);
};

export default Issuances;
