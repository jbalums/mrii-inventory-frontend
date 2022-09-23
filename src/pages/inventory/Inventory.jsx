import AppLayout from "@/src/components/AppLayout";
import Table from "@/src/components/table/Table";
import React, { useMemo, useRef } from "react";
import TextInputField from "@/src/components/forms/TextInputField";
import { FiSearch } from "react-icons/fi";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import useInventory from "./hooks/useInventory";
import { useEffect } from "react";
import Button from "@/src/components/Button";
import ProductFormModal from "./components/ProductFormModal";
import useDataTable from "@/src/helpers/useDataTable";

const Inventory = () => {
	const addProductRef = useRef(null);

	const { data, loading: dataLoading } = useDataTable(`/management/products`);

	const columns = useMemo(
		() => [
			{
				header: "Code",
				id: "code",
			},
			{
				header: "Name",
				id: "name",
			},
			{
				header: "Description",
				id: "description",
			},
			{
				header: "UoM",
				id: "uom",
			},
			{
				header: "Location",
				id: "firstname",
			},
			{
				header: "QTY on hand",
				id: "firstname",
			},
			{
				header: "Unit price",
				id: "firstname",
			},
			{
				header: "Stocks",
				id: "firstname",
			},
			{
				header: "Action",
				id: "firstname",
			},
		],
		[]
	);

	useEffect(() => {}, []);

	const openFormModal = () => {
		addProductRef.current.show();
	};
	return (
		<AppLayout
			title="Inventory"
			titleChildren={
				<div className="ml-auto flex items-center gap-4">
					<Button type="danger" className="!bg-opacity-60">
						<FlatIcon icon="rr-shopping-cart" className="mr-2 " />
						<span className="font-bold text-sm mr-2">Empty stocks:</span>
						<span className="font-bold text-sm">14</span>
					</Button>
					<Button type="background" className="border-none">
						<FlatIcon icon="rr-stats" className="text-warning mr-2 " />
						<span className="text-sm mr-2">Low stocks:</span>
						<span className="text-sm text-warning">14</span>
					</Button>
				</div>
			}
		>
			<div className="flex gap-6 pb-6">
				<TextInputField
					className="w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search product"
				/>
				<ReactSelectInputField
					className="w-[256px]"
					placeholder="All location / Branches"
					options={[
						{
							label: "Cebu",
							value: "cebu",
						},
						{
							label: "Cebu",
							value: "cebu",
						},
						{
							label: "Cebu",
							value: "cebu",
						},
					]}
				/>
				<Button type="accent" className="ml-auto" onClick={openFormModal}>
					<FlatIcon icon="rs-plus" className="mr-2" /> Register product
				</Button>
			</div>

			<div className="w-full">
				<Table columns={columns} pagination={true} loading={false} data={[]} />
			</div>
			<ProductFormModal ref={addProductRef} />
		</AppLayout>
	);
};

export default Inventory;
