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

const Inventory = () => {
	const { user } = useAuth();
	const addProductRef = useRef(null);
	const viewProductRef = useRef(null);
	const viewStatusRef = useRef(null);

	const [list, setList] = useState([]);
	const [inventoryStatus, setInventoryStatus] = useState(null);
	const [branches, setBranches] = useState([]);
	console.log("useruseruser", user);
	const {
		data,
		loading: dataLoading,
		addToList,
		filters,
		setFilters,
		updateInList,
		removeFromList,
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
		setFilters((filters) => ({
			...filters,
			location_id: user?.data?.branch?.id,
		}));
	}, [user?.data?.branch?.id]);

	useEffect(() => {
		getBranches().then((res) => {
			setBranches(res.data.data);
		});
		getStockStatus();
	}, [1]);

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	const openFormModal = (data) => {
		addProductRef.current.show(data);
	};
	const viewProductModal = (item) => {
		console.log("itemitemitem", item);
		viewProductRef.current.show(item);
	};

	const getStockStatus = () => {
		return axios.get("/inventory/status").then((res) => {
			setInventoryStatus({
				low: res.data?.low || [],
				empty: res.data?.empty || [],
			});
		});
	};

	const columns = useMemo(
		() => [
			{
				header: "Code",
				accessorKey: "code",
				className: "min-w-[64px]",
			},
			{
				header: "Name",
				accessorKey: "name",
				className: "min-w-[128px]",
			},
			{
				header: "UoM",
				accessorKey: "uom",
				className: "min-w-[64px]",
			},
			{
				header: "Location",
				accessorKey: "location.name",
				className: "min-w-[128px]",
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
					let qty =
						row?.original?.total_quantity >= 0
							? row?.original?.total_quantity
							: 0;
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
					return (
						<>
							<div className="flex items-center justify-center text-center gap-4">
								<Button
									type="background"
									size="sm"
									className="rounded-full"
									onClick={() => {
										openFormModal(row?.original);
									}}
								>
									<FlatIcon
										icon="rr-edit"
										className="text-sm text-dark"
									/>
								</Button>
							</div>
						</>
					);
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
				/>
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

				<ReactSelectInputField
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
				/>
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
				/>
			</div>
			<ProductFormModal
				ref={addProductRef}
				addToList={addToList}
				updateInList={updateInList}
			/>
			<ViewProductModal ref={viewProductRef} />
			<ViewLowStocksModal ref={viewStatusRef} />
		</AppLayout>
	);
};

export default Inventory;
