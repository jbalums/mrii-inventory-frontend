import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import ContainerCard from "@/src/components/layout/ContainerCard";
import Table from "@/src/components/table/Table";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewIssuanceOrder = () => {
	const view_detail_ref = useRef(null);
	const navigate = useNavigate();
	const [list, setList] = useState([
		{
			code: "AG454",
			name: "Percal",
			location: "Cebu",
			uom: "20 KG",
			qty_on_hand: "205",
			qty_to_issue: "114",
			stock: "available",
		},
		{
			code: "AG454",
			name: "Percal",
			location: "Cebu",
			uom: "20 KG",
			qty_on_hand: "205",
			qty_to_issue: "114",
			stock: "available",
		},
		{
			code: "AG454",
			name: "Percal",
			location: "Cebu",
			uom: "20 KG",
			qty_on_hand: "205",
			qty_to_issue: "114",
			stock: "available",
		},
		{
			code: "AG454",
			name: "Percal",
			location: "Cebu",
			uom: "20 KG",
			qty_on_hand: "205",
			qty_to_issue: "114",
			stock: "available",
		},
	]);
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
				header: "Location",
				accessorKey: "location",
			},
			{
				header: "UoM",
				accessorKey: "uom",
			},
			{
				header: "QTY on hand",
				accessorKey: "qty_on_hand",
			},
			{
				header: "QTY to issue",
				accessorKey: "qty_to_issue",
			},
			{
				header: "Stock level",
				accessorKey: "stock",
				cell: ({ row, getValue }) => {
					return (
						<span className="text-success bg-success bg-opacity-10 px-2 py-2 rounded-3xl">
							Stock available
						</span>
					);
				},
			},
			{
				header: "Status",
				accessorKey: "status",
				cell: ({ row, getValue }) => {
					return (
						<span className="text-warning bg-warning bg-opacity-10 px-2 py-2 rounded-3xl">
							To check
						</span>
					);
				},
			},
		],
		[]
	);
	return (
		<AppLayout
			title="Issuance details"
			backBtn={true}
			titleChildren={
				<div className="ml-auto flex items-start justify-center gap-4">
					<div className="flex flex-col">
						<span className="text-xs font-light text-dark">
							Order number
						</span>
						<b className="text-sm text-darker">AG454</b>
					</div>
					<div className="h-11 border-r border-border"></div>
					<Button
						type="accent"
						onClick={() => {
							complete_order_ref.current.show();
						}}
					>
						<FlatIcon icon="br-check" className="mr-2" /> Approve
						issuance
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
				<ReactSelectInputField
					className="w-full lg:w-[256px]"
					placeholder="All status"
					/* options={supliers?.map((supplier) => ({
                        label: supplier?.name + ` - [${supplier?.address}]`,
                        value: supplier?.id,
                    }))} */
				/>
			</div>

			<ContainerCard title="Items ready to serve" className="p-0">
				<Table
					rowClick={(data) => {
						navigate("/approve-request-order/view-request/1");
					}}
					columns={columns}
					pagination={false}
					loading={false}
					data={list}
				/>
			</ContainerCard>
		</AppLayout>
	);
};

export default ViewIssuanceOrder;
