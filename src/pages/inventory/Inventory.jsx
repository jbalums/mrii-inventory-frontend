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

const Inventory = () => {
	const addProductRef = useRef(null);
	const viewProductRef = useRef(null);
	const [list, setList] = useState([]);
	const [branches, setBranches] = useState([]);
	const {
		data,
		loading: dataLoading,
		addToList,
		filters,
		setFilters,
		updateInList,
		removeFromList,
	} = useDataTable(`/inventory`, setList, {
		location_id: "",
	});

	const { getBranches } = useBranchLocation();

	const { businessUnits } = useInventory();

	useEffect(() => {
		getBranches().then((res) => {
			setBranches(res.data.data);
		});
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

	const columns = useMemo(
		() => [
			{
				header: "Code",
				accessorKey: "code",
				className: "w-lg",
			},
			{
				header: "Name",
				accessorKey: "name",
			},
			{
				header: "UoM",
				accessorKey: "uom",
			},
			{
				header: "Location",
				accessorKey: "location.name",
			},
			{
				header: "Business Unit",
				accessorKey: "unit_code",
			},
			{
				header: "QTY on hand",
				accessorKey: "quantity",
			},
			{
				header: "Unit price",
				accessorKey: "price",
			},
			{
				header: "Stocks",
				accessorKey: "stocks",
			},
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
					<Button type="background" className="border-none">
						<FlatIcon
							icon="rs-shopping-cart"
							className="text-danger mr-2 text-base"
						/>
						<span className="text-sm mr-2">Empty stocks:</span>
						<span className="text-sm text-danger font-bold">
							14
						</span>
					</Button>
					<Button type="background" className="border-none">
						<FlatIcon
							icon="rs-stats"
							className="text-warning mr-2 text-base"
						/>
						<span className="text-sm mr-2">Low stocks:</span>
						<span className="text-sm text-warning font-bold">
							14
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
			<div className="flex flex-col md:flex-row gap-6 pb-6">
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
		</AppLayout>
	);
};

export default Inventory;
