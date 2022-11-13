import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import CardLayout from "@/src/components/layout/CardLayout";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestDetails = () => {
	const navigate = useNavigate();
	const { data, loading: dataLoading } = useDataTable(
		`/management/suppliers`
	);
	const [list, setList] = useState([
		{
			code: "AG454",
			name: "Percal",
			location: "Cebu",
			uom: "20 KG",
			qty_on_hand: "0",
			qty_to_order: "123",
			stock_level: "available",
		},
		{
			code: "AG454",
			name: "Percal",
			location: "Cebu",
			uom: "20 KG",
			qty_on_hand: "0",
			qty_to_order: "123",
			stock_level: "empty",
		},
		{
			code: "AG454",
			name: "Percal",
			location: "Cebu",
			uom: "20 KG",
			qty_on_hand: "0",
			qty_to_order: "123",
			stock_level: "low",
		},
	]);

	const renderStockLevel = (level) => {
		switch (level) {
			case "available":
				return (
					<div className="px-2 bg-success bg-opacity-10 text-success rounded-xl text-center w-[120px]">
						Stock available
					</div>
				);
			case "empty":
				return (
					<div className="px-2 bg-danger bg-opacity-10 text-danger rounded-xl text-center w-[120px]">
						Empty stock
					</div>
				);
			case "low":
				return (
					<div className="px-2 bg-warning bg-opacity-10 text-warning rounded-xl text-center w-[120px]">
						Low stock
					</div>
				);

			default:
				return "";
		}
	};
	const columns = useMemo(() => [
		{
			header: "Code",
			accessorKey: "code",
			className: "",
			cellClassName: "",
		},
		{
			header: "Name",
			accessorKey: "name",
			className: "",
			cellClassName: "",
		},
		{
			header: "Location",
			accessorKey: "location",
			className: "",
			cellClassName: "",
		},
		{
			header: "UoM",
			accessorKey: "uom",
			className: "",
			cellClassName: "",
		},
		{
			header: "QTY on hand",
			accessorKey: "qty_on_hand",
			className: "",
			cellClassName: "",
		},
		{
			header: "QTY to order",
			accessorKey: "qty_to_order",
			className: "",
			cellClassName: "",
		},
		{
			header: "Stock level",
			accessorKey: "stock_level",
			className: "text-center items-center justify-center flex",
			cellClassName: "",
			cell: ({ row }) => {
				const original = row?.original;
				return renderStockLevel(original?.stock_level);
			},
		},
		{
			header: " ",
			accessorKey: "stock_level",
			className: "text-center",
			cellClassName: "",
			cell: ({ row }) => {
				const original = row?.original;
				return original?.stock_level == "empty" ||
					original?.stock_level == "low" ? (
					<span className="text-accent cursor-pointer">
						Added to reorder
					</span>
				) : (
					""
				);
			},
		},
	]);
	return (
		<AppLayout
			backBtn
			title="Request information"
			titleChildren={
				<Button type="accent" className="ml-auto">
					<FlatIcon icon="rs-plus" className="mr-2" />
					Add new order
				</Button>
			}
		>
			<div className="w-full">
				<CardLayout className="!p-4 !bg-background mb-6 !shadow-sm">
					<h4 className="text-base font-bold mb-4">
						Requests details
					</h4>
					<div className="grid grid-cols-12 pb-2">
						<div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">
								Order number
							</h5>
							<span className="text-sm">AG454</span>
						</div>
						<div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">
								Requestor name
							</h5>
							<span className="text-sm">Jonas Nickel</span>
						</div>
						<div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">Division</h5>
							<span className="text-sm">Cebu</span>
						</div>
						<div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">
								Date receive
							</h5>
							<span className="text-sm">Aug 14, 2022</span>
						</div>
						<div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">
								Approve by
							</h5>
							<span className="text-sm">Ariel Mann</span>
						</div>
					</div>
				</CardLayout>
				<CardLayout className="!p-4 !bg-background mb-6 !shadow-sm">
					<div className="flex items-center">
						<h4 className="text-lg font-bold">Ordered Items</h4>
						<Button className="ml-auto">
							<FlatIcon icon="rr-book" className="mr-2" />
							Items to reorder
							<span className="px-2 ml-2 text-sm text-center bg-foreground text-dark rounded-lg w-[44px]">
								5
							</span>
						</Button>
					</div>
					<Table
						columns={columns}
						loading={dataLoading}
						data={list}
						emptyMessage={`You don’t have an order`}
					/>
				</CardLayout>
			</div>
		</AppLayout>
	);
};

export default RequestDetails;
