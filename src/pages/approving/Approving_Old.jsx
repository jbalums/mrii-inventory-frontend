import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";

const ApprovingOld = () => {
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
		<AppLayout title="Approving">
			<div className="flex flex-col lg:flex-row border-b -mx-4 lg:-mx-6 -mt-4 lg:-mt-6 px-4 lg:px-6">
				<div className="border-b-2 border-accent p-2 lg:p-4 flex items-center justify-center text-sm text-accent font-bold">
					Approve RS request
				</div>
				<div className="border-b  p-2 lg:p-4 flex items-center justify-center text-sm">
					Approve Issuance
				</div>
			</div>
			<div className="flex flex-col lg:flex-row gap-6 pb-6 pt-6">
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
		</AppLayout>
	);
};

export default ApprovingOld;
