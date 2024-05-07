import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductFormModal from "./components/ProductFormModal";
import ViewProductModal from "./components/ViewProductModal";
import useInventory from "@/src/pages/inventory/hooks/useInventory.js";
import { formatToCurrency } from "@/libs/helpers";
import axios from "@/libs/axios";
import ViewLowStocksModal from "./components/ViewLowStocksModal";
import { useAuth } from "@/hooks/useAuth";
import RepackingModal from "../repacking/components/RepackingModal";
import { v4 as uuidv4 } from "uuid";
import UpdatePriceModal from "./components/UpdatePriceModal";
import SetBeginningBalanceModal from "./components/SetBeginningBalanceModal";
import useNoBugUseEffect from "@/hooks/useNoBugUseEffect";
import HistoryBtn from "@/src/components/HistoryBtn";
const Inventory = () => {
	const { user } = useAuth();
	const addProductRef = useRef(null);
	const begBalProductRef = useRef(null);
	const viewProductRef = useRef(null);
	const viewStatusRef = useRef(null);
	const repackModalRef = useRef(null);
	const updatePriceref = useRef(null);

	const [list, setList] = useState([]);
	const [inventoryStatus, setInventoryStatus] = useState(null);
	const [branches, setBranches] = useState([]);
	// console.log("useruseruser", user);
	const {
		data,
		loading: dataLoading,
		addToList,
		filters,
		setFilters,
		updateInList,
		removeFromList,
		meta,
	} = useDataTable(
		user?.data?.branch?.id == 1
			? `/inventory`
			: `/inventory/branch-inventory`,
		setList,
		{
			location_id:
				user?.data?.branch?.id == 1 ? "" : user?.data?.branch?.id,
		}
	);

	const { getBranches } = useBranchLocation();
	const { businessUnits } = useInventory();

	useEffect(() => {
		getBranches().then((res) => {
			setBranches(res.data.data);
		});
		getStockStatus();
	}, [1]);

	useNoBugUseEffect({
		functions: () => {
			setFilters((filters) => ({
				...filters,
				key: uuidv4(),
				location_id: user?.data?.branch_id,
			}));
		},
		params: [user?.data?.branch_id],
	});

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	const openFormModal = (data) => {
		addProductRef.current.show(data);
	};
	const openPriceFormModal = (data) => {
		updatePriceref.current.show(data);
	};
	const viewProductModal = (item) => {
		console.log("itemitemitem", item);
		viewProductRef.current.show(item);
	};
	const openBegBalFormModal = (data) => {
		begBalProductRef.current.show(data);
	};

	const getStockStatus = () => {
		return axios.get("/inventory/status").then((res) => {
			setInventoryStatus({
				low: res.data?.low || [],
				empty: res.data?.empty || [],
				pending: res.data?.pending || 0,
			});
		});
	};

	const columns = useMemo(
		() => [
			// {
			// 	header: "ID",
			// 	accessorKey: "product_id",
			// 	className: "min-w-[64px]",
			// },
			{
				header: "Code",
				accessorKey: "code",
				className: "min-w-[64px]",
				cell: ({ row }) => {
					return row?.original?.product?.code;
				},
			},
			{
				header: "Name",
				accessorKey: "name",
				className: "min-w-[128px]",
				cell: ({ row }) => {
					return row?.original?.product?.name;
				},
			},
			{
				header: "UoM",
				accessorKey: "uom",
				className: "min-w-[64px]",
				cell: ({ row }) => {
					return row?.original?.product?.unit_measurement;
				},
			},
			{
				header: "Branch",
				accessorKey: "branch",
				className: "min-w-[128px]",
				cell: ({ row }) => {
					return row?.original?.branch?.name;
				},
			},
			/* 	{
				header: "Business Unit",
				accessorKey: "unit_code",
			}, */
			{
				header: "QTY on hand",
				accessorKey: "total_quantity",
				className: "!text-center min-w-[128px]",
				thClassName: "items-center",
				cell: ({ row }) => {
					let qty = row?.original?.total_quantity;
					return qty;
				},
			},
			/* 	{
				header: "Unit price",
				accessorKey: "price",
				className: "!text-right min-w-[128px]",
				cell: ({ row }) => {
					let p = row?.original?.price || 0;
					return formatToCurrency(p);
				},
			}, */
			/* 	{
				header: "Stocks",
				accessorKey: "stocks",
			}, */
			{
				header: "Action",
				accessorKey: "action",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					// console.log("useruseruser", row?.original);
					let is_manageable = row?.original?.is_manageable;

					if (is_manageable)
						return (
							<>
								<div className="flex items-center justify-center text-center gap-4">
									{row?.original?.begining_balance == null ? (
										<Button
											type="accent"
											size="sm"
											className="gap-1"
											onClick={() => {
												openBegBalFormModal(
													row?.original
												);
											}}
										>
											Set Beginning Bal.
										</Button>
									) : (
										""
									)}
									<Button
										type="secondary"
										size="sm"
										className="gap-1"
										onClick={() => {
											openFormModal(row?.original);
										}}
									>
										<FlatIcon
											icon="rr-edit"
											className="text-sm text-white"
										/>{" "}
										Edit levels
									</Button>
									<Button
										type="primary"
										size="sm"
										className="gap-1"
										onClick={() => {
											openPriceFormModal(row?.original);
										}}
									>
										<FlatIcon
											icon="rr-edit"
											className="text-sm text-white"
										/>{" "}
										Edit price
									</Button>
								</div>
							</>
						);

					return "";
				},
			},
		],
		[]
	);

	return (
		<AppLayout
			icon={<FlatIcon icon="rr-boxes" />}
			title="Inventory"
			titleChildren={
				<div className="ml-auto flex items-center gap-4 flex-wrap w-full justify-center md:justify-end">
					<Button
						loading={inventoryStatus == null}
						type="background"
						className="border-none"
						onClick={() => {
							viewStatusRef.current.show(
								inventoryStatus?.empty,
								"empty"
							);
						}}
					>
						<FlatIcon
							icon="rs-shopping-cart"
							className="text-danger mr-2 text-base"
						/>
						<span className="text-sm mr-2">Empty stocks:</span>
						<span className="text-sm text-danger font-bold">
							{inventoryStatus?.empty?.length || 0}
						</span>
					</Button>
					<Button
						loading={inventoryStatus == null}
						type="background"
						className="border-none"
						onClick={() => {
							viewStatusRef.current.show(
								inventoryStatus?.low,
								"low"
							);
						}}
					>
						<FlatIcon
							icon="rs-stats"
							className="text-warning mr-2 text-base"
						/>
						<span className="text-sm mr-2">Low stocks:</span>
						<span className="text-sm text-warning font-bold">
							{inventoryStatus?.low?.length || 0}
						</span>
					</Button>
					<div className="ml-4">
						<HistoryBtn entity={"InventoryLocation"} />
					</div>
				</div>
			}
			breadcrumbs={[
				{
					to: "/inventory",
					icon: "rr-boxes",
					label: "Inventory",
				},
			]}
		>
			<div className="flex flex-col md:flex-row gap-4 md:gap-6 pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search product"
					onChange={(e) => {
						setFilters((prevFilters) => ({
							...prevFilters,
							keyword: e.target.value,
						}));
					}}
				/>
				{user?.data?.branch_id == 1 ? (
					<ReactSelectInputField
						className="w-full lg:w-[256px]"
						placeholder="All location / Branches"
						value={filters?.location_id}
						onChange={(data) => {
							setFilters((filters) => ({
								...filters,
								location_id: data,
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
				{/* <ReactSelectInputField
					className="w-full lg:w-[256px]"
					placeholder="All business units"
					value={filters?.by_unit}
					onChange={(data) => {
						setFilters((filters) => ({
							...filters,
							by_unit: data,
						}));
					}}
					options={[
						{
							label: "All location / branches",
							value: "",
						},
						...businessUnits.map((unit) => ({
							value: unit?.code,
							label: unit?.name,
						})),
					]}
				/> */}
				<div className="ml-auto">
					<Button
						type="secondary"
						onClick={() => {
							repackModalRef.current.show();
						}}
					>
						<FlatIcon icon="rr-boxes" />
						Repack Product
					</Button>
				</div>
			</div>

			<div className="w-full">
				<Table
					rowClick={(data) => {
						viewProductModal(data?.original);
					}}
					columns={columns}
					pagination={true}
					loading={dataLoading}
					data={list}
					meta={meta}
					onTableChange={(data) => {
						console.log("onTableChange", data);
						setFilters((prevFilters) => ({
							...prevFilters,
							paginate: data?.pageSize,
							page: data?.pageIndex + 1 || 1,
						}));
					}}
				/>
			</div>
			<ProductFormModal
				ref={addProductRef}
				addToList={addToList}
				updateInList={updateInList}
			/>
			<ViewProductModal ref={viewProductRef} />
			<ViewLowStocksModal ref={viewStatusRef} />
			<UpdatePriceModal
				ref={updatePriceref}
				updateInList={updateInList}
				addToList={addToList}
			/>
			<SetBeginningBalanceModal
				ref={begBalProductRef}
				updateInList={updateInList}
				addToList={addToList}
			/>
			<RepackingModal
				ref={repackModalRef}
				onSuccess={() => {
					setFilters((prevFilters) => ({
						...prevFilters,
						key: uuidv4(),
					}));
				}}
			/>
		</AppLayout>
	);
};

export default Inventory;
