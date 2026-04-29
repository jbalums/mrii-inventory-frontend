import axios from "@/libs/axios";
import { purposeElements } from "@/libs/elementsHelper";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import SelectItemsModal from "@/src/components/items/SelectItemsModal";
import OrderStatus from "@/src/components/OrderStatus";
import Table from "@/src/components/table/Table";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import RequestOrdersFormModal from "./components/RequestOrdersFormModal";

const REQUEST_ORDERS_V2_URL = "/v2/inventory/requisition";

const STATUS_OPTIONS = [
	{
		value: "",
		label: "All status",
	},
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
];

const DEFAULT_FILTERS = {
	type: "",
	branch_id: "",
	date_from: "",
	date_to: "",
};

const normalizeRequesterName = (requester) => {
	if (!requester) return "-";

	const middleInitial = requester?.middlename
		? ` ${requester.middlename.slice(0, 1)}`
		: "";

	return `${requester?.lastname || ""}, ${
		requester?.firstname || ""
	}${middleInitial}`;
};

const buildRequestOrderParams = ({ filters, keyword, page, paginate }) => {
	return Object.entries({
		keyword,
		page,
		paginate,
		...filters,
	}).reduce((params, [key, value]) => {
		if (value !== "" && value !== null && value !== undefined) {
			params[key] = value;
		}

		return params;
	}, {});
};

