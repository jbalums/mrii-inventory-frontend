import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import ViewPoDetailsModal from "./components/ViewPoDetailsModal";

const PurchaseOrderList = () => {
	const view_detail_ref = useRef(null);
	const [list, setList] = useState([
		{
			po_number: "000001",
			location: "Test Location",
			qty: "100",
			date: "Nov 1, 2022",
		},
		{
			po_number: "000002",
			location: "Test Location 2",
			qty: "200",
			date: "Dec 1, 2022",
		},
	]);

	const columns = useMemo(
		() => [
			{
				header: "Purchase order number",
				accessorKey: "po_number",
				className: "w-lg",
			},
			{
				header: "Vendor location",
				accessorKey: "location",
			},
			{
				header: "Number of ordered QTY",
				accessorKey: "qty",
			},
			{
				header: "Date created",
				accessorKey: "date",
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
									type="primary-light"
									size="square-sm"
									className="rounded-full"
									onClick={() => {}}
								>
									<FlatIcon
										icon="rr-edit"
										className="text-sm"
									/>
								</Button>
								<Button
									type="danger-light"
									size="square-sm"
									className="rounded-full"
									onClick={() => {}}
								>
									<FlatIcon
										icon="rr-trash"
										className="text-sm "
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
			title="Purchase Order List"
			titleChildren={
				<div className="ml-auto flex items-center gap-4 flex-wrap">
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
				</div>
			}
		>
			<div className="flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search request"
				/>
				<Button type="accent" className="ml-auto">
					<FlatIcon icon="rs-plus" /> Register Create new PO
				</Button>
			</div>

			<div className="w-full">
				<Table
					rowClick={(data) => {
						view_detail_ref.current.show();
					}}
					columns={columns}
					pagination={true}
					loading={false}
					data={list}
				/>
			</div>
			<ViewPoDetailsModal ref={view_detail_ref} />
		</AppLayout>
	);
};

export default PurchaseOrderList;
