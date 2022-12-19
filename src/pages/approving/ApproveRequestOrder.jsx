import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ApproveRequestOrder = () => {
	const view_detail_ref = useRef(null);
	const navigate = useNavigate();
	const [list, setList] = useState([
		{
			rs_number: "02065162",
			requestor: "Alturas Bohol",
			location: "Ilocos Norte",
			date_created: "Dec 7, 2022",
			date_needed: "Dec 20, 2022",
			qty_to_order: "123",
			status: "to_check",
		},
		{
			rs_number: "02065162",
			requestor: "Alturas Bohol",
			location: "Ilocos Norte",
			date_created: "Dec 7, 2022",
			date_needed: "Dec 20, 2022",
			qty_to_order: "123",
			status: "to_check",
		},
		{
			rs_number: "02065162",
			requestor: "Alturas Bohol",
			location: "Ilocos Norte",
			date_created: "Dec 7, 2022",
			date_needed: "Dec 20, 2022",
			qty_to_order: "123",
			status: "to_check",
		},
	]);
	const columns = useMemo(
		() => [
			{
				header: "RS number",
				accessorKey: "rs_number",
				className: "w-lg",
			},
			{
				header: "Requestor name",
				accessorKey: "requestor",
			},
			{
				header: "Location",
				accessorKey: "location",
			},
			{
				header: "Date created",
				accessorKey: "date_created",
			},
			{
				header: "Date needed",
				accessorKey: "date_needed",
			},
			{
				header: "QTY to order",
				accessorKey: "qty_to_order",
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
		<AppLayout title="Approve request order" backBtn={true}>
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

			<div className="w-full">
				<Table
					rowClick={(data) => {
						navigate(
							"/approving/approve-request-order/view-request/1"
						);
					}}
					columns={columns}
					pagination={false}
					loading={false}
					data={list}
				/>
			</div>
		</AppLayout>
	);
};

export default ApproveRequestOrder;