const RequestOrdersV2 = () => {
	const { user } = useAuth();
	const { getBranches } = useBranchLocation();
	const formModalRef = useRef(null);
	const selectItemsRef = useRef(null);

	const [list, setList] = useState([]);
	const [branches, setBranches] = useState([]);
	const [filters, setFilters] = useState(DEFAULT_FILTERS);
	const [keyword, setKeyword] = useState("");
	const [debouncedKeyword, setDebouncedKeyword] = useState("");
	const [page, setPage] = useState(1);
	const [paginate, setPaginate] = useState(10);
	const [meta, setMeta] = useState(null);
	const [dataLoading, setDataLoading] = useState(false);

	const canSeeAdminFilters = user?.data?.id == 1;
	const canFilterBranch = user?.data?.branch_id == 1;

	const branchOptions = useMemo(
		() => [
			{
				label: "All location / branches",
				value: "",
			},
			...branches.map((branch) => ({
				value: branch?.id,
				label: branch?.name,
			})),
		],
		[branches],
	);

	const requestParams = useMemo(
		() =>
			buildRequestOrderParams({
				filters,
				keyword: debouncedKeyword,
				page,
				paginate,
			}),
		[filters, debouncedKeyword, page, paginate],
	);

	const columns = useMemo(
		() => [
			{
				header: "Ref #",
				accessorKey: "account_code",
				className: "cursor-pointer font-bold group",
				cell: ({ row: { original } }) => {
					return (
						<div className="relative">
							{original?.ref}
							{canSeeAdminFilters ? (
								<button
									type="button"
									className="p-1 bg-blue-100 rounded-md text-xs flex w-5 absolute -right-5 top-0 opacity-0 group-hover:opacity-100 transition-opacity active:bg-blue-600 active:text-white z-[20000]"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										navigator.clipboard.writeText(
											original?.ref || "",
										);
										toast.success(
											"Reference number copied to clipboard!",
										);
									}}
								>
									<FlatIcon
										icon="rr-copy"
										className="-mb-1"
									/>
								</button>
							) : null}
						</div>
					);
				},
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
				cell: ({ row: { original } }) => {
					return purposeElements[original?.purpose] || "-";
				},
			},
			{
				header: "Requestor name",
				accessorKey: "name",
				className: "cursor-pointer",
				cell: ({ row: { original } }) => {
					return normalizeRequesterName(original?.requester);
				},
			},
			{
				header: "Date requested",
				accessorKey: "created_at",
				className: "cursor-pointer",
			},
			{
				header: "Branch",
				accessorKey: "branch",
				className: "cursor-pointer",
				cell: ({ row: { original } }) => {
					return (
						original?.branch?.name ||
						original?.location?.name ||
						original?.requester?.branch?.name ||
						"-"
					);
				},
			},
			{
				header: "Order status",
				accessorKey: "order_status",
				className: "cursor-pointer",
				cell: ({ row: { original } }) => {
					return <OrderStatus status={original?.status} />;
				},
			},
			{
				header: "Approved by",
				accessorKey: "approved_by",
				className: "!text-center",
				cell: ({ row: { original } }) => {
					if (!["approved", "completed"].includes(original?.status)) {
						return "-";
					}

					return (
						<div className="flex flex-col">
							<span className="px-0 py-1 bg-opacity-10 rounded-xl text-success">
								{original?.accepted_by?.name || "-"}
							</span>
							{canSeeAdminFilters ? (
								<span className="text-xs">
									{original?.date_approved}
								</span>
							) : null}
						</div>
					);
				},
			},
		],
		[canSeeAdminFilters],
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedKeyword(keyword);
			setPage(1);
		}, 300);

		return () => clearTimeout(timeout);
	}, [keyword]);

	useEffect(() => {
		if (!canFilterBranch) return;

		let isCurrent = true;

		getBranches()
			.then((res) => {
				if (isCurrent) {
					setBranches(res.data?.data || []);
				}
			})
			.catch(() => {
				if (isCurrent) {
					setBranches([]);
				}
			});

		return () => {
			isCurrent = false;
		};
	}, [canFilterBranch]);

	useEffect(() => {
		let isCurrent = true;

		setDataLoading(true);

		axios
			.get(REQUEST_ORDERS_V2_URL, {
				params: requestParams,
			})
			.then((res) => {
				if (!isCurrent) return;

				setList(res.data?.data || []);
				setMeta(res.data?.meta || null);
			})
			.catch(() => {
				if (!isCurrent) return;

				setList([]);
				setMeta(null);
				toast.error("Unable to load request orders.");
			})
			.finally(() => {
				if (isCurrent) {
					setDataLoading(false);
				}
			});

		return () => {
			isCurrent = false;
		};
	}, [requestParams]);

	const updateFilter = (key, value) => {
		setPage(1);
		setFilters((currentFilters) => ({
			...currentFilters,
			[key]: value,
		}));
	};

	const openFormModal = () => {
		formModalRef.current?.show(null);
	};

	const addToList = (item) => {
		setList((currentList) => [item, ...currentList]);
	};

	const updateInList = (item) => {
		setList((currentList) =>
			currentList.map((currentItem) =>
				currentItem.id == item.id ? item : currentItem,
			),
		);
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
				<div className="flex flex-col lg:flex-row flex-wrap gap-6 pb-6">
					<TextInputField
						className="lg:w-[320px]"
						icon={<FlatIcon icon="rr-search" className="text-sm" />}
						placeholder="Search request"
						value={keyword}
						onChange={(e) => {
							setKeyword(e.target.value);
						}}
					/>
					<ReactSelectInputField
						className="w-full lg:w-[256px]"
						placeholder="All status"
						value={filters?.type}
						onChange={(data) => {
							updateFilter("type", data);
						}}
						options={STATUS_OPTIONS}
					/>
					{canFilterBranch ? (
						<ReactSelectInputField
							className="w-full lg:w-[256px]"
							placeholder="All location / Branches"
							value={filters?.branch_id}
							onChange={(data) => {
								updateFilter("branch_id", data);
							}}
							options={branchOptions}
						/>
					) : null}
					{canSeeAdminFilters ? (
						<>
							<TextInputField
								labelClassName="-top-4 !text-[10px] opacity-80 left-0 absolute"
								className="w-full lg:w-[180px]"
								type="date"
								label="Date from"
								value={filters?.date_from}
								onChange={(e) => {
									updateFilter("date_from", e.target.value);
								}}
							/>
							<TextInputField
								labelClassName="-top-4 !text-[10px] opacity-80 left-0 absolute"
								className="w-full lg:w-[180px]"
								type="date"
								label="Date to"
								value={filters?.date_to}
								min={filters?.date_from || undefined}
								onChange={(e) => {
									updateFilter("date_to", e.target.value);
								}}
							/>
						</>
					) : null}
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
						window.open(
							`/request-orders/${data.original.id}`,
							"_blank",
						);
					}}
					columns={columns}
					pagination={true}
					loading={dataLoading}
					data={list}
					meta={meta}
					emptyMessage={`You don't have an order`}
					onTableChange={(data) => {
						setPage(data.pageIndex + 1);
						setPaginate(data.pageSize);
					}}
					keyword={debouncedKeyword}
				/>
			</div>
			<RequestOrdersFormModal
				ref={formModalRef}
				addToList={addToList}
				updateInList={updateInList}
				select_items_ref={selectItemsRef}
			/>
			<SelectItemsModal
				ref={selectItemsRef}
				url={`/inventory`}
				defaultFilter={{
					request_order: "yes",
					location_id: user?.data?.branch_id,
				}}
			/>
		</AppLayout>
	);
};

export default RequestOrdersV2;
